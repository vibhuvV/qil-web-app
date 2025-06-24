import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/style";

type SideNavUpgradeCardProps = {
  expand?: boolean;
};

const SideNavUpgradeCard: FC<SideNavUpgradeCardProps> = ({ expand = true }) => {
  return (
    <Card
      className={cn("overflow-hidden transition-all", {
        "m-0 w-0 h-0": !expand,
        "m-4 w-60 animate-grow": expand,
      })}
    >
      <CardHeader className="p-4 w-full overflow-hidden">
        <CardTitle className="w-52">Upgrade to Pro</CardTitle>
        <CardDescription className="text-wrap w-52">
          Unlock all features and get unlimited access to our support team.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Button className="w-full" size="sm">
          Upgrade
        </Button>
      </CardContent>
    </Card>
  );
};

export default SideNavUpgradeCard;
