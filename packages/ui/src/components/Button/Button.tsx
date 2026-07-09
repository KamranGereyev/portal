import { forwardRef, type ButtonHTMLAttributes } from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", className, type = "button", ...rest }, ref) => {
        const classes = ["ui-button", `ui-button--${variant}`, `ui-button--${size}`, className]
            .filter(Boolean)
            .join(" ");

        return <button ref={ref} type={type} className={classes} {...rest} />;
    },
);

Button.displayName = "Button";