import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Hidden,
  InputAdornment,
  OutlinedInput,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./Commercial.css";
import { Box, Grid, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ToWords } from "to-words";
import {
  priceincludeoptions,
  unitSaleList,
  validAmountChecker,
} from "../../../../../common/common";

const PropertyRent = ({ next, back, formData, updateFormData, detailsId }) => {
  // const [showDate, setshowDate] = useState(false);
  const [rentAmount, setRentAmount] = useState(formData.rentAmount);
  const validateAmount = validAmountChecker(rentAmount, 4);
  const [saleAmountInWords, setSaleAmountInWords] = useState(null);
  const [rentAmountError, setRentAmountError] = useState(false);
  const [rentAmountHelperText, setRentAmountHelperText] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [perSqftPrice, setPerSqftPrice] = useState(formData.perSqftPrice);

  function validateField() {
    let validate = true;
    if (!validateAmount) {
      setRentAmountError(true);
      setRentAmountHelperText("Please Enter Valid Sale Amount");
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

  const [rentType, setRentPer] = useState(formData.rentType || "Total Amount");
  const [selectPriceInclude, setSelectPriceInclude] = useState(
    formData.selectPriceInclude || []
  );
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
  const [bookingAmount, setBookingAmount] = useState(formData.bookingAmount);
  const [bookingAmountInWords, setBookingAmountInWords] = useState(null);
  useEffect(() => {
    if (!bookingAmount) {
      setBookingAmountInWords("");
    } else {
      setBookingAmountInWords(toWords.convert(bookingAmount));
    }
  }, [bookingAmount]);

  const data5 = {
    rentAmount,
    rentType,
    selectPriceInclude,
    maintenanceAmout,
    maintananceCostType,
    bookingAmount,
    perSqftPrice,
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
            spacing={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: { md: 1 },
              mb: { md: 3 },
            }}
          >
            <Grid item md={6} xs={12}>
              <TextField
                label="Sale Amount *"
                id="demo-simple-select"
                size={isMobile ? "small" : "medium"}
                sx={{ minWidth: { md: "80%", xs: "95%" } }} // Increased width to 100%
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
                        maxWidth: { md: "45.3%", xs: "35%" },
                        maxHeight: "50px",
                        mt: -3,
                      }}
                    >
                      <Autocomplete
                        value={rentType}
                        onChange={(event, newValue) => {
                          setRentPer(newValue);
                        }}
                        options={unitSaleList}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => (
                          <Box
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                                minWidth: { md: "100%", xs: "1%" },
                              }}
                            />
                          </Box>
                        )}
                      />
                    </Grid>
                  ),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <OutlinedInput
                id="outlined-adornment-weight"
                placeholder="Enter Per sqft Amount"
                onChange={(e) => setPerSqftPrice(e.target.value)}
                value={perSqftPrice}
                endAdornment={
                  <InputAdornment position="end">Per Sqft</InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                sx={{ width: "78%" }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
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
            {formData.propertiesType !== "Industrial Plot/Land" &&
              formData.propertiesType !== "Residential Plot/Land" &&
              formData.propertiesType !== "Farm Plot/Land" &&
              formData.propertiesType !== "Industrial Building" &&
              formData.buildingType !== "Commercial" &&
              formData.propertiesType !== "Warehouse/Godown" &&
              formData.propertiesType !== "Shed/Factory" && (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "auto",
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
                      sx={{
                        fontSize: { md: "18px" },
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Select Price Include
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    mt={1.5}
                    className="mydict"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {priceincludeoptions.map((item) => (
                      <label
                        className="mydict1 border1"
                        key={item}
                        style={{
                          marginRight: "15px",
                          marginBottom: "25px",
                          userSelect: "none",
                        }}
                      >
                        <input
                          type="checkbox"
                          name="20wds1"
                          value={item}
                          onChange={(event) => {
                            const value = event.target.value;
                            setSelectPriceInclude((selectedItems) => {
                              if (selectedItems.includes(value)) {
                                // If item already selected, remove it
                                return selectedItems.filter(
                                  (item) => item !== value
                                );
                              } else {
                                // Otherwise, add it to selected items
                                return [...selectedItems, value];
                              }
                            });
                          }}
                          checked={selectPriceInclude.includes(item)} // Check if the item is included in selected items
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

export default PropertyRent;
