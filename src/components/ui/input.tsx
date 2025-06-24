import * as React from "react";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { Button } from "./button";

import { cn } from "@/utils/style";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  containerClassName?: string;
}

const baseInputClases =
  "w-full rounded-md bg-transparent px-3 py-1 text-sm transition-colors file:text-current file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed";

const DefaultInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        baseInputClases,
        "flex h-9 border border-input shadow-sm focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
        className,
      )}
      type={type}
      {...props}
    />
  );
});

const InputWithAdornment = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { startAdornment, endAdornment, className, containerClassName, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "flex h-9 rounded-md border border-input shadow-sm has-[:focus-visible]:outline-none has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
          containerClassName,
        )}
      >
        {startAdornment}
        <input
          ref={ref}
          className={cn(baseInputClases, className)}
          {...props}
        />
        {endAdornment}
      </div>
    );
  },
);

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <InputWithAdornment
      ref={ref}
      endAdornment={
        <Button
          className="h-auto"
          disabled={props.disabled}
          size="sm"
          type="button"
          variant="ghost"
          onClick={toggleShowPassword}
        >
          {showPassword ? <EyeOpenIcon /> : <EyeNoneIcon />}
        </Button>
      }
      {...props}
      type={showPassword ? "text" : "password"}
    />
  );
});

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ endAdornment, startAdornment, ...props }, ref) => {
    if (endAdornment || startAdornment) {
      return (
        <InputWithAdornment
          ref={ref}
          endAdornment={endAdornment}
          startAdornment={startAdornment}
          {...props}
        />
      );
    }

    if (props.type === "password") {
      return <PasswordInput ref={ref} {...props} />;
    }

    return <DefaultInput ref={ref} {...props} />;
  },
);

Input.displayName = "Input";

export { Input };
