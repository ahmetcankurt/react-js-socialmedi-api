import React from "react";

function PostUpdate({ selectedPost, setSelectedPost, updatePost ,closeModal , handleUpdate }) {
  return (
    <div>
      {selectedPost && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Edit</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={selectedPost.title}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, title: e.target.value })
                }
              />
              <br />
              <textarea
                value={selectedPost.content}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, content: e.target.value })
                }
              ></textarea>
              <br />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedPost({
                    ...selectedPost,
                    image: e.target.files[0],
                  })
                }
              />
              <br />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostUpdate;
