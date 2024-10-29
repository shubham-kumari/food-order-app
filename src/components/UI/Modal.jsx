import { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal =  forwardRef ( function Modal({ children, open, onClose, className = '' }, ref) {
    const dialog = useRef();
    useEffect(() => {
        const modal = dialog.current;
        if(open){
            modal.showModal();
        }
        return () => modal.close();
    }, [open])

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose} >{children}</dialog>,
    document.getElementById("modal")
  );
})

export default Modal;