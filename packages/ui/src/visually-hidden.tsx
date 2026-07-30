import type { HTMLAttributes } from "react";

import { cn } from "./cn";

export function VisuallyHidden({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)] [clip-path:inset(50%)]",
        className,
      )}
      {...props}
    />
  );
}
