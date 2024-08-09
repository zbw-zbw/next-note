"use client";

export default async function SignIn() {
  const response = await fetch("http://localhost:3000/api/auth/csrf");
  const { csrfToken } = await response.json();

  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <div style={{ marginTop: 10 }}>
        <label>用户名：</label>
        <input name="username" type="text" />
      </div>
      <div style={{ marginTop: 10 }}>
        <label>密&nbsp;&nbsp;&nbsp;码：</label>
        <input name="password" type="password" />
      </div>
      <div style={{ margin: "10px auto", textAlign: "center" }}>
        <button type="submit" style={{ marginLeft: 10 }}>
          登录
        </button>
      </div>
    </form>
  );
}
