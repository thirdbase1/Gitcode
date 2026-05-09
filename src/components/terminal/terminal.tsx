"use client";

import React, { useEffect, useRef } from "react";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 12,
      fontFamily: 'var(--font-geist-mono)',
      theme: {
        background: '#000000',
        foreground: '#ffffff',
        cursor: '#ffffff',
        selectionBackground: 'rgba(255, 255, 255, 0.3)',
      },
      allowTransparency: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    term.writeln("\x1b[32mgitcode $\x1b[0m hahaha");
    term.writeln("");
    term.writeln("Something no one can ignore.");
    term.write("\x1b[32mgitcode $\x1b[0m ");

    xtermRef.current = term;

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, []);

  return (
    <div className="h-full w-full bg-black overflow-hidden p-2">
      <div ref={terminalRef} className="h-full w-full" />
    </div>
  );
}
