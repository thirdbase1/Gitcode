"use client";

import React, { useState } from "react";
import {
  Box,
  GitBranch,
  Layers,
  History,
  Bell,
  Settings,
  FolderTree,
  Activity,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "files", icon: FolderTree, label: "Explorer" },
  { id: "timeline", icon: History, label: "Timeline" },
  { id: "git", icon: GitBranch, label: "Git" },
  { id: "execution", icon: Activity, label: "Execution" },
  { id: "layers", icon: Layers, label: "Sandbox" },
];

export function Sidebar() {
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="w-12 h-full border-r border-zinc-900/50 flex flex-col items-center py-4 gap-6 bg-black z-20">
      <div className="p-1.5 rounded bg-white text-black mb-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
        <Box size={16} strokeWidth={2.5} />
      </div>

      <div className="flex flex-col gap-5 text-zinc-600">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "p-1.5 rounded-md transition-all duration-200 group relative",
              activeTab === item.id ? "text-white bg-zinc-900/50" : "hover:text-zinc-300"
            )}
          >
            <item.icon size={20} strokeWidth={1.5} />
            {activeTab === item.id && (
              <div className="absolute left-[-18px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-white rounded-r-full shadow-[2px_0_10px_rgba(255,255,255,0.5)]" />
            )}

            {/* Tooltip hint */}
            <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-800 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-2xl">
              {item.label}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-5 text-zinc-600">
        <button className="hover:text-zinc-300 transition-colors"><Bell size={20} strokeWidth={1.5} /></button>
        <button className="hover:text-zinc-300 transition-colors"><Settings size={20} strokeWidth={1.5} /></button>
        <div className="w-6 h-px bg-zinc-900/50 my-1" />
        <button className="hover:text-zinc-300 transition-colors"><UserCircle size={22} strokeWidth={1.5} /></button>
      </div>
    </div>
  );
}
