import { track } from "@vercel/analytics";

type AnalyticsValue = string | number | boolean | null;
type AnalyticsProperties = Record<string, AnalyticsValue | undefined>;

const MAX_ANALYTICS_LENGTH = 255;

const normalizeValue = (value: AnalyticsValue | undefined): AnalyticsValue => {
  if (typeof value !== "string") {
    return value ?? null;
  }

  return value.slice(0, MAX_ANALYTICS_LENGTH);
};

export const trackEvent = (
  name: string,
  properties: AnalyticsProperties = {}
) => {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedProperties = Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [
      key.slice(0, MAX_ANALYTICS_LENGTH),
      normalizeValue(value),
    ])
  );

  try {
    track(name.slice(0, MAX_ANALYTICS_LENGTH), normalizedProperties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to track analytics event", error);
    }
  }
};
