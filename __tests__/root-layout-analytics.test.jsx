import React from "react";
import RootLayout from "../src/app/layout";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

jest.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: () => null,
  GoogleTagManager: () => null,
}));

jest.mock("@vercel/analytics/react", () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

jest.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: () => <div data-testid="speed-insights" />,
}));

jest.mock("../src/components/Analytics/CampaignTracker", () => ({
  __esModule: true,
  default: () => <div data-testid="campaign-tracker" />,
}));

jest.mock("../src/components/GoogleAds/components/GoogleAdSenseComponent", () => ({
  __esModule: true,
  default: () => <div data-testid="adsense-slot" />,
}));

jest.mock("../src/components/GoogleAds/GoogleAdSense", () => ({
  GoogleAdSense: () => null,
}));

jest.mock("../src/components/Navbar", () => ({
  __esModule: true,
  default: () => <nav data-testid="navbar" />,
}));

describe("RootLayout analytics tags", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  const collectElementsByType = (node, type) => {
    if (Array.isArray(node)) {
      return node.flatMap((child) => collectElementsByType(child, type));
    }

    if (!React.isValidElement(node)) {
      return [];
    }

    const matches = node.type === type ? [node] : [];
    const childMatches = React.Children.toArray(node.props.children).flatMap(
      (child) => collectElementsByType(child, type)
    );

    return [...matches, ...childMatches];
  };

  it("renders GTM only even when a direct GA4 id is configured", () => {
    process.env.GTM_ID = "GTM-TEST123";
    process.env.GTAG_ID = "G-TEST456";

    const tree = RootLayout({
      children: <main>content</main>,
    });
    const gtmElements = collectElementsByType(tree, GoogleTagManager);
    const gaElements = collectElementsByType(tree, GoogleAnalytics);

    expect(gtmElements).toHaveLength(1);
    expect(gtmElements[0].props.gtmId).toBe("GTM-TEST123");
    expect(gaElements).toHaveLength(0);
  });
});
