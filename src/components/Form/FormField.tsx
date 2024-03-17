import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
} from "react";
// import FieldError from "./FieldError";

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name?: string;
  label?: string;
  validator?: any;
  children?: ReactNode;
  className?: string;
  info?: string;
  islast?: boolean;
  isFull?: boolean;
};

const FormField: React.FC<Props> = ({
  name,
  label,
  validator,
  children,
  className,
  info,
  islast,
  isFull,
  required,
}) => {
  return (
    <div className={`${className || ""} ${isFull ? "w-full" : ""}`}>
      {label && (
        <div className="mb-8">
          <label className="text-lg text-gray-600 font-semibold mb-0 block flex gap-4">
            {label}{" "}
            {required && <div className="text-red-500 font-medium">*</div>}
          </label>
        </div>
      )}
      {children}
      {/* {name && validator && <FieldError name={name} validator={validator} />} */}
      {info && <p className="mt-2 mb-0 text-12 text-gray-500">{info}</p>}
    </div>
  );
};

export default FormField;
