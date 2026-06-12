import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:shadow-[inset_0_0_0_1px_var(--ghost-border-focus)] active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:text-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "btn-primary-gradient text-primary-foreground hover:brightness-95",
        outline:
          "glass-surface text-foreground shadow-[inset_0_0_0_1px_var(--ghost-border)] hover:shadow-[inset_0_0_0_1px_var(--ghost-border-focus)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_srgb,var(--secondary),var(--on-surface)_8%)]",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        destructive:
          "bg-[color-mix(in_srgb,var(--error-container)_35%,transparent)] text-[var(--on-error-container)] hover:bg-[color-mix(in_srgb,var(--error-container)_50%,transparent)]",
        link: "rounded-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 min-h-11 gap-1.5 px-5",
        xs: "h-8 min-h-8 gap-1 rounded-full px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 min-h-9 gap-1 rounded-full px-4 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 min-h-11 gap-1.5 px-6 text-base",
        icon: "size-11 min-h-11 min-w-11",
        "icon-xs":
          "size-8 min-h-8 min-w-8 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-9 min-h-9 min-w-9 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-11 min-h-11 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
