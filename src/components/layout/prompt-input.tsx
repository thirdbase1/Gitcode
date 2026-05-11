"use client";

import React, { useState } from "react";
import { ChevronDown, SendHorizontal, Zap, Sparkles, Cpu, Bot, Search, Wind } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

const MODELS = [
  { id: "z-ai/glm-4.5-air:free", name: "GLM 4.5 Air", icon: Zap },
  { id: "inclusionai/ring-2.6-1t:free", name: "Ring 2.6", icon: Sparkles },
  { id: "baidu/cobuddy:free", name: "CoBuddy", icon: Bot },
  { id: "poolside/laguna-m.1:free", name: "Laguna M.1", icon: Wind },
  { id: "openrouter/owl-alpha", name: "Owl Alpha", icon: Search },
  { id: "minimax/minimax-m2.5:free", name: "MiniMax 2.5", icon: Cpu },
];

export function PromptInput() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="relative flex items-center bg-zinc-900/30 border border-zinc-800/50 rounded-lg overflow-hidden focus-within:border-zinc-700/50 transition-all duration-200 shadow-2xl">
        {/* Model Switcher - INTEGRATED */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1.5 px-3 py-2.5 text-[10px] font-mono text-zinc-400 hover:text-white border-r border-zinc-800/50 transition-colors group outline-none shrink-0">
              <span className="uppercase tracking-widest truncate max-w-[80px]">{selectedModel.name}</span>
              <ChevronDown size={10} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-zinc-950 border-zinc-800 text-zinc-400 p-1 min-w-[160px] z-[60]">
            {MODELS.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 text-[10px] font-mono uppercase tracking-widest cursor-pointer hover:bg-white hover:text-black focus:bg-white focus:text-black transition-colors rounded-sm",
                  selectedModel.id === model.id && "text-white bg-zinc-900"
                )}
              >
                <model.icon size={10} />
                {model.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Input */}
        <input
          type="text"
          placeholder="Ask Gitcode..."
          className="flex-1 bg-transparent px-4 py-2.5 text-sm font-sans focus:outline-none placeholder:text-zinc-600 text-zinc-200 min-w-0"
        />

        {/* Send Action */}
        <button className="p-2 mr-1 text-zinc-500 hover:text-white transition-colors group shrink-0">
          <SendHorizontal size={18} className="group-hover:scale-105 transition-transform" />
        </button>
      </div>
    </div>
  );
}
