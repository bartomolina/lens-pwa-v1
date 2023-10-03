"use client";

import { Navbar, Page } from "konsta/react";

import { useDefaultProfile } from "@/lib/lens";
import { Navigation } from "@/ui/layout/navigation";
import { OwnPublications } from "@/ui/own-publications";

export default function Me() {
  const { data: profile } = useDefaultProfile();

  return (
    <Page>
      <Navbar title="Me" />
      {profile && <OwnPublications profile={profile} />}
      <Navigation activeTab="me" />
    </Page>
  );
}
