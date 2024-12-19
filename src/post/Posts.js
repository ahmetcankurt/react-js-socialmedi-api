import { useState, useEffect, memo } from "react";
import axios from "axios";
import io from "socket.io-client";
import Comments from "./comments";
import PostUpdate from "./postUpdate";
import PostCreate from "../components/postCreate";
import PostsList from "../components/postList";
import urlApi from "../config";

const socket = io(urlApi);

function Posts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${urlApi}/posts/${userId}/posts`
        );
        const fetchedPosts = response.data.map((post) => ({
          ...post,
          likeCount: post.likeCount || 0, // Ensure likeCount is defined
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();

    socket.on("postAdded", (post) => {
      setPosts((prevPosts) => [...prevPosts, post]);
    });

    socket.on("postUpdated", (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === updatedPost.postId ? updatedPost : post
        )
      );
    });

    socket.on("postDeleted", (deletedPostId) => {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.postId !== deletedPostId)
      );
    });

    return () => {
      socket.off("postAdded");
      socket.off("postUpdated");
      socket.off("postDeleted");
    };
  }, [userId]);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", selectedPost.title);
      formData.append("content", selectedPost.content);
      formData.append("image", selectedPost.image);

      const token = localStorage.getItem("token"); // Token'ı localStorage'dan al

      const response = await axios.put(
        `${urlApi}/posts/${selectedPost.postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Token'ı Authorization başlığı altında gönder
          },
        }
      );

      console.log("Post updated:", response.data);
      closeModal();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === selectedPost.postId ? response.data : post
        )
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <>
      <hr />
      <PostCreate />
      <hr />
      <div>
        <h2>Posts</h2>
        <PostsList />
        <hr />
      </div>
      <PostUpdate
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={handleUpdate}
        closeModal={closeModal}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default memo(Posts);
