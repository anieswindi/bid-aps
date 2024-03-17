import { ReactNode } from "react";
import Field, { Props as BaseProps } from "./FormField";
import InputBase, { style as inputBaseStyle } from "./InputBase";

type Props = BaseProps & {
  placeholder?: string;
  inputStyle?: string;
  name?: string;
  value?: string;
  onChange?: () => void;
};

export const style =
  "w-full p-4 text-14 text-gray-800 border-default border-gray-500 rounded-md placeholder-gray-400 placeholder:font-light focus-visible:outline-2 focus-visible:outline-blue-500";

const FormFieldTextarea: React.FC<Props> = (props) => {
  const { inputStyle, placeholder, name, onChange, value, ...others } = props;

  return (
    // @ts-ignore
    <textarea
      className={"resize rounded-md " + inputStyle + style}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      {...others}
    ></textarea>
  );
};

export default FormFieldTextarea;
