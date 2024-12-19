import React, { memo } from "react";
import Posts from "../components/postList";
import PostsCreate from "../components/postCreate";

function Index() {
  return (
    <div className="p-5">
      <PostsCreate />
      <Posts />
    </div>
  );
}

export default memo(Index);