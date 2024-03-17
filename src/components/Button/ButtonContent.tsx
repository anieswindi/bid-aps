import React, { ReactNode } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Variant, BtnState } from ".";

type Props = {
  variant?: Variant;
  state?: BtnState;
  children?: ReactNode;
};

const ButtonContent: React.FC<Props> = ({
  variant = "primary",
  state = "active",
  children,
}) => {
  return (
    <>
      {state === "loading" ? (
        <div>
          <ClipLoader
            size={16}
            color={variant === "secondary" ? "black" : "white"}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ButtonContent;
