import Modal from "../../components/Modal";
import IconSuccess from "../Icon/IconSuccess";
import IconError from "../Icon/IconError";
import { useModalStore } from "./modalStore";

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
  const currentModalData = useModalStore((state) => state.current);

  return (
    <Modal isShow={currentModalData?.isShow} onClose={onClose}>
      <div className="grid justfity-center gap-4 items-center h-fit">
        <div className="flex justify-center">
          {
            {
              success: <IconSuccess />,
              warning: <IconError />,
              error: <IconError />,
            }[currentModalData?.type]
          }
        </div>

        <span
          className={
            "font-bold text-2xl text-center " +
            (currentModalData?.type == "success"
              ? "text-green-700"
              : "text-red-700")
          }
        >
          {
            {
              success: "Success!",
              warning: "Warning!",
              error: "Error!",
            }[currentModalData?.type]
          }
        </span>

        <div className="text-center text-lg">{currentModalData?.message}</div>
      </div>
    </Modal>
  );
};

export default ModalMessage;
