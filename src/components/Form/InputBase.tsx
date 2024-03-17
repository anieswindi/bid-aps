import { ReactNode, ReactElement } from "react";
import { Controller } from "react-hook-form";

export type Props = {
  name: string;
  validator: any;
  classBase?: string;
  onRender(field: any): ReactElement;
  defaultValue?: any;
  afterInput?: ReactNode;
  beforeInput?: ReactNode;
};

export const style =
  "w-full p-4 text-14 text-gray-800 border-default border-gray-500 rounded-md placeholder-gray-400 placeholder:font-light focus-visible:outline-2 focus-visible:outline-blue-500";

const FormInputBase: React.FC<Props> = ({
  name,
  validator,
  classBase,
  onRender,
  defaultValue = "",
  afterInput,
  beforeInput,
}) => {
  const renderInput = () => {
    const { hook, rules } = validator;
    const { control } = hook;

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => onRender(field)}
      />
    );
  };

  return (
    <div className={`relative ${classBase || ""}`}>
      {beforeInput}
      {validator ? renderInput() : <>{onRender({})}</>}
      {afterInput}
    </div>
  );
};

export default FormInputBase;
