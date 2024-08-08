import { useTranslation } from "@/app/i18n";
import EmptyNote from "@/components/EmptyNote";
import NoteEditor from "@/components/NoteEditor";
import { getNote } from "@/libs/prisma";

export default async function EditPage({
  params,
}: {
  params: { id: string; lng: string };
}) {
  const { id, lng } = params;
  const note = await getNote(id);

  const { t } = await useTranslation(lng);

  if (!note) return <EmptyNote lng={lng} />;

  return (
    <NoteEditor
      noteId={id}
      initialTitle={note.title}
      initialBody={note.content}
      lng={lng}
      previewText={t("preview")}
      saveText={t("done")}
      deleteText={t("delete")}
    />
  );
}
