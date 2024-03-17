import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";

  async function publishPost(id: string): Promise<void> {
    await fetch(`/api/publish/${id}`, {
      method: "PUT",
    });
    await Router.push("/");
  }

  async function deletePost(id: string): Promise<void> {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    Router.push("/");
  }

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "unset",
        }}
      >
        <h2>{post.title}</h2>

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          {!post.published && (
            <button onClick={() => publishPost(post.id)}>Publish</button>
          )}

          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      </div>

      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
    </div>
  );
};

export default Post;
