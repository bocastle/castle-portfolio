"use client";

import { trackEvent } from "@/utils/analytics";
import { useEffect } from "react";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const CAMPAIGN_SESSION_KEY = "castle-log-campaign-visit";

const CampaignTracker = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const campaign = UTM_KEYS.reduce<Record<string, string>>((acc, key) => {
      const value = params.get(key);

      if (value) {
        acc[key] = value;
      }

      return acc;
    }, {});

    if (Object.keys(campaign).length === 0) {
      return;
    }

    const eventPayload = {
      ...campaign,
      path: window.location.pathname,
      referrer: document.referrer || "direct",
    };
    const sessionValue = JSON.stringify(eventPayload);

    if (window.sessionStorage.getItem(CAMPAIGN_SESSION_KEY) === sessionValue) {
      return;
    }

    window.sessionStorage.setItem(CAMPAIGN_SESSION_KEY, sessionValue);
    trackEvent("Campaign Visit", eventPayload);
  }, []);

  return null;
};

export default CampaignTracker;
