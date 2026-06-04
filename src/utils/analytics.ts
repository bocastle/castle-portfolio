type AnalyticsValue = string | number | boolean | null;
type AnalyticsProperties = Record<string, AnalyticsValue | undefined>;

const MAX_ANALYTICS_LENGTH = 255;
const MAX_GA_EVENT_NAME_LENGTH = 40;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "event",
      eventName: string,
      eventParameters?: Record<string, AnalyticsValue>
    ) => void;
  }
}

const normalizeValue = (value: AnalyticsValue | undefined): AnalyticsValue => {
  if (typeof value !== "string") {
    return value ?? null;
  }

  return value.slice(0, MAX_ANALYTICS_LENGTH);
};

const normalizeKey = (key: string) =>
  key
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, MAX_ANALYTICS_LENGTH);

const normalizeEventName = (name: string) => {
  const normalizedName = normalizeKey(name).slice(0, MAX_GA_EVENT_NAME_LENGTH);

  return normalizedName || "custom_event";
};

export const trackEvent = (
  name: string,
  properties: AnalyticsProperties = {}
) => {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedProperties = Object.fromEntries(
    Object.entries(properties)
      .map(([key, value]) => [normalizeKey(key), normalizeValue(value)] as const)
      .filter(([key, value]) => key && value !== null)
  ) as Record<string, AnalyticsValue>;

  const eventName = normalizeEventName(name);

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, normalizedProperties);
      return;
    }

    window.dataLayer?.push({
      event: eventName,
      original_event_name: name.slice(0, MAX_ANALYTICS_LENGTH),
      ...normalizedProperties,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to track analytics event", error);
    }
  }
};
