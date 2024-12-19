import React, { memo, useMemo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserSocket from '../socket/UserSocket';
import EditUserModal from './EditUserModal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import  urlApi  from '../config';

const User = memo(({ user, onEdit }) => {
  console.log('User component rendered:', user.userId);
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{user.name} {user.surname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">ID: {user.userId}</Card.Subtitle>
        <Card.Text>
          <strong>Username:</strong> {user.username}<br />
          <strong>Email:</strong> {user.email}<br />
          <strong>Phone:</strong> {user.phone}<br />
          <strong>Web URL:</strong> {user.weburl}
        </Card.Text>
        {user.profileImage && (
          <div>
            <strong>Profile Image:</strong>
            <img src={`${urlApi}/${user.profileImage}`} alt="Profile" width="100" />
          </div>
        )}
        <Link to={`/profile/${user.userId}`} className="btn btn-primary">Go to Profile</Link>
        <Button variant="secondary" onClick={() => onEdit(user)}>Edit</Button>
      </Card.Body>
    </Card>
  );
});

const UserList = () => {
  const users = useUserSocket();
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = useCallback((user) => {
    setEditingUser(user);
  }, []);

  const handleCloseModal = () => {
    setEditingUser(null);
  };

  const handleSave = useCallback(() => {
    handleCloseModal(); // Modalı kapat
    // Diğer kayıt işlemleri burada gerçekleştirilebilir
    // Örneğin, kullanıcının değişikliklerini sunucuya gönderme
  }, []);



  return (
    <div className='d-flex'>
      <h2>User List</h2>
      <div>
        {users.map((user) => (
          <User key={user.userId} user={user} onEdit={handleEdit} />
        ))}
      </div>
      {editingUser && (
        <EditUserModal user={editingUser} onClose={handleCloseModal} onSave={handleSave} />
      )}
    </div>
  );
};

export default memo(UserList);
