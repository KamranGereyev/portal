import { useId, type ReactNode } from "react";
import "./Field.css";

interface FieldRenderProps {
    id: string;
    "aria-invalid": true | undefined;
    "aria-describedby": string | undefined;
}

interface FieldProps {
    label: string;
    error?: string;
    id?: string;
    className?: string;
    children: (props: FieldRenderProps) => ReactNode;
}

export function Field({ label, error, id, className, children }: FieldProps) {
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const errorId = `${controlId}-error`;

    return (
        <div className={["ui-field", className].filter(Boolean).join(" ")}>
            <label className="ui-field__label" htmlFor={controlId}>
                {label}
            </label>
            {children({
                id: controlId,
                "aria-invalid": error ? true : undefined,
                "aria-describedby": error ? errorId : undefined,
            })}
            {error && (
                <span id={errorId} className="ui-field__error" role="alert">
          {error}
        </span>
            )}
        </div>
    );
}