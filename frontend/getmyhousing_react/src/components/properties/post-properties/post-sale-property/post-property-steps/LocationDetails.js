import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import {
  Box,
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
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const libraries = ["places"];

const LocationDetails = ({
  formData,
  updateFormData,
  next,
  back,
  detailsId,
}) => {
  // error and helper text state
  const [cookies] = useCookies();
  const mapRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { locationData, locationError, isLocationFetching } = useSelector(
    (state) => state.location
  );

  const zoneMappingData = locationData?.countries;
  // Start
  // below the state for error validation for project name
  const [projectorBuildingNameError, setProjectorBuildingNameError] =
    useState(false);

  const [projectorBuildingNameHelperText, setProjectorBuildingNameHelperText] =
    useState("");
  // End
  // belowt he state for set country name
  const [selectedCountry, setSelectedCountry] = useState(
    formData.selectedCountry
  );
  const [selectedState, setSelectedState] = useState(formData.selectedState);
  const [selectedStateError, setSelectedStateError] = useState(false);
  const [selectedStateHelperText, setSelectedStateHelperText] = useState("");

  // below the state for city and error
  const [selectedDistrict, setSelectedDistrict] = useState(
    formData.selectedDistrict
  );
  const [selectedDistrictError, setSelectedDistrictError] = useState(false);
  const [selectedDistrictHelperText, setSelectedDistrictHelperText] =
    useState("");

  const [selectedTaluk, setSelectedTaluk] = useState(formData.selectedTaluk);
  const [locality, setLocality] = useState(formData.locality);
  const [localityError, setLocalityError] = useState(false);
  const [localityHelperText, setLocalityHelperText] = useState("");
  const [subLocality, setsubLocality] = useState(formData.subLocality);

  const [pinCode, setPinCode] = useState(formData.pinCode);
  const [pincodeError, setPincodeError] = useState(false);
  const [pincodeHelperText, setPincodeHelperText] = useState("");
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

  const data = {
    selectedCountry,
    selectedState,
    selectedDistrict,
    selectedTaluk,
    locality,
    subLocality,
    pinCode,
    longtitude,
    latitude,
    propertyAdress,
    landMark,
    buildingName,
    userPackageId,
    runLocation,
    verifyPackageByLocation,
  };

  const send = () => updateFormData(data);

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
    if (!pinCode || pinCode.length < 6) {
      setPincodeError(true);
      setPincodeHelperText("Pincode Is Empty and Not Valid Pincode");
      setLoading(false);
      validate = false;
    }
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
      send();
      next();
      setLoading(false);
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
      //   setLoading(false);
      // }
    }
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <MuiAutocomplete
                id="outlined-select-country"
                options={zoneMappingData?.map((item) => item.countryName)}
                value={selectedCountry}
                disabled={detailsId}
                freeSolo
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
                      if (!event.target.value) {
                        setSelectedCountry(event.target.value);
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <MuiAutocomplete
                id="outlined-select-state"
                options={(
                  zoneMappingData?.find(
                    (item) => item.countryName === selectedCountry
                  )?.states || []
                ).map((state) => state.stateName)}
                value={selectedState}
                freeSolo
                disabled={!selectedCountry || detailsId}
                onChange={(event, newValue) => {
                  setSelectedState(newValue);
                  setSelectedStateError(false);
                  setSelectedStateHelperText("");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size={isMobile ? "small" : "medium"}
                    label="Please select your state *"
                    variant="outlined"
                    error={selectedStateError}
                    helperText={selectedStateHelperText}
                    fullWidth
                    onChange={(event) => {
                      if (!event.target.value) {
                        setSelectedState(event.target.value);
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <MuiAutocomplete
                id="outlined-select-district"
                options={(
                  zoneMappingData
                    ?.find((item) => item.countryName === selectedCountry)
                    ?.states?.find((state) => state.stateName === selectedState)
                    ?.districts || []
                ).map((district) => district.districtName)}
                value={selectedDistrict}
                freeSolo
                disabled={!selectedState || detailsId}
                onChange={(event, newValue) => {
                  setSelectedDistrict(newValue);
                  setSelectedDistrictError(false);
                  setSelectedDistrictHelperText("");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size={isMobile ? "small" : "medium"}
                    label="Please select your city / district *"
                    variant="outlined"
                    error={selectedDistrictError}
                    helperText={selectedDistrictHelperText}
                    fullWidth
                    onChange={(event) => {
                      if (!event.target.value) {
                        setSelectedDistrict(event.target.value);
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                size={isMobile ? "small" : "medium"}
                label="Locality/Area *"
                variant="outlined"
                fullWidth
                value={locality}
                error={localityError}
                helperText={localityHelperText}
                onChange={(event) => {
                  setLocality(event.target.value);
                }}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                size={isMobile ? "small" : "medium"}
                label="Sub-Locality"
                variant="outlined"
                fullWidth
                value={subLocality}
                onChange={(event) => {
                  setsubLocality(event.target.value);
                  setPropertyAdress(event.target.value);
                }}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                size={isMobile ? "small" : "medium"}
                label="Pincode *"
                variant="outlined"
                error={pincodeError}
                inputProps={{ maxLength: 6 }}
                helperText={pincodeHelperText}
                fullWidth
                value={pinCode}
                onChange={(event) => {
                  setPinCode(event.target.value);
                  setPincodeError(false);
                  setPincodeHelperText("");
                }}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                size={isMobile ? "small" : "medium"}
                label="Land Mark"
                variant="outlined"
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
                label="Project or Building Name *"
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
            <Stack
              sx={{ alignItems: "center", justifyContent: "center", mt: 5 }}
            >
              <CircularProgress sx={{ color: "black" }} />
            </Stack>
          )}
        </Box>
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
