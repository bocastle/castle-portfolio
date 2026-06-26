import { act, fireEvent, render, screen } from "@testing-library/react";
import EngagementTracker from "../src/components/Analytics/EngagementTracker";
import OutboundLinkTracker from "../src/components/Analytics/OutboundLinkTracker";
import { trackEvent } from "../src/utils/analytics";

jest.mock("../src/utils/analytics", () => ({
  trackEvent: jest.fn(),
}));

const setDocumentMetric = (key, value) => {
  Object.defineProperty(document.documentElement, key, {
    configurable: true,
    value,
  });
};

describe("anonymous engagement tracking", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-06-26T00:00:00.000Z"));
    setDocumentMetric("scrollHeight", 1000);
    setDocumentMetric("clientHeight", 500);
    setDocumentMetric("scrollTop", 0);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("tracks scroll depth milestones once per page view", () => {
    render(<EngagementTracker />);

    setDocumentMetric("scrollTop", 250);
    fireEvent.scroll(window);
    setDocumentMetric("scrollTop", 260);
    fireEvent.scroll(window);

    expect(trackEvent).toHaveBeenCalledTimes(2);
    expect(trackEvent).toHaveBeenNthCalledWith(1, "Scroll Depth", {
      depth: 25,
      max_scroll_depth: 50,
      path: "/",
    });
    expect(trackEvent).toHaveBeenNthCalledWith(2, "Scroll Depth", {
      depth: 50,
      max_scroll_depth: 50,
      path: "/",
    });
  });

  it("tracks engaged time and page exit without personal identifiers", () => {
    render(<EngagementTracker />);

    act(() => {
      jest.advanceTimersByTime(30000);
    });
    setDocumentMetric("scrollTop", 375);
    fireEvent.scroll(window);
    act(() => {
      window.dispatchEvent(new Event("pagehide"));
    });

    expect(trackEvent).toHaveBeenCalledWith("Engaged Time", {
      seconds: 15,
      path: "/",
    });
    expect(trackEvent).toHaveBeenCalledWith("Engaged Time", {
      seconds: 30,
      path: "/",
    });
    expect(trackEvent).toHaveBeenCalledWith("Page Exit", {
      duration_seconds: 30,
      max_scroll_depth: 75,
      path: "/",
    });
  });
});

describe("outbound link tracking", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("tracks external links while ignoring internal navigation", () => {
    render(
      <>
        <OutboundLinkTracker />
        <a href="https://github.com/bocastle/castle-portfolio">
          GitHub Repository
        </a>
        <a href="/blog">Blog</a>
      </>
    );

    fireEvent.click(
      screen.getByRole("link", { name: "GitHub Repository" })
    );
    fireEvent.click(screen.getByRole("link", { name: "Blog" }));

    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith("Outbound Link Click", {
      href: "https://github.com/bocastle/castle-portfolio",
      host: "github.com",
      label: "GitHub Repository",
      path: "/",
    });
  });
});
