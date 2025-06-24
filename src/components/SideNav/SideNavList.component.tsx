import { QuestionMarkCircledIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import { FC } from "react";

import { cn } from "@/utils/style";
import { TooltipProvider } from "@/components/ui/tooltip";
import Tooltip from "@/components/Tooltip";

type SideNavListProps = {
  expanded?: boolean;
};

const linkDefaultProps = {
  activeProps: {
    className: "text-primary bg-muted",
  },
  className: "flex items-center rounded-lg px-3 py-2 hover:text-primary",
} as const;

const NAV_CONFIG = [
  {
    id: 0,
    to: "/xray/lab",
    title: "X-Ray Lab",
    icon: <ReaderIcon className="h-5 w-5" />,
  },
  {
    id: 1,
    to: "/support",
    title: "Support",
    icon: <QuestionMarkCircledIcon className="h-5 w-5" />,
  },
] as const;

const SideNavList: FC<SideNavListProps> = ({ expanded = true }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <ul className="text-sm space-y-3">
        {NAV_CONFIG.map((navItem) => (
          <li key={navItem.id}>
            <Link {...linkDefaultProps} to={navItem.to}>
              <Tooltip
                side="right"
                sideOffset={20}
                tooltip={navItem.title}
                tooltipOff={expanded}
              >
                {navItem.icon}
              </Tooltip>
              <span
                className={cn(
                  "overflow-hidden transition-all leading-none h-4",
                  {
                    "w-0": !expanded,
                    "w-40 ml-3": expanded,
                  },
                )}
              >
                {navItem.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
};

export default SideNavList;
