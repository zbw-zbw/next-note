import dayjs from "dayjs";

import { INoteItem } from "@/libs/redis";

export default function SidebarNoteItemHeader({
  title,
  updateTime,
}: Pick<INoteItem, "title" | "updateTime">) {
  return (
    <header className="sidebar-note-header">
      <strong>{title}</strong>
      <small>{dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")}</small>
    </header>
  );
}
