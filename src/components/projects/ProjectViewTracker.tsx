"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ProjectViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent("project_view", { slug });
  }, [slug]);

  return null;
}
