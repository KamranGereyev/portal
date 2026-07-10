import { forwardRef, useId, type InputHTMLAttributes } from "react";
import "./Input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, id, className, ...rest }, ref) => {
        const generatedId = useId();
        const inputId = id ?? generatedId;
        const errorId = `${inputId}-error`;

        return (
            <div className={["ui-field", className].filter(Boolean).join(" ")}>
                <label className="ui-field__label" htmlFor={inputId}>
                    {label}
                </label>
                <input
                    ref={ref}
                    id={inputId}
                    className="ui-input"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    {...rest}
                />
                {error && (
                    <span id={errorId} className="ui-field__error" role="alert">
            {error}
          </span>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";