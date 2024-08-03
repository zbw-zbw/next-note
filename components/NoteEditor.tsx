"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import NotePreview from "@/components/NotePreview";
import { deleteNote } from "@/libs/redis";
import { saveNote } from "@/app/actions";

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody,
}: {
  noteId?: string;
  initialTitle: string;
  initialBody: string;
}) {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <input type="hidden" name="noteId" value={noteId} />
        <div className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={pending}
            type="submit"
            role="menuitem"
            formAction={saveNote}
          >
            <img
              src="/checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            {pending ? "Saving" : "Done"}
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              disabled={pending}
              role="menuitem"
              formAction={deleteNote}
            >
              <img
                src="/cross.svg"
                width="10px"
                height="10px"
                alt=""
                role="presentation"
              />
              Delete
            </button>
          )}
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          id="note-body-input"
          name="body"
          value={body}
          onChange={handleBodyChange}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
