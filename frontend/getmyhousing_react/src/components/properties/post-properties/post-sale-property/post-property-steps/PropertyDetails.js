import React, { useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import "./Commercial.css";
import { Box, Grid } from "@mui/material";
import {
  ageofproperty,
  availablefrom,
  hotelResortTypeOptions,
  locatednearme,
  locationHubOptions,
  occuType2,
  occupTypeSale,
  owenershiptype,
  positionStatusOptions,
  propertyManage,
  servicesSale,
  suitableForOptions,
  yesOrNo,
} from "../../../../../common/common";

const PropertyDetails = ({
  next,
  back,
  formData,
  updateFormData,
  detailsId,
}) => {
  const [showavailablefromdate, setshowavailablefromdate] = useState(false);

  const [availableFromDate, setAvailableFromDate] = useState(
    formData.availableFromDate
  );

  // const [showDate, setshowDate] = useState(false);
  const [occupancyType, setOccupancyType] = useState(formData.occupancyType);
  // const [selectedDate1, setSelectedDate1] = useState("");

  const [positionStatusType, setPositionStatusType] = useState(
    formData.positionStatusType
  );

  const [positionStatus, setPositionStatus] = useState(formData.positionStatus);
  const [positionStatusError, setPositionStatusError] = useState(false);
  const [positionStatusHelperText, setPositionStatusHelperText] = useState("");
  const [availbleFrom, setAvailableFrom] = useState(formData.availbleFrom);
  const [occupancyDays, setOccupancyDays] = useState(formData.occupancyDays);
  const [ageofProperty, setAgeofProperty] = useState(formData.ageofProperty);
  const [tenantPreLeasedUnit, settenantPreleasedUnit] = useState(
    formData.tenantPreLeasedUnit
  );
  const [owenershipType, setOwenershipType] = useState(formData.owenershipType);
  const [propertyManagedBy, setPropertyManagedBy] = useState(
    formData.propertyManagedBy
  );
  const [propertyManagedStaysAtProperty, setPropertyManagedStaysAtProperty] =
    useState(formData.propertyManagedStaysAtProperty);
  const [widthOfPropertyStatus, setWidthOfPropertyStatus] = useState(
    formData.widthOfPropertyStatus
  );
  const [widthUnitOfPropertyStatus, setWidthUnitOfPropertyStatus] = useState(
    formData.widthUnitOfPropertyStatus
  );
  const [heightSealingOfPropertyStatus, setHeightSealingOfPropertyStatus] =
    useState(formData.heightSealingOfPropertyStatus);
  const [
    heightSealingUnitOfPropertyStatus,
    setHeightSealingUnitOfPropertyStatus,
  ] = useState(formData.heightSealingUnitOfPropertyStatus);
  const [locationHub, setLocationHub] = useState(formData.locationHub);
  const [locatedNear, setLocatedNear] = useState(formData.locatedNear);
  const [hotelResortType, setHotelResortType] = useState(
    formData.hotelResortType
  );
  const [propertySuitableFor, setPropertySuitableFor] = useState(
    formData.propertySuitableFor
  );
  const [govtApproved, setGovtApproved] = useState(formData.govtApproved);

  const data4 = {
    positionStatus,
    availbleFrom,
    availableFromDate,
    occupancyDays,
    ageofProperty,
    tenantPreLeasedUnit,
    owenershipType,
    propertyManagedBy,
    occupancyType,
    propertyManagedStaysAtProperty,
    positionStatusType,
    widthOfPropertyStatus,
    heightSealingOfPropertyStatus,
    locationHub,
    widthUnitOfPropertyStatus,
    heightSealingUnitOfPropertyStatus,
    locatedNear,
    hotelResortType,
    propertySuitableFor,
    govtApproved,
  };
  const send = () => updateFormData(data4);

  function validateField() {
    let validate = true;
    if (
      !positionStatus &&
      formData.propertiesType !== "Estate/Plantation" &&
      formData.propertiesType !== "PG/Co-living"
    ) {
      setPositionStatusError(true);
      setPositionStatusHelperText(
        "please Select the Property Possession Status"
      );
      validate = false;
    }
    if (validate) {
      next();
      send();
    }
  }

  useEffect(() => {
    if (availbleFrom === "Later") setshowavailablefromdate(true);
    else if (availbleFrom === "Immediate") setshowavailablefromdate(true);
    else setshowavailablefromdate(false);
  }, [availbleFrom]);
  return (
    <Box sx={{ marginTop: 5, marginBottom: 5 }}>
      {formData.propertiesType !== "PG/Co-living" && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid
            container
            sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}
          >
            {(formData.propertiesType === "Hotel/Resorts" ||
              formData.subProperty === "Hotel/Resorts") && (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    ml: { xs: 1 },
                  }}
                >
                  <Grid
                    item
                    sx={{
                      marginRight: { md: "17px", xs: "5px" },
                      marginTop: { md: "15px", xs: "2px" },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                    >
                      Hotel/Resort Type
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    className="mydict"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: 1,
                      flexWrap: "wrap",
                      mt: 1,
                    }}
                  >
                    {hotelResortTypeOptions.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          setHotelResortType(event.target.value);
                        }}
                        key={item}
                        style={{ marginRight: "15px", marginBottom: "25px" }}
                      >
                        <input
                          type="radio"
                          name="200001"
                          value={item}
                          checked={hotelResortType === item}
                          readOnly
                        />
                        <span
                          className="border1"
                          style={{ fontFamily: "Mulish, sans-serif" }}
                        >
                          {item}
                        </span>
                      </label>
                    ))}
                  </Grid>
                </Grid>
              )}

            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                ml: { xs: 1 },
              }}
            >
              {/* <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "15px", xs: "2px" },
                }}
              >
                <Typography sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}>
                  Transaction Type
                </Typography>
              </Grid> */}
              {/* <Grid
                container
                mt={1}
                ml={1}
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                }}
              >
                {transactionTypeOptions.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      // settransactionType(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="transaction"
                      value={item}
                      checked={transactionType === item}
                      readOnly
                    />
                    <span
                      className="border1"
                      style={{ fontFamily: "Mulish, sans-serif" }}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </Grid> */}
              {(formData.propertiesType === "Commercial Plot/Land" ||
                formData.propertiesType === "Industrial Plot/Land" ||
                formData.propertiesType === "Farm Plot/Land" ||
                formData.propertiesType === "Warehouse/Godown" ||
                formData.subProperty === "Warehouse/Godown" ||
                formData.propertiesType === "Shed/Factory" ||
                formData.subProperty === "Shed/Factory" ||
                formData.propertiesType === "Residential Plot/Land") && (
                  <Grid
                    container
                    sx={{ display: "flex", flexDirection: "column", mt: 1.5 }}
                  >
                    {/* <Grid item>
                    {" "}
                    <Typography sx={{ fontWeight: 600 }}>
                      Govt Authority Approved
                    </Typography>
                  </Grid> */}
                    <Grid
                      item
                      sx={{ mb: { md: 1 }, minWidth: { xs: "100%", md: "50%" } }}
                    >
                      <TextField
                        label="Govt Authority Approved"
                        id="demo-simple-select"
                        sx={{
                          minWidth: { xs: "90%", md: "10%" },
                          maxWidth: { xs: "100%", md: "40%" },
                        }}
                        value={govtApproved}
                        onChange={(event) => {
                          setGovtApproved(event.target.value);
                        }}
                      ></TextField>
                    </Grid>
                  </Grid>
                )}
            </Grid>

            {formData.propertiesType !== "Estate/Plantation" && (
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  ml: { xs: 1 },
                }}
              >
                <Grid
                  item
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "15px", xs: "2px" },
                  }}
                >
                  <Typography
                    sx={{ fontSize: { md: "18px" }, fontWeight: 600, mb: 2 }}
                  >
                    Position Status <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid
                  container
                  mt={1}
                  ml={1}
                  className="mydict"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {positionStatusOptions.map((item) => (
                    <label
                      className="mydict1 border1"
                      onChange={(event) => {
                        setPositionStatus(event.target.value);
                        setPositionStatusError(false);
                        setPositionStatusHelperText("");
                      }}
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "25px" }}
                    >
                      <input
                        type="radio"
                        name="position"
                        value={item}
                        checked={positionStatus === item}
                        readOnly
                      />
                      <span
                        className="border1"
                        style={{ fontFamily: "Mulish, sans-serif" }}
                      >
                        {item}
                      </span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            )}
            {positionStatus === "Ready to move" && (
              <Box>
                {formData.propertiesType !== "Rooftop" &&
                  formData.propertiesType !== "Shed/Factory" &&
                  formData.propertiesType !== "Industrial Plot/Land" &&
                  formData.propertiesType !== "Commercial Plot/Land" &&
                  formData.propertiesType !== "Hotel/Resorts" &&
                  formData.propertiesType !== "Preleased Properties" &&
                  formData.propertiesType !== "Residential Plot/Land" &&
                  formData.propertiesType !== "Warehouse/Godown" && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        ml: { xs: 1 },
                      }}
                    >
                      <Grid
                        item
                        sx={{
                          marginRight: { md: "17px", xs: "5px" },
                          marginTop: { md: "5px", xs: "2px" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { md: "18px" },
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          {formData.propertiesType === "Commercial Building" ||
                            formData.propertiesType === "Shopping Mall" ||
                            formData.propertiesType === "Industrial Building" ||
                            formData.propertiesType === "Residential Plot/Land" ||
                            formData.propertiesType ===
                            "Guest House/Banquet Hall" ||
                            formData.propertiesType === "Hotel/Resorts"
                            ? " Property Position Status"
                            : formData.propertiesType ===
                              "Commercial Plot/Land" ||
                              formData.propertiesType === "Industrial Plot/Land"
                              ? "Land/Plot occupancy Type"
                              : "Property Position Status"}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={12}
                        className="mydict"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          flexGrow: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {(formData.propertiesType === "Industrial Plot/Land"
                          ? occuType2
                          : occupTypeSale
                        ).map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setOccupancyType(event.target.value);
                              setPositionStatusType(event.target.value);
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                              marginBottom: "15px",
                            }}
                          >
                            <input
                              type="radio"
                              name="202"
                              value={item}
                              checked={positionStatusType === item}
                              readOnly
                            />
                            <span
                              className="border1"
                              style={{ fontFamily: "Mulish,sans-serif" }}
                            >
                              {item}
                            </span>
                          </label>
                        ))}
                      </Grid>
                    </Grid>
                  )}
              </Box>
            )}

            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                ml: { xs: 1 },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "15px", xs: "2px" },
                }}
              >
                <Typography sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}>
                  Available From
                </Typography>
              </Grid>
              <Grid
                container
                mt={2}
                ml={1}
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                }}
              >
                {availablefrom.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setAvailableFrom(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="203"
                      value={item}
                      checked={availbleFrom === item}
                      readOnly
                    />
                    <span
                      className="border1"
                      style={{ fontFamily: "Mulish, sans-serif" }}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </Grid>
              {showavailablefromdate && (
                <Box
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    minWidth: "100%",
                  }}
                >
                  <Grid item md={8} xs={12} ml={{ md: -0.5, xs: -1 }}>
                    <TextField
                      type="date"
                      id="date"
                      value={availableFromDate}
                      sx={{
                        height: "50px",
                        minWidth: { md: "20%", xs: "95%" },
                        maxWidth: { md: "26.6%", xs: "95%" },
                        marginLeft: "5px",
                        fontSize: "15px",
                        marginTop: "10px",
                        marginBottom: "15px",
                      }}
                      onChange={(event) => {
                        setAvailableFromDate(event.target.value);
                      }}
                    />
                  </Grid>
                </Box>
              )}
            </Grid>

            {/* {formData.buildingType !== "Residential" &&
              formData.propertiesType !== "Industrial Plot/Land" &&
              formData.propertiesType !== "Commercial Plot/Land" &&
              formData.propertiesType !== "Guest House/Banquet Hall" &&
              formData.propertiesType !== "Estate/Plantation" &&
              formData.propertiesType !== "Hotel/Resorts" &&
              formData.subProperty !== "Hotel/Resorts" &&
              formData.propertiesType !== "Shed/Factory" && (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginRight: { md: "10%", xs: 1 },
                    ml: { xs: 1 },
                    mr: { md: "10%" },
                  }}
                >
                  <Grid
                    item
                    sx={{
                      marginRight: { md: "17px", xs: "5px" },
                      marginTop: { md: "15px", xs: "2px" },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                    >
                      Occupancy Days
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    mt={1}
                    ml={1}
                    className="mydict"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {occupancydays.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          setOccupancyDays(event.target.value);
                        }}
                        key={item}
                        style={{ marginRight: "15px", marginBottom: "25px" }}
                      >
                        <input
                          type="radio"
                          name="204"
                          value={item}
                          checked={occupancyDays === item}
                          readOnly
                        />
                        <span
                          className="border1"
                          style={{ fontFamily: "Mulish, sans-serif" }}
                        >
                          {item}
                        </span>
                      </label>
                    ))}
                  </Grid>
                </Grid>
              )} */}

            {(formData.propertiesType === "Industrial Building" ||
              formData.subProperty === "Industrial Building" ||
              formData.propertiesType === "Shed/Factory" ||
              formData.subProperty === "Shed/Factory" ||
              formData.propertiesType === "Commercial Building" ||
              formData.propertiesType === "Shopping Mall" ||
              formData.propertiesType === "Warehouse/Godown" ||
              formData.subProperty === "Warehouse/Godown" ||
              formData.subProperty === "Shopping Mall" ||
              formData.buildingType === "Residential") &&
              formData.propertiesType !== "Residential Plot/Land" &&
              formData.propertiesType !== "Farm Plot/Land" && (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    ml: { xs: 1 },
                  }}
                >
                  <Grid
                    item
                    sx={{
                      marginRight: { md: "17px", xs: "5px" },
                      marginTop: { md: "15px", xs: "2px" },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                    >
                      Tenanted/Pre-Leased Unit
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    mt={2}
                    ml={1}
                    className="mydict"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {yesOrNo.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          settenantPreleasedUnit(event.target.value);
                        }}
                        key={item}
                        style={{ marginRight: "15px", marginBottom: "25px" }}
                      >
                        <input
                          type="radio"
                          name="tenantedPreleasedUnit"
                          value={item}
                          checked={tenantPreLeasedUnit === item}
                          readOnly
                        />
                        <span
                          className="border1"
                          style={{ fontFamily: "Mulish, sans-serif" }}
                        >
                          {item}
                        </span>
                      </label>
                    ))}
                  </Grid>
                </Grid>
              )}

            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginRight: { md: "10%" },
                ml: { xs: 1 },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "15px", xs: "2px" },
                }}
              >
                <Typography
                  sx={{ fontSize: { md: "18px" }, fontWeight: "600" }}
                >
                  Ownership Type
                </Typography>
              </Grid>

              <Grid
                container
                mt={2}
                ml={1}
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                }}
              >
                {(formData.propertiesType === "Industrial Plot/Land"
                  ? owenershiptype
                  : owenershiptype
                ).map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setOwenershipType(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="207"
                      value={item}
                      checked={owenershipType === item}
                      readOnly
                    />
                    <span
                      className="border1"
                      style={{ fontFamily: "Mulish, sans-serif" }}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </Grid>
            </Grid>

            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                ml: { xs: 1 },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "15px", xs: "2px" },
                }}
              >
                <Typography sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}>
                  Age of Property (In Years)
                </Typography>
              </Grid>
              <Grid
                container
                mt={2}
                ml={1}
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                }}
              >
                {ageofproperty.map((item, index) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setAgeofProperty(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="206"
                      value={item}
                      checked={ageofProperty === item}
                      readOnly
                    />
                    <span
                      className="border1"
                      style={{ fontFamily: "Mulish, sans-serif" }}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </Grid>
            </Grid>

            {formData.propertiesType === "Retail Shop/Show" && (
              <>
                <Grid container sx={{ display: { md: "flex" } }}>
                  <Grid
                    item
                    md={3.5}
                  // sx={{ width: { md: "15%", mt: 2 }, ml: { md: 1 } }}
                  >
                    <InputLabel
                      sx={{
                        color: "black",
                        ml: 1,
                        mb: 1,
                        mt: 2,
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      Entrance Width
                    </InputLabel>
                    <TextField
                      placeholder=" Enter The Entrance Width"
                      id="demo-simple-select"
                      sx={{ minWidth: { md: "50%" } }}
                      onChange={(event) => {
                        setWidthOfPropertyStatus(event.target.value);
                      }}
                      value={widthOfPropertyStatus}
                      InputProps={{
                        endAdornment: (
                          <Grid
                            item
                            sx={{
                              maxWidth: { md: "30.3%" },
                              mr: 0,
                              maxHeight: "50px",
                              mt: -3,
                            }}
                          >
                            <Box
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Box
                                item
                                sx={{
                                  color: "black",
                                  fontFamily: "Inter",
                                  fontSize: "24px",
                                  ml: 2,
                                }}
                              >
                                |
                              </Box>

                              <TextField
                                label="Unit"
                                select
                                id="demo-simple-select"
                                sx={{
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "none !important",
                                  },
                                  "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon":
                                  {
                                    display: "none",
                                  },
                                  minWidth: { md: "100%" },
                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                    { display: "none" },
                                }}
                                onChange={(event) => {
                                  setWidthUnitOfPropertyStatus(
                                    event.target.value
                                  );
                                }}
                                value={widthUnitOfPropertyStatus}
                              >
                                <MenuItem value="Feet">Feet</MenuItem>
                              </TextField>
                            </Box>
                          </Grid>
                        ),
                      }}
                    ></TextField>
                  </Grid>

                  <Grid
                    item
                    md={3}
                  // sx={{ width: { md: "15%", mt: 2 }, ml: { md: 1 } }}
                  >
                    <InputLabel
                      sx={{
                        color: "black",
                        ml: 1,
                        mb: 1,
                        mt: 2,
                        fontSize: { md: "18px" },
                        fontWeight: 600,
                      }}
                    >
                      Entrance Sealing Height
                    </InputLabel>
                    <TextField
                      placeholder=" Enter The Sealing Height "
                      id="demo-simple-select"
                      sx={{ minWidth: { md: "50%" } }}
                      onChange={(event) => {
                        setHeightSealingOfPropertyStatus(event.target.value);
                      }}
                      value={heightSealingOfPropertyStatus}
                      InputProps={{
                        endAdornment: (
                          <Grid
                            item
                            sx={{
                              maxWidth: { md: "30.3%" },
                              mr: 0,
                              maxHeight: "50px",
                              mt: -3,
                            }}
                          >
                            <Box
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Box
                                item
                                sx={{
                                  color: "black",
                                  fontFamily: "Inter",
                                  fontSize: "24px",
                                  ml: 2,
                                }}
                              >
                                |
                              </Box>

                              <TextField
                                label="Unit"
                                select
                                id="demo-simple-select"
                                sx={{
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "none !important",
                                  },
                                  "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon":
                                  {
                                    display: "none",
                                  },
                                  minWidth: { md: "100%" },
                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                    { display: "none" },
                                }}
                                onChange={(event) => {
                                  setHeightSealingUnitOfPropertyStatus(
                                    event.target.value
                                  );
                                }}
                                value={heightSealingUnitOfPropertyStatus}
                              >
                                <MenuItem value="Feet">Feet</MenuItem>
                              </TextField>
                            </Box>
                          </Grid>
                        ),
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </>
            )}
            {formData.propertiesType === "Rooftop" && (
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  ml: { xs: 1 },
                }}
              >
                <Grid
                  item
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "15px", xs: "10px" },
                    mb: { xs: 1 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    About the Property (Suitable for)
                  </Typography>
                </Grid>
                <Grid
                  container
                  ml={1}
                  className="mydict"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {suitableForOptions.map((item) => (
                    <label
                      className="mydict1 border1"
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "25px" }}
                    >
                      <input
                        type="checkbox"
                        name="29512544dsv04"
                        value={item}
                        checked={propertySuitableFor.includes(item)}
                        onChange={(event) => {
                          const { value, checked } = event.target;
                          if (checked) {
                            setPropertySuitableFor([
                              ...propertySuitableFor,
                              value,
                            ]);
                          } else {
                            setPropertySuitableFor(
                              propertySuitableFor.filter(
                                (item) => item !== value
                              )
                            );
                          }
                        }}
                      />
                      <span
                        className="border1"
                        style={{ fontFamily: "Mulish, sans-serif" }}
                      >
                        {item}
                      </span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            )}
            {formData.propertiesType === "Rooftop" && (
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  ml: { xs: 1 },
                }}
              >
                <Grid
                  item
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "15px", xs: "10px" },
                    mb: { xs: 1 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Location Hub
                  </Typography>
                </Grid>
                <Grid
                  container
                  ml={1}
                  className="mydict"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {(formData.propertiesType === "Rooftop"
                    ? servicesSale
                    : locationHubOptions
                  ).map((item) => (
                    <label
                      className="mydict1 border1"
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "25px" }}
                    >
                      <input
                        type="checkbox"
                        name="29512504"
                        value={item}
                        checked={locationHub.includes(item)}
                        onChange={(event) => {
                          const { value, checked } = event.target;
                          if (checked) {
                            setLocationHub([...locationHub, value]);
                          } else {
                            setLocationHub(
                              locationHub.filter((item) => item !== value)
                            );
                          }
                        }}
                      />
                      <span
                        className="border1"
                        style={{ fontFamily: "Mulish, sans-serif" }}
                      >
                        {item}
                      </span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            )}
            {formData.propertiesType === "Retail Shop/Show" && (
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  ml: { xs: 1 },
                }}
              >
                <Grid
                  item
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "15px", xs: "10px" },
                    mb: { xs: 1 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography sx={{ marginBottom: 3, ml: { xs: 1 } }}>
                    Located Near
                  </Typography>
                </Grid>
                <Grid
                  container
                  mt={1}
                  ml={1}
                  className="mydict"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {locatednearme.map((item) => (
                    <label
                      className="mydict1 border1"
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "25px" }}
                    >
                      <input
                        type="checkbox"
                        name="2912504"
                        value={item}
                        checked={locatedNear.includes(item)}
                        onChange={(event) => {
                          const { value, checked } = event.target;
                          if (checked) {
                            setLocatedNear([...locatedNear, value]);
                          } else {
                            setLocatedNear(
                              locatedNear.filter((item) => item !== value)
                            );
                          }
                        }}
                      />
                      <span
                        className="border1"
                        style={{ fontFamily: "Mulish, sans-serif" }}
                      >
                        {item}
                      </span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {formData.propertiesType === "PG/Co-living" && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h5"
            sx={{
              ml: { md: 1 },
              mb: { md: 3 },
              fontSize: "25px",
              fontWeight: 600,
            }}
          >
            Owner/Care Taker Details
          </Typography>
          <Grid
            container
            sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                ml: { xs: 1 },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "15px", xs: "10px" },
                  mb: { xs: 1 },
                  mr: { xs: "30%" },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Property Managed By
                </Typography>
              </Grid>
              <Grid
                item
                mt={0.5}
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                }}
              >
                {propertyManage.map((item) => (
                  <label
                    className="mydict1 border1"
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="checkbox"
                      name="203ewee"
                      value={item}
                      checked={propertyManagedBy.includes(item)}
                      onChange={(event) => {
                        const { value, checked } = event.target;
                        if (checked) {
                          setPropertyManagedBy([...propertyManagedBy, value]);
                        } else {
                          setPropertyManagedBy(
                            propertyManagedBy.filter((item) => item !== value)
                          );
                        }
                      }}
                    />

                    <span
                      className="border1"
                      style={{ fontFamily: "Mulish, sans-serif" }}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                ml: { xs: 1 },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "15px", xs: "2px" },
                }}
              >
                <Typography sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}>
                  Property Manager Stays at Property
                </Typography>
              </Grid>
              <Grid
                item
                mt={1.5}
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                }}
              >
                {yesOrNo.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setPropertyManagedStaysAtProperty(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="16516"
                      value={item}
                      checked={propertyManagedStaysAtProperty === item}
                      readOnly
                    />
                    <span
                      className="border1"
                      style={{ fontFamily: "Mulish, sans-serif" }}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}

      {positionStatusError && (
        <Box
          sx={{
            width: "80%",
            backgroundColor: "#ff7675",
            py: 2,
            mx: "auto",
            borderRadius: "20px",
            border: "1px solid #000",
            textAlign: "center",
          }}
        >
          {positionStatusHelperText}
        </Box>
      )}

      {!detailsId && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            pt: 2,
          }}
        >
          <Button
            color="inherit"
            onClick={() => {
              back();
              send();
            }}
          >
            Back
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              validateField();
            }}
          >
            Next
          </Button>
        </Box>
      )}
      {detailsId && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            pt: 2,
          }}
        >
          <Button
            color="inherit"
            onClick={() => {
              back();
            }}
          >
            Back
          </Button>
          <Box>
            <Button
              color="inherit"
              onClick={() => {
                validateField();
              }}
            >
              update
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PropertyDetails;
