"use client";

import React from "react";
import { MainLayout } from "./main-layout";
import { MobileLayout } from "./mobile-layout";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppShell() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLayout />;
  }

  return <MainLayout />;
}
