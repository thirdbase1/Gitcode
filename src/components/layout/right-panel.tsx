"use client";

import React from "react";
import { Folder, ChevronRight, Search, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

export function RightPanel() {
  return (
    <div className="h-full flex flex-col bg-black border-l border-zinc-900/50">
      <div className="h-9 border-b border-zinc-900/50 flex items-center justify-between px-3 bg-zinc-950/50">
        <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase font-bold">Project Explorer</span>
        <Search size={12} className="text-zinc-600" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none py-2">
        <div className="space-y-1">
          <TreeItem label="src" isOpen>
            <TreeItem label="app" isOpen>
              <FileItem label="layout.tsx" active />
              <FileItem label="page.tsx" />
              <FileItem label="globals.css" />
            </TreeItem>
            <TreeItem label="components" />
            <TreeItem label="lib" />
          </TreeItem>
          <FileItem label="package.json" />
          <FileItem label="next.config.js" />
        </div>
      </div>

      {/* Hidden on small heights (mobile) or just keep it simple */}
      <div className="h-1/3 border-t border-zinc-900/50 bg-zinc-950/20 min-h-[120px]">
        <div className="h-8 border-b border-zinc-900/50 flex items-center px-3">
          <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase">Git State</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500">BRANCH</span>
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">main</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500">STAGED</span>
            <span className="text-[10px] font-mono text-zinc-400">0 FILES</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TreeItem({ label, children, isOpen = false }: { label: string, children?: React.ReactNode, isOpen?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 px-3 py-1 hover:bg-zinc-900/50 cursor-pointer group transition-colors">
        <ChevronRight size={12} className={cn("text-zinc-600 transition-transform", isOpen && "rotate-90")} />
        <Folder size={14} className="text-zinc-500 fill-zinc-500/10" />
        <span className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-200">{label}</span>
      </div>
      {isOpen && children && (
        <div className="ml-3 border-l border-zinc-900/50 pl-1">
          {children}
        </div>
      )}
    </div>
  );
}

function FileItem({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-1.5 px-3 py-1 hover:bg-zinc-900/50 cursor-pointer group transition-colors ml-4",
      active && "bg-zinc-900/80 border-r-2 border-white"
    )}>
      <FileCode size={14} className={cn("text-zinc-600", active && "text-zinc-400")} />
      <span className={cn(
        "text-[11px] font-mono transition-colors",
        active ? "text-white font-medium" : "text-zinc-500 group-hover:text-zinc-300"
      )}>{label}</span>
    </div>
  );
}
