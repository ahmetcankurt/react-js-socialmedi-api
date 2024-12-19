import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserSocket from "../socket/UserSocket";
import axios from "axios";
import urlApi from "../config";
import "./ProfilImage.css";

function ProfilImage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const users = useUserSocket();

  useEffect(() => {
    const updatedUser = users.find((user) => user.userId === parseInt(userId));
    if (updatedUser) {
      setUser(updatedUser);
    }
  }, [users, userId]);

  useEffect(() => {
    axios
      .get(`${urlApi}/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Kullanıcı verilerini alma hatası:", error);
      });
  }, [userId]);
  return (
    <div className="profile-container ">
      <img
        className="full-width-image  mb-2 rounded"
        src="https://via.placeholder.com/150"
        alt="Profile"
        width="100"
      />
      {/* Orta kısmın en altında olacak resim */}
      <img
        className="center-bottom-image"
        src={`${urlApi}/${user?.profileImage}`}
        alt="Centered"
      />
    </div>
  );
}

export default memo(ProfilImage);
