import React from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import HomePage from "../modules/HomePage";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany();

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
    props: { collection, users: JSON.parse(JSON.stringify(users)) },
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
