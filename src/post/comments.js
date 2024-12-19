import React, { useState, useEffect, memo } from "react";
import axios from "axios";

function Comments({ postId, userId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    // Sunucudan yorumları getir
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${urlApi}/comments/${postId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${urlApi}/comments/${postId}`,
        {
          content,
          userId,
          postId,
        }
      );
      setComments((prevComments) => [...prevComments, response.data]);
      setContent("");
      console.log("Yorum eklendi:", response.data);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <h3>Yorumlar</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Yorumunuzu yazın"
        />
        <button type="submit">Gönder</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.commentId}>
            <p>{comment.content}</p>
            
            <p>
              Yazan: {comment.user?.name} - {comment.user.surname}{" "}
            </p>
                <img
                  src={`${urlApi}/${comment.user.profileImage}`}
                  alt="Profile"
                  width="100"
                />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Comments);