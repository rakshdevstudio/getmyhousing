import React, { useEffect, useState } from "react";
import { Button, MenuItem, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import "./Commercial.css";
import { Box, Grid } from "@mui/material";
import { ToWords } from "to-words";

const BrakerageDetails = ({
  next,
  back,
  formData,
  updateFormData,
  detailsId,
}) => {
  const [brokerage, setBrokerage] = useState(formData.brokerage || "");
  const [brokeragedata, setBrokeragedata] = useState(
    formData.brokerageValue || ""
  );
  const [brokerageUnit, setBrokerageUnit] = useState(
    formData.brokerageUnit || ""
  );
  const [showbrokerageLabel, setshowbrokerageLabel] = useState("");
  const [showbrokerageHelper, setshowbrokerageHelper] = useState("");
  const [showbrokerage, setShowBrokerage] = useState(false);
  const data5 = { brokerage, brokeragedata, brokerageUnit };

  const send = () => {
    updateFormData(data5);
  };

  const priceincludeoptions = ["No Brokerage", "Fixed", "Based on Rent"];
  const priceincludeoptionsRent = ["No Brokerage", "Based on Sale"];
  useEffect(() => {
    if (brokerage === "Fixed") {
      setShowBrokerage(true);
      setshowbrokerageLabel("");
      setshowbrokerageHelper("Enter Amount in ₹");
    } else if (brokerage === "Based on Sale") {
      setShowBrokerage(true);
      setshowbrokerageLabel("");
      setshowbrokerageHelper("Brokerage (Sale)");
    } else setShowBrokerage(false);
  }, [brokerage]);

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              ml: { xs: 2 },
              width: "auto",
            }}
          >
            <Grid
              item
              sx={{
                marginRight: { md: "17px", xs: "10px" },
                marginTop: { md: "15px", xs: "2px" },
              }}
            >
             <Typography sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}>
                Brokerage Type
              </Typography>
            </Grid>
            <Grid
              container
              ml={1}
              mt={2}
              className="mydict"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                flexWrap: "wrap",
              }}
            >
              {(formData.propertyListingType === "Lease"
                ? priceincludeoptions
                : priceincludeoptionsRent
              ).map((item) => (
                <label
                  className="mydict1 border1"
                  onChange={(event) => {
                    setBrokerage(event.target.value);
                  }}
                  key={item}
                  style={{ marginRight: "15px", marginBottom: "20px" }}
                >
                  <input
                    type="radio"
                    name="20wds1"
                    value={item}
                    checked={brokerage === item}
                    readOnly
                  />
                  <span className="border1">{item}</span>
                </label>
              ))}
            </Grid>
            {showbrokerage && (
              <Grid container>
                <Grid item xs={12} md={8}
                
                 sx={{ width: { xs: "100%", md: "31.2%" }, ml: -1 }}>
                  <Typography sx={{ fontSize: { md: "17px" }, ml: 1 }}>
                    {showbrokerageLabel}
                  </Typography>
                  <TextField
                    label={showbrokerageHelper}
                    id="demo-simple-select"
                    value={brokeragedata}
                    size={isMobile ? "small" : "medium"}
                    sx={{ minWidth: { xs: "100%", md: "55.5%" } }}
                    onChange={(event) => {
                      const input = event.target.value;
                      if (/^\d*\.?\d*$/.test(input) || input === "") {
                        setBrokeragedata(input);
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <Grid
                          item
                          sx={{
                            maxWidth: { md: "42%", xs: "40%" },
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
                                setBrokerageUnit(event.target.value);
                              }}
                              value={brokerageUnit}
                            >
                              <MenuItem value="Total amount">
                                Total amount
                              </MenuItem>
                              <MenuItem value="in %">in %</MenuItem>
                            </TextField>
                          </Box>
                        </Grid>
                      ),
                    }}
                  ></TextField>
                  {brokeragedata && (
                    <Typography sx={{ fontSize: "14px", color: "gray", mt: 0 }}>
                      {toWords.convert(brokeragedata)}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
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

export default BrakerageDetails;
