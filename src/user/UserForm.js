import React, { memo, useState } from 'react';
import axios from 'axios';
import urlApi from '../config';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    weburl: '',
    coverImage: '',
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataWithImage.append(key, formData[key]);
      });
      formDataWithImage.append('profileImage', profileImage);

      const response = await axios.post(`${urlApi}/users`, formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    } catch (error) {
      console.error('Form gönderilirken hata oluştu:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
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
        <label>Cover Image:</label>
        <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} />
      </div>
      <div>
        <label>Profile Image:</label>
        <input type="file" name="profileImage" onChange={handleImageChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default memo(UserForm);
