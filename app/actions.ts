"use server";

import { redirect } from "next/navigation";

import { addNote, updateNote, deleteNote } from "@/libs/redis";
import { INoteItem } from "@/libs/redis";
import { revalidatePath } from "next/cache";
import { sleep } from "@/libs";

export async function saveNote(formData: FormData) {
  const noteId = formData.get("noteId");
  const data = JSON.stringify({
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  });

  if (noteId) {
    updateNote(noteId, data);
    revalidatePath("/", "layout");
    redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(data);
    revalidatePath("/", "layout");
    redirect(`/note/${res}`);
  }
}

export async function delNote(formData: FormData) {
  const noteId = formData.get("noteId");
  deleteNote(noteId);
  revalidatePath("/", "layout");
  redirect("/");
}
