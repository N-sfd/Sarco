"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE_MB = 10;

export function FileDropzone({
  files,
  onFilesChange,
  label = "Add photos (optional)",
  description = "A photo of the issue or model/serial plate helps our technicians prepare.",
}: {
  files: File[];
  onFilesChange: (files: File[]) => void;
  label?: string;
  description?: string;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Object URLs are an external resource tied 1:1 to `files`, so they're
  // derived here rather than mirrored into state from an effect.
  const previews = useMemo(() => {
    const map: Record<string, string> = {};
    for (const file of files) {
      if (file.type.startsWith("image/")) {
        map[file.name + file.lastModified] = URL.createObjectURL(file);
      }
    }
    return map;
  }, [files]);

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const accepted: File[] = [];
    for (const file of Array.from(list)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError(`"${file.name}" isn't a supported file type.`);
        continue;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`"${file.name}" is larger than ${MAX_SIZE_MB}MB.`);
        continue;
      }
      accepted.push(file);
    }
    if (accepted.length) {
      setError(null);
      onFilesChange([...files, ...accepted]);
    }
  };

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-[14px] font-semibold text-navy">
        {label}
      </label>
      <p className="mb-2 text-[13px] text-muted">{description}</p>

      <div
        role="button"
        tabIndex={0}
        aria-describedby={`${inputId}-hint`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] border-2 border-dashed px-6 py-10 text-center transition-colors duration-200",
          dragging ? "border-[#17438F] bg-[#EAF1FB]" : "border-[#D8E2EE] bg-[#FAFBFD] hover:border-[#17438F]/60",
        )}
      >
        <UploadCloud className="h-9 w-9 text-[#17438F]" />
        <p className="text-[15px] font-semibold text-navy">
          Drag photos here
          <br />
          <span className="font-normal text-muted">or</span>
        </p>
        <span className="rounded-full border border-[#17438F] px-4 py-1.5 text-[13px] font-bold text-[#17438F] transition hover:bg-[#EAF1FB]">
          Browse Files
        </span>
        <p id={`${inputId}-hint`} className="mt-1 text-[12px] text-muted">
          Accepted: JPG, PNG, WEBP, PDF · Maximum 10MB
        </p>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept={ACCEPTED_TYPES.join(",")}
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && (
        <p role="alert" className="mt-2 text-[13px] font-semibold text-[#C0392B]">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {files.map((file, i) => {
            const key = file.name + file.lastModified;
            const previewUrl = previews[key];
            return (
              <li key={key} className="relative aspect-square overflow-hidden rounded-[12px] border border-[#D8E2EE] bg-white">
                {previewUrl ? (
                  <Image src={previewUrl} alt={file.name} fill className="object-cover" sizes="120px" unoptimized />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
                    <FileText className="h-6 w-6 text-[#17438F]" />
                    <span className="line-clamp-2 text-[10px] text-muted">{file.name}</span>
                  </div>
                )}
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => onFilesChange(files.filter((_, idx) => idx !== i))}
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-navy/80 text-white transition hover:bg-navy"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
