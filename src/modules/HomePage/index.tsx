import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { IconArrow } from "../../components/Icon/IconArrow";
import { IconArrowDown } from "../../components/Icon/IconArrowDown";
import ModalBid from "../../modules/HomePage/ModalBid";
import ModalCollection, { Types } from "../../modules/HomePage/ModalCollection";
import { Pagination } from "../../components/Pagination";
import { useLoaderStore } from "../../components/Loader/loaderStore";
import { useModalStore } from "../../components/Modal/modalStore";

function HomePage({ data }: { data?: any[] }) {
  const [dummy, setData] = useState([]);
  const [isOpenCollection, setIsOpenCollection] = useState(false);
  const [isOpenBid, setIsOpenBid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [type, setType] = useState("add");
  const [currentData, setCurrentData] = useState();
  const [loading, setLoading] = useState(false);
  
  
  const toggleExpanded = (name?: string) => {
    setData(
      [...dummy].map((elm) =>
        elm.name === name ? { ...elm, open: !elm.open } : { ...elm }
      )
    );
  };

  const handleChange = (e: number) => {
    setCurrentPage(e);
  };

  const onGetDetail = async (id, types) => {
    setLoading(!loading);
    await fetch(`/api/collection/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(!loading);
        setCurrentData(data);
        setType(types);
        setIsOpenCollection(true);
        
      })
      .catch((err) => {
        console.log("🚀 err: ", err);
      });
  };

  useEffect(() => {
    if (data) {
      setData(data.map((elm) => ({ ...elm, open: false })));
    }
  }, [data]);

  return (
    <div className="p-16">
      <h1 className="mb-4">List Collection</h1>
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
      <div className="grid gap-4">
        {dummy
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .map((dum, idx) => (
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
                      state={loading ? "loading" : "active"}
                      onClick={() => onGetDetail(dum.id, "update")}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="red"
                      state={loading ? "loading" : "active"}
                      onClick={() => onGetDetail(dum.id, "delete")}
                    >
                      Delete
                    </Button>
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
                              onClick={() => {
                                setType("update");
                                setIsOpenBid(true);
                              }}
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

        {dummy && dummy.length ? (
          <Pagination
            currentPage={currentPage}
            totalCount={dummy.length}
            pageSize={pageSize}
            onPageChange={(e) => handleChange(e)}
          />
        ) : null}
      </div>

      <ModalBid
        type={type as Types}
        isShow={isOpenBid}
        onClose={() => {
          setType("add");
          setIsOpenBid(false);
          setLoading(false)
        }}
      />
      <ModalCollection
        data={currentData}
        type={type as Types}
        isShow={isOpenCollection}
        onClose={() => {
          setType("add");
          setIsOpenCollection(false);
          setLoading(false)
        }}
      />
    </div>
  );
}

export default HomePage;
