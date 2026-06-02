import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const TenantDetails = ({ propertyData }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            {propertyData.tenantStatus?.tenantType !== "" &&
              propertyData.tenantStatus?.tenantType !== null && (
                <TableRow>
                  <TableCell>Tenant Type</TableCell>
                  <TableCell>{propertyData.tenantStatus?.tenantType}</TableCell>
                </TableRow>
              )}
          </TableHead>
          <TableBody>
            {propertyData.tenantStatus?.religiousType !== "" &&
              propertyData.tenantStatus?.religiousType !== null && (
                <TableRow>
                  <TableCell>Religious Type</TableCell>
                  <TableCell>
                    {propertyData.tenantStatus?.religiousType}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.tenantStatus?.workPreference !== "" &&
              propertyData.tenantStatus?.workPreference !== null && (
                <TableRow>
                  <TableCell>Work Preference</TableCell>
                  <TableCell>
                    {propertyData.tenantStatus?.workPreference}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.tenantStatus?.petsAllowed !== "" &&
              propertyData.tenantStatus?.petsAllowed !== null && (
                <TableRow>
                  <TableCell>Pets Allowed</TableCell>
                  <TableCell>
                    {propertyData.tenantStatus?.petsAllowed}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.tenantStatus?.foodPreference !== "" &&
              propertyData.tenantStatus?.foodPreference !== null && (
                <TableRow>
                  <TableCell>Food Preference</TableCell>
                  <TableCell>
                    {PriceFormatter(propertyData.tenantStatus?.foodPreference)}
                  </TableCell>
                </TableRow>
              )}
            {propertyData.tenantStatus?.bachelorsAllowed !== "" &&
              propertyData.tenantStatus?.bachelorsAllowed !== null && (
                <TableRow>
                  <TableCell>Bachelors Allowed</TableCell>
                  <TableCell>
                    {propertyData.tenantStatus?.bachelorsAllowed}
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

export default TenantDetails;
