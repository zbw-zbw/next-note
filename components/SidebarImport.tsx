"use client";

import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

export default function SidebarImport({
  lng,
  importText,
}: {
  lng: string;
  importText: string;
}) {
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");

      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("upload failed:", response.statusText);

        return;
      }

      const data = await response.json();
      startTransition(() => router.push(`/note/${data.uid}`));
      startTransition(() => router.refresh());
    } catch (error) {
      console.error("upload error:", error);
    }

    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <form
      method="post"
      encType="multipart/form-data"
      className="sidebar-import"
    >
      <div style={{ textAlign: "center" }}>
        <label htmlFor="file" style={{ cursor: "pointer" }}>
          {importText}
        </label>
        <input
          type="file"
          id="file"
          name="file"
          multiple
          style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
          onChange={handleFileChange}
          accept=".md"
        />
      </div>
    </form>
  );
}
