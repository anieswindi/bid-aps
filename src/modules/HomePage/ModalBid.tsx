import Modal from "../../components/Modal";

export type ToDoProps = {
  isShow?: boolean;
  onClose?(): void;
  type?: "add" | "update" | "delete";
};

const ModalBid: React.FC<ToDoProps> = ({
  isShow = false,
  onClose,
  type = "add",
}) => {
  return (
    <Modal
      isShow={isShow}
      onClose={onClose}
      title={`${type.toLocaleUpperCase()} Bid`}
    >
      {
        {
          add: <div>{type}</div>,
          update: <div>{type}</div>,
          delete: <div>{type}</div>,
        }[type]
      }
    </Modal>
  );
};

export default ModalBid;
