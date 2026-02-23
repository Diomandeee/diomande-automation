"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input, Textarea } from "@/components/shared/Input";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "community" }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setState("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <section className="py-24" id="join">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12"
          >
            <CheckCircle className="w-16 h-16 text-[#10b981] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">
              You&apos;re In
            </h3>
            <p className="text-[#b0b0c8] mb-6">
              Welcome to the community. Join the Discord to start building.
            </p>
            <a
              href="https://discord.gg/diomande"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#00d4ff] hover:underline"
            >
              Join Discord
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24" id="join">
      <div className="max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join the Community
          </h2>
          <p className="text-lg text-[#b0b0c8]">
            Get access to the mesh. Start building today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                id="name"
                name="name"
                label="Name"
                placeholder="Your name"
                required
              />
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                required
              />
            </div>

            <Textarea
              id="message"
              name="message"
              label="What do you want to build? (optional)"
              placeholder="An app, a bot, an automation pipeline..."
              rows={3}
            />

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              loading={state === "loading"}
              className="w-full"
            >
              <Send className="w-4 h-4" />
              Join the Community
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
