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
  let color = "";

  switch (variant) {
    case "secondary":
      color = "#a0aec0";
      break;

    case "primary":
      color = "#ffffff";
      break;

    case "red":
      color = "#f56565";
      break;

    default:
      color = "#ffffff";
      break;
  }
  return (
    <>
      {state === "loading" ? <ClipLoader size={16} color={color} /> : children}
    </>
  );
};

export default ButtonContent;
