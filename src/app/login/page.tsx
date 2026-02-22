"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Navigation } from "@/components/marketing/Navigation";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Zap, CheckCircle } from "lucide-react";

type State = "idle" | "loading" | "sent" | "error";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/portal`,
      },
    });

    if (error) {
      setState("error");
    } else {
      setState("sent");
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6">
          <div className="glass-card p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center mx-auto mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>

            {state === "sent" ? (
              <>
                <CheckCircle className="w-12 h-12 text-[#10b981] mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">
                  Check Your Email
                </h1>
                <p className="text-[#a0a0b8]">
                  We sent a magic link to <strong className="text-white">{email}</strong>.
                  Click it to sign in.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Client Portal
                </h1>
                <p className="text-[#a0a0b8] mb-8">
                  Sign in with your email to access your dashboard.
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {state === "error" && (
                    <p className="text-sm text-red-400">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <Button
                    type="submit"
                    loading={state === "loading"}
                    className="w-full"
                  >
                    Send Magic Link
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
