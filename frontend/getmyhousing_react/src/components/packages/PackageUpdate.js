import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  Autocomplete,
  TextareaAutosize,
  Stack,
  CircularProgress,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import DashBoardNavbar from "../generic/dashboard/DashBoardNavbar";
import DashBoardHeader from "../generic/dashboard/DashBoardHeader";
import { UsersRolesList, listingTypeOptions } from "../../common/common";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../global/redux/action";

function PackageUpdate(formData, updateFormData) {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const { locationData, locationError, isLocationFetching } = useSelector(
    (state) => state.location
  );

  const zoneMappingData = locationData?.countries;

  const [id, setId] = useState("");
  const [loading, setloading] = useState(false);

  //for getting Url Data
  const { id: getId } = useParams();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [packageName, setPackageName] = useState("");
  const [packageFor, setPackageFor] = useState("");
  const [listingType, setListingType] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [noOfListings, setNoOfListings] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState("");
  const [discount, setDiscount] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [datas, setDatas] = useState([]);

  const navigate = useNavigate();
  const send = () => updateFormData(data);
  const data = {
    selectedCountry,
    selectedState,
    selectedDistrict,
  };

  //assigning values
  useEffect(() => {
    const valueAssigning = () => {
      datas.forEach((item) => {
        setPackageName(item.packageName);
        setPackageFor(item.packageFor);
        setListingType(item.listingType);
        setDurationInDays(item.durationInDays);
        setNoOfListings(item.noOfListings);
        setSelectedCountry(item.country);
        setSelectedState(item.state);
        setSelectedDistrict(item.district);
        setDescription(item.description);
        setDiscount(item.discount);
        setMrp(item.mrp);
        setSellingPrice(item.sellingPrice);
      });
    };
    valueAssigning();
  }, [zoneMappingData]);

  //get packages by id API
  useEffect(() => {
    const getPackages = async () => {
      setloading(true);
      let params = {
        id: getId,
      };
      const response = await invokeApi(
        config.apiDomains + apiList.getPackages,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setDatas(response.data.packages);
        } else {
          alert("An error occurred while fetching data!");
        }
      } else {
        alert("An error occurred while fetching data!!");
      }
      setloading(false);
    };

    getPackages();
  }, []);

  //Update package API
  const updatePackage = async () => {
    let params = {
      id,
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
        config.apiDomains + apiList.updatePackage,
        params,
        cookies
      );

      if (
        response.status === 200 ||
        response.data.responseMessage === "Successful"
      ) {
        const confirmUpdate = window.confirm(`Data Updated Successfully`);

        if (confirmUpdate) {
          navigate(`/packages-list`);
        } else {
          alert(" ");
        }
      } else {
        console.error("Failed to Update");
      }
    } catch (error) {
      console.error("An error occurred while fetching location:", error);
    }
  };

  // to calculate the selling price
  useEffect(() => {
    const mrpValue = parseFloat(mrp) || 0; // Default to 0 if no value or NaN
    const discountValue = parseFloat(discount) || 0; // Default to 0 if no value or NaN

    const calculatedSellingPrice = mrpValue - discountValue;
    setSellingPrice(calculatedSellingPrice);
  }, [mrp, discount]);

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <DashBoardNavbar />
        <Box
          component="header"
          sx={{
            flexGrow: 1,
            p: 2,
            backgroundColor: "#F6F8FB",
            overflowX: "auto", // Add horizontal scrolling for small screens
          }}
        >
          <DashBoardHeader />
          <Paper sx={{ p: 2 }}>
            <form>
              {loading && (
                <Stack sx={{ display: "flex", alignItems: "center", mb: 5 }}>
                  <CircularProgress sx={{ color: "black" }} />
                </Stack>
              )}
              {datas.map((item, index) => (
                <Grid container spacing={3}>
                  {/* First Row */}
                  <Grid item xs={4}>
                    <TextField
                      label="Package Name"
                      variant="outlined"
                      fullWidth
                      onChange={(event) => {
                        setPackageName(event.target.value);
                      }}
                      value={packageName}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      options={UsersRolesList}
                      value={packageFor}
                      onChange={(event, newValue) => {
                        setPackageFor(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Please select Packages For"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      options={listingTypeOptions}
                      value={listingType}
                      onChange={(event, newValue) => {
                        setListingType(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Please select Lisitng Type"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>

                  {/* Second Row */}
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
                    <Autocomplete
                      id="outlined-select-country"
                      options={zoneMappingData.map((item) => item.countryName)}
                      value={selectedCountry}
                      onChange={(event, newValue) => {
                        setSelectedCountry(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Please select your country"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>

                  {/* Third Row */}
                  <Grid item xs={4}>
                    <Autocomplete
                      id="outlined-select-country"
                      options={(
                        zoneMappingData.find(
                          (item) => item.countryName === selectedCountry
                        )?.states || []
                      ).map((state) => state.stateName)}
                      value={selectedState}
                      disabled={!selectedCountry}
                      onChange={(event, newValue) => {
                        setSelectedState(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Please select your state"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      id="outlined-select-district"
                      options={(
                        zoneMappingData
                          .find((item) => item.countryName === selectedCountry)
                          ?.states.find(
                            (state) => state.stateName === selectedState
                          )?.districts || []
                      ).map((district) => district.districtName)}
                      value={selectedDistrict}
                      disabled={!selectedState}
                      onChange={(event, newValue) => {
                        setSelectedDistrict(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Please select your city / district"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>

                  {/* Fourth Row */}
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
                    <TextField
                      label="Selling Price"
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={sellingPrice}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  {/* Fifth Row */}
                  <Grid item xs={12}>
                    <TextareaAutosize
                      minRows={3} // You can adjust the number of rows as needed
                      placeholder="Description"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                      style={{ width: "100%" }}
                    />
                  </Grid>

                  {/* hidden passing */}
                  <input type="hidden" name="id" value={item.id} />
                </Grid>
              ))}
              <Box
                display="flex"
                justifyContent="space-between"
                mt={2}
                marginRight={2}
              >
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/packages-list")}
                >
                  Back
                </Button>
                <Button variant="outlined" size="large" onClick={updatePackage}>
                  Submit
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default PackageUpdate;
