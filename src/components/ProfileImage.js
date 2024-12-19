import React, { memo } from "react";

function ProfileImage({ src, alt, size = 50 }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
        border: "1px solid #ccc",
        borderRadius: "50%",
      }}
      className="me-2 mb-2"
    />
  );
}

export default memo(ProfileImage)
