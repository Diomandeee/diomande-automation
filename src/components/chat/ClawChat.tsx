"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatToggle } from "./ChatToggle";
import { ChatPanel } from "./ChatPanel";

export function ClawChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <AnimatePresence>
        {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
