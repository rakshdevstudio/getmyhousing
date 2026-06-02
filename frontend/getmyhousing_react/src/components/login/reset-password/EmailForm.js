import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../apis/apiServices";
import { config } from "../../../config/config";
import { Bounce, toast } from "react-toastify";
import { emailValidation } from "../../../common/common";
import { Link } from "react-router-dom";

const EmailForm = ({ onEmailSubmitted, nextStep }) => {
  const [cookies] = useCookies();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const emailValidate = emailValidation(email);
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let validate = true;
    if (!emailValidate) {
      validate = false;
      setLoading(false);
      setEmailError(true);
      setEmailHelperText("Please Enter Valid Email");
    }
    if (validate) {
      let params = {
        email: email,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.sendOtp,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          toast.success("OTP sent to your email", {
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
          onEmailSubmitted(email);
          setLoading(false);
        } else {
          toast.error("An error occurred. Please try again.!", {
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
          setLoading(false);
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
        setLoading(false);
      } else {
        toast.error("Something Went Wrong Please Try Again Later!", {
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
        setLoading(false);
      }
    }
  };

  return (
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
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6">Reset Password</Typography>
      <TextField
        label="Registered Email"
        fullWidth
        margin="normal"
        error={emailError}
        helperText={emailHelperText}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(false);
          setEmailHelperText("");
        }}
      />
      <Box sx={{ width: "100%" }}>
        <button
          className="login-button"
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#CCCCCC" : "rgb(230, 34, 77)",
          }}
        >
          Send OTP
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
  );
};

export default EmailForm;
