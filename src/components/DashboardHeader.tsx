import React from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";

import { Separator } from "@/components/ui/separator";
import { TypographyH3, TypographySmall } from "@/components/ui/typography";

interface DashboardHeaderProps {
  title: string;

  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  rightSide?: React.ReactNode;
  subTitle?: string;
}

const DashboardHeader = ({
  icon: Icon,
  title,
  subTitle,
  rightSide,
}: DashboardHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-4">
        <div>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-7 h-7 text-primary" />}
            <TypographyH3 className="font-normal leading-none">
              {title}
            </TypographyH3>
          </div>
          {subTitle && (
            <TypographySmall className="leading-none font-medium mt-1 text-accent-foreground/50">
              {subTitle}
            </TypographySmall>
          )}
        </div>
        {rightSide && (
          <div className="flex flex-1 gap-2 justify-end">{rightSide}</div>
        )}
      </div>
      <Separator />
    </div>
  );
};

export default DashboardHeader;
