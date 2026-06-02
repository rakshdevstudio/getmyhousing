import React, { useState } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import "./Commercial.css";
import { amenityList } from "../../../../../common/common";

const Amenities = ({ next, back, formData, updateFormData, detailsId }) => {
  const [amenities, setAmenities] = useState(formData.amenities);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((item) => item !== value));
    }
  };

  const data6 = { amenities };

  const send = () => {
    updateFormData(data6);
  };

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
       <Grid container spacing={0} sx={{ ml: { md: 1, xs: 1.2 } }}>
          {amenityList.map((label, index) => (
            <Grid key={index} item xs={6} sm={6} md={3}>
              <Grid
                key={index}
                item
                className="mydict"
                sx={{ maxWidth: "80%", userSelect: "none" }}
              >
                <label
                  className="mydict1 border3"
                  style={{ userSelect: "none" }}
                >
                  <input
                    type="checkbox"
                    name={`radi7${index + 1}`}
                    value={label}
                    onChange={handleCheckboxChange} // Use the handler to manage checkbox changes
                    checked={amenities.includes(label)} // Check if the label is in the amenities array
                  />
                  <span
                    className="border3"
                    style={{
                      fontFamily: "Mulish,sans-serif",
                      maxHeight: "auto",
                    }}
                  >
                    {label}
                  </span>
                </label>
              </Grid>
            </Grid>
          ))}
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
                next();
                updateFormData(data6);
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

export default Amenities;
