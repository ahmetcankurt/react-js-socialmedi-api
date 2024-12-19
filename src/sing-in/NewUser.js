  import React, { useState } from 'react';
  import axios from 'axios';

  const Register = () => {
    const [formData, setFormData] = useState({
      name: '',
      surname: '',
      username: '',
      email: '',
      password: '',
      phone: '',
      weburl: '',
      coverImage: '',
      profileImage: null,
    });
    const [error, setError] = useState('');

    // Form verilerini güncelle
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    // Dosya seçimi
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      setFormData({
        ...formData,
        [name]: files[0],
      });
    };

    // Formu gönder
    const handleSubmit = async (e) => {
      e.preventDefault();

      // Formu kontrol et
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      try {
        console.log(formDataToSend)
        const response = await axios.post('http://localhost:3000/users', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Kullanıcı başarıyla kaydedildi:', response.data);
        // Başarı durumunda, yönlendirme veya bildirim ekleyebilirsiniz
      } catch (err) {
        console.error('Kullanıcı kaydı sırasında hata:', err);
        setError('Kullanıcı kaydedilemedi, lütfen tekrar deneyin.');
      }
    };

    return (
      <div>
        <h2>Kullanıcı Kaydı</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Ad:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required   className="form-control" />
          </div>
          <div>
            <label>Soyad:</label>
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} required  className="form-control" />
          </div>
          <div>
            <label>Kullanıcı Adı:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required  className="form-control" />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required   className="form-control"/>
          </div>
          <div>
            <label>Telefon:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required  className="form-control"/>
          </div>
          <div>
            <label>Web URL:</label>
            <input type="text" name="weburl" value={formData.weburl} onChange={handleChange}  className="form-control"/>
          </div>
          <div>
            <label>Şifre:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required  className="form-control" />
          </div>
          <div>
            <label>Kapak Resmi:</label>
            <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange}  className="form-control" />
          </div>
          <div>
            <label>Profil Resmi:</label>
            <input type="file" name="profileImage" onChange={handleFileChange} />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit"  className=" btn btn-success mt-2 w-100">Kaydol</button>
        </form>
      </div>
    );
  };

  export default Register;
