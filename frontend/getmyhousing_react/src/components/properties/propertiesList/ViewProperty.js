import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiList, invokeApi } from "../../../apis/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PriceFormatter } from "../../../common/common";
import FurnishingStatus from "../../end-user/PropertyDetails/components/FurnishingStatus";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "../../Loader";
import DashBoardHeader from "../../generic/dashboard/DashBoardHeader";
import DashBoardNavbar from "../../generic/dashboard/DashBoardNavbar";

const ViewProperty = () => {
  const [cookies] = useCookies([]);
  const { propertyId } = useParams();
  // const navigate = useNavigate();
  const [propertyData, setpropertyData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getPropertyDetailsById = async () => {
      let params = { id: propertyId };
      const response = await invokeApi(
        config.apiDomains + apiList.getPropertyDetailsById,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setpropertyData(response.data.Properties);
          setFetching(false);
        } else {
          alert("An error occurred while fetching data!");
        }
      } else {
        alert("An error occurred while fetching data!!");
      }
    };
    if (fetching) {
      getPropertyDetailsById();
    }
  }, [cookies, fetching]);
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        position: "fixed",
        width: "100%",
      }}
    >
      <DashBoardNavbar />
      <Box
        component="header"
        sx={{
          flexGrow: 1,
          p: 2,
          backgroundColor: "#F6F8FB",
          overflowX: "auto", // Add horizontal scrolling for small screens
        }}
      >
        <DashBoardHeader />
        {fetching ? (
          <Box sx={{ height: "100svh", display: "flex", alignItems: "center" }}>
            <Loader />
          </Box>
        ) : (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ width: "100%", mb: 1 }}>
              <IconButton onClick={() => window.history.back()}>
                <ArrowBackIcon />
              </IconButton>
            </Box>
            <Divider />
            <Typography sx={{ my: 1, fontSize: 23 }}>
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
                    {propertyData?.listingType}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Building Type : </b>
                    </span>
                    {propertyData?.buildingType}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Properties Type : </b>
                    </span>
                    {propertyData?.propertyType}
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
                position: "relative",
              }}
            >
              {/* <IconButton
                sx={{ position: "absolute", top: "20px", right: "20px" }}
              >
                <EditIcon />
              </IconButton> */}
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Country : </b>
                    </span>
                    {propertyData?.country}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>State : </b>
                    </span>
                    {propertyData?.state}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>District : </b>
                    </span>
                    {propertyData?.city}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Locality : </b>
                    </span>
                    {propertyData?.locality}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>PinCode : </b>
                    </span>
                    {propertyData?.pincode}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Property Adress : </b>
                    </span>
                    {propertyData?.propertyAddress}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Land Mark : </b>
                    </span>
                    {propertyData?.landmark}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Building Name : </b>
                    </span>
                    {propertyData?.propertyName}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {propertyData?.propertyType !== "PG/Co-living" && (
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
                    position: "relative",
                  }}
                >
                  {/* <IconButton
                    sx={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <Grid container spacing={2}>
                    {propertyData?.propertyAreaDetails?.plotArea && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Plot Area : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.plotArea}
                          <span>
                            {" "}
                            {propertyData?.propertyAreaDetails?.areaUnit
                              ? propertyData?.propertyAreaDetails?.areaUnit
                              : ""}
                          </span>
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.builtupPlotArea && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Built Up Area : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.builtupPlotArea}
                          <span>
                            {" "}
                            {propertyData?.propertyAreaDetails?.areaUnit
                              ? propertyData?.propertyAreaDetails?.areaUnit
                              : ""}
                          </span>
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.superBuiltupArea && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Super Built Up Area : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.superBuiltupArea}
                          <span>
                            {" "}
                            {propertyData?.propertyAreaDetails?.areaUnit
                              ? propertyData?.propertyAreaDetails?.areaUnit
                              : ""}
                          </span>
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.carpetArea && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Carpet Area : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.carpetArea}
                          <span>
                            {" "}
                            {propertyData?.propertyAreaDetails?.areaUnit
                              ? propertyData?.propertyAreaDetails?.areaUnit
                              : ""}
                          </span>
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.salableArea && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Salble Area : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.salableArea}
                          <span>
                            {" "}
                            {propertyData?.propertyAreaDetails?.areaUnit
                              ? propertyData?.propertyAreaDetails?.areaUnit
                              : ""}
                          </span>
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails
                      ?.privatePoolAvailability && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Private Pool Availability : </b>
                          </span>
                          {
                            propertyData?.propertyAreaDetails
                              ?.privatePoolAvailability
                          }
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.terraceAreaFlag && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Terrace Area Available : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.terraceAreaFlag}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.terraceAreaFlag && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Terrace Area in Sq.ft : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.terraceArea}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails
                      ?.privateGardenAvailability && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Private Garden Availability : </b>
                          </span>
                          {
                            propertyData?.propertyAreaDetails
                              ?.privateGardenAvailability
                          }
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails
                      ?.privateGardenAvailability && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Private Garden Area : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.privateGardenArea}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.noOfBedrooms !== "" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Number of Bedrooms : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.noOfBedrooms}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.noOfBathrooms !==
                      "" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Number of Bathrooms : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.noOfBathrooms}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.noOfBalconies !==
                      "" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Number of Balconies : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.noOfBalconies}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.additionalRooms && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Additional Rooms : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.additionalRooms}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.floorNo && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Floor Number : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.floorNo
                            ? propertyData?.propertyAreaDetails?.floorNo
                            : ""}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.totalFloors && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Total Floor : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.totalFloors
                            ? propertyData?.propertyAreaDetails?.totalFloors
                            : ""}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.towerBlockNo && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Tower / Block Number : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.towerBlockNo}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.propertyLevel && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Property Level : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.propertyLevel}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.cornerFlat && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Corner Flat : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.cornerFlat}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.openSides && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Open Sides : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.openSides}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyAreaDetails?.facing && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Facing : </b>
                          </span>
                          {propertyData?.propertyAreaDetails?.facing}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </>
            )}

            {propertyData?.propertiesType === "PG/Co-living" && (
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
                    position: "relative",
                  }}
                >
                  {/* <IconButton
                    sx={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Number of Beds in PG : </b>
                        </span>
                        {propertyData?.pgDetails?.totalBeds}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>PG for : </b>
                        </span>
                        {propertyData?.pgDetails?.pgFor}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Best Suited for : </b>
                        </span>
                        {propertyData?.pgDetails?.bestSuitedFor}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Meals Avilable : </b>
                        </span>
                        {propertyData?.pgDetails?.mealsAvailable}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Notice Period : </b>
                        </span>
                        {propertyData?.pgDetails?.noticePeriod}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Lock-In Period : </b>
                        </span>
                        {propertyData?.pgDetails?.lockInPeriod}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Common Areas : </b>
                        </span>
                        {propertyData?.pgDetails?.commonAreas
                          ? propertyData?.pgDetails?.commonAreas
                          : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
            {propertyData?.propertiesType !== "PG/Co-living" && (
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
                    position: "relative",
                  }}
                >
                  {/* <IconButton
                    sx={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <Grid container spacing={2}>
                    {/* <Grid item xs={4}>
                  <Typography>
                    <span>
                      <b>Available For : </b>
                    </span>
                    {propertyData?.propertyStatus?.availableFor}
                  </Typography>
                </Grid> */}
                    {propertyData?.propertyStatus?.positionStatus && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Position Status : </b>
                          </span>
                          {propertyData?.propertyStatus?.positionStatus}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyStatus?.availableFrom && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Available From : </b>
                          </span>
                          {propertyData?.propertyStatus?.availableFrom}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyStatus?.availableFromDate && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Available From Date : </b>
                          </span>
                          {propertyData?.propertyStatus?.availableFromDate}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyStatus?.occupancyDays && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Occupancy Days : </b>
                          </span>
                          {propertyData?.propertyStatus?.occupancyDays}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyStatus?.ageOfProperty && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Age of Property (In Years) : </b>
                          </span>
                          {propertyData?.propertyStatus?.ageOfProperty}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.propertyStatus?.ownershipType && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Owenership Type : </b>
                          </span>
                          {propertyData?.propertyStatus?.ownershipType}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </>
            )}
            {propertyData?.propertiesType !== "PG/Co-living" && (
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
                    position: "relative",
                  }}
                >
                  {/* <IconButton
                    sx={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>{propertyData?.listingType} Amount : </b>
                        </span>
                        {PriceFormatter(propertyData?.pricingDetails?.rent)}
                        <span> {propertyData?.pricingDetails?.rentType}</span>
                      </Typography>
                    </Grid>
                    {propertyData?.pricingDetails?.maintananceCost && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Maintainance Amount : </b>
                          </span>
                          {PriceFormatter(
                            propertyData?.pricingDetails?.maintananceCost
                          )}
                          <span>
                            {" "}
                            {propertyData?.pricingDetails?.maintananceCostType}
                          </span>
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.pricingDetails?.securityDeposit && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Security Deposit : </b>
                          </span>
                          {propertyData?.pricingDetails?.securityDeposit}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.pricingDetails?.securityDeposit ===
                      "Custom" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Security Deposit Amount : </b>
                          </span>
                          {PriceFormatter(
                            propertyData?.pricingDetails?.depositAmount
                          )}
                          {propertyData?.pricingDetails?.depositAmount}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.pricingDetails?.bookingAmount && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Booking Amount : </b>
                          </span>
                          {PriceFormatter(
                            propertyData?.pricingDetails?.bookingAmount
                          )}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.pricingDetails?.lockInPeriod && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Lock-In Period : </b>
                          </span>
                          {propertyData?.pricingDetails?.lockInPeriod}
                          <span>
                            {" "}
                            {propertyData?.pricingDetails?.lockInPeriodType}
                          </span>
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.pricingDetails?.rentIncrement && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Rent Increment for Every Year : </b>
                          </span>
                          {propertyData?.pricingDetails?.rentIncrement}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </>
            )}
            {propertyData?.propertiesType !== "PG/Co-living" && (
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
                    position: "relative",
                  }}
                >
                  <Grid container spacing={2}>
                    {propertyData?.taxCharges && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Tax & Govt Charges : </b>
                          </span>
                          {propertyData?.rentAmount}
                          <span> {propertyData?.taxCharges}</span>
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.maintenanceAmout && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Maintainance Amount : </b>
                          </span>
                          {propertyData?.maintenanceAmout}
                          <span> {propertyData?.maintananceCostType}</span>
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.electricPower && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Power in KV : </b>
                          </span>
                          {propertyData?.electricPower}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.liftAvailability && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Lift Availability : </b>
                          </span>
                          {propertyData?.liftAvailability}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.liftAvailability === "Yes" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Number of Lifts Available : </b>
                          </span>
                          {propertyData?.noOfLifts}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.serviceLiftAvailability && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Service Lift Availability : </b>
                          </span>
                          {propertyData?.serviceLiftAvailability}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.serviceLiftAvailability === "Yes" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Number of Service Lifts Available : </b>
                          </span>
                          {propertyData?.noOfServiceLifts}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.flooringLiving && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Living / Dining Floor: </b>
                          </span>
                          {propertyData?.additionalDetails?.flooringLiving}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.flooringKitchen && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Kitchen Floor : </b>
                          </span>
                          {propertyData?.additionalDetails?.flooringKitchen}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.flooringBedroom && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Bedroom Floor : </b>
                          </span>
                          {propertyData?.additionalDetails?.flooringBedroom}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.flooringMasterBedroom && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Master Bedroom Floor : </b>
                          </span>
                          {
                            propertyData?.additionalDetails
                              ?.flooringMasterBedroom
                          }
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.flooringOther && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Bathroom Floor : </b>
                          </span>
                          {propertyData?.additionalDetails?.flooringOther}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.flooringBalcony && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Balcony Floor : </b>
                          </span>
                          {propertyData?.additionalDetails?.flooringBalcony}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.flooringOther && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Other Floor : </b>
                          </span>
                          {propertyData?.additionalDetails?.flooringOther}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.parking2Wheeler && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>2 Wheeler Parking : </b>
                          </span>
                          {propertyData?.additionalDetails?.parking2Wheeler}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.parking2Wheeler ===
                      "Yes" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>2 Wheeler Covered Type : </b>
                          </span>
                          {propertyData?.additionalDetails?.parking2CoverCount
                            ? propertyData?.additionalDetails
                                ?.parking2CoverCount
                            : ""}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.twoWheeler === "Yes" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>2 Wheeler Open Type : </b>
                          </span>
                          {propertyData?.additionalDetails?.parking2OpenCount
                            ? propertyData?.additionalDetails?.parking2OpenCount
                            : ""}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.parking4Wheeler && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>4 Wheeler Parking : </b>
                          </span>
                          {propertyData?.additionalDetails?.parking4Wheeler}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.fourWheeler === "Yes" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>4 Wheeler Covered Type : </b>
                          </span>
                          {propertyData?.additionalDetails?.parking4CoverCount
                            ? propertyData?.additionalDetails
                                ?.parking4CoverCount.label
                            : ""}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.fourWheeler === "Yes" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>4 Wheeler Open Type : </b>
                          </span>
                          {propertyData?.additionalDetails?.parking4OpenCount
                            ? propertyData?.additionalDetails?.parking4OpenCount
                            : ""}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.powerBackup && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Power Backup : </b>
                          </span>
                          {propertyData?.additionalDetails?.powerBackup}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.waterSource && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Water Source : </b>
                          </span>
                          {propertyData?.additionalDetails?.waterSource}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.overLookingView && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Over Looking View : </b>
                          </span>
                          {propertyData?.additionalDetails?.overLookingView}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.additionalDetails?.frontRoadWidth && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Front Road Width : </b>
                          </span>
                          {propertyData?.additionalDetails?.frontRoadWidth}
                          <span>
                            {" "}
                            {
                              propertyData?.additionalDetails
                                ?.frontRoadWidthType
                            }
                          </span>
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </>
            )}

            {propertyData?.propertiesType === "PG/Co-living" && (
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
                    position: "relative",
                  }}
                >
                  {/* <IconButton
                    sx={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Property Managed By : </b>
                        </span>
                        {propertyData?.pgOwnerDetails?.propertyManagedBy}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Property Manager Stays at Property : </b>
                        </span>
                        {propertyData?.pgOwnerDetails?.propertyManagerStay}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}

            {propertyData?.propertiesType === "PG/Co-living" && (
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
                    position: "relative",
                  }}
                >
                  {/* <IconButton
                    sx={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Non-veg Allowed : </b>
                        </span>
                        {propertyData?.pgRegulations?.nonVegAllowed}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Opposite Sex : </b>
                        </span>
                        {propertyData?.pgRegulations?.oppositeSex}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Any Time Allowed : </b>
                        </span>
                        {propertyData?.pgRegulations?.anyTimeAllowed}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Visitors Allowed : </b>
                        </span>
                        {propertyData?.pgRegulations?.visitorAllowed}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Guardian Allowed : </b>
                        </span>
                        {propertyData?.pgRegulations?.guardianAllowed}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Drinking Allowed : </b>
                        </span>
                        {propertyData?.pgRegulations?.drinkingAllowed}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Smoking Allowed : </b>
                        </span>
                        {propertyData?.pgRegulations?.smokingAllowed}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}

            {propertyData?.propertiesType === "PG/Co-living" && (
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
                    position: "relative",
                  }}
                >
                  {/* <IconButton
                    sx={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Room Type : </b>
                        </span>
                        {propertyData?.pgRoomDetails?.roomType
                          ? propertyData?.pgRoomDetails?.roomType
                          : // .join(", ")
                            ""}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Total Beds in the Room : </b>
                        </span>
                        {propertyData?.pgRoomDetails?.totalBedsInRoom
                          ? propertyData?.pgRoomDetails?.totalBedsInRoom
                          : // .join(", ")
                            ""}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Any Time Allowed : </b>
                        </span>
                        {propertyData?.pgRegulations?.anyTimeAllowed}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Rent Amount : </b>
                        </span>
                        {propertyData?.pgRoomDetails?.rent}
                        <span> {propertyData?.pgRoomDetails?.rentType}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Security Deposit : </b>
                        </span>
                        {propertyData?.pricingDetails?.securityDeposit}
                      </Typography>
                    </Grid>
                    {propertyData?.pricingDetails?.securityDeposit ===
                      "Custom " && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>Security Deposit : </b>
                          </span>
                          {propertyData?.pricingDetails?.depositAmount}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>2 Wheeler Parking : </b>
                        </span>
                        {propertyData?.pgRoomDetails?.parking2Wheeler}
                      </Typography>
                    </Grid>
                    {propertyData?.pgRoomDetails?.parking2Wheeler === "Yes" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>2 Wheeler Covered Type : </b>
                          </span>
                          {propertyData?.pgRoomDetails?.parking2CoverType
                            ? propertyData?.pgRoomDetails?.parking2CoverType
                            : ""}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.pgRoomDetails?.parking2Wheeler === "Yes" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>2 Wheeler Open Type : </b>
                          </span>
                          {propertyData?.pgRoomDetails?.parking2OpenType
                            ? propertyData?.pgRoomDetails?.parking2OpenType
                            : ""}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>4 Wheeler Parking : </b>
                        </span>
                        {propertyData?.pgRoomDetails?.parking4Wheeler}
                      </Typography>
                    </Grid>
                    {propertyData?.pgRoomDetails?.parking4Wheeler === "Yes" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>4 Wheeler Covered Type : </b>
                          </span>
                          {propertyData?.pgRoomDetails?.parking4CoverType
                            ? propertyData?.pgRoomDetails?.parking4CoverType
                            : ""}
                        </Typography>
                      </Grid>
                    )}
                    {propertyData?.pgRoomDetails?.parking4Wheeler === "Yes" && (
                      <Grid item xs={4}>
                        <Typography>
                          <span>
                            <b>4 Wheeler Open Type : </b>
                          </span>
                          {propertyData?.pgRoomDetails?.parking4OpenType
                            ? propertyData?.pgRoomDetails?.parking4OpenType
                            : ""}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Facility Offered : </b>
                        </span>
                        {propertyData?.pgRoomDetails?.facilityOffered
                          ? propertyData?.pgRoomDetails?.facilityOffered.join(
                              ", "
                            )
                          : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
            {propertyData?.propertyType !== "Farm Plot/Land" && (
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
                    position: "relative",
                  }}
                >
                  {/* <IconButton
                  sx={{ position: "absolute", top: "20px", right: "20px" }}
                >
                  <EditIcon />
                </IconButton> */}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>
                        <span>
                          <b>Furnishing Status Type : </b>
                        </span>
                        {propertyData?.furnishingStatus?.furnishingType}
                      </Typography>
                    </Grid>
                    <Grid container spacing={2} sx={{ ml: 1 }}>
                      <Grid item xs={12}>
                        <FurnishingStatus propertyData={propertyData} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
            {propertyData?.propertyType !== "Farm Plot/Land" && (
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
                    position: "relative",
                  }}
                >
                  {/* <IconButton
                  sx={{ position: "absolute", top: "20px", right: "20px" }}
                >
                  <EditIcon />
                </IconButton> */}
                  <Grid container spacing={2}>
                    <Grid container spacing={2} sx={{ ml: 1, mt: 0.6 }}>
                      {propertyData?.amenitiesList?.map((amenity, index) => (
                        <Grid item xs={2} key={amenity.id}>
                          <Typography>
                            <span>{amenity.amenities}</span>
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
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
                  position: "relative",
                }}
              >
                {/* <IconButton
                  sx={{ position: "absolute", top: "20px", right: "20px" }}
                >
                  <EditIcon />
                </IconButton> */}
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Hospital Distance : </b>
                      </span>
                      {propertyData?.landMarks?.hospitalDistance}
                      <span>
                        {" "}
                        {propertyData?.landMarks?.hospitalDistanceType}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Airport Distance : </b>
                      </span>
                      {propertyData?.landMarks?.airportDistance}
                      <span>
                        {" "}
                        {propertyData?.landMarks?.airportDistanceType}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Railway Distance : </b>
                      </span>
                      {propertyData?.landMarks?.railwayStationDistance}
                      <span>
                        {" "}
                        {propertyData?.landMarks?.railwayStationDistanceType}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>ATM Distance : </b>
                      </span>
                      {propertyData?.landMarks?.atmDistance}
                      <span> {propertyData?.landMarks?.atmDistanceType}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>School Distance : </b>
                      </span>
                      {propertyData?.landMarks?.schoolDistance}
                      <span>
                        {" "}
                        {propertyData?.landMarks?.schoolDistanceType}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Shopping Mall Distance : </b>
                      </span>
                      {propertyData?.landMarks?.shoppingMallDistance}
                      <span>
                        {" "}
                        {propertyData?.landMarks?.shoppingMallDistanceType}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Bank Distance : </b>
                      </span>
                      {propertyData?.landMarks?.bankDistance}
                      <span> {propertyData?.landMarks?.bankDistanceType}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Bus Stop Distance : </b>
                      </span>
                      {propertyData?.landMarks?.busStopDistance}
                      <span>
                        {" "}
                        {propertyData?.landMarks?.busStopDistanceType}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Metro Station Distance : </b>
                      </span>
                      {propertyData?.landMarks?.metroStationDistance}
                      <span>
                        {" "}
                        {propertyData?.landMarks?.metroStationDistanceType}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </>

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
                position: "relative",
              }}
            >
              {/* <IconButton
                sx={{ position: "absolute", top: "20px", right: "20px" }}
              >
                <EditIcon />
              </IconButton> */}
              <Grid container spacing={2}>
                {propertyData?.defineProperty?.defineLocation && (
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Define Location : </b>
                      </span>
                      {propertyData?.defineProperty?.defineLocation
                        ? propertyData?.defineProperty?.defineLocation
                        : ""}
                    </Typography>
                  </Grid>
                )}
                {propertyData?.defineProperty?.explainingPrice && (
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Explaining Price : </b>
                      </span>
                      {propertyData?.defineProperty?.explainingPrice
                        ? propertyData?.defineProperty?.explainingPrice
                        : ""}
                    </Typography>
                  </Grid>
                )}
                {propertyData?.defineProperty?.explainingProperty && (
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b> Explaining the Property : </b>
                      </span>
                      {propertyData?.defineProperty?.explainingProperty
                        ? propertyData?.defineProperty?.explainingProperty
                        : ""}
                    </Typography>
                  </Grid>
                )}
                {propertyData?.defineProperty?.defineSizeAndStructure && (
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Define Size & Structure : </b>
                      </span>
                      {propertyData?.defineProperty?.defineSizeAndStructure
                        ? propertyData?.defineProperty?.defineSizeAndStructure
                        : ""}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
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
                position: "relative",
              }}
            >
              {/* <IconButton
                sx={{ position: "absolute", top: "20px", right: "20px" }}
              >
                <EditIcon />
              </IconButton> */}
              <Grid container spacing={2}>
                {propertyData?.propertyGalleryImages.find(
                  (item) => item.imageType === "featured"
                )?.imagePath && (
                  <Grid item xs={4}>
                    <Typography>
                      <span>
                        <b>Featured Image : </b>
                      </span>
                    </Typography>
                    <img
                      style={{ width: "100%", height: 300 }}
                      alt="img"
                      src={
                        propertyData?.propertyGalleryImages.length > 0
                          ? propertyData?.propertyGalleryImages.find(
                              (item) => item.imageType === "featured"
                            )?.imagePath
                          : null
                      }
                    ></img>
                  </Grid>
                )}
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
                    {propertyData?.propertyGalleryImages
                      .filter((item) => item.imageType === "gallery")
                      .map((image, index) => (
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
                            style={{ width: "100%", height: 200 }}
                            src={image?.imagePath}
                            alt={`Cropped ${index + 1}`}
                          />
                        </Box>
                      ))}
                  </Box>
                </Grid>
                {propertyData?.videoLink !== "" && (
                  <>
                    <Typography sx={{ mt: 3, ml: 2 }}>
                      <span>
                        <b>Youtube Video : </b>
                      </span>
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1, ml: 2 }}>
                      <iframe
                        src={propertyData?.videoLink}
                        title="youtube video"
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
            {/* {detailsId && (
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
        )} */}
            {/* {!detailsId && (
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
        )} */}
            <Button
              variant="outlined"
              size="large"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default ViewProperty;
