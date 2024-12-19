import React, { useState } from "react";
import axios from "axios";
import urlApi from "../config";
import { memo } from "react";
import { FaPlus, FaImage } from "react-icons/fa"; // Artı ve Image simgeleri
import "./postCreate.css";

function PostForm() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false); // Formun açılıp kapanmasını kontrol eder

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", image);

      const response = await axios.post(`${urlApi}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Post başarıyla paylaşıldı!");
      setContent("");
      setImage(null);
      setIsFormOpen(false); // Form başarıyla gönderildikten sonra kapatılır
    } catch (error) {
      setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(error);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsFormOpen(!isFormOpen)} // Burada, tıklama ile açma/kapama işlemi yapılır
        className="add-post-button"
      >
        <FaPlus size={30} />
      </div>

      {isFormOpen && (
        <>
          <div className="overlay" onClick={() => setIsFormOpen(false)}></div>
          <div className="post-form">
            <h2 className="text-center">Post Oluştur</h2>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 file-upload-container">
                <label className="form-label">Resim</label>
                <div className="file-input-container">
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">İçerik</label>
                <textarea
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="">
                <button type="submit" className="btn btn-success w-100">
                  Paylaş
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default memo(PostForm);
