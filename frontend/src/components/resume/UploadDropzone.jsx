import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud, FileText, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUploadResume } from "@/hooks/useResumes";

const MAX_BYTES = 5 * 1024 * 1024;

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function UploadDropzone({ onUploaded, compact = false }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const upload = useUploadResume();

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: MAX_BYTES,
    multiple: false,
    onDropAccepted: (files) => {
      setErr("");
      setFile(files[0]);
      if (!title) setTitle(files[0].name.replace(/\.pdf$/i, ""));
    },
    onDropRejected: (rejections) => {
      const reason = rejections?.[0]?.errors?.[0]?.message || "File rejected";
      setErr(reason);
    },
  });

  async function submit() {
    if (!file) return;
    setErr("");
    try {
      const data = await upload.mutateAsync({ file, title });
      setFile(null);
      setTitle("");
      onUploaded?.(data.resume);
    } catch (e) {
      setErr(e.message || "Upload failed");
    }
  }

  function reset() {
    setFile(null);
    setTitle("");
    setErr("");
  }

  return (
    <div className="space-y-3">
      {!file && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed cursor-pointer transition-colors",
            compact ? "p-6" : "p-8",
            isDragActive
              ? "border-[var(--ink)] bg-[var(--surface-2)]"
              : "border-[var(--border)] bg-[var(--bg)] hover:border-[var(--ink)]/30",
            isDragReject && "border-[#a00] bg-[#f5e5e5]"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={isDragActive ? { y: -2 } : { y: 0 }}
              className="mb-3 text-[var(--ink-muted)]"
            >
              <UploadCloud size={24} strokeWidth={1.5} />
            </motion.div>
            <div className={cn("font-display font-500 text-[var(--ink)]", compact ? "text-sm" : "text-base")}>
              {isDragActive ? "Drop your resume here" : "Drop your resume PDF"}
            </div>
            <div className="text-xs text-[var(--ink-muted)] mt-1">
              or click to browse · max 5 MB
            </div>
          </div>
        </div>
      )}

      {file && (
        <div className="border border-[var(--border)] bg-[var(--surface)] p-3 flex items-center gap-3">
          <div className="h-8 w-8 flex items-center justify-center text-[var(--ink)]">
            <FileText size={16} strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-500 text-[var(--ink)] truncate">{file.name}</div>
            <div className="text-xs text-[var(--ink-muted)]">{formatBytes(file.size)}</div>
          </div>
          <button
            onClick={reset}
            className="h-7 w-7 flex items-center justify-center text-[var(--ink-muted)] hover:border hover:border-[var(--border)]"
            disabled={upload.isPending}
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>
      )}

      {file && (
        <div className="space-y-3">
          <Input
            placeholder="Resume title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            onClick={submit}
            variant="primary"
            size="lg"
            disabled={upload.isPending}
            className="w-full"
          >
            {upload.isPending ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Parsing…
              </>
            ) : (
              "Upload & parse"
            )}
          </Button>
        </div>
      )}

      {err && (
        <div className="text-xs text-[#a00] bg-[#f5e5e5] border border-[#dcc0c0] p-2">
          {err}
        </div>
      )}
    </div>
  );
}
