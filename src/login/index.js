// Login.js
import React, { memo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import urlApi from "../config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${urlApi}/login`, {
        username,
        password,
      });

      // Save the token and user info to local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.userId);
      localStorage.setItem("username", response.data.user.username);

      // Ensure state is updated before redirecting
      setUsername(response.data.user.username);

      // Redirect to home or some other page
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div className=" rounded-2 p-4 shadow-lg" style={{ width: "350px" }}>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              className="form-control mb-3  "
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Şifre"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success  w-100  p-3">
            Giriş Yap
          </button>
        </form>
        {error && <p>{error}</p>}
        <hr />
        <div className="text-center">
          <button type="submit" className="btn btn-warning  w-75 p-2">
            Yeni Hesap Oluştur
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
