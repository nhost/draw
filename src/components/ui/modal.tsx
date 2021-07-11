import { useEffect, useCallback } from "react";
import classNames from "classnames";

type ModalProps = {
  open: boolean;
  className: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal(props: ModalProps) {
  const { children, open, className, onClose } = props;

  const escFunction = useCallback(
    (e: any) => {
      if (!open || e.keyCode !== 27) {
        return;
      }

      onClose();
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  if (!open) {
    return null;
  }

  const classes = classNames(["bg-white", "px-12", "py-8", className]);

  return (
    <div className="fixed z-10 w-full h-full top-0 left-0 flex items-center">
      <button
        className="fixed z-20 inset-0 h-full w-full opacity-50 bg-black cursor-default"
        onClick={onClose}
      />
      <div className="modal-container bg-white  mx-auto rounded shadow-lg z-30 overflow-y-auto mt-12 max-w-md lg:max-w-lg xl:max-w-xl w-full">
        <div className={classes}>{children}</div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  className: "",
  fullWidth: false,
};
