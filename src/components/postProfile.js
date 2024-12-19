import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router';
import Liked from './liked'; // liked bileşenini import ediyoruz  
import urlApi from '../config';
import Loading from './Loading';

const socket = io(urlApi);

function PostProfile() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`${urlApi}/posts/${userId}/posts`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Veriler getirilirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchUserPosts();

    socket.on('postAdded', handlePostAdded);
    socket.on('postUpdated', handlePostUpdated);
    socket.on('postDeleted', handlePostDeleted);

    return () => {
      socket.off('postAdded', handlePostAdded);
      socket.off('postUpdated', handlePostUpdated);
      socket.off('postDeleted', handlePostDeleted);
    };
  }, [userId]);

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    console.log(newPost);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === updatedPost.postId ? updatedPost : post
      )
    );
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.postId !== deletedPostId)
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: 20, margin: 10 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {posts.map((post) => (
          <div
            key={post.postId}
            style={{
              width: 'calc(33.33% - 10px)', // 3 tane post her satırda olacak
              padding: 10,
              boxSizing: 'border-box',
            }}
          >
            {post.image && (
              <img
                src={`${urlApi}/${post.image}`}
                alt="Post Image"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(PostProfile);
