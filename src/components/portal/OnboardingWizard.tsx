"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, Circle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";

interface Step {
  id: string;
  name: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "skipped";
}

const defaultSteps: Step[] = [
  {
    id: "discord",
    name: "Discord Server Setup",
    description: "Create a Discord server, invite the bot, and configure channels for task submission.",
    status: "pending",
  },
  {
    id: "gateway",
    name: "Gateway Configuration",
    description: "Select your gateways (Discord, API, SMS, Telegram) and configure model preferences.",
    status: "pending",
  },
  {
    id: "mesh",
    name: "Mesh Device Enrollment",
    description: "Connect your devices to the mesh network for distributed task execution.",
    status: "pending",
  },
  {
    id: "routing",
    name: "Channel Routing",
    description: "Map Discord channels to projects, models, and priority levels.",
    status: "pending",
  },
  {
    id: "test",
    name: "Test Run",
    description: "Execute a test task to verify your setup is working correctly.",
    status: "pending",
  },
  {
    id: "live",
    name: "Go Live",
    description: "Activate your Claw bot instance and start automating.",
    status: "pending",
  },
];

interface OnboardingWizardProps {
  initialSteps?: Step[];
}

export function OnboardingWizard({ initialSteps }: OnboardingWizardProps) {
  const [steps, setSteps] = useState<Step[]>(initialSteps || defaultSteps);
  const [currentStep, setCurrentStep] = useState(0);

  const loadSteps = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/onboarding");
      const data = await res.json();
      if (data.steps && data.steps.length > 0) {
        const merged = defaultSteps.map((def) => {
          const saved = data.steps.find(
            (s: { step_id: string; status: string }) => s.step_id === def.id
          );
          return saved ? { ...def, status: saved.status } : def;
        });
        setSteps(merged);
        // Jump to first incomplete step
        const firstIncomplete = merged.findIndex((s) => s.status !== "completed");
        if (firstIncomplete >= 0) setCurrentStep(firstIncomplete);
      }
    } catch {
      // Use defaults
    }
  }, []);

  useEffect(() => {
    if (!initialSteps) loadSteps();
  }, [initialSteps, loadSteps]);

  async function updateStepStatus(stepId: string, status: string) {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, status: status as Step["status"] } : s))
    );
    fetch("/api/portal/onboarding", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step_id: stepId, status }),
    });
  }

  const current = steps[currentStep];

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setCurrentStep(i)}
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                step.status === "completed"
                  ? "bg-[#10b981] text-white"
                  : i === currentStep
                    ? "bg-[#00d4ff] text-white"
                    : "bg-white/5 text-[#6b6b80]"
              }`}
            >
              {step.status === "completed" ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-xs font-medium">{i + 1}</span>
              )}
            </button>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px ${
                  step.status === "completed" ? "bg-[#10b981]" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current step */}
      <Card className="p-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center shrink-0">
              <Circle className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {current.name}
              </h3>
              <p className="text-[#a0a0b8]">{current.description}</p>
            </div>
          </div>

          {/* Step content */}
          <div className="glass-card p-6 mb-6 bg-white/[0.02]">
            <p className="text-sm text-[#6b6b80]">
              Setup instructions and configuration form for this step will
              appear here during onboarding.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex gap-2">
              {current.status !== "completed" && (
                <Button
                  variant="secondary"
                  onClick={() => updateStepStatus(current.id, "completed")}
                >
                  <Check className="w-4 h-4" />
                  Mark Complete
                </Button>
              )}
              <Button
                onClick={() =>
                  setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                }
                disabled={currentStep === steps.length - 1}
              >
                {currentStep === steps.length - 1 ? "Complete" : "Next Step"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
}
