"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <section className="py-24" id="contact">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12"
          >
            <CheckCircle className="w-16 h-16 text-[#10b981] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Message Received
            </h3>
            <p className="text-[#a0a0b8]">
              Thanks for reaching out. I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to Automate?
            </h2>
            <p className="text-lg text-[#a0a0b8] leading-relaxed">
              Book a free consultation to see how Claw bot can be deployed for
              your team. We&apos;ll discuss your workflow, recommend the right tier,
              and map out the setup process.
            </p>
            <div className="space-y-4 text-sm text-[#6b6b80]">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                30-minute consultation call
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                Custom setup plan for your infrastructure
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                Live demo of task decomposition in action
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
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
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  id="company"
                  name="company"
                  label="Company"
                  placeholder="Company name"
                />
                <div className="space-y-1.5">
                  <label
                    htmlFor="team_size"
                    className="block text-sm font-medium text-[#a0a0b8]"
                  >
                    Team Size
                  </label>
                  <select
                    id="team_size"
                    name="team_size"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                  >
                    <option value="1-5">1-5 people</option>
                    <option value="6-20">6-20 people</option>
                    <option value="21-50">21-50 people</option>
                    <option value="50+">50+ people</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="interest_tier"
                  className="block text-sm font-medium text-[#a0a0b8]"
                >
                  Interested In
                </label>
                <select
                  id="interest_tier"
                  name="interest_tier"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                >
                  <option value="starter">Starter — $500/mo</option>
                  <option value="professional">Professional — $1,500/mo</option>
                  <option value="enterprise">Enterprise — Custom</option>
                </select>
              </div>
              <Textarea
                id="message"
                name="message"
                label="Tell us about your use case"
                placeholder="What tasks would you like to automate?"
                rows={4}
              />

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <Button type="submit" loading={state === "loading"} className="w-full">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
