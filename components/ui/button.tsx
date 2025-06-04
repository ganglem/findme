import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center font-nexa text-xl font-black tracking-[var(--tracking-normal)] ring-offset-background transition-colors transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none",
    {
        variants: {
            variant: {
                default:     "bg-background text-foreground hover:opacity-70",
                destructive: "border-4 border-destructive bg-transparent text-destructive hover:opacity-70",
                outline:     "bg-transparent text-foreground-1 border-4 border-border hover:opacity-70 rounded-none",
                tab:         "bg-transparent text-muted-foreground border-input hover:shadow-inner hover:opacity-70 font-bold rounded-none",
                secondary:   "bg-secondary text-secondary-foreground hover:opacity-70",
                ghost:       "bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:opacity-70",
                link:        "bg-background text-foreground underline-offset-4 hover:underline hover:opacity-70"
            },
            size: {
                default: "px-4 py-2 text-base md:text-xl",  // Padding to ensure proper space
                sm:      "px-3 py-2 text-sm md:text-base",
                lg:      "px-6 py-3 text-lg md:text-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size:    "default",
        },
    }
)



export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export {Button, buttonVariants}
