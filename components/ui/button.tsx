import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex flex items-center gap-2 justify-center font-nexa text-xl font-black tracking-[var(--tracking-normal)] ring-offset-background transition-colors transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none",
    {
        variants:        {
            variant: {
                default:     "bg-background text-foreground hover:opacity-70",
                destructive: "border-4 border-destructive bg-transparent text-destructive hover:opacity-70",
                outline:     "bg-transparent text-foreground-1 border-4 border-border hover:opacity-70 rounded-none",
                tab:         "bg-transparent !border-border-transparent border-4  text-muted-foreground border-input hover:shadow-inner hover:opacity-70 font-bold rounded-none",
                secondary:   "bg-secondary text-secondary-foreground hover:opacity-70",
                ghost:       "bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:opacity-70",
                link:        "bg-background text-foreground underline-offset-4 hover:underline hover:opacity-70"
            },
            size:    {
                default: "h-10 px-[1rem] py-[0.5rem]",
                sm:      "h-9 px-[0.75rem]",
                lg:      "h-11 px-[2rem]",
                icon:    "h-[7.5rem] w-[7.5rem]",
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
