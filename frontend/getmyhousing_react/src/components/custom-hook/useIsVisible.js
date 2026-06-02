import React, { useEffect, useState } from "react";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.8, // 80% of element visible
};

export const useIsVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  const setIsVisibleCallBack = ([entry]) => {
    if (entry.isIntersecting) setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(setIsVisibleCallBack, options);
    if (targetRef.current) {
      observer.observe(target.current);
    }

    // Clean up the observer
    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, []);

  return isVisible;
};
