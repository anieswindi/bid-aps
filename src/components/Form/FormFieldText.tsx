import { ReactNode } from "react";
import Field, { Props as BaseProps } from "./FormField";
import InputBase, { style as inputBaseStyle } from "./InputBase";

type Props = BaseProps & {
  defaultValue?: any;
  type?: string;
  placeholder?: string;
  inputStyle?: string;
  afterInput?: ReactNode;
  beforeInput?: ReactNode;
  disabled?: boolean;
  classBase?: string;
};

const FormFieldText: React.FC<Props> = (props) => {
  const {
    name,
    validator,
    children,
    type,
    defaultValue,
    afterInput,
    beforeInput,
    inputStyle,
    classBase,
    ...others
  } = props;

  return (
    <Field name={name} validator={validator} {...others}>
      <InputBase
        name={name}
        defaultValue={defaultValue}
        validator={validator}
        afterInput={afterInput}
        beforeInput={beforeInput}
        classBase={classBase}
        onRender={(field) => (
          <input
            className={`${inputBaseStyle} ${inputStyle || ""}`}
            type={type}
            id={`input-${name}`}
            {...field}
            {...others}
          />
        )}
      />
    </Field>
  );
};

export default FormFieldText;
