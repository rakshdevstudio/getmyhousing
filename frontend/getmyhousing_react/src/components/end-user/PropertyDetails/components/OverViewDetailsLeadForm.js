import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { LoadingButton } from "@mui/lab";
import { useCookies } from "react-cookie";
import mobileNoValidation, {
  countryCodeList,
  displayMobileNumber,
} from "../../../../common/common";
import { Bounce, toast } from "react-toastify";
import { apiList, invokeApi } from "../../../../apis/apiServices";
import { config } from "../../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../global/redux/action";

const OverViewDetailsLeadForm = ({
  propertyData,
  postDetails,
  leadProvided,
}) => {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const { userData, userError, isFetching } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (userError) {
      alert(
        "Something went wrong while fetching user details. Please try again later!"
      );
    }
  }, [userError]);

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
  }, [cookies, userData, isFetching, userError]);

  const [countryCode, setCountryCode] = useState(
    userData?.user?.countryCode || "91"
  );
  const [mobileNumber, setMobileNumber] = useState(
    userData?.user?.mobileNumber || ""
  );
  const [mobileError, setMobileError] = useState(false);
  const [mobileHelperText, setMobileHelperText] = useState("");
  let mobileValidate = mobileNoValidation(mobileNumber);
  const [customerName, setcustomerName] = useState(
    userData?.user?.fullName || ""
  );
  const [email, setEmail] = useState(userData?.user?.email || "");
  const [scheduleDateTime, setScheduleDateTime] = useState(null);
  const [leadLoading, setleadLoading] = useState(false);

  const checkLeadProvided = localStorage
    .getItem(config.leadProvided)
    ?.includes(propertyData?.id);

  const addLead = async () => {
    setleadLoading(true);
    let validate = true;
    if (!mobileValidate) {
      setMobileError(true);
      setMobileHelperText("Please Enter Valid Mobile Number");
      setleadLoading(false);
      validate = false;
    }
    if (validate) {
      let params = {
        email,
        customerName,
        mobileNumber,
        propertyId: propertyData?.id || null,
        leadSource: propertyData?.propertyType || null,
        leadType: "Own",
        scheduleDateTime,
        countryCode: countryCode,
      };
      const response = await invokeApi(
        config.apiDomains + apiList.addLead,
        params,
        cookies
      );

      if (response.status >= 200 && response.status < 300) {
        if (
          response.data.responseCode === "200" &&
          response.data.responseMessage === "Successful"
        ) {
          toast.success(
            "Thank you for showing interest we will contact you soon",
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
          setleadLoading(false);
          // handleModal();
          setcustomerName("");
          setMobileNumber("");
          setEmail("");
          leadProvided(propertyData.id);
        } else if (response.data.responseCode === "400") {
          toast.info(response.data.responseMessage, {
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
          setleadLoading(false);
          setcustomerName("");
          setMobileNumber("");
          setEmail("");
        } else {
          toast.error("Sorry Something went wrong", {
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
          setleadLoading(false);
          setcustomerName("");
          setMobileNumber("");
          setEmail("");
        }
      } else {
        toast.error("Sorry Something went wrong Please Try Again Later", {
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
        setleadLoading(false);
      }
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ py: 1, px: 4, borderRadius: "10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
              Enquiry Now
            </Typography>
          </Grid>
          {postDetails &&
            propertyData.username &&
            propertyData.userRole &&
            propertyData.userWhatsappNumber ? (
            <Grid
              item
              xs={12}
              sx={{
                border: "1px solid #000",
                fontSize: "13px",
                display: "flex",
                justifyContent: "space-around",
                p: 1,
                borderRadius: "20px",
              }}
            >
              <span>
                name:
                <br /> {propertyData?.username}
              </span>
              <span>
                Role:
                <br /> {propertyData?.userRole}
              </span>
              <span>
                Number:
                <br />{" "}
                {checkLeadProvided
                  ? propertyData?.userWhatsappNumber
                  : displayMobileNumber(propertyData?.userWhatsappNumber)}
              </span>
            </Grid>
          ) : null}

          <Grid item xs={12} sx={{ mb: 1 }}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Enter Your Name"
              margin="dense"
              type="text"
              size="small"
              value={customerName || ""}
              onChange={(event) => setcustomerName(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container alignItems="center" sx={{ pl: 2 }}>
            <Grid item xs={3} sx={{ pr: 2 }}>
              <FormControl fullWidth variant="outlined">
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  size="small"
                  autoWidth
                  value={countryCode || ""}
                  onChange={(event) => setCountryCode(event.target.value)}
                >
                  {countryCodeList?.map((item, index) => (
                    <MenuItem key={index} value={item.code}>
                      {"+ " + item.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                margin="dense"
                placeholder="Enter your mobile number"
                inputProps={{ maxLength: 10 }}
                error={mobileError}
                helperText={mobileHelperText}
                value={mobileNumber || ""}
                onChange={(event) => setMobileNumber(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {"+" + countryCode}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              type="email"
              margin="dense"
              size="small"
              placeholder="Enter Your Email"
              value={email || ""}
              onChange={(event) => setEmail(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="scheduleDateTime"
              type="datetime-local"
              placeholder="Schedule Date & Time"
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={scheduleDateTime || ""}
              onChange={(e) => setScheduleDateTime(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ScheduleIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid xs={12} item sx={{ textAlign: "center" }}>
            <LoadingButton
              size="large"
              onClick={addLead}
              loading={leadLoading}
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
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default OverViewDetailsLeadForm;
