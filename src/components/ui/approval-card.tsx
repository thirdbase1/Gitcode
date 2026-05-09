"use client";

import React from "react";
import { ShieldAlert, Check, X, Lock } from "lucide-react";

export function ApprovalCard({ operation, files, risk = "medium" }: { operation: string, files: string[], risk?: "low" | "medium" | "high" }) {
  return (
    <div className="max-w-md bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
      <div className="bg-zinc-900/50 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert size={16} className={risk === "high" ? "text-red-500" : "text-amber-500"} />
          <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">Approval Required</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock size={10} className="text-zinc-600" />
          <span className="text-[9px] font-mono text-zinc-600 uppercase">System Locked</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h4 className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Operation</h4>
          <p className="text-sm text-zinc-200 font-sans">{operation}</p>
        </div>

        <div>
          <h4 className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Affected Files</h4>
          <div className="flex flex-wrap gap-1.5">
            {files.map(file => (
              <span key={file} className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
                {file}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/30 p-2 flex gap-2 border-t border-zinc-800">
        <button className="flex-1 bg-white text-black text-[10px] font-mono font-bold uppercase py-2 rounded hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
          <Check size={12} /> Approve Once
        </button>
        <button className="flex-1 bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] font-mono font-bold uppercase py-2 rounded hover:bg-zinc-800 hover:text-zinc-200 transition-colors flex items-center justify-center gap-2">
          <X size={12} /> Decline
        </button>
      </div>
    </div>
  );
}
