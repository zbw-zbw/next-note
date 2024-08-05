"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { defaultLocale, locales } from "@/config";

export default function ToggleLanguage({ lng }: { lng: string }) {
  const pathname = usePathname();
  const configPathname = pathname.replace(`/${lng}`, "");

  useEffect(() => {
    // 隐藏默认语言的路由前缀
    if (pathname.includes(defaultLocale)) {
      window.history.replaceState(
        null,
        "",
        pathname.replace(`/${defaultLocale}`, "") || "/"
      );
    }
  }, [pathname]);

  return locales
    .filter(l => l !== lng)
    .map(l => {
      const href = `/${l}${configPathname}`;

      return (
        <Link key={l} href={href} locale={l}>
          <div
            className="btn-toggle-language"
            role="button"
            aria-label="toggle-language"
          >
            <img
              src="/lng.svg"
              width="20px"
              height="20px"
              alt="toggle-language"
            />
          </div>
        </Link>
      );
    });
}
