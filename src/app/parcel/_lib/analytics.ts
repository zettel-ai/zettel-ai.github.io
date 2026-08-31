export type ParcelEvent =
  | "parcel_cta_click"
  | "parcel_intake_open"
  | "parcel_intake_started"
  | "parcel_carrier_selected"
  | "parcel_intake_handoff"
  | "parcel_faq_expand";

type EventParams = {
  placement?: "nav" | "hero" | "pricing" | "final";
  carrier?: "UPS" | "FedEx" | "Both";
  item?: string;
};

type GtagWindow = Window & {
  gtag?: (command: "event", eventName: string, params?: Record<string, string>) => void;
};

export function trackParcelEvent(eventName: ParcelEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
  (window as GtagWindow).gtag?.("event", eventName, cleanParams);
}
