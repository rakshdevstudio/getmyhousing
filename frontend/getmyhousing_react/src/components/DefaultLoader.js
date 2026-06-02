import { Box, CircularProgress } from "@mui/material";
import React from "react";

const DefaultLoader = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "trasnslate(-50%, -50%)",
      }}
    >
      <CircularProgress sx={{ color: "black" }} />
    </Box>
  );
};

export default DefaultLoader;
