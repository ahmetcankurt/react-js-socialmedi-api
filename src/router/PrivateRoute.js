import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import urlApi from '../config';
import Loading from '../components/Loading';

// Token doğrulama fonksiyonu
const checkTokenValidity = async (token) => {
  try {
    const response = await fetch(`${urlApi}/api/verify-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Token geçersiz');
    }

    const data = await response.json();
    return data.isValid; // API'den token geçerliliğini al
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return false;
  }
};

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Başlangıçta null, doğrulama süreci bekleniyor

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Token'ı doğrula
      checkTokenValidity(token).then(isValid => {
        setIsAuthenticated(isValid); // Doğrulama sonucu
      });
    } else {
      setIsAuthenticated(false); // Token yoksa doğrulama başarısız
    }
  }, []);

  // Yönlendirme, doğrulama sonucu
  if (isAuthenticated === null) {
    return <Loading/> // Doğrulama devam ediyorsa, yükleniyor mesajı
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
