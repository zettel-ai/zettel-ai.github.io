type TooltipProps = {
  text: string;
  placement?: "top" | "bottom-right";
};

const placementClasses: Record<NonNullable<TooltipProps["placement"]>, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  "bottom-right": "right-0 top-full mt-2",
};

// Hover tooltip revealed via the parent's `group` hover state.
// The parent element must carry `group relative` for positioning to work.
export function Tooltip({ text, placement = "top" }: TooltipProps) {
  return (
    <span
      className={`pointer-events-none absolute ${placementClasses[placement]} hidden rounded-md bg-inverse-surface px-3 py-1.5 text-xs font-normal text-inverse-on-surface opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block sm:whitespace-nowrap`}
    >
      {text}
    </span>
  );
}
