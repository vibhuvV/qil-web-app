import { FC, HTMLProps } from "react";

import { cn } from "@/utils/style";

export const TypographyH1: FC<HTMLProps<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
};

export const TypographyH2: FC<HTMLProps<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  );
};

export const TypographyH3: FC<HTMLProps<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
};

export const TypographyH4: FC<HTMLProps<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
};

export const TypographyH5: FC<HTMLProps<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  return (
    <h5
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
};

export const TypographyH6: FC<HTMLProps<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  return (
    <h5
      className={cn(
        "scroll-m-20 text-md font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
};

export const TypographyP: FC<HTMLProps<HTMLParagraphElement>> = ({
  className,
  ...props
}) => {
  return (
    <p className={cn("[&:not(:first-child)]:mt-6", className)} {...props} />
  );
};

export const TypographySmall: FC<HTMLProps<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
  return <small className={cn("text-sm block", className)} {...props} />;
};
