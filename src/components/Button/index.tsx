import React, { ReactNode } from "react";
import Content from "./ButtonContent";
import { Route } from "nextjs-routes";
import { ObjectOmit } from "../../utils/objects";

export type Variant = "primary" | "secondary" | "white" | "red";
export type Size = "small" | "medium" | "large";
export type BtnState = "active" | "disabled" | "loading";
export type RoundedSize = "small" | "medium" | "large" | "full";
type HtmlBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type Props = {
  size?: Size;
  variant?: Variant;
  state?: BtnState;
  rounded?: RoundedSize;
  className?: string;
  path?: Route | string;
  isOutside?: boolean;
  isFull?: boolean;
  children?: ReactNode;
};

export const styles: {
  base: string;
  size: { [s in Size]: string };
  rounded: { [r in RoundedSize]: string };
} & {
  [v in Variant]: {
    [v in BtnState]: string;
  };
} = {
  base: "text-white border-default items-center inline-flex justify-center hover:no-underline",
  size: {
    large: "h-48 text-base font-bold px-4",
    medium: "h-36 text-lg font-medium px-6",
    small: "h-24 text-sm font-medium px-3",
  },
  primary: {
    active: "bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600",
    disabled: "bg-gray-200 border-gray-200 text-gray-600 cursor-not-allowed",
    loading: "bg-blue-500 border-blue-500",
  },
  secondary: {
    active: "bg-white border-blue-600 hover:bg-blue-05 !text-blue-500",
    disabled: "bg-gray-100 border-gray-600 text-gray-600 cursor-not-allowed",
    loading: "bg-white border-blue-500 !text-blue-500",
  },
  white: {
    active: "bg-white border-white hover:bg-blue-05 !text-blue-500",
    disabled: "bg-gray-100 border-gray-100 text-gray-600 cursor-not-allowed",
    loading: "bg-white border-white !text-blue-500",
  },
  red: {
    active: "bg-red-100 border-red-700 !text-red-700",
    disabled: "bg-gray-200 border-gray-200 text-gray-600 cursor-not-allowed",
    loading: "bg-red-100 border-red-700",
  },
  rounded: {
    small: "rounded-default",
    medium: "rounded-md",
    large: "rounded-lg",
    full: "rounded-full",
  },
};

const Button: React.FC<Props & HtmlBtnProps> = (props) => {
  const {
    size = "medium",
    variant = "primary",
    type = "button",
    state = "active",
    rounded = "medium",
    className = "",
    isFull,
    children,
  } = props;
  const roundedClass = styles["rounded"][rounded];
  const btnStyles = `${styles.base} ${styles.size[size]} ${
    styles[variant][state]
  } ${roundedClass}${isFull ? " w-full" : ""} ${className || ""}`;

  return (
    <button
      {...ObjectOmit(props, [
        "size",
        "variant",
        "type",
        "state",
        "rounded",
        "className",
        "isFull",
        "children",
      ])}
      type={type}
      disabled={state === "disabled" || state === "loading"}
      className={btnStyles}
    >
      <Content state={state} variant={variant}>
        {children}
      </Content>
    </button>
  );
};

export default Button;
