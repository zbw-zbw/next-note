"use client";

import { useSearchParams } from "next/navigation";

import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";
import { INoteItem } from "@/libs/prisma";

interface IProps {
  notes: Array<{
    noteId: string;
    note: INoteItem;
    header: React.ReactNode;
  }>;
  lng: string;
}

export default function SidebarNoteListFilter({ notes, lng }: IProps) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="notes-list">
      {notes.map(noteItem => {
        const { noteId, note, header } = noteItem;
        const { title, content = "" } = note;

        const show =
          !searchText ||
          (searchText &&
            title.toLowerCase().includes(searchText.toLowerCase()));

        if (show) {
          return (
            <SidebarNoteItemContent
              key={noteId}
              id={noteId}
              title={title}
              expandedChildren={
                <p className="sidebar-note-excerpt">
                  {content.substring(0, 20) || <i>(No content)</i>}
                </p>
              }
              lng={lng}
            >
              {header}
            </SidebarNoteItemContent>
          );
        }

        return null;
      })}
    </ul>
  );
}
