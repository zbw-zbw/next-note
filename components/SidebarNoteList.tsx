import { getAllNotes } from "@/libs/prisma";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";
import SidebarNoteListFilter from "./SidebarNoteListFilter";

export default async function SidebarNoteList({ lng }: { lng: string }) {
  const notes = await getAllNotes();

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);

        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updatedAt={noteData.updatedAt}
            />
          ),
        };
      })}
      lng={lng}
    />
  );
}
