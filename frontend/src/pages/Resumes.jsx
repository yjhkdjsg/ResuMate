import { useNavigate } from "react-router-dom";
import { FileText, UploadCloud } from "lucide-react";
import { Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { UploadDropzone } from "@/components/resume/UploadDropzone";
import { ResumeCard } from "@/components/resume/ResumeCard";
import { useResumesList } from "@/hooks/useResumes";

export default function Resumes() {
  const nav = useNavigate();
  const { data: resumes, isLoading } = useResumesList();

  function handleUploaded(resume) {
    nav(`/resumes/${resume._id}`);
  }

  if (isLoading) {
    return (
      <div className="space-y-12">
        <div>
          <h1 className="font-display text-4xl font-500 text-[var(--ink)] mb-2">
            Your Resumes
          </h1>
          <p className="text-sm text-[var(--ink-muted)]">
            Upload and manage your resume versions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl font-500 text-[var(--ink)] mb-2">
          Your Resumes
        </h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Upload and manage your resume versions
        </p>
      </div>

      {/* Upload Card */}
      <div>
        <Card className="border-2 border-dashed border-[var(--border)]">
          <CardHeader>
            <div>
              <CardTitle className="text-base">Upload a resume</CardTitle>
              <CardDescription className="mt-1">
                PDF only. We extract the text and create version V1.
              </CardDescription>
            </div>
          </CardHeader>
          <div className="px-5 pb-5">
            <UploadDropzone onUploaded={handleUploaded} />
          </div>
        </Card>
      </div>

      {/* Resumes Grid */}
      {resumes && resumes.length === 0 ? (
        <EmptyState
          icon={UploadCloud}
          title="No resumes uploaded yet"
          description="Upload your first resume to get started with AI-powered analysis and optimization."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes?.map((r) => (
            <ResumeCard key={r._id} resume={r} />
          ))}
        </div>
      )}
    </div>
  );
}
