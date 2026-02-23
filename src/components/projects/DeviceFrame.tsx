import type { ReactNode } from "react";
import type { DeviceType } from "@/data/projects";
import { IPhoneFrame } from "./frames/IPhoneFrame";
import { MacFrame } from "./frames/MacFrame";
import { BrowserFrame } from "./frames/BrowserFrame";
import { TerminalFrame } from "./frames/TerminalFrame";
import { CodeEditorFrame } from "./frames/CodeEditorFrame";

interface DeviceFrameProps {
  deviceType: DeviceType;
  children: ReactNode;
  title?: string;
  url?: string;
  filename?: string;
  className?: string;
  scale?: "sm" | "md" | "lg";
}

export function DeviceFrame({
  deviceType,
  children,
  title,
  url,
  filename,
  className = "",
  scale = "md",
}: DeviceFrameProps) {
  switch (deviceType) {
    case "iphone":
      return (
        <IPhoneFrame className={className} scale={scale}>
          {children}
        </IPhoneFrame>
      );
    case "mac":
      return (
        <MacFrame className={className} title={title}>
          {children}
        </MacFrame>
      );
    case "browser":
      return (
        <BrowserFrame className={className} url={url}>
          {children}
        </BrowserFrame>
      );
    case "terminal":
      return (
        <TerminalFrame className={className} title={title}>
          {children}
        </TerminalFrame>
      );
    case "code-editor":
      return (
        <CodeEditorFrame className={className} filename={filename}>
          {children}
        </CodeEditorFrame>
      );
  }
}
