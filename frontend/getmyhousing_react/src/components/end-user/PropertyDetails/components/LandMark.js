import { useState } from "react";
import { Box, styled, useMediaQuery } from "@mui/material";

const Landmarks = ({ propertyData }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const initialValue = propertyData.landMarks?.hospitalDistance
    ? "Hospital"
    : propertyData.landMarks?.airportDistance
    ? "Airport"
    : propertyData.landMarks?.railwayStationDistance
    ? "Railway Station"
    : propertyData.landMarks?.atmDistance
    ? "ATM"
    : propertyData.landMarks?.shoppingMallDistance
    ? "Shopping Mall"
    : propertyData.landMarks?.bankDistance
    ? "Bank"
    : propertyData.landMarks?.busStopDistance
    ? "Bus Stop"
    : propertyData.landMarks?.metroStationDistance
    ? "Metro Station"
    : propertyData.landMarks?.schoolDistance
    ? "School"
    : null;
  const [activeLankMark, setActiveLankMark] = useState(initialValue);
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gridColumnGap: "10px", // Column gap of 10 pixels
            gridRowGap: "10px", // Row gap of 10 pixels
          }}
        >
          {propertyData.landMarks?.hospitalDistance && (
            <Box
              sx={{
                py: "10px",
                px: "15px",
                border: "1px solid #000",
                borderRadius: "35px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: activeLankMark === "Hospital" ? "#000" : null,
                color: activeLankMark === "Hospital" ? "#fff" : null,
              }}
              onClick={() => setActiveLankMark("Hospital")}
            >
              Hospital
            </Box>
          )}
          {propertyData.landMarks?.airportDistance && (
            <Box
              sx={{
                py: "10px",
                px: "15px",
                border: "1px solid #000",
                borderRadius: "35px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: activeLankMark === "Airport" ? "#000" : null,
                color: activeLankMark === "Airport" ? "#fff" : null,
              }}
              onClick={() => setActiveLankMark("Airport")}
            >
              Airport
            </Box>
          )}
          {propertyData.landMarks?.railwayStationDistance && (
            <Box
              sx={{
                py: "10px",
                px: "15px",
                border: "1px solid #000",
                borderRadius: "35px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  activeLankMark === "Railway Station" ? "#000" : null,
                color: activeLankMark === "Railway Station" ? "#fff" : null,
              }}
              onClick={() => setActiveLankMark("Railway Station")}
            >
              Railway Station
            </Box>
          )}
          {propertyData.landMarks?.atmDistance && (
            <Box
              sx={{
                py: "10px",
                px: "15px",
                border: "1px solid #000",
                borderRadius: "35px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: activeLankMark === "ATM" ? "#000" : null,
                color: activeLankMark === "ATM" ? "#fff" : null,
              }}
              onClick={() => setActiveLankMark("ATM")}
            >
              ATM
            </Box>
          )}

          {propertyData.landMarks?.shoppingMallDistance && (
            <Box
              sx={{
                py: "10px",
                px: "15px",
                border: "1px solid #000",
                borderRadius: "35px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  activeLankMark === "Shopping Mall" ? "#000" : null,
                color: activeLankMark === "Shopping Mall" ? "#fff" : null,
              }}
              onClick={() => setActiveLankMark("Shopping Mall")}
            >
              Shopping Mall
            </Box>
          )}

          {propertyData.landMarks?.bankDistance && (
            <Box
              sx={{
                py: "10px",
                px: "15px",
                border: "1px solid #000",
                borderRadius: "35px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: activeLankMark === "Bank" ? "#000" : null,
                color: activeLankMark === "Bank" ? "#fff" : null,
              }}
              onClick={() => setActiveLankMark("Bank")}
            >
              Bank
            </Box>
          )}

          {propertyData.landMarks?.busStopDistance && (
            <Box
              sx={{
                py: "10px",
                px: "15px",
                border: "1px solid #000",
                borderRadius: "35px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: activeLankMark === "Bus Stop" ? "#000" : null,
                color: activeLankMark === "Bus Stop" ? "#fff" : null,
              }}
              onClick={() => setActiveLankMark("Bus Stop")}
            >
              Bus Stop
            </Box>
          )}

          {propertyData.landMarks?.metroStationDistance && (
            <Box
              sx={{
                py: "10px",
                px: "15px",
                border: "1px solid #000",
                borderRadius: "35px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  activeLankMark === "Metro Station" ? "#000" : null,
                color: activeLankMark === "Metro Station" ? "#fff" : null,
              }}
              onClick={() => setActiveLankMark("Metro Station")}
            >
              Metro Station
            </Box>
          )}

          {propertyData.landMarks?.schoolDistance && (
            <Box
              sx={{
                py: "10px",
                px: "15px",
                border: "1px solid #000",
                borderRadius: "35px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: activeLankMark === "School" ? "#000" : null,
                color: activeLankMark === "School" ? "#fff" : null,
              }}
              onClick={() => setActiveLankMark("School")}
            >
              School
            </Box>
          )}
        </Box>
        {activeLankMark && (
          <Box sx={{ textAlign: "center", mt: { xs: 2 } }}>
            <Box
              sx={{
                border: "1px solid #000",
                display: "inline-block",
                px: 2,
                py: 1,
                borderRadius: "5px",
              }}
            >
              <>
                {activeLankMark === "Hospital" && (
                  <>
                    {propertyData.landMarks.hospitalDistance}{" "}
                    {propertyData.landMarks.hospitalDistanceType}
                  </>
                )}
                {activeLankMark === "Airport" && (
                  <>
                    {propertyData.landMarks.airportDistance}{" "}
                    {propertyData.landMarks.airportDistanceType}
                  </>
                )}
                {activeLankMark === "Railway Station" && (
                  <>
                    {propertyData.landMarks.railwayStationDistance}{" "}
                    {propertyData.landMarks.railwayStationDistanceType}
                  </>
                )}
                {activeLankMark === "ATM" && (
                  <>
                    {propertyData.landMarks.atmDistance}{" "}
                    {propertyData.landMarks.atmDistanceType}
                  </>
                )}
                {activeLankMark === "Shopping Mall" && (
                  <>
                    {propertyData.landMarks.shoppingMallDistance}{" "}
                    {propertyData.landMarks.shoppingMallDistanceType}
                  </>
                )}
                {activeLankMark === "Bank" && (
                  <>
                    {propertyData.landMarks.bankDistance}{" "}
                    {propertyData.landMarks.bankDistanceType}
                  </>
                )}
                {activeLankMark === "Bus Stop" && (
                  <>
                    {propertyData.landMarks.busStopDistance}{" "}
                    {propertyData.landMarks.busStopDistanceType}
                  </>
                )}
                {activeLankMark === "Metro Station" && (
                  <>
                    {propertyData.landMarks.metroStationDistance}{" "}
                    {propertyData.landMarks.metroStationDistanceType}
                  </>
                )}
                {activeLankMark === "School" && (
                  <>
                    {propertyData.landMarks.schoolDistance}{" "}
                    {propertyData.landMarks.schoolDistanceType}
                  </>
                )}
              </>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Landmarks;
