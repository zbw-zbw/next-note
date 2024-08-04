import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";
import { INoteItem } from "@/libs/redis";
import SidebarNoteItemHeader from "./SidebarNoteItemHeader";

export default function SidebarNoteItem({
  noteId,
  note,
}: {
  noteId: string;
  note: INoteItem;
}) {
  const { title, content = "", updateTime } = note;

  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
}
