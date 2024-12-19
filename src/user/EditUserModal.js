import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import './EditUserModal.css';
import  urlApi  from '../config';

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(user.profileImage);

  useEffect(() => {
    setFormData(user);
    setPreviewImage(user.profileImage ? `${urlApi}/${user.profileImage}` : '/path/to/placeholder.png');
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('surname', formData.surname);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('weburl', formData.weburl);
    formDataToSend.append('coverImage', formData.coverImage);

    // Eğer yeni bir resim seçilmediyse ve mevcut resim varsa, mevcut resmi formDataToSend içerisine ekleyin
    if (!profileImage && user.profileImage) {
      formDataToSend.append('profileImage', user.profileImage);
    }

    if (profileImage) {
      formDataToSend.append('profileImage', profileImage);
    }

    const token = localStorage.getItem('token'); // Token'ı localStorage'dan al

    try {
      const res = await axios.put(`${urlApi}/users/${user.userId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Token'ı Authorization başlığı altında gönder
        },
      });
      console.log(res.data);
      onSave(); // Kayıt başarılı olduğunda onClose yerine onSave çağrılır
    } catch (error) {
      console.error('Kullanıcı güncellenirken hata:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-fields">
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label>Surname:</label>
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
            </div>
            <div>
              <label>Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div>
              <label>Password:</label>
              <input type="text" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label>Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <label>Web URL:</label>
              <input type="text" name="weburl" value={formData.weburl} onChange={handleChange} />
            </div>
            <div>
              <label>Profile Image:</label>
              <input type="file" name="profileImage" onChange={handleImageChange} />
            </div>
            <button type="submit">Save</button>
          </div>
          {previewImage && (
            <div className="profile-image-preview">
              <img src={previewImage} alt="Profile Preview" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default memo(EditUserModal);
