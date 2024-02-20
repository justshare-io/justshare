import React, {FC, ReactNode, useEffect} from "react";

export const Modal: FC<{children: ReactNode, open: boolean, onClose: () => void}> = ({children, open, onClose}) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (dialogRef.current) {
            if (open) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [open]);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        window.addEventListener('keydown', listener);
        return () => {
            window.removeEventListener('keydown', listener);
        }
    }, [onClose]);

    return (
        <dialog className="modal" ref={dialogRef}>
            <div className="modal-box">
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    )
}

