import React, { useState, useEffect } from "react";
import { Grid, Autocomplete, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import UserManagerTabs from "./UserManagerTabs";
import mobileNoValidation, {
  emailValidation,
  AddUserRoleList,
} from "../../common/common";
import { LoadingButton } from "@mui/lab";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../global/redux/action";
import SaveIcon from '@mui/icons-material/Save';

function UserAdd() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const { locationData } = useSelector(
    (state) => state.location
  );
  const { userData } = useSelector(
    (state) => state.user
  );

  const zoneMappingData = locationData?.countries || [];

  //use state for loading
  const [loading, setloading] = useState(false);
  const [pincode, setPincode] = useState(null);

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


  //Save Package API
  const addUsers = async () => {
    setloading(true);

    let roleDeclare = Array.isArray(userData?.user?.roles) && userData?.user?.roles.includes("Admin")
      ? roles.length > 0
        ? roles
        : ["User"] // Provide a default role instead of empty array
      : ["Associate"];

    var validate = true;
    let errors = {};

    if (!fullName) {
      errors.nameError = true;
      errors.nameHelperText = "Please Enter Full Name";
      validate = false;
    }
    if (!emailValidated) {
      errors.emailError = true;
      errors.emailHelperText = "Please Enter Valid Email";
      validate = false;
    }
    if (!validatedPhone) {
      errors.phoneError = true;
      errors.phoneHelperText = "Please Enter Valid Mobile Number";
      validate = false;
    }
    if (!validatedWhatsapp) {
      errors.whatsappError = true;
      errors.whatsappHelperText = "Please Enter Valid Whatsapp Number";
      validate = false;
    }
    if (!selectedCountry) {
      errors.countryError = true;
      errors.countryHelperText = "Please Select Country";
      validate = false;
    }
    if (!selectedState) {
      errors.stateError = true;
      errors.stateHelperText = "Please Select State";
      validate = false;
    }
    if (!selectedDistrict) {
      errors.cityError = true;
      errors.cityHelperText = "Please Select City";
      validate = false;
    }
    if (roles.length === 0 && roleDeclare.length === 0) {
      errors.rolesError = true;
      errors.rolesHelperText = "Please Select At Least One Role";
      validate = false;
    }

    if (!validate) {
      setloading(false);
      setNameError(errors.nameError || false);
      setNameHelperText(errors.nameHelperText || "");
      setEmailError(errors.emailError || false);
      setEmailHelperText(errors.emailHelperText || "");
      setPhoneError(errors.phoneError || false);
      setPhoneHelperText(errors.phoneHelperText || "");
      setWhatsappError(errors.whatsappError || false);
      setWhatsappHelperText(errors.whatsappHelperText || "");
      setCountryError(errors.countryError || false);
      setCountryHelperText(errors.countryHelperText || "");
      setStateError(errors.stateError || false);
      setStateHelperText(errors.stateHelperText || "");
      setCityError(errors.cityError || false);
      setCityHelperText(errors.cityHelperText || "");
      setRolesError(errors.rolesError || false);
      setRolesHelperText(errors.rolesHelperText || "");
      return;
    }

    let params = {
      fullName,
      email,
      password: "Welcome@123",
      createdBy: cookies[config.cookieName]?.loginUserId,
      mobileNumber,
      whatsappNumber,
      country: selectedCountry,
      state: selectedState,
      district: selectedDistrict,
      pincode: pincode,
      roles: roleDeclare,
    };
    try {
      const response = await invokeApi(
        config.apiDomains + apiList.addUsers,
        params,
        cookies
      );
      if (response) {
        if (response && response.status === 200 && response.data?.responseMessage === "Successful") {
          toast.success("User Created SuccessFully!", {
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
          setloading(false);
          setFullName("");
          setEmail("");
          setMobileNumber("");
          setWhatsappNumber("");
          setSelectedCountry(null);
          setSelectedState(null);
          setSelectedDistrict(null);
          setPincode(null);
          setRoles([]);
        } else if (response.status === "PB001-1" || response.data.responseMessage === "Email already exists") {
          toast.info("Email alreday exist provide another email!", {
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
          setloading(false);
        } else {
          alert("Failed to save this Record");
          setloading(false);
        }
      } else {
        toast.error("Failed To Create User Please Try Again Later!", {
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
        setloading(false);
        navigate("/users-list");
      }
    } catch (error) {
      console.error("An error occurred while fetching location:", error);
      setloading(false);
    }
  };

  return (
    <>
      <UserManagerTabs tabActive={0}>
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <form style={{ mt: 3 }}>
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
                    setNameError(false);
                    setNameHelperText("");
                  }}
                  value={fullName}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={emailError}
                  helperText={emailHelperText}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError(false);
                    setEmailHelperText("");
                  }}
                  value={email || ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  error={phoneError}
                  helperText={phoneHelperText}
                  inputProps={{ maxLength: 10 }}
                  onChange={(event) => {
                    setMobileNumber(event.target.value);
                    setPhoneError(false);
                    setPhoneHelperText("");
                  }}
                  value={mobileNumber || ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Whatsapp Number"
                  variant="outlined"
                  fullWidth
                  error={whatsappError}
                  helperText={whatsappHelperText}
                  inputProps={{ maxLength: 10 }}
                  onChange={(event) => {
                    setWhatsappNumber(event.target.value);
                    setWhatsappError(false);
                    setWhatsappHelperText("");
                  }}
                  value={whatsappNumber}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  id="outlined-select-country"
                  options={zoneMappingData?.map((item) => item.countryName) || []} // Directly map to string array
                  value={selectedCountry || null}  // ✅ Correct, ensures it doesn't pass undefined

                  onChange={(event, newValue) => {
                    setSelectedCountry(newValue?.trim() || ""); // Handle null values properly
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
              <Grid item xs={12} md={4}>
                <Autocomplete
                  id="outlined-select-state"
                  options={
                    zoneMappingData?.find((item) => item.countryName === selectedCountry)
                      ?.states?.map((ite) => ite.stateName) || []
                  }
                  value={selectedState || null}
                  disabled={!selectedCountry}
                  onChange={(event, newValue) => {
                    setSelectedState(newValue?.trim() || "");
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
                      ?.states.find(
                        (state) => state.stateName === selectedState
                      )?.districts || []
                  ).map((district) => district.districtName)}
                  value={selectedDistrict || null}
                  disabled={!selectedState}
                  onChange={(event, newValue) => {
                    setSelectedDistrict(newValue || "");
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
              <Grid item xs={12} md={4}>
                <TextField
                  label="Pincode"
                  value={pincode || ""}
                  // margin="normal"
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
              {userData?.user?.roles.includes("Admin") && (
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    multiple
                    options={AddUserRoleList}
                    value={Array.isArray(roles) ? roles : []}
                    isOptionEqualToValue={(option, value) => option === value}
                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : ""
                    }
                    onChange={(event, newValue) => {
                      setRoles(Array.isArray(newValue) ? newValue : []);
                      setRolesError(false);
                      setRolesHelperText("");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={rolesError}
                        helperText={rolesHelperText}
                        label="User Role"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <LoadingButton
                  size="small"
                  color="primary"
                  onClick={addUsers}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  sx={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    backgroundColor: "#1976D2",
                    color: "white",
                  }}
                  variant="outlined"
                >
                  <span>Submit</span>
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </UserManagerTabs>
    </>
  );
}

export default UserAdd;
