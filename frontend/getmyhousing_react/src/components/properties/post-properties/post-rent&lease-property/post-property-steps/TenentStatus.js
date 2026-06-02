import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  tenentTypeOptions,
  relegiousOptions,
  workPreferenceOptions,
  foodPreferenceOptions,
  petAllowedOptions,
  bachelorsOrSpinstersOptions,
} from "../../../../../common/common";

const TenentStatus = ({ next, back, formData, updateFormData, detailsId }) => {
  const [tenetType, settenetType] = useState(formData.tenetType);
  const [tenentBachelorsAllowed, setTenentBachelorsAllowed] = useState(
    formData.tenentBachelorsAllowed
  );
  const [tenentBachelorsAllowedShow, setTenentBachelorsAllowedShow] =
    useState(true);
  const [tenentSpinstersAllowed, setTenentSpinstersAllowed] = useState(
    formData.tenentSpinstersAllowed
  );
  const [tenentSpinstersAllowedShow, setTenentSpinstersAllowedShow] =
    useState(false);
  const [religiousType, setreligiousType] = useState(formData.religiousType);
  const [workPreference, setworkPreference] = useState(formData.workPreference);
  const [petsAllowed, setpetsAllowed] = useState(formData.petsAllowed);
  const [foodPreference, setfoodPreference] = useState(formData.foodPreference);

  const data4 = {
    tenetType,
    tenentBachelorsAllowed,
    tenentSpinstersAllowed,
    religiousType,
    workPreference,
    petsAllowed,
    foodPreference,
  };

  const send = () => updateFormData(data4);

  useEffect(() => {
    setTenentBachelorsAllowedShow(tenetType.includes("Bachelors"));
    setTenentSpinstersAllowedShow(tenetType.includes("Spinsters"));
  }, [tenetType]);

  return (
    <Box sx={{ marginTop: 5, marginBottom: 5 }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <Typography variant="h5" sx={{ marginBottom: 2, ml: { xs: 1 } }}>
          <b>
            <span>Tenant Status</span>
          </b>
        </Typography> */}
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
              mr: { xs: "30%" },
              mb: { xs: 1.5 },
            }}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
              Tenant Type
            </Typography>
          </Grid>
          <Grid
            item
            ml={1}
            className="mydict"
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              flexWrap: "wrap",
              fontFamily: "Mulish, sans-serif",
            }}
          >
            {tenentTypeOptions.map((item) => (
              <label
                className="mydict1 border1"
                key={item}
                style={{ marginRight: "15px", marginBottom: "20px" }}
              >
                <input
                  type="checkbox"
                  name="2912504"
                  value={item}
                  checked={tenetType.includes(item)}
                  onChange={(event) => {
                    const { value, checked } = event.target;
                    if (checked) {
                      settenetType([...tenetType, value]);
                    } else {
                      settenetType(tenetType.filter((item) => item !== value));
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
          {tenentBachelorsAllowedShow && (
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
                  marginTop: { md: "5px", xs: "2px" },
                  mb: { xs: 1 },
                  mr: { xs: "30%" },
                }}
              >
                <Typography sx={{ marginBottom: 3, ml: { xs: 1 } }}>
                  Bachelors Allowed
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
                {bachelorsOrSpinstersOptions.map((item) => (
                  <label
                    className="mydict1 border1"
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "15px" }}
                  >
                    <input
                      type="checkbox"
                      name="2912sfg504"
                      value={item}
                      checked={tenentBachelorsAllowed.includes(item)}
                      onChange={(event) => {
                        const { value, checked } = event.target;
                        if (checked) {
                          setTenentBachelorsAllowed([
                            ...tenentBachelorsAllowed,
                            value,
                          ]);
                        } else {
                          setTenentBachelorsAllowed(
                            tenentBachelorsAllowed.filter(
                              (item) => item !== value
                            )
                          );
                        }
                      }}
                    />
                    <span className="border1">{item}</span>
                  </label>
                ))}
              </Grid>
            </Grid>
          )}
          {tenentSpinstersAllowedShow && (
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
                  marginTop: { md: "5px", xs: "2px" },
                  mb: { xs: 1 },
                  mr: { xs: "30%" },
                }}
              >
                <Typography sx={{ marginBottom: 3, ml: { xs: 1 } }}>
                  Spinsters Allowed
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
                {bachelorsOrSpinstersOptions.map((item) => (
                  <label
                    className="mydict1 border1"
                    key={item}
                    style={{ marginRight: "15px", marginBottom: "15px" }}
                  >
                    <input
                      type="checkbox"
                      name="2912504"
                      value={item}
                      checked={tenentSpinstersAllowed.includes(item)}
                      onChange={(event) => {
                        const { value, checked } = event.target;
                        if (checked) {
                          setTenentSpinstersAllowed([
                            ...tenentSpinstersAllowed,
                            value,
                          ]);
                        } else {
                          setTenentSpinstersAllowed(
                            tenentSpinstersAllowed.filter(
                              (item) => item !== value
                            )
                          );
                        }
                      }}
                    />
                    <span className="border1">{item}</span>
                  </label>
                ))}
              </Grid>
            </Grid>
          )}
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
              ml={-1}
              sx={{
                marginRight: { md: "17px", xs: "5px" },
                marginTop: { md: "5px", xs: "2px" },
                mb: { xs: 1.5 },
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                Religious Type
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
              {relegiousOptions.map((item) => (
                <label
                  className="mydict1 border1"
                  onChange={(event) => {
                    setreligiousType(event.target.value);
                  }}
                  key={item}
                  style={{ marginRight: "15px", marginBottom: "20px" }}
                >
                  <input
                    type="radio"
                    name="200we001"
                    value={item}
                    checked={religiousType === item}
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
              flexDirection: "column",
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
                marginTop: { md: "5px", xs: "2px" },
                mb: { xs: 1.5 },
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                Work Type
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
              {workPreferenceOptions.map((item) => (
                <label
                  className="mydict1 border1"
                  onChange={(event) => {
                    setworkPreference(event.target.value);
                  }}
                  key={item}
                  style={{ marginRight: "15px", marginBottom: "20px" }}
                >
                  <input
                    type="radio"
                    name="200gte001"
                    value={item}
                    checked={workPreference === item}
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
              flexDirection: "column",
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
                marginTop: { md: "5px", xs: "2px" },
                mb: { xs: 1.5 },
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                Pets Allowed
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
              {petAllowedOptions.map((item) => (
                <label
                  className="mydict1 border1"
                  onChange={(event) => {
                    setpetsAllowed(event.target.value);
                  }}
                  key={item}
                  style={{ marginRight: "15px", marginBottom: "20px" }}
                >
                  <input
                    type="radio"
                    name="200dd001"
                    value={item}
                    checked={petsAllowed === item}
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
              flexDirection: "column",
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
                marginTop: { md: "5px", xs: "2px" },
                mb: { xs: 1.5 },
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                Food Preference
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
              {foodPreferenceOptions.map((item) => (
                <label
                  className="mydict1 border1"
                  onChange={(event) => {
                    setfoodPreference(event.target.value);
                  }}
                  key={item}
                  style={{ marginRight: "15px", marginBottom: "20px" }}
                >
                  <input
                    type="radio"
                    name="20rg001"
                    value={item}
                    checked={foodPreference === item}
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

export default TenentStatus;
