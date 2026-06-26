import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GoogleAdSenseComponent from "../src/components/GoogleAds/components/GoogleAdSenseComponent";

describe("GoogleAdSenseComponent", () => {
  beforeEach(() => {
    window.adsbygoogle = [];
  });

  it("uses the standard block display shape for responsive AdSense slots", () => {
    render(<GoogleAdSenseComponent PID="5941762046444090" SLOT="7537308159" />);

    const slot = document.querySelector("ins.adsbygoogle");

    expect(slot).toBeInTheDocument();
    expect(slot).toHaveStyle({ display: "block" });
    expect(slot).toHaveAttribute("data-ad-client", "ca-pub-5941762046444090");
    expect(slot).toHaveAttribute("data-ad-slot", "7537308159");
    expect(slot).toHaveAttribute("data-full-width-responsive", "true");
    expect(slot).not.toHaveClass("flex");
  });

  it("does not render an ad slot when the account values are missing", () => {
    render(<GoogleAdSenseComponent PID="" SLOT="" />);

    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(document.querySelector("ins.adsbygoogle")).not.toBeInTheDocument();
  });
});
