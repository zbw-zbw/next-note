import React, { Suspense } from "react";
import Link from "next/link";

import SidebarNoteList from "./SidebarNoteList";
import EditButton from "./EditButton";
import NoteListSkeleton from "./NoteListSkeleton";
import SidebarSearchField from "./SidebarSearchField";
import { useTranslation } from "@/app/i18n";
import ToggleLanguage from "./ToggleLanguage";
import { locales } from "@/config";
import SidebarImport from "./SidebarImport";

export default async function Sidebar({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng);

  const targetUrl = `/${locales.find(locale => locale === lng) || ""}`;

  return (
    <section className="col sidebar">
      <Link href={targetUrl} className="link--unstyled">
        <section className="sidebar-header">
          <img
            className="logo"
            src="/logo.svg"
            width="22px"
            height="20px"
            alt=""
            role="presentation"
          />
          <strong>React Notes</strong>
        </section>
      </Link>
      <ToggleLanguage lng={lng} />
      <section className="sidebar-menu" role="menubar">
        <SidebarSearchField searchText={t("search")} />
        <EditButton noteId={null} lng={lng}>
          {t("new")}
        </EditButton>
      </section>
      <nav>
        <Suspense fallback={<NoteListSkeleton />}>
          <SidebarNoteList lng={lng} />
        </Suspense>
        <SidebarImport lng={lng} importText={t("import")} />
      </nav>
    </section>
  );
}
