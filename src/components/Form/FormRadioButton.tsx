import React from "react";

export type FormProps = {
  data?: any[];
  selected?: (a: boolean, b: string) => void;
};

const FormRadioButton: React.FC<FormProps> = ({ data, selected }) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <div className="flex items-center">
          <input
            checked={item.status}
            id={item.label}
            type="radio"
            name="default-radio"
            onChange={(e) => selected(e.target.checked, item.label)}
            className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:rounded-full"
          />
          <label htmlFor={item.label} className="ms-2 text-sm font-medium">
            {item.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FormRadioButton;
