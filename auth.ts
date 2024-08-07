import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

import { addUser, getUser } from "./libs/redis";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      // 显示按钮文案 (e.g. "Sign in with...")
      name: "密码登录",
      // credentials 用于渲染登录页面表单
      credentials: {
        username: { label: "邮箱", type: "text", placeholder: "输入您的邮箱" },
        password: {
          label: "密码",
          type: "password",
          placeholder: "输入您的密码",
        },
      },
      // 处理从用户收到的认证信息
      // @ts-ignore
      async authorize(credentials) {
        // 默认情况下不对用户输入进行验证，确保使用 Zod 这样的库进行验证
        let user = null;
        // 登陆信息验证
        user = await getUser(
          credentials.username as string,
          credentials.password as string
        );
        // 密码错误
        if (user === 1) return null;
        // 用户注册
        if (user === 0) {
          user = await addUser(
            credentials.username as string,
            credentials.password as string
          );
        }
        if (!user) {
          throw new Error("User was not found and could not be created.");
        }
        return user;
      },
    }),
    GitHub,
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {},
});
