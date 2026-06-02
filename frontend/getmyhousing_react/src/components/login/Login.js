import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Divider,
  IconButton,
  Grid,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { config } from "../../config/config";
import { apiList, invokeApi } from "../../apis/apiServices";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, getUser } from "../../global/redux/action";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies([config.cookieName]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const [mail, setMail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const { userData, userError, isFetching } = useSelector(
    (state) => state.user
  );
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
    // Check if the necessary conditions are met before dispatching
    if (
      cookies[config.cookieName]?.loginUserId &&
      !userData &&
      !isFetching &&
      !userError
    ) {
      dispatch(
        getUser({ id: cookies[config.cookieName]?.loginUserId, cookies })
      );
    }
    if (!locationData?.countries && !isLocationFetching && !locationError) {
      dispatch(
        getLocation({ id: cookies[config.cookieName]?.loginUserId, cookies })
      );
    }
  }, [
    dispatch,
    cookies,
    userData,
    isFetching,
    userError,
    locationError,
    locationData,
    isLocationFetching,
  ]);



  const handleLogin = async (e) => {
    e.preventDefault();
    setloading(true);
    let params = { email: mail, password: password };
    let response = await invokeApi(
      config.apiDomains + apiList.login,
      params,
      cookies
    );
    if (response?.status >= 200 && response?.status < 300) {
      if (response.data.responseCode === "200") {
        setCookies(
          config.cookieName,
          {
            loginUserId: response.data.userId,
            token: response.data.token,
          },
          { path: "/" }
        );
        navigate(`/`);
        setloading(false);
      } else {
        alert("Something went wrong while login. Please try again later!");
        setloading(false);
      }
    } else if (
      response?.status === 400 &&
      response.data.responseMessage ===
      "password - is an empty or not in valid format"
    ) {
      toast.error(`${response.data.responseMessage}`, {
        position: "top-center",
        autoClose: 2999,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setloading(false);
      setPasswordError(true);
      setPasswordHelperText("Please Enter Valid Password");
    } else if (
      response?.status === 401 ||
      response?.data.responseMessage?.includes("Password missMatch")
    ) {
      toast.error("🦄 Please Check Password!", {
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
      setPasswordError(true);
      setPasswordHelperText("Please Enter Valid Password");
    } else if (
      response?.data?.responseCode === "401" &&
      response?.data?.responseMessage?.includes("deleted")
    ) {
      toast.error("This user has been Deleted!", {
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
    } else {
      alert("Something went wrong while login. Please try again later!!");
      setloading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: { md: `url(/media/images/bg-login.jpg)` },
          backgroundSize: "cover",
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: theme.spacing(3),
        }}
      >
        <Box
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
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: theme.spacing(3) }}
          >
            <Grid item>
              <Typography variant="h5">Login</Typography>
            </Grid>
            {/* Cancel icon */}
            <Grid item>
              <IconButton
                onClick={() => {
                  navigate("/");
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
          {/* Login form body */}
          <Box sx={{ mt: theme.spacing(3) }}>
            <TextField
              id="outlined-basic-1"
              label="Enter Your Email"
              variant="outlined"
              type="email"
              autoComplete="email"
              margin="normal"
              fullWidth
              value={mail}
              onChange={(event) => setMail(event.target.value)}
            />
            <TextField
              id="outlined-basic-2"
              label="Enter Your Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              margin="normal"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
                setPasswordHelperText("");
              }}
              fullWidth
              error={passwordError}
              helperText={passwordHelperText}
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
              sx={{ marginBottom: theme.spacing(2) }}
            />
            <Box sx={{ width: "100%", textAlign: "right", px: 2, py: 1 }}>
              <Link to="/reset-password" color="primary">
                Forgot Password?
              </Link>
            </Box>
            <Box sx={{ width: "100%" }}>
              <button
                className="login-button"
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#CCCCCC" : "rgb(230, 34, 77)",
                }}
              >
                Login
              </button>
            </Box>
            <Typography variant="body2" sx={{ py: 2, textAlign: "center" }}>
              Don't have an account?{" "}
              <Button
                component={Link}
                to="/register"
                variant="text"
                color="primary"
                sx={{ paddingLeft: 0 }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default Login;
