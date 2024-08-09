import Link from "next/link";

import { signIn, signOut, auth } from "auth";

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button>立即登录</button>
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
      <button>退出登录</button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();

  return (
    <header className="page-header">
      <Link href="/client">个人中心</Link>
      {session?.user ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>{session?.user.name}</div>
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </header>
  );
}
