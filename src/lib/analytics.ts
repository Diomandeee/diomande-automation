let visitorId: string | null = null;

function getVisitorId(): string {
  if (visitorId) return visitorId;
  if (typeof window === "undefined") return "server";
  visitorId = localStorage.getItem("da_visitor_id");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("da_visitor_id", visitorId);
  }
  return visitorId;
}

export function trackEvent(
  event_type: string,
  metadata?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  const payload = {
    event_type,
    page: window.location.pathname,
    metadata: metadata || {},
    visitor_id: getVisitorId(),
  };

  // Fire-and-forget with sendBeacon fallback
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/analytics",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
  } else {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  }
}
