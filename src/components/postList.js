import { memo, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import urlApi from "../config";
import Liked from "./liked";
import Loading from "./Loading";
import CreationDate from "./CreationDate";
import ProfileImage from "./ProfileImage";
import "./postList.css";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API çağrısını useCallback ile sarmalayarak gereksiz render'ları engelliyoruz
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${urlApi}/posts`);
      setPosts(response.data);
    } catch (err) {
      setError("Veriler getirilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []); // Boş bağımlılık dizisi, sadece component mount olduğunda çalışır

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData fonksiyonuna bağımlıyız

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="post-list-container" style={{ width: "550px" }}>
      {posts.map((post) => (
        <div className="my-4 rounded" key={post.postId}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {post.user.profileImage && (
              <ProfileImage
                src={`${urlApi}/${post.user.profileImage}`}
                alt="Profile Image"
                size={40} // Profil resminin boyutu
              />
            )}
            <Link
              to={`/profile/${post.userId}`}
              className="post-user-link px-2"
            >
              {post.user && post.user.username}
              <span className="gray-text"> • </span>
              <CreationDate createdAt={post.createdAt} />
            </Link>
          </div>

          {post.image && (
            <div className="post-image-container" style={{ height: "650px" }}>
              <img
                src={`${urlApi}/${post.image}`}
                alt="Post Image"
                className="post-image rounded"
              />
            </div>
          )}

          <div className="mt-2 mb-2">
            <Liked postId={post.postId} />
          </div>

          <div className="my-0">
            <Link to={`/profile/${post.userId}`} className="post-user-link">
              <span className="font-weight-bold">
                {post.user && post.user.username}
              </span>
            </Link>
            <span className="gray-text"> • </span>
          <span className="my-0"> {post.content}</span>
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default memo(PostList);
