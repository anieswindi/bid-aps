import React, { useState } from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import HomePage from "../modules/HomePage";
import { useLoaderStore } from "../components/Loader/loaderStore";
import { useModalStore } from "../components/Modal/modalStore";

export const getStaticProps: GetStaticProps = async () => {
  const collection = await prisma.collection.findMany({
    where: {
      NOT: {
        bids: {
          none: {},
        },
      },
    },
    include: {
      bids: true,
    },
  });
  return {
    props: { collection },
    revalidate: 10,
  };
};

type Props = {
  collection: any[];
};

const Blog: React.FC<Props> = (props) => {
  const [currentCollection, setCurrentCollection] = useState(
    props.collection ?? []
  );
  const setLoading = useLoaderStore((state) => state.setLoading);
  const setModalMessage = useModalStore((state) => state.setModalMessage);

  const refetch = async () => {
    await fetch("/api/collection")
      .then((res) => res.json())
      .then((res) => {
        setCurrentCollection(res);
        setModalMessage({
          isShow: true,
          type: "success",
          message: "Success update data!",
        });
      });
  };

  return <HomePage data={currentCollection} refetch={refetch} />;
};

export default Blog;
