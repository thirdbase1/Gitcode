"use client";

import React, { useState } from "react";
import { MessageSquare, Code, Box, GitBranch, Terminal as TerminalIcon, GitCommit, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CenterPanel } from "./center-panel";
import { RightPanel } from "./right-panel";
import { BottomPanel } from "./bottom-panel";
import { AnimatePresence, motion, PanInfo } from "framer-motion";

const TABS = [
  { id: "chat", icon: MessageSquare, label: "Chat" },
  { id: "code", icon: Code, label: "Code" },
  { id: "sandbox", icon: Box, label: "Sandbox" },
  { id: "git", icon: GitBranch, label: "Git" },
];

export function MobileLayout() {
  const [activeTab, setActiveTab] = useState("chat");
  const [showTerminal, setShowTerminal] = useState(false);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const currentIndex = TABS.findIndex(t => t.id === activeTab);

    if (info.offset.x > threshold && currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    } else if (info.offset.x < -threshold && currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-screen overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      {/* Top Header / Floating Status */}
      <div className="px-4 h-14 flex items-center justify-between border-b border-zinc-900/50 bg-black/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-300 uppercase font-bold">Gitcode OS</span>
        </div>
        <div className="flex items-center gap-4">
          <Search size={16} className="text-zinc-600" />
          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className={cn(
              "p-1.5 rounded-md transition-all duration-200",
              showTerminal ? "bg-white text-black scale-95" : "text-zinc-500 hover:text-white"
            )}
          >
            <TerminalIcon size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <motion.div
        className="flex-1 relative overflow-hidden"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <CenterPanel />
            </motion.div>
          )}
          {activeTab === "code" && (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <RightPanel />
            </motion.div>
          )}
          {activeTab === "sandbox" && (
             <motion.div
              key="sandbox"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full p-4 space-y-6 overflow-y-auto scrollbar-none"
            >
               <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-5 space-y-5 shadow-2xl">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.15em] font-bold">Runtime State</span>
                    <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Running</span>
                 </div>
                 <div className="space-y-2.5">
                    <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                       <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "67%" }}
                        className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                       />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">
                       <span>CPU usage</span>
                       <span className="text-zinc-300">67.4%</span>
                    </div>
                 </div>
               </div>
               <div className="aspect-video border border-zinc-900 bg-zinc-950 rounded-lg flex flex-col items-center justify-center gap-3 shadow-inner">
                  <Box size={24} className="text-zinc-800 animate-pulse" />
                  <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.2em]">Sandbox Output Ready</span>
               </div>
            </motion.div>
          )}
          {activeTab === "git" && (
             <motion.div
              key="git"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full p-4"
            >
               <div className="space-y-4">
                 <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold">Execution History</span>
                    <GitCommit size={14} className="text-zinc-600" />
                 </div>
                 {[
                   { msg: "feat: implement mobile layout", time: "09:42:01", hash: "a9b2c3d" },
                   { msg: "fix: terminal resize logic", time: "08:15:33", hash: "e4f5g6h" },
                   { msg: "chore: update design system", time: "Yesterday", hash: "i7j8k9l" },
                 ].map((commit, i) => (
                   <div key={i} className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 space-y-2 active:bg-zinc-900 transition-colors shadow-sm">
                      <div className="text-[12px] font-sans text-zinc-200 font-medium leading-tight">{commit.msg}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-zinc-600 uppercase">{commit.time}</span>
                        <span className="text-zinc-800 text-[8px]">•</span>
                        <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded uppercase">{commit.hash}</span>
                      </div>
                   </div>
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsible Terminal Drawer */}
        <AnimatePresence>
          {showTerminal && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="absolute inset-0 z-40 bg-black pt-10 ring-1 ring-zinc-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
              <div
                className="absolute top-0 left-0 right-0 h-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
                onClick={() => setShowTerminal(false)}
              >
                <div className="w-10 h-1 bg-zinc-800 rounded-full opacity-50" />
              </div>
              <BottomPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Native-feel Bottom Navigation */}
      <div className="h-[72px] pb-[env(safe-area-inset-bottom,20px)] border-t border-zinc-900 bg-zinc-950/90 backdrop-blur-2xl flex items-center justify-around px-2 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 p-2 transition-all duration-300 w-full group relative",
              activeTab === tab.id ? "text-white" : "text-zinc-600 hover:text-zinc-400"
            )}
          >
            <div className={cn(
              "p-1 rounded-md transition-all duration-300",
              activeTab === tab.id && "bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            )}>
              <tab.icon size={19} strokeWidth={activeTab === tab.id ? 2.5 : 1.8} className="transition-transform group-active:scale-90" />
            </div>
            <span className={cn(
              "text-[8px] font-mono uppercase tracking-[0.1em] font-black transition-colors",
              activeTab === tab.id ? "text-white" : "text-zinc-700"
            )}>{tab.label}</span>

            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-6 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
