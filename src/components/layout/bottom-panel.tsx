"use client";

import React from "react";
import { Terminal } from "../terminal/terminal";

export function BottomPanel() {
  return (
    <div className="h-full flex flex-col bg-background border-t border-border">
      <div className="h-8 border-b border-border flex items-center px-3 bg-neutral-900/50 gap-4">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Terminal</span>
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase opacity-30">Output</span>
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase opacity-30">Sandbox</span>
      </div>
      <div className="flex-1 bg-black overflow-hidden">
        <Terminal />
      </div>
    </div>
  );
}
