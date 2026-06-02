import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import CloseIcon from "@mui/icons-material/Close";
import mobileNoValidation, { countryCodeList } from "../../common/common";
import { config } from "../../config/config";
import { apiList, invokeApi } from "../../apis/apiServices";
import { Bounce, toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../global/redux/action";

const Register = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { locationData, locationError, isLocationFetching } = useSelector(
    (state) => state.location
  );

  const locationData1 = locationData?.countries;

  const [loading, setloading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [mobileNo, setMobileNo] = useState("");
  const mobileNoValidate = mobileNoValidation(mobileNo);
  const [whatsappNo, setWhatsappNo] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUppercase: false,
    hasSpecialChar: false,
    hasNumber: false,
  });

  // below tha error and helpertext states
  const [mobileHelperText, setMobileHelperText] = useState("");
  const [mobileNoError, setMobileNoError] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState("");

  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [whatsappNoError, setWhatsappNoError] = useState(false);
  const [whatsappNoHelperText, setWhatsappNoHelperText] = useState("");

  const [countryError, setCountryError] = useState(false);
  const [countryHelperText, setCountryHelperText] = useState("");

  const [stateError, setStateError] = useState(false);
  const [stateHelperText, setStateHelperText] = useState("");

  const [cityError, setCityError] = useState(false);
  const [cityHelperText, setCityHelperText] = useState("");

  const [pincodeError, setPincodeError] = useState(false);
  const [pincodeHelperText, setPincodeHelperText] = useState("");

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordError(false);
    setPasswordHelperText("");

    const minLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    setPasswordCriteria({
      minLength,
      hasUppercase,
      hasSpecialChar,
      hasNumber,
    });
  };

  function handleConfirmPassword(e) {
    let value = e.target.value;
    setConfirmPassword(value);

    if (password === value) {
      setConfirmPasswordError(false);
      setConfirmPasswordHelperText("Passwords match");
    } else {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText("Passwords do not match");
    }
  }

  const isInputEnabled =
    passwordCriteria.minLength &&
    passwordCriteria.hasUppercase &&
    passwordCriteria.hasSpecialChar &&
    passwordCriteria.hasNumber;

  const registeration = async (ev) => {
    ev.preventDefault();
    setloading(true);
    let validate = true;

    if (!mobileNoValidate) {
      validate = false;
      setloading(false);
      setMobileNoError(true);
      setMobileHelperText("Please enter a valid mobile number");
    }
    if (!isInputEnabled) {
      validate = false;
      setloading(false);
      setPasswordError(true);
      setPasswordHelperText("Please Enter Valid Password");
    }
    if (!fullName) {
      validate = false;
      setloading(false);
      setNameError(true);
      setNameHelperText("Please Enter Your Name");
    }
    if (!email) {
      validate = false;
      setloading(false);
      setEmailError(true);
      setEmailHelperText("Please Enter Your Email Id");
    }
    if (!whatsappNo) {
      validate = false;
      setloading(false);
      setWhatsappNoError(true);
      setWhatsappNoHelperText("Please Enter Your Whatsapp No");
    }
    if (!country) {
      validate = false;
      setloading(false);
      setCountryError(true);
      setCountryHelperText("Please Select Country");
    }
    if (!state) {
      validate = false;
      setloading(false);
      setStateError(true);
      setStateHelperText("Please Select Your State");
    }
    if (!district) {
      validate = false;
      setloading(false);
      setCityError(true);
      setCityHelperText("Please Select Your City");
    }
    if (!pincode) {
      validate = false;
      setloading(false);
      setPincodeError(true);
      setPincodeHelperText("Please Enter Your Postal Code");
    }
    if (validate) {
      let params = {
        email: email,
        password: password,
        fullName: fullName,
        mobileNumber: mobileNo,
        whatsappNumber: whatsappNo,
        country: country,
        state: state,
        district: district,
        city: district,
        pincode: pincode,
        role: "Owner",
        countryCode: countryCode,
        // createdBy: userId,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.singup,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          toast.success("Registerd successfully", {
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
          navigate("/login");
          setloading(false);
        } else if (response.data.responseCode === "PB001-1") {
          toast.info("This Email is Already Registered!", {
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
          alert("Something went wrong while Register. Please try again later!");
          setloading(false);
        }
      } else {
        alert("Something went wrong while Register. Please try again later!!");
        setloading(false);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          backgroundImage: "url(/media/images/bg-login.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden", // Ensure the overlay covers the entire box
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "400px",
            maxHeight: "90%",
            my: "auto",
            backgroundColor: "white", // Semi-transparent white overlay
            borderRadius: "8px",

            alignItems: "center",
            overflowY: "scroll",
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ pt: 1, px: 3 }}
          >
            <Grid item>
              <Typography variant="h5">Register</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => navigate("/")}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <form style={{ padding: "20px" }} onSubmit={registeration}>
            <TextField
              margin="dense"
              autoComplete="new-password"
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
                "& fieldset": {
                  border: "1px solid #AAACAE",
                  borderRadius: "15px",
                },
                "& .MuiInputAdornment-root": {
                  mr: "0px",
                },
              }}
              id="outlined-basic-1"
              label="Enter Your Full Name"
              error={nameError}
              helperText={nameHelperText}
              variant="outlined"
              type="name"
              fullWidth
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
                setNameError(false);
                setNameHelperText("");
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <FormControl fullWidth variant="outlined" sx={{ width: "30%" }}>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  size="small"
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                  sx={{ py: 1 }}
                >
                  {countryCodeList?.map((item, index) => (
                    <MenuItem key={index} value={item.code}>
                      {"+ " + item.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label=" Enter Your Mobile Number"
                inputProps={{ maxLength: 10 }}
                margin="dense"
                autoComplete="new-password"
                sx={{
                  fontWeight: "400",
                  fontSize: "16px",
                  // lineHeight: "150%",
                  "& fieldset": {
                    border: "1px solid #AAACAE",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: !mobileNoValidate
                        ? "1px solid #AAACAE"
                        : "1px solid #0B735F",
                    },
                  },
                  "& .MuiInputAdornment-root": {
                    mr: "0px",
                  },
                  "& input": {
                    letterSpacing: "2px", // Adjust this value to control the gap
                  },
                }}
                id="outlined-basic-2"
                variant="outlined"
                type="phone"
                fullWidth
                value={mobileNo}
                onChange={(ev) => {
                  setMobileNo(ev.target.value.replace(/\D/, ""));
                  setMobileNoError(false);
                  setMobileHelperText("");
                }}
                error={mobileNoError}
                helperText={
                  <Box component={"span"}>
                    {mobileNoError && (
                      <Box
                        component={"span"}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <Box
                          component="img"
                          sx={{
                            width: "18px",
                            height: "18px",
                            mr: 1,
                          }}
                          src="/media/svg/error-exclaim.svg"
                        />
                        {mobileHelperText}
                      </Box>
                    )}
                  </Box>
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <>
                        {/* green-tick */}
                        {mobileNoValidate ? (
                          <Box
                            component="img"
                            sx={{
                              width: "35px",
                              height: "35px",
                            }}
                            src="/media/images/ok.jpg"
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "21px",
                              height: "21px",
                            }}
                          />
                        )}
                      </>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <TextField
              label="Enter Your WhatsApp Number"
              margin="dense"
              autoComplete="new-password"
              error={whatsappNoError}
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
                "& fieldset": {
                  border: "1px solid #AAACAE",
                  borderRadius: "15px",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: !mobileNoValidate
                      ? "1px solid #AAACAE"
                      : "1px solid #0B735F",
                  },
                },
                "& .MuiInputAdornment-root": {
                  mr: "0px",
                },
                "& input": {
                  letterSpacing: "2px", // Adjust this value to control the gap
                },
              }}
              id="outlined-basic-3"
              variant="outlined"
              type="phone"
              fullWidth
              value={whatsappNo}
              onChange={(ev) => {
                setWhatsappNo(ev.target.value.replace(/\D/, ""));
                setMobileNoError(false);
                setMobileHelperText("");
              }}
              inputProps={{ maxLength: 10 }}
              helperText={
                <Box component={"span"}>
                  {whatsappNoError && (
                    <Box
                      component={"span"}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          width: "18px",
                          height: "18px",
                          mr: 1,
                        }}
                        src="/media/svg/error-exclaim.svg"
                      />
                      {whatsappNoHelperText}
                    </Box>
                  )}
                </Box>
              }
            />

            <TextField
              margin="dense"
              autoComplete="new-password"
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
                "& fieldset": {
                  border: "1px solid #AAACAE",
                  borderRadius: "15px",
                },
                "& .MuiInputAdornment-root": {
                  mr: "0px",
                },
              }}
              id="outlined-basic-4"
              label="Enter Your Email"
              error={emailError}
              helperText={emailHelperText}
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError(false);
                setEmailHelperText("");
              }}
            />

            <Autocomplete
              id="outlined-select-country"
              autoComplete="new-password"
              options={locationData1?.map((item) => item.countryName)}
              value={country}
              freeSolo={true}
              fullWidth
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
                "& fieldset": {
                  border: "1px solid #AAACAE",
                  borderRadius: "15px",
                },
                "& .MuiInputAdornment-root": {
                  mr: "0px",
                },
              }}
              onChange={(event, newValue) => {
                setCountry(newValue);
                setCountryError(false);
                setCountryHelperText("");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Please select your country"
                  variant="outlined"
                  autoComplete="new-password"
                  margin="dense"
                  error={countryError}
                  helperText={countryHelperText}
                  value={country}
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      setCountry(event.target.value);
                    }
                  }}
                  fullWidth
                />
              )}
            />
            <Autocomplete
              id="outlined-select-country"
              options={(
                locationData1?.find((item) => item.countryName === country)
                  ?.states || []
              )?.map((state) => state.stateName)}
              value={state}
              freeSolo={true}
              disabled={!country}
              fullWidth
              // size="small"
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",

                "& fieldset": {
                  border: "1px solid #AAACAE",
                  borderRadius: "15px",
                },
                "& .MuiInputAdornment-root": {
                  mr: "0px",
                },
              }}
              onChange={(event, newValue) => {
                setState(newValue);
                setStateError(false);
                setStateHelperText("");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Please select your state"
                  variant="outlined"
                  error={stateError}
                  helperText={stateHelperText}
                  value={state}
                  margin="dense"
                  // sx={{ cursor: country ? "default" : "not-allowed" }}
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      setState(event.target.value);
                    }
                  }}
                />
              )}
            />

            <Autocomplete
              id="outlined-select-district"
              options={(
                locationData1
                  ?.find((item) => item.countryName === country)
                  ?.states?.find((states) => states.stateName === state)
                  ?.districts || []
              )?.map((district) => district.districtName)}
              value={district}
              fullWidth
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
                "& fieldset": {
                  border: "1px solid #AAACAE",
                  borderRadius: "15px",
                },
                "& .MuiInputAdornment-root": {
                  mr: "0px",
                },
              }}
              disabled={!state}
              freeSolo={true}
              onChange={(event, newValue) => {
                setDistrict(newValue);
                setCityError(false);
                setCityHelperText("");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  label="Please select your city / district"
                  variant="outlined"
                  error={cityError}
                  helperText={cityHelperText}
                  value={district}
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      setDistrict(event.target.value);
                    }
                  }}
                />
              )}
            />

            <TextField
              label="Pincode"
              value={pincode}
              error={pincodeError}
              helperText={pincodeHelperText}
              margin="dense"
              fullWidth
              onChange={(event) => {
                setPincode(event.target.value);
                setPincodeError(false);
                setPincodeHelperText("");
              }}
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
                "& fieldset": {
                  border: "1px solid #AAACAE",
                  borderRadius: "15px",
                },
                "& .MuiInputAdornment-root": {
                  mr: "0px",
                },
              }}
            />

            <TextField
              margin="dense"
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
                "& fieldset": {
                  border: "1px solid #AAACAE",
                  borderRadius: "15px",
                },
                "& .MuiInputAdornment-root": {
                  mr: "0px",
                },
                my: 1.5,
              }}
              id="outlined-basic-6"
              label="Enter Your Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordHelperText}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {password && (
              <Box sx={{ px: 2, py: 1, width: "100%" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#95a5a6",
                    // fontWeight: passwordCriteria.minLength
                    //   ? "bold"
                    //   : "dense",
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                    py: "5px",
                  }}
                >
                  {passwordCriteria.minLength ? (
                    <Box
                      component="img"
                      sx={{
                        width: "30px",
                        height: "30px",
                        display: "inline",
                      }}
                      src="/media/images/ok.jpg"
                    />
                  ) : (
                    <Box
                      component="img"
                      sx={{
                        width: "18px",
                        height: "18px",
                        mr: 1,
                      }}
                      src="/media/svg/error-exclaim.svg"
                    />
                  )}
                  Minimum 8 characters
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#95a5a6",
                    // fontWeight: passwordCriteria.hasUppercase
                    //   ? "bold"
                    //   : "dense",
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                    py: "5px",
                  }}
                >
                  {passwordCriteria.hasUppercase ? (
                    <Box
                      component="img"
                      sx={{
                        width: "30px",
                        height: "30px",
                      }}
                      src="/media/images/ok.jpg"
                    />
                  ) : (
                    <Box
                      component="img"
                      sx={{
                        width: "18px",
                        height: "18px",
                        mr: 1,
                      }}
                      src="/media/svg/error-exclaim.svg"
                    />
                  )}
                  At least one uppercase letter
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#95a5a6",
                    // fontWeight: passwordCriteria.hasSpecialChar
                    //   ? "bold"
                    //   : "dense",
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                    py: "5px",
                  }}
                >
                  {passwordCriteria.hasSpecialChar ? (
                    <Box
                      component="img"
                      sx={{
                        width: "30px",
                        height: "30px",
                      }}
                      src="/media/images/ok.jpg"
                    />
                  ) : (
                    <Box
                      component="img"
                      sx={{
                        width: "18px",
                        height: "18px",
                        mr: 1,
                      }}
                      src="/media/svg/error-exclaim.svg"
                    />
                  )}
                  At least one special character
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#95a5a6",
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                    py: "5px",
                  }}
                >
                  {passwordCriteria.hasNumber ? (
                    <Box
                      component="img"
                      sx={{
                        width: "30px",
                        height: "30px",
                      }}
                      src="/media/images/ok.jpg"
                    />
                  ) : (
                    <Box
                      component="img"
                      sx={{
                        width: "18px",
                        height: "18px",
                        mr: 1,
                      }}
                      src="/media/svg/error-exclaim.svg"
                    />
                  )}
                  At least one digit
                </Typography>
              </Box>
            )}

            <TextField
              margin="dense"
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
                "& fieldset": {
                  border: "1px solid #AAACAE",
                  borderRadius: "15px",
                },
                "& .MuiInputAdornment-root": {
                  mr: "0px",
                },
              }}
              id="outlined-basic-7"
              label="Confirm Your Password"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPassword}
              fullWidth
              disabled={!isInputEnabled}
              helperText={confirmPasswordHelperText}
              error={confirmPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ width: "100%", mt: 2 }}>
              {/* <Typography variant="caption">
                Registration Fee <b>2999 + 18%</b> GST
              </Typography> */}
              <button className="login-button" type="submit" disabled={loading}>
                Sign Up
              </button>
            </Box>
            <Typography variant="body2" sx={{ py: 2, textAlign: "center" }}>
              Already a member?{" "}
              <Button
                component={Link}
                to="/login"
                variant="text"
                color="primary"
                sx={{ paddingLeft: 0 }}
              >
                Login here
              </Button>
            </Typography>
          </form>
        </Box>
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default Register;
