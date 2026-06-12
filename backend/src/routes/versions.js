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

    const resumes = await Resume.find({ userId }).lean();
    const resumeIds = resumes.map((resume) => resume._id);

    const resumeMap = new Map(
      resumes.map((resume) => [resume._id.toString(), resume])
    );

    const versions = await ResumeVersion.find({
      resumeId: { $in: resumeIds },
    })
      .select(
        "_id resumeId label versionNumber sourceType createdAt latestAnalysisId parentVersionId"
      )
      .sort({ createdAt: -1 })
      .lean();

    const analysisIds = versions
      .map((version) => version.latestAnalysisId)
      .filter(Boolean);

    const analyses = analysisIds.length
      ? await Analysis.find({ _id: { $in: analysisIds } })
          .select("_id atsScore versionId")
          .lean()
      : [];

    const scoreByVersion = new Map(
      analyses.map((analysis) => [
        analysis.versionId.toString(),
        analysis.atsScore,
      ])
    );

    const items = versions.map((version) => {
      const resume = resumeMap.get(version.resumeId.toString());

      return {
        id: version._id,
        label: version.label,
        versionNumber: version.versionNumber,
        sourceType: version.sourceType,
        createdAt: version.createdAt,
        score: scoreByVersion.get(version._id.toString()) ?? null,
        resumeId: version.resumeId,
        resumeTitle: resume?.title || "Resume",
        parentVersionId: version.parentVersionId,
      };
    });

    const totals = {
      all: items.length,
      uploads: items.filter((item) => item.sourceType === "upload").length,
      rewrites: items.filter((item) => item.sourceType === "rewrite").length,
    };

    res.json({
      versions: items,
      totals,
    });
  })
);

module.exports = router;
