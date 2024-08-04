"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { addNote, updateNote, deleteNote } from "@/libs/redis";

export interface IResponse {
  message: string;
  errors?: z.ZodIssue[];
}

const schema = z.object({
  title: z.string(),
  content: z.string(),
});

export async function saveNote(
  prevState: IResponse,
  formData: FormData
): Promise<IResponse> {
  const noteId = formData.get("noteId") as string;
  const data = JSON.stringify({
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  });

  // const validated = schema.safeParse(data);
  // if (!validated.success) {
  //   return {
  //     message: "Validation failed!",
  //     errors: validated.error.issues,
  //   };
  // }

  if (noteId) {
    updateNote(noteId, data);
    revalidatePath("/", "layout");
    // redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(data);
    revalidatePath("/", "layout");
    // redirect(`/note/${res}`);
  }

  return { message: "Note saved successfully" };
}

export async function delNote(
  prevState: IResponse,
  formData: FormData
): Promise<IResponse> {
  const noteId = formData.get("noteId") as string;
  deleteNote(noteId);
  revalidatePath("/", "layout");
  redirect("/");

  // return { message: "Note deleted successfully" };
}
