import { useNavigate } from "react-router-dom";
import {
  Gauge,
  Layers,
  Lightbulb,
  KeyRound,
  UploadCloud,
  Sparkles,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/hooks/useDashboard";

export default function Dashboard() {
  const { user } = useAuth();
  const nav = useNavigate();
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;

  if (error) {
    return (
      <EmptyState
        icon={Gauge}
        title="Couldn't load your dashboard"
        description={error.message}
      />
    );
  }

  const { totals, latestResume, kpi } = data || {};

  if (!totals?.resumes) {
    return (
      <EmptyState
        icon={UploadCloud}
        title="Welcome to ResuMate"
        description="Upload your resume to get an instant ATS score, fixable issues, and AI-rewritten bullets."
        action={
          <Button onClick={() => nav("/resumes")}>
            Upload your first resume
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="ATS Score"
          value={kpi?.atsScore?.value ?? "—"}
          suffix={kpi?.atsScore?.value != null ? "/ 100" : null}
          delta={kpi?.atsScore?.delta}
          icon={Gauge}
        />
        <StatCard
          label="Versions"
          value={kpi?.versions?.value ?? totals.resumes}
          icon={Layers}
        />
        <StatCard
          label="Issues Identified"
          value={kpi?.issuesIdentified?.value ?? "—"}
          delta={kpi?.issuesIdentified?.delta}
          icon={Lightbulb}
        />
        <StatCard
          label="Keywords Matched"
          value={kpi?.keywordsMatched?.value ?? "—"}
          suffix={
            kpi?.keywordsMatched?.total
              ? `/ ${kpi.keywordsMatched.total}`
              : null
          }
          delta={kpi?.keywordsMatched?.delta}
          icon={KeyRound}
          accent
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-[var(--border)]">
          <div className="space-y-2">
            <div className="text-xs font-500 text-[var(--ink-muted)]">Total Resumes</div>
            <div className="font-display text-3xl font-500">{totals.resumes}</div>
          </div>
        </Card>
        <Card className="border border-[var(--border)]">
          <div className="space-y-2">
            <div className="text-xs font-500 text-[var(--ink-muted)]">Total Rewrites</div>
            <div className="font-display text-3xl font-500">{totals.rewrites}</div>
          </div>
        </Card>
        <Card className="border border-[var(--border)]">
          <div className="space-y-2">
            <div className="text-xs font-500 text-[var(--ink-muted)]">Total Analyses</div>
            <div className="font-display text-3xl font-500">{totals.analyses}</div>
          </div>
        </Card>
      </div>

      {/* Action Card */}
      {latestResume && (
        <Card className="border border-[var(--border)] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-500 text-[var(--ink)]">
                {latestResume.title}
              </h3>
              <p className="text-sm text-[var(--ink-muted)] mt-1">
                Latest version available
              </p>
            </div>
            <Button
              onClick={() => nav(`/resumes/${latestResume._id}`)}
              className="whitespace-nowrap"
            >
              View details
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px]" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[100px]" />
        ))}
      </div>
    </div>
  );
}
