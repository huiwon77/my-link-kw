import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-tesla outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 rounded-lg",
        // Tesla Design System Variants
        primary:
          "bg-[#3E6AE1] text-white hover:bg-[#345ac2] rounded-[4px] shadow-none min-h-[40px]",
        secondary:
          "bg-[#F4F4F4] text-[#393C41] hover:bg-[#EAEAEA] rounded-[4px] shadow-none min-h-[40px]",
        sublink:
          "bg-transparent text-[#5C5E62] hover:text-[#171A20] hover:underline rounded-[4px] shadow-none p-0 h-auto font-normal",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground rounded-[4px]",
        ghost:
          "hover:bg-muted hover:text-foreground rounded-[4px]",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-[4px]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "size-8 p-0",
        "icon-sm": "size-7 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

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
  )
}

export { Button, buttonVariants }
