import { ClipLoader } from "react-spinners";
import Modal from "../Modal";
import { useLoaderStore } from "./loaderStore";

const ModalLoader: React.FC = () => {
  const isLoadingState = useLoaderStore((state) => state.isLoadingState);

  return (
    <Modal isShow={isLoadingState}>
      <div className="w-full flex justify-center h-[160px] items-center">
        <ClipLoader size={56} color="black" />
      </div>
    </Modal>
  );
};

export default ModalLoader;
