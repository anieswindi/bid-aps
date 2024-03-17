import { useEffect, useState } from "react";
import FormFieldText from "../../components/Form/FormFieldText";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import FormFieldTextarea from "../../components/Form/FormFieldTextarea";
import { useModalStore } from "../../components/Modal/modalStore";

export type Types = "add" | "update" | "delete";
export type Collection = {
  id?: string;
  name?: string;
  description?: string;
  stocks?: number;
  price?: number;
};
export type ToDoProps = {
  isShow?: boolean;
  onClose?(): void;
  type?: Types;
  data?: Collection;
};

const ModalCollection: React.FC<ToDoProps> = ({
  isShow = false,
  onClose,
  type = "add",
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentBody, setCurrentBody] = useState<Collection>({});
  const setModalMessage = useModalStore((state) => state.setModalMessage);

  useEffect(() => {
    if (data) {
      setCurrentBody(data);
    }
  }, [data]);

  const onDeleteData = async () => {
    setLoading(!loading);
    const response = await fetch(`/api/collection/${currentBody?.id}`, {
      method: "DELETE",
    });

    if (response.status == 200) {
      setLoading(!loading);
      onClose();
    }
  };

  const onPostData = async () => {
    setLoading(!loading);
    const response = await fetch("/api/collection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentBody),
    });

    if (response.status == 200) {
      setLoading(!loading);
      onClose();
      setCurrentBody({
        name: "",
        description: "",
        stocks: 0,
        price: 0,
      });

      setModalMessage({
        isShow: true,
        type:'success',
        message: "Success add collection",
      });
    }
  };

  const onPutData = async () => {
    setLoading(!loading);
    await fetch(`/api/collection/${currentBody?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoading(false);
          onClose();
          setCurrentBody({
            name: "",
            description: "",
            stocks: 0,
            price: 0,
          });
          setModalMessage({
            isShow: true,
            type:'success',
            message: "Success update collection",
          });
        }
      });
  };

  if (isShow) {
    return (
      <Modal
        isShow={isShow}
        onClose={onClose}
        title={`${type.toLocaleUpperCase()} Collection`}
      >
        {
          {
            add: (
              <FormCollection
                type={type}
                currentBody={currentBody}
                handleUpdate={setCurrentBody}
              />
            ),
            update: (
              <FormCollection
                type={type}
                currentBody={currentBody}
                handleUpdate={setCurrentBody}
              />
            ),
            delete: (
              <div>
                Are you sure want to remove{" "}
                <strong>{currentBody?.name ?? ""}</strong>?
              </div>
            ),
          }[type]
        }

        <div className="flex justify-end gap-4 mt-4">
          {{
            delete: (
              <>
                <Button
                  variant="red"
                  state={loading ? "loading" : "active"}
                  onClick={onDeleteData}
                  size="large"
                >
                  Yes
                </Button>
              </>
            ),
          }[type] || (
            <>
              <Button
                variant="secondary"
                state="active"
                onClick={onClose}
                size="large"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                state={loading ? "loading" : "active"}
                onClick={type == "add" ? onPostData : onPutData}
                size="large"
              >
                {type == "add" ? "Save" : "Update"}
              </Button>
            </>
          )}
        </div>
      </Modal>
    );
  }
  return null;
};

export default ModalCollection;

function FormCollection({ type, currentBody, handleUpdate }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2 mb-4">
        <span className="font-semibold">Name</span>
        <FormFieldText
          name="name"
          placeholder={"Enter a name of collection"}
          value={currentBody?.name}
          onChange={(e) =>
            handleUpdate({ ...currentBody, name: e.target.value })
          }
        />
      </div>

      <div className="grid gap-2 mb-4">
        <span className="font-semibold">Description</span>
        <FormFieldTextarea
          name="description"
          placeholder={"Enter a description"}
          value={currentBody?.description}
          // @ts-ignore
          onChange={(e) =>
            handleUpdate({ ...currentBody, description: e.target.value })
          }
        />
      </div>

      <div className="grid gap-2 mb-4">
        <span className="font-semibold">Stocks</span>
        <FormFieldText
          name="stocks"
          type="number"
          placeholder={"Enter stocks qty"}
          value={currentBody?.stocks}
          onChange={(e) =>
            handleUpdate({ ...currentBody, stocks: parseInt(e.target.value) })
          }
        />
      </div>

      <div className="grid gap-2 mb-4">
        <span className="font-semibold">Price ($)</span>
        <FormFieldText
          name="price"
          type="number"
          placeholder={"Enter a price"}
          value={currentBody?.price}
          onChange={(e) =>
            handleUpdate({ ...currentBody, price: parseInt(e.target.value) })
          }
        />
      </div>
    </div>
  );
}
