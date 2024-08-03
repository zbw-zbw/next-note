import EmptyNote from "@/components/EmptyNote";
import Note from "@/components/Note";
import { getNote } from "@/libs/redis";

export default async function Page({ params }: { params: { id: string } }) {
  const noteId = params.id;
  const note = await getNote(noteId);

  if (note == null) return <EmptyNote />;

  return <Note noteId={noteId} note={note} />;
}
