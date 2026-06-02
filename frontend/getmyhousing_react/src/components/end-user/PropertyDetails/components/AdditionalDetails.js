import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const AdditionalDetails = ({ propertyData }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            {propertyData.additionalDetails?.currentlyLeasedOut !== "" &&
              propertyData.additionalDetails?.currentlyLeasedOut !== null && (
                <TableRow>
                  <TableCell>Currently Leased Out</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.currentlyLeasedOut}
                  </TableCell>
                </TableRow>
              )}
          </TableHead>
          <TableBody>
            {propertyData.additionalDetails?.modifyInterior !== "" &&
              propertyData.additionalDetails?.modifyInterior !== null && (
                <TableRow>
                  <TableCell>Modified Interior</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.modifyInterior}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.brandNewInterior !== "" &&
              propertyData.additionalDetails?.brandNewInterior !== null && (
                <TableRow>
                  <TableCell>Brand New Interior</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.brandNewInterior}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.interestedInCoWorking !== "" &&
              propertyData.additionalDetails?.interestedInCoWorking !==
                null && (
                <TableRow>
                  <TableCell>Interested In Co-Living</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.interestedInCoWorking}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.buildingGrade !== "" &&
              propertyData.additionalDetails?.buildingGrade !== null && (
                <TableRow>
                  <TableCell>Building Grade</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.buildingGrade}
                  </TableCell>
                </TableRow>
              )}

            {propertyData.additionalDetails?.cafeteria !== "" &&
              propertyData.additionalDetails?.cafeteria !== null && (
                <TableRow>
                  <TableCell>Cafeteria</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.cafeteria}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.taxGovtCharges !== "" &&
              propertyData.additionalDetails?.taxGovtCharges !== null && (
                <TableRow>
                  <TableCell>Tax and Government Charges</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.taxGovtCharges}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.electricityCharges !== "" &&
              propertyData.additionalDetails?.electricityCharges !== null && (
                <TableRow>
                  <TableCell>Electricity Charges</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.electricityCharges}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.powerInKv !== "" &&
              propertyData.additionalDetails?.powerInKv !== null && (
                <TableRow>
                  <TableCell>Power KV</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.powerInKv}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.liftAvailable !== "" &&
              propertyData.additionalDetails?.liftAvailable !== null && (
                <TableRow>
                  <TableCell>Lift Availability</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.liftAvailable}{" "}
                    {propertyData.additionalDetails?.liftCount !== "" &&
                      propertyData.additionalDetails?.liftCount !== null &&
                      propertyData.additionalDetails?.liftCount}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.flooringLiving !== "" &&
              propertyData.additionalDetails?.flooringLiving !== null && (
                <TableRow>
                  <TableCell>Living Room Floor</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.flooringLiving}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.flooringKitchen !== "" &&
              propertyData.additionalDetails?.flooringKitchen !== null && (
                <TableRow>
                  <TableCell>Kitchen Floor</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.flooringKitchen}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.flooringBedroom !== "" &&
              propertyData.additionalDetails?.flooringBedroom !== null && (
                <TableRow>
                  <TableCell>BedRoom Floor</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.flooringBedroom}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.flooringMasterBedroom !== "" &&
              propertyData.additionalDetails?.flooringMasterBedroom !==
                null && (
                <TableRow>
                  <TableCell>Master BedRoom Floor</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.flooringMasterBedroom}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.flooringBathroom !== "" &&
              propertyData.additionalDetails?.flooringBathroom !== null && (
                <TableRow>
                  <TableCell>BathRoom Floor</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.flooringBathroom}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.flooringBalcony !== "" &&
              propertyData.additionalDetails?.flooringBalcony !== null && (
                <TableRow>
                  <TableCell>Balconey Floor</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.flooringBalcony}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.flooringOther !== "" &&
              propertyData.additionalDetails?.flooringOther !== null && (
                <TableRow>
                  <TableCell>Other Floor</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.flooringOther}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.parking2Wheeler !== "" &&
              propertyData.additionalDetails?.parking2Wheeler !== null &&
              propertyData.additionalDetails?.parking2Wheeler !== "No" && (
                <TableRow>
                  <TableCell>Two Wheeler Parketing</TableCell>
                  <TableCell>
                    Opened - {propertyData.additionalDetails?.parking2OpenCount}
                    <br />
                    Closed -{" "}
                    {propertyData.additionalDetails?.parking2CoverCount}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.parking4Wheeler !== "" &&
              propertyData.additionalDetails?.parking4Wheeler !== null &&
              propertyData.additionalDetails?.parking4Wheeler !== "No" && (
                <TableRow>
                  <TableCell>Four Wheeler Parketing</TableCell>
                  <TableCell>
                    Opened - {propertyData.additionalDetails?.parking4OpenCount}
                    <br />
                    Closed -{" "}
                    {propertyData.additionalDetails?.parking4CoverCount}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.powerBackup !== "" &&
              propertyData.additionalDetails?.powerBackup !== null && (
                <TableRow>
                  <TableCell>Power Backup</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.powerBackup}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.waterSource !== "" &&
              propertyData.additionalDetails?.waterSource !== null && (
                <TableRow>
                  <TableCell>Water Source</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.waterSource}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.overLookingView !== "" &&
              propertyData.additionalDetails?.overLookingView !== null && (
                <TableRow>
                  <TableCell>Over Looking View</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.overLookingView}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.frontRoadWidth !== "" &&
              propertyData.additionalDetails?.frontRoadWidth !== null && (
                <TableRow>
                  <TableCell>Front Road Width</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.frontRoadWidth}{" "}
                    {propertyData.additionalDetails?.frontRoadWidthType}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.additionalDetails?.serviceLiftAvailability !== "" &&
              propertyData.additionalDetails?.serviceLiftAvailability !==
                null &&
              propertyData.additionalDetails?.serviceLiftAvailability !==
                "No" && (
                <TableRow>
                  <TableCell>Service Lift Availability</TableCell>
                  <TableCell>
                    {propertyData.additionalDetails?.serviceLiftAvailability}{" "}
                    {
                      propertyData.additionalDetails
                        ?.serviceLiftAvailabilityCount
                    }
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

export default AdditionalDetails;
