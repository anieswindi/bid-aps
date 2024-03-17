import React, { useEffect, useState } from "react";

export type Props = {
  label?: string[];
  value?: boolean;
  onChange?: (b: boolean) => void;
};

const SwitchButton: React.FC<Props> = ({ label, value, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  return (
    <>
      <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <span className="label flex items-center text-sm font-medium text-light">
          {label[0]}
        </span>
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-[28px]" : ""
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-sm font-medium text-light">
          {label[1]}
        </span>
      </label>
    </>
  );
};

export default SwitchButton;
