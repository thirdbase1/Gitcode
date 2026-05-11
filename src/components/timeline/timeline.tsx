"use client";

import React from "react";
import { CheckCircle2, Terminal, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApprovalCard } from "../ui/approval-card";

const TIMELINE_EVENTS = [
  {
    id: "1",
    type: "decision",
    status: "success",
    title: "Analyze Repository Structure",
    duration: "1.2s",
    content: "Determined project uses Next.js with App Router and Tailwind CSS.",
  },
  {
    id: "2",
    type: "tool",
    status: "success",
    title: "list_files",
    duration: "450ms",
    content: "Found 12 files in root directory.",
  },
  {
    id: "3",
    type: "approval",
    status: "waiting",
    title: "Approval Required",
    duration: "WAITING",
    component: (
      <ApprovalCard
        operation="Apply visual refinements to Sidebar and Right Panel components."
        files={["src/components/layout/sidebar.tsx", "src/components/layout/right-panel.tsx"]}
        risk="medium"
      />
    )
  }
];

export function ExecutionTimeline() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <div className="flex items-center gap-2 mb-8 select-none">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">System Online // Execution Active</span>
      </div>

      <div className="relative space-y-4">
        {/* Connection line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-zinc-800/30" />

        {TIMELINE_EVENTS.map((event) => (
          <div key={event.id} className="relative pl-10 group animate-in slide-in-from-left-2 duration-300">
            {/* Status Icon */}
            <div className={cn(
              "absolute left-[9px] top-1 h-[14px] w-[14px] rounded-full border-2 bg-background z-10 flex items-center justify-center transition-colors",
              event.status === "success" ? "border-emerald-500" : "border-amber-500 animate-pulse"
            )}>
              {event.status === "success" ? (
                <CheckCircle2 size={8} className="text-emerald-500" />
              ) : (
                <div className="h-1 w-1 rounded-full bg-amber-500" />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {event.type === "decision" && <CheckCircle2 size={12} className="text-zinc-500" />}
                  {event.type === "tool" && <Terminal size={12} className="text-zinc-500" />}
                  {event.type === "approval" && <Box size={12} className="text-amber-500" />}
                  <h3 className="text-xs font-mono font-medium text-zinc-300 uppercase tracking-tight">{event.title}</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-600 tracking-tighter">{event.duration}</span>
              </div>

              {event.content && (
                <div className="bg-zinc-900/10 border border-zinc-900/50 rounded-lg p-3 hover:border-zinc-800 transition-colors">
                  <p className="text-sm text-zinc-500 leading-relaxed font-sans">
                    {event.content}
                  </p>
                </div>
              )}

              {event.component && (
                <div className="mt-2">
                  {event.component}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
