import React from "react";
import { GetStaticProps } from "next";
import { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import HomePage from "../modules/HomePage";

export const getStaticProps: GetStaticProps = async () => {
  const collection = await prisma.collection.findMany({
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
  return <HomePage data={props.collection ?? []} />;
};

export default Blog;
