const express = require("express");

const asyncHandler = require("../utils/asyncHandler");
const { requireAuth } = require("../middleware/auth");

const Resume = require("../models/Resume");
const ResumeVersion = require("../models/ResumeVersion");
const Analysis = require("../models/Analysis");

const router = express.Router();

router.use(requireAuth);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const resumes = await Resume.find({ userId })
      .sort({ updatedAt: -1 })
      .lean();

    const resumeIds = resumes.map((resume) => resume._id);

    const [rewriteCount, analysisCount] = await Promise.all([
      ResumeVersion.countDocuments({
        resumeId: { $in: resumeIds },
        sourceType: "rewrite",
      }),
      Analysis.countDocuments({ userId }),
    ]);

    const latestResumeMeta = resumes[0] || null;

    let latestResume = null;
    let scoreSeries = [];
    let versionStack = [];

    if (latestResumeMeta) {
      const versions = await ResumeVersion.find({
        resumeId: latestResumeMeta._id,
      })
        .sort({ versionNumber: 1 })
        .lean();

      const analysisIds = versions
        .map((version) => version.latestAnalysisId)
        .filter(Boolean);

      const analyses = analysisIds.length
        ? await Analysis.find({ _id: { $in: analysisIds } })
            .select("_id atsScore versionId createdAt")
            .lean()
        : [];

      const scoreByVersion = new Map(
        analyses.map((analysis) => [
          analysis.versionId.toString(),
          analysis.atsScore,
        ])
      );

      const versionsWithScores = versions.map((version) => ({
        id: version._id,
        label: version.label,
        versionNumber: version.versionNumber,
        sourceType: version.sourceType,
        createdAt: version.createdAt,
        score: scoreByVersion.get(version._id.toString()) ?? null,
      }));

      latestResume = {
        _id: latestResumeMeta._id,
        title: latestResumeMeta.title,
        latestVersionNumber: latestResumeMeta.latestVersionNumber,
        updatedAt: latestResumeMeta.updatedAt,
        currentVersionId: latestResumeMeta.currentVersionId,
      };

      scoreSeries = versionsWithScores
        .filter((version) => version.score != null)
        .map((version) => ({
          label: version.label,
          score: version.score,
          versionId: version.id,
          at: version.createdAt,
        }));

      const last3 = versionsWithScores.slice(-3);

      versionStack = last3.map((version, index, array) => {
        const prev = array[index - 1];

        const delta =
          version.score != null && prev?.score != null
            ? version.score - prev.score
            : 0;

        return {
          id: version.id,
          label: version.label,
          title:
            version.sourceType === "upload"
              ? "Upload"
              : version.sourceType === "rewrite"
              ? "Rewrite pass"
              : version.label,
          score: version.score ?? 0,
          delta,
        };
      });
    }

    const allAnalyses = await Analysis.find({ userId })
      .select("atsScore keywordsPresent keywordsMissing issues createdAt resumeId")
      .sort({ createdAt: 1 })
      .lean();

    const latestAnalysis = allAnalyses[allAnalyses.length - 1] || null;
    const prevAnalysis = allAnalyses[allAnalyses.length - 2] || null;

    const scoreSpark = allAnalyses
      .slice(-10)
      .map((analysis) => ({ v: analysis.atsScore }));

    const versionsSpark = resumes
      .slice(0, 10)
      .reverse()
      .map((resume) => ({ v: resume.latestVersionNumber || 1 }));

    const keywordsSpark = allAnalyses
      .slice(-10)
      .map((analysis) => ({
        v: (analysis.keywordsPresent || []).length,
      }));

    const issuesSpark = allAnalyses
      .slice(-10)
      .map((analysis) => ({
        v: (analysis.issues || []).length,
      }));

    const kpi = {
      atsScore: {
        value: latestAnalysis?.atsScore ?? null,
        delta:
          latestAnalysis && prevAnalysis
            ? latestAnalysis.atsScore - prevAnalysis.atsScore
            : null,
        spark: scoreSpark,
      },
      versions: {
        value: resumes.reduce(
          (sum, resume) => sum + (resume.latestVersionNumber || 1),
          0
        ),
        delta: null,
        spark: versionsSpark,
      },
      issuesIdentified: {
        value: latestAnalysis ? latestAnalysis.issues?.length || 0 : null,
        delta:
          latestAnalysis && prevAnalysis
            ? (latestAnalysis.issues?.length || 0) -
              (prevAnalysis.issues?.length || 0)
            : null,
        spark: issuesSpark,
      },
      keywordsMatched: {
        value: latestAnalysis
          ? latestAnalysis.keywordsPresent?.length || 0
          : null,
        total: latestAnalysis
          ? (latestAnalysis.keywordsPresent?.length || 0) +
            (latestAnalysis.keywordsMissing?.length || 0)
          : null,
        delta:
          latestAnalysis && prevAnalysis
            ? (latestAnalysis.keywordsPresent?.length || 0) -
              (prevAnalysis.keywordsPresent?.length || 0)
            : null,
        spark: keywordsSpark,
      },
    };

    const resumeMap = new Map(
      resumes.map((resume) => [resume._id.toString(), resume])
    );

    const [recentVersions, recentAnalyses] = await Promise.all([
      ResumeVersion.find({ resumeId: { $in: resumeIds } })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("resumeId label versionNumber sourceType createdAt")
        .lean(),
      Analysis.find({ userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("resumeId versionId atsScore createdAt")
        .lean(),
    ]);

    const events = [];

    for (const resume of resumes.slice(0, 10)) {
      events.push({
        id: `r-${resume._id}`,
        type: "upload",
        title: `${resume.title} uploaded`,
        subtitle: "Parsed and version V1 created",
        label: "V1",
        at: resume.createdAt,
        resumeId: resume._id,
      });
    }

    for (const version of recentVersions) {
      if (version.sourceType !== "rewrite") continue;

      const resume = resumeMap.get(version.resumeId.toString());

      events.push({
        id: `v-${version._id}`,
        type: "rewrite",
        title: `${version.label} created for ${resume?.title || "resume"}`,
        subtitle: "Rewrites applied",
        label: `${version.label} created`,
        at: version.createdAt,
        resumeId: version.resumeId,
      });
    }

    for (const analysis of recentAnalyses) {
      const resume = resumeMap.get(analysis.resumeId.toString());

      events.push({
        id: `a-${analysis._id}`,
        type: "analyze",
        title: `Analysis complete on ${resume?.title || "resume"}`,
        subtitle: `ATS score ${analysis.atsScore} / 100`,
        label: `${analysis.atsScore}`,
        at: analysis.createdAt,
        resumeId: analysis.resumeId,
      });
    }

    const activity = events
      .sort((a, b) => new Date(b.at) - new Date(a.at))
      .slice(0, 8);

    res.json({
      totals: {
        resumes: resumes.length,
        rewrites: rewriteCount,
        analyses: analysisCount,
        exports: 0,
      },
      latestResume,
      scoreSeries,
      versionStack,
      kpi,
      activity,
    });
  })
);

module.exports = router;
