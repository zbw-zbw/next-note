"use client";

import { useSession } from "next-auth/react";

export default function ClientExample() {
  const { data: session, status } = useSession();

  const userInfo = session?.user || {};
  const { name } = userInfo;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>请先登录</p>;
  }

  return (
    <div className="user-info">
      <p>用户名：{name}</p>
    </div>
  );
}
