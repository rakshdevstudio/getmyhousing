import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Dialog,
  Typography,
  Grid,
  Box,
  styled,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
} from "@mui/material";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, getUser } from "../../global/redux/action";
import UserPackageVBTabs from "./UserPackageVBTabs";
import { Bounce, toast } from "react-toastify";
import "./package-card-style.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function PackageBuy() {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
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
  }, [
    dispatch,
    cookies,
    userData,
    isFetching,
    userError,
  ]);

  const [isPackageBuy, setIsPackageBuy] = useState(false);
  const [transactionId, setTransactionID] = useState("");
  const [transactionIdError, setTransactionIdError] = useState(false);
  const [transactionIdHelperText, setTransactionIdHelperText] = useState("");

  const handleChangePackageBuyModal = () => setIsPackageBuy(!isPackageBuy);

  const [isPackagesFetching, setIsPackagesFetching] = useState(true);

  const [packagesList, setPackagesList] = useState([]);
  const [pkgId, setpkgId] = useState("");

  useEffect(() => {
    const getPackages = async () => {
      let params = {
        status: "Active",
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getPackages,
          params,
          cookies
        );
        if (response) {
          setPackagesList(response.data.packages);
          setIsPackagesFetching(false);
        } else {
          toast.error("No Packages in the response!", {
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
        }
      } catch (error) {
        toast.error("An error occurred while fetching Packages!", {
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
      }
      setIsPackagesFetching(false);
    };

    getPackages();
  }, [cookies]);

  //Purchase Package API
  const purchaseUserPackage = async () => {
    let validate = true;
    if (!transactionId) {
      validate = false;
      setTransactionIdError(true);
      setTransactionIdHelperText("Please Enter Your Transaction ID");
    }
    if (validate) {
      let params = {
        userId: cookies[config.cookieName]?.loginUserId,
        packageId: pkgId,
        transactionId: transactionId,
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.addPackagePayment,
          params,
          cookies
        );
        if (response) {
          if (
            response.status === "200" ||
            response.data.responseMessage === "Successful"
          ) {
            toast.success("Submit Successful!", {
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
            handleChangePackageBuyModal();
          } else {
            alert(
              "Failed to proceed the payment,, Please try again after some times"
            );
          }
        } else {
          alert(
            "Failed to proceed the payment,, Please try again after some times"
          );
        }
      } catch (error) {
        toast.error("An error occurred while processing the payment!", {
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
      }
    }
  };

  return (
    <>
      <UserPackageVBTabs tabActive={1}>
        {!isPackagesFetching ? (
          <>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Buy New Package
            </Typography>
            <Grid container spacing={2}>
              {packagesList?.map((item, index) => (
                <Grid item md={4} key={index}>
                  <Box className="plan">
                    <Box className="inner">
                      <span className="pricing">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <CurrencyRupeeIcon fontSize="small" />
                          {new Intl.NumberFormat().format(
                            item.sellingPrice
                          )}{" "}
                          {/* <small>/ m</small> */}
                        </span>
                      </span>
                      <p className="title">{item.packageName}</p>
                      <p className="info">{item.description}</p>
                      <ul className="features">
                        <li>
                          <span className="icon">
                            <svg
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 0h24v24H0z" fill="none"></path>
                              <path
                                fill="currentColor"
                                d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                              ></path>
                            </svg>
                          </span>
                          <span>
                            <strong>Location</strong> - {item.district}
                          </span>
                        </li>
                        <li>
                          <span className="icon">
                            <svg
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 0h24v24H0z" fill="none"></path>
                              <path
                                fill="currentColor"
                                d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                              ></path>
                            </svg>
                          </span>
                          <span>
                            <strong>Duration - </strong> {item.durationInDays}/d
                          </span>
                        </li>
                        <li>
                          <span className="icon">
                            <svg
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 0h24v24H0z" fill="none"></path>
                              <path
                                fill="currentColor"
                                d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                              ></path>
                            </svg>
                          </span>
                          <strong>Max Post - </strong> {item.noOfListings}
                        </li>
                        <li>
                          <span className="icon">
                            <svg
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 0h24v24H0z" fill="none"></path>
                              <path
                                fill="currentColor"
                                d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                              ></path>
                            </svg>
                          </span>
                          <strong>Post Type - </strong> {item.listingType}
                        </li>
                      </ul>
                      <Box className="action">
                        <button
                          onClick={() => {
                            handleChangePackageBuyModal();
                            setpkgId(item.id);
                            // purchaseUserPackage(item.id, item.sellingPrice);
                          }}
                        >
                          Buy Plan
                        </button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box
            sx={{
              height: "100svh",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </UserPackageVBTabs>

      {/* payment modal */}
      <BootstrapDialog
        open={isPackageBuy}
        onClose={handleChangePackageBuyModal}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>Payment</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleChangePackageBuyModal}
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
          <img
            src="/media/images/QR.jpg"
            width="100%"
            height="300px"
            style={{ objectFit: "contain" }}
          />
          <TextField
            label="Enter Your Transaction ID"
            fullWidth
            margin="normal"
            value={transactionId}
            error={transactionIdError}
            helperText={transactionIdHelperText}
            onChange={(e) => setTransactionID(e.target.value)}
          />
          <Box sx={{ width: "100%" }}>
            <button
              className="login-button"
              type="submit"
              onClick={purchaseUserPackage}
            >
              Submit
            </button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

export default PackageBuy;
