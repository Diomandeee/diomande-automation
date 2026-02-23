"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/shared/Card";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { Key, Copy, Check, RefreshCw } from "lucide-react";

interface NotificationPrefs {
  task_completion: boolean;
  usage_warnings: boolean;
  system_updates: boolean;
}

const prefLabels: Record<keyof NotificationPrefs, string> = {
  task_completion: "Task completion notifications",
  usage_warnings: "Usage limit warnings",
  system_updates: "System status updates",
};

export default function SettingsPage() {
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [prefs, setPrefs] = useState<NotificationPrefs>({
    task_completion: true,
    usage_warnings: true,
    system_updates: true,
  });

  const loadSettings = useCallback(async () => {
    const [keyRes, prefsRes] = await Promise.all([
      fetch("/api/portal/api-key"),
      fetch("/api/portal/settings"),
    ]);
    const keyData = await keyRes.json();
    const prefsData = await prefsRes.json();
    if (keyData.api_key) setApiKey(keyData.api_key);
    if (prefsData.notification_preferences) setPrefs(prefsData.notification_preferences);
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleGenerateKey() {
    setGenerating(true);
    const res = await fetch("/api/portal/api-key", { method: "POST" });
    const data = await res.json();
    if (data.api_key) setApiKey(data.api_key);
    setGenerating(false);
  }

  async function handlePrefChange(key: keyof NotificationPrefs, value: boolean) {
    const updated = { ...prefs, [key]: value };
    setPrefs(updated);
    await fetch("/api/portal/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notification_preferences: updated }),
    });
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
              value={apiKey || "No API key generated"}
              disabled
              className="flex-1 font-[family-name:var(--font-mono)]"
            />
            {apiKey && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(apiKey)}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[#10b981]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGenerateKey}
              loading={generating}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-[#6b6b80]">
            Use this API key to submit tasks programmatically. Keep it secret.
            Generating a new key will invalidate the previous one.
          </p>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Notifications
        </h3>
        <div className="space-y-3 max-w-md">
          {(Object.keys(prefLabels) as (keyof NotificationPrefs)[]).map((key) => (
            <label
              key={key}
              className="flex items-center gap-3 text-sm text-[#a0a0b8] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={prefs[key]}
                onChange={(e) => handlePrefChange(key, e.target.checked)}
                className="w-4 h-4 rounded bg-white/5 border-white/10 text-[#00d4ff] focus:ring-[#00d4ff]/20"
              />
              {prefLabels[key]}
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}
