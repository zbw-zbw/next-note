import EmptyNote from "@/components/EmptyNote";
import Note from "@/components/Note";
import { getNote, INoteItem } from "@/libs/prisma";

export default async function Page({
  params,
}: {
  params: { id: string; lng: string };
}) {
  const { id, lng } = params;
  const note = (await getNote(id)) as INoteItem;

  if (note == null) return <EmptyNote lng={lng} />;

  return <Note noteId={id} note={note} lng={lng} />;
}
