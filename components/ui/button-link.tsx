import Link from "next/link";
import type { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof buttonVariants>;

/** Button estilizado como enlace Next.js (Base UI requiere `nativeButton={false}`). */
export function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
}: ButtonLinkProps) {
  return (
    <Button
      nativeButton={false}
      render={<Link href={href} />}
      variant={variant}
      size={size}
      className={cn(className)}
    >
      {children}
    </Button>
  );
}
