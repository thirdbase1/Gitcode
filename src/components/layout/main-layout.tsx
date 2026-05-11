"use client";

import React from "react";
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { Sidebar } from "./sidebar";
import { CenterPanel } from "./center-panel";
import { RightPanel } from "./right-panel";
import { BottomPanel } from "./bottom-panel";

export function MainLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <PanelGroup orientation="vertical">
          <Panel defaultSize={75} minSize={20}>
            <PanelGroup orientation="horizontal">
              <Panel defaultSize={60} minSize={30}>
                <CenterPanel />
              </Panel>
              <PanelResizeHandle className="w-px bg-border hover:bg-white/10 transition-colors" />
              <Panel defaultSize={40} minSize={20}>
                <RightPanel />
              </Panel>
            </PanelGroup>
          </Panel>
          <PanelResizeHandle className="h-px bg-border hover:bg-white/10 transition-colors" />
          <Panel defaultSize={25} minSize={10}>
            <BottomPanel />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
