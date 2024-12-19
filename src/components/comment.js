import { useState, useEffect, memo, useCallback, useMemo } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import urlApi from "../config";

// Socket.IO sunucusuna bağlanma
const socket = io(urlApi);

function Comments({ postId }) {
  const usersID = localStorage.getItem("userId");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${urlApi}/comments/${postId}`)
      .then((response) => setComments(response.data))
      .catch((error) => setError("Yorumları getirirken bir hata oluştu."));
  }, [postId]);

  const handleAddComment = useCallback(() => {
    axios
      .post(`${urlApi}/comments/${postId}`, {
        content: newComment,
        userId: parseInt(usersID),
        postId: postId,
      })
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment("");
      })
      .catch((error) => setError("Yorum eklenirken bir hata oluştu."));
  }, [newComment, postId, usersID]);

  return (
    <div>
      <h2>Yorumlar</h2>
      {error && <div>{error}</div>}
      <div className="shadow-md bg-white rounded ">
        <textarea
          type="text"
          className="rounded bg-white p-2 me-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Yorum ekleyin"
          style={{ width: "100%" }}
        />
        <div>
          <Button className="my-2 rounded" onClick={handleAddComment}>
            Yorum Ekle
          </Button>
        </div>
      </div>
      <div>
        {comments.map((comment) => (
          <Comment key={comment.commentId} comment={comment} postId={postId} />
        ))}
      </div>
    </div>
  );
}

export default memo(Comments);

const Comment = memo(
  ({
    comment,
    editingCommentId,
    setEditingCommentId,
    editingContent,
    setEditingContent,
    handleUpdateComment,
    handleCancelEdit,
    handleDeleteComment,
  }) => {
    console.log("Comment rendered");
    return (
      <Card className="shadow my-3 bg-white rounded">
        <Card.Body>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`${urlApi}/${comment.user.profileImage}`}
              alt="Profil"
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                marginRight: 10,
              }}
            />
            <span>{comment.user.username}</span>
          </div>
          {editingCommentId === comment.commentId ? (
            <div>
              <input
                type="text"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <Button onClick={() => handleUpdateComment(comment.commentId)}>
                Kaydet
              </Button>
              <Button onClick={handleCancelEdit}>İptal</Button>
            </div>
          ) : (
            <div>
              <Card.Text>{comment.content}</Card.Text>
              <Button
                className="me-2"
                onClick={() => setEditingCommentId(comment.commentId)}
              >
                Düzenle
              </Button>
              <Button onClick={() => handleDeleteComment(comment.commentId)}>
                Sil
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
);
