import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PriceFormatter } from "../../../../../common/common";

function PreView({ next, back, formData, detailsId }) {
  return (
    <Box>
      <Typography sx={{ mb: 1, fontSize: 23 }}>
        <b>Property Listing</b>
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          mb: 3,
          boxShadow: "0 0 3px black",
          width: "97%",
          pl: 2,
          pb: 2,
          mt: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>Property Listing Type : </b>
              </span>
              {formData.propertyListingType}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>Building Type : </b>
              </span>
              {formData.buildingType}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>Properties Type : </b>
              </span>
              {formData.propertiesType}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Typography sx={{ mb: 1, fontSize: 23 }}>
        <b>Location Details</b>
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          mb: 3,
          boxShadow: "0 0 3px black",
          width: "97%",
          pl: 2,
          pb: 2,
          mt: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>Country : </b>
              </span>
              {formData.selectedCountry}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>State : </b>
              </span>
              {formData.selectedState}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>District : </b>
              </span>
              {formData.selectedDistrict}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>Locality : </b>
              </span>
              {formData.locality}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>PinCode : </b>
              </span>
              {formData.pinCode}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>Property Adress : </b>
              </span>
              {formData.propertyAdress}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>Land Mark : </b>
              </span>
              {formData.landMark}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span>
                <b>Building Name : </b>
              </span>
              {formData.buildingName}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {formData.propertiesType !== "PG/Co-living" && (
        <>
          <Typography sx={{ mb: 1, fontSize: 23 }}>
            <b>Area Details</b>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mb: 3,
              boxShadow: "0 0 3px black",
              width: "97%",
              pl: 2,
              pb: 2,
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Built Up Area : </b>
                  </span>
                  {formData.builtupArea}
                  <span>
                    {" "}
                    {formData.areaUnit ? formData.areaUnit.label : ""}
                  </span>
                </Typography>
              </Grid>
              {formData.superBuiltupArea && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Super Built Up Area : </b>
                    </span>
                    {formData.superBuiltupArea}
                    <span>
                      {" "}
                      {formData.areaUnit ? formData.areaUnit.label : ""}
                    </span>
                  </Typography>
                </Grid>
              )}
              {formData.carpetArea && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Carpet Area : </b>
                    </span>
                    {formData.carpetArea}
                    <span>
                      {" "}
                      {formData.areaUnit ? formData.areaUnit.label : ""}
                    </span>
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Private Pool Availability : </b>
                  </span>
                  {formData.privatePoolAvailability}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Terrace Area Available : </b>
                  </span>
                  {formData.terraceAreaFlag}
                </Typography>
              </Grid>
              {formData.terraceAreaFlag === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Terrace Area in Sq.ft : </b>
                    </span>
                    {formData.terraceArea}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Private Garden Availability : </b>
                  </span>
                  {formData.privateGardenAvailability}
                </Typography>
              </Grid>
              {formData.privateGardenAvailability === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Private Garden Area : </b>
                    </span>
                    {formData.privateGardenArea}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Number of Bedrooms : </b>
                  </span>
                  {formData.numberOfBedRooms}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Number of Bathrooms : </b>
                  </span>
                  {formData.numberOfBathRooms}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Number of Balconies : </b>
                  </span>
                  {formData.numberOfBalconies}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Additional Rooms : </b>
                  </span>
                  {formData.additionalRooms}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Floor Number : </b>
                  </span>
                  {formData.floorNumber ? formData.floorNumber.label : ""}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Total Floor : </b>
                  </span>
                  {formData.totalFloor ? formData.totalFloor.label : ""}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Tower / Block Number : </b>
                  </span>
                  {formData.towerOrBlockNumber}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Property Level : </b>
                  </span>
                  {formData.propertyLevel}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Corner Flat : </b>
                  </span>
                  {formData.cornerFlat}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Open Sides : </b>
                  </span>
                  {formData.openSides}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Facing : </b>
                  </span>
                  {formData.facing}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      {formData.propertiesType === "PG/Co-living" && (
        <>
          <Typography sx={{ mb: 1, fontSize: 23 }}>
            <b>PG Details</b>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mb: 3,
              boxShadow: "0 0 3px black",
              width: "97%",
              pl: 2,
              pb: 2,
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Number of Beds in PG : </b>
                  </span>
                  {formData.noOfPgBeds}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>PG for : </b>
                  </span>
                  {formData.pgFor}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Best Suited for : </b>
                  </span>
                  {formData.bestSuitedFor}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Meals Avilable : </b>
                  </span>
                  {formData.mealsAvailable}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Notice Period : </b>
                  </span>
                  {formData.noticePeriod}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Lock-In Period : </b>
                  </span>
                  {formData.pgLockInPeriod}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Common Areas : </b>
                  </span>
                  {formData.commonAreas ? formData.commonAreas.join(", ") : ""}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      {formData.buildingType === "Residential" && (
        <>
          <Typography sx={{ mb: 1, fontSize: 23 }}>
            <b>Tenant Status</b>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mb: 3,
              boxShadow: "0 0 3px black",
              width: "97%",
              pl: 2,
              pb: 2,
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Tenant Type : </b>
                  </span>
                  {formData.tenetType ? formData.tenetType.join(", ") : ""}
                </Typography>
              </Grid>
              {formData.tenentBachelorsAllowed && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Bachelores Allowed : </b>
                    </span>
                    {formData.tenentBachelorsAllowed}
                  </Typography>
                </Grid>
              )}
              {formData.tenentSpinstersAllowed && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Sprinters Allowed : </b>
                    </span>
                    {formData.tenentSpinstersAllowed}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Religious Type : </b>
                  </span>
                  {formData.religiousType}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Work Preference : </b>
                  </span>
                  {formData.workPreference}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Pets Allowed : </b>
                  </span>
                  {formData.petsAllowed}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Food Preference : </b>
                  </span>
                  {formData.foodPreference}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {formData.propertiesType !== "PG/Co-living" && (
        <>
          <Typography sx={{ mb: 1, fontSize: 23 }}>
            <b>Property Status</b>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mb: 3,
              boxShadow: "0 0 3px black",
              width: "97%",
              pl: 2,
              pb: 2,
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Available For : </b>
                  </span>
                  {formData.availableFor}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Position Status : </b>
                  </span>
                  {formData.positionStatus}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Available From : </b>
                  </span>
                  {formData.availbleFrom}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Occupancy Days : </b>
                  </span>
                  {formData.occupancyDays}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Age of Property (In Years) : </b>
                  </span>
                  {formData.ageofProperty}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Owenership Type : </b>
                  </span>
                  {formData.owenershipType}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {formData.propertiesType !== "PG/Co-living" && (
        <>
          <Typography sx={{ mb: 1, fontSize: 23 }}>
            <b>Property Rent</b>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mb: 3,
              boxShadow: "0 0 3px black",
              width: "97%",
              pl: 2,
              pb: 2,
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              {formData.rentAmount && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Rent Amount : </b>
                    </span>
                    {PriceFormatter(formData.rentAmount)}
                    <span> {formData.rentType}</span>
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Maintainance Amount : </b>
                  </span>
                  {PriceFormatter(formData.maintenanceAmout)}
                  <span> {formData.maintananceCostType}</span>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Security Deposit : </b>
                  </span>
                  {formData.securityDeposit}
                </Typography>
              </Grid>
              {formData.securityDeposit === "Custom" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Security Deposit Amount : </b>
                    </span>
                    {formData.customSecurityDeposit}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Booking Amount : </b>
                  </span>
                  {PriceFormatter(formData.bookingAmount)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Lock-In Period : </b>
                  </span>
                  {formData.lockInPeriod}
                  <span> {formData.lockInPeriodType}</span>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Rent Increment for Every Year : </b>
                  </span>
                  {formData.rentIncrement}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b> </b>
                  </span>
                  {formData.rentIncrement}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {formData.propertiesType !== "PG/Co-living" && (
        <>
          <Typography sx={{ mb: 1, fontSize: 23 }}>
            <b>Additional Details</b>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mb: 3,
              boxShadow: "0 0 3px black",
              width: "97%",
              pl: 2,
              pb: 2,
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Tax & Govt Charges : </b>
                  </span>
                  {formData.taxCharges}
                  {/* <span> {formData.taxCharges}</span> */}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Maintainance Amount : </b>
                  </span>
                  {formData.maintenanceAmout}
                  <span> {formData.maintananceCostType}</span>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Power in KV : </b>
                  </span>
                  {formData.electricPower}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Lift Availability : </b>
                  </span>
                  {formData.liftAvailability}
                </Typography>
              </Grid>
              {formData.liftAvailability === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Number of Lifts Available : </b>
                    </span>
                    {formData.noOfLifts}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Service Lift Availability : </b>
                  </span>
                  {formData.serviceLiftAvailability}
                </Typography>
              </Grid>
              {formData.serviceLiftAvailability === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Number of Service Lifts Available : </b>
                    </span>
                    {formData.noOfServiceLifts}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Living / Dining Floor: </b>
                  </span>
                  {formData.livingFlooringType}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Kitchen Floor : </b>
                  </span>
                  {formData.kitchenFlooringType}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Bedroom Floor : </b>
                  </span>
                  {formData.bedRoomFlooringType}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Master Bedroom Floor : </b>
                  </span>
                  {formData.MasterBedRoomFlooringType}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Bathroom Floor : </b>
                  </span>
                  {formData.bathRoomFlooringType}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Balcony Floor : </b>
                  </span>
                  {formData.balconyFlooringType}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Other Floor : </b>
                  </span>
                  {formData.otherFlooringType}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>2 Wheeler Parking : </b>
                  </span>
                  {formData.twoWheeler}
                </Typography>
              </Grid>
              {formData.twoWheeler === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>2 Wheeler Covered Type : </b>
                    </span>
                    {formData.twoWheelerClosedType
                      ? formData.twoWheelerClosedType.label
                      : ""}
                  </Typography>
                </Grid>
              )}
              {formData.twoWheeler === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>2 Wheeler Open Type : </b>
                    </span>
                    {formData.twoWheelerOpenType
                      ? formData.twoWheelerOpenType.label
                      : ""}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>4 Wheeler Parking : </b>
                  </span>
                  {formData.fourWheeler}
                </Typography>
              </Grid>
              {formData.fourWheeler === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>4 Wheeler Covered Type : </b>
                    </span>
                    {formData.fourWheelerClosedType
                      ? formData.fourWheelerClosedType.label
                      : ""}
                  </Typography>
                </Grid>
              )}
              {formData.fourWheeler === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>4 Wheeler Open Type : </b>
                    </span>
                    {formData.fourWheelerOpenType
                      ? formData.fourWheelerOpenType.label
                      : ""}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Power Backup : </b>
                  </span>
                  {formData.powerBackUp}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Water Source : </b>
                  </span>
                  {formData.waterSource}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Over Looking View : </b>
                  </span>
                  {formData.overLookingView}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Front Road Width : </b>
                  </span>
                  {formData.roadWidth}
                  <span> {formData.roadWidthUnit}</span>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      {formData.propertiesType === "PG/Co-living" && (
        <>
          <Typography sx={{ mb: 1, fontSize: 23 }}>
            <b>Owner/Care Taker Details</b>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mb: 3,
              boxShadow: "0 0 3px black",
              width: "97%",
              pl: 2,
              pb: 2,
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Property Managed By : </b>
                  </span>
                  {formData.propertyManagedBy}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Property Manager Stays at Property : </b>
                  </span>
                  {formData.propertyManagedStaysAtProperty}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      {formData.propertiesType === "PG/Co-living" && (
        <>
          <Typography sx={{ mb: 1, fontSize: 23 }}>
            <b>PG Rules</b>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mb: 3,
              boxShadow: "0 0 3px black",
              width: "97%",
              pl: 2,
              pb: 2,
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Non-veg Allowed : </b>
                  </span>
                  {formData.nonVeg}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Opposite Sex : </b>
                  </span>
                  {formData.oppSex}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Any Time Allowed : </b>
                  </span>
                  {formData.time}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Visitors Allowed : </b>
                  </span>
                  {formData.visitor}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Guardian Allowed : </b>
                  </span>
                  {formData.guardian}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Drinking Allowed : </b>
                  </span>
                  {formData.drinks}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Smoking Allowed : </b>
                  </span>
                  {formData.smoking}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      {formData.propertiesType === "PG/Co-living" && (
        <>
          <Typography sx={{ mb: 1, fontSize: 23 }}>
            <b>Room Details</b>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mb: 3,
              boxShadow: "0 0 3px black",
              width: "97%",
              pl: 2,
              pb: 2,
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Room Type : </b>
                  </span>
                  {formData.roomType ? formData.roomType.join(", ") : ""}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Total Beds in the Room : </b>
                  </span>
                  {formData.noOfBedsinRoom
                    ? formData.noOfBedsinRoom.join(", ")
                    : ""}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Any Time Allowed : </b>
                  </span>
                  {formData.time}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Rent Amount : </b>
                  </span>
                  {PriceFormatter(formData.pgRentAmount)}
                  <span> {formData.pgRentType}</span>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Security Deposit : </b>
                  </span>
                  {formData.pgSecurityDeposit}
                </Typography>
              </Grid>
              {formData.pgSecurityDeposit === "Custom " && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Security Deposit : </b>
                    </span>
                    {formData.pgCustomSecurityDeposit}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>2 Wheeler Parking : </b>
                  </span>
                  {formData.pgTwoWheeler}
                </Typography>
              </Grid>
              {formData.pgTwoWheeler === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>2 Wheeler Covered Type : </b>
                    </span>
                    {formData.pgTwoWheelerClosedType
                      ? formData.pgTwoWheelerClosedType.label
                      : ""}
                  </Typography>
                </Grid>
              )}
              {formData.pgTwoWheeler === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>2 Wheeler Open Type : </b>
                    </span>
                    {formData.pgTwoWheelerOpenType
                      ? formData.pgTwoWheelerOpenType.label
                      : ""}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>4 Wheeler Parking : </b>
                  </span>
                  {formData.pgFourWheeler}
                </Typography>
              </Grid>
              {formData.pgFourWheeler === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>4 Wheeler Covered Type : </b>
                    </span>
                    {formData.pgFourWheelerClosedType
                      ? formData.pgFourWheelerClosedType.label
                      : ""}
                  </Typography>
                </Grid>
              )}
              {formData.pgFourWheeler === "Yes" && (
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>4 Wheeler Open Type : </b>
                    </span>
                    {formData.pgFourWheelerOpenType
                      ? formData.pgFourWheelerOpenType.label
                      : ""}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography>
                  <span>
                    <b>Facility Offered : </b>
                  </span>
                  {formData.facilityOffered
                    ? formData.facilityOffered.join(", ")
                    : ""}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      <>
        <Typography sx={{ mb: 1, fontSize: 23 }}>
          <b>Furnishing Status</b>
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            mb: 3,
            boxShadow: "0 0 3px black",
            width: "97%",
            pl: 2,
            pb: 2,
            mt: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Furnishing Status Type : </b>
                </span>
                {formData.furnishingStatus}
              </Typography>
            </Grid>
            <Grid container spacing={2} sx={{ ml: 1 }}>
              {formData.wardrobe?.name !== "No" &&
                formData.wardrobe?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Wardrobe - {formData.wardrobe?.count}
                    </Typography>
                  </Box>
                )}
              {formData.ac?.name !== "No" && formData.ac?.name !== null && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    Air Condition - {formData.ac?.count}
                  </Typography>
                </Box>
              )}
              {formData.beds?.name !== "No" && formData.beds?.name !== null && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    Beds - {formData.beds?.count}
                  </Typography>
                </Box>
              )}

              {formData.led?.name !== "No" && formData.led?.name !== null && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    LED Light - {formData.led?.count}
                  </Typography>
                </Box>
              )}

              {formData.sofa?.name !== "No" && formData.sofa?.name !== null && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    Sofa - {formData.sofa?.count}
                  </Typography>
                </Box>
              )}

              {formData.refrigerator?.name !== "No" &&
                formData.refrigerator?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Refrigerator - {formData.refrigerator?.count}
                    </Typography>
                  </Box>
                )}
              {formData.gas?.name !== "No" && formData.gas?.name !== null && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    Gas Connection - {formData.gas?.count}
                  </Typography>
                </Box>
              )}
              {formData.washingMachine?.name !== "No" &&
                formData.washingMachine?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Washing Machine - {formData.washingMachine?.count}
                    </Typography>
                  </Box>
                )}
              {formData.tv?.name !== "No" && formData.tv?.name !== null && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    TV - {formData.tv?.count}
                  </Typography>
                </Box>
              )}
              {formData.officeTables?.name !== "No" &&
                formData.officeTables?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Office Tables - {formData.officeTables?.count}
                    </Typography>
                  </Box>
                )}
              {formData.waterPurifier?.name !== "No" &&
                formData.waterPurifier?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Water Purifier - {formData.waterPurifier?.count}
                    </Typography>
                  </Box>
                )}
              {formData.fan?.name !== "No" && formData.fan?.name !== null && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    Fan - {formData.fan?.count}
                  </Typography>
                </Box>
              )}
              {formData.exhaustFan?.name !== "No" &&
                formData.exhaustFan?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Exhaust Fan - {formData.exhaustFan?.count}
                    </Typography>
                  </Box>
                )}
              {formData.stove?.name !== "No" &&
                formData.stove?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Stove - {formData.stove?.count}
                    </Typography>
                  </Box>
                )}
              {formData.curtains?.name !== "No" &&
                formData.curtains?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Curtains - {formData.curtains?.count}
                    </Typography>
                  </Box>
                )}
              {formData.chimney?.name !== "No" &&
                formData.chimney?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Chimney - {formData.chimney?.count}
                    </Typography>
                  </Box>
                )}
              {formData.microWave?.name !== "No" &&
                formData.microWave?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Micro Wave - {formData.microWave?.count}
                    </Typography>
                  </Box>
                )}
              {formData.chairs?.name !== "No" &&
                formData.chairs?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Chairs - {formData.chairs?.count}
                    </Typography>
                  </Box>
                )}
              {formData.meetingRoom?.name !== "No" &&
                formData.meetingRoom?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Meeting Rooms - {formData.meetingRoom?.count}
                    </Typography>
                  </Box>
                )}
              {formData.confernceRooms?.name !== "No" &&
                formData.confernceRooms?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Conference Rooms - {formData.confernceRooms?.count}
                    </Typography>
                  </Box>
                )}
              {formData.mediclKits?.name !== "No" &&
                formData.mediclKits?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Medical Kits - {formData.mediclKits?.count}
                    </Typography>
                  </Box>
                )}
              {formData.recreational?.name !== "No" &&
                formData.recreational?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Re-Creational Facility - {formData.recreational?.count}
                    </Typography>
                  </Box>
                )}
              {formData.printingMachine?.name !== "No" &&
                formData.printingMachine?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Printing Machine - {formData.printingMachine?.count}
                    </Typography>
                  </Box>
                )}
              {formData.coffieMachine?.name !== "No" &&
                formData.coffieMachine?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Coffee Machine - {formData.coffieMachine?.count}
                    </Typography>
                  </Box>
                )}
              {formData.smartBoard?.name !== "No" &&
                formData.smartBoard?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Smart Board - {formData.smartBoard?.count}
                    </Typography>
                  </Box>
                )}
              {formData.projectors?.name !== "No" &&
                formData.projectors?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Projectors - {formData.projectors?.count}
                    </Typography>
                  </Box>
                )}
              {formData.diningTables?.name !== "No" &&
                formData.diningTables?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Dining Tables - {formData.diningTables?.count}
                    </Typography>
                  </Box>
                )}
              {formData.modularKitchen?.name !== "No" &&
                formData.modularKitchen?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Modular Kitchen - {formData.modularKitchen?.count}
                    </Typography>
                  </Box>
                )}
              {formData.wifi?.name !== "No" && formData.wifi?.name !== null && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    Wifi - {formData.wifi?.count}
                  </Typography>
                </Box>
              )}
              {formData.geyser?.name !== "No" &&
                formData.geyser?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Geyser - {formData.geyser?.count}
                    </Typography>
                  </Box>
                )}
              {formData.linear?.name !== "No" &&
                formData.linear?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      linear - {formData.linear?.count}
                    </Typography>
                  </Box>
                )}
              {formData.cubical?.name !== "No" &&
                formData.cubical?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      cubical - {formData.cubical?.count}
                    </Typography>
                  </Box>
                )}
              {formData.tables?.name !== "No" &&
                formData.tables?.name !== null && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      tables - {formData.tables?.count}
                    </Typography>
                  </Box>
                )}
            </Grid>
          </Grid>
        </Box>
      </>
      <>
        <Typography sx={{ mb: 1, fontSize: 23 }}>
          <b>Amenities</b>
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            mb: 3,
            boxShadow: "0 0 3px black",
            width: "97%",
            pl: 2,
            pb: 2,
            mt: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid container spacing={2} sx={{ ml: 1, mt: 0.6 }}>
              {formData.amenities.map((amenity, index) => (
                <Grid item xs={2} key={index}>
                  <Typography>
                    <span>{amenity}</span>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </>

      <>
        <Typography sx={{ mb: 1, fontSize: 23 }}>
          <b>Land Mark</b>
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            mb: 3,
            boxShadow: "0 0 3px black",
            width: "97%",
            pl: 2,
            pb: 2,
            mt: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Hospital Distance : </b>
                </span>
                {formData.hospitalDistance}
                <span> {formData.hospitalDistanceUnit}</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Airport Distance : </b>
                </span>
                {formData.airportDistance}
                <span> {formData.airportDistanceUnit}</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Railway Distance : </b>
                </span>
                {formData.railwayDistance}
                <span> {formData.railwayDistanceUnit}</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>ATM Distance : </b>
                </span>
                {formData.atmDistance}
                <span> {formData.atmDistanceUnit}</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>School Distance : </b>
                </span>
                {formData.schoolDistance}
                <span> {formData.schoolDistanceUnit}</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Shopping Mall Distance : </b>
                </span>
                {formData.shoppingMallDistance}
                <span> {formData.shoppingMallDistanceUnit}</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Bank Distance : </b>
                </span>
                {formData.bankDistance}
                <span> {formData.bankDistanceUnit}</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Bus Stop Distance : </b>
                </span>
                {formData.busStopDistance}
                <span> {formData.busStopDistanceUnit}</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Metro Station Distance : </b>
                </span>
                {formData.metroDistance}
                <span> {formData.metroDistanceUnit}</span>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </>

      <>
        <Typography sx={{ mb: 1, fontSize: 23 }}>
          <b>Define Your Property</b>
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            mb: 3,
            boxShadow: "0 0 3px black",
            width: "97%",
            pl: 2,
            pb: 2,
            mt: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Define Location : </b>
                </span>
                {formData.defineLocation
                  ? formData.defineLocation.join(", ")
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Explaining Price : </b>
                </span>
                {formData.explainingPrice
                  ? formData.explainingPrice.join(", ")
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b> Explaining the Property : </b>
                </span>
                {formData.explainingTheProperty
                  ? formData.explainingTheProperty.join(", ")
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Define Size & Structure : </b>
                </span>
                {formData.defineSizeStructure
                  ? formData.defineSizeStructure.join(", ")
                  : ""}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </>

      <>
        <Typography sx={{ mb: 1, fontSize: 23 }}>
          <b>Image Gallery</b>
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            mb: 3,
            boxShadow: "0 0 3px black",
            width: "97%",
            pl: 2,
            pb: 2,
            mt: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>
                <span>
                  <b>Featured Image : </b>
                </span>
              </Typography>
              <img
                style={{ width: 300, height: 300 }}
                src={
                  formData.featuredImageUrl[0]
                    ? formData.featuredImageUrl[0].imagePath
                    : formData.croppedFeaturedImage
                }
              ></img>
            </Grid>
            <Grid container>
              <Typography sx={{ mt: 3, ml: 2 }}>
                <span>
                  <b>Gallery Images : </b>
                </span>
              </Typography>
              <Box
                className="cropped-images"
                sx={{ display: "flex", flexWrap: "wrap", mt: 3 }}
              >
                {formData.galleryImageUrl.map((image, index) => {
                  if (image.status !== "Deleted") {
                    return (
                      <Box
                        key={index}
                        className="image-container"
                        sx={{
                          position: "relative",
                          margin: "10px",
                          boxShadow: "0 0 3px black",
                        }}
                      >
                        <img
                          style={{ width: 200, height: 200 }}
                          src={image.imagePath}
                          alt={`Cropped Image ${index + 1}`}
                        />
                      </Box>
                    );
                  }
                  return null;
                })}
              </Box>
            </Grid>
            {/* <Typography sx={{ mt: 3, ml: 2 }}>
              <span>
                <b>Gallery Video : </b>
              </span>
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1, ml: 2 }}>
              <video
                style={{ width: "350px", height: "auto" }}
                controls
                src={
                  detailsId && !formData.videoPreview
                    ? formData.uploadedVideo
                    : formData.videoPreview
                    ? URL.createObjectURL(formData.videoPreview)
                    : ""
                }
                alt={`Uploaded Video `}
              />
            </Grid> */}
          </Grid>
        </Box>
      </>
      {detailsId && (
        <Typography
          sx={{
            mt: 10,
            fontSize: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          All steps are updated
        </Typography>
      )}
      {!detailsId && (
        <Typography
          sx={{
            mt: 10,
            fontSize: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          All steps completed - Click on Submit to Save the Property
        </Typography>
      )}
    </Box>
  );
}

export default PreView;
