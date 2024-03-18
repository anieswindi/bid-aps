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
export type MProps = {
  isShow?: boolean;
  onClose?(): void;
  type?: Types;
  data?: Collection;
  refetch?(): void;
};

const ModalCollection: React.FC<MProps> = ({
  isShow = false,
  onClose,
  type = "add",
  data,
  refetch,
}) => {
  const [loading, setLoading] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [currentBody, setCurrentBody] = useState<Collection>({});

  useEffect(() => {
    if (data) {
      setCurrentBody(data);
    } else {
      setCurrentBody({
        name: "",
        description: "",
        stocks: 0,
        price: 0,
      });
    }
  }, [data]);

  const onDeleteData = async () => {
    setLoading({ add: false, update: false, delete: true });
    await fetch(`/api/collection/${currentBody?.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          setLoading({ add: false, update: false, delete: false });
          onClose();
          refetch();
        }
      });
  };

  const onPostData = async () => {
    setLoading({ add: true, update: false, delete: false });
    await fetch("/api/collection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentBody),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          setCurrentBody({
            name: "",
            description: "",
            stocks: 0,
            price: 0,
          });
          setLoading({ add: false, update: false, delete: false });
          onClose();
          refetch();
        }
      });
  };

  const onPutData = async () => {
    setLoading({ add: false, update: true, delete: false });
    await fetch(`/api/collection/${currentBody?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoading({ add: false, update: false, delete: false });
          onClose();
          setCurrentBody({
            name: "",
            description: "",
            stocks: 0,
            price: 0,
          });
          refetch();
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
                currentBody={currentBody}
                handleUpdate={setCurrentBody}
              />
            ),
            update: (
              <FormCollection
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
                  state={loading.delete ? "loading" : "active"}
                  onClick={onDeleteData}
                >
                  Yes
                </Button>
              </>
            ),
          }[type] || (
            <>
              <Button variant="secondary" state="active" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                state={loading.add || loading.update ? "loading" : "active"}
                onClick={type == "add" ? onPostData : onPutData}
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

function FormCollection({ currentBody, handleUpdate }) {
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
