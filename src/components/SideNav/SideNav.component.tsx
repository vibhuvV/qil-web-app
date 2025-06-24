import { useState } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import SideNavUpgradeCard from "@/components/SideNav/SideNavUpgradeCard.component";
import SideNavList from "@/components/SideNav/SideNavList.component";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style";

const SideNav = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="hidden bg-background md:block relative shadow-lg shadow-y-0">
      <Button
        className={cn(
          "h-auto w-auto p-1.5 rounded-full absolute -right-2.5 top-3 transition-transform",
          {
            "rotate-180": expanded,
          },
        )}
        size="icon"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <ChevronRightIcon stroke="currentColor" strokeWidth="1px" />
      </Button>
      <div className="flex h-full flex-col gap-2 ">
        <nav className="flex-1 pt-12 mx-4 border-t">
          <SideNavList expanded={expanded} />
        </nav>
        <SideNavUpgradeCard expand={expanded} />
      </div>
    </aside>
  );
};

export default SideNav;
