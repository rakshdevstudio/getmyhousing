import React, { useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import "./Commercial.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  servicesSale,
  suitableForOptions,
  locatednearme,
  availableForOptions1,
  abouttheproperty,
  locationHubOptions,
  owenershiptype,
  positionstatus,
  propertyManage,
  ageofproperty,
  occupancydays,
  yesOrNo,
  hotelResortTypeOptions,
  availablefrom,
} from "../../../../../common/common";

const PropertyStatus = ({
  next,
  back,
  formData,
  updateFormData,
  detailsId,
}) => {
  const [showavailablefromdate, setshowavailablefromdate] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");

  const [showDate, setshowDate] = useState(false);

  const [availableFor, setAvailableFor] = useState(formData.availableFor);
  const [positionStatus, setPositionStatus] = useState(formData.positionStatus);
  const [positionStatusDate, setPositionStatusDate] = useState(
    formData.positionStatusDate
  );
  const [availbleFrom, setAvailableFrom] = useState(formData.availbleFrom);
  const [occupancyDays, setOccupancyDays] = useState(formData.occupancyDays);
  const [ageofProperty, setAgeofProperty] = useState(formData.ageofProperty);
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
  const [abtproperty, setabtproperty] = useState(formData.abtproperty);
  const [abtproperty1, setabtproperty1] = useState(formData.abtproperty1);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setabtproperty([...abtproperty, value]);
    } else {
      setabtproperty(abtproperty.filter((item) => item !== value));
    }
  };

  const handleCheckboxChange1 = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setabtproperty1([...abtproperty1, value]);
    } else {
      setabtproperty1(abtproperty1.filter((item) => item !== value));
    }
  };

  const data4 = {
    availableFor,
    positionStatus,
    positionStatusDate,
    availbleFrom,
    occupancyDays,
    ageofProperty,
    owenershipType,
    propertyManagedBy,
    propertyManagedStaysAtProperty,
    widthOfPropertyStatus,
    heightSealingOfPropertyStatus,
    locationHub,
    widthUnitOfPropertyStatus,
    heightSealingUnitOfPropertyStatus,
    locatedNear,
    hotelResortType,
    propertySuitableFor,
    govtApproved,
    abtproperty,
    abtproperty1,
  };
  const send = () => updateFormData(data4);

  useEffect(() => {
    if (availbleFrom === "Later") setshowavailablefromdate(true);
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
          <Typography
            variant="h5"
            sx={{
              ml: { md: 1 },
              mb: { md: 3 },
              fontSize: "25px",
              fontWeight: 600,
            }}
          >
            Property Status
          </Typography>
          <Grid
            container
            sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}
          >
            {formData.propertiesType === "Hotel/Resorts" && (
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
                      mb: { md: 1 },
                    }}
                  >
                    Hotel/Resort Type
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
                    mt: { md: 1 },
                  }}
                >
                  {hotelResortTypeOptions.map((item) => (
                    <label
                      className="mydict1 border1"
                      onChange={(event) => {
                        setHotelResortType(event.target.value);
                      }}
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "30px" }}
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
              <Grid
                item
                md={12}
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "2px" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 1.5,
                  }}
                >
                  Available For
                </Typography>
              </Grid>
              <Grid
                md={12}
                item
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                  mt: { md: 1 },
                }}
              >
                {availableForOptions1.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setAvailableFor(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "20px" }}
                  >
                    <input
                      type="radio"
                      name="201"
                      value={item}
                      checked={availableFor === item}
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
                md={12}
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "20px", xs: "2px" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 1.5,
                  }}
                >
                  Position Status
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
                  mt: { md: 1 },
                }}
              >
                {positionstatus.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setPositionStatus(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "20px" }}
                  >
                    <input
                      type="radio"
                      name="202"
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
              {showDate && (
                <Grid container sx={{ mt: -1.5, mb: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(date) => {
                        setPositionStatusDate(date);
                      }}
                      value={positionStatusDate}
                    />
                  </LocalizationProvider>
                </Grid>
              )}
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
                md
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "20px", xs: "2px" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 1.5,
                  }}
                >
                  Available From
                </Typography>
              </Grid>
              <Grid
                container
                mt={1}
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                  mt: { md: 1 },
                }}
              >
                {availablefrom.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setAvailableFrom(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "20px" }}
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
                <Box sx={{ maxHeight: "100%", maxWidth: "100%" }}>
                  <Grid md={6} xs={6} mt={1} mb={1} ml={-0.5}>
                    <input
                      type="date"
                      id="date"
                      value={selectedDate}
                      style={{
                        height: "50px",
                        width: "164px",
                        marginLeft: "5px",
                        fontSize: "15px",
                        paddingLeft: "20px",
                        marginTop: "10px",
                        marginBottom: "15px",
                      }}
                      onChange={(event) => {
                        setSelectedDate(event.target.value);
                      }}
                    />
                  </Grid>
                </Box>
              )}
            </Grid>

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
                md={12}
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "20px", xs: "2px" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 1.5,
                  }}
                >
                  Occupancy Days
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
                  mt: { md: 1 },
                }}
              >
                {occupancydays.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setOccupancyDays(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "20px" }}
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
                md={12}
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "20px", xs: "2px" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 1.5,
                  }}
                >
                  Age of Property (In Years)
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
                  mt: { md: 1 },
                }}
              >
                {ageofproperty.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setAgeofProperty(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "20px" }}
                  >
                    <input
                      type="radio"
                      name="205"
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
                  marginTop: { md: "20px", xs: "2px" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 1.5,
                  }}
                >
                  Ownership Type
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
                  mt: { md: 1 },
                }}
              >
                {owenershiptype.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setOwenershipType(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "20px" }}
                  >
                    <input
                      type="radio"
                      name="206"
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
            {formData.propertiesType === "Retail Shop/Showroom" && (
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
                    marginTop: { md: "20px", xs: "2px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      mb: 1.5,
                    }}
                  >
                    About the Property (Suitable for)
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
                    mt: { md: 1 },
                  }}
                >
                  {abouttheproperty.map((label, index) => (
                    <label
                      className="mydict1 border1"
                      onChange={handleCheckboxChange}
                      key={index}
                      style={{ marginRight: "15px", marginBottom: "20px" }}
                    >
                      <input
                        type="checkbox"
                        name={`radi7${index + 1}`}
                        value={label}
                      />
                      <span
                        className="border1"
                        style={{ fontFamily: "Mulish, sans-serif" }}
                      >
                        {label}
                      </span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            )}

            {formData.propertiesType === "Retail Shop/Showroom" && (
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
                    marginTop: { md: "10px", xs: "2px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      mb: 1.5,
                    }}
                  >
                    Location Hub
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
                    mt: { md: 1 },
                  }}
                >
                  {servicesSale.map((label, index) => (
                    <label
                      className="mydict1 border1"
                      onChange={handleCheckboxChange1}
                      key={index}
                      style={{ marginRight: "15px", marginBottom: "20px" }}
                    >
                      <input
                        type="checkbox"
                        name={`radi7${index + 1}`}
                        value={label}
                      />
                      <span
                        className="border1"
                        style={{ fontFamily: "Mulish, sans-serif" }}
                      >
                        {label}
                      </span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            )}

            {(formData.propertiesType === "Commercial Plot/Land" ||
              formData.propertiesType === "Industrial Plot/Land") && (
              <Grid item sx={{ mb: { md: 1 }, minWidth: { md: "100%" } }}>
                <TextField
                  label="Govt Approved"
                  id="demo-simple-select"
                  sx={{ minWidth: { md: "43%" } }}
                  value={govtApproved}
                  onChange={(event) => {
                    setGovtApproved(event.target.value);
                  }}
                ></TextField>
              </Grid>
            )}
            {(formData.propertiesType === "Commercial Building" ||
              formData.propertiesType === "Guest House/Banquet Hall" ||
              formData.propertiesType === "Hotel/Resorts" ||
              formData.propertiesType === "Shopping Mall" ||
              formData.propertiesType === "Retail Shop/Showroom" ||
              formData.propertiesType === "Industrial Building") && (
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
                  md={12}
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "20px", xs: "10px" },
                    mb: { xs: 1 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    About the Property (Suitable for)
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
                    mt: { md: 0.5 },
                  }}
                >
                  {suitableForOptions.map((item) => (
                    <label
                      className="mydict1 border1"
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "15px" }}
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
            {(formData.propertiesType === "Commercial Building" ||
              formData.propertiesType === "Rooftop") && (
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
                  md={12}
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "15px", xs: "15px" },
                    mb: { xs: 1 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography
                    sx={{ fontSize: "18px", fontWeight: 600, mb: { md: 0.5 } }}
                  >
                    Location Hub
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
                    mt: { md: 0.5 },
                  }}
                >
                  {(formData.propertiesType === "Rooftop"
                    ? servicesSale
                    : locationHubOptions
                  ).map((item) => (
                    <label
                      className="mydict1 border1"
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "15px" }}
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
            {formData.propertiesType === "Retail Shop/Showroom" && (
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
                  md={12}
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "20px", xs: "10px" },
                    mb: { xs: 1 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography
                    sx={{ fontSize: "18px", fontWeight: 600, mb: { md: 0.5 } }}
                  >
                    Located Near
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
                    mt: { md: 0.5 },
                  }}
                >
                  {locatednearme.map((item) => (
                    <label
                      className="mydict1 border1"
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "15px" }}
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
            Property Status
          </Typography>
          <Grid
            container
            sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}
          >
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
                md={12}
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 1 },
                  mr: { xs: "30%" },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 1.5 }}>
                  Property Managed By
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
                  mt: { md: 0.5 },
                }}
              >
                {propertyManage.map((item) => (
                  <label
                    className="mydict1 border1"
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "20px" }}
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
                flexDirection: "row",
                flexWrap: "wrap",
                ml: { xs: 1 },
              }}
            >
              <Grid
                item
                md={12}
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "15px", xs: "2px" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 1.5,
                  }}
                >
                  Property Manager Stays at Property 
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
                  mt: { md: 1 },
                }}
              >
                {yesOrNo.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setPropertyManagedStaysAtProperty(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "20px" }}
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
            sx={{ fontSize: "15px", fontWeight: 500 }}
            color="inherit"
            onClick={() => {
              back();
              send();
            }}
          >
            Back
          </Button>
          <Button
            sx={{ fontSize: "15px", fontWeight: 500 }}
            color="inherit"
            onClick={() => {
              next();
              send();
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
            sx={{ fontSize: "15px", fontWeight: 500 }}
            color="inherit"
            onClick={() => {
              back();
            }}
          >
            Back
          </Button>
          <Box>
            <Button
              sx={{ fontSize: "15px", fontWeight: 500 }}
              color="inherit"
              onClick={() => {
                send();
                next();
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

export default PropertyStatus;
