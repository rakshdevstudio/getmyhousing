import React, { useEffect } from "react";
import "../../../styles/Celebration.css"

export const Celebration = () => {
  useEffect(() => {
    // This effect is currently empty but can be used for additional actions if needed
  }, []);

  const generateConfetti = (num) => {
    return Array.from({ length: num }).map((_, index) => (
      <div
        key={index}
        className="confetti"
        style={{
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 2 + 2}s`, // Randomize the falling speed
          transform: `rotate(${Math.random() * 360}deg)`, // Random rotation
        }}
      />
    ));
  };

  return (
    <div className="confetti-container">
      {generateConfetti(100)} {/* Adjust the number of confetti */}
    </div>
  );
};
