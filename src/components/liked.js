import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import  urlApi  from '../config';

function Liked({ postId }) {
  const [liked, setLiked] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem('token'); // JWT token'ını local storage'dan alın

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await axios.get(`${urlApi}/likes/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const likedPosts = response.data.map((like) => like.postId);
        setLiked(likedPosts.includes(postId));
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
    checkIfLiked();
  }, [postId, userId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`${urlApi}/likes`, { postId, userId }, {
        headers: {
          'Content-Type': 'application/json', // multipart/form-data yerine application/json kullanın
          'Authorization': `Bearer ${token}`
        }
      });
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <>
      <FaHeart
        style={{
          color: liked ? "red" : "grey",
          cursor: "pointer",
        }}
        size={25}
        className="bg-gray-200 rounded-full hover:bg-gray-300"
        onClick={handleLike}
      />
    </>
  );
}

export default memo(Liked);
