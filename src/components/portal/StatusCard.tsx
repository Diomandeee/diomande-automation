import { Card } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { Activity } from "lucide-react";

interface StatusCardProps {
  status: string;
  tier: string;
  meshDevices: number;
  gateways: string[];
}

export function StatusCard({ status, tier, meshDevices, gateways }: StatusCardProps) {
  const isOnline = status === "active";

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#a0a0b8]">Bot Status</h3>
        <Badge variant={isOnline ? "green" : "default"}>
          {isOnline ? "Online" : status}
        </Badge>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-3 h-3 rounded-full ${
            isOnline ? "bg-[#10b981] animate-pulse" : "bg-[#6b6b80]"
          }`}
        />
        <span className="text-white font-medium capitalize">{tier} Plan</span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#6b6b80]">Mesh Devices</span>
          <span className="text-[#a0a0b8]">{meshDevices}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6b6b80]">Gateways</span>
          <span className="text-[#a0a0b8]">
            {gateways.length > 0 ? gateways.join(", ") : "None configured"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#6b6b80]">Uptime</span>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#10b981]" />
            <span className="text-[#a0a0b8]">99.7%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
