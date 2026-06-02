import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Typography, InputLabel, useMediaQuery, useTheme } from "@mui/material";
import "./Commercial.css";
import { Box, Grid, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import numberToWords from "number-to-words";
import {
  facingList,
  flooringTypeList,
  yesOrNo,
  backup,
  pantry,
  roomtype,
  watersource,
  noOfBedsInRooms,
  overlookingview,
  facilityoffers,
  buildinggrade,
} from "../../../../../common/common";

export const NumberToWordsConverter = ({ value }) => {
  return value && Number.isFinite(parseFloat(value))
    ? numberToWords.toWords(parseFloat(value), { language: "en-IN" })
    : "";
};

const parkingVehicleNumber = Array.from({ length: 11 }, (_, index) =>
  String(index)
);

const AdditionalDetails = ({
  next,
  back,
  formData,
  updateFormData,
  detailsId,
}) => {
  const [pantryCafeteria, setpantryCafeteria] = useState(
    formData.pantryCafeteria
  );
  // const [facing, setfacing] = useState(formData.facing);
  const [noparking, setnoparking] = useState(formData.noparking);
  const [currentlyLeasedOut, setCurrentlyLeasedOut] = useState(
    formData.currentlyLeasedOut
  );
  const [overLookingView, setOverLookingView] = useState(
    formData.overLookingView
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [taxCharges, setTaxCharges] = useState(formData.taxCharges);
  const [modifyInterior, setModifyInterior] = useState(formData.modifyInterior);
  const [newInterior, setNewInterior] = useState(formData.newInterior);
  const [buildingGrade, setBuildingGrade] = useState(formData.buildingGrade);
  const [eletricityCharges, seteletricityCharges] = useState(
    formData.eletricityCharges
  );
  const [electricPower, setElectricPower] = useState(formData.electricPower);
  const [electricPowerUnit, setElectricPowerUnit] = useState(
    formData.electricPowerUnit
  );
  const [liftAvailability, setLiftAvailability] = useState(
    formData.liftAvailability
  );
  const [noOfLifts, setNoOfLifts] = useState(formData.noOfLifts);
  const [serviceLiftAvailability, setServiceLiftAvailability] = useState(
    formData.serviceLiftAvailability
  );
  const [noOfServiceLifts, setNoOfServiceLifts] = useState(
    formData.noOfServiceLifts
  );
  const [flooringType, setFlooringType] = useState(formData.flooringType);
  const [livingFlooringType, setlivingFlooringType] = useState(
    formData.livingFlooringType
  );
  const [kitchenFlooringType, setkitchenFlooringType] = useState(
    formData.kitchenFlooringType
  );
  const [bedRoomFlooringType, setbedRoomFlooringType] = useState(
    formData.bedRoomFlooringType
  );
  const [MasterBedRoomFlooringType, setMasterBedRoomFlooringType] = useState(
    formData.MasterBedRoomFlooringType
  );
  const [bathRoomFlooringType, setbathRoomFlooringType] = useState(
    formData.bathRoomFlooringType
  );
  const [balconyFlooringType, setbalconyFlooringType] = useState(
    formData.balconyFlooringType
  );
  const [otherFlooringType, setotherFlooringType] = useState(
    formData.otherFlooringType
  );
  const [twoWheeler, setTwoWheeler] = useState(formData.twoWheeler);

  const [twoWheelerOpenType, settwoWheelerOpenType] = useState(
    formData.twoWheelerOpenType
  );
  const [twoWheelerClosedType, settwoWheelerClosedType] = useState(
    formData.twoWheelerClosedType
  );
  const [fourWheeler, setFourWheeler] = useState(formData.fourWheeler);
  const [fourWheelerOpenType, setfourWheelerOpenType] = useState(
    formData.fourWheelerOpenType
  );
  const [fourWheelerClosedType, setfourWheelerClosedType] = useState(
    formData.fourWheelerClosedType
  );
  const [powerBackUp, setPowerBackUp] = useState(formData.powerBackUp);
  const [waterSource, setWaterSource] = useState(formData.waterSource);

  const [roadWidth, setRoadWidth] = useState(formData.roadWidth);
  const [roadWidthUnit, setroadWidthUnit] = useState(formData.roadWidthUnit);
  const [roomType, setroomType] = useState(formData.roomType);
  const [noOfBedsinRoom, setnoOfBedsinRoom] = useState(formData.noOfBedsinRoom);
  const [pgRentAmount, setRentAmount] = useState(formData.pgRentAmount);
  const [both, setBoth] = useState(formData.both);
  const [pgRentType, setRentPer] = useState(formData.pgRentType);
  const [pgSecurityDeposit, setSecurityDeposit] = useState(
    formData.pgSecurityDeposit
  );
  const [pgCustomSecurityDeposit, setCustomSecurityDeposit] = useState(
    formData.pgCustomSecurityDeposit
  );
  const [facilityOffered, setfacilityOffered] = useState(
    formData.facilityOffered
  );
  const [interestInCoWorking, setinterestInCoWorking] = useState(
    formData.interestInCoWorking
  );
  const [lifts, setlifts] = useState(false);
  const [servicelifts, setservicelifts] = useState(false);
  const [two, settwo] = useState(false);
  const [four, setfour] = useState(false);
  const [showDate, setshowDate] = useState(false);

  const data6 = {
    currentlyLeasedOut,
    taxCharges,
    both,
    pgSecurityDeposit,
    pgCustomSecurityDeposit,
    modifyInterior,
    newInterior,
    buildingGrade,
    noparking,
    pgRentAmount,
    // facing,
    pgRentType,
    eletricityCharges,
    electricPower,
    electricPowerUnit,
    liftAvailability,
    serviceLiftAvailability,
    flooringType,
    twoWheeler,
    fourWheeler,
    powerBackUp,
    waterSource,
    overLookingView,
    roadWidth,
    roadWidthUnit,
    facilityOffered,
    noOfLifts,
    noOfServiceLifts,
    livingFlooringType,
    kitchenFlooringType,
    bedRoomFlooringType,
    MasterBedRoomFlooringType,
    bathRoomFlooringType,
    balconyFlooringType,
    otherFlooringType,
    twoWheelerOpenType,
    twoWheelerClosedType,
    fourWheelerOpenType,
    fourWheelerClosedType,
    pantryCafeteria,
    roomType,
    noOfBedsinRoom,
    interestInCoWorking,
  };

  const send = () => {
    updateFormData(data6);
  };

  useEffect(() => {
    if (liftAvailability === "Yes") {
      setlifts(true);
    } else setlifts(false);
  }, [liftAvailability]);

  useEffect(() => {
    if (serviceLiftAvailability === "Yes") {
      setservicelifts(true);
    } else setservicelifts(false);
  }, [serviceLiftAvailability]);

  useEffect(() => {
    if (twoWheeler === "Yes") {
      settwo(true);
    } else settwo(false);
  }, [twoWheeler]);

  useEffect(() => {
    if (fourWheeler === "Yes") {
      setfour(true);
    } else setfour(false);
  }, [fourWheeler]);

  useEffect(() => {
    if (pgSecurityDeposit === "Custom") {
      setshowDate(true);
    } else setshowDate(false);
  }, [pgSecurityDeposit]);

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
            {(formData.propertiesType === "Retail Shop/Showroomroom" ||
              formData.propertiesType === "Rooftop") && (
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  ml: { xs: 1 },
                  mb: 1.5,
                }}
              >
                <Grid
                  item
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "5px", xs: "10px" },
                    mb: { xs: 1.5 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography
                    sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                  >
                    Pantry/Cafeteria
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
                  {pantry.map((item) => (
                    <label
                      className="mydict1 border1"
                      onChange={(event) => {
                        setpantryCafeteria(event.target.value);
                      }}
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "15px" }}
                    >
                      <input
                        type="radio"
                        name="20169894"
                        value={item}
                        checked={pantryCafeteria === item}
                        readOnly
                      />
                      <span className="border1">{item}</span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            )}

            {formData.buildingType !== "Residential" &&
              formData.propertiesType !== "Commercial Building" &&
              formData.propertiesType !== "Retail Shop/Showroom" &&
              formData.propertiesType !== "Guest House/Banquet Hall" &&
              formData.propertiesType !== "Hotel/Resorts" &&
              formData.propertiesType !== "Shopping Mall" &&
              formData.subProperty !== "Shopping Mall" &&
              formData.subProperty !== "Industrial Building" &&
              formData.subProperty !== "Hotel/Resorts" &&
              formData.subProperty !== "Shed/Factory" &&
              formData.subProperty !== "Warehouse/Godown" &&
              formData.propertiesType !== "Rooftop" &&
              formData.propertiesType !== "Estate/Plantation" &&
              formData.buildingType !== "Industrial" &&
              formData.propertiesType !== "Commercial Plot/Land" && (
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
                      marginTop: { md: "5px", xs: "10px" },
                      mb: { xs: 2.5 },
                      mr: { xs: "30%" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                    >
                      Currently Leased Out
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
                      mb: { xs: 1.5 },
                      fontFamily: "Mulish, sans-serif",
                    }}
                  >
                    {yesOrNo.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          setCurrentlyLeasedOut(event.target.value);
                        }}
                        key={item}
                        style={{ marginRight: "15px", marginBottom: "15px" }}
                      >
                        <input
                          type="radio"
                          name="20144"
                          value={item}
                          checked={currentlyLeasedOut === item}
                          readOnly
                        />
                        <span className="border1">{item}</span>
                      </label>
                    ))}
                  </Grid>
                </Grid>
              )}

            {formData.buildingType !== "Residential" && (
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
                    marginTop: { md: "5px", xs: "10px" },
                    mb: { xs: 2.5 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Tax & Govt Charges
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
                    mb: { xs: 1.5 },
                    fontFamily: "Mulish, sans-serif",
                  }}
                >
                  {yesOrNo.map((item) => (
                    <label
                      className="mydict1 border1"
                      onChange={(event) => {
                        setTaxCharges(event.target.value);
                      }}
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "15px" }}
                    >
                      <input
                        type="radio"
                        name="201"
                        value={item}
                        checked={taxCharges === item}
                        readOnly
                      />
                      <span className="border1">{item}</span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            )}

            {formData.buildingType !== "Residential" &&
              formData.propertiesType !== "Commercial Building" &&
              formData.propertiesType !== "Retail Shop/Showroom" &&
              formData.propertiesType !== "Guest House/Banquet Hall" &&
              formData.propertiesType !== "Hotel/Resorts" &&
              formData.propertiesType !== "Shopping Mall" &&
              formData.subProperty !== "Retail Shop/Showroom" &&
              formData.subProperty !== "Hotel/Resorts" &&
              formData.subProperty !== "Shopping Mall" &&
              formData.subProperty !== "Office Space" &&
              formData.subProperty !== "Shed/Factory" &&
              formData.subProperty !== "Warehouse/Godown" &&
              formData.subProperty !== "Commercial Building" &&
              formData.subProperty !== "Industrial Building" &&
              formData.subProperty !== "Office Space in IT Park/SEZ" &&
              formData.propertiesType !== "Estate/Plantation" &&
              formData.propertiesType !== "Rooftop" &&
              formData.buildingType !== "Industrial" &&
              formData.propertiesType !== "Commercial Plot/Land" && (
                <Grid sx={{ minWidth: { md: "43.8%" } }}>
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
                        marginTop: { md: "5px", xs: "10px" },
                        mb: { xs: 2.5 },
                        mr: { xs: "30%" },
                      }}
                    >
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Willing to Modify Interior
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
                        mb: { xs: 1.5 },
                        fontFamily: "Mulish, sans-serif",
                      }}
                    >
                      {yesOrNo.map((item) => (
                        <label
                          className="mydict1 border1"
                          onChange={(event) => {
                            setModifyInterior(event.target.value);
                          }}
                          key={item}
                          style={{ marginRight: "15px", marginBottom: "15px" }}
                        >
                          <input
                            type="radio"
                            name="202"
                            value={item}
                            checked={modifyInterior === item}
                            readOnly
                          />
                          <span className="border1">{item}</span>
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
                      width: { md: "100%" },
                    }}
                  >
                    <Grid
                      item
                      sx={{
                        marginRight: { md: "17px", xs: "5px" },
                        marginTop: { md: "5px", xs: "10px" },
                        mb: { xs: 2.5 },
                        mr: { xs: "30%" },
                      }}
                    >
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Willing to do Brand New Interior
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
                        mb: { xs: 1.5 },
                        fontFamily: "Mulish, sans-serif",
                      }}
                    >
                      {yesOrNo.map((item) => (
                        <label
                          className="mydict1 border1"
                          onChange={(event) => {
                            setNewInterior(event.target.value);
                          }}
                          key={item}
                          style={{ marginRight: "15px", marginBottom: "15px" }}
                        >
                          <input
                            type="radio"
                            name="newInterior"
                            value={item}
                            checked={newInterior === item}
                            readOnly
                          />
                          <span className="border1">{item}</span>
                        </label>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginRight: { md: "17px", xs: "5px" },
                      marginTop: { md: "5px", xs: "10px" },
                      mb: { xs: 2.5 },
                      ml: { xs: 1 },
                    }}
                  >
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      Building Grade
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
                      mb: { xs: 1.5 },
                      ml: { xs: 1 },
                      fontFamily: "Mulish, sans-serif",
                    }}
                  >
                    {buildinggrade.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          setBuildingGrade(event.target.value);
                        }}
                        key={item}
                        style={{ marginRight: "15px", marginBottom: "25px" }}
                      >
                        <input
                          type="radio"
                          name="2015"
                          value={item}
                          checked={buildingGrade === item}
                          readOnly
                        />
                        <span className="border1">{item}</span>
                      </label>
                    ))}
                  </Grid>
                </Grid>
              )}
            {(formData.propertiesType === "Office Space" ||
              formData.propertiesType === "Office Space in IT Park/SEZ") && (
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  ml: { xs: 1 },
                  width: { md: "100%" },
                }}
              >
                <Grid
                  item
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "5px", xs: "10px" },
                    mb: { xs: 2.5 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Interested in Co-working
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
                    mb: { xs: 1.5 },
                    fontFamily: "Mulish, sans-serif",
                  }}
                >
                  {yesOrNo.map((item) => (
                    <label
                      className="mydict1 border1"
                      onChange={(event) => {
                        setinterestInCoWorking(event.target.value);
                      }}
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "15px" }}
                    >
                      <input
                        type="radio"
                        name="203"
                        value={item}
                        checked={interestInCoWorking === item}
                        readOnly
                      />
                      <span className="border1">{item}</span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            )}

            {formData.buildingType !== "Residential" && (
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  ml: { xs: 1 },
                  width: { md: "100%" },
                }}
              >
                <Grid
                  item
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "5px", xs: "10px" },
                    mb: { xs: 2.5 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Electricity Charges
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
                    mb: { xs: 1.5 },
                    fontFamily: "Mulish, sans-serif",
                  }}
                >
                  {yesOrNo.map((item) => (
                    <label
                      className="mydict1 border1"
                      onChange={(event) => {
                        seteletricityCharges(event.target.value);
                      }}
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "15px" }}
                    >
                      <input
                        type="radio"
                        name="204"
                        value={item}
                        checked={eletricityCharges === item}
                        readOnly
                      />
                      <span className="border1">{item}</span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            )}

            {/* <Grid
              item
              sx={{
                marginRight: { md: "17px", xs: "50px" },
                marginTop: { md: "5px", xs: "10px" },
                mb: { xs: 1 },
                ml: { xs: 1 },
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                Power
              </Typography>
            </Grid> */}

            {formData.buildingType !== "Residential" && (
              <Grid container>
                <Grid item>
                  <TextField
                    label=" Power"
                    id="demo-simple-select"
                    sx={{
                      maxWidth: { md: "60.1%" },
                      minWidth: { md: "0", xs: "150%" },
                    }}
                    onChange={(event) => {
                      setElectricPower(event.target.value);
                    }}
                    value={electricPower}
                    InputProps={{
                      endAdornment: (
                        <Grid
                          item
                          sx={{
                            maxWidth: { md: "50%", xs: "40%" },
                            maxHeight: "50px",
                            mt: -3,
                          }}
                        >
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
                                mr: -1,
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
                                "& .css-i4bv87-MuiSvgIcon-root": {
                                  display: "none",
                                },
                                "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                  {
                                    display: "none",
                                  },
                                minWidth: { md: "100%", xs: "1%" },
                              }}
                              onChange={(event) => {
                                setElectricPowerUnit(event.target.value);
                              }}
                              value={electricPowerUnit}
                            >
                              <MenuItem value="kv">kv</MenuItem>
                              <MenuItem value="Hp">Hp</MenuItem>
                            </TextField>
                          </Box>
                        </Grid>
                      ),
                    }}
                  ></TextField>
                </Grid>
              </Grid>
            )}

            {formData.propertiesType !== "Shed/Factory" &&
              formData.buildingType !== "Residential" &&
              formData.subProperty !== "Shed/Factory" &&
              formData.propertiesType !== "Warehouse/Godown" &&
              formData.subProperty !== "Warehouse/Godown" &&
              formData.propertiesType !== "Estate/Plantation" &&
              formData.propertiesType !== "Residential Plot/Land" &&
              formData.propertiesType !== "Industrial Building" &&
              formData.subProperty !== "Industrial Building" &&
              formData.propertiesType !== "Industrial Plot/Land" &&
              formData.propertiesType !== "Farm Plot/Land" &&
              formData.propertiesType !== "Commercial Plot/Land" && (
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    ml: { xs: 1 },
                    width: { md: "100%", xs: "100%" },
                  }}
                >
                  <Grid
                    item
                    sx={{
                      marginRight: { md: "17px", xs: "5px" },
                      marginTop: { md: "15px", xs: "10px" },
                      mb: { xs: 2.5 },
                    }}
                  >
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      Lift Availability
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
                      mb: { xs: 1.5 },
                      fontFamily: "Mulish, sans-serif",
                    }}
                  >
                    {yesOrNo.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          setLiftAvailability(event.target.value);
                        }}
                        key={item}
                        style={{ marginRight: "15px", marginBottom: "15px" }}
                      >
                        <input
                          type="radio"
                          name="2015618"
                          value={item}
                          checked={liftAvailability === item}
                          readOnly
                        />
                        <span className="border1">{item}</span>
                      </label>
                    ))}
                  </Grid>
                  {lifts && (
                    <Grid container>
                      <Grid item>
                        <TextField
                          label="No. of lifts available"
                          id="demo-simple-select"
                          sx={{ maxWidth: { md: "60%" } }}
                          onChange={(event) => {
                            setNoOfLifts(event.target.value);
                          }}
                          value={noOfLifts}
                        ></TextField>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              )}

            {formData.propertiesType !== "Shed/Factory" &&
              formData.buildingType !== "Residential" &&
              formData.subProperty !== "Shed/Factory" &&
              formData.propertiesType !== "Warehouse/Godown" &&
              formData.subProperty !== "Warehouse/Godown" &&
              formData.propertiesType !== "Farm Plot/Land" &&
              formData.propertiesType !== "Residential Plot/Land" &&
              formData.propertiesType !== "Industrial Building" &&
              formData.subProperty !== "Industrial Building" &&
              formData.propertiesType !== "Estate/Plantation" &&
              formData.propertiesType !== "Industrial Plot/Land" &&
              formData.propertiesType !== "Commercial Plot/Land" && (
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    ml: { xs: 1 },
                    width: { md: "100%", xs: "100%" },
                  }}
                >
                  <Grid
                    item
                    sx={{
                      marginRight: { md: "17px", xs: "5px" },
                      marginTop: { md: "5px", xs: "10px" },
                      mb: { xs: 2.5 },
                    }}
                  >
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      Service Lift Availability
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
                      mb: { xs: 1.5 },
                      fontFamily: "Mulish, sans-serif",
                    }}
                  >
                    {yesOrNo.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          setServiceLiftAvailability(event.target.value);
                        }}
                        key={item}
                        style={{ marginRight: "15px", marginBottom: "15px" }}
                      >
                        <input
                          type="radio"
                          name="208"
                          value={item}
                          checked={serviceLiftAvailability === item}
                          readOnly
                        />
                        <span className="border1">{item}</span>
                      </label>
                    ))}
                  </Grid>
                  {servicelifts && (
                    <Grid container>
                      <Grid item>
                        <TextField
                          label="No. of service lifts available"
                          id="demo-simple-select"
                          sx={{ maxWidth: { md: "60.1%" } }}
                          onChange={(event) => {
                            setNoOfServiceLifts(event.target.value);
                          }}
                          value={noOfServiceLifts}
                        ></TextField>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              )}

            {formData.buildingType !== "Residential" &&
              formData.propertiesType !== "Shed/Factory" &&
              formData.subProperty !== "Shed/Factory" &&
              formData.propertiesType !== "Warehouse/Godown" &&
              formData.subProperty !== "Warehouse/Godown" &&
              formData.propertiesType !== "Residential Plot/Land" &&
              formData.propertiesType !== "Estate/Plantation" &&
              formData.propertiesType !== "Industrial Plot/Land" &&
              formData.propertiesType !== "Commercial Plot/Land" && (
                <Grid container mt={1.5} sx={{ mb: { md: 0 } }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    Flooring Type
                  </Typography>
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
                    {flooringTypeList.map((item) => (
                      <label
                        className="mydict1 border1"
                        key={item}
                        style={{ marginRight: "15px", marginBottom: "25px" }}
                      >
                        <input
                          type="radio"
                          name="flooringType"
                          value={item}
                          checked={flooringType === item}
                          onChange={(event) => {
                            setFlooringType(event.target.value);
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

            {formData.buildingType === "Residential" &&
              formData.propertiesType !== "Farm Plot/Land" &&
              formData.propertiesType !== "Residential Plot/Land" && (
                <>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: 600, mb: 2 }}
                      >
                        Select Flooring Type 
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <TextField
                      size={isMobile ? "small" : "medium"}
                        sx={{
                          maxWidth: "100%",   
                        }}
                        label="Living/Dinning"
                        select
                        id="demo-simple-select"
                        onChange={(event) => {
                          setlivingFlooringType(event.target.value);
                        }}
                        value={livingFlooringType}
                      >
                        <MenuItem value="Vetrified">Vetrified</MenuItem>
                        <MenuItem value="Marble">Marble</MenuItem>
                        <MenuItem value="Ceramic">Ceramic</MenuItem>
                        <MenuItem value="Mosaie">Mosaie</MenuItem>
                        <MenuItem value="Wooden">Wooden</MenuItem>
                        <MenuItem value="Granete">Granete</MenuItem>
                        <MenuItem value="Marbonite">Marbonite</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                      size={isMobile ? "small" : "medium"}
                        sx={{
                          maxWidth: "100%",
                          
                        }}
                        label="Kitchen "
                        select
                        id="demo-simple-select"
                        onChange={(event) => {
                          setkitchenFlooringType(event.target.value);
                        }}
                        value={kitchenFlooringType}
                      >
                        <MenuItem value="Vetrified">Vetrified</MenuItem>
                        <MenuItem value="Marble">Marble</MenuItem>
                        <MenuItem value="Ceramic">Ceramic</MenuItem>
                        <MenuItem value="Mosaie">Mosaie</MenuItem>
                        <MenuItem value="Wooden">Wooden</MenuItem>
                        <MenuItem value="Granete">Granete</MenuItem>
                        <MenuItem value="Marbonite">Marbonite</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        label="Bedroom "
                        select
                        id="demo-simple-select"
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          maxWidth: "100%",
                           }}
                        onChange={(event) => {
                          setbedRoomFlooringType(event.target.value);
                        }}
                        value={bedRoomFlooringType}
                      >
                        <MenuItem value="Vetrified">Vetrified</MenuItem>
                        <MenuItem value="Marble">Marble</MenuItem>
                        <MenuItem value="Ceramic">Ceramic</MenuItem>
                        <MenuItem value="Mosaie">Mosaie</MenuItem>
                        <MenuItem value="Wooden">Wooden</MenuItem>
                        <MenuItem value="Granete">Granete</MenuItem>
                        <MenuItem value="Marbonite">Marbonite</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                      size={isMobile ? "small" : "medium"}
                        sx={{
                          maxWidth: "100%",
                       }}
                        label="Master Bedroom"
                        select
                        id="demo-simple-select"
                        onChange={(event) => {
                          setMasterBedRoomFlooringType(event.target.value);
                        }}
                        value={MasterBedRoomFlooringType}
                      >
                        <MenuItem value="Vetrified">Vetrified</MenuItem>
                        <MenuItem value="Marble">Marble</MenuItem>
                        <MenuItem value="Ceramic">Ceramic</MenuItem>
                        <MenuItem value="Mosaie">Mosaie</MenuItem>
                        <MenuItem value="Wooden">Wooden</MenuItem>
                        <MenuItem value="Granete">Granete</MenuItem>
                        <MenuItem value="Marbonite">Marbonite</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        label="Bathroom "
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          maxWidth: "100%",
 
                        }}
                        select
                        id="demo-simple-select"
                        onChange={(event) => {
                          setbathRoomFlooringType(event.target.value);
                        }}
                        value={bathRoomFlooringType}
                      >
                        <MenuItem value="Vetrified">Vetrified</MenuItem>
                        <MenuItem value="Marble">Marble</MenuItem>
                        <MenuItem value="Ceramic">Ceramic</MenuItem>
                        <MenuItem value="Mosaie">Mosaie</MenuItem>
                        <MenuItem value="Wooden">Wooden</MenuItem>
                        <MenuItem value="Granete">Granete</MenuItem>
                        <MenuItem value="Marbonite">Marbonite</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                      size={isMobile ? "small" : "medium"}
                        sx={{
                          maxWidth: "100%",                     
                        }}
                        label="Balcony "
                        select
                        id="demo-simple-select"
                        onChange={(event) => {
                          setbalconyFlooringType(event.target.value);
                        }}
                        value={balconyFlooringType}
                      >
                        <MenuItem value="Vetrified">Vetrified</MenuItem>
                        <MenuItem value="Marble">Marble</MenuItem>
                        <MenuItem value="Ceramic">Ceramic</MenuItem>
                        <MenuItem value="Mosaie">Mosaie</MenuItem>
                        <MenuItem value="Wooden">Wooden</MenuItem>
                        <MenuItem value="Granete">Granete</MenuItem>
                        <MenuItem value="Marbonite">Marbonite</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                      size={isMobile ? "small" : "medium"}
                        sx={{
                          maxWidth: "100%",
                          
                        }}
                        label="Other  "
                        select
                        id="demo-simple-select"
                        onChange={(event) => {
                          setotherFlooringType(event.target.value);
                        }}
                        value={otherFlooringType}
                      >
                        <MenuItem value="Vetrified">Vetrified</MenuItem>
                        <MenuItem value="Marble">Marble</MenuItem>
                        <MenuItem value="Ceramic">Ceramic</MenuItem>
                        <MenuItem value="Mosaie">Mosaie</MenuItem>
                        <MenuItem value="Wooden">Wooden</MenuItem>
                        <MenuItem value="Granete">Granete</MenuItem>
                        <MenuItem value="Marbonite">Marbonite</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </>
              )}

            {(formData.buildingType === "Residential" ||
              formData.buildingType === "Commercial" ||
              formData.propertiesType === "Industrial Building") &&
              formData.propertiesType !== "Shed/Factory" &&
              formData.subProperty !== "Shed/Factory" &&
              formData.propertiesType !== "Residential Plot/Land" &&
              formData.propertiesType !== "Warehouse/Godown" &&
              formData.subProperty !== "Warehouse/Godown" &&
              formData.propertiesType !== "Farm Plot/Land" &&
              formData.propertiesType !== "Industrial Plot/Land" &&
              formData.propertiesType !== "Estate/Plantation" &&
              formData.propertiesType !== "Commercial Plot/Land" && (
                <>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      ml: { xs: 1, md: 0 },
                    }}
                  >
                    <Grid item xs={12}>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: 600, mt: 2, mb: 2 }}
                      >
                        Parking Type
                      </Typography>
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <Typography
                        sx={{
                          fontSize: { md: "16px" },
                          fontWeight: 600,
                          ml: { md: 1 },
                        }}
                      >
                        2 Wheeler
                      </Typography>
                      <Grid
                        container
                        mt={1}
                        ml={1}
                        mb={2}
                        className="mydict"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          fontFamily: "Mulish, sans-serif",
                        }}
                      >
                        {yesOrNo.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setTwoWheeler(event.target.value);
                              setBoth("");
                              setnoparking("");
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                              marginBottom: "15px",
                            }}
                          >
                            <input
                              type="radio"
                              name="101"
                              value={item}
                              checked={twoWheeler === item}
                              readOnly
                            />
                            <span className="border1">{item}</span>
                          </label>
                        ))}
                      </Grid>
                    </Grid>

                    <Grid item md={2.2} xs={12}>
                      <Grid item>
                        <Typography
                          sx={{ fontSize: { md: "16px" }, fontWeight: 600 }}
                        >
                          4 Wheeler
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        mt={1}
                        
                        mb={2}
                        className="mydict"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          fontFamily: "Mulish, sans-serif",
                          ml:{xs:1,md:-1}
                        }}
                      >
                        {yesOrNo.map((item) => (
                          <label
                            className="mydict1 border1"
                            onChange={(event) => {
                              setFourWheeler(event.target.value);
                              setBoth("");
                              setnoparking("");
                            }}
                            key={item}
                            style={{
                              marginRight: "15px",
                              marginBottom: "15px",
                            }}
                          >
                            <input
                              type="radio"
                              name="2012"
                              value={item}
                              checked={fourWheeler === item}
                              readOnly
                            />
                            <span className="border1">{item}</span>
                          </label>
                        ))}
                      </Grid>
                    </Grid>

                    <Grid item md={1} mr={5} ml={{ md: -10, xs: 0 }}>
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          if (event.target.checked) {
                            setBoth("Both");
                            setTwoWheeler("Yes");
                            setFourWheeler("Yes");
                            setnoparking("");
                          } else {
                            setBoth("");
                            setnoparking("");
                            setTwoWheeler("");
                            setFourWheeler("");
                          }
                        }}
                        style={{
                          marginRight: "15px",
                          marginBottom: "15px",
                          fontFamily: "Mulish, sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <input
                          type="checkbox"
                          name="102wfeg"
                          value={both}
                          checked={both === "Both"}
                          readOnly
                        />
                        <span className="border1" style={{ fontWeight: "600" }}>
                          Both
                        </span>
                      </label>
                    </Grid>

                    <Grid item md={1.2}>
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          if (event.target.checked) {
                            setnoparking("No Parking");
                            setBoth("");
                            setTwoWheeler("No");
                            setFourWheeler("No");
                          } else {
                            setnoparking("");
                            setBoth("");
                            setTwoWheeler("");
                            setFourWheeler("");
                          }
                        }}
                        style={{
                          marginRight: "15px",
                          marginBottom: "15px",
                          fontFamily: "Mulish, sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <input
                          type="checkbox"
                          name="102"
                          value={noparking}
                          checked={noparking === "No Parking"}
                          readOnly
                        />
                        <span className="border1" style={{ fontWeight: "600" }}>
                          No parking
                        </span>
                      </label>
                    </Grid>
                  </Grid>
                  <Grid container>
                    {" "}
                    <Grid item xs={12} md={2}>
                      {two && (
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Autocomplete
                            value={twoWheelerClosedType}
                            options={parkingVehicleNumber}
                            getOptionLabel={(option) => option}
                            onChange={(event, newValue) => {
                              settwoWheelerClosedType(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Closed Type 2W"
                                variant="outlined"
                                size={isMobile ? "small" : "medium"}
                                sx={{ maxWidth: {xs:"100%",md:"90%"} }}
                              />
                            )}
                          />
                          <Autocomplete
                            value={twoWheelerOpenType}
                            options={parkingVehicleNumber}
                            getOptionLabel={(option) => option}
                            onChange={(event, newValue) => {
                              settwoWheelerOpenType(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Open Type 2W"
                                variant="outlined"
                                size={isMobile ? "small" : "medium"}
                                sx={{ maxWidth: {xs:"100%",md:"90%"} }}
                              />
                            )}
                          />
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={2}>
                      {four && (
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Autocomplete
                            value={fourWheelerClosedType}
                            options={parkingVehicleNumber}
                            getOptionLabel={(option) => option}
                            onChange={(event, newValue) => {
                              setfourWheelerClosedType(newValue); // Handle null newValue
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Closed Type 4W"
                                variant="outlined"
                                size={isMobile ? "small" : "medium"}
                                sx={{ maxWidth: {xs:"100%",md:"90%"} }}
                              />
                            )}
                          />

                          <Autocomplete
                            value={fourWheelerOpenType}
                            options={parkingVehicleNumber}
                            getOptionLabel={(option) => option}
                            onChange={(event, newValue) => {
                              setfourWheelerOpenType(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Open Type 4W"
                                variant="outlined"
                                size={isMobile ? "small" : "medium"}
                                sx={{ maxWidth: {xs:"100%",md:"90%"} }}
                              />
                            )}
                          />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </>
              )}

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                ml: { xs: 1 },
                width: { md: "100%" },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 2.5 },
                  mr: { xs: "30%" },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Power Backup
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
                  mb: { xs: 1.5 },
                  fontFamily: "Mulish, sans-serif",
                }}
              >
                {backup.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setPowerBackUp(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "15px" }}
                  >
                    <input
                      type="radio"
                      name="2017"
                      value={item}
                      checked={powerBackUp === item}
                      readOnly
                    />
                    <span className="border1">{item}</span>
                  </label>
                ))}
              </Grid>
            </Grid>

            {/* {(formData.propertiesType === "Industrial Plot/Land" ||
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
                  ml: { xs: 1 },
                  mt: 2,
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
                    sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                  >
                    Facing
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
                    mt: 1.5,
                  }}
                >
                  {facingList.map((item) => (
                    <label
                      className="mydict1 border1"
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "25px" }}
                    >
                      <input
                        type="radio"
                        name="facingGroup" // Use a common name for radio button group
                        onChange={() => {
                          setfacing(item); // Set the facing state to the value of the selected radio button
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
            )} */}

            {(formData.propertiesType === "Shed/Factory" ||
              formData.subProperty === "Shed/Factory" ||
              formData.propertiesType === "Warehouse/Godown" ||
              formData.subProperty === "Warehouse/Godown") && (
              <Grid container mt={1.5} sx={{ mb: { md: 0 } }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Flooring Type
                </Typography>
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
                  {flooringTypeList.map((item) => (
                    <label
                      className="mydict1 border1"
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "25px" }}
                    >
                      <input
                        type="radio"
                        name="flooringType"
                        value={item} // Set value to the item, not flooringType
                        onChange={(event) => {
                          setFlooringType(event.target.value);
                        }}
                        checked={flooringType === item}
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
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                ml: { xs: 1 },
                width: { md: "100%" },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 2.5 },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Water Source
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
                  fontFamily: "Mulish, sans-serif",
                }}
              >
                {watersource.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setWaterSource(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="2015"
                      value={item}
                      checked={waterSource === item}
                      readOnly
                    />
                    <span className="border1">{item}</span>
                  </label>
                ))}
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                ml: { xs: 1 },
                width: { md: "100%" },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 2.5 },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Over Looking View  
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
                  fontFamily: "Mulish, sans-serif",
                }}
              >
                {overlookingview.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setOverLookingView(event.target.value);
                     
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="2075"
                      value={item}
                      checked={overLookingView === item}
                      readOnly
                    />
                    <span className="border1">{item}</span>
                  </label>
                ))}
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={12} item sx={{ width: { md: "15%", mt: 2 } }}>
                
                <TextField
                  fullWidth
                  label="Front Road Width"
                  id="demo-simple-select"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    maxWidth: { md: "60.1%", xs: "100%" },
                    minWidth: { md: "10%", xs: "90%" },
                  }}
                  onChange={(event) => {
                    setRoadWidth(event.target.value);
                  }}
                  value={roadWidth}
                  InputProps={{
                    endAdornment: (
                      <Grid
                        item
                        sx={{
                          maxWidth: { md: "30.3%", xs: "40%" },
                          mr: 0,
                          maxHeight: "50px",
                          mt: -3,
                        }}
                      >
                        <Box style={{ display: "flex", alignItems: "center" }}>
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
                              "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
                                display: "none",
                              },
                              minWidth: { md: "100%" },
                              "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                { display: "none" },
                            }}
                            onChange={(event) => {
                              setroadWidthUnit(event.target.value);
                            }}
                            value={roadWidthUnit}
                          >
                            <MenuItem value="Feet">Feet</MenuItem>
                            <MenuItem value="Meter">Meter</MenuItem>
                          </TextField>
                        </Box>
                      </Grid>
                    ),
                  }}
                ></TextField>
              </Grid>
            </Grid>
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
            <b>
              <span>Room Details</span>
            </b>
          </Typography>
          <Grid
            container
            sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                ml: { xs: 1 },
                mb: { xs: 1.5 },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 1.5 },
                  mr: { xs: "30%" },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Room Type
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
                  fontFamily: "Mulish, sans-serif",
                }}
              >
                {roomtype.map((item, index) => (
                  <label
                    className="mydict1 border1"
                    key={item}
                    style={{
                      marginRight: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <input
                      type="checkbox"
                      name={index}
                      value={item}
                      checked={roomType.includes(item)}
                      onChange={(event) => {
                        const { value, checked } = event.target;
                        if (checked) {
                          setroomType([...roomType, value]);
                        } else {
                          setroomType(
                            roomType.filter((item) => item !== value)
                          );
                        }
                      }}
                    />
                    <span className="border1">{item}</span>
                  </label>
                ))}
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "Column",
                flexWrap: "wrap",
                ml: { xs: 1 },
                mb: { xs: 1.5 },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mr: { xs: "30%" },
                  mb: { xs: 1.5 },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Total Beds in the Room
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
                  mb: { xs: 1.5 },
                  fontFamily: "Mulish, sans-serif",
                }}
              >
                {noOfBedsInRooms.map((item) => (
                  <label
                    className="mydict1 border1"
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "20px" }}
                  >
                    <input
                      type="checkbox"
                      name={item}
                      value={item}
                      checked={noOfBedsinRoom.includes(item)}
                      onChange={(event) => {
                        const { value, checked } = event.target;
                        if (checked) {
                          setnoOfBedsinRoom([...noOfBedsinRoom, value]);
                        } else {
                          setnoOfBedsinRoom(
                            noOfBedsinRoom.filter((item) => item !== value)
                          );
                        }
                      }}
                    />
                    <span className="border1">{item}</span>
                  </label>
                ))}
              </Grid>
            </Grid>

            <Grid container>
              <Grid
                item
                md={3}
                xs={12}
                sx={{ mb: -4, ml: { md: 1, xs: 1 }, flexWrap: "wrap" }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Rent Amount
                </Typography>
                <TextField
                  placeholder="Rent Amount"
                  helperText={` ${NumberToWordsConverter({
                    value: pgRentAmount,
                  })}`}
                  id="demo-simple-select"
                  sx={{
                    minWidth: "95%",
                    maxWidth: "100%",
                    "& .MuiFormHelperText-root": {
                      marginBottom: "10px",
                    },
                  }}
                  onChange={(event) => {
                    setRentAmount(event.target.value);
                  }}
                  value={pgRentAmount}
                  InputProps={{
                    endAdornment: (
                      <Grid
                        item
                        sx={{
                          maxWidth: { md: "30.3%", xs: "40%" },

                          maxHeight: "50px",
                          mt: -3,
                        }}
                      >
                        <Box style={{ display: "flex", alignItems: "center" }}>
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
                            label="Unit"
                            select
                            id="demo-simple-select"
                            sx={{
                              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "none !important",
                                },
                              "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
                                display: "none",
                              },
                              minWidth: { md: "100%" },
                              "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                                { display: "none" },
                            }}
                            onChange={(event) => {
                              setRentPer(event.target.value);
                            }}
                            value={pgRentType}
                          >
                            {formData.buildingType === "Commercial" ||
                              (formData.buildingType === `Industrial` && (
                                <MenuItem value="Per Sq.Seat">
                                  Per Seat
                                </MenuItem>
                              ))}
                            <MenuItem value="Per Sq.ft">Per Sq.ft</MenuItem>
                            <MenuItem value="Monthly">Per Month</MenuItem>
                          </TextField>
                        </Box>
                      </Grid>
                    ),
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <>
              <Grid
                container
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "15px", xs: "10px" },
                  mb: { xs: 1, md: 1.5 },
                  ml: 1,
                }}
              >
                <Typography
                  sx={{ fontSize: "18px", fontWeight: 600, mt: 2, mb: 2 }}
                >
                  Parking Type
                </Typography>
              </Grid>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  ml: { xs: 1, md: 0 },
                }}
              >
                <Grid item md={2} xs={12} sx={{ ml: { md: 1 } }}>
                  <Typography
                    sx={{
                      fontSize: { md: "16px" },
                      fontWeight: 600,
                      ml: { md: 1 },
                    }}
                  >
                    2 Wheeler
                  </Typography>
                  <Grid
                    container
                    mt={1}
                    ml={1}
                    mb={2}
                    className="mydict"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      fontFamily: "Mulish, sans-serif",
                    }}
                  >
                    {yesOrNo.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          setTwoWheeler(event.target.value);
                        }}
                        key={item}
                        style={{
                          marginRight: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        <input
                          type="radio"
                          name="101"
                          value={item}
                          checked={twoWheeler === item}
                          readOnly
                        />
                        <span className="border1">{item}</span>
                      </label>
                    ))}
                  </Grid>
                  {two && (
                    <Grid item>
                      <Grid item>
                        <Autocomplete
                          value={twoWheelerClosedType}
                          options={parkingVehicleNumber}
                          getOptionLabel={(option) => option}
                          onChange={(event, newValue) => {
                            settwoWheelerClosedType(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Closed Type 2W"
                              variant="outlined"
                              sx={{ maxWidth: "60%" }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item mb={2}>
                        <Autocomplete
                          value={twoWheelerOpenType}
                          options={parkingVehicleNumber}
                          getOptionLabel={(option) => option}
                          onChange={(event, newValue) => {
                            settwoWheelerOpenType(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Open Type 2W"
                              variant="outlined"
                              sx={{ maxWidth: "60%" }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>

                <Grid item md={2.2} xs={12}>
                  <Grid item>
                    <Typography
                      sx={{ fontSize: { md: "16px" }, fontWeight: 600 }}
                    >
                      4 Wheeler
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    mt={1}
                    ml={-1}
                    mb={2}
                    className="mydict"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      fontFamily: "Mulish, sans-serif",
                    }}
                  >
                    {yesOrNo.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          setFourWheeler(event.target.value);
                        }}
                        key={item}
                        style={{
                          marginRight: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        <input
                          type="radio"
                          name="2012"
                          value={item}
                          checked={fourWheeler === item}
                          readOnly
                        />
                        <span className="border1">{item}</span>
                      </label>
                    ))}
                  </Grid>
                  {four && (
                    <Grid item>
                      <Grid item>
                        <Autocomplete
                          value={fourWheelerClosedType}
                          options={parkingVehicleNumber}
                          getOptionLabel={(option) => option}
                          onChange={(event, newValue) => {
                            setfourWheelerClosedType(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Closed Type 4W"
                              variant="outlined"
                              sx={{ maxWidth: "60%" }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item mb={2}>
                        <Autocomplete
                          value={fourWheelerOpenType}
                          options={parkingVehicleNumber}
                          getOptionLabel={(option) => option}
                          onChange={(event, newValue) => {
                            setfourWheelerOpenType(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Open Type 4W"
                              variant="outlined"
                              sx={{ maxWidth: "60%" }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>

                <Grid item md={1} mr={5} ml={100}>
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setBoth("No Parking");
                      } else {
                        setBoth("");
                      }
                    }}
                    style={{
                      marginRight: "15px",
                      marginBottom: "15px",
                      fontFamily: "Mulish, sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="102wfeg"
                      value={both}
                      checked={both === "No Parking"}
                      readOnly
                    />
                    <span className="border1" style={{ fontWeight: "600" }}>
                      Both
                    </span>
                  </label>
                </Grid>

                <Grid item md={1}>
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setnoparking("No Parking");
                      } else {
                        setnoparking("");
                      }
                    }}
                    style={{
                      marginRight: "15px",
                      marginBottom: "15px",
                      fontFamily: "Mulish, sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="102"
                      value={noparking}
                      checked={noparking === "No Parking"}
                      readOnly
                    />
                    <span className="border1" style={{ fontWeight: "600" }}>
                      No parking
                    </span>
                  </label>
                </Grid>
              </Grid>
            </>
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
                marginTop: { md: "5px", xs: "10px" },
                mb: { xs: 1.5 },
                mr: { xs: "30%" },
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                Facility Offered
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
                mb: { xs: 1.5 },
                fontFamily: "Mulish, sans-serif",
              }}
            >
              {facilityoffers.map((item, index) => (
                <label
                  className="mydict1 border1"
                  key={item}
                  style={{
                    marginRight: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <input
                    type="checkbox"
                    name={index}
                    value={item}
                    checked={facilityOffered.includes(item)}
                    onChange={(event) => {
                      const { value, checked } = event.target;
                      if (checked) {
                        setfacilityOffered([...facilityOffered, value]);
                      } else {
                        setfacilityOffered(
                          facilityOffered.filter((item) => item !== value)
                        );
                      }
                    }}
                  />
                  <span className="border1" sx={{ mb: { xs: 1.5 } }}>
                    {item}
                  </span>
                </label>
              ))}
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
              send();
              next();
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

export default AdditionalDetails;
