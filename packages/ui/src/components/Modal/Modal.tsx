import {
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    type MouseEvent,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function Modal({ open, onClose, title, children }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const titleId = useId();

    const onCloseRef = useRef(onClose);
    useLayoutEffect(() => {
        onCloseRef.current = onClose;
    });

    useEffect(() => {
        if (!open) return;
        const dialog = dialogRef.current;
        if (!dialog) return;

        const previouslyFocused =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;

        const focusables = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        (focusables[0] ?? dialog).focus();

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onCloseRef.current();
                return;
            }
            if (event.key !== "Tab" || !dialog) return;

            const items = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
            const first = items[0];
            const last = items[items.length - 1];
            if (!first || !last) {
                event.preventDefault();
                return;
            }

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previouslyFocused?.focus();
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    if (!open) return null;

    function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) onClose();
    }

    return createPortal(
        <div className="ui-modal-overlay" onClick={handleOverlayClick}>
            <div
                ref={dialogRef}
                className="ui-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
            >
                <header className="ui-modal__header">
                    <h2 id={titleId} className="ui-modal__title">
                        {title}
                    </h2>
                    <button
                        type="button"
                        className="ui-modal__close"
                        onClick={onClose}
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                </header>
                <div className="ui-modal__body">{children}</div>
            </div>
        </div>,
        document.body,
    );
}