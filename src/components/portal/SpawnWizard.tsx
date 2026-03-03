"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { TemplateSelector } from "./spawn/TemplateSelector";
import { SpawnProgress } from "./spawn/SpawnProgress";
import { spawnCategories, type SpawnTemplate } from "@/data/spawn-templates";

type WizardStep = "template" | "details" | "goals" | "review";

const steps: { id: WizardStep; label: string }[] = [
  { id: "template", label: "Template" },
  { id: "details", label: "Details" },
  { id: "goals", label: "Goals" },
  { id: "review", label: "Review" },
];

export function SpawnWizard() {
  const [step, setStep] = useState<WizardStep>("template");
  const [template, setTemplate] = useState<SpawnTemplate | null>(null);
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("apps");
  const [goals, setGoals] = useState<string[]>([]);
  const [goalInput, setGoalInput] = useState("");
  const [constraints, setConstraints] = useState<string[]>([]);
  const [constraintInput, setConstraintInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const stepIndex = steps.findIndex((s) => s.id === step);

  function canProceed(): boolean {
    switch (step) {
      case "template":
        return template !== null;
      case "details":
        return name.length > 0 && /^[a-z][a-z0-9_-]*$/.test(name);
      case "goals":
        return true;
      case "review":
        return true;
      default:
        return false;
    }
  }

  function next() {
    const nextStep = steps[stepIndex + 1];
    if (nextStep) setStep(nextStep.id);
  }

  function back() {
    const prevStep = steps[stepIndex - 1];
    if (prevStep) setStep(prevStep.id);
  }

  function addGoal() {
    if (goalInput.trim()) {
      setGoals((prev) => [...prev, goalInput.trim()]);
      setGoalInput("");
    }
  }

  function addConstraint() {
    if (constraintInput.trim()) {
      setConstraints((prev) => [...prev, constraintInput.trim()]);
      setConstraintInput("");
    }
  }

  async function handleSpawn() {
    if (!template) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/portal/spawn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          display_name: displayName || name,
          description,
          type: template.type,
          category,
          initial_goals: goals,
          constraints,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create spawn request");
        return;
      }

      setRequestId(data.requestId);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Show progress tracker after spawn
  if (requestId) {
    return (
      <div className="space-y-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-[#10b981]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Spawning {displayName || name}
              </h2>
              <p className="text-xs text-[#6b6b80] font-mono">{requestId}</p>
            </div>
          </div>
          <SpawnProgress requestId={requestId} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                i <= stepIndex
                  ? "bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30"
                  : "bg-white/5 text-[#6b6b80] border border-white/10"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-xs hidden sm:inline ${
                i <= stepIndex ? "text-white" : "text-[#6b6b80]"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`w-8 h-px ${
                  i < stepIndex ? "bg-[#00d4ff]/30" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="glass-card p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === "template" && (
              <TemplateSelector
                selected={template}
                onSelect={setTemplate}
              />
            )}

            {step === "details" && (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-white">
                  Project Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#a0a0b8]">
                    Project Name (snake_case)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
                    placeholder="my_awesome_project"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono placeholder:text-[#6b6b80] focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                  />
                  {name && !/^[a-z][a-z0-9_-]*$/.test(name) && (
                    <p className="text-xs text-[#ef4444]">
                      Must start with a letter, lowercase only, underscores and hyphens allowed.
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#a0a0b8]">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="My Awesome Project"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#6b6b80] focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#a0a0b8]">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What does this project do?"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#6b6b80] focus:border-[#00d4ff]/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#a0a0b8]">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                  >
                    {spawnCategories.map((c) => (
                      <option key={c} value={c} className="bg-[#0a0a0f]">
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === "goals" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Initial Goals
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={goalInput}
                      onChange={(e) => setGoalInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addGoal()}
                      placeholder="e.g., Implement user authentication"
                      className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#6b6b80] focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                    />
                    <Button onClick={addGoal} size="sm" variant="secondary">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {goals.length > 0 && (
                    <ul className="space-y-2">
                      {goals.map((goal, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-[#c0c0d8] bg-white/5 rounded-lg px-3 py-2"
                        >
                          <span className="flex-1">{goal}</span>
                          <button
                            onClick={() => setGoals((g) => g.filter((_, j) => j !== i))}
                            className="text-[#6b6b80] hover:text-white cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Constraints <span className="text-xs text-[#6b6b80] font-normal">(optional)</span>
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={constraintInput}
                      onChange={(e) => setConstraintInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addConstraint()}
                      placeholder="e.g., Must use async/await"
                      className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#6b6b80] focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                    />
                    <Button onClick={addConstraint} size="sm" variant="secondary">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {constraints.length > 0 && (
                    <ul className="space-y-2">
                      {constraints.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-[#c0c0d8] bg-white/5 rounded-lg px-3 py-2"
                        >
                          <span className="flex-1">{c}</span>
                          <button
                            onClick={() => setConstraints((cs) => cs.filter((_, j) => j !== i))}
                            className="text-[#6b6b80] hover:text-white cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">
                  Review & Spawn
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-[#6b6b80] mb-1">
                        Template
                      </div>
                      <div className="text-sm text-white font-medium">
                        {template?.name}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-[#6b6b80] mb-1">
                        Language
                      </div>
                      <div className="text-sm text-white font-medium">
                        {template?.language}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-[#6b6b80] mb-1">Name</div>
                      <div className="text-sm text-white font-mono">
                        {name}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-[#6b6b80] mb-1">
                        Category
                      </div>
                      <div className="text-sm text-white">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </div>
                    </div>
                  </div>

                  {description && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-[#6b6b80] mb-1">
                        Description
                      </div>
                      <div className="text-sm text-[#c0c0d8]">
                        {description}
                      </div>
                    </div>
                  )}

                  {goals.length > 0 && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-[#6b6b80] mb-2">
                        Goals ({goals.length})
                      </div>
                      <ul className="space-y-1">
                        {goals.map((g, i) => (
                          <li key={i} className="text-sm text-[#c0c0d8] flex gap-2">
                            <span className="text-[#00d4ff]">&#8250;</span>
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg p-3 text-sm text-[#ef4444]">
                    {error}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <div>
          {stepIndex > 0 && (
            <Button variant="ghost" onClick={back}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}
        </div>
        <div>
          {step !== "review" ? (
            <Button onClick={next} disabled={!canProceed()}>
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSpawn}
              disabled={submitting || !canProceed()}
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Rocket className="w-4 h-4" />
              )}
              {submitting ? "Spawning..." : "Spawn Project"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
