import { type } from "os";
import Button from "../../components/Button";
import { useState } from "react";
import { IconArrow } from "../../components/Icon/IconArrow";
import { IconArrowDown } from "../../components/Icon/IconArrowDown";
import ModalBid from "../../modules/HomePage/ModalBid";
import ModalCollection from "../../modules/HomePage/ModalCollection";

type DummyProps = {
  id?: string;
  name?: string;
  descriptions?: string;
  stocks?: number;
  price?: number;
  open?: boolean;
  bids?: Bid[];
};

type Bid = {
  id?: string;
  name?: string;
  collection_id?: string;
  price?: number;
  user_id?: string;
  status?: "pending" | "accepted" | "rejected";
};

const DummyData: DummyProps[] = [
  {
    id: "cncwuccnkc99",
    name: "Collection 1",
    descriptions: "abc",
    stocks: 10,
    price: 0,
    open: false,
    bids: [
      {
        id: "ggggg1",
        name: "Bid 1",
        collection_id: "cncwuccnkc99",
        price: 0,
        status: "pending",
      },
      {
        id: "ggggg2",
        name: "Bid 1",
        collection_id: "cncwuccnkc99",
        price: 0,
        status: "accepted",
      },
      ,
      {
        id: "ggggg3",
        name: "Bid 1",
        collection_id: "cncwuccnkc99",
        price: 0,
        status: "rejected",
      },
    ],
  },
  {
    id: "cncwuccnkc100",
    name: "Collection 2",
    descriptions: "abcdefghijk",
    stocks: 10,
    price: 0,
    open: false,
    bids: [
      {
        id: "ggggg1",
        name: "Bid 1",
        collection_id: "cncwuccnkc100",
        price: 0,
        status: "pending",
      },
      {
        id: "ggggg2",
        name: "Bid 1",
        collection_id: "cncwuccnkc100",
        price: 0,
        status: "accepted",
      },
      ,
      {
        id: "ggggg3",
        name: "Bid 1",
        collection_id: "cncwuccnkc100",
        price: 0,
        status: "rejected",
      },
    ],
  },
];

function HomePage({ data }: { data?: any[] }) {
  console.log("🚀 data: ", data);

  const [dummy, setData] = useState(DummyData);
  const [isOpenCollection, setIsOpenCollection] = useState(false);
  const [isOpenBid, setIsOpenBid] = useState(false);

  const toggleExpanded = (name?: string) => {
    setData(
      [...dummy].map((elm) =>
        elm.name === name ? { ...elm, open: !elm.open } : { ...elm }
      )
    );
  };

  return (
    <div className="p-16">
      <div className="flex justify-end mb-8">
        <Button onClick={() => setIsOpenCollection(true)}>Create</Button>
      </div>
      <div className="grid gap-4">
        {dummy.map((dum, idx) => (
          <div key={idx + Math.random()}>
            <div className="border-default rounded-lg p-4 flex gap-4 items-center cursor-pointer justify-between w-full">
              <div
                className="flex gap-4"
                onClick={() => toggleExpanded(dum.name)}
              >
                {dum.open ? (
                  <IconArrow isCaret={true} direction="up" />
                ) : (
                  <IconArrowDown size={20} />
                )}

                {dum.name}
              </div>

              {idx !== 0 ? (
                <div className="flex justify-end gap-4">
                  <Button variant="secondary">Place Bid</Button>
                </div>
              ) : (
                <div className="flex justify-end gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => setIsOpenCollection(true)}
                  >
                    Edit
                  </Button>
                  <Button variant="red">Delete</Button>
                </div>
              )}
            </div>

            <div
              className={
                dum.open
                  ? "pl-8 mt-4 grid gap-4 transition-all duration-500 ease-in"
                  : "hidden"
              }
            >
              {dum.bids && dum.bids.length
                ? dum.bids.map((elm, i) => (
                    <div
                      className="border-default rounded-lg p-4 flex justify-between"
                      key={Math.random() + i}
                    >
                      {elm.name}

                      {idx !== 0 ? (
                        <div className="flex justify-end gap-4">
                          <Button
                            variant="secondary"
                            onClick={() => setIsOpenBid(true)}
                          >
                            Edit
                          </Button>
                          <Button variant="red">Cancel</Button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-4">
                          {elm.status === "pending" ? (
                            <>
                              <Button variant="secondary">Accept</Button>
                              <Button variant="red">Reject</Button>
                            </>
                          ) : (
                            <Button variant="secondary">{elm.status}</Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                : null}
            </div>
          </div>
        ))}
      </div>

      <ModalBid isShow={isOpenBid} onClose={() => setIsOpenBid(false)} />
      <ModalCollection
        isShow={isOpenCollection}
        onClose={() => setIsOpenCollection(false)}
      />
    </div>
  );
}

export default HomePage;
