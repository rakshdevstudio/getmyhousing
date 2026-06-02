import React from "react";
import { useNavigate } from "react-router-dom";
import Helmet from "../../functional-component/Helmet"

export const NotFoundPage = () => {
  const naviagate = useNavigate();

  const goToHome = () => {
    naviagate("/");
  };
  return (
    <>
      <Helmet
        title="404 - Page Not Found"
        description="Oops! The page you are looking for does not exist. It might have been moved or deleted. Return to Get My Housing and continue your search."
        keywords="Oops! The page you are looking for does not exist. It might have been moved or deleted. Return to Get My Housing and continue your search."
        canonicalUrl={window.location.href}
        ogTitle="404 - Page Not Found"
        ogDescription="Oops! The page you are looking for does not exist. It might have been moved or deleted. Return to Get My Housing and continue your search."
        twitterTitle="404 - Page Not Found"
        twitterDescription="Oops! The page you are looking for does not exist. It might have been moved or deleted. Return to Get My Housing and continue your search."
      />
      <div style={styles.body}>
        <div style={styles.container}>
          <h1 style={styles.header}>404</h1>
          <p style={styles.paragraph}>
            Oops! The page you are looking for cannot be found.
          </p>
          <button style={styles.button} onClick={goToHome}>
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
};

const styles = {
  body: {
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#000", // Black background
    color: "#fff", // White text
    fontFamily: "Arial, sans-serif",
  },
  container: {
    textAlign: "center",
    padding: "20px",
    border: "2px solid #fff",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Slightly transparent white
  },
  header: {
    fontSize: "3rem",
    margin: 0,
  },
  paragraph: {
    fontSize: "1.2rem",
    margin: "20px 0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#e74c3c", // Red background
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.3s",
  },
};
