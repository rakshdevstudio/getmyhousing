import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const FurnishingStatus = ({ propertyData }) => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 2,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridColumnGap: "10px", // Column gap of 10 pixels
          gridRowGap: "10px", // Row gap of 10 pixels
        }}
        id="furnishing"
      >
        {propertyData.furnishingStatus.wardrobeAvailable !== "No" &&
          propertyData.furnishingStatus.wardrobeAvailable !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Wardrobe - {propertyData.furnishingStatus.wardrobeCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.airConditionAvailable !== "No" &&
          propertyData.furnishingStatus.airConditionAvailable !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Air Condition -{" "}
                {propertyData.furnishingStatus.airConditionCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.bedsAvailable !== "No" &&
          propertyData.furnishingStatus.bedsAvailable !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Beds - {propertyData.furnishingStatus.bedsCount}
              </Typography>
            </Box>
          )}

        {propertyData.furnishingStatus.ledLightsAvailable !== "No" &&
          propertyData.furnishingStatus.ledLightsAvailable !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                LED Light - {propertyData.furnishingStatus.ledLightsCount}
              </Typography>
            </Box>
          )}

        {propertyData.furnishingStatus.sofaAvailable !== "No" &&
          propertyData.furnishingStatus.sofaAvailable !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Sofa - {propertyData.furnishingStatus.sofaCount}
              </Typography>
            </Box>
          )}

        {propertyData.furnishingStatus.refrigeratorAvailable !== "No" &&
          propertyData.furnishingStatus.refrigeratorAvailable !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Refrigerator - {propertyData.furnishingStatus.refrigeratorCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.gasConnectionAvailable !== "No" &&
          propertyData.furnishingStatus.gasConnectionAvailable !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Gas Connection -{" "}
                {propertyData.furnishingStatus.gasConnectionCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.washingMachineAvailable !== "No" &&
          propertyData.furnishingStatus.washingMachineAvailable !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Washing Machine -{" "}
                {propertyData.furnishingStatus.washingMachineCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.tvAvailable !== "No" &&
          propertyData.furnishingStatus.tvAvailable !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                TV - {propertyData.furnishingStatus.tvCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.officeTables !== "No" &&
          propertyData.furnishingStatus.officeTables !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Office Tables -{" "}
                {propertyData.furnishingStatus.officeTablesCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.waterPurifier !== "No" &&
          propertyData.furnishingStatus.waterPurifier !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Water Purifier -{" "}
                {propertyData.furnishingStatus.waterPurifierCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.fan !== "No" &&
          propertyData.furnishingStatus.fan !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Fan - {propertyData.furnishingStatus.fanCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.exhaust !== "No" &&
          propertyData.furnishingStatus.exhaust !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Exhaust Fan - {propertyData.furnishingStatus.exhaustCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.stove !== "No" &&
          propertyData.furnishingStatus.stove !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Stove - {propertyData.furnishingStatus.stoveCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.curtains !== "No" &&
          propertyData.furnishingStatus.curtains !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Curtains - {propertyData.furnishingStatus.curtainsCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.chimney !== "No" &&
          propertyData.furnishingStatus.chimney !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Chimney - {propertyData.furnishingStatus.chimneyCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.microwave !== "No" &&
          propertyData.furnishingStatus.microwave !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Micro Wave - {propertyData.furnishingStatus.microwaveCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.chairs !== "No" &&
          propertyData.furnishingStatus.chairs !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Chairs - {propertyData.furnishingStatus.chairsCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.meetingRooms !== "No" &&
          propertyData.furnishingStatus.meetingRooms !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Meeting Rooms -{" "}
                {propertyData.furnishingStatus.meetingRoomsCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.conferenceRooms !== "No" &&
          propertyData.furnishingStatus.conferenceRooms !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Conference Rooms -{" "}
                {propertyData.furnishingStatus.conferenceRoomsCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.medicalKits !== "No" &&
          propertyData.furnishingStatus.medicalKits !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Medical Kits - {propertyData.furnishingStatus.medicalKitsCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.recreationalFacility !== "No" &&
          propertyData.furnishingStatus.recreationalFacility !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Re-Creational Facility -{" "}
                {propertyData.furnishingStatus.recreationalFacilityCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.printingMachines !== "No" &&
          propertyData.furnishingStatus.printingMachines !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Printing Machine -{" "}
                {propertyData.furnishingStatus.printingMachinesCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.coffeeMachines !== "No" &&
          propertyData.furnishingStatus.coffeeMachines !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Coffee Machine -{" "}
                {propertyData.furnishingStatus.coffeeMachinesCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.smartBoard !== "No" &&
          propertyData.furnishingStatus.smartBoard !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Smart Board - {propertyData.furnishingStatus.smartBoardCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.projectors !== "No" &&
          propertyData.furnishingStatus.projectors !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Projectors - {propertyData.furnishingStatus.projectorsCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.diningTables !== "No" &&
          propertyData.furnishingStatus.diningTables !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Dining Tables -{" "}
                {propertyData.furnishingStatus.diningTablesCount}
              </Typography>
            </Box>
          )}
        {propertyData.furnishingStatus.modularKitchen !== "No" &&
          propertyData.furnishingStatus.modularKitchen !== null && (
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Modular Kitchen -{" "}
                {propertyData.furnishingStatus.modularKitchenCount}
              </Typography>
            </Box>
          )}
      </Paper>
    </>
  );
};

export default FurnishingStatus;
