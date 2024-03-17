import React from "react";
import { GetStaticProps } from "next";
import { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import HomePage from "../modules/HomePage";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  console.log("🚀 blog", props);

  return <HomePage />;
};

export default Blog;
