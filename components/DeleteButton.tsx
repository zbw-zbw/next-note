import { useFormStatus } from "react-dom";

export default function DeleteButton({
  isDraft,
  formAction,
  btnText,
}: {
  isDraft: boolean;
  formAction: (payload: FormData) => void;
  btnText: string;
}) {
  const { pending } = useFormStatus();

  return (
    !isDraft && (
      <button
        className="note-editor-delete"
        disabled={pending}
        formAction={formAction}
        role="menuitem"
      >
        <img
          src="/cross.svg"
          width="10px"
          height="10px"
          alt=""
          role="presentation"
        />
        {btnText}
      </button>
    )
  );
}
