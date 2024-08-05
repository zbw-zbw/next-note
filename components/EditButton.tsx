import Link from "next/link";

export default function EditButton({
  noteId,
  lng,
  children,
}: {
  noteId: string | null;
  lng: string;
  children: React.ReactNode;
}) {
  const isDraft = noteId == null;

  return (
    <Link href={`/${lng}/note/edit/${noteId || ""}`} className="link--unstyled">
      <button
        className={[
          "edit-button",
          isDraft ? "edit-button--solid" : "edit-button--outline",
        ].join(" ")}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  );
}
