import React from "react";
import { TooltipContentProps } from "@radix-ui/react-tooltip";

import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  children: React.ReactNode;
  tooltip: React.ReactNode;

  tooltipOff?: boolean;
  align?: TooltipContentProps["align"];
  side?: TooltipContentProps["side"];
  sideOffset?: TooltipContentProps["sideOffset"];
}

const Tooltip = ({
  children,
  tooltip,
  align,
  side,
  sideOffset,
  tooltipOff = true,
}: TooltipProps) => {
  return (
    <UITooltip open={tooltipOff ? false : undefined}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent align={align} side={side} sideOffset={sideOffset}>
        {tooltip}
      </TooltipContent>
    </UITooltip>
  );
};

export default React.memo(Tooltip);
