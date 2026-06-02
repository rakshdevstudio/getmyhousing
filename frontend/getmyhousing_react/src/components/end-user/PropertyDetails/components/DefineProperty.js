import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const DefineProperty = ({ propertyData }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Box sx={{ p: 2 }}>
        {propertyData.defineProperty?.defineLocation !== "" &&
          propertyData.defineProperty?.defineLocation !== null && (
            <>
              <Typography>Define Location</Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(4, 1fr)",
                  gridColumnGap: "10px", // Column gap of 10 pixels
                  gridRowGap: "10px", // Row gap of 10 pixels
                  mt: 1,
                }}
              >
                {propertyData.defineProperty?.defineLocation
                  .split(", ")
                  ?.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        py: "5px",
                        px: "15px",
                        border: "1px solid #000",
                        borderRadius: "35px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </Box>
                  ))}
              </Box>
            </>
          )}
        {propertyData.defineProperty?.explainingPrice !== "" &&
          propertyData.defineProperty?.explainingPrice !== null && (
            <>
              <Typography sx={{ mt: 2 }}>Explaining Price</Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(4, 1fr)",
                  gridColumnGap: "10px", // Column gap of 10 pixels
                  gridRowGap: "10px", // Row gap of 10 pixels
                  mt: 2,
                }}
              >
                {propertyData.defineProperty?.explainingPrice
                  .split(", ")
                  ?.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        py: "5px",
                        px: "15px",
                        border: "1px solid #000",
                        borderRadius: "35px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </Box>
                  ))}
              </Box>
            </>
          )}
        {propertyData.defineProperty?.explainingProperty !== "" &&
          propertyData.defineProperty?.explainingProperty !== null && (
            <>
              <Typography sx={{ mt: 2 }}>Explaining Property</Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(4, 1fr)",
                  gridColumnGap: "10px", // Column gap of 10 pixels
                  gridRowGap: "10px", // Row gap of 10 pixels
                  mt: 2,
                }}
              >
                {propertyData.defineProperty?.explainingProperty
                  .split(", ")
                  ?.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        py: "5px",
                        px: "15px",
                        border: "1px solid #000",
                        borderRadius: "35px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </Box>
                  ))}
              </Box>
            </>
          )}
        {propertyData.defineProperty?.defineSizeAndStructure !== "" &&
          propertyData.defineProperty?.defineSizeAndStructure !== null && (
            <>
              <Typography sx={{ mt: 2 }}>Define Size And Structure</Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(4, 1fr)",
                  gridColumnGap: "10px", // Column gap of 10 pixels
                  gridRowGap: "10px", // Row gap of 10 pixels
                  mt: 2,
                }}
              >
                {propertyData.defineProperty?.defineSizeAndStructure
                  .split(", ")
                  ?.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        py: "5px",
                        px: "15px",
                        border: "1px solid #000",
                        borderRadius: "35px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </Box>
                  ))}
              </Box>
            </>
          )}
      </Box>
    </>
  );
};

export default DefineProperty;
