import EmptyNote from "@/components/EmptyNote";
import NoteEditor from "@/components/NoteEditor";
import { getNote } from "@/libs/redis";

export default async function EditPage({ params }: { params: { id: string } }) {
  const noteId = params.id;
  const note = await getNote(noteId);

  if (note === null) return <EmptyNote />;

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content}
    />
  );
}
