import { useEffect, useState } from "react";
import Button from "../../components/Button";
import SwitchButton from "../../components/Button/SwitchButton";
import FormFieldText from "../../components/Form/FormFieldText";
import Modal from "../../components/Modal";
import ToDoService from "../../services/ToDo/ToDoService";
import IconSuccess from "../Icon/IconSuccess";
import IconError from "../Icon/IconError";

type Types = "success" | "warning" | "error";

type ToDoProps = {
  isShow?: boolean;
  onClose?(): void;
  type?: Types;
  message?: string;
};

const ModalMessage: React.FC<ToDoProps> = ({
  isShow,
  onClose,
  type,
  message = "",
}) => {
  return (
    <Modal isShow={isShow} onClose={onClose}>
      <div className="grid justfity-center gap-4 items-center h-fit">
        <div className="flex justify-center">
          {
            {
              success: <IconSuccess />,
              warning: <IconError />,
              error: <IconError />,
            }[type]
          }
        </div>

        <span
          className={
            "font-bold text-2xl text-center " +
            (type == "success" ? "text-green-700" : "text-red-700")
          }
        >
          {
            {
              success: "Success!",
              warning: "Warning!",
              error: "Error!",
            }[type]
          }
        </span>

        <div className="text-center text-lg">{message}</div>
      </div>
    </Modal>
  );
};

export default ModalMessage;
