"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import NotePreview from "@/components/NotePreview";
import { saveNote, delNote, IResponse } from "@/app/actions";
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";

const initialState: IResponse = {
  message: "",
  errors: [],
};

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody,
}: {
  noteId?: string;
  initialTitle: string;
  initialBody: string;
}) {
  const [saveState, saveFormAction] = useFormState(saveNote, initialState);
  const [_delState, delFormAction] = useFormState(delNote, initialState);

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  useEffect(() => {
    if (saveState.errors) {
      // 处理错误
      console.log(saveState.errors);
    }
  }, [saveState]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId} />
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="note-editor-menu">
          {saveState?.message}
          {saveState.errors?.length && saveState?.errors[0]?.message}
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
