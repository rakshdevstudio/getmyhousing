import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const PropertyDetails = ({ propertyData }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          {propertyData.propertyStatus?.positionStatus !== "" &&
            propertyData.propertyStatus?.positionStatus !== null && (
              <TableRow>
                <TableCell>Possession Status</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.positionStatus}
                </TableCell>
              </TableRow>
            )}
        </TableHead>
        <TableBody>
          {propertyData.propertyStatus?.positionStatusType !== "" &&
            propertyData.propertyStatus?.positionStatusType !== null && (
              <TableRow>
                <TableCell>Property Possession Status Type</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.positionStatusType}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.availableFrom !== "" &&
            propertyData.propertyStatus?.availableFrom !== null && (
              <TableRow>
                <TableCell>Available From</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.availableFrom}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.availableFromDate !== "" &&
            propertyData.propertyStatus?.availableFromDate !== null && (
              <TableRow>
                <TableCell>Available From Date</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.availableFromDate}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.ageOfProperty !== "" &&
            propertyData.propertyStatus?.ageOfProperty !== null && (
              <TableRow>
                <TableCell>Age Of Property</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.ageOfProperty}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.ownershipType !== "" &&
            propertyData.propertyStatus?.ownershipType !== null && (
              <TableRow>
                <TableCell>OwnerShip Type</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.ownershipType}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.occupancyDays !== "" &&
            propertyData.propertyStatus?.occupancyDays !== null && (
              <TableRow>
                <TableCell>Occupency Days</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.occupancyDays}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.availableFor !== "" &&
            propertyData.propertyStatus?.availableFor !== null && (
              <TableRow>
                <TableCell>Available For11</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.availableFor}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.aboutPropertySuitableFor !== "" &&
            propertyData.propertyStatus?.aboutPropertySuitableFor !== null && (
              <TableRow>
                <TableCell>Property Suitable For</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.aboutPropertySuitableFor}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.locationHub !== "" &&
            propertyData.propertyStatus?.locationHub !== null && (
              <TableRow>
                <TableCell>Location Hub</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.locationHub}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.entranceWidth !== "" &&
            propertyData.propertyStatus?.entranceWidth !== null && (
              <TableRow>
                <TableCell>Entrance Width</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.entranceWidth}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.heightSealing !== "" &&
            propertyData.propertyStatus?.heightSealing !== null && (
              <TableRow>
                <TableCell>Height Sealing</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.heightSealing}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.locatedNear !== "" &&
            propertyData.propertyStatus?.locatedNear !== null && (
              <TableRow>
                <TableCell>Located Near</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.locatedNear}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.govtApproved !== "" &&
            propertyData.propertyStatus?.govtApproved !== null && (
              <TableRow>
                <TableCell>Government Approved</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.govtApproved}
                </TableCell>
              </TableRow>
            )}
          {propertyData.propertyStatus?.tenantPreLeasedUnit !== "" &&
            propertyData.propertyStatus?.tenantPreLeasedUnit !== null && (
              <TableRow>
                <TableCell>Tenant/Pre-Leased Unit</TableCell>
                <TableCell>
                  {propertyData.propertyStatus?.tenantPreLeasedUnit}
                </TableCell>
              </TableRow>
            )}
          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropertyDetails;
