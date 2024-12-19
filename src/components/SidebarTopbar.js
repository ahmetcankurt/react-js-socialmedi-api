import React, { useState, useEffect, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUser, FaBell, FaSignOutAlt } from "react-icons/fa";
import "./SidebarTopbar.css";

function SidebarTopbar({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState(""); // Kullanıcı adını tutan state
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // localStorage'dan username'i çek
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUserId(storedUserId);
    }
  }, []);

  // Sayfa her değiştiğinde kaydırmayı en üste al
  useEffect(() => {
    window.scrollTo(0, 0); // Sayfa yüklendiğinde en üst konuma gel
  }, [navigate]); // navigate bağımlılığı ile her sayfa geçişinde tetiklenir

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Çıkış yapma işlemi
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setUsername(""); // State'i sıfırla
    navigate("/login"); // Giriş sayfasına yönlendir
  };

  return (
    <div className="sidebar-topbar-container">
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span>
            {username ? <span>Hoşgeldin, {username}!</span> : <span>Hoşgeldin!</span>}
          </span>
          <span onClick={toggleSidebar}>
            {/* {isOpen ? <FaTimes className="sidebar-icon" /> : <FaBars className="sidebar-icon" />} */}
          </span>
        </div>

        <div className="sidebar-content">
          <Link to="/" className="menu-item">
            <FaHome className="menu-icon" />
            <span>Anasayfa</span>
          </Link>

          {/* Profil Linkini Dinamik Hale Getir */}
          <Link to={`/profile/${userId}`} className="menu-item">
            <FaUser className="menu-icon" />
            <span>Profil</span>
          </Link>

          <Link to="/" className="menu-item">
            <FaBell className="menu-icon" />
            <span>Bildirimler</span>
          </Link>

          <div onClick={handleLogout} className="menu-item" style={{ cursor: "pointer" }}>
            <FaSignOutAlt className="menu-icon" />
            <span>Çıkış Yap</span>
          </div>
        </div>
      </div>

      <div className={`main-content ${isOpen ? "expanded" : "collapsed"}`}>
        <div className="editor-content">{children}</div>
      </div>
    </div>
  );
}

export default memo(SidebarTopbar)
