import { useTranslation } from "@/app/i18n";
import NoteEditor from "@/components/NoteEditor";

export default async function EditPage({
  params,
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(params.lng);

  return (
    <NoteEditor
      initialTitle="Untitled"
      initialBody=""
      previewText={t("preview")}
      saveText={t("save")}
      deleteText={t("delete")}
    />
  );
}
