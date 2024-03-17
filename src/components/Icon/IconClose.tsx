import React from "react";

type Props = {
  size?: number;
  color?: string;
};

const IconClose: React.FC<Props> = ({ size = 32, color = "#3E3851" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3804 10L16.5082 4.75837C16.6615 4.60145 16.7476 4.38862 16.7476 4.1667C16.7476 3.94478 16.6615 3.73195 16.5082 3.57503C16.3549 3.41811 16.1471 3.32996 15.9303 3.32996C15.7136 3.32996 15.5057 3.41811 15.3524 3.57503L10.2328 8.82503L5.1131 3.57503C4.95984 3.41811 4.75196 3.32996 4.53521 3.32996C4.31846 3.32996 4.11058 3.41811 3.95731 3.57503C3.80405 3.73195 3.71794 3.94478 3.71794 4.1667C3.71794 4.38862 3.80405 4.60145 3.95731 4.75837L9.08511 10L3.95731 15.2417C3.88102 15.3192 3.82047 15.4113 3.77915 15.5129C3.73783 15.6144 3.71655 15.7234 3.71655 15.8334C3.71655 15.9434 3.73783 16.0523 3.77915 16.1538C3.82047 16.2554 3.88102 16.3476 3.95731 16.425C4.03298 16.5031 4.123 16.5651 4.22219 16.6074C4.32137 16.6497 4.42776 16.6715 4.53521 16.6715C4.64266 16.6715 4.74904 16.6497 4.84823 16.6074C4.94741 16.5651 5.03744 16.5031 5.1131 16.425L10.2328 11.175L15.3524 16.425C15.4281 16.5031 15.5181 16.5651 15.6173 16.6074C15.7165 16.6497 15.8229 16.6715 15.9303 16.6715C16.0378 16.6715 16.1441 16.6497 16.2433 16.6074C16.3425 16.5651 16.4325 16.5031 16.5082 16.425C16.5845 16.3476 16.6451 16.2554 16.6864 16.1538C16.7277 16.0523 16.749 15.9434 16.749 15.8334C16.749 15.7234 16.7277 15.6144 16.6864 15.5129C16.6451 15.4113 16.5845 15.3192 16.5082 15.2417L11.3804 10Z"
        fill={color}
      />
    </svg>
  );
};

export default IconClose;