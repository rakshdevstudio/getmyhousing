import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const ReraStatus = ({ next, back, formData, updateFormData, detailsId }) => {
  const [reraAvailable, setreraAvailable] = useState(formData.reraAvailable);
  const [reraNumber, setreraNumber] = useState(formData.reraNumber);
  const [showReraNumber, setshowReraNumber] = useState(false);

  useEffect(() => {
    if (reraAvailable === "Yes") {
      setshowReraNumber(true);
    } else setshowReraNumber(false);
  }, [reraAvailable]);

  const data = {
    reraAvailable,
    reraNumber,
  };

  const send = () => {
    updateFormData(data);
  };

  const yesOrNo = ["Yes", "Applicable for", "Not Applicable"];
  return (
    <>
      <Grid
        container
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
          <Typography sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}>
            RERA Available
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
                setreraAvailable(event.target.value);
              }}
              key={item}
              style={{ marginRight: "15px", marginBottom: "25px" }}
            >
              <input
                type="radio"
                name="rera"
                value={item}
                checked={reraAvailable === item}
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
        {showReraNumber && (
          <Grid container>
            <TextField
              label="RERA Number"
              id="demo-simple-select"
              sx={{ minWidth: { xs: "90%", md: "28%" } }}
              onChange={(event) => {
                setreraNumber(event.target.value);
              }}
              value={reraNumber}
            ></TextField>
          </Grid>
        )}
      </Grid>
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

export default ReraStatus;
