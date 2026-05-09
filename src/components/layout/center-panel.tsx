"use client";

import React from "react";
import { PromptInput } from "./prompt-input";
import { ExecutionTimeline } from "../timeline/timeline";

export function CenterPanel() {
  return (
    <div className="flex flex-col h-full bg-background relative">
      <div className="flex-1 overflow-y-auto scrollbar-none p-4">
        <ExecutionTimeline />
      </div>
      <div className="p-4 border-t border-zinc-800/50 bg-background/80 backdrop-blur-md">
        <PromptInput />
      </div>
    </div>
  );
}
