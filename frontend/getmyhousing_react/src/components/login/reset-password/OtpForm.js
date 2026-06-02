import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../apis/apiServices";
import { config } from "../../../config/config";
import { Bounce, toast } from "react-toastify";
import "./../App.css";
import { Link } from "react-router-dom";

const OtpForm = ({ onOtpSubmitted, email }) => {
  const [cookies] = useCookies();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    // Timer logic
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [otp, timeLeft]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input if a value is entered
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (element, index, event) => {
    if (event.key === "Backspace") {
      if (otp[index] === "" && index !== 0) {
        // Move to the previous input
        element.previousSibling.focus();
      } else {
        // Clear the current input
        setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
        setFocusedIndex(index);
      }
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleClick = (index) => {
    setFocusedIndex(index);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (otp.includes("")) {
      setLoading(true);
    } else {
      let params = {
        email: email,
        otp: otp.join(""),
      };
      let response = await invokeApi(
        config.apiDomains + apiList.verifyOtp,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          toast.success("OTP verified", {
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
          onOtpSubmitted();
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
        response.status === 400 &&
        response.data.responseMessage === "Invalid OTP"
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
      } else if (response.status === 408) {
        toast.error("Entered OTP is Expired!", {
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

  const handleReSendOtp = async () => {
    if (email) {
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
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
        <div className="otp-inputs">
          {otp.map((data, index) => {
            return (
              <input
                className="otp-input"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e.target, index, e)}
                onFocus={() => handleFocus(index)}
                onClick={() => handleClick(index)}
                ref={(input) =>
                  input && focusedIndex === index && input.focus()
                }
              />
            );
          })}
        </div>
        <div className="timer">
          {timeLeft > 0 ? (
            <span>Time remaining: {formatTime(timeLeft)}</span>
          ) : (
            <span>OTP expired</span>
          )}
        </div>
        <Box sx={{ width: "100%", mt: 2 }}>
          <button
            className="login-button"
            type="submit"
            disabled={loading || !timeLeft > 0}
            style={{
              backgroundColor: "rgb(230, 34, 77)",
            }}
          >
            Submit
          </button>
        </Box>
        {!timeLeft > 0 && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <button
              className="login-button"
              disabled={loading}
              onClick={handleReSendOtp}
              style={{
                backgroundColor: "rgb(230, 34, 77)",
              }}
            >
              Re Send OTP
            </button>
          </Box>
        )}
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

export default OtpForm;
