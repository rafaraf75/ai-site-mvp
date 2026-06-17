import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-border/60",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,hsl(194_94%_38%)_0%,hsl(190_88%_40%)_46%,hsl(203_92%_44%)_100%)] text-primary-foreground border-primary/35 shadow-[0_18px_34px_-18px_hsl(var(--primary)/0.58)] hover:-translate-y-[1px] hover:brightness-[1.05] hover:shadow-[0_26px_42px_-22px_hsl(var(--primary)/0.62)] dark:border-[hsl(var(--primary)/0.4)] dark:bg-[linear-gradient(135deg,hsl(191_78%_47%)_0%,hsl(198_82%_46%)_100%)] dark:shadow-[0_18px_36px_-18px_hsl(var(--primary)/0.42)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "bg-card/90 text-foreground shadow-none hover:bg-accent/70 hover:text-accent-foreground",
        secondary:
          "bg-[linear-gradient(145deg,hsl(0_0%_100%/0.98),hsl(200_100%_98%/0.94)_54%,hsl(186_44%_93%/0.88)_100%)] text-secondary-foreground border-[hsl(var(--primary)/0.22)] shadow-[0_14px_28px_-24px_rgba(15,23,42,0.16)] hover:-translate-y-[1px] hover:bg-[linear-gradient(145deg,hsl(0_0%_100%),hsl(var(--accent)/0.72)_56%,hsl(190_52%_92%/0.96)_100%)] hover:border-[hsl(var(--primary)/0.4)] dark:bg-[linear-gradient(145deg,hsl(213_34%_20%/0.98),hsl(216_30%_16%/0.96)_54%,hsl(198_44%_18%/0.94)_100%)] dark:text-foreground dark:border-[hsl(var(--primary)/0.28)] dark:shadow-[0_14px_30px_-24px_rgba(0,0,0,0.45)] dark:hover:bg-[linear-gradient(145deg,hsl(198_42%_24%/0.96),hsl(216_30%_17%/0.98)_56%,hsl(202_50%_20%/0.96)_100%)] dark:hover:border-[hsl(var(--primary)/0.42)]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
