import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToWords } from "to-words";

const TenantDetails = ({ next, back, formData, updateFormData, detailsId }) => {
  const [presentTenant, setPresentTenant] = useState("");
  const [keepItPrivate, setKeepItPrivate] = useState(formData.keepItPrivate);
  const [roi, setRoi] = useState("");
  const [lockinPeriodDate, setLockinPeriodDate] = useState("");
  const [leasePeriodDate, setLeasePeriodDate] = useState("");

  const [tenentBachelorsAllowed, setTenentBachelorsAllowed] = useState(
    formData.tenentBachelorsAllowed
  );

  const data4 = {
    tenentBachelorsAllowed,
  };
  const send = () => updateFormData(data4);

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: true,
      currencyOptions: {
        symbol: "₹",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });

  const [securityDeposite, setSecurityDeposite] = useState(
    formData.securityDeposite
  );
  const [securityDepositeInWords, setSecurityDepositeInWords] = useState(null);
  useEffect(() => {
    if (!securityDeposite) {
      setSecurityDepositeInWords("");
    } else {
      setSecurityDepositeInWords(toWords.convert(securityDeposite));
    }
  }, [securityDeposite]);


  const [incomePermonth, setIncmePermont] = useState(formData.incomePermonth);
  const [incomePermonthInWords, setIncmePermontInWords] = useState(null);
  useEffect(() => {
    if (!incomePermonth) {
      setIncmePermontInWords("");
    } else {
      setIncmePermontInWords(toWords.convert(incomePermonth));
    }
  }, [incomePermonth]);


  const [escalation, setEscalation] = useState(formData.escalation);
  const [escalationInWords, setEscalationInWords] = useState(null);
  useEffect(() => {
    if (!escalation) {
      setEscalationInWords("");
    } else {
      setEscalationInWords(toWords.convert(escalation));
    }
  }, [escalation]);

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          ml: 1,
          mr: { md: "50%" },
        }}
      >
        <Grid
          item
          sx={{
            marginRight: { md: "17px", xs: "10px" },
            marginTop: { md: "15px", xs: "10px" },
          }}
        >
          <TextField
            label="Rental Income per Month"
            id="demo-simple-select"
            sx={{ minWidth: { md: "25%", xs: "95%" } }}
            onChange={(event) => {
              setIncmePermont(event.target.value);
            }}
            helperText={incomePermonthInWords}
            value={incomePermonth}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          ml: 1,
          mr: { md: "50%" },
          mt: 2,
        }}
      >
        <Grid
          item
          sx={{
            marginRight: { md: "17px", xs: "10px" },
            marginTop: { md: "15px", xs: "10px" },
          }}
        >
          <TextField
            label="Enter Tenant Name"
            id="demo-simple-select"
            value={presentTenant}
            sx={{ minWidth: { md: "25%", xs: "95%" }, mb: 1 }}
            onChange={(event) => {
              setPresentTenant(event.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid container>
        <Grid container  mt={1}>
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
                        />
                         {" "} Keep it private 
                      </label>
                    </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          ml: 1,
          mr: { md: "50%" },
        }}
      >
        <Grid
          item
          sx={{
            marginRight: { md: "17px", xs: "10px" },
            marginTop: { md: "15px", xs: "10px" },
          }}
        >
          <TextField
            label="Enter ROI %"
            id="demo-simple-select"
            value={roi}
            sx={{ minWidth: { md: "25%", xs: "95%" } }}
            onChange={(event) => {
              setRoi(event.target.value);
            }}
          ></TextField>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          marginRight: { md: "17px", xs: "10px" },
          marginTop: { md: "15px", xs: "10px" },
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "18px" },
            fontWeight: 600,
            ml: 1,
            mb: 1.5,
          }}
        >
          Lockin Period Date Starts
        </Typography>
        <TextField
          placeholder="Date"
          type="date"
          id="demo-simple-select"
          value={lockinPeriodDate}
          sx={{ minWidth: { md: "25%", xs: "95%" }, ml: 1 }}
          onChange={(event) => {
            setLockinPeriodDate(event.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid
        item
        sx={{
          marginRight: { md: "17px", xs: "10px" },
          marginTop: { md: "15px", xs: "10px" },
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "18px" },
            fontWeight: 600,
            ml: { md: 1 },
            mb: 1.5,
          }}
        >
          Lease Period Date Starts
        </Typography>
        <TextField
          placeholder="Date"
          id="demo-simple-select"
          type="date"
          value={leasePeriodDate}
          sx={{ minWidth: { md: "25%", xs: "95%" }, ml: 1 }}
          onChange={(event) => {
            setLeasePeriodDate(event.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid
        item
        sx={{
          marginRight: { md: "17px", xs: "10px" },
          marginTop: { md: "15px", xs: "10px" },
        }}
      >
        <TextField
         label="Escalation Every Year"
          id="demo-simple-select"
          value={escalation}
          sx={{ minWidth: { md: "25%", xs: "95%" }, ml: 1, mt: 2 }}
          onChange={(event) => {
            setEscalation(event.target.value);
          }}
          helperText={escalationInWords}
        />

      </Grid>
      <Grid
        item
        sx={{
          marginRight: { md: "17px", xs: "10px" },
          marginTop: { md: "15px", xs: "10px" },
        }}
      >
        <TextField
          label="Security Deposit Paid"
          id="demo-simple-select"
          value={securityDeposite}
          sx={{ minWidth: { md: "25%", xs: "95%" }, ml: 1, mt: 2 }}
          onChange={(event) => {
            setSecurityDeposite(event.target.value);
          }}
          helperText={securityDepositeInWords}
        />
      </Grid>
      <Box sx={{ marginTop: 5, marginBottom: 5 }}>
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
    </>
  );
};

export default TenantDetails;
