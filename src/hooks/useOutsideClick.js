import { useEffect, useRef } from "react";

export default function useOutsideClick(handleClose, onCapture = true) {
  const ref = useRef();

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) handleClose();
    }

    document.addEventListener("click", close, onCapture);

    return () => document.removeEventListener("click", close, onCapture);
  }, [handleClose, onCapture]);

  return ref;
}
