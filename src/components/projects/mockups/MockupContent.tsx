import type { Category } from "@/data/projects";
import { IOSAppMockup } from "./IOSAppMockup";
import { WebPlatformMockup } from "./WebPlatformMockup";
import { InfrastructureMockup } from "./InfrastructureMockup";
import { CreativeToolMockup } from "./CreativeToolMockup";
import { DevToolMockup } from "./DevToolMockup";
import { AgentSystemMockup } from "./AgentSystemMockup";

interface MockupContentProps {
  slug: string;
  category: Category;
  accentColor: string;
  name: string;
}

export function MockupContent({ slug, category, accentColor, name }: MockupContentProps) {
  switch (category) {
    case "iOS & macOS Apps":
      return <IOSAppMockup slug={slug} accentColor={accentColor} name={name} />;
    case "Web Platforms":
      return <WebPlatformMockup slug={slug} accentColor={accentColor} name={name} />;
    case "AI Infrastructure":
      return <InfrastructureMockup slug={slug} accentColor={accentColor} name={name} />;
    case "Creative Tools":
      return <CreativeToolMockup slug={slug} accentColor={accentColor} name={name} />;
    case "Developer Tools":
      return <DevToolMockup slug={slug} accentColor={accentColor} name={name} />;
    case "Voice & Media":
      return <IOSAppMockup slug={slug} accentColor={accentColor} name={name} />;
    case "Language & Culture":
      return <WebPlatformMockup slug={slug} accentColor={accentColor} name={name} />;
    case "Agent Systems":
      return <AgentSystemMockup slug={slug} accentColor={accentColor} name={name} />;
    case "Research":
      return <AgentSystemMockup slug={slug} accentColor={accentColor} name={name} />;
  }
}
