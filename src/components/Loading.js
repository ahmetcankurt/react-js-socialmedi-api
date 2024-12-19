import React, { memo } from "react";
import "./Loading.css"; // CSS dosyasını import ediyoruz.

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default memo(Loading)
