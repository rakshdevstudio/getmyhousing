import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../../generic/Footer";
import Header from "../../generic/Header";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../apis/apiServices";
import { config } from "../../../config/config";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import mobileNoValidation from "../../../common/common";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../global/redux/action";
import { Link } from "react-router-dom";
import Helmet from "../../functional-component/Helmet";

export function ContactUs() {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const { userData, userError, isFetching } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
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
  }, [cookies, userData, isFetching, userError]);

  const [name, setName] = useState(userData?.user?.fullName || "");
  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");

  const [email, setEmail] = useState(userData?.user?.email || "");
  const [subject, setSubject] = useState("");

  const [mobileNumber, setMobileNumber] = useState(
    userData?.user?.mobileNumber || ""
  );
  const phonevalidation = mobileNoValidation(mobileNumber);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState("");

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [messageHelperText, setMessageHelperText] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const saveContactUsData = async () => {
    setIsLoading(true);
    let validate = true;
    if (!phonevalidation) {
      setPhoneError(true);
      setPhoneHelperText("Please Enter Valid Mobile Number");
      validate = false;
      setIsLoading(false);
    }
    if (!name) {
      setNameError(true);
      setNameHelperText("Please Enter Your Name");
      validate = false;
      setIsLoading(false);
    }
    if (!message) {
      setMessageError(true);
      setMessageHelperText("Please Enter Message");
      validate = false;
      setIsLoading(false);
    }
    if (validate) {
      let params = {
        name,
        email,
        mobileNumber,
        message,
        subject,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.addContactUsData,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          toast.success("Saved SuccessFully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false);
          setName("");
          setMobileNumber("");
          setEmail("");
          setMessage("");
          setSubject("");
        } else {
          alert(
            "Something went wrong while saving the Amenity Details. Please try again later!"
          );
        }
      } else {
        alert(
          "Something went wrong while saving the Amenity Details. Please try again later!!"
        );
      }
    }
  };
  return (
    <>
      <Helmet
        title="Get My Housing - Contact Us"
        description="Contact Get My Housing for inquiries on buying, selling, or renting properties. Our team is here to help you find your dream home."
        keywords="real estate, housing, contact, buy property, sell property, Get My Housing"
        canonicalUrl="https://www.getmyhousing.com/contact-us"
        ogTitle="Get My Housing - Contact Us"
        ogDescription="Contact Get My Housing for inquiries on buying, selling, or renting properties. Our team is here to help you find your dream home."
        twitterTitle="Get My Housing - Contact Us"
        twitterDescription="Contact Get My Housing for inquiries on buying, selling, or renting properties. Our team is here to help you find your dream home."
      />
      <Header />
      <Box
        sx={{
          p: { md: 5, xs: 2 },
          backgroundColor: "#f8f9fa",
        }}
      >
        <Box sx={{ px: { md: 20, xs: 5 }, py: 3, textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { md: "34px", xs: "28px" },
              fontWeight: 600,
              fontFamily: "Jost, sans-serif",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            sx={{
              color: "#95a5a6",
              fontFamily: "Jost, sans-serif",
              lineHeight: "1.5",
              fontSize: { xs: "12px", sm: "19px" },
              textAlign: "center",
              mt: 2,
            }}
          >
            Thank you for considering Get My Housing for your real estate needs.
            We are here to assist you with any inquiries or requests you may
            <Link to={"/agent-register"} style={{ textDecoration: "none" }}>
              {" "}
              Register Here
            </Link>
            . Please don't hesitate to get in touch with us.
          </Typography>
        </Box>
        <Paper sx={{ mt: 3, p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Grid container spacing={3}>
            <Grid item md={7} xs={12}>
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 500,
                  fontFamily: "Jost, sans-serif",
                  mb: 2,
                }}
              >
                Send us a Message
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-basic-1"
                    label="Name"
                    variant="outlined"
                    error={nameError}
                    helperText={nameHelperText}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameError(false);
                      setNameHelperText("");
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-basic-2"
                    label="Email address"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-basic-3"
                    label="Subject"
                    variant="outlined"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-basic-4"
                    label="Phone"
                    variant="outlined"
                    error={phoneError}
                    helperText={phoneHelperText}
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setPhoneError(false);
                      setPhoneHelperText("");
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="outlined-basic-5"
                    label="Message"
                    variant="outlined"
                    error={messageError}
                    helperText={messageHelperText}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setMessageError(false);
                      setMessageHelperText("");
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LoadingButton
                    size="large"
                    endIcon={<SendIcon />}
                    loading={isLoading}
                    loadingPosition="end"
                    disabled={!mobileNumber || !name}
                    variant="contained"
                    sx={{
                      backgroundColor: "#f44336", // Red color
                      color: "#FFF", // White text color
                      "&:hover": {
                        backgroundColor: "#d32f2f", // Darker red on hover
                      },
                      "&:disabled": {
                        backgroundColor: "#ef9a9a", // Light red for disabled state
                        color: "#616161", // Dark gray text color for disabled state
                      },
                    }}
                    onClick={saveContactUsData}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={5} xs={12}>
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 500,
                  fontFamily: "Jost, sans-serif",
                  mb: 2,
                }}
              >
                Contact Info
              </Typography>
              <Box sx={{ my: 1, py: 2 }}>
                {/* <Box
                  sx={{ display: "flex", alignItems: "center", mb: 2, ml: 4.5 }}
                >
                  <Typography sx={{ fontWeight: "900" }}>
                    M/s ValueAid Infrastructure Pvt. Ltd.
                  </Typography>
                </Box> */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOnIcon sx={{ color: "#2c3e50", mr: 1 }} />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "19px",
                        fontWeight: 400,
                        fontFamily: "Jost, sans-serif",
                      }}
                    >
                      Address
                    </Typography>
                    <Typography>
                      24, Vittal Mallya Rd, KG Halli, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocalPhoneIcon sx={{ color: "#2c3e50", mr: 1 }} />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "19px",
                        fontWeight: 400,
                        fontFamily: "Jost, sans-serif",
                      }}
                    >
                      Phone Number
                    </Typography>
                    <Typography>+91 {config.mobileNumber1}</Typography>
                    {/* <Typography>+91 96069 93551</Typography> */}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <EmailIcon sx={{ color: "#2c3e50", mr: 1 }} />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "19px",
                        fontWeight: 400,
                        fontFamily: "Jost, sans-serif",
                      }}
                    >
                      Email
                    </Typography>
                    <Typography>info@getmyhousing.com</Typography>
                  </Box>
                </Box>
                {/* <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    mb: 2,
                    ml: 4.5,
                    flexDirection: "column",
                  }}
                >
                  <Typography>CIN No : U70103KA2018PTC117403</Typography>
                  <Typography>GSTIN No : 29AAGCV6301A1ZN</Typography>
                </Box> */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.990530445781!2d77.5940238732096!3d12.972457314863263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17d11a15eac9%3A0xbdde7c5f777b01f3!2sGetMyHousing!5e0!3m2!1sen!2sin!4v1740111964867!5m2!1sen!2sin"
                width="100%"
                height="300"
                title="map"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Footer />
    </>
  );
}
