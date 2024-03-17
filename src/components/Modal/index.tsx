import React, { ReactNode, useState } from "react";
import IconClose from "../Icon/IconClose";

const useOutsideClick = (callback: () => void) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !(ref.current as any)?.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
};

export type Props = {
  isShow?: boolean;
  contentStyles?: object;
  isWidthScreen?: string;
  className?: string;
  childrenClassName?: string;
  contentClassName?: string;
  title?: string | ReactNode;
  onClose?(): void;
  onClickOutside?(): void;
  children: ReactNode;
  color?: string;
};

const Modal: React.FC<Props> = ({
  isShow,
  className,
  childrenClassName,
  contentClassName,
  contentStyles,
  isWidthScreen,
  title,
  onClose,
  onClickOutside,
  children,
  color = "#19093A",
}) => {
  const ref = useOutsideClick(() => {
    if (onClickOutside) {
      onClickOutside();
    }
  });

  if (isShow) {
    return (
      <>
        <div
          className={`fixed inset-0 flex sg:items-end items-center
          justify-center bg-neutral-500/50 ${className || ""}`}
          style={{ zIndex: 9999 }}
        >
          <div
            ref={ref}
            className={`relative w-full bg-white p-6 md:max-w-[640px] max-w-screen overflow-auto md:rounded-md rounded-t-md ${
              contentClassName || ""
            }`}
            style={{
              maxHeight: "none",
              ...contentStyles,
            }}
          >
            <div className={`flex items-center pb-4 !border-transparent `}>
              {title && (
                <h3 className="text-2xl text-gray-800 font-bold">{title}</h3>
              )}
              {onClose && (
                <button type="button" className="ml-auto" onClick={onClose}>
                  <IconClose size={20} color={color} />
                </button>
              )}
            </div>

            <div className={childrenClassName}>{children}</div>
          </div>
        </div>

        <style>{`
          html, body {
            overflow: hidden;
          }
        `}</style>
      </>
    );
  }
  return null;
};

export default Modal;
