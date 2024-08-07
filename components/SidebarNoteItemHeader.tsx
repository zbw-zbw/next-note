import dayjs from "dayjs";

import { INoteItem } from "@/libs/prisma";

export default function SidebarNoteItemHeader({
  title,
  updatedAt,
}: Pick<INoteItem, "title" | "updatedAt">) {
  return (
    <header className="sidebar-note-header">
      <strong>{title}</strong>
      <small>{dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")}</small>
    </header>
  );
}
