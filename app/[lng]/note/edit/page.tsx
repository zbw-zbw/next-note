import { useTranslation } from "@/app/i18n";
import NoteEditor from "@/components/NoteEditor";

export default async function EditPage({
  params,
}: {
  params: { lng: string };
}) {
  const { lng } = params;
  const { t } = await useTranslation(lng);

  return (
    <NoteEditor
      initialTitle="Untitled"
      initialBody=""
      lng={lng}
      previewText={t("preview")}
      saveText={t("save")}
      deleteText={t("delete")}
    />
  );
}
