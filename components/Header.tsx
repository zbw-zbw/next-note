import Link from "next/link";

import { signIn, signOut, auth } from "auth";
import { revalidatePath } from "next/cache";

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button>Sign In</button>
    </form>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>Sign Out</button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();

  console.log("session", session);

  return (
    <header style={{ display: "flex", justifyContent: "space-around" }}>
      <Link href="/client">Client Side Component</Link>
      {session?.user ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          {session?.user.name}
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </header>
  );
}
