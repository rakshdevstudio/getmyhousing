import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./Commercial.css";
import { Box, Grid, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ToWords } from "to-words";
import {
  yesOrNo,
  securitydeposit,
  validAmountChecker,
} from "../../../../../common/common";

const PropertyRent = ({ next, back, formData, updateFormData, detailsId }) => {
  const [showDate, setshowDate] = useState(false);
  const [rentAmount, setRentAmount] = useState(formData.rentAmount);
  const validateAmount = validAmountChecker(rentAmount, 4);
  const [saleAmountInWords, setSaleAmountInWords] = useState(null);
  const [rentAmountError, setRentAmountError] = useState(false);
  const [rentAmountHelperText, setRentAmountHelperText] = useState("");

  function validateField() {
    let validate = true;
    if (!validateAmount) {
      setRentAmountError(true);
      setRentAmountHelperText("Please Enter Valid Amount");
      validate = false;
    }
    if (validate) {
      next();
      send();
    }
  }

  useEffect(() => {
    if (!rentAmount) {
      setSaleAmountInWords("");
    } else {
      setSaleAmountInWords(toWords.convert(rentAmount));
    }
  }, [rentAmount]);

  const [rentType, setRentPer] = useState(formData.rentType || "Monthly");
  const [maintenanceAmout, setMaintenanceAmout] = useState(
    formData.maintenanceAmout
  );

  const [maintenanceAmoutInWords, setMaintenanceAmoutInWords] = useState(null);
  useEffect(() => {
    if (!maintenanceAmout) {
      setMaintenanceAmoutInWords("");
    } else {
      setMaintenanceAmoutInWords(toWords.convert(maintenanceAmout));
    }
  }, [maintenanceAmout]);

  const [maintananceCostType, setMaintenanceAmoutPer] = useState(
    formData.maintananceCostType || "Monthly"
  );
  const [securityDeposit, setSecurityDeposit] = useState(
    formData.securityDeposit
  );
  const [customSecurityDeposit, setCustomSecurityDeposit] = useState(
    formData.customSecurityDeposit
  );
  const [customSecurityDepositInWords, setCustomSecurityDepositInWords] =
    useState(null);
  useEffect(() => {
    if (!customSecurityDeposit) {
      setCustomSecurityDepositInWords("");
    } else {
      setCustomSecurityDepositInWords(toWords.convert(customSecurityDeposit));
    }
  }, [customSecurityDeposit]);

  const [bookingAmount, setBookingAmount] = useState(formData.bookingAmount);

  const [bookingAmountInWords, setBookingAmountInWords] = useState(null);
  useEffect(() => {
    if (!bookingAmount) {
      setBookingAmountInWords("");
    } else {
      setBookingAmountInWords(toWords.convert(bookingAmount));
    }
  }, [bookingAmount]);

  const [lockInPeriod, setLockInPeriod] = useState(formData.lockInPeriod);
  const [lockInPeriodType, setLockInPeriodPer] = useState(
    formData.lockInPeriodType || "Year"
  );
  const [rentIncrement, setRentIncrement] = useState(formData.rentIncrement);
  // const [rentIncrementPer, setRentIncrementPer] = useState(formData.rentIncrementPer);
  const [nonVeg, setnonVeg] = useState(formData.nonVeg);
  const [oppSex, setoppSex] = useState(formData.oppSex);
  const [time, setTime] = useState(formData.time);
  const [visitor, setvisitor] = useState(formData.visitor);
  const [guardian, setguardian] = useState(formData.guardian);
  const [drinks, setdrinks] = useState(formData.drinks);
  const [smoking, setsmoking] = useState(formData.smoking);

  const data5 = {
    rentAmount,
    rentType,
    maintenanceAmout,
    maintananceCostType,
    securityDeposit,
    customSecurityDeposit,
    bookingAmount,
    lockInPeriod,
    lockInPeriodType,
    rentIncrement,
    nonVeg,
    oppSex,
    time,
    visitor,
    guardian,
    drinks,
    smoking,
  };

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: true,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        // name: "Rupee",
        // plural: "Rupees",
        symbol: "₹",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });
  const send = () => {
    updateFormData(data5);
  };

  useEffect(() => {
    if (securityDeposit === "Custom") {
      setshowDate(true);
    } else setshowDate(false);
  }, [securityDeposit]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ marginTop: 5, marginBottom: 5, ml: { xs: 2, md: -0.1 } }}>
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
            sx={{
              display: "flex",
              flexGrow: 1,
              flexWrap: "wrap",
            }}
          >
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid item md={6} xs={12} sx={{ mb: 2, ml: { md: 1, xs: -4 } }}>
                <TextField
                  label={
                    formData.propertyListingType === "Rent"
                      ? "Rent Amount "
                      : formData.propertyListingType === "Lease"
                      ? "Lease Amount"
                      : ""
                  }
                  id="demo-simple-select"
                  sx={{
                    minWidth: "60%",
                    maxWidth: "100%",
                    "& .MuiFormHelperText-root": {
                      marginBottom: "10px",
                    },
                  }}
                  onChange={(event) => {
                    setRentAmount(event.target.value);
                    setRentAmountError(false);
                    setRentAmountHelperText("");
                  }}
                  helperText={saleAmountInWords}
                  value={rentAmount}
                  InputProps={{
                    endAdornment: (
                      <Grid
                        item
                        sx={{
                          maxWidth: "40%",
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
                              minWidth: { md: "100%", xs: "1%" },
                            }}
                            onChange={(event) => {
                              setRentPer(event.target.value);
                            }}
                            value={rentType}
                          >
                            {formData.buildingType === "Commercial" ||
                              (formData.buildingType === `Industrial` && (
                                <MenuItem value="Per Sq.Seat">
                                  Per Seat
                                </MenuItem>
                              ))}
                            {/* <MenuItem value="Per Sq.ft">Per Sq.ft</MenuItem> */}
                            <MenuItem value="Monthly">Per Month</MenuItem>
                          </TextField>
                        </Box>
                      </Grid>
                    ),
                  }}
                ></TextField>
              </Grid>

              <Grid item md={6} xs={12} sx={{ mb: 2, ml: { md: 1, xs: -4 } }}>
                <TextField
                  label="Maintainance Amount"
                  id="demo-simple-select"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    minWidth: { md: "80%", xs: "95%" },
                    overflow: { xs: "hidden", md: "visible" },
                    textOverflow: { xs: "ellipsis", md: "clip" },
                    whiteSpace: { xs: "nowrap", md: "normal" },
                  }}
                  onChange={(event) => {
                    setMaintenanceAmout(event.target.value);
                  }}
                  helperText={maintenanceAmoutInWords}
                  value={maintenanceAmout}
                  InputProps={{
                    endAdornment: (
                      <Grid
                        item
                        sx={{
                          maxWidth: { md: "45.3%", xs: "35%" },
                          maxHeight: "50px",
                          mt: -3,
                        }}
                      >
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <Box
                            item
                            sx={{
                              color: "black",
                              fontFamily: "Mulish, sans-serif",
                              fontSize: "24px",
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
                              minWidth: { md: "100%", xs: "1%" },
                            }}
                            onChange={(event) => {
                              setMaintenanceAmoutPer(event.target.value);
                            }}
                            value={maintananceCostType}
                          >
                            <MenuItem value="Per Sq.FT">Per Sq.FT</MenuItem>
                            <MenuItem value="Monthly">Monthly</MenuItem>
                            <MenuItem value="Quarterly">Quarterly</MenuItem>
                            <MenuItem value="Yearly">Yearly</MenuItem>
                            <MenuItem value="One Time">One Time</MenuItem>
                          </TextField>
                        </Box>
                      </Grid>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {formData.propertyListingType !== "Lease" && (
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  ml: { md: 2, xs: -2 },
                }}
              >
                <Grid
                  item
                  md={12}
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "5px", xs: "10px" },
                    mb: { xs: 1 },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { md: "18px" },
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    Security Deposit
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
                    marginBottom: "10px",
                  }}
                >
                  {securitydeposit.map((item) => (
                    <label
                      className="mydict1 border1"
                      onChange={(event) => {
                        setSecurityDeposit(event.target.value);
                      }}
                      key={item}
                      style={{
                        marginRight: "15px",
                        marginBottom: "20px",
                        fontFamily: "Mulish, sans-serif",
                      }}
                    >
                      <input
                        type="radio"
                        name="201"
                        value={item}
                        checked={securityDeposit === item}
                        readOnly
                      />
                      <span className="border1">{item}</span>
                    </label>
                  ))}
                </Grid>
                {showDate && (
                  <Grid
                    item
                    md={3}
                    xs={12}
                    sx={{ mb: 2, ml: { md: 0, xs: -2 } }}
                  >
                    <TextField
                      label="Security Deposit"
                      id="demo-simple-select"
                      sx={{
                        minWidth: "95%",
                        maxWidth: "100%",
                        "& .MuiFormHelperText-root": {
                          marginBottom: "10px",
                        },
                      }}
                      helperText={customSecurityDepositInWords}
                      onChange={(event) => {
                        setCustomSecurityDeposit(event.target.value);
                      }}
                      value={customSecurityDeposit}
                    ></TextField>
                  </Grid>
                )}
              </Grid>
            )}
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid item md={6} xs={12} sx={{ mb: 2, ml: { md: 1, xs: -4 } }}>
                <TextField
                  label="Booking Amount"
                  id="demo-simple-select"
                  size={isMobile ? "small" : "medium"}
                  sx={{ minWidth: { md: "80%", xs: "95%" } }}
                  onChange={(event) => {
                    setBookingAmount(event.target.value);
                  }}
                  helperText={bookingAmountInWords}
                  value={bookingAmount}
                />
              </Grid>

              <Grid item md={6} xs={12} sx={{ mb: -1, ml: { md: 1, xs: -2 } }}>
                <TextField
                  label="Minimum Lock-In Period"
                  id="demo-simple-select"
                  sx={{ minWidth: "60%", maxWidth: "100%" }}
                  onChange={(event) => {
                    setLockInPeriod(event.target.value);
                  }}
                  value={lockInPeriod}
                  InputProps={{
                    endAdornment: (
                      <Grid
                        item
                        sx={{
                          maxWidth: "40%",
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
                              minWidth: { md: "100%", xs: "1%" },
                            }}
                            onChange={(event) => {
                              setLockInPeriodPer(event.target.value);
                            }}
                            value={lockInPeriodType}
                          >
                            <MenuItem value="Month">Months</MenuItem>
                            <MenuItem value="Year">Years</MenuItem>
                          </TextField>
                        </Box>
                      </Grid>
                    ),
                  }}
                ></TextField>
              </Grid>

              {/* <Grid item md={6} xs={12} sx={{ mt: 2, ml: { md: 1, xs: -2 } }}>
                <TextField
                  label={
                    formData.propertyListingType === "Rent"
                      ? "Rent Increment % for Every 11 Months  "
                      : formData.propertyListingType === "Lease"
                      ? "Lease Increment % for Every 11 Months"
                      : ""
                  }
                  id="demo-simple-select"
                  sx={{
                    minWidth: "60%",
                    maxWidth: "100%",
                    "& .MuiFormHelperText-root": {
                      marginBottom: "6px",
                    },
                  }}
                  onChange={(event) => {
                    setRentIncrement(event.target.value);
                  }}
                  value={rentIncrement}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid> */}
              <Grid item md={6} xs={12} sx={{ mb: 2, ml: { md: 1, xs: -4 } }}>
                <TextField
                  label={
                    formData.propertyListingType === "Rent"
                      ? "Rent Increment % for Every 11 Months  "
                      : formData.propertyListingType === "Lease"
                      ? "Lease Increment % for Every 11 Months"
                      : ""
                  }
                  id="demo-simple-select"
                  size={isMobile ? "small" : "medium"}
                  sx={{ minWidth: { md: "80%", xs: "95%" } }}
                  onChange={(event) => {
                    setRentIncrement(event.target.value);
                  }}
                  value={rentIncrement}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
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
            Pg Rules
          </Typography>
          <Grid
            container
            sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}
          >
            <Grid
              container
              ml={1}
              sx={{
                display: "flex",
                flexGrow: 1,
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 1 },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Non-veg Allowed
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
                {yesOrNo.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setnonVeg(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="20"
                      value={item}
                      checked={nonVeg === item}
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
              ml={1}
              mt={1.5}
              sx={{
                display: "flex",
                flexGrow: 1,
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 1 },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Opposite Sex
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
                {yesOrNo.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setoppSex(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="21"
                      value={item}
                      checked={oppSex === item}
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
              ml={1}
              mt={1.5}
              sx={{
                display: "flex",
                flexGrow: 1,
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 1 },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Any Time Allowed
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
                {yesOrNo.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setTime(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="21110"
                      value={item}
                      checked={time === item}
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
              ml={1}
              mt={1.5}
              sx={{
                display: "flex",
                flexGrow: 1,
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 1 },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Visitors Allowed
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
                {yesOrNo.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setvisitor(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="32"
                      value={item}
                      checked={visitor === item}
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
              ml={1}
              mt={1.5}
              sx={{
                display: "flex",
                flexGrow: 1,
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 1 },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Guardian Allowed
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
                {yesOrNo.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setguardian(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="24554"
                      value={item}
                      checked={guardian === item}
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
              ml={1}
              mt={1.5}
              sx={{
                display: "flex",
                flexGrow: 1,
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 1 },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Drinking Allowed
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
                {yesOrNo.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setdrinks(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="852"
                      value={item}
                      checked={drinks === item}
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
              ml={1}
              mt={1.5}
              mb={3}
              sx={{
                display: "flex",
                flexGrow: 1,
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "5px", xs: "10px" },
                  mb: { xs: 1 },
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                  Smoking Allowed
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
                {yesOrNo.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setsmoking(event.target.value);
                    }}
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "25px" }}
                  >
                    <input
                      type="radio"
                      name="454545"
                      value={item}
                      checked={smoking === item}
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

      {rentAmountError && (
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
          {rentAmountHelperText}
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
            {/* <Button
              color="inherit"
              onClick={() => {
                next();
              }}
            >
              Next
            </Button> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PropertyRent;
