import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useUserSocket from "../../socket/UserSocket";
import Loading from "../../components/Loading";
import urlApi from "../../config";
import "./userInformation.css"

function UserInformation() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [profileImage, setProfileImage] = useState(null); // Yeni: Profil resmi için state
  const [previewImage, setPreviewImage] = useState(null); // Resim önizleme state'i
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
        setUpdatedUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Kullanıcı verilerini alma hatası:", error);
        setLoading(false);
      });
  }, [userId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file); // Seçilen dosyayı state'e kaydet
    setPreviewImage(URL.createObjectURL(file)); // Resmin önizlemesini oluştur
  };

  const handleSave = () => {
    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append('username', updatedUser.username);
    formData.append('name', updatedUser.name);
    formData.append('surname', updatedUser.surname);
    formData.append('email', updatedUser.email);
    formData.append('phone', updatedUser.phone);
    formData.append('weburl', updatedUser.weburl);
    if (profileImage) {
      formData.append('profileImage', profileImage); // Profil resmini form data'ya ekle
    }

    axios
      .put(`${urlApi}/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // FormData kullanıldığı için bu header gereklidir
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Kullanıcı güncellenirken hata:", error);
      });
  };

  if (loading) {
    return <Loading />
  }
 
  if (!user) {
    return <div>Kullanıcı bulunamadı.</div>;
  }

  return (
    <>
      <div className="row p-5">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              <img
                className="img-account-profile rounded-circle mb-2"
                src={previewImage ? previewImage : `${urlApi}/${user.profileImage}`}
                alt="Profile"
                width="100"
              />
              <input
                type="file"
                onChange={handleImageChange}
                disabled={!editMode} // Yalnızca edit modunda aktif
                className="btn btn-primary d-block w-100"
              />
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Username
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    value={updatedUser.username}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputFirstName">
                      First name
                    </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLastName">
                      Last name
                    </label>
                    <input
                      className="form-control"
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                      name="surname"
                      value={updatedUser.surname}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-12">
                    <label className="small mb-1" htmlFor="inputWebURL">
                      Web URL
                    </label>
                    <input
                      className="form-control"
                      id="inputWebURL"
                      type="text"
                      placeholder="Web URL"
                      name="weburl"
                      value={updatedUser.weburl}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPhone">
                      Phone number
                    </label>
                    <input
                      className="form-control"
                      id="inputPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      name="phone"
                      value={updatedUser.phone}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputBirthday">
                      Birthday
                    </label>
                    <input
                      className="form-control"
                      id="inputBirthday"
                      type="text"
                      name="birthday"
                      placeholder="Enter your birthday"
                      value={updatedUser.birthday || "06/10/1988"}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
                {editMode ? (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSave}
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(UserInformation);
