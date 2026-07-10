import { forwardRef, type InputHTMLAttributes } from "react";
import { Field } from "../Field/Field";
import "./Input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, id, className, ...rest }, ref) => (
        <Field label={label} error={error} id={id} className={className}>
            {(fieldProps) => <input ref={ref} className="ui-input" {...fieldProps} {...rest} />}
        </Field>
    ),
);

Input.displayName = "Input";