import React, { useRef, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import CloseIcon from "@mui/icons-material/Close";
import mobileNoValidation, { validatePassword } from "../../../common/common";
import { config } from "../../../config/config";
import { apiList, invokeApi } from "../../../apis/apiServices";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../../global/redux/action";
import { useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DashBoardHeader = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requestedLocationUserIdRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const handleIsChangePassword = () => setIsChangePassword(!isChangePassword);
  const [openProfile, setOpenProfile] = useState(false);
  const [openProfileEditModal, setOpenProfileEditModal] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const mobilevalidate = mobileNoValidation(phone);
  const [phoneHelperText, setPhoneHelperText] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordHelperText, setNewPasswordHelperText] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { userData, userError } = useSelector((state) => state.user);
  const { locationData, locationError, isLocationFetching } = useSelector(
    (state) => state.location
  );

  useEffect(() => {
    if (userError) {
      alert(
        "Something went wrong while fetching user details. Please try again later!"
      );
    }
    if (locationError) {
      alert(
        "Something went wrong while fetching Location details. Please try again later!"
      );
    }
  }, [userError, locationError]);

  useEffect(() => {
    const loginUserId = cookies[config.cookieName]?.loginUserId;
    if (!locationData?.countries && !isLocationFetching && !locationError) {
      if (!loginUserId || requestedLocationUserIdRef.current === loginUserId) {
        return;
      }
      requestedLocationUserIdRef.current = loginUserId;
      dispatch(
        getLocation({ id: loginUserId, cookies })
      );
    }
  }, [
    cookies,
    locationError,
    locationData,
    isLocationFetching,
    dispatch,
  ]);

  const handleChangeNewPassword = (e) => {
    const value = e.target.value;
    setNewPasswordError(false);
    setNewPasswordHelperText("");
    setNewPassword(value || "");

    const criteria = validatePassword(value);
    const errors = [];

    if (!criteria.minLength) errors.push("Minimum 8 characters");
    if (!criteria.hasUppercase) errors.push("At least one uppercase letter");
    if (!criteria.hasNumber) errors.push("At least one number");
    if (!criteria.hasSpecialChar) errors.push("At least one special character");

    const isValid = errors.length === 0;

    setNewPasswordError(!isValid);
    setNewPasswordHelperText(errors.join(", "));
  };

  function handleChangeConfirmPassword(e) {
    const value = e.target.value;
    setConfirmPassword(value || "");

    let validate = true;
    let helperText = "";

    // Check if the passwords match
    if (value !== newPassword) {
      validate = false;
      helperText = "Passwords do not match";
    }

    // Check if the confirmed password meets other criteria
    const criteria = validatePassword(value);
    if (!criteria.minLength) {
      validate = false;
      helperText = "Minimum 8 characters";
    }
    if (!criteria.hasUppercase) {
      validate = false;
      helperText = "At least one uppercase letter";
    }
    if (!criteria.hasNumber) {
      validate = false;
      helperText = "At least one number";
    }
    if (!criteria.hasSpecialChar) {
      validate = false;
      helperText = "At least one special character";
    }

    setConfirmPasswordError(!validate);
    setConfirmPasswordHelperText(helperText);
  }

  const closeProfile = () => {
    setOpenProfile(false);
    setOpenProfileEditModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    var validation = true;
    if (!mobilevalidate) {
      setPhoneHelperText("Please Enter Valid Mobile Number");
      setPhoneError(true);
      validation = false;
    }
    if (!name) {
      setNameHelperText("Please Enter Your Name");
      setNameError(true);
      validation = false;
    }
    if (validation) {
      let params = { id: userData?.users.id, name: name, phoneNumber: phone };
      let response = await invokeApi(
        config.apiDomains + apiList.updateUser,
        params,
        cookies
      );

      if (response?.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          // setOpenProfileEditModal(false);
          // closeProfile();
          setPhoneHelperText("");
          setNameError(false);
          setNameHelperText("");
          setPhoneError(false);
        } else {
          alert(
            "Something went wrong while getting the Update User Details. Please try again later!"
          );
        }
      } else {
        alert(
          "Something went wrong while getting the Update User Details. Please try again later!!"
        );
      }
    }
  };

  const handleChangePassword = async () => {
    let params = {
      email: email,
      password: oldPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.changePassowrd,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success("SuccessFully Changed Your Password!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        handleIsChangePassword();
        setEmail("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.data.responseMessage, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else if (
      response.status === 401 &&
      response.data.responseMessage ===
      "Entered password does not match with old Password ."
    ) {
      toast.info(`${response.data.responseMessage}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (response.status === 401) {
      navigate("/logout");
    } else {
      toast.error("Please Check You Entered Details Or Try Again Later", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={6}>
          <TextField
            type="text"
            size="small"
            placeholder="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                borderRadius: 25,
                border: "none",
                outline: "none",
                backgroundColor: "#fff",
              }, // Adjust the border radius as needed
            }}
          />
        </Grid>
        <Grid item sm={6} xs={6}>
          <Box sx={{ display: "inline-block", float: "right" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton color="inherit" size="large">
                <Badge badgeContent={5} color="error" overlap="circular">
                  <img
                    src="/media/svg/notificationIcon.svg"
                    width="26px"
                    height="26px"
                    alt="notification"
                  />
                </Badge>
              </IconButton>
              <Avatar
                onClick={handleClick}
                sx={{
                  width: 35,
                  height: 35,
                  cursor: "pointer",
                  backgroundColor: "primary.main",
                  border: "1px solid #fff",
                  borderRadius: "50%",
                }}
              >
                {userData?.user?.fullName[0]}
              </Avatar>
            </Box>
          </Box>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                setOpenProfile(true);
                handleClose();
              }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/");
                handleClose();
              }}
            >
              Visit Website
            </MenuItem>
            <MenuItem
              onClick={() => {
                // navigate("/");
                handleClose();
                handleIsChangePassword();
              }}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/logout");
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>

      {/* below the modal is for show user profile and edit there profile details  */}
      <BootstrapDialog open={openProfile} onClose={closeProfile}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {openProfileEditModal ? "Update Details" : "Profile"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeProfile}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {!openProfileEditModal ? (
            <>
              <Typography sx={{ fontSize: "20px" }}>
                Name: {userData?.user.fullName}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Email: {userData?.user.email}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Mobile: {userData?.user.mobileNumber}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Whatsapp Number: {userData?.user.whatsappNumber}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Role: {userData?.user.roles.map((role) => role + ",")}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Address: {userData?.user.district} ,{userData?.user.state} ,
                {userData?.user.country}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background: "#405189",
                  borderRadius: 5,
                  border: 0,
                  color: "white",
                  height: 40,
                  padding: "0 30px",

                  boxShadow: "#405189",
                  "&:hover": {
                    //you want this to be the same as the backgroundColor above
                    backgroundColor: "#405189",
                  },
                }}
                onClick={() => {
                  // Set the state to open the edit modal
                  setOpenProfileEditModal(true);
                  setName(userData?.users.name);
                  setPhone(userData?.users.phoneNumber);
                }}
              >
                Edit
              </Button>
              <Button
                onClick={closeProfile}
                sx={{
                  background: "#405189",
                  borderRadius: 5,
                  border: 0,
                  color: "white",
                  height: 40,
                  padding: "0 20px",
                  margin: "10px",
                  boxShadow: "#405189",
                  "&:hover": {
                    //you want this to be the same as the backgroundColor above
                    backgroundColor: "#405189",
                  },
                }}
              >
                cancel
              </Button>
            </>
          ) : (
            <>
              <form onSubmit={updateUser}>
                <TextField
                  label="Name"
                  value={name}
                  error={nameError}
                  helperText={nameHelperText}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  sx={{ my: 2 }}
                />
                <TextField
                  label="Mobile Number"
                  value={phone}
                  error={phoneError}
                  helperText={phoneHelperText}
                  inputProps={{
                    maxLength: 10,
                  }}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  sx={{ my: 2 }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  // disabled={isFileUploadFetching}
                  sx={{
                    background: "#405189",
                    borderRadius: 5,
                    border: 0,
                    color: "white",
                    height: 48,
                    padding: "0 30px",

                    boxShadow: "#405189",
                    "&:hover": {
                      //you want this to be the same as the backgroundColor above
                      backgroundColor: "#405189",
                    },
                  }}
                >
                  Update
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </BootstrapDialog>

      {/* change password modal below */}
      <BootstrapDialog open={isChangePassword} onClose={handleIsChangePassword}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Change Password</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleIsChangePassword}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
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
            label="Enter Your Email"
            variant="outlined"
            type="email"
            margin="normal"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
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
            margin="normal"
            id="old-password"
            label="Enter Your Old Password"
            variant="outlined"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword || ""}
            onChange={(event) => setOldPassword(event.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
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
            margin="normal"
            id="outlined-basic-2"
            label="Enter Your New Password"
            error={newPasswordError}
            helperText={newPasswordHelperText}
            variant="outlined"
            type={showNewPassword ? "text" : "password"}
            value={newPassword || ""}
            onChange={handleChangeNewPassword}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
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
            margin="normal"
            id="outlined-basic-3"
            label="Confirm Your New Password"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword || ""}
            onChange={handleChangeConfirmPassword}
            error={confirmPasswordError}
            helperText={confirmPasswordHelperText}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ width: "100%" }}>
            <button
              className="login-button"
              type="submit"
              onClick={handleChangePassword}
            >
              Login
            </button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default DashBoardHeader;
