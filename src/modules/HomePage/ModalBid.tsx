import { useEffect, useState } from "react";
import Button from "../../components/Button";
import FormFieldText from "../../components/Form/FormFieldText";
import FormFieldTextarea from "../../components/Form/FormFieldTextarea";
import Modal from "../../components/Modal";
import FormRadioButton from "../../components/Form/FormRadioButton";

export type Status = "pending" | "active" | "reject";
export type Bid = {
  id?: string;
  name?: string;
  collection_id?: string;
  user_id?: string;
  stocks?: number;
  price?: number;
  status?: Status;
};

export type MProps = {
  isShow?: boolean;
  onClose?(): void;
  type?: "add" | "update" | "delete";
  data?: Bid;
  refetch?(): void;
  collectionId?: string;
};

const ModalBid: React.FC<MProps> = ({
  isShow = false,
  onClose,
  type = "add",
  data,
  refetch,
  collectionId,
}) => {
  const [loading, setLoading] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [currentBody, setCurrentBody] = useState<Bid>({});

  useEffect(() => {
    if (data) {
      setCurrentBody(data);
    } else {
      setCurrentBody({
        name: "",
        stocks: 0,
        price: 0,
        status: "pending",
      });
    }
  }, [data]);

  const onDeleteData = async () => {
    setLoading({ add: false, update: false, delete: true });
    await fetch(`/api/bid/${currentBody?.id}`, {
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
    await fetch(`/api/bid?collectionId=${collectionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentBody),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          setCurrentBody({
            name: "",
            stocks: 0,
            price: 0,
            status: "pending",
          });
          setLoading({ add: false, update: false, delete: false });
          onClose();
          refetch();
        }
      });
  };

  const onPutData = async () => {
    setLoading({ add: false, update: true, delete: false });
    await fetch(`/api/bid/${currentBody?.id}`, {
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
            stocks: 0,
            price: 0,
            status: "pending",
          });
          refetch();
        }
      });
  };

  return (
    <Modal
      isShow={isShow}
      onClose={onClose}
      title={`${type.toLocaleUpperCase()} Bid`}
    >
      {
        {
          add: (
            <FormBid currentBody={currentBody} handleUpdate={setCurrentBody} />
          ),
          update: (
            <FormBid currentBody={currentBody} handleUpdate={setCurrentBody} />
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
};

export default ModalBid;

function FormBid({ currentBody, handleUpdate }) {
  const [dataStatus, setDataStatus] = useState([
    { label: "pending", status: false, text: "Pending" },
    { label: "accept", status: false, text: "Accept" },
    { label: "reject", status: false, text: "Reject" },
  ]);

  const onSelectStatus = (checked, val) => {
    let newDataStatus = [...dataStatus].map((el) =>
      el.label === val ? { ...el, status: checked } : { ...el, status: false }
    );
    let filtered = newDataStatus.find((a) => a.status)?.label;
    setDataStatus(newDataStatus);
    handleUpdate({ ...currentBody, status: filtered });
  };

  useEffect(() => {
    if (currentBody.status) {
      setDataStatus(
        [...dataStatus].map((el) =>
          el.label === currentBody.status
            ? { ...el, status: true }
            : { ...el, status: false }
        )
      );
    }
  }, [currentBody.status]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-2 mb-4">
        <span className="font-semibold">Name</span>
        <FormFieldText
          name="name"
          placeholder={"Enter a name of bid"}
          value={currentBody?.name}
          onChange={(e) =>
            handleUpdate({ ...currentBody, name: e.target.value })
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

      <div className="grid gap-2 mb-4">
        <span className="font-semibold">Status</span>
        <FormRadioButton data={dataStatus} selected={onSelectStatus} />
      </div>
    </div>
  );
}
