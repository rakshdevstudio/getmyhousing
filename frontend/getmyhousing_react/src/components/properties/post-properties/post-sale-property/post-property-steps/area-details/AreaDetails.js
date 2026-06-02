import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Typography,
  InputLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Box, Grid, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./../Commercial.css";
import ClearIcon from "@mui/icons-material/Clear";
import {
  units,
  yesOrNo,
  spaceTypeOptions,
  numberOfBedroomOptions,
  numberOfBathRoomOptions,
  numberOfBalconiesOptions,
  numberOfBalconiesOptionsStudio,
  additionalRoomSOptions,
  additionalRoomSOptions1,
  pgForOptions,
  bestSuitedForOptions,
  propertyLevelOptions,
  commonAreaOptions,
  openSidesOptions,
  estateOptions,
  facingList,
} from "./../../../../../../common/common";

import {
  floorOptions,
  shopFloorOptions,
  washroomount,
  rooms,
} from "./AreaDetailCommon";

const AreaDetails = ({ next, back, formData, updateFormData, detailsId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showFloors, setshowFloors] = useState(formData.showFloors);
  const [showAreas, setshowAreas] = useState(formData.showAreas);
  const [facing, setfacing] = useState(formData.facing);
  const [preleasedUnit, setpreleasedUnit] = useState(formData.preleasedUnit);
  const [builtupArea, setbuiltupArea] = useState(formData.builtupArea);
  const [superBuiltupArea, setsuperBuiltupArea] = useState(
    formData.superBuiltupArea
  );
  const [carpetArea, setcarpetArea] = useState(formData.carpetArea);

  const [salableArea, setsalableArea] = useState(formData.salableArea);
  const [plotArea, setplotArea] = useState(formData.plotArea);
  const [areaUnit, setAreaUnit] = useState(formData.areaUnit || "sq.ft");
  const [floorNumber, setFloorNumber] = useState(formData.floorNumber);
  const [totalFloor, setTotalFloor] = useState(formData.totalFloor);

  useEffect(() => {
    const newShowFloors = [];
    for (let i = 1; i <= totalFloor?.value; i++) {
      newShowFloors.push(i);
    }
    setshowFloors(newShowFloors);
  }, [totalFloor]);

  const [flatNumber, setFlatNumber] = useState(formData.flatNumber);
  const [keepItPrivate, setKeepItPrivate] = useState(
    formData.keepItPrivate || "No"
  );
  const [cornerUnit, setCornerUnit] = useState(formData.cornerUnit);
  const [occupancyCertificate, setOccupancyCertificate] = useState(
    formData.occupancyCertificate
  );
  const [privateWashRoom, setPrivateWashRoom] = useState(
    formData.privateWashRoom
  );
  const [publicWashRoom, setPublicWashRoom] = useState(formData.publicWashRoom);
  const [pantryOrCafeteria, setPantryOrCafeteria] = useState(
    formData.pantryOrCafeteria
  );
  const [privatePoolAvailability, setprivatePoolAvailability] = useState(
    formData.privatePoolAvailability
  );
  const [privateGardenAvailability, setprivateGardenAvailability] = useState(
    formData.privateGardenAvailability
  );
  const [privateGardenArea, setprivateGardenArea] = useState(
    formData.privateGardenArea
  );

  const [numberOfBedRooms, setnumberOfBedRooms] = useState(
    formData.numberOfBedRooms
  );
  const [numberOfBedRoomsError, setnumberOfBedRoomsError] = useState(false);
  const [numberOfBedRoomsHelperText, setnumberOfBedRoomsHelperText] =
    useState("");
  const [areaSizeError, setAreaSizeError] = useState(false);
  const [areaSizeHelperText, setAreaSizeHelperText] = useState("");
  const [facingError, setFacingError] = useState(false);
  const [facingHelperText, setFacingHelperText] = useState("");
  const [commonErrorHelperText, setCommonErrorHelperText] = useState("");

  function validateField() {
    let validate = true;
    let errorMessages = [];

    // Check if propertiesType is not "Residential Building" or "Farm Plot/Land"
    if (
      formData.propertiesType !== "Farm Plot/Land" &&
      formData.propertiesType !== "Residential Plot/Land" &&
      formData.propertiesType !== "PG Building" &&
      formData.buildingType !== "Commercial" &&
      formData.buildingType !== "Industrial" &&
      formData.propertiesType !== "Residential Building"
    ) {
      // Perform validation for numberOfBedRooms only if the condition is met
      if (!numberOfBedRooms) {
        setnumberOfBedRoomsError(true);
        errorMessages.push("Please Enter the Number of Bedrooms");
        validate = false;
      }
    }

    if (
      formData.propertiesType !== "Farm Plot/Land" &&
      formData.propertiesType !== "Residential Plot/Land" &&
      formData.propertiesType !== "PG Building" &&
      formData.buildingType !== "Commercial" &&
      formData.buildingType !== "Industrial"
    ) {
      if (!facing) {
        setFacingError(true);
        errorMessages.push("Please Select the Property Facing");
        validate = false;
      }
    }

    if (
      !(
        plotArea ||
        salableArea ||
        carpetArea ||
        superBuiltupArea ||
        builtupArea
      )
    ) {
      setAreaSizeError(true);
      errorMessages.push("Please Enter Any One Area Size");
      validate = false;
    }

    if (errorMessages.length > 0) {
      const commonErrorMessage = errorMessages.join(", ");
      setCommonErrorHelperText(commonErrorMessage); // Set the common error message in one place
    }

    if (validate) {
      next();
      send();
    }
  }

  const [numberOfBathRooms, setnumberOfBathRooms] = useState(
    formData.numberOfBathRooms
  );
  const [numberOfBalconies, setnumberOfBalconies] = useState(
    formData.numberOfBalconies
  );
  const [additionalRooms, setadditionalRooms] = useState(
    formData.additionalRooms
  );
  const [towerOrBlockNumber, settowerOrBlockNumber] = useState(
    formData.towerOrBlockNumber
  );
  const [propertyLevel, setpropertyLevel] = useState(formData.propertyLevel);

  const [typeOfEstate, settypeOfEstate] = useState(formData.typeOfEstate);
  const [openSides, setopenSides] = useState(formData.openSides);
  const [terraceAreaFlag, setTerraceAreaFlag] = useState(
    formData.terraceAreaFlag
  );
  const [terraceArea, setTerraceArea] = useState(formData.terraceArea);
  const [showGardenArea, setshowGardenArea] = useState(false);
  const [showTerraceArea, setshowTerraceArea] = useState(false);
  const [spaceType, setspaceType] = useState(formData.spaceType);
  const [numberOfFloorsAllowed, setnumberOfFloorsAllowed] = useState(
    formData.numberOfFloorsAllowed
  );
  const [breadthInFeet, setbreadthInFeet] = useState(formData.breadthInFeet);
  const [lengthInFeet, setlengthInFeet] = useState(formData.lengthInFeet);
  const [numberOfRooms, setnumberOfRooms] = useState(formData.numberOfRooms);
  const [showPrivateWashroomCount, setshowPrivateWashroomCount] =
    useState(false);
  const [showPublicWashroomCount, setshowPublicWashroomCount] = useState(false);
  const [privateWashroomCount, setprivateWashroomCount] = useState(
    formData.privateWashroomCount
  );
  const [publicWashroomCount, setpublicWashroomCount] = useState(
    formData.publicWashroomCount
  );
  const [compoundWallMade, setcompoundWallMade] = useState(
    formData.compoundWallMade
  );
  const [data, setData] = useState(formData.data);
  const [noOfPgBeds, setnoOfPgBeds] = useState(formData.noOfPgBeds);
  const [pgFor, setpgFor] = useState(formData.pgFor);
  const [bestSuitedFor, setbestSuitedFor] = useState(formData.bestSuitedFor);
  const [mealsAvailable, setmealsAvailable] = useState(formData.mealsAvailable);
  const [noticePeriod, setnoticePeriod] = useState(formData.noticePeriod);
  const [noticePeriodType, setnoticePeriodType] = useState(
    formData.noticePeriodType
  );
  const [commonAreas, setcommonAreas] = useState(formData.commonAreas);
  const [pgLockInPeriod, setpgLockInPeriod] = useState(formData.pgLockInPeriod);
  const [pgLockInPeriodType, setpgLockInPeriodType] = useState(
    formData.pgLockInPeriodType
  );
  const [groundFloor, setgroundFloor] = useState(formData.groundFloor);
  const [firstFloor, setfirstFloor] = useState(formData.firstFloor);
  const [secondFloor, setsecondFloor] = useState(formData.secondFloor);
  const [thirdFloor, setthirdFloor] = useState(formData.thirdFloor);
  const [fourthFloor, setfourthFloor] = useState(formData.fourthFloor);
  const [fifthFloor, setfifthFloor] = useState(formData.fifthFloor);
  const [sixthFloor, setsixthFloor] = useState(formData.sixthFloor);
  const [seventhFloor, setseventhFloor] = useState(formData.seventhFloor);
  const [eightFloor, seteightFloor] = useState(formData.eightFloor);
  const [ninethFloor, setninethFloor] = useState(formData.ninethFloor);
  const [tenthFloor, settenthFloor] = useState(formData.tenthFloor);
  const [floorsUnit, setfloorsUnit] = useState(formData.floorsUnit);

  useEffect(() => {
    if (privateGardenAvailability === "Yes") setshowGardenArea(true);
    else setshowGardenArea(false);
  }, [privateGardenAvailability]);

  useEffect(() => {
    if (terraceAreaFlag === "Yes") setshowTerraceArea(true);
    else setshowTerraceArea(false);
  }, [terraceAreaFlag]);

  useEffect(() => {
    if (publicWashRoom === "Yes") setshowPublicWashroomCount(true);
    else setshowPublicWashroomCount(false);
  }, [publicWashRoom]);

  useEffect(() => {
    if (privateWashRoom === "Yes") setshowPrivateWashroomCount(true);
    else setshowPrivateWashroomCount(false);
  }, [privateWashRoom]);

  const data3 = {
    superBuiltupArea,
    seventhFloor,
    eightFloor,
    ninethFloor,
    tenthFloor,
    noOfPgBeds,
    firstFloor,
    facing,
    groundFloor,
    showAreas,
    showFloors,
    secondFloor,
    thirdFloor,
    fourthFloor,
    preleasedUnit,
    fifthFloor,
    sixthFloor,
    plotArea,
    pgLockInPeriod,
    typeOfEstate,
    pgLockInPeriodType,
    data,
    pgFor,
    floorsUnit,
    bestSuitedFor,
    mealsAvailable,
    noticePeriod,
    noticePeriodType,
    commonAreas,
    lengthInFeet,
    numberOfRooms,
    breadthInFeet,
    numberOfFloorsAllowed,
    carpetArea,
    spaceType,
    compoundWallMade,
    privateWashroomCount,
    publicWashroomCount,
    terraceArea,
    privatePoolAvailability,
    privateGardenAvailability,
    privateGardenArea,
    numberOfBedRooms,
    builtupArea,
    numberOfBathRooms,
    numberOfBalconies,
    additionalRooms,
    towerOrBlockNumber,
    areaUnit,
    propertyLevel,
    openSides,
    floorNumber,
    totalFloor,
    flatNumber,
    keepItPrivate,
    cornerUnit,
    occupancyCertificate,
    privateWashRoom,
    publicWashRoom,
    pantryOrCafeteria,
    terraceAreaFlag,
    salableArea,
  };

  const send = () => updateFormData(data3);

  return (
    <>
      {formData.buildingType === "Residential" &&
        formData.propertiesType !== "PG/Co-living" &&
        formData.propertiesType !== "Residential Plot/Land" && (
          <Box sx={{ marginTop: 5, marginBottom: 5 }}>
            <Box>
              <Typography
                sx={{ fontSize: { md: "18px" }, fontWeight: 600, ml: 1 }}
              >
                Area Size <span style={{ color: "red" }}>*</span>
              </Typography>
            </Box>
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
                {formData.propertiesType !== "Residential Building" &&
                  formData.propertiesType !== "PG Building" &&
                  formData.propertiesType !== "Independent House/Bungalow" &&
                  formData.propertiesType !== "Villa" &&
                  formData.propertiesType !== "Farm Plot/Land" &&
                  formData.propertiesType !== "Row House" &&
                  formData.propertiesType !== "Farm House" && (
                    <>
                      {showAreas?.map((item, index) => {
                        if (item === 2) {
                          return (
                            //Built up Area
                            <Grid container>
                              <Grid item md={4} xs={10}>
                                <TextField
                                  label="Built up Area "
                                  id="demo-simple-select"
                                  value={builtupArea}
                                  size={isMobile ? "small" : "medium"}
                                  fullWidth
                                  onChange={(event) => {
                                    setbuiltupArea(event.target.value);
                                    setAreaSizeError(false);
                                    setAreaSizeHelperText("");
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: "30%",
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          disableClearable
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: isMobile
                                                    ? "17px"
                                                    : "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root":
                                                  {
                                                    pr: "0px",
                                                    pl: isMobile && "0px",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "100%",
                                                  },
                                                  pl: "0px",
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={2}
                                sx={{
                                  color: "red",
                                  variant: "outlined",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: isMobile ? "end" : "center",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(2)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(2);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 3) {
                          return (
                            //Carpet Area
                            <Grid container>
                              <Grid item md={4} xs={10}>
                                <TextField
                                  label="Carpet Area"
                                  id="demo-simple-select"
                                  value={carpetArea}
                                  size={isMobile ? "small" : "medium"}
                                  fullWidth
                                  onChange={(event) => {
                                    setcarpetArea(event.target.value);
                                    setAreaSizeError(false);
                                    setAreaSizeHelperText("");
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: "30%",
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          disableClearable
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: isMobile
                                                    ? "17px"
                                                    : "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root":
                                                  {
                                                    pr: "0px",
                                                    pl: isMobile && "0px",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "100%",
                                                  },
                                                  pl: "0px",
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={2}
                                sx={{
                                  color: "red",
                                  variant: "outlined",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: isMobile ? "end" : "center",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(2)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(2);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 4) {
                          return (
                            //Saleble Area
                            <Grid container>
                              <Grid item md={4} xs={10}>
                                <TextField
                                  label="Saleble Area"
                                  id="demo-simple-select"
                                  value={salableArea}
                                  size={isMobile ? "small" : "medium"}
                                  fullWidth
                                  onChange={(event) => {
                                    setsalableArea(event.target.value);
                                    setAreaSizeError(false);
                                    setAreaSizeHelperText("");
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: "30%",
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          disableClearable
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: isMobile
                                                    ? "17px"
                                                    : "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root":
                                                  {
                                                    pr: "0px",
                                                    pl: isMobile && "0px",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "100%",
                                                  },
                                                  pl: "0px",
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={2}
                                sx={{
                                  color: "red",
                                  variant: "outlined",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: isMobile ? "end" : "center",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(2)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(2);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 1) {
                          return (
                            //Super Built up Area
                            <Grid container>
                              <Grid item md={4} xs={10}>
                                <TextField
                                  label="Super Built up Area"
                                  id="demo-simple-select"
                                  value={superBuiltupArea}
                                  size={isMobile ? "small" : "medium"}
                                  fullWidth
                                  onChange={(event) => {
                                    setsuperBuiltupArea(event.target.value);
                                    setAreaSizeError(false);
                                    setAreaSizeHelperText("");
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: "30%",
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          disableClearable
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: isMobile
                                                    ? "17px"
                                                    : "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root":
                                                  {
                                                    pr: "0px",
                                                    pl: isMobile && "0px",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "100%",
                                                  },
                                                  pl: "0px",
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={2}
                                sx={{
                                  color: "red",
                                  variant: "outlined",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: isMobile ? "end" : "center",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(2)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(2);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        }
                        return null;
                      })}
                      {showAreas?.length !== 4 && (
                        <Grid
                          container
                          item
                          md={3}
                          sx={{ display: "flex", mb: 3, ml: 1 }}
                        >
                          <Grid item sx={{ mt: 3 }}>
                            <Box
                              sx={{
                                color: "red",
                                mr: 1,
                              }}
                              onClick={() => {
                                setshowAreas((prevState) => {
                                  for (let i = 1; i <= 6; i++) {
                                    if (!prevState.includes(i)) {
                                      return [...prevState, i];
                                    }
                                  }

                                  return prevState;
                                });
                              }}
                            >
                              + Add More Area Details
                            </Box>
                          </Grid>
                        </Grid>
                      )}
                    </>
                  )}
                {(formData.propertiesType === "Residential Building" ||
                  formData.propertiesType === "PG Building" ||
                  formData.propertiesType === "School and Colleges" ||
                  formData.propertiesType === "Independent House/Bungalow" ||
                  formData.propertiesType === "Villa" ||
                  formData.propertiesType === "Row House" ||
                  formData.propertiesType === "Farm Plot/Land" ||
                  formData.propertiesType === "Farm House") && (
                    <>
                      {showAreas?.map((item, index) => {
                        if (item === 1) {
                          return (
                            //Plot Area
                            <Grid container>
                              <Grid item md={4} xs={10}>
                                <TextField
                                  label="Plot Area"
                                  id="demo-simple-select"
                                  value={plotArea}
                                  size={isMobile ? "small" : "medium"}
                                  fullWidth
                                  onChange={(event) => {
                                    setplotArea(event.target.value);
                                    setAreaSizeError(false);
                                    setAreaSizeHelperText("");
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: "30%",
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          disableClearable
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: isMobile
                                                    ? "17px"
                                                    : "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "1%",
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                            </Grid>
                          );
                        }
                        return null;
                      })}

                      {/* {showAreas?.map((item, index) => {
                      if (item === 2) {
                        return (
                          <Grid container>
                            <Grid item md={3.5} xs={12}>
                              <TextField
                                label="Super Built up Area "
                                id="demo-simple-select"
                                value={superBuiltupArea}
                                sx={{ minWidth: { md: "1%", xs: "90%" } }}
                                onChange={(event) => {
                                  setsuperBuiltupArea(event.target.value);
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <Grid
                                      item
                                      sx={{
                                        maxWidth: { md: "30%", xs: "40%" },
                                        maxHeight: "50px",
                                        mt: -3,
                                      }}
                                    >
                                      <Autocomplete
                                        value={areaUnit}
                                        onChange={(event, newValue) => {
                                          setAreaUnit(newValue);
                                        }}
                                        options={units}
                                        isOptionEqualToValue={(option, value) => option === value}
                                        renderInput={(params) => (
                                          <Box
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Box
                                              item
                                              sx={{
                                                color: "black",
                                                fontFamily: "Inter",
                                                fontSize: "24px",
                                                ml: 1,
                                              }}
                                            >
                                              |
                                            </Box>
                                            <TextField
                                              {...params}
                                              label="Unit"
                                              variant="outlined"
                                              sx={{
                                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    pr: "0px",
                                                    pl: isMobile && "0px",
                                                  },
                                                minWidth: {
                                                  md: "100%",
                                                  xs: "100%",
                                                },
                                                pl: "0px",
                                              }}
                                            />
                                          </Box>
                                        )}
                                      />
                                    </Grid>
                                  ),
                                }}
                              ></TextField>
                            </Grid>
                            <Grid
                              item
                              md={1}
                              xs={2}
                              sx={{
                                color: "red",
                                variant: "outlined",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: isMobile ? "end" : "center",
                              }}
                              onClick={() => {
                                if (
                                  showAreas?.length >= 2 &&
                                  showAreas?.includes(2)
                                ) {
                                  setshowAreas((prevState) => {
                                    const indexToRemove =
                                      prevState.lastIndexOf(2);
                                    return prevState
                                      .slice(0, indexToRemove)
                                      .concat(
                                        prevState.slice(indexToRemove + 1)
                                      );
                                  });
                                }
                              }}
                            >
                              <ClearIcon />
                            </Grid>
                          </Grid>
                        );
                      }
                      return null;
                    })} */}

                      {showAreas?.map((item, index) => {
                        if (item === 2) {
                          return (
                            //Super Built up Area
                            <Grid container>
                              <Grid item md={4} xs={10}>
                                <TextField
                                  label="Super Built up Area"
                                  id="demo-simple-select"
                                  value={superBuiltupArea}
                                  size={isMobile ? "small" : "medium"}
                                  fullWidth
                                  onChange={(event) => {
                                    setsuperBuiltupArea(event.target.value);
                                    setAreaSizeError(false);
                                    setAreaSizeHelperText("");
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: "30%",
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          disableClearable
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: isMobile
                                                    ? "17px"
                                                    : "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root":
                                                  {
                                                    pr: "0px",
                                                    pl: isMobile && "0px",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "100%",
                                                  },
                                                  pl: "0px",
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={2}
                                sx={{
                                  color: "red",
                                  variant: "outlined",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: isMobile ? "end" : "center",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(2)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(2);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 3) {
                          return (
                            //Built up Area
                            <Grid container>
                              <Grid item md={4} xs={10}>
                                <TextField
                                  label="Built up Area "
                                  id="demo-simple-select"
                                  value={builtupArea}
                                  size={isMobile ? "small" : "medium"}
                                  fullWidth
                                  onChange={(event) => {
                                    setbuiltupArea(event.target.value);
                                    setAreaSizeError(false);
                                    setAreaSizeHelperText("");
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: "30%",
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          disableClearable
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: isMobile
                                                    ? "17px"
                                                    : "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root":
                                                  {
                                                    pr: "0px",
                                                    pl: isMobile && "0px",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "100%",
                                                  },
                                                  pl: "0px",
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={2}
                                sx={{
                                  color: "red",
                                  variant: "outlined",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: isMobile ? "end" : "center",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(2)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(2);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 4) {
                          return (
                            //Carpet Area
                            <Grid container>
                              <Grid item md={4} xs={10}>
                                <TextField
                                  label="Carpet Area"
                                  id="demo-simple-select"
                                  value={carpetArea}
                                  size={isMobile ? "small" : "medium"}
                                  fullWidth
                                  onChange={(event) => {
                                    setcarpetArea(event.target.value);
                                    setAreaSizeError(false);
                                    setAreaSizeHelperText("");
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: "30%",
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          disableClearable
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: isMobile
                                                    ? "17px"
                                                    : "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root":
                                                  {
                                                    pr: "0px",
                                                    pl: isMobile && "0px",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "100%",
                                                  },
                                                  pl: "0px",
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={2}
                                sx={{
                                  color: "red",
                                  variant: "outlined",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: isMobile ? "end" : "center",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(2)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(2);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 5) {
                          return (
                            //Saleble Area
                            <Grid container>
                              <Grid item md={4} xs={10}>
                                <TextField
                                  label="Saleble Area"
                                  id="demo-simple-select"
                                  value={salableArea}
                                  size={isMobile ? "small" : "medium"}
                                  fullWidth
                                  onChange={(event) => {
                                    setsalableArea(event.target.value);
                                    setAreaSizeError(false);
                                    setAreaSizeHelperText("");
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: "30%",
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          disableClearable
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: isMobile
                                                    ? "17px"
                                                    : "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root":
                                                  {
                                                    pr: "0px",
                                                    pl: isMobile && "0px",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "100%",
                                                  },
                                                  pl: "0px",
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={2}
                                sx={{
                                  color: "red",
                                  variant: "outlined",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: isMobile ? "end" : "center",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(2)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(2);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        }
                        return null;
                      })}
                      <Grid
                        container
                        item
                        md={3}
                        sx={{ display: "flex", mb: 3, ml: 1 }}
                      >
                        <Grid item mt={3}>
                          <Box
                            sx={{
                              color: "red",
                              mr: 1,
                            }}
                            onClick={() => {
                              setshowAreas((prevState) => {
                                for (let i = 1; i <= 6; i++) {
                                  if (!prevState.includes(i)) {
                                    return [...prevState, i];
                                  }
                                }

                                return prevState;
                              });
                            }}
                          >
                            + Add More Area Details
                          </Box>
                        </Grid>
                      </Grid>
                    </>
                  )}

                {formData.propertiesType === "Residential Building" && (
                  <Grid container>
                    <Grid item xs={12}>
                      <Autocomplete
                        value={totalFloor}
                        options={floorOptions}
                        onChange={(event, newValue) => {
                          setTotalFloor(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Total Floors 2"
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}

                {formData.propertiesType !== "Studio Flat" &&
                  formData.propertiesType !== "Farm Plot/Land" &&
                  formData.propertiesType !== "Residential Building" && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        m: 1,
                      }}
                    >
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: { md: "18px" },
                            fontWeight: 600,
                            display: "flex",
                            whiteSpace: "nowrap",
                            mb: 2,
                          }}
                        >
                          Private Pool Availability
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
                        {yesOrNo.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setprivatePoolAvailability(event.target.value);
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                              marginBottom: "15px",
                              userSelect: "none",
                            }}
                          >
                            <input
                              type="radio"
                              name="privatePoolAvailability"
                              value={item}
                              checked={privatePoolAvailability === item}
                              onChange={(event) => {
                                setprivatePoolAvailability(event.target.value);
                              }}
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

                {formData.propertiesType === "Pent House" &&
                  formData.propertiesType !== "Farm Plot/Land" &&
                  formData.propertiesType !== "Residential Building" && (
                    <>
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          ml: { xs: 1 },
                          mb: { xs: 1.5 },
                        }}
                      >
                        <Grid
                          container
                          sx={{
                            marginRight: { md: "17px", xs: "10px" },
                            marginTop: { md: "15px", xs: "10px" },
                            mb: { xs: 1.5 },
                          }}
                        >
                          <Typography
                            sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                          >
                            Terrace Area 2
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
                          {yesOrNo.map((item) => (
                            <label
                              className="mydict1 border1"
                              onChange={(event) => {
                                setTerraceAreaFlag(event.target.value);
                              }}
                              key={item}
                              style={{
                                marginRight: "15px",
                                marginBottom: "15px",
                              }}
                            >
                              <input
                                type="radio"
                                name="20rfsa1"
                                value={item}
                                checked={terraceAreaFlag === item}
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
                      {showTerraceArea && (
                        <Grid container>
                          <TextField
                            label="Terrace Area in Sq.ft"
                            sx={{ maxWidth: { md: "100%" } }}
                            value={terraceArea}
                            onChange={(event) => {
                              setTerraceArea(event.target.value);
                            }}
                          ></TextField>
                        </Grid>
                      )}
                    </>
                  )}

                {formData.propertiesType !== "Residential Building" &&
                  formData.propertiesType !== "Farm Plot/Land" && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        m: 1,
                      }}
                    >
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: { md: "18px" },
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          Private Garden Availability
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
                        {yesOrNo.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setprivateGardenAvailability(event.target.value);
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                              marginBottom: "15px",
                            }}
                          >
                            <input
                              type="radio"
                              name="20sa1"
                              value={item}
                              checked={privateGardenAvailability === item}
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

                {showGardenArea && (
                  <Grid item>
                    <TextField
                      label="Garden Area in Sq.ft"
                      sx={{ maxWidth: { md: "100%" } }}
                      value={privateGardenArea}
                      onChange={(event) => {
                        setprivateGardenArea(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                )}

                {
                  // formData.propertiesType !== "Residential Building" &&
                  formData.propertiesType !== "Farm Plot/Land" && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        m: 1,
                      }}
                    >
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: { md: "18px" },
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          <>
                            {formData.propertiesType === "PG Building"
                              ? "Number of Rooms"
                              : "Number of Bedrooms"}{" "}
                            <span style={{ color: "red" }}>*</span>
                          </>

                        </Typography>
                      </Grid>
                      <Grid
                        container
                        className="mydict"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          flexGrow: 1,
                          flexWrap: "wrap",
                          mt: 1,
                        }}
                      >
                        {numberOfBedroomOptions.map(
                          (item) =>
                            (formData.propertiesType !== "PG Building" ||
                              item !== "Studio") && (
                              <label
                                className="mydict1 border1"
                                onChange={(event) => {
                                  setnumberOfBedRooms(event.target.value);
                                  setnumberOfBedRoomsError(false);
                                  setnumberOfBedRoomsHelperText("");
                                }}
                                key={item}
                                style={{
                                  marginRight: "15px",
                                }}
                              >
                                <input
                                  type="radio"
                                  name="20ss1"
                                  value={item}
                                  checked={numberOfBedRooms === item}
                                  readOnly
                                />
                                <span className="border1">{item}</span>
                              </label>
                            )
                        )}
                      </Grid>
                      {formData.propertiesType === "PG Building" && (
                        <Grid container sx={{ maxWidth: { md: "25.3%" } }}>
                          <Autocomplete
                            value={numberOfBedRooms}
                            freeSolo
                            onChange={(event, newValue) => {
                              setnumberOfBedRooms(newValue);
                            }}
                            options={rooms}
                            isOptionEqualToValue={(option, value) =>
                              option === value
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={
                                  formData.propertiesType === "PG Building"
                                    ? "Select/Enter no. of rooms"
                                    : "Select/Enter no. of bath rooms"
                                }
                                variant="outlined"
                                sx={{ maxWidth: { md: "80%" } }}
                              />
                            )}
                          />
                        </Grid>
                      )}
                    </Grid>
                  )
                }

                {formData.propertiesType !== "Farm Plot/Land" && (
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      ml: { xs: 1 },
                      mb: { xs: 1.5 },
                    }}
                  >
                    <Grid
                      item
                      sx={{
                        marginRight: { md: "17px", xs: "10px" },
                        marginTop: { md: "15px", xs: "10px" },
                        mb: { xs: 1.5 },
                      }}
                    >
                      <Typography
                        sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                      >
                        Number of Bathrooms
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      className="mydict"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexGrow: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {numberOfBathRoomOptions.map((item) => (
                        <label
                          className="mydict1 border1"
                          onChange={(event) => {
                            setnumberOfBathRooms(event.target.value);
                          }}
                          key={item}
                          style={{ marginRight: "15px", marginBottom: "25px" }}
                        >
                          <input
                            type="radio"
                            name="20dsa1"
                            value={item}
                            checked={numberOfBathRooms === item}
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
                    {formData.propertiesType === "PG Building" && (
                      <Grid container sx={{ maxWidth: { md: "25.3%" } }}>
                        <Autocomplete
                          value={numberOfBathRooms}
                          freeSolo
                          onChange={(event, newValue) => {
                            setnumberOfBathRooms(newValue);
                          }}
                          options={rooms}
                          isOptionEqualToValue={(option, value) => option === value}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select/Enter no. of bath rooms"
                              variant="outlined"
                              sx={{ maxWidth: { md: "80%" } }}
                            />
                          )}
                        />
                      </Grid>
                    )}
                  </Grid>
                )}

                {formData.propertiesType !== "Farm Plot/Land" && (
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      m: 1,
                    }}
                  >
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: { md: "18px" },
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        Number of Balconies
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      className="mydict"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexGrow: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {(formData.propertiesType === "Studio Flat"
                        ? numberOfBalconiesOptionsStudio
                        : numberOfBalconiesOptions
                      ).map((item) => (
                        <label
                          className="mydict1 border1"
                          onChange={(event) => {
                            setnumberOfBalconies(event.target.value);
                          }}
                          key={item}
                          style={{ marginRight: "15px" }}
                        >
                          <input
                            type="radio"
                            name="20eds1"
                            value={item}
                            checked={numberOfBalconies === item}
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
                    {formData.propertiesType === "PG Building" && (
                      <Grid container sx={{ maxWidth: { md: "25.3%" } }}>
                        <Autocomplete
                          value={numberOfBalconies}
                          freeSolo
                          onChange={(event, newValue) => {
                            setnumberOfBalconies(newValue);
                          }}
                          options={rooms}
                          isOptionEqualToValue={(option, value) => option === value}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select/Enter no. of balconies"
                              variant="outlined"
                              sx={{ maxWidth: { md: "80%" } }}
                            />
                          )}
                        />
                      </Grid>
                    )}
                  </Grid>
                )}

                {formData.propertiesType !== "Studio Flat" &&
                  formData.propertiesType !== "PG Building" &&
                  formData.propertiesType !== "Farm Plot/Land" && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        m: 1,
                      }}
                    >
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: { md: "18px" },
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          Additional Rooms
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
                        {additionalRoomSOptions.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setadditionalRooms(event.target.value);
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                            }}
                          >
                            <input
                              type="radio"
                              name="20wds1"
                              value={item}
                              checked={additionalRooms === item}
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
                {formData.propertiesType === "PG Building" && (
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      ml: { xs: 1 },
                      mb: { xs: 1.5 },
                    }}
                  >
                    <Grid
                      item
                      sx={{
                        marginRight: { md: "17px", xs: "10px" },
                        marginTop: { md: "15px", xs: "10px" },
                        mb: { xs: 1.5 },
                      }}
                    >
                      <Typography
                        sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                      >
                        Additional Rooms
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
                      {additionalRoomSOptions1.map((item) => (
                        <label
                          className="mydict1 border1"
                          onChange={(event) => {
                            setadditionalRooms(event.target.value);
                          }}
                          key={item}
                          style={{
                            marginRight: "15px",
                            marginBottom: "25px",
                          }}
                        >
                          <input
                            type="radio"
                            name="20wds1"
                            value={item}
                            checked={additionalRooms === item}
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

                {formData.propertiesType !== "Residential Building" &&
                  formData.propertiesType !== "PG Building" &&
                  formData.propertiesType !== "Farm Plot/Land" && (
                    <Grid item xs={12} md={3.5}>
                      <Autocomplete
                        value={floorNumber}
                        options={
                          formData.propertiesType === "Retail Shop/Showroom"
                            ? shopFloorOptions
                            : floorOptions
                        }
                        onChange={(event, newValue) => {
                          setFloorNumber(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Floor Number"
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                          />
                        )}
                      />
                    </Grid>
                  )}

                {formData.propertiesType !== "Residential Building" &&
                  formData.propertiesType !== "Studio Flat" &&
                  formData.propertiesType !== "Farm Plot/Land" && (
                    <Grid container>
                      <Grid item xs={12}>
                        <Autocomplete
                          value={totalFloor}
                          options={floorOptions}
                          onChange={(event, newValue) => {
                            setTotalFloor(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Total Floors"
                              variant="outlined"
                              size={isMobile ? "small" : "medium"}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  )}
                {formData.propertiesType !== "PG Building" &&
                  formData.propertiesType !== "Independent House/Bungalow" &&
                  formData.propertiesType !== "Villa" &&
                  formData.propertiesType !== "Residential Building" &&
                  formData.propertiesType !== "Row House" &&
                  formData.propertiesType !== "Farm House" &&
                  formData.propertiesType !== "Farm Plot/Land" && (
                    <Grid item xs={12} md={12}>
                      <TextField
                        label="Tower/Block Number"
                        id="demo-simple-select"
                        value={towerOrBlockNumber}
                        size={isMobile ? "small" : "medium"}
                        onChange={(event) => {
                          settowerOrBlockNumber(event.target.value);
                        }}
                      ></TextField>
                    </Grid>
                  )}
                {formData.propertiesType === "Farm Plot/Land" && (
                  <>
                    <Grid
                      item
                      md={12}
                      sx={{
                        marginRight: { md: "17px", xs: "5px" },
                        marginTop: { md: "15px", xs: "10px" },
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "18px" },
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        Open Sides
                      </Typography>
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
                        {openSidesOptions.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setopenSides(event.target.value);
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                            }}
                          >
                            <input
                              type="radio"
                              name="20rertj4"
                              value={item}
                              checked={openSides === item}
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
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <Grid
                        item
                        sx={{
                          marginRight: { md: "17px", xs: "10px" },
                          marginTop: { md: "15px", xs: "10px" },
                          mb: 1.5,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                        >
                          Compounded Wall Made
                        </Typography>
                      </Grid>
                      <Grid
                        container
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
                              setcompoundWallMade(event.target.value);
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                              marginBottom: "15px",
                            }}
                          >
                            <input
                              type="radio"
                              name="2ikujyh01"
                              value={item}
                              checked={compoundWallMade === item}
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
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        mt: 2,
                      }}
                    >
                      <Grid
                        item
                        sx={{
                          marginRight: { md: "17px", xs: "10px" },
                          marginTop: { md: "15px", xs: "10px" },
                          mb: 1.5,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                        >
                          {formData.propertiesType === "Industrial Plot/Land" ||
                            formData.propertiesType === "Commercial Plot/Land"
                            ? "Corner Plot/Land"
                            : "Corner Unit"}
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
                        {yesOrNo.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setCornerUnit(event.target.value);
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                              marginBottom: "15px",
                            }}
                          >
                            <input
                              type="radio"
                              name="201"
                              value={item}
                              checked={cornerUnit === item}
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
                  </>
                )}

                {(formData.propertiesType === "Industrial Plot/Land" ||
                  formData.propertiesType === "Commercial Plot/Land" ||
                  formData.buildingType === "Residential" ||
                  formData.propertiesType === "Warehouse/Godown" ||
                  formData.subProperty === "Warehouse/Godown" ||
                  formData.propertiesType === "Shopping Mall" ||
                  formData.subProperty === "Shopping Mall" ||
                  formData.propertiesType === "Commercial Building" ||
                  formData.subProperty === "Commercial Building" ||
                  formData.propertiesType === "Hotel/Resorts" ||
                  formData.subProperty === "Hotel/Resorts" ||
                  formData.propertiesType === "Retail Shop/Showroom" ||
                  formData.propertiesType === "Guest House/Banquet Hall" ||
                  formData.propertiesType === "Estate/Plantation" ||
                  formData.propertiesType === "Industrial Building" ||
                  formData.subProperty === "Industrial Building" ||
                  formData.subProperty === "Shed/Factory" ||
                  formData.propertiesType === "Shed/Factory") && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginRight: { md: "10%" },
                        m: 1,
                        mt: 2,
                      }}
                    >
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: { md: "18px" },
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          Facing <span style={{ color: "red" }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        className="mydict"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          flexGrow: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {facingList.map((item) => (
                          <label
                            className="mydict1 border1"
                            key={item}
                            style={{ marginRight: "15px" }}
                          >
                            <input
                              type="radio"
                              name="facingGroup" // Use a common name for radio button group
                              onChange={() => {
                                setfacing(item);
                                setFacingError(false);
                                setFacingHelperText("");
                              }}
                              value={item}
                              checked={facing === item}
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

                <Grid container>
                  <Grid item>
                    <TextField
                      label="Unit No"
                      id="demo-simple-select"
                      value={flatNumber}
                      size={isMobile ? "small" : "medium"}
                      onChange={(event) => {
                        setFlatNumber(event.target.value);
                      }}
                    ></TextField>
                  </Grid>

                  <Grid container>
                    <Grid container ml={1}>
                      <label>
                        <input
                          type="checkbox"
                          name="radio6"
                          checked={keepItPrivate === "Yes"}
                          onChange={(event) => {
                            // setKeepItPrivate((prevValue) => !prevValue);
                            if (event.target.checked) {
                              setKeepItPrivate("Yes");
                            } else {
                              setKeepItPrivate("No");
                            }
                          }}
                        />{" "}
                        Keep it private
                      </label>
                    </Grid>
                  </Grid>
                </Grid>

                {formData.propertiesType !== "PG Building" &&
                  formData.propertiesType !== "Farm Plot/Land" &&
                  formData.subProperty !== "Office Space" &&
                  formData.subProperty !== "Retail Shop/Showroom" &&
                  formData.subProperty !== "Office Space in IT Park/SEZ" &&
                  formData.propertiesType !== "Residential Building" && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        m: 1,
                        mt: 2,
                      }}
                    >
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: { md: "18px" },
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          Property Level
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
                        {propertyLevelOptions.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setpropertyLevel(event.target.value);
                            }}
                            key={item}
                          >
                            <input
                              type="radio"
                              name="20gr2"
                              value={item}
                              checked={propertyLevel === item}
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
                {formData.buildingType === "Residential" &&
                  formData.propertiesType !== "Farm Plot/Land" && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        flexWrap: "wrap",
                        m: 1,
                      }}
                    >
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: { md: "18px" },
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          Corner Unit
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
                        {yesOrNo.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setCornerUnit(event.target.value);
                            }}
                            key={item}
                          >
                            <input
                              type="radio"
                              name="201"
                              value={item}
                              checked={cornerUnit === item}
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
                {formData.propertyListingType === "Sale" &&
                  formData.propertiesType === "Farm Plot/Land" &&
                  formData.propertiesType === "Residential Plot/Land" && (
                    <Grid container>
                      <Grid
                        item
                        sx={{
                          marginRight: {
                            md: "17px",
                            xs: "5px",
                          },
                          marginTop: {
                            md: "15px",
                            xs: "2px",
                          },
                        }}
                      >
                        <TextField
                          label="Govt Approved"
                          sx={{ maxWidth: { md: "96%" } }}
                        ></TextField>
                      </Grid>
                    </Grid>
                  )}

                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    m: 1,
                  }}
                >
                  {formData.propertiesType !== "Farm Plot/Land" && (
                    <>
                      <Grid
                        item
                        sx={{
                          marginRight: { md: "17px", xs: "5px" },
                          mb: 1.5,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                        >
                          Open Sides
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
                        {openSidesOptions.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setopenSides(event.target.value);
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                              marginBottom: "15px",
                            }}
                          >
                            <input
                              type="radio"
                              name="20rertj4"
                              value={item}
                              checked={openSides === item}
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
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      {(formData.buildingType === "Commercial" ||
        formData.buildingType === "Industrial" ||
        formData.propertiesType === "Residential Plot/Land") && (
          <Box sx={{ marginTop: 5, marginBottom: 5 }}>
            <Box>
              <Typography
                sx={{ fontSize: { md: "18px" }, fontWeight: 600, ml: 1 }}
              >
                Area Size *
              </Typography>
            </Box>
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
                {formData.propertiesType !== "Commercial Building" &&
                  formData.propertiesType !== "Guest House/Banquet Hall" &&
                  formData.propertiesType !== "Hotel/Resorts" &&
                  formData.propertiesType !== "Commercial Plot/Land" &&
                  formData.subProperty !== "Commercial Building" &&
                  formData.propertiesType !== "Industrial Building" &&
                  formData.propertiesType !== "Residential Plot/Land" &&
                  formData.propertiesType !== "Shopping Mall" &&
                  formData.propertiesType !== "Estate/Plantation" &&
                  formData.propertiesType !== "Shed/Factory" &&
                  formData.subProperty !== "Shed/Factory" &&
                  formData.subProperty !== "Warehouse/Godown" &&
                  formData.subProperty !== "Industrial Building" &&
                  formData.propertiesType !== "Warehouse/Godown" &&
                  formData.propertiesType !== "Industrial Plot/Land" && (
                    <>
                      {showAreas?.map((item, index) => {
                        if (item === 1) {
                          return (
                            <Grid key={index} container>
                              <Grid item md={3.5} xs={12}>
                                <TextField
                                  label="Super Built up Area "
                                  id="demo-simple-select"
                                  value={superBuiltupArea}
                                  sx={{ minWidth: { md: "1%", xs: "90%" } }}
                                  onChange={(event) => {
                                    setsuperBuiltupArea(event.target.value);
                                    setAreaSizeError(false);
                                    setAreaSizeHelperText("");
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: { md: "30%", xs: "40%" },
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "1%",
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                            </Grid>
                          );
                        }
                        return null;
                      })}

                      {showAreas?.map((item, index) => {
                        if (item === 2) {
                          return (
                            <Grid container>
                              <Grid item md={3.5} xs={12}>
                                <TextField
                                  label="Built up Area "
                                  id="demo-simple-select"
                                  value={builtupArea}
                                  sx={{ minWidth: { md: "1%", xs: "90%" } }}
                                  onChange={(event) => {
                                    setbuiltupArea(event.target.value);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: { md: "30%", xs: "40%" },
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "1%",
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  mt: 3,
                                  ml: 7,
                                  color: "red",
                                  variant: "outlined",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(2)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(2);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 3) {
                          return (
                            <Grid container>
                              <Grid item md={3.5} xs={12}>
                                <TextField
                                  label="Carpet Area"
                                  id="demo-simple-select"
                                  value={carpetArea}
                                  sx={{ minWidth: { md: "1%", xs: "90%" } }}
                                  onChange={(event) => {
                                    setcarpetArea(event.target.value);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: { md: "30%", xs: "40%" },
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "1%",
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  mt: 3,
                                  ml: 7,
                                  color: "red",
                                  variant: "outlined",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(3)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(3);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 4) {
                          return (
                            <Grid container>
                              <Grid item md={3.5} xs={12}>
                                <TextField
                                  label="Saleble Area"
                                  id="demo-simple-select"
                                  value={salableArea}
                                  sx={{ minWidth: { md: "1%", xs: "90%" } }}
                                  onChange={(event) => {
                                    setsalableArea(event.target.value);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: { md: "30%", xs: "40%" },
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "1%",
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  mt: 3,
                                  ml: 7,
                                  color: "red",
                                  variant: "outlined",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(4)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(4);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(
                                          prevState.slice(indexToRemove + 1)
                                        );
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        }
                        return null;
                      })}
                      {showAreas?.length !== 5 && (
                        <Grid
                          container
                          item
                          md={3}
                          sx={{ display: "flex", mb: 3, ml: 1 }}
                        >
                          <Grid item mt={3}>
                            <Box
                              sx={{
                                color: "red",
                                mr: 1,
                              }}
                              onClick={() => {
                                setshowAreas((prevState) => {
                                  for (let i = 1; i <= 6; i++) {
                                    if (!prevState.includes(i)) {
                                      return [...prevState, i];
                                    }
                                  }

                                  return prevState;
                                });
                              }}
                            >
                              + Add More Area Details
                            </Box>
                          </Grid>
                          {/* <Grid item>
                          <Button
                            sx={{
                              width: "100px",
                              backgroundColor: "#312e2e",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#554d4d",
                              },
                              ml: 1,
                            }}
                            onClick={() => {
                              if (showAreas.length >= 2) {
                                setshowAreas((prevState) => {
                                  return prevState.slice(0, -1);
                                });
                              }
                            }}
                          >
                            Remove
                          </Button>
                        </Grid> */}
                        </Grid>
                      )}
                    </>
                  )}

                {(formData.propertiesType === "Commercial Building" ||
                  formData.propertiesType === "Guest House/Banquet Hall" ||
                  formData.propertiesType === "Estate/Plantation" ||
                  formData.propertiesType === "Hotel/Resorts" ||
                  formData.propertiesType === "Commercial Plot/Land" ||
                  formData.subProperty === "Commercial Building" ||
                  formData.propertiesType === "Residential Plot/Land" ||
                  formData.propertiesType === "Industrial Building" ||
                  formData.propertiesType === "Shopping Mall" ||
                  formData.propertiesType === "Shed/Factory" ||
                  formData.subProperty === "Shed/Factory" ||
                  formData.subProperty === "Warehouse/Godown" ||
                  formData.subProperty === "Industrial Building" ||
                  formData.propertiesType === "Warehouse/Godown" ||
                  formData.propertiesType === "Industrial Plot/Land") && (
                    <>
                      {showAreas?.map((item, index) => {
                        if (item === 1) {
                          return (
                            <Grid key={index} container>
                              <Grid item md={3.5} xs={12}>
                                <TextField
                                  label="Plot Area"
                                  id="demo-simple-select"
                                  value={plotArea}
                                  sx={{ minWidth: { md: "1%", xs: "90%" } }}
                                  onChange={(event) => {
                                    setplotArea(event.target.value);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: { md: "30%", xs: "40%" },
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root": {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "1%",
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                            </Grid>
                          );
                        }
                        return null;
                      })}

                      {showAreas?.map((item, index) => {
                        if (item === 2) {
                          return (
                            <Grid container>
                              <Grid item md={3.5} xs={12}>
                                <TextField
                                  label="Super Built up Area "
                                  id="demo-simple-select"
                                  value={superBuiltupArea}
                                  sx={{ minWidth: { md: "1%", xs: "90%" } }}
                                  onChange={(event) => {
                                    setsuperBuiltupArea(event.target.value);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: { md: "30%", xs: "40%" },
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root": {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "1%",
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  mt: 3,
                                  ml: 7,
                                  color: "red",
                                  variant: "outlined",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(2)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(2);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(prevState.slice(indexToRemove + 1));
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 3) {
                          return (
                            <Grid container>
                              <Grid item md={3.5} xs={12}>
                                <TextField
                                  label="Built up Area "
                                  id="demo-simple-select"
                                  value={builtupArea}
                                  sx={{ minWidth: { md: "1%", xs: "90%" } }}
                                  onChange={(event) => {
                                    setbuiltupArea(event.target.value);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: { md: "30%", xs: "40%" },
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root": {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "1%",
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  mt: 3,
                                  ml: 7,
                                  color: "red",
                                  variant: "outlined",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(3)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(3);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(prevState.slice(indexToRemove + 1));
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 4) {
                          return (
                            <Grid container>
                              <Grid item md={3.5} xs={12}>
                                <TextField
                                  label="Carpet Area"
                                  id="demo-simple-select"
                                  value={carpetArea}
                                  sx={{ minWidth: { md: "1%", xs: "90%" } }}
                                  onChange={(event) => {
                                    setcarpetArea(event.target.value);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: { md: "30%", xs: "40%" },
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root": {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "1%",
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  mt: 3,
                                  ml: 7,
                                  color: "red",
                                  variant: "outlined",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(4)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(4);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(prevState.slice(indexToRemove + 1));
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        } else if (item === 5) {
                          return (
                            <Grid container>
                              <Grid item md={3.5} xs={12}>
                                <TextField
                                  label="Saleble Area"
                                  id="demo-simple-select"
                                  value={salableArea}
                                  sx={{ minWidth: { md: "1%", xs: "90%" } }}
                                  onChange={(event) => {
                                    setsalableArea(event.target.value);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <Grid
                                        item
                                        sx={{
                                          maxWidth: { md: "30%", xs: "40%" },
                                          maxHeight: "50px",
                                          mt: -3,
                                        }}
                                      >
                                        <Autocomplete
                                          value={areaUnit}
                                          onChange={(event, newValue) => {
                                            setAreaUnit(newValue);
                                          }}
                                          options={units}
                                          isOptionEqualToValue={(option, value) => option === value}
                                          renderInput={(params) => (
                                            <Box
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  color: "black",
                                                  fontFamily: "Inter",
                                                  fontSize: "24px",
                                                  ml: 1,
                                                }}
                                              >
                                                |
                                              </Box>
                                              <TextField
                                                {...params}
                                                label="Unit"
                                                variant="outlined"
                                                sx={{
                                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                                  {
                                                    border: "none !important",
                                                  },
                                                  "& .css-i4bv87-MuiSvgIcon-root": {
                                                    display: "none",
                                                  },
                                                  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                                  {
                                                    display: "none",
                                                  },
                                                  minWidth: {
                                                    md: "100%",
                                                    xs: "1%",
                                                  },
                                                }}
                                              />
                                            </Box>
                                          )}
                                        />
                                      </Grid>
                                    ),
                                  }}
                                ></TextField>
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  mt: 3,
                                  ml: 7,
                                  color: "red",
                                  variant: "outlined",
                                }}
                                onClick={() => {
                                  if (
                                    showAreas?.length >= 2 &&
                                    showAreas?.includes(5)
                                  ) {
                                    setshowAreas((prevState) => {
                                      const indexToRemove =
                                        prevState.lastIndexOf(5);
                                      return prevState
                                        .slice(0, indexToRemove)
                                        .concat(prevState.slice(indexToRemove + 1));
                                    });
                                  }
                                }}
                              >
                                <ClearIcon />
                              </Grid>
                            </Grid>
                          );
                        }
                        return null;
                      })}
                      {showAreas?.length !== 6 && (
                        <Grid
                          container
                          item
                          md={3}
                          sx={{ display: "flex", mb: 3, ml: 1 }}
                        >
                          <Grid item sx={{ mt: 3 }}>
                            <Box
                              sx={{
                                color: "red",
                                mr: 1,
                              }}
                              onClick={() => {
                                setshowAreas((prevState) => {
                                  for (let i = 1; i <= 6; i++) {
                                    if (!prevState.includes(i)) {
                                      return [...prevState, i];
                                    }
                                  }

                                  return prevState;
                                });
                              }}
                            >
                              + Add More Area Details
                            </Box>
                          </Grid>
                          {/* <Grid item>
                      <Button
                        sx={{
                          width: "100px",
                          backgroundColor: "#312e2e",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#554d4d",
                          },
                          ml: 1,
                        }}
                        onClick={() => {
                          if (showAreas.length >= 2) {
                            setshowAreas((prevState) => {
                              return prevState.slice(0, -1);
                            });
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </Grid> */}
                        </Grid>
                      )}
                    </>
                  )}

                {(formData.propertiesType === "Commercial Plot/Land" ||
                  formData.propertiesType === "Residential Plot/Land" ||
                  formData.propertiesType === "Farm Plot/Land" ||
                  formData.propertiesType === "Industrial Plot/Land") && (
                    <Grid container>
                      <Grid item md={1.362}>
                        <TextField
                          label="Breadth in ft"
                          id="demo-simple-select"
                          value={breadthInFeet}
                          sx={{ maxWidth: { md: "96%" } }}
                          onChange={(event) => {
                            setbreadthInFeet(event.target.value);
                          }}
                        ></TextField>
                      </Grid>
                      <Grid
                        item
                        md={0.3}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        X
                      </Grid>
                      <Grid item md={1.362} ml={-0.3}>
                        <TextField
                          label="Length in ft"
                          id="demo-simple-select"
                          value={lengthInFeet}
                          sx={{ maxWidth: { md: "96%" } }}
                          onChange={(event) => {
                            setlengthInFeet(event.target.value);
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                  )}

                {(formData.propertiesType === "Hotel/Resorts" ||
                  formData.subProperty === "School and Colleges" ||
                  formData.subProperty === "Hotel/Resorts") && (
                    <Grid container>
                      <Grid
                        item
                        sx={{
                          marginRight: { md: "17px", xs: "10px" },
                          marginTop: { md: "15px", xs: "10px" },
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                        >
                          Number of Rooms
                        </Typography>
                        <TextField
                          label="Number of Rooms"
                          id="demo-simple-select"
                          value={numberOfRooms}
                          sx={{ maxWidth: { md: "96%" } }}
                          onChange={(event) => {
                            setnumberOfRooms(event.target.value);
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                  )}
                {(formData.propertiesType === "Hotel/Resorts" ||
                  formData.propertiesType === "Warehouse/Godown" ||
                  formData.subProperty === "Warehouse/Godown" ||
                  formData.subProperty !== "Hotel/Resorts" ||
                  formData.subProperty === "Shed/Factory" ||
                  // formData.propertiesType === "Industrial Building" ||
                  formData.propertiesType === "Shed/Factory") &&
                  formData.propertiesType !== "Farm Plot/Land" &&
                  formData.propertiesType !== "Residential Plot/Land" &&
                  formData.propertiesType !== "Commercial Plot/Land" &&
                  formData.propertiesType !== "Industrial Plot/Land" && (
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
                          marginRight: { md: "17px", xs: "10px" },
                          marginTop: { md: "15px", xs: "10px" },
                          mb: { xs: 1.5 },
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                        >
                          Number of Bathrooms
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        className="mydict"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          flexGrow: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {numberOfBathRoomOptions.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setnumberOfBathRooms(event.target.value);
                            }}
                            key={item}
                            style={{ marginRight: "15px", marginBottom: "25px" }}
                          >
                            <input
                              type="radio"
                              name="20dsa1"
                              value={item}
                              checked={numberOfBathRooms === item}
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
                      {formData.propertiesType === "PG Building" && (
                        <Grid container sx={{ maxWidth: { md: "25.3%" } }}>
                          <Autocomplete
                            value={numberOfBathRooms}
                            freeSolo
                            onChange={(event, newValue) => {
                              setnumberOfBathRooms(newValue);
                            }}
                            options={rooms}
                            isOptionEqualToValue={(option, value) =>
                              option === value
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select/Enter no. of bath rooms"
                                variant="outlined"
                                sx={{ maxWidth: { md: "80%" } }}
                              />
                            )}
                          />
                        </Grid>
                      )}
                    </Grid>
                  )}
                {formData.subProperty === "Hotel/Resorts" && (
                  <Grid container>
                    <Grid>
                      <Typography
                        sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                      >
                        Number of Bathrooms
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      sx={{
                        marginRight: { md: "17px", xs: "10px" },
                        marginTop: { md: "15px", xs: "10px" },
                      }}
                    >
                      <TextField
                        label="Number of Bathrooms "
                        id="demo-simple-select"
                        value={numberOfBathRooms}
                        sx={{ maxWidth: { md: "96%" } }}
                        onChange={(event) => {
                          setnumberOfBathRooms(event.target.value);
                        }}
                      ></TextField>
                    </Grid>
                  </Grid>
                )}
                {formData.propertiesType !== "Commercial Plot/Land" &&
                  formData.propertiesType !== "Residential Plot/Land" &&
                  formData.propertiesType !== "Industrial Plot/Land" &&
                  formData.subProperty !== "School and Colleges" &&
                  formData.subProperty !== "Hotel/Resorts" &&
                  formData.subProperty !== "Commercial Building" &&
                  formData.propertiesType !== "Estate/Plantation" &&
                  formData.propertiesType !== "Hotel/Resorts" && (
                    <Grid item xs={12} md={3.5}>
                      <Autocomplete
                        value={floorNumber}
                        options={
                          formData.propertiesType === "Retail Shop/Showroom"
                            ? shopFloorOptions
                            : floorOptions
                        }
                        onChange={(event, newValue) => {
                          setFloorNumber(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Floor Number"
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                          />
                        )}
                      />
                    </Grid>
                  )}

                {formData.propertiesType !== "Commercial Plot/Land" &&
                  formData.propertiesType !== "Residential Plot/Land" &&
                  formData.propertiesType !== "Office Space in IT Park/SEZ" &&
                  formData.propertiesType !== "Office Space" &&
                  formData.propertiesType !== "Estate/Plantation" &&
                  formData.subProperty !== "Office Space" &&
                  formData.subProperty !== "Office Space in IT Park/SEZ" &&
                  formData.propertiesType !== "Industrial Plot/Land" && (
                    <Grid container>
                      <Grid item xs={12}>
                        <Autocomplete
                          value={totalFloor}
                          options={floorOptions}
                          onChange={(event, newValue) => {
                            setTotalFloor(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Total Floors"
                              variant="outlined"
                              size={isMobile ? "small" : "medium"}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  )}

                {formData.propertiesType === "Shed/Factory" ||
                  formData.propertiesType === "Shopping Mall" ||
                  ((formData.propertiesType === "Warehouse/Godown" ||
                    formData.subProperty === "Warehouse/Godown") && (
                      <Grid item xs={12} md={12}>
                        <TextField
                          label="Tower/Block Number"
                          id="demo-simple-select"
                          value={towerOrBlockNumber}
                          size={isMobile ? "small" : "medium"}
                          onChange={(event) => {
                            settowerOrBlockNumber(event.target.value);
                          }}
                        ></TextField>
                      </Grid>
                    ))}

                {(formData.propertiesType === "Commercial Plot/Land" ||
                  formData.propertiesType === "Shed/Factory" ||
                  formData.subProperty === "Shed/Factory" ||
                  formData.propertiesType === "Warehouse/Godown" ||
                  formData.subProperty === "Warehouse/Godown" ||
                  formData.propertiesType === "Residential Plot/Land" ||
                  formData.propertiesType === "Farm Plot/Land" ||
                  formData.propertiesType === "Industrial Plot/Land") && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        ml: { xs: 1 },
                        mr: { md: "50%" },
                      }}
                    >
                      <Grid
                        item
                        sx={{
                          marginRight: { md: "17px", xs: "5px" },
                          marginTop: { md: "15px", xs: "10px" },
                          mb: 1.5,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                        >
                          Open Sides
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
                        {openSidesOptions.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setopenSides(event.target.value);
                            }}
                            key={item}
                            style={{ marginRight: "15px", marginBottom: "15px" }}
                          >
                            <input
                              type="radio"
                              name="20rertj4"
                              value={item}
                              checked={openSides === item}
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
                {(formData.propertiesType === "Commercial Plot/Land" ||
                  formData.propertiesType === "Residential Plot/Land" ||
                  formData.propertiesType === "Industrial Plot/Land") && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        ml: { xs: 1 },
                        mt: 2,
                      }}
                    >
                      <Grid
                        item
                        sx={{
                          marginRight: { md: "17px", xs: "10px" },
                          marginTop: { md: "15px", xs: "10px" },
                          mb: 1.5,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                        >
                          Compounded Wall Made
                        </Typography>
                      </Grid>
                      <Grid
                        container
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
                              setcompoundWallMade(event.target.value);
                            }}
                            key={item}
                            style={{ marginRight: "15px", marginBottom: "15px" }}
                          >
                            <input
                              type="radio"
                              name="2ikujyh01"
                              value={item}
                              checked={compoundWallMade === item}
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

                {formData.propertiesType !== "Guest House/Banquet Hall" &&
                  formData.propertiesType !== "Hotel/Resorts" &&
                  formData.propertiesType !== "Commercial Plot/Land" &&
                  formData.propertiesType !== "Shed/Factory" &&
                  formData.subProperty !== "Shed/Factory" &&
                  formData.subProperty !== "School and Colleges" &&
                  formData.subProperty !== "Hotel/Resorts" &&
                  formData.propertiesType !== "Shopping Mall" &&
                  formData.propertiesType !== "Estate/Plantation" &&
                  formData.propertiesType !== "Warehouse/Godown" &&
                  formData.subProperty !== "Warehouse/Godown" &&
                  formData.propertiesType !== "Residential Plot/Land" &&
                  formData.propertiesType !== "Farm Plot/Land" &&
                  formData.propertiesType !== "Industrial Plot/Land" && (
                    <Grid item xs={12} md={12}>
                      <TextField
                        label="Tower/Block Number"
                        id="demo-simple-select"
                        value={towerOrBlockNumber}
                        size={isMobile ? "small" : "medium"}
                        onChange={(event) => {
                          settowerOrBlockNumber(event.target.value);
                        }}
                      ></TextField>
                    </Grid>
                  )}
                {formData.propertiesType === "Estate/Plantation" && (
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
                        marginRight: { md: "17px", xs: "10px" },
                        marginTop: { md: "15px", xs: "10px" },
                        mb: 2,
                      }}
                    >
                      <Typography
                        sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                      >
                        Type of Estate/Plantation
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
                      {estateOptions.map((item) => (
                        <Box mb={2}>
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              settypeOfEstate(event.target.value);
                            }}
                            key={item}
                            style={{ marginRight: "15px", marginBottom: "15px" }}
                          >
                            <input
                              type="radio"
                              name="2egrht01"
                              value={item}
                              checked={typeOfEstate === item}
                              readOnly
                            />
                            <span
                              className="border1"
                              style={{ fontFamily: "Mulish,sans-serif" }}
                            >
                              {item}
                            </span>
                          </label>
                        </Box>
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
                    sx={{
                      marginRight: { md: "17px", xs: "10px" },
                      marginTop: { md: "15px", xs: "10px" },
                      mb: 1.5,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                    >
                      {formData.propertiesType === "Industrial Plot/Land" ||
                        formData.propertiesType === "Commercial Plot/Land"
                        ? "Corner Plot/Land"
                        : "Corner Unit"}
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
                    {yesOrNo.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          setCornerUnit(event.target.value);
                        }}
                        key={item}
                        style={{ marginRight: "15px", marginBottom: "15px" }}
                      >
                        <input
                          type="radio"
                          name="201"
                          value={item}
                          checked={cornerUnit === item}
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

                <Grid container>
                  <Grid
                    item
                    sx={{
                      marginRight: { md: "17px", xs: "10px" },
                      marginTop: { md: "15px", xs: "10px" },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { md: "18px" }, fontWeight: 600, ml: 1 }}
                    >
                      {formData.propertiesType === "Industrial Plot/Land" ||
                        formData.propertiesType === "Commercial Plot/Land"
                        ? "Plot No "
                        : "Unit No"}
                    </Typography>
                    <TextField
                      label={
                        formData.propertiesType === "Co-Working Space" ||
                          formData.propertiesType ===
                          "Office Space in IT Park/SEZ" ||
                          formData.propertiesType === "Commercial Building" ||
                          formData.propertiesType === "Shed/Factory" ||
                          formData.propertiesType === "Warehouse/Godown"
                          ? "Unit No"
                          : formData.propertiesType === "Commercial Plot/Land" ||
                            formData.propertiesType === "Industrial Plot/Land"
                            ? "Enter Plot Number"
                            : "Unit No"
                      }
                      id="demo-simple-select"
                      value={flatNumber}
                      sx={{ maxWidth: { md: "96%" } }}
                      onChange={(event) => {
                        setFlatNumber(event.target.value);
                      }}
                    ></TextField>
                  </Grid>

                  <Grid container ml={1} mt={1}>
                    <label>
                      <input
                        type="checkbox"
                        name="radio6"
                        checked={keepItPrivate === "Yes"}
                        onChange={(event) => {
                          // setKeepItPrivate((prevValue) => !prevValue);
                          if (event.target.checked) {
                            setKeepItPrivate("Yes");
                          } else {
                            setKeepItPrivate("No");
                          }
                        }}
                      />{" "}
                      Keep it private
                    </label>
                  </Grid>
                </Grid>

                {formData.propertiesType !== "Farm Plot/Land" &&
                  formData.propertiesType !== "Shed/Factory" &&
                  formData.subProperty !== "Shed/Factory" &&
                  formData.propertiesType !== "Warehouse/Godown" &&
                  formData.subProperty !== "Warehouse/Godown" &&
                  formData.propertiesType !== "Shopping Mall" &&
                  formData.propertiesType !== "Hotel/Resorts" &&
                  formData.propertiesType !== "Industrial Plot/Land" &&
                  formData.propertiesType !== "Industrial Building" &&
                  formData.propertiesType !== "Retail Shop/Showroom" &&
                  formData.propertiesType !== "Guest House/Banquet Hall" &&
                  formData.propertiesType !== "Commercial Building" &&
                  formData.propertiesType !== "Commercial Plot/Land" &&
                  formData.propertiesType !== "Office Space" &&
                  formData.propertiesType !== "Estate/Plantation" &&
                  formData.subProperty !== "Office Space" &&
                  formData.subProperty !== "Industrial Building" &&
                  formData.subProperty !== "Commercial Building" &&
                  formData.subProperty !== "Retail Shop/Showroom" &&
                  formData.subProperty !== "School and Colleges" &&
                  formData.subProperty !== "Hotel/Resorts" &&
                  formData.subProperty !== "Shopping Mall" &&
                  formData.subProperty !== "Office Space in IT Park/SEZ" &&
                  formData.propertiesType !== "Office Space in IT Park/SEZ" &&
                  formData.propertiesType !== "Residential Plot/Land" && (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        m: 1,
                        mt: 2,
                      }}
                    >
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: { md: "18px" },
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          Property Level
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
                        {propertyLevelOptions.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setpropertyLevel(event.target.value);
                            }}
                            key={item}
                          >
                            <input
                              type="radio"
                              name="20gr2"
                              value={item}
                              checked={propertyLevel === item}
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
                {formData.propertiesType !== "Farm Plot/Land" &&
                  formData.propertiesType !== "Shed/Factory" &&
                  formData.subProperty !== "Shed/Factory" &&
                  formData.propertiesType !== "Warehouse/Godown" &&
                  formData.subProperty !== "Warehouse/Godown" &&
                  formData.propertiesType !== "Industrial Building" &&
                  formData.subProperty !== "Industrial Building" &&
                  formData.propertiesType !== "Industrial Plot/Land" &&
                  formData.propertiesType !== "Hotel/Resorts" &&
                  formData.propertiesType !== "Retail Shop/Showroom" &&
                  formData.propertiesType !== "Guest House/Banquet Hall" &&
                  formData.propertiesType !== "Commer cial Building" &&
                  formData.propertiesType !== "Shopping Mall" &&
                  formData.subProperty !== "Retail Shop/Showroom" &&
                  formData.subProperty !== "Hotel/Resorts" &&
                  formData.subProperty !== "Shopping Mall" &&
                  formData.subProperty !== "Office Space" &&
                  formData.subProperty !== "Commercial Building" &&
                  formData.subProperty !== "School and Colleges" &&
                  formData.subProperty !== "Office Space in IT Park/SEZ" &&
                  formData.propertiesType !== "Office Space" &&
                  formData.propertiesType !== "Estate/Plantation" &&
                  formData.propertiesType !== "Office Space in IT Park/SEZ" &&
                  formData.propertiesType !== "Commercial Plot/Land" &&
                  formData.propertiesType !== "Residential Plot/Land" && (
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
                          marginRight: {
                            md: "17px",
                            xs: "5px",
                          },
                          marginTop: {
                            md: "15px",
                            xs: "2px",
                          },
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                        >
                          {formData.propertiesType === "PG Building"
                            ? "Preleased PG building"
                            : formData.propertiesType ===
                              "Independent House/Bungalow"
                              ? "Preleased house / bungalow"
                              : "Preleased Flat"}
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
                        {yesOrNo.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setpreleasedUnit(event.target.value);
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                              marginBottom: "15px",
                            }}
                          >
                            <input
                              type="radio"
                              name="prelease"
                              value={item}
                              checked={preleasedUnit === item}
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

                {formData.propertiesType === "Rooftop" && (
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
                      }}
                    >
                      <Typography
                        sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                      >
                        Space Type:
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
                      }}
                    >
                      {spaceTypeOptions.map((item) => (
                        <label
                          className="mydict1 border1"
                          onChange={(event) => {
                            setspaceType(event.target.value);
                          }}
                          key={item}
                          style={{ marginRight: "15px", marginBottom: "15px" }}
                        >
                          <input
                            type="radio"
                            name="202"
                            value={item}
                            checked={spaceType === item}
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

                {formData.propertiesType !== "Commercial Plot/Land" &&
                  formData.propertiesType !== "Shed/Factory" &&
                  formData.subProperty !== "Shed/Factory" &&
                  formData.propertiesType !== "Warehouse/Godown" &&
                  formData.subProperty !== "Warehouse/Godown" &&
                  formData.propertiesType !== "Industrial Building" &&
                  formData.subProperty !== "Industrial Building" &&
                  formData.propertiesType !== "Residential Plot/Land" &&
                  formData.propertiesType !== "Estate/Plantation" &&
                  formData.subProperty !== "School and Colleges" &&
                  formData.propertiesType !== "Industrial Plot/Land" && (
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
                          marginTop: { md: "15px", xs: "10px" },
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                        >
                          Occupancy Certificate:
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
                          mt: 2,
                        }}
                      >
                        {yesOrNo.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setOccupancyCertificate(event.target.value);
                            }}
                            key={item}
                            style={{ marginRight: "15px", marginBottom: "15px" }}
                          >
                            <input
                              type="radio"
                              name="203"
                              value={item}
                              checked={occupancyCertificate === item}
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

                <Grid>
                  {formData.propertiesType !== "Commercial Plot/Land" &&
                    formData.propertiesType !== "Residential Plot/Land" &&
                    formData.propertiesType !== "Hotel/Resorts" &&
                    formData.subProperty !== "Hotel/Resorts" &&
                    formData.propertiesType !== "Estate/Plantation" &&
                    formData.propertiesType !== "Industrial Plot/Land" && (
                      <>
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            ml: { xs: 1 },
                            mr: { md: "50%" },
                          }}
                        >
                          <Grid
                            item
                            sx={{
                              marginRight: { md: "17px", xs: "5px" },
                              marginTop: { md: "15px", xs: "10px" },
                            }}
                          >
                            <Typography
                              sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                            >
                              Private Washroom
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
                              mt: 2,
                            }}
                          >
                            {yesOrNo.map((item) => (
                              <label
                                className="mydict1 border1"
                                onChange={(event) => {
                                  setPrivateWashRoom(event.target.value);
                                }}
                                key={item}
                                style={{
                                  marginRight: "15px",
                                  marginBottom: "15px",
                                }}
                              >
                                <input
                                  type="radio"
                                  name="204"
                                  value={item}
                                  checked={privateWashRoom === item}
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
                        {showPrivateWashroomCount && (
                          <Grid item sx={{ width: { md: "30%" } }}>
                            <Autocomplete
                              value={privateWashroomCount}
                              options={washroomount}
                              onChange={(event, newValue) => {
                                setprivateWashroomCount(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select the Value"
                                  variant="outlined"
                                />
                              )}
                            />
                          </Grid>
                        )}
                      </>
                    )}

                  {formData.propertiesType !== "Commercial Plot/Land" &&
                    formData.propertiesType !== "Residential Plot/Land" &&
                    formData.propertiesType !== "Estate/Plantation" &&
                    formData.propertiesType !== "Hotel/Resorts" &&
                    formData.subProperty !== "Hotel/Resorts" &&
                    formData.propertiesType !== "Industrial Plot/Land" && (
                      <>
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
                              marginTop: { md: "15px", xs: "10px" },
                            }}
                          >
                            <Typography
                              sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                            >
                              Public Washroom
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
                              mt: 2,
                            }}
                          >
                            {yesOrNo.map((item) => (
                              <label
                                className="mydict1 border1"
                                onChange={(event) => {
                                  setPublicWashRoom(event.target.value);
                                }}
                                key={item}
                                style={{
                                  marginRight: "15px",
                                  marginBottom: "15px",
                                }}
                              >
                                <input
                                  type="radio"
                                  name="205"
                                  value={item}
                                  checked={publicWashRoom === item}
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

                        {showPublicWashroomCount && (
                          <Grid item sx={{ width: { md: "30%" } }}>
                            <Autocomplete
                              value={publicWashroomCount}
                              options={washroomount}
                              onChange={(event, newValue) => {
                                setpublicWashroomCount(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select the Value"
                                  variant="outlined"
                                />
                              )}
                            />
                          </Grid>
                        )}
                      </>
                    )}
                </Grid>

                {formData.propertiesType !== "Commercial Building" &&
                  formData.propertiesType !== "Retail Shop/Showroom" &&
                  formData.propertiesType !== "Guest House/Banquet Hall" &&
                  formData.propertiesType !== "Hotel/Resorts" &&
                  formData.propertiesType !== "Shopping Mall" &&
                  formData.subProperty !== "Shopping Mall" &&
                  formData.propertiesType !== "Rooftop" &&
                  formData.subProperty !== "Commercial Building" &&
                  formData.propertiesType !== "Commercial Plot/Land" &&
                  formData.propertiesType !== "Shed/Factory" &&
                  formData.subProperty !== "Shed/Factory" &&
                  formData.propertiesType !== "Warehouse/Godown" &&
                  formData.subProperty !== "Warehouse/Godown" &&
                  formData.propertiesType !== "Industrial Building" &&
                  formData.subProperty !== "Industrial Building" &&
                  formData.propertiesType !== "Estate/Plantation" &&
                  formData.subProperty !== "School and Colleges" &&
                  formData.subProperty !== "Hotel/Resorts" &&
                  formData.propertiesType !== "Residential Plot/Land" &&
                  formData.propertiesType !== "Industrial Plot/Land" && (
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
                          marginRight: { md: "17px", xs: "10px" },
                          marginTop: { md: "15px", xs: "10px" },
                          mb: { xs: 1.5 },
                        }}
                      >
                        57.128.47.115
                        <Typography
                          sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                        >
                          Pantry/Cafeteria
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
                        {yesOrNo.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setPantryOrCafeteria(event.target.value);
                            }}
                            key={item}
                            style={{ marginRight: "15px", marginBottom: "10px" }}
                          >
                            <input
                              type="radio"
                              name="206"
                              value={item}
                              checked={pantryOrCafeteria === item}
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
              </Grid>
            </Box>
          </Box>
        )}

      {formData.propertiesType === "PG/Co-living" && (
        <Box sx={{ marginTop: 5, marginBottom: 5 }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
              PG Details
            </Typography>
            <Grid
              container
              sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}
            >
              <Grid item>
                <Typography
                  sx={{ fontSize: "18px", fontWeight: 600, mt: { md: 3 } }}
                >
                  Number Of Beds
                </Typography>
                <TextField
                  label="Enter No. of Beds"
                  sx={{ maxWidth: { md: "100%" } }}
                  value={noOfPgBeds}
                  onChange={(event) => {
                    setnoOfPgBeds(event.target.value);
                  }}
                ></TextField>
              </Grid>

              <Grid
                container
                sx={{
                  marginRight: { md: "17px", xs: "10px" },
                  marginTop: { md: "15px", xs: "10px" },
                }}
              >
                <Typography sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}>
                  PG for:
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
                }}
              >
                {pgForOptions.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setpgFor(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "15px" }}
                  >
                    <input
                      type="radio"
                      name="201pg"
                      value={item}
                      checked={pgFor === item}
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

              <Grid
                container
                sx={{
                  marginRight: { md: "17px", xs: "10px" },
                  marginTop: { md: "15px", xs: "10px" },
                }}
              >
                <Typography sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}>
                  Best Suitable for:
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
                }}
              >
                {bestSuitedForOptions.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setbestSuitedFor(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "15px" }}
                  >
                    <input
                      type="radio"
                      name="201best"
                      value={item}
                      checked={bestSuitedFor === item}
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

              <Grid
                container
                sx={{
                  marginRight: { md: "17px", xs: "10px" },
                  marginTop: { md: "15px", xs: "10px" },
                }}
              >
                <Typography sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}>
                  Meals Available:
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
                }}
              >
                {yesOrNo.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setmealsAvailable(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "15px" }}
                  >
                    <input
                      type="radio"
                      name="meals"
                      value={item}
                      checked={mealsAvailable === item}
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

              <Grid container>
                <Grid item sx={{ width: { md: "15%", mt: 2 } }}>
                  <InputLabel
                    sx={{
                      color: "black",
                      ml: 1,
                      mb: 0,
                      mt: 1,
                      fontSize: { md: "18px" },
                      fontWeight: 600,
                    }}
                  >
                    Front Road Width
                  </InputLabel>
                  <TextField
                    label=" Enter The Notice Period"
                    id="demo-simple-select"
                    sx={{ minWidth: { md: "100%" } }}
                    onChange={(event) => {
                      setnoticePeriod(event.target.value);
                    }}
                    value={noticePeriod}
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
                              label="Select"
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
                                setnoticePeriodType(event.target.value);
                              }}
                              value={noticePeriodType}
                            >
                              <MenuItem value="Days">Days</MenuItem>
                            </TextField>
                          </Box>
                        </Grid>
                      ),
                    }}
                  ></TextField>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item sx={{ width: { md: "15%", mt: 2 } }}>
                  <InputLabel
                    sx={{
                      color: "black",
                      ml: 1,
                      mb: 0,
                      mt: 1,
                      fontSize: { md: "18px" },
                      fontWeight: 600,
                    }}
                  >
                    Lock-In Period
                  </InputLabel>
                  <TextField
                    label=" Enter The Lock-In Period"
                    id="demo-simple-select"
                    sx={{ minWidth: { md: "100%" } }}
                    onChange={(event) => {
                      setpgLockInPeriod(event.target.value);
                    }}
                    value={pgLockInPeriod}
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
                              label="Select"
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
                                setpgLockInPeriodType(event.target.value);
                              }}
                              value={pgLockInPeriodType}
                            >
                              <MenuItem value="Days">Days</MenuItem>
                            </TextField>
                          </Box>
                        </Grid>
                      ),
                    }}
                  ></TextField>
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
                    marginTop: { md: "5px", xs: "10px" },
                    mb: { xs: 1 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Common Areas:
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
                  }}
                >
                  {commonAreaOptions.map((item) => (
                    <label
                      className="mydict1 border1"
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "15px" }}
                    >
                      <input
                        type="checkbox"
                        name="2912504"
                        value={item}
                        checked={commonAreas.includes(item)}
                        onChange={(event) => {
                          const { value, checked } = event.target;
                          if (checked) {
                            setcommonAreas([...commonAreas, value]);
                          } else {
                            setcommonAreas(
                              commonAreas.filter((item) => item !== value)
                            );
                          }
                        }}
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
            </Grid>
          </Box>
        </Box>
      )}

      {commonErrorHelperText && (
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
          {commonErrorHelperText}
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
    </>
  );
};

export default AreaDetails;
