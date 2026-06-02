import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  Autocomplete,
  Stack,
  CircularProgress,
  Chip,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import { apiList, invokeApi } from "../../apis/apiServices";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import mobileNoValidation, {
  emailValidation,
  AddUserRoleList,
} from "../../common/common";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../global/redux/action";

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

function UserUpdate() {
  //for getting Url Data
  const { id: getId } = useParams();
  // const [datas, setdatas] = useState([]);

  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const { locationData, locationError, isLocationFetching } = useSelector(
    (state) => state.location
  );

  const zoneMappingData = locationData?.countries;

  //use state for loading
  const [loading, setloading] = useState(false);

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
  const [fullName, setFullName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");

  const [email, setEmail] = useState("");
  const emailValidated = emailValidation(email);
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const validatedPhone = mobileNoValidation(mobileNumber);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState("");

  const [whatsappNumber, setWhatsappNumber] = useState("");
  const validatedWhatsapp = mobileNoValidation(whatsappNumber);
  const [whatsappError, setWhatsappError] = useState(false);
  const [whatsappHelperText, setWhatsappHelperText] = useState("");

  const [roles, setRoles] = useState([]);
  const [rolesError, setRolesError] = useState(false);
  const [rolesHelperText, setRolesHelperText] = useState("");

  const [pincode, setPincode] = useState(null);

  const navigate = useNavigate();

  const handleChangeRoles = (event, newValue) => {
    const stringIds = newValue.map((company) => company.toString());
    setRoles(stringIds);
  };

  const handleRemoveRoles = (prev) => {
    setRoles(roles.filter((r) => r !== prev));
  };

  //get packages by id API
  useEffect(() => {
    const getUser = async () => {
      setloading(true);
      let params = { id: getId };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getUser,
          params,
          cookies
        );
        if (response) {
          setFullName(response.data.user.fullName);
          setEmail(response.data.user.email);
          setMobileNumber(response.data.user.mobileNumber);
          setWhatsappNumber(response.data.user.whatsappNumber);
          setRoles(response.data.user.roles);
          setSelectedCountry(response.data.user.country);
          setSelectedState(response.data.user.state);
          setSelectedDistrict(response.data.user.district);
          setPincode(response.data.user.pincode);
        } else {
          console.error("No data in the response");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
      setloading(false);
    };
    getUser();
  }, []);

  const updateUser = async () => {
    var vaidate = true;
    if (!fullName) {
      setNameError(true);
      setNameHelperText("Please Enter Full Name");
      setloading(false);
      vaidate = false;
    }
    if (!emailValidated) {
      setEmailError(true);
      setEmailHelperText("Please Enter Valid Email");
      setloading(false);
      vaidate = false;
    }
    if (!validatedPhone) {
      setPhoneError(true);
      setPhoneHelperText("Please Enter Valid Mobile Number");
      setloading(false);
      vaidate = false;
    }
    if (!validatedWhatsapp) {
      setWhatsappError(true);
      setWhatsappHelperText("Please Enter Valid Whatsapp Number");
      setloading(false);
      vaidate = false;
    }
    if (!selectedCountry) {
      setCountryError(true);
      setCountryHelperText("Plesase Select Country");
      setloading(false);
      vaidate = false;
    }
    if (!selectedState) {
      setStateError(true);
      setStateHelperText("Please Select State");
      setloading(false);
      vaidate = false;
    }
    if (!selectedDistrict) {
      setCityError(true);
      setCityHelperText("Please Select City");
      setloading(false);
      vaidate = false;
    }
    if (!roles.length > 0) {
      setRolesError(true);
      setRolesHelperText("Please Select Atleast One Role");
      setloading(false);
      vaidate = false;
    }
    if (vaidate) {
      let params = {
        id: getId,
        fullName,
        email,
        mobileNumber,
        whatsappNumber,
        country: selectedCountry,
        state: selectedState,
        district: selectedDistrict,
        pincode: pincode,
        roles: Array.isArray(roles) ? roles : [roles],
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.updateUser,
          params,
          cookies
        );

        if (
          response.status === 200 ||
          response.data.responseMessage === "Successful"
        ) {
          const confirmUpdate = window.confirm(`Data Updated Successfully`);

          if (confirmUpdate) {
            navigate(`/users-list`);
          } else {
            alert(" ");
          }
        } else {
          console.error("Failed to Update");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="flex-start" p={3}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            navigate("/users-list");
          }}
          sx={{
            padding: "10px 20px",
            borderRadius: "8px",
            textTransform: "none",
            backgroundColor: "#1976D2",
            color: "white",
          }}
        >
          Back
        </Button>
      </Box>
      <Box p={3} borderRadius={1} boxShadow={3} bgcolor="background.paper">
        <form>
          {loading && (
            <Stack sx={{ display: "flex", alignItems: "center", mb: 5 }}>
              <CircularProgress sx={{ color: "black" }} />
            </Stack>
          )}
          <Grid container spacing={3}>
            {/* First Row */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                error={nameError}
                helperText={nameHelperText}
                onChange={(event) => {
                  setFullName(event.target.value);
                }}
                value={fullName}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Email"
                variant="outlined"
                error={emailError}
                helperText={emailHelperText}
                fullWidth
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Mobile Number"
                variant="outlined"
                error={phoneError}
                inputProps={{ maxLength: 10 }}
                helperText={phoneHelperText}
                fullWidth
                onChange={(event) => {
                  setMobileNumber(event.target.value);
                }}
                value={mobileNumber}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Whatsapp Number"
                variant="outlined"
                error={whatsappError}
                helperText={whatsappHelperText}
                fullWidth
                onChange={(event) => {
                  setWhatsappNumber(event.target.value);
                }}
                value={whatsappNumber}
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
                    error={countryError}
                    helperText={countryHelperText}
                    label="Please select your country"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            {/* Third Row */}
            <Grid item xs={12} md={4}>
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
                    error={stateError}
                    helperText={stateHelperText}
                    label="Please select your state"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="outlined-select-district"
                options={(
                  zoneMappingData
                    .find((item) => item.countryName === selectedCountry)
                    ?.states.find((state) => state.stateName === selectedState)
                    ?.districts || []
                ).map((district) => district.districtName)}
                value={selectedDistrict}
                disabled={!selectedState}
                onChange={(event, newValue) => {
                  setSelectedDistrict(newValue);
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
            <Grid item xs={12} md={4}>
              <TextField
                label="Pincode"
                value={pincode}
                fullWidth
                onChange={(event) => {
                  setPincode(event.target.value);
                }}
                sx={{
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "150%",
                  "& fieldset": {
                    border: "1px solid #AAACAE",
                    borderRadius: "5px",
                  },
                  "& .MuiInputAdornment-root": {
                    mr: "0px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                multiple
                id="scholarship-autocomplete"
                options={AddUserRoleList}
                value={roles}
                onChange={handleChangeRoles}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Roles"
                    error={rolesError}
                    helperText={rolesHelperText}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      label={option}
                      {...getTagProps({ index })}
                      onDelete={() => handleRemoveRoles(option)}
                    />
                  ))
                }
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" p={3}>
            <Button
              variant="outlined"
              color="primary"
              onClick={updateUser}
              sx={{
                padding: "10px 20px",
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor: "#1976D2",
                color: "white",
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
}

export default UserUpdate;
