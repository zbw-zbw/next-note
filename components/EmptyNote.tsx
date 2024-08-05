import { useTranslation } from "@/app/i18n";

export default async function EmptyNote({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng);

  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("initText")}</span>
    </div>
  );
}
