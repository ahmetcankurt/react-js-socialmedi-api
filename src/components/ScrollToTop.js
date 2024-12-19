import React, { useState, useEffect, memo } from "react";
import { FaArrowUp } from "react-icons/fa"; // Yukarı ok simgesi
import "./ScrollToTop.css";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Sayfa kaydırıldığında görünürlüğü kontrol eden bir işlev
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Sayfanın en üstüne kaydıran işlev
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Yumuşak kaydırma
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp size={20} />
        </div>
      )}
    </div>
  );
}

export default memo(ScrollToTop)
