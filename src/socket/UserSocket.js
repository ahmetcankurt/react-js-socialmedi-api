import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import urlApi from '../config';


const socket = io(urlApi);

const useUserSocket = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleUserAdded = (newUser) => {
      setUsers(prevUsers => [...prevUsers, newUser]);
    };

    const handleUserDeleted = ({ userId }) => {
      setUsers(prevUsers => prevUsers.filter((user) => user.userId !== parseInt(userId)));
    };

    const handleUserUpdated = (updatedUser) => {
      setUsers(prevUsers => prevUsers.map(user => user.userId === updatedUser.userId ? updatedUser : user));
    };

    socket.on('userAdded', handleUserAdded);
    socket.on('userDeleted', handleUserDeleted);
    socket.on('userUpdated', handleUserUpdated); // Kullanıcı güncellendiğinde güncelleme işlemi

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${urlApi}/users`, { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.error('Sunucudan kullanıcı verilerini alma hatası:', error);
      }
    };

    fetchUsers();

    return () => {
      socket.off('userAdded', handleUserAdded);
      socket.off('userDeleted', handleUserDeleted);
      socket.off('userUpdated', handleUserUpdated);
    };
  }, []);

  return users;
};

export default useUserSocket;
