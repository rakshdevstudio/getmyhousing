import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import {
  Box,
  FormControl,
  TextField,
  Button,
  Grid,
  Autocomplete as MuiAutocomplete,
  Stack,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../../../apis/apiServices";
import { config } from "../../../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../../../../global/redux/action";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];

const LocationDetails = ({
  formData,
  updateFormData,
  next,
  back,
  detailsId,
}) => {
  const mapRef = useRef(null);
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locationData, locationError, isLocationFetching } = useSelector(
    (state) => state.location
  );

  const zoneMappingData = locationData?.countries;
  // error and helper text state
  // Start
  const [projectorBuildingNameError, setProjectorBuildingNameError] =
    useState(false);
  const [projectorBuildingNameHelperText, setProjectorBuildingNameHelperText] =
    useState("");
  // End
  const [selectedCountry, setSelectedCountry] = useState(
    formData.selectedCountry
  );
  const [selectedState, setSelectedState] = useState(formData.selectedState);
  const [selectedStateError, setSelectedStateError] = useState(false);
  const [selectedStateHelperText, setSelectedStateHelperText] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(
    formData.selectedDistrict
  );

  const [selectedDistrictError, setSelectedDistrictError] = useState(false);
  const [selectedDistrictHelperText, setSelectedDistrictHelperText] =
    useState("");
  const [subLocality, setSubLocality] = useState(formData.subLocality);
  const [selectedTaluk, setSelectedTaluk] = useState(formData.selectedTaluk);
  const [locality, setLocality] = useState(formData.locality);
  const [localityError, setLocalityError] = useState(false);
  const [localityHelperText, setLocalityHelperText] = useState("");
  const [pinCode, setPinCode] = useState(formData.pinCode);
  // const [pincodeError, setPincodeError] = useState(false);
  // const [pincodeHelperText, setPincodeHelperText] = useState("");
  const [propertyAdress, setPropertyAdress] = useState(formData.propertyAdress);
  const [landMark, setLandMark] = useState(formData.landMark);
  const [buildingName, setBuildingName] = useState(formData.buildingName);
  const [userPackageId, setUserPackageId] = useState(formData.userPackageId);
  const [loading, setLoading] = useState(false);
  const [runLocation, setrunLocation] = useState(formData.runLocation);
  const [verifyPackageByLocation, setverifyPackageByLocation] = useState(
    formData.verifyPackageByLocation
  );

  const [longtitude, setLongtitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const send = () => updateFormData(data);

  const data = {
    selectedCountry,
    selectedState,
    selectedDistrict,
    selectedTaluk,
    locality,
    pinCode,
    propertyAdress,
    landMark,
    buildingName,
    longtitude,
    latitude,
    subLocality,
    userPackageId,
    runLocation,
    verifyPackageByLocation,
  };

  const verifyField = async () => {
    setLoading(true);
    let validate = true;
    if (!buildingName) {
      setProjectorBuildingNameError(true);
      setProjectorBuildingNameHelperText(
        "Please Enter Project or Building Name"
      );
      setLoading(false);
      validate = false;
    }
    if (!selectedState) {
      setSelectedStateError(true);
      setSelectedStateHelperText("Please Select the State");
      setLoading(false);
      validate = false;
    }
    if (!selectedDistrict) {
      setSelectedDistrictError(true);
      setSelectedDistrictHelperText("Please Select the City");
      setLoading(false);
      validate = false;
    }
    if (!locality) {
      setLocalityError(true);
      setLocalityHelperText("Please Enter Locality/Area");
      setLoading(false);
      validate = false;
    }
    // if (!pinCode) {
    //   setPincodeError(true);
    //   setPincodeHelperText("Please Enter Property Pincode");
    //   setLoading(false);
    //   validate = false;
    // }
    if (validate) {
      // let params = {
      //   country: selectedCountry,
      //   state: selectedState,
      //   district: selectedDistrict,
      //   pincode: pinCode,
      // };

      // const response = await invokeApi(
      //   config.apiDomains + apiList.verifyPropertyAddress,
      //   params,
      //   cookies
      // );

      // if (response.status >= 200 && response.status < 300) {
      //   if (
      //     response.data.responseCode === "200" &&
      //     response.data.responseMessage === "Successful"
      //   ) {
      setverifyPackageByLocation(true);
      setrunLocation(false);
      setLoading(false);
      // setUserPackageId(response.data.userPackageId);
      send();
      next();
      //   }
      // } else if (response.status === 401) {
      //   navigate("/logout");
      // } else {
      //   toast.error(response.data.responseMessage, {
      //     position: "top-center",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //   });
      // }
    }
  };

  useEffect(() => {
    if (!detailsId) {
      setverifyPackageByLocation(false);
      send();
    }
  }, [selectedDistrict]);

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLongtitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
          },
          // failure call back
          (error) => {
            setLongtitude(config.defaultMapLocation.longitude);
            setLatitude(config.defaultMapLocation.latitude);
          }
        );
      } else {
        setLongtitude(config.defaultMapLocation.longitude);
        setLatitude(config.defaultMapLocation.latitude);
      }
    };

    getCurrentLocation();
  }, [cookies]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <MuiAutocomplete
              id="outlined-select-country"
              options={zoneMappingData?.map((item) => item.countryName)}
              value={selectedCountry}
              freeSolo
              disabled={detailsId}
              onChange={(event, newValue) => {
                setSelectedCountry(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size={isMobile ? "small" : "medium"}
                  label="Please select your country"
                  variant="outlined"
                  fullWidth
                  onChange={(event) => {
                    setSelectedCountry(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <MuiAutocomplete
              id="outlined-select-state"
              options={
                zoneMappingData
                  ?.find((item) => item.countryName === selectedCountry)
                  ?.states?.map((state) => state.stateName) || []
              }
              value={selectedState}
              freeSolo
              disabled={!selectedCountry || detailsId}
              onChange={(event, newValue) => {
                setSelectedState(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size={isMobile ? "small" : "medium"}
                  label="Please select your state"
                  variant="outlined"
                  fullWidth
                  error={selectedStateError}
                  helperText={selectedStateHelperText}
                  onChange={(event) => {
                    setSelectedState(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <MuiAutocomplete
              id="outlined-select-district"
              options={
                zoneMappingData
                  ?.find((item) => item.countryName === selectedCountry)
                  ?.states?.find((state) => state.stateName === selectedState)
                  ?.districts?.map((district) => district.districtName) || []
              }
              value={selectedDistrict}
              freeSolo
              disabled={!selectedState || detailsId}
              onChange={(event, newValue) => {
                setSelectedDistrict(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size={isMobile ? "small" : "medium"}
                  label="Please select your city/district"
                  variant="outlined"
                  fullWidth
                  error={selectedDistrictError}
                  helperText={selectedDistrictHelperText}
                  onChange={(event) => {
                    setSelectedDistrict(event.target.value);
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              size={isMobile ? "small" : "medium"}
              label="Locality/Area"
              fullWidth
              error={localityError}
              helperText={localityHelperText}
              value={locality}
              onChange={(event) => {
                setLocality(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              size={isMobile ? "small" : "medium"}
              label="Sub-locality"
              fullWidth
              value={propertyAdress}
              onChange={(event) => {
                setPropertyAdress(event.target.value);
                setSubLocality(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              size={isMobile ? "small" : "medium"}
              label="Pincode"
              fullWidth
              inputProps={{ maxLength: 10 }}
              // error={pincodeError}
              // helperText={pincodeHelperText}
              value={pinCode}
              onChange={(event) => {
                setPinCode(event.target.value);
                // setPincodeError(false);
                // setPincodeHelperText("");
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              size={isMobile ? "small" : "medium"}
              label="Land Mark"
              fullWidth
              value={landMark}
              onChange={(event) => {
                setLandMark(event.target.value);
              }}
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField
              size={isMobile ? "small" : "medium"}
              label="Project or Building Name "
              name="propertyName"
              variant="outlined"
              fullWidth
              value={buildingName}
              error={projectorBuildingNameError}
              helperText={projectorBuildingNameHelperText}
              onChange={(event) => {
                setBuildingName(event.target.value);
              }}
            />
          </Grid>
        </Grid>

        {loading && (
          <Stack sx={{ alignItems: "center", justifyContent: "center", mt: 4 }}>
            <CircularProgress sx={{ color: "black" }} />
          </Stack>
        )}
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
              verifyField();
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
                // send();
                verifyField();
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

export default LocationDetails;
