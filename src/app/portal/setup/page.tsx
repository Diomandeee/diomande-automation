import { OnboardingWizard } from "@/components/portal/OnboardingWizard";

export default function SetupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Setup</h1>
        <p className="text-[#6b6b80]">
          Complete these steps to get your Claw bot instance running.
        </p>
      </div>
      <OnboardingWizard />
    </div>
  );
}
