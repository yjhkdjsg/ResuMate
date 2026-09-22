import { useNavigate } from "react-router-dom";
import { FileText, Trash2, Layers } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { relativeTime } from "@/lib/utils";
import { useDeleteResume } from "@/hooks/useResumes";

export function ResumeCard({ resume }) {
  const nav = useNavigate();
  const del = useDeleteResume();

  async function remove(e) {
    e.stopPropagation();
    if (!confirm("Delete this resume and all its versions?")) return;
    await del.mutateAsync(resume._id);
  }

  return (
    <Card
      onClick={() => nav(`/resumes/${resume._id}`)}
      className="cursor-pointer flex flex-col h-full border border-[var(--border)] hover:border-[var(--ink)]/30 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 p-4 border-b border-[var(--border)]">
        <div className="h-8 w-8 flex items-center justify-center text-[var(--ink)]">
          <FileText size={20} strokeWidth={1.5} />
        </div>
        <button
          onClick={remove}
          disabled={del.isPending}
          className="h-7 w-7 flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors hover:border hover:border-[var(--border)]"
          title="Delete"
        >
          <Trash2 size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-4 flex flex-col">
        <h3 className="font-display text-base font-500 text-[var(--ink)] mb-1 line-clamp-2">
          {resume.title}
        </h3>
        <p className="text-xs text-[var(--ink-muted)] mb-4 flex-1">
          Updated {relativeTime(resume.updatedAt)}
        </p>

        {/* Footer with versions */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs font-500 text-[var(--ink-muted)]">
            <Layers size={12} strokeWidth={1.5} />
            {resume.latestVersionNumber || 1} version{(resume.latestVersionNumber || 1) > 1 ? "s" : ""}
          </div>
          <div className="text-xs font-500 text-[var(--ink)] hover:underline">
            View →
          </div>
        </div>
      </div>
    </Card>
  );
}
