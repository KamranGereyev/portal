import { forwardRef, type SelectHTMLAttributes } from "react";
import { Field } from "../Field/Field";
import "./Select.css";

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, placeholder, id, className, ...rest }, ref) => (
        <Field label={label} error={error} id={id} className={className}>
            {(fieldProps) => (
                <select ref={ref} className="ui-select" {...fieldProps} {...rest}>
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
        </Field>
    ),
);

Select.displayName = "Select";