import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const AreaDetails = ({ propertyData }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            {propertyData.propertyAreaDetails?.builtupPlotArea !== "" &&
              propertyData.propertyAreaDetails?.builtupPlotArea !== null && (
                <TableRow>
                  <TableCell>Built Up Area</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.builtupPlotArea}{" "}
                    {propertyData.propertyAreaDetails?.areaUnit}
                  </TableCell>
                </TableRow>
              )}
          </TableHead>
          <TableBody>
            {propertyData.propertyAreaDetails?.carpetArea !== "" &&
              propertyData.propertyAreaDetails?.carpetArea !== null && (
                <TableRow>
                  <TableCell>Carpet Area</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.carpetArea}{" "}
                    {propertyData.propertyAreaDetails?.areaUnit}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.superBuiltupArea !== "" &&
              propertyData.propertyAreaDetails?.superBuiltupArea !== null && (
                <TableRow>
                  <TableCell>Super Built Up Area</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.superBuiltupArea}{" "}
                    {propertyData.propertyAreaDetails?.areaUnit}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.salableArea !== "" &&
              propertyData.propertyAreaDetails?.salableArea !== null && (
                <TableRow>
                  <TableCell>Salable Area</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.salableArea}{" "}
                    {propertyData.propertyAreaDetails?.areaUnit}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.plotArea !== "" &&
              propertyData.propertyAreaDetails?.plotArea !== null && (
                <TableRow>
                  <TableCell>Plot Area</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.plotArea}{" "}
                    {propertyData.propertyAreaDetails?.areaUnit}
                  </TableCell>
                </TableRow>
              )}

            {propertyData.propertyAreaDetails?.privatePoolAvailability !== "" &&
              propertyData.propertyAreaDetails?.privatePoolAvailability !==
                null && (
                <TableRow>
                  <TableCell>Private Pool Availability</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.privatePoolAvailability}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.privateGardenAvailability !==
              "" &&
              propertyData.propertyAreaDetails?.privateGardenAvailability !==
                null && (
                <TableRow>
                  <TableCell>Private Garden Availability</TableCell>
                  <TableCell>
                    {
                      propertyData.propertyAreaDetails
                        ?.privateGardenAvailability
                    }
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.privateGardenArea !== "" &&
              propertyData.propertyAreaDetails?.privateGardenArea !== null && (
                <TableRow>
                  <TableCell>Private Garden Availability</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.privateGardenArea +
                      " Sq.ft"}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.noOfBedrooms !== "" &&
              propertyData.propertyAreaDetails?.noOfBedrooms !== null && (
                <TableRow>
                  <TableCell>Bed Room</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.noOfBedrooms}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.noOfBathrooms !== "" &&
              propertyData.propertyAreaDetails?.noOfBathrooms !== null && (
                <TableRow>
                  <TableCell>Bath Room</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.noOfBathrooms}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.noOfBalconies !== "" &&
              propertyData.propertyAreaDetails?.noOfBalconies !== null && (
                <TableRow>
                  <TableCell>Balconey</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.noOfBalconies}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.additionalRooms !== "" &&
              propertyData.propertyAreaDetails?.additionalRooms !== null && (
                <TableRow>
                  <TableCell>Additional Room</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.additionalRooms}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.floorNo !== "" &&
              propertyData.propertyAreaDetails?.floorNo !== null && (
                <TableRow>
                  <TableCell>Floor Number</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.floorNo}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.towerBlockNo !== "" &&
              propertyData.propertyAreaDetails?.towerBlockNo !== null && (
                <TableRow>
                  <TableCell>Tower/Block Number</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.towerBlockNo}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.flatNo !== "" &&
              propertyData.propertyAreaDetails?.flatNo !== null &&
              propertyData.propertyAreaDetails?.keepItPrivate !== "No" && (
                <TableRow>
                  <TableCell>Flat Number</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.flatNo}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.propertyLevel !== "" &&
              propertyData.propertyAreaDetails?.propertyLevel !== null && (
                <TableRow>
                  <TableCell>Property Level</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.propertyLevel}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.cornerFlat !== "" &&
              propertyData.propertyAreaDetails?.cornerFlat !== null && (
                <TableRow>
                  <TableCell>Corner Flat</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.cornerFlat}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.terraceAreaFlag !== "" &&
              propertyData.propertyAreaDetails?.terraceAreaFlag !== null && (
                <TableRow>
                  <TableCell>Terrace Area Availability</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.terraceAreaFlag}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.terraceArea !== "" &&
              propertyData.propertyAreaDetails?.terraceArea !== null && (
                <TableRow>
                  <TableCell>Terrace Area</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.terraceArea}{" "}
                    {
                      propertyData.propertyAreaDetails
                        ?.terraterraceAreaUnitceArea
                    }
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.totalFloors !== "" &&
              propertyData.propertyAreaDetails?.totalFloors !== null && (
                <TableRow>
                  <TableCell>Total Floors</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.totalFloors}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.openSides !== "" &&
              propertyData.propertyAreaDetails?.openSides !== null && (
                <TableRow>
                  <TableCell>Open Sides</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.openSides}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.facing !== "" &&
              propertyData.propertyAreaDetails?.facing !== null && (
                <TableRow>
                  <TableCell>Facing</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.facing}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.occupancyType !== "" &&
              propertyData.propertyAreaDetails?.occupancyType !== null && (
                <TableRow>
                  <TableCell>Occupancy Type</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.occupancyType}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.occupancyCertificate !== "" &&
              propertyData.propertyAreaDetails?.occupancyCertificate !==
                null && (
                <TableRow>
                  <TableCell>Occupancy Certificate</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.occupancyCertificate}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.privateWashroom !== "" &&
              propertyData.propertyAreaDetails?.privateWashroom !== null && (
                <TableRow>
                  <TableCell>Private Washroom</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.privateWashroom}{" "}
                    {"(" +
                      propertyData.propertyAreaDetails?.privateWashroomCount +
                      ")"}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.privateWashroom !== "" &&
              propertyData.propertyAreaDetails?.privateWashroom !== null && (
                <TableRow>
                  <TableCell>Public Washroom</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.publicWashroom}{" "}
                    {"(" +
                      propertyData.propertyAreaDetails?.publicWashroomCount +
                      ")"}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.gardenArea !== "" &&
              propertyData.propertyAreaDetails?.gardenArea !== null && (
                <TableRow>
                  <TableCell>Garden Area</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.gardenArea + " Sq.ft"}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.pantry !== "" &&
              propertyData.propertyAreaDetails?.pantry !== null && (
                <TableRow>
                  <TableCell>Pantry Availability</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.pantry}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.buildingStatus !== "" &&
              propertyData.propertyAreaDetails?.buildingStatus !== null && (
                <TableRow>
                  <TableCell>building Status</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.buildingStatus}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.breadthFeet !== "" &&
              propertyData.propertyAreaDetails?.breadthFeet !== null && (
                <TableRow>
                  <TableCell>Breadth Feet</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.breadthFeet}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.lengthFeet !== "" &&
              propertyData.propertyAreaDetails?.lengthFeet !== null && (
                <TableRow>
                  <TableCell>Length Feet</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.lengthFeet}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.compoundWallMade !== "" &&
              propertyData.propertyAreaDetails?.compoundWallMade !== null && (
                <TableRow>
                  <TableCell>Compound Wall Made</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.compoundWallMade}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.propertyAreaDetails?.compoundWallMade !== "" &&
              propertyData.propertyAreaDetails?.compoundWallMade !== null && (
                <TableRow>
                  <TableCell>Compound Wall Made</TableCell>
                  <TableCell>
                    {propertyData.propertyAreaDetails?.compoundWallMade}
                  </TableCell>
                </TableRow>
              )}
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AreaDetails;
