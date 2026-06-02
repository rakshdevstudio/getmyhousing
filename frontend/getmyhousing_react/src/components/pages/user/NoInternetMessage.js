import React, { useEffect, useState } from "react";
const NoInternetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="48"
    height="48"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 14h-3v-3h3v3zm0-5h-3V7h3v4z" />
  </svg>
);

const NoInternetMessage = () => (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      zIndex: "9999",
      textAlign: "center",
    }}
  >
    <NoInternetIcon />
    <p style={{ marginTop: "10px" }}>
      Please check your internet connection and try again.
    </p>
  </div>
);

export const NetworkStatusCheck = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {!isOnline && <NoInternetMessage />}
      {isOnline && children}
    </>
  );
};
