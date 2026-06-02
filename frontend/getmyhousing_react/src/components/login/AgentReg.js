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
import mobileNoValidation, {
  countryCodeList,
  generateOrderId,
  users,
  yesOrNo,
} from "../../common/common";
import { config } from "../../config/config";
import { apiList, invokeApi } from "../../apis/apiServices";
import { Bounce, toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../global/redux/action";

const AgentReg = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { locationData, locationError, isLocationFetching } = useSelector(
    (state) => state.location
  );

  const locationData1 = locationData?.countries;

  const [loading, setloading] = useState(false);
  const [role, setRole] = useState("Agent");
  const [fullName, setFullName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");

  const [countryCode, setCountryCode] = useState("91");
  const [mobileNo, setMobileNo] = useState("");
  const mobileNoValidate = mobileNoValidation(mobileNo);
  const [mobileHelperText, setMobileHelperText] = useState("");
  const [mobileNoError, setMobileNoError] = useState(false);

  const [whatsappNo, setWhatsappNo] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);
  const [taluk, setTaluk] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [pincodeError, setPincodeError] = useState(false);
  const [pincodeHelperText, setPincodeHelperText] = useState("");

  const [companyName, setCompanyName] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUppercase: false,
    hasSpecialChar: false,
    hasNumber: false,
  });

  const [freelancer, setFreelancer] = useState("");

  const [firmName, setFirmName] = useState("");
  const [firmAdress, setFirmAdress] = useState("");

  const [rera, setRera] = useState("");
  const [reraNumber, setReraNumber] = useState("");

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

  const registeration = async () => {
    setloading(true);
    let params = {
      email: email,
      password: password,
      fullName: fullName,
      companyName,
      mobileNumber: mobileNo,
      whatsappNumber: whatsappNo,
      country: country,
      state: state,
      district: district,
      city: taluk,
      pincode: pincode,
      role: role,
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
  };

  useEffect(() => {
    let scriptTag = document.createElement("script");
    scriptTag.src = "https://checkout.razorpay.com/v1/checkout.js";
    scriptTag.async = true;
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    let validate = true;

    if (!mobileNoValidate) {
      validate = false;
      setloading(false);
      setMobileNoError(true);
      setMobileHelperText("Please enter a valid mobile number");
    }
    if (!fullName) {
      validate = false;
      setloading(false);
      setNameError(true);
      setNameHelperText("Please enter your name");
    }
    if (!email) {
      validate = false;
      setloading(false);
      setEmailError(true);
      setEmailHelperText("Please enter Email Address");
    }
    if (!pincode) {
      validate = false;
      setloading(false);
      setPincodeError(true);
      setPincodeHelperText("Please enter Postal Code");
    }
    if (!isInputEnabled) {
      validate = false;
      setloading(false);
      setPasswordError(true);
      setPasswordHelperText("Please Enter Valid Password");
    }
    if (validate) {
      var options = {
        key: "rzp_live_NnYKpejIVYne08", // Enter the Key ID generated from the Dashboard
        key_secret: "1BhQBlmrKAjEqFTTBzpFKZ8o",
        amount: 353900, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Get My Housing", //your business name
        image: "https://getmyhousing.com/getmyhousing.png",
        handler: function (response) {
          registeration();
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: fullName, //your customer's name
          email: email,
          contact: mobileNo, //Provide the customer's phone number for better conversion rates
        },
      };
      var rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        toast.error(
          "Your Transaction is Failed If You have query contact Admin!",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      });
      rzp1.open();
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
          <form style={{ padding: "20px" }} onSubmit={handlePayment}>
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
              variant="outlined"
              type="name"
              error={nameError}
              helperText={nameHelperText}
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
              variant="outlined"
              type="email"
              error={emailError}
              helperText={emailHelperText}
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
                setCountry(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Please select your country"
                  variant="outlined"
                  autoComplete="new-password"
                  margin="dense"
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
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Please select your state"
                  variant="outlined"
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
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  label="Please select your city / district"
                  variant="outlined"
                  value={district}
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      setDistrict(event.target.value);
                    }
                  }}
                />
              )}
            />

            <Autocomplete
              id="outlined-select-taluk"
              options={(
                locationData1
                  ?.find((item) => item.countryName === country)
                  ?.states?.find((states) => states.stateName === state)
                  ?.districts?.find(
                    (districtss) => districtss.districtName === district
                  )?.taluks || []
              )?.map((taluk) => taluk.taluk)}
              value={taluk}
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
              disabled={!district}
              freeSolo={true}
              onChange={(event, newValue) => {
                setTaluk(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={taluk}
                  margin="dense"
                  label="Please select your Taluk / Zone / Village"
                  variant="outlined"
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      setTaluk(event.target.value);
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
              }}
              id="outlined-basic-5"
              label="Enter Company Name"
              variant="outlined"
              type="name"
              fullWidth
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
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
            <Box>
              <Box sx={{ my: 2 }}>
                <Typography variant="body1">
                  Are you freelancer/ proprietor/ Partnership/ Private limited?
                </Typography>
              </Box>
              <Box
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                }}
              >
                {yesOrNo?.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setFreelancer(event.target.value);
                    }}
                    key={item}
                    style={{
                      marginRight: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    <input
                      type="radio"
                      name="201tyj"
                      value={item}
                      checked={freelancer === item}
                      readOnly
                    />
                    <span className="border1">{item}</span>
                  </label>
                ))}
              </Box>
              {freelancer === "Yes" && (
                <>
                  <TextField
                    sx={{
                      mb: 3,
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
                    id="outlined-basic-8"
                    label="Enter Your Firm Name"
                    variant="outlined"
                    type="name"
                    fullWidth
                    value={firmName}
                    onChange={(event) => setFirmName(event.target.value)}
                  />
                  <TextField
                    sx={{
                      mb: 2,
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
                    id="outlined-basic-9"
                    label="Enter Your Firm Adress"
                    variant="outlined"
                    type="name"
                    fullWidth
                    value={firmAdress}
                    onChange={(event) => setFirmAdress(event.target.value)}
                  />
                </>
              )}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">Are you RERA Registed?</Typography>
              </Box>
              <Box
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                }}
              >
                {yesOrNo?.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setRera(event.target.value);
                    }}
                    key={item}
                    style={{
                      marginRight: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    <input
                      type="radio"
                      name="202geggrg"
                      value={item}
                      checked={rera === item}
                      readOnly
                    />
                    <span className="border1">{item}</span>
                  </label>
                ))}
              </Box>
              {rera === "Yes" && (
                <TextField
                  sx={{
                    mb: 3,
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
                  id="outlined-basic-10"
                  label="Enter RERA Number"
                  variant="outlined"
                  type="name"
                  fullWidth
                  value={reraNumber}
                  onChange={(event) => setReraNumber(event.target.value)}
                />
              )}
            </Box>

            <Box sx={{ width: "100%", mt: 2 }}>
              <Typography variant="caption">
                Registration Fee <b>2999 + 18%</b> GST
              </Typography>
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

export default AgentReg;
