import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { IconArrow } from "../../components/Icon/IconArrow";
import { IconArrowDown } from "../../components/Icon/IconArrowDown";
import ModalBid from "../../modules/HomePage/ModalBid";
import ModalCollection, { Types } from "../../modules/HomePage/ModalCollection";
import { Pagination } from "../../components/Pagination";
import { useLoaderStore } from "../../components/Loader/loaderStore";
import IconError from "../../components/Icon/IconError";
import IconSuccess from "../../components/Icon/IconSuccess";
import { userInfo } from "../../utils/auth";
import { useRouter } from "next/router";

function HomePage({ data, refetch }: { data?: any[]; refetch?(): void }) {
  const [items, setItems] = useState([]);
  const [isOpenCollection, setIsOpenCollection] = useState(false);
  const [isOpenBid, setIsOpenBid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [type, setType] = useState("add");
  const [currentData, setCurrentData] = useState();
  const [loading, setIsLoading] = useState({
    update: false,
    delete: false,
  });
  const user = userInfo();

  const [loadingBid, setBidLoading] = useState({
    update: false,
    cancel: false,
  });

  const setLoader = useLoaderStore((state) => state.setLoading);

  const toggleExpanded = (name?: string) => {
    setItems(
      [...items].map((elm) =>
        elm.name === name ? { ...elm, open: !elm.open } : { ...elm }
      )
    );
  };

  const handleChange = (e: number) => {
    setCurrentPage(e);
  };

  const onGetDetail = async (id, types) => {
    setIsLoading({
      ...loading,
      [types]: true,
    });
    await fetch(`/api/collection/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading({
          ...loading,
          [types]: false,
        });
        setCurrentData(data);
        setType(types);
        setIsOpenCollection(true);
      })
      .catch((err) => {
        console.log("🚀 err: ", err);
      });
  };

  const onBidDetail = async (id, types) => {
    setBidLoading({
      ...loadingBid,
      [types]: true,
    });
    await fetch(`/api/bid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBidLoading({
          ...loadingBid,
          [types]: false,
        });
        setCurrentData(data);
        setType(types);
        setIsOpenBid(true);
      })
      .catch((err) => {
        console.log("🚀 err: ", err);
      });
  };

  const onPutStatus = async (
    _bidId: string,
    _collectionId: string,
    status: string
  ) => {
    setLoader(true);
    let param = new URLSearchParams({
      bidId: _bidId,
      collectionId: _collectionId,
      status: status,
    });
    let url = `/api/bid/update-status?${param}`;

    await fetch(url, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          refetch();
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("🚀 err", err);
      });
  };

  useEffect(() => {
    if (data) {
      setItems(data.map((elm) => ({ ...elm, open: false })));
    }
  }, [data]);

  const itemsFinals = items.filter((a) => a.bids.length > 9);

  const renderButtonCollection = (bids, id) => {
    if (bids.some((a) => a.user_id === user.user_id)) {
      return (
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            state={loading.update ? "loading" : "active"}
            onClick={() => onGetDetail(id, "update")}
          >
            Edit
          </Button>
          <Button
            variant="red"
            state={loading.delete ? "loading" : "active"}
            onClick={() => onGetDetail(id, "delete")}
          >
            Delete
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => {
              setType("add");
              setIsOpenBid(true);
              setCurrentCollection(id);
            }}
          >
            Place Bid
          </Button>
        </div>
      );
    }
  };

  if (!user) {
    return <></>;
  } else {
    return (
      <div className="p-16">
        <Header />
        <h1 className="mb-4">List Collection ({itemsFinals.length})</h1>
        <div className="flex justify-end mb-8">
          <Button
            onClick={() => {
              setType("add");
              setIsOpenCollection(true);
            }}
          >
            Create
          </Button>
        </div>

        <div className="grid gap-4 mb-8">
          {itemsFinals
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((dum, idx) => (
              <div key={idx + Math.random()}>
                <div
                  className={
                    (dum.open ? "rounded-t-lg " : "rounded-lg ") +
                    " border-default p-4 flex gap-4 items-center cursor-pointer justify-between w-full"
                  }
                >
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

                  {renderButtonCollection(dum.bids, dum.id)}
                </div>

                <div
                  className={
                    dum.open
                      ? "p-8 grid gap-4 transition-max-height rounded-b-lg duration-500 ease-in bg-gray-100"
                      : "hidden"
                  }
                >
                  {dum.bids && dum.bids.length
                    ? dum.bids.map((elm, i) => {
                        let button = null;

                        if (dum.bids.some((a) => a.user_id === user.user_id)) {
                          button = (
                            <div className="flex justify-end gap-4">
                              <Button
                                variant="secondary"
                                state="active"
                                onClick={() => onBidDetail(elm.id, "update")}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="red"
                                onClick={() => onBidDetail(elm.id, "delete")}
                              >
                                Cancel
                              </Button>
                            </div>
                          );
                        } else {
                          button = (
                            <div className="flex justify-end gap-4">
                              {elm.status === "pending" ? (
                                <>
                                  <Button
                                    variant="success"
                                    state="active"
                                    onClick={() =>
                                      onPutStatus(elm.id, dum.id, "accept")
                                    }
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    variant="red"
                                    state="active"
                                    onClick={() =>
                                      onPutStatus(elm.id, dum.id, "reject")
                                    }
                                  >
                                    Reject
                                  </Button>
                                </>
                              ) : (
                                <>
                                  {elm.status == "reject" ? (
                                    <IconError size={30} />
                                  ) : (
                                    <IconSuccess size={30} />
                                  )}
                                </>
                              )}
                            </div>
                          );
                        }

                        return (
                          <div
                            className="border-2 border-gray-500 rounded-lg p-4 flex justify-between"
                            key={Math.random() + i}
                          >
                            {elm.name}

                            {button}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            ))}
        </div>

        {itemsFinals && itemsFinals.length ? (
          <Pagination
            currentPage={currentPage}
            totalCount={itemsFinals.length}
            pageSize={pageSize}
            onPageChange={(e) => handleChange(e)}
          />
        ) : null}

        <ModalBid
          data={currentData}
          collectionId={currentCollection}
          type={type as Types}
          isShow={isOpenBid}
          refetch={refetch}
          onClose={() => {
            setType("add");
            setIsOpenBid(false);
          }}
        />
        <ModalCollection
          data={currentData}
          type={type as Types}
          refetch={refetch}
          isShow={isOpenCollection}
          onClose={() => {
            setType("add");
            setIsOpenCollection(false);
          }}
        />
      </div>
    );
  }
}

export default HomePage;

const Header = () => {
  const user = userInfo();
  const router = useRouter();

  const onSignOut = () => {
    localStorage.removeItem("bid-app-user");
    router.push("/login");
  };
  return (
    <div className="flex gap-4 justify-end mb-6">
      <span>({user?.email ?? "unknown user"})</span>
      <span className="cursor-pointer" onClick={onSignOut}>
        Log out
      </span>
    </div>
  );
};
