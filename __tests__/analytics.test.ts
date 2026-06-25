import { trackEvent } from "../src/utils/analytics";

describe("trackEvent", () => {
  afterEach(() => {
    delete window.dataLayer;
    delete (window as Window & { gtag?: jest.Mock }).gtag;
  });

  it("pushes custom events to the GTM dataLayer instead of direct gtag", () => {
    window.dataLayer = [];
    (window as Window & { gtag?: jest.Mock }).gtag = jest.fn();

    trackEvent("Contact Click", {
      Label: "Email",
      href: "mailto:bocastle1213@gmail.com",
      empty: undefined,
    });

    expect(
      (window as Window & { gtag?: jest.Mock }).gtag
    ).not.toHaveBeenCalled();
    expect(window.dataLayer).toEqual([
      {
        event: "contact_click",
        original_event_name: "Contact Click",
        label: "Email",
        href: "mailto:bocastle1213@gmail.com",
      },
    ]);
  });
});
