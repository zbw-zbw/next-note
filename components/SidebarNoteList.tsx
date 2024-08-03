import { getAllNotes } from "@/libs/redis";
import SidebarNoteItem from "./SidebarNoteItem";

export default async function SidebarNoteList() {
  const notes = await getAllNotes();
  const arr = Object.entries(notes);

  if (!arr.length) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => (
        <li key={noteId}>
          <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
        </li>
      ))}
    </ul>
  );
}
