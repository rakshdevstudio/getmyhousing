import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../apis/apiServices";
import { config } from "../../../config/config";
import { Bounce, toast } from "react-toastify";

const PasswordForm = ({ email }) => {
  const [cookies] = useCookies();
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordHelperText, setNewPassworeHelperText] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUppercase: false,
    hasSpecialChar: false,
    hasNumber: false,
  });

  const isInputEnabled =
    passwordCriteria.minLength &&
    passwordCriteria.hasUppercase &&
    passwordCriteria.hasSpecialChar &&
    passwordCriteria.hasNumber;

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
    setNewPasswordError(false);
    setNewPassworeHelperText("");

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

    if (newPassword !== value) {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText("Password Mismatch");
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordHelperText("Password is Match");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let validate = true;
    if (!newPassword && !isInputEnabled) {
    }
    let params = {
      email: email,
      newPassword: newPassword,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.resetPassword,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success("Password changed successfully", {
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
        navigate("/");
      } else if (
        response.data.responseCode === "401" &&
        response.data.responseMessage ===
          "Entered password is same please give correct password ."
      ) {
        toast.warn("Entered Password Should Not Be Same As Old Password", {
          position: "top-center",
          autoClose: 200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error("Error changing password!", {
          position: "top-center",
          autoClose: 200,
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
      response.status === 404 &&
      response.data.responseMessage === "Email not found"
    ) {
      toast.warn(response.data.responseMessage, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("Error changing password!", {
        position: "top-center",
        autoClose: 200,
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
      <Box
        component="form"
        sx={{
          width: { md: "35%", xs: "100%" },
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          marginTop: { md: theme.spacing(5) },
          marginRight: { md: theme.spacing(2) },
          padding: theme.spacing(3),
          borderRadius: theme.spacing(2),
          boxShadow: theme.shadows[3],
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Enter OTP</Typography>
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
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={handlePasswordChange}
          error={newPasswordError}
          helperText={newPasswordHelperText}
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

        {newPassword && (
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
            style={{
              backgroundColor: "rgb(230, 34, 77)",
            }}
          >
            Login
          </button>
        </Box>
        <Button
          component={Link}
          to="/login"
          variant="text"
          color="primary"
          sx={{ paddingLeft: 0, mt: 1 }}
        >
          Back To Login
        </Button>
      </Box>
    </>
  );
};

export default PasswordForm;
