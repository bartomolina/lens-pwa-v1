"use client";

import { Navbar, Page } from "konsta/react";

import { useDefaultProfile } from "@/lib/lens";
import { Feed } from "@/ui/feed";
import { Navigation } from "@/ui/layout/navigation";

export default function FeedPage() {
  const { data: profile } = useDefaultProfile();
  return (
    <Page>
      <Navbar title="Feed" />
      {profile && <Feed profile={profile} />}
      <Navigation activeTab="feed" />
    </Page>
  );
}
