"use client";

import React, { useState } from "react";
import { ChevronDown, SendHorizontal, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

const MODELS = [
  { id: "gpt-4o", name: "GPT-4o", icon: Zap },
  { id: "claude-3-5-sonnet", name: "Claude 3.5", icon: Zap },
  { id: "o1-preview", name: "o1 Preview", icon: Zap },
];

export function PromptInput() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative flex items-center bg-zinc-900/30 border border-zinc-800/50 rounded-lg overflow-hidden focus-within:border-zinc-700/50 transition-all duration-200 shadow-2xl">
        {/* Model Switcher - INTEGRATED */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1.5 px-3 py-2.5 text-[10px] font-mono text-zinc-400 hover:text-white border-r border-zinc-800/50 transition-colors group outline-none">
              <span className="uppercase tracking-widest">{selectedModel.name}</span>
              <ChevronDown size={10} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-zinc-900 border-zinc-800 text-zinc-400 p-1 min-w-[140px]">
            {MODELS.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 text-[10px] font-mono uppercase tracking-widest cursor-pointer hover:bg-white hover:text-black focus:bg-white focus:text-black transition-colors rounded-sm",
                  selectedModel.id === model.id && "text-white bg-zinc-800/50"
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
          className="flex-1 bg-transparent px-4 py-2.5 text-sm font-sans focus:outline-none placeholder:text-zinc-600 text-zinc-200"
        />

        {/* Send Action */}
        <button className="p-2 mr-1 text-zinc-500 hover:text-white transition-colors group">
          <SendHorizontal size={18} className="group-hover:scale-105 transition-transform" />
        </button>
      </div>
    </div>
  );
}
