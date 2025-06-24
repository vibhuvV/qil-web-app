import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import SideNavUpgradeCard from "./SideNavUpgradeCard.component";
import SideNavList from "./SideNavList.component";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const SideNavSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="shrink-0 md:hidden" size="icon" variant="outline">
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col max-w-80" side="left">
        <nav className="pt-10">
          <SideNavList />
        </nav>
        <div className="mt-auto">
          <SideNavUpgradeCard />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideNavSheet;
