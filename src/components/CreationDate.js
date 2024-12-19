import React, { memo } from 'react';

function CreationDate({ createdAt }) {
  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMs = now - createdDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInMinutes < 60) {
      return `${diffInMinutes}dk`;
    } else if (diffInHours < 24) {
      return `${diffInHours}sa`;
    } else if (diffInDays < 30) {
      return `${diffInDays}g`;
    } else if (diffInDays < 365) {
      return `${diffInMonths}ay`;
    } else {
      return `${diffInYears}y`;
    }
  };

  return (
    <>
      {getTimeDifference(createdAt)}
    </>
  );
}

export default  memo(CreationDate);
