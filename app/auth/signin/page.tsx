"use client";

import { useEffect, useState } from "react";

export default function SignIn() {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${location.origin}/api/auth/csrf`);
      const { csrfToken } = await response.json();
      setToken(csrfToken);
    }
    fetchData();
  }, []);

  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input type="hidden" name="csrfToken" value={token} />
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
