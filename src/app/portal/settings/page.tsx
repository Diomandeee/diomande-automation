"use client";

import { useState } from "react";
import { Card } from "@/components/shared/Card";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { Key, Copy, Check } from "lucide-react";

export default function SettingsPage() {
  const [copied, setCopied] = useState(false);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      {/* Guild Config */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Discord Configuration
        </h3>
        <div className="space-y-4 max-w-md">
          <Input
            id="guild_id"
            label="Guild ID"
            placeholder="Your Discord server ID"
            disabled
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#a0a0b8]">
              Gateway Status
            </label>
            <div className="flex gap-2">
              <Badge variant="green">Discord</Badge>
              <Badge variant="default">API</Badge>
              <Badge variant="default">SMS</Badge>
              <Badge variant="default">Telegram</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* API Keys */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-5 h-5 text-[#00d4ff]" />
          <h3 className="text-lg font-semibold text-white">API Keys</h3>
        </div>
        <div className="space-y-4 max-w-lg">
          <div className="flex items-center gap-3">
            <Input
              id="api_key"
              value="da_sk_••••••••••••••••••••"
              disabled
              className="flex-1 font-[family-name:var(--font-mono)]"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy("da_sk_example_key")}
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#10b981]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-[#6b6b80]">
            Use this API key to submit tasks programmatically. Keep it secret.
          </p>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Notifications
        </h3>
        <div className="space-y-3 max-w-md">
          {[
            "Task completion notifications",
            "Usage limit warnings",
            "System status updates",
          ].map((pref) => (
            <label
              key={pref}
              className="flex items-center gap-3 text-sm text-[#a0a0b8] cursor-pointer"
            >
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded bg-white/5 border-white/10 text-[#00d4ff] focus:ring-[#00d4ff]/20"
              />
              {pref}
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}
