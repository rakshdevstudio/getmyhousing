import React, { useState } from "react";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import "./Commercial.css";
import { Box, Grid, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";

const LandMark = ({ next, back, formData, updateFormData, detailsId }) => {
  const [hospitalDistance, setHospitalDistance] = useState(
    formData.hospitalDistance
  );
  const [hospitalDistanceUnit, setHospitalDistanceUnit] = useState(
    formData.hospitalDistanceUnit
  );
  const [airportDistance, setAirportDistance] = useState(
    formData.airportDistance
  );
  const [airportDistanceUnit, setAirportDistanceUnit] = useState(
    formData.airportDistanceUnit
  );
  const [railwayDistance, setRailwayDistance] = useState(
    formData.railwayDistance
  );
  const [railwayDistanceUnit, setRailwayDistanceUnit] = useState(
    formData.railwayDistanceUnit
  );
  const [atmDistance, setAtmDistance] = useState(formData.atmDistance);
  const [atmDistanceUnit, setAtmDistanceUnit] = useState(
    formData.atmDistanceUnit
  );
  const [schoolDistance, setschoolDistance] = useState(formData.schoolDistance);
  const [schoolDistanceUnit, setschoolDistanceUnit] = useState(
    formData.schoolDistanceUnit
  );
  const [shoppingMallDistance, setshoppingMallDistance] = useState(
    formData.shoppingMallDistance
  );
  const [shoppingMallDistanceUnit, setshoppingMallDistanceUnit] = useState(
    formData.shoppingMallDistanceUnit
  );
  const [bankDistance, setbankDistance] = useState(formData.bankDistance);
  const [bankDistanceUnit, setbankDistanceUnit] = useState(
    formData.bankDistanceUnit
  );
  const [busStopDistance, setbusStopDistance] = useState(
    formData.busStopDistance
  );
  const [busStopDistanceUnit, setbusStopDistanceUnit] = useState(
    formData.busStopDistanceUnit
  );
  const [metroDistance, setmetroDistance] = useState(formData.metroDistance);
  const [metroDistanceUnit, setmetroDistanceUnit] = useState(
    formData.metroDistanceUnit
  );

  const data3 = {
    hospitalDistance,
    hospitalDistanceUnit,
    metroDistance,
    airportDistance,
    bankDistanceUnit,
    airportDistanceUnit,
    railwayDistance,
    busStopDistance,
    railwayDistanceUnit,
    atmDistance,
    busStopDistanceUnit,
    atmDistanceUnit,
    schoolDistance,
    schoolDistanceUnit,
    shoppingMallDistance,
    shoppingMallDistanceUnit,
    bankDistance,
    metroDistanceUnit,
  };
  const send = () => updateFormData(data3);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [hospitalDistanceError, setHospitalDistanceError] = useState(false);
  const [airportDistanceError, setAirportDistanceError] = useState(false);
  const [railwayDistanceError, setRailwayDistanceError] = useState(false);
  const [atmDistanceError, setAtmDistanceError] = useState(false);
  const [schoolDistanceError, setschoolDistanceError] = useState(false);
  const [shoppingMallDistanceError, setshoppingMallDistanceError] =
    useState(false);
  const [bankDistanceError, setbankDistanceError] = useState(false);
  const [busStopDistanceError, setbusStopDistanceError] = useState(false);
  const [metroDistanceError, setmetroDistanceError] = useState(false);

  const handleDistanceChange = (event, setDistance, setError) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setDistance(value);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: { md: "40ch", xs: "100%" } },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}
        >
          <Grid item md={4}>
            <TextField
              placeholder="Hospital Distance"
              id="demo-simple-select-hospital"
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { md: "95%" } }}
              onChange={(event) =>
                handleDistanceChange(
                  event,
                  setHospitalDistance,
                  setHospitalDistanceError
                )
              }
              value={hospitalDistance}
              error={hospitalDistanceError}
              helperText={
                hospitalDistanceError ? "Please enter a valid number" : ""
              }
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
                        label="Meter"
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
                          minWidth: "100%",
                          "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                            { display: "none" },
                        }}
                        onChange={(event) => {
                          setHospitalDistanceUnit(event.target.value);
                        }}
                        value={hospitalDistanceUnit}
                      >
                        <MenuItem value="Meter">Meter</MenuItem>
                        <MenuItem value="Kilometers">Kilometers</MenuItem>
                      </TextField>
                    </Box>
                  </Grid>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid item md={4}>
            <TextField
              placeholder="Airport Distance"
              id="demo-simple-select-airport"
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { md: "95%" } }}
              onChange={(event) =>
                handleDistanceChange(
                  event,
                  setAirportDistance,
                  setAirportDistanceError
                )
              }
              value={airportDistance}
              error={airportDistanceError}
              helperText={
                airportDistanceError ? "Please enter a valid number" : ""
              }
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
                        label="Meter"
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
                          minWidth: "100%",
                          "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                            { display: "none" },
                        }}
                        onChange={(event) => {
                          setAirportDistanceUnit(event.target.value);
                        }}
                        value={airportDistanceUnit}
                      >
                        <MenuItem value="Meter">Meter</MenuItem>
                        <MenuItem value="Kilometers">Kilometers</MenuItem>
                      </TextField>
                    </Box>
                  </Grid>
                ),
              }}
            ></TextField>
          </Grid>

          <Grid item md={4}>
            <TextField
              placeholder="Railway Distance"
              id="demo-simple-select-airport"
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { md: "95%" } }}
              onChange={(event) =>
                handleDistanceChange(
                  event,
                  setRailwayDistance,
                  setRailwayDistanceError
                )
              }
              value={railwayDistance}
              error={railwayDistanceError}
              helperText={
                railwayDistanceError ? "Please enter a valid number" : ""
              }
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
                        label="Meter"
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
                          minWidth: "100%",
                          "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                            { display: "none" },
                        }}
                        onChange={(event) => {
                          setRailwayDistanceUnit(event.target.value);
                        }}
                        value={railwayDistanceUnit}
                      >
                        <MenuItem value="Meter">Meter</MenuItem>
                        <MenuItem value="Kilometers">Kilometers</MenuItem>
                      </TextField>
                    </Box>
                  </Grid>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid item md={4}>
            <TextField
              placeholder="ATM Distance"
              id="demo-simple-select-airport"
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { md: "95%" } }}
              onChange={(event) =>
                handleDistanceChange(event, setAtmDistance, setAtmDistanceError)
              }
              value={atmDistance}
              error={atmDistanceError}
              helperText={atmDistanceError ? "Please enter a valid number" : ""}
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
                        label="Meter"
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
                          minWidth: "100%",
                          "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                            { display: "none" },
                        }}
                        onChange={(event) => {
                          setAtmDistanceUnit(event.target.value);
                        }}
                        value={atmDistanceUnit}
                      >
                        <MenuItem value="Meter">Meter</MenuItem>
                        <MenuItem value="Kilometers">Kilometers</MenuItem>
                      </TextField>
                    </Box>
                  </Grid>
                ),
              }}
            ></TextField>
          </Grid>

          <Grid item md={4}>
            <TextField
              placeholder="Shopping Mall Distance"
              id="demo-simple-select-airport"
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { md: "95%" } }}
              onChange={(event) =>
                handleDistanceChange(
                  event,
                  setshoppingMallDistance,
                  setshoppingMallDistanceError
                )
              }
              value={shoppingMallDistance}
              error={shoppingMallDistanceError}
              helperText={
                shoppingMallDistanceError ? "Please enter a valid number" : ""
              }
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
                        label="Meter"
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
                          minWidth: "100%",
                          "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                            { display: "none" },
                        }}
                        onChange={(event) => {
                          setshoppingMallDistanceUnit(event.target.value);
                        }}
                        value={shoppingMallDistanceUnit}
                      >
                        <MenuItem value="Meter">Meter</MenuItem>
                        <MenuItem value="Kilometers">Kilometers</MenuItem>
                      </TextField>
                    </Box>
                  </Grid>
                ),
              }}
            ></TextField>
          </Grid>

          <Grid item md={4}>
            <TextField
              placeholder="Bank Distance"
              id="demo-simple-select-airport"
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { md: "95%" } }}
              onChange={(event) =>
                handleDistanceChange(
                  event,
                  setbankDistance,
                  setbankDistanceError
                )
              }
              value={bankDistance}
              error={bankDistanceError}
              helperText={
                bankDistanceError ? "Please enter a valid number" : ""
              }
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
                        label="Meter"
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
                          minWidth: "100%",
                          "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                            { display: "none" },
                        }}
                        onChange={(event) => {
                          setbankDistanceUnit(event.target.value);
                        }}
                        value={bankDistanceUnit}
                      >
                        <MenuItem value="Meter">Meter</MenuItem>
                        <MenuItem value="Kilometers">Kilometers</MenuItem>
                      </TextField>
                    </Box>
                  </Grid>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid item md={4}>
            <TextField
              placeholder="Bus Stop Distance"
              id="demo-simple-select-airport"
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { md: "95%" } }}
              onChange={(event) =>
                handleDistanceChange(
                  event,
                  setbusStopDistance,
                  setbusStopDistanceError
                )
              }
              value={busStopDistance}
              error={busStopDistanceError}
              helperText={
                busStopDistanceError ? "Please enter a valid number" : ""
              }
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
                        label="Meter"
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
                          minWidth: "100%",
                          "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                            { display: "none" },
                        }}
                        onChange={(event) => {
                          setbusStopDistanceUnit(event.target.value);
                        }}
                        value={busStopDistanceUnit}
                      >
                        <MenuItem value="Meter">Meter</MenuItem>
                        <MenuItem value="Kilometers">Kilometers</MenuItem>
                      </TextField>
                    </Box>
                  </Grid>
                ),
              }}
            ></TextField>
          </Grid>

          <Grid item md={4}>
            <TextField
              placeholder="Metro Station Distance"
              id="demo-simple-select-airport"
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { md: "95%" } }}
              onChange={(event) =>
                handleDistanceChange(
                  event,
                  setmetroDistance,
                  setmetroDistanceError
                )
              }
              value={metroDistance}
              error={metroDistanceError}
              helperText={
                metroDistanceError ? "Please enter a valid number" : ""
              }
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
                        label="Meter"
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
                          minWidth: "100%",
                          "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                            { display: "none" },
                        }}
                        onChange={(event) => {
                          setmetroDistanceUnit(event.target.value);
                        }}
                        value={metroDistanceUnit}
                      >
                        <MenuItem value="Meter">Meter</MenuItem>
                        <MenuItem value="Kilometers">Kilometers</MenuItem>
                      </TextField>
                    </Box>
                  </Grid>
                ),
              }}
            ></TextField>
          </Grid>

          <Grid item md={4}>
            <TextField
              placeholder="School Distance"
              id="demo-simple-select-airport"
              size={isMobile ? "small" : "medium"}
              sx={{ minWidth: { md: "95%" } }}
              onChange={(event) =>
                handleDistanceChange(
                  event,
                  setschoolDistance,
                  setschoolDistanceError
                )
              }
              value={schoolDistance}
              error={schoolDistanceError}
              helperText={
                schoolDistanceError ? "Please enter a valid number" : ""
              }
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
                        label="Meter"
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
                          minWidth: "100%",
                          "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":
                            { display: "none" },
                        }}
                        onChange={(event) => {
                          setschoolDistanceUnit(event.target.value);
                        }}
                        value={schoolDistanceUnit}
                      >
                        <MenuItem value="Meter">Meter</MenuItem>
                        <MenuItem value="Kilometers">Kilometers</MenuItem>
                      </TextField>
                    </Box>
                  </Grid>
                ),
              }}
            ></TextField>
          </Grid>
        </Grid>
      </Box>

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
    </>
  );
};

export default LandMark;
