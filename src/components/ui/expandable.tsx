import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";

import { useEventListener } from "@/hooks/useEventListener";

type ExpandableProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  expanded: boolean;
};

/**
 * Wrapper component to vertically expand or collapse content.
 */
export function Expandable({
  className,
  expanded,
  children,
  ...props
}: ExpandableProps) {
  // Use element ref and frozen children signal
  const element = useRef<HTMLDivElement>(null);

  /**
   * Updates the expandable element height.
   */
  const updateElementHeight = () => {
    element.current!.style.height = `${
      expanded ? element.current!.scrollHeight : 0
    }px`;
  };

  // Expand or collapse content when expanded prop change
  useEffect(updateElementHeight, [expanded]);

  // Update element height when window size change
  useEventListener("resize", () => {
    element.current!.style.maxHeight = "0";
    updateElementHeight();
    element.current!.style.maxHeight = "";
  });

  return (
    <div
      {...props}
      ref={element}
      aria-hidden={!expanded}
      className={clsx(
        "origin-top duration-200",
        !expanded && "invisible h-0 -translate-y-2 scale-y-75 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
