import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  Select,
  MenuItem,
  Autocomplete,
  TextareaAutosize,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import PackagesTabs from "./PackagesTabs";
import { UsersRolesList, listingTypeOptions } from "../../common/common";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../global/redux/action";

function PackageAdd(formData, updateFormData) {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const { locationData, locationError, isLocationFetching } = useSelector(
    (state) => state.location
  );

  const zoneMappingData = locationData?.countries;

  //use state for loading
  const [loading, setloading] = useState(false);

  //use state defining for zone mapping
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryError, setCountryError] = useState(false);
  const [countryHelperText, setCountryHelperText] = useState("");

  const [selectedState, setSelectedState] = useState(null);
  const [stateError, setStateError] = useState(false);
  const [stateHelperText, setStateHelperText] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [cityError, setCityError] = useState(false);
  const [cityHelperText, setCityHelperText] = useState("");

  //use state defined for packages
  const [packageName, setPackageName] = useState("");
  const [packageNameError, setPackageNameError] = useState(false);
  const [packageNameHelperText, setPackageNameHelperText] = useState("");

  const [packageFor, setPackageFor] = useState(null);
  const [listingType, setListingType] = useState(null);
  const [durationInDays, setDurationInDays] = useState("");
  const [noOfListings, setNoOfListings] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionHelperText, setDescriptionHelperText] = useState("");
  const [mrp, setMrp] = useState("");
  const [discount, setDiscount] = useState("");

  const [sellingPrice, setSellingPrice] = useState("");
  const [sellingPriceError, setSellingPriceError] = useState(false);
  const [sellingPriceHelperText, setSellingPriceHelperText] = useState("");

  function descriptionHandler(event) {
    let value = event.target.value;
    setDescription(value);
    let count = event.target.value.lenght;
    if (count > 100) {
      setDescriptionError(true);
      setDescriptionHelperText(
        "Please Enter Description Between 100 Characters"
      );
    } else if (count <= 100) {
      setDescription(value);
      setDescriptionError(false);
      setDescriptionHelperText("");
    }
  }

  // to calculate the selling price
  useEffect(() => {
    const mrpValue = parseFloat(mrp) || 0; // Default to 0 if no value or NaN
    const discountValue = parseFloat(discount) || 0; // Default to 0 if no value or NaN

    const calculatedSellingPrice = mrpValue - discountValue;
    setSellingPrice(calculatedSellingPrice);
  }, [mrp, discount]);

  const navigate = useNavigate();
  const send = () => updateFormData(data);

  //for fetching corresponding state and district
  const data = {
    selectedCountry,
    selectedState,
    selectedDistrict,
  };

  //Save Package API
  const savePackage = async () => {
    setloading(true);
    let validate = true;
    if (!description) {
      setloading(false);
      validate = false;
      setDescriptionError(true);
      setDescriptionHelperText("Please Enter Description Below 100 characters");
    }
    if (!selectedCountry) {
      setloading(false);
      validate = false;
      setCountryError(true);
      setCountryHelperText("Please Select the Country");
    }
    if (!selectedState) {
      setloading(false);
      validate = false;
      setStateError(true);
      setStateHelperText("Please Select the State");
    }
    if (!selectedDistrict) {
      setloading(false);
      validate = false;
      setCityError(true);
      setCityHelperText("Please Select the City");
    }
    if (!sellingPrice) {
      setloading(false);
      validate = false;
      setSellingPriceError(true);
      setSellingPriceHelperText("Please Enter Price");
    }
    if (!packageName) {
      setloading(false);
      validate = false;
      setPackageNameError(true);
      setPackageNameHelperText("Please Enter Package Name");
    }
    if (validate) {
      let params = {
        packageName,
        packageFor,
        listingType,
        durationInDays,
        noOfListings,
        country: selectedCountry,
        state: selectedState,
        district: selectedDistrict,
        description,
        mrp,
        discount,
        sellingPrice,
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.addPackage,
          params,
          cookies
        );

        if (response) {
          if (
            response.status === "200" ||
            response.data.responseMessage === "Successful"
          ) {
            toast.success("Data Saved Successfully!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            // const confirmSave = window.confirm(`Data Saved Successfully`);
            // if (confirmSave) {
            //   navigate(`/packages-list`);
            // } else {
            //   alert(" ");
            // }
          } else {
            toast.error("Failed to save this Record!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        } else {
          toast.error("Failed to Save!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      } catch (error) {
        toast.error("An error occurred while fetching location!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
    setloading(false);
  };

  return (
    <>
      <PackagesTabs tabActive={0}>
        <form>
          <Grid container spacing={2} sx={{ py: 3 }}>
            {/* First Row */}
            <Grid item md={4} xs={12}>
              <TextField
                label="Package Name"
                variant="outlined"
                fullWidth
                error={packageNameError}
                helperText={packageNameHelperText}
                onChange={(event) => {
                  setPackageName(event.target.value);
                }}
                value={packageName}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Autocomplete
                options={UsersRolesList}
                value={packageFor}
                onChange={(event, newValue) => {
                  setPackageFor(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Packages For"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Autocomplete
                options={listingTypeOptions}
                value={listingType}
                onChange={(event, newValue) => {
                  setListingType(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lisitng Type"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Second Row */}
            <Grid item md={4} xs={12}>
              <TextField
                label="Duration in Days"
                variant="outlined"
                fullWidth
                type="number"
                onChange={(event) => {
                  setDurationInDays(event.target.value);
                }}
                value={durationInDays}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                label="No of Listings"
                variant="outlined"
                fullWidth
                type="number"
                onChange={(event) => {
                  setNoOfListings(event.target.value);
                }}
                value={noOfListings}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Autocomplete
                id="outlined-select-country"
                options={zoneMappingData?.map((item) => item.countryName)}
                value={selectedCountry}
                onChange={(event, newValue) => {
                  setSelectedCountry(newValue);
                  setCountryError(false);
                  setCountryHelperText("");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={countryError}
                    helperText={countryHelperText}
                    label="Please select your country"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Third Row */}
            <Grid item md={4} xs={12}>
              <Autocomplete
                id="outlined-select-country"
                options={(
                  zoneMappingData?.find(
                    (item) => item.countryName === selectedCountry
                  )?.states || []
                ).map((state) => state.stateName)}
                value={selectedState}
                disabled={!selectedCountry}
                onChange={(event, newValue) => {
                  setSelectedState(newValue);
                  setStateError(false);
                  setStateHelperText("");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={stateError}
                    helperText={stateHelperText}
                    label="Please select your state"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Autocomplete
                id="outlined-select-district"
                options={(
                  zoneMappingData
                    ?.find((item) => item.countryName === selectedCountry)
                    ?.states.find((state) => state.stateName === selectedState)
                    ?.districts || []
                ).map((district) => district.districtName)}
                value={selectedDistrict}
                disabled={!selectedState}
                onChange={(event, newValue) => {
                  setSelectedDistrict(newValue);
                  setCityError(false);
                  setCityHelperText("");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={cityError}
                    helperText={cityHelperText}
                    label="Please select your city / district"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Fourth Row */}
            <Grid item md={4} xs={12}>
              <TextField
                label="MRP"
                variant="outlined"
                fullWidth
                type="number"
                value={mrp}
                onChange={(event) => {
                  setMrp(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                label="Discount"
                variant="outlined"
                fullWidth
                type="number"
                value={discount}
                onChange={(event) => {
                  setDiscount(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                label="Selling Price"
                variant="outlined"
                fullWidth
                type="number"
                value={sellingPrice}
                error={sellingPriceError}
                helperText={sellingPriceHelperText}
                InputProps={{
                  readOnly: true,
                  style: {
                    color: "#333", // Change text color to dark
                    backgroundColor: "#f5f5f5", // Change background color to a lighter gray
                  },
                }}
              />
            </Grid>

            {/* Fifth Row */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Description</Typography>
              <TextareaAutosize
                minRows={3} // You can adjust the number of rows as needed
                label="Discount"
                value={description}
                error={descriptionError}
                helperText={descriptionHelperText}
                onChange={descriptionHandler}
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" mt={2} marginRight={2}>
            {!loading && (
              <Button variant="outlined" onClick={savePackage}>
                Submit
              </Button>
            )}
            {loading && (
              <Stack sx={{ alignItems: "center", mb: 5 }}>
                <CircularProgress sx={{ color: "black" }} />
              </Stack>
            )}
          </Box>
        </form>
      </PackagesTabs>
    </>
  );
}

export default PackageAdd;
