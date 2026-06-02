import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Celebration } from "./Celebration";

export const WelcomePage = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: "url(/media/images/welcome.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Confetti effect */}
      <Celebration />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Get My Housing
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Thank you for registering!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff0000",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#cc0000",
              },
            }}
            href="/post-property"
          >
            Post Property
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff0000",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#cc0000",
              },
            }}
            href="/"
          >
            Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
