import dayjs from "dayjs";

import NotePreview from "@/components/NotePreview";
import EditButton from "@/components/EditButton";
import { INoteItem } from "@/libs/redis";
import { useTranslation } from "@/app/i18n";

export default async function Note({
  noteId,
  note,
  lng,
}: {
  noteId: string;
  note: INoteItem;
  lng: string;
}) {
  const { title, content, updateTime } = note;

  const { t } = await useTranslation(lng);

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            {t("lastUpdated")}
            {dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")}
          </small>
          <EditButton noteId={noteId} lng={lng}>
            {t("edit")}
          </EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}
