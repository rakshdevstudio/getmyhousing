import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Button,
  Box,
  MenuItem,
  Skeleton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Menu,
  ListItemIcon,
  Chip,
  Modal,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Radio,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../../apis/apiServices";
import { config } from "../../../../config/config";
import { Facebook, LinkedIn, Twitter, WhatsApp } from "@mui/icons-material";
import ExclusiveButton from "./ExclusiveButton";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import PropertyManagerTabs from "../../post-properties/PropertyManagerTabs";
import { formatSegment } from "../../../../common/common";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch, useSelector } from "react-redux";
import ListIcon from "@mui/icons-material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { Bounce, toast } from "react-toastify";
import TelegramIcon from "@mui/icons-material/Telegram";
const PropertyEmptyImage = "/media/images/empty-property-image.jpg";

function normalizeImageUrl(imagePath) {
  if (!imagePath || typeof imagePath !== "string") {
    return PropertyEmptyImage;
  }

  const s3Prefix = "https://propertybroker.s3.ap-south-1.amazonaws.com/";
  if (imagePath.startsWith(s3Prefix)) {
    return imagePath.replace(
      s3Prefix,
      "https://s3.ap-south-1.amazonaws.com/propertybroker/"
    );
  }

  return imagePath;
}

const StatusList = ["Active", "Pending", "Rejected", "Completed"];

function MyPropertyLists() {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [propertyId, setPropertyId] = useState(null);
  const [anchorOptions, setAnchorOptions] = useState(null);
  const { userData, userError } = useSelector(
    (state) => state.user
  );
  const [myListingDatas, setmyListingDatas] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [owners, setOwners] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedOwnerId, setSelectedOwnerId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("Active");

  const [mobileNumberInput, setMobileNumberInput] = useState("");
  const [matchedOwner, setMatchedOwner] = useState(null);

  const handleMobileNumberChange = (event) => {
    const inputValue = event.target.value;
    setMobileNumberInput(inputValue);

    // Check if the input is exactly 10 digits
    if (/^\d{10}$/.test(inputValue)) {
      const matched = owners.find((owner) => owner.mobileNumber === inputValue);
      setMatchedOwner(matched || null); // Set matched owner or null if no match
    } else {
      setMatchedOwner(null); // Clear matched owner if input is invalid
    }
  };

  function handleChangeStatus(e) {
    let valueSelected = e.target.value;
    setStatus(valueSelected);
    setFetching(true);
  }

  const handleOptions = (event, propertyId) => {
    setAnchorOptions(event.currentTarget);
    setPropertyId(propertyId);
  };

  // Handle chip click
  const handleChipClick = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setIsModalOpen(true);
  };

  // Handle navigation to "Add Owner" page
  const handleAddOwner = () => {
    setIsModalOpen(false);
    navigate("/property-owner"); // Navigate to the "Add Owner" page
  };


  //My Listings
  useEffect(() => {
    const myListings = async () => {
      let params = {
        status,
        createdBy: cookies[config.cookieName]?.loginUserId,
      };
      const response = await invokeApi(
        config.apiDomains + apiList.allPropertyByStatusAndUserInDashboard,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          setmyListingDatas(response.data.dashboardProperties);
          setFetching(false);
        } else {
          alert("An error occurred while fetching data!");
        }
      } else {
        alert("An error occurred while fetching data!!");
      }
    };
    if (fetching) {
      myListings();
    }
  }, [cookies, fetching]);

  useEffect(() => {
    const getOwners = async () => {
      let params = {};
      let response = await invokeApi(
        config.apiDomains + apiList.getOwners,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setOwners(response.data.owners);
        } else {
          alert(
            "Something went wrong while getting the owner Details. Please try again later!"
          );
        }
      } else if (response.status === 401) {
        navigate("/logout");
      } else {
        alert(
          "Something went wrong while getting the owner Details. Please try again later!!"
        );
      }
    };
    getOwners();
  }, []);

  async function handleChangePropertyStatus(id, status) {
    // Define the parameters for the API call
    let params = {
      id: id,
      approvalStatus: status,
    };

    // Make the API call using invokeApi function, passing the necessary parameters and cookies
    const response = await invokeApi(
      config.apiDomains + apiList.changePropertyStatus,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success(`${status} Successfully`, {
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
        setFetching(true);
      } else {
        alert("An error occurred while fetching data!");
      }
    } else {
      alert("An error occurred while fetching data!!");
    }
  }

  async function assignOwnerToProperty() {
    let params = {
      id: selectedPropertyId,
      ownerId: selectedOwnerId,
    };
    console.log(params)
    const response = await invokeApi(
      config.apiDomains + apiList.assignOwner,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success(`Updated Successfully`, {
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
        setIsModalOpen(false);
        setSelectedOwnerId(null);
        setSelectedPropertyId(null);
        setFetching(true);
      } else {
        alert("An error occurred while updating data!");
      }
    } else {
      alert("An error occurred while updating data!");
    }
  }

  useEffect(() => {
    if (userError) {
      alert(
        "Something went wrong while fetching user details. Please try again later!"
      );
    }
  }, [userError]);

  const getListingImage = (listing) => {
    const featuredImage = listing?.imageData?.find(
      (item) => item.imageType === "featured"
    );

    return normalizeImageUrl(featuredImage?.imagePath);
  };


  return (
    <PropertyManagerTabs tabActive={1}>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          width: "100%",
          overflowX: "auto",
          alignItems: "center",
          whiteSpace: "nowrap",
          "&::-webkit-scrollbar": {
            height: "5px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#1976d2",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#0d47a1",
          },
          scrollbarColor: "#1976d2 #f1f1f1",
        }}
      >
        {StatusList?.map((item, index) => (
          <label
            htmlFor={`status-by-property-${index}`} // Ensure unique ids for each radio button
            key={index}
            style={{
              display: "inline-block",
              padding: "10px 20px",
              borderRadius: "4px",
              background: status === item ? "#1976d2" : "#e0e0e0",
              color: status === item ? "#fff" : "#000",
              cursor: "pointer",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            {item}
            <input
              type="radio"
              id={`status-by-property-${index}`}
              name="radio7"
              value={item}
              onChange={handleChangeStatus}
              checked={status === item}
              style={{ display: "none" }} // Hide the default radio button
            />
          </label>
        ))}
      </Box>
      <Grid container spacing={2}>
        {!fetching ? (
          <>
            {myListingDatas.map((listings, index) => (
              <Grid
                item
                lg={4}
                sm={6}
                xs={12}
                key={listings.propertyId || listings.id || index}
              >
                <Box sx={{ position: "relative" }}>
                  <Card>
                    {/* Chip to indicate no owner */}
                    {!listings.owner && (
                      <Box sx={{ position: "absolute", top: 8, left: 8, cursor: "pointer" }}>
                        <Chip
                          label="No Owner"
                          color="error"
                          onClick={() => handleChipClick(listings.propertyId)}
                        />
                      </Box>
                    )}
                    <CardMedia
                      component="img"
                      style={{
                        maxHeight: "220px",
                        objectFit: "contain",
                        minHeight: "220px",
                      }}
                      image={getListingImage(listings)}
                      alt={listings.propertyName}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = PropertyEmptyImage;
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {listings.propertyName}
                      </Typography>
                      <Typography variant="body1">
                        {listings.listingType} {" / "} {listings.buildingType}{" "}
                        {" / "}
                        {listings.propertyType}
                      </Typography>
                      <Typography variant="caption">
                        {listings.locality + ", "}
                        {listings.city + " - "}
                        {listings.pinCode}
                      </Typography>
                      <Typography>
                        <b style={{ color: "#5f449b", fontSize: 20 }}>
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumSignificantDigits: 3,
                          }).format(listings.rent)}
                        </b>
                      </Typography>
                      <Typography variant="body1">
                        Posted By :- {listings?.userRoles[0]}
                      </Typography>
                    </CardContent>
                    <CardActions
                      disableSpacing
                      sx={{ flexDirection: "column" }}
                    >
                      {status === "Active" && (
                        <ExclusiveButton
                          value={listings.isExclusiveProperty}
                          propertyId={listings.propertyId}
                        />
                      )}
                      <Divider />
                      {status !== "Pending" && status !== "Rejected" && (
                        <>
                          <Typography
                            sx={{ textAlign: "center", width: "100%" }}
                            variant="subtitle2"
                          >
                            Share On
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "10px",
                              py: 2,
                            }}
                          >
                            <Link
                              to={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin +
                                "/property/" +
                                formatSegment(listings.listingType) +
                                "/" +
                                formatSegment(listings.propertyName) +
                                "/" +
                                formatSegment(
                                  listings.buildingType +
                                  "-" +
                                  listings.propertyType +
                                  "-in-" +
                                  listings.locality +
                                  "-" +
                                  listings.city
                                ) +
                                "/" +
                                listings.propertyId
                                }`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#365899" }}
                            >
                              <Facebook
                                sx={{ mb: -0.8, ml: { md: 1.5, xs: 1 } }}
                              />
                            </Link>
                            <Link
                              to={`tg://msg_url?url=${window.location.origin +
                                "/property/" +
                                formatSegment(listings.listingType) +
                                "/" +
                                formatSegment(listings.propertyName) +
                                "/" +
                                formatSegment(
                                  listings.buildingType +
                                  "-" +
                                  listings.propertyType +
                                  "-in-" +
                                  listings.locality +
                                  "-" +
                                  listings.city
                                ) +
                                "/" +
                                listings.propertyId
                                }&text=Check%20out%20this%20property`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#0088cc" }}
                            >
                              <TelegramIcon
                                sx={{ mb: -0.8, ml: { md: 1.5, xs: 1 } }}
                              />
                            </Link>
                            <Link
                              to={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin +
                                "/property/" +
                                formatSegment(listings.listingType) +
                                "/" +
                                formatSegment(listings.propertyName) +
                                "/" +
                                formatSegment(
                                  listings.buildingType +
                                  "-" +
                                  listings.propertyType +
                                  "-in-" +
                                  listings.locality +
                                  "-" +
                                  listings.city
                                ) +
                                "/" +
                                listings.propertyId
                                }`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#0a66c2" }}
                            >
                              <LinkedIn
                                sx={{ mb: -0.8, ml: { md: 1.5, xs: 1 } }}
                              />
                            </Link>
                            <Link
                              to={`https://twitter.com/intent/tweet?url=${window.location.origin +
                                "/property/" +
                                formatSegment(listings.listingType) +
                                "/" +
                                formatSegment(listings.propertyName) +
                                "/" +
                                formatSegment(
                                  listings.buildingType +
                                  "-" +
                                  listings.propertyType +
                                  "-in-" +
                                  listings.locality +
                                  "-" +
                                  listings.city
                                ) +
                                "/" +
                                listings.propertyId
                                }`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "rgb(29, 155, 240)" }}
                            >
                              <Twitter
                                sx={{ mb: -0.8, ml: { md: 1.5, xs: 1 } }}
                              />
                            </Link>
                            <Link
                              to={`whatsapp://send?text=Check out this property: ${window.location.origin +
                                "/property/" +
                                formatSegment(listings.listingType) +
                                "/" +
                                formatSegment(listings.propertyName) +
                                "/" +
                                formatSegment(
                                  listings.buildingType +
                                  "-" +
                                  listings.propertyType +
                                  "-in-" +
                                  listings.locality +
                                  "-" +
                                  listings.city
                                ) +
                                "/" +
                                listings.propertyId
                                }`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#25d366" }}
                            >
                              <WhatsApp
                                sx={{ mb: -0.8, ml: { md: 1.5, xs: 1 } }}
                              />
                            </Link>
                          </Box>
                        </>
                      )}
                      {status === "Pending" &&
                        userData?.user?.roles.includes("Admin") && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              py: 2,
                            }}
                          >
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() =>
                                handleChangePropertyStatus(
                                  listings?.propertyId,
                                  "Active"
                                )
                              }
                            >
                              Approved
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleChangePropertyStatus(
                                  listings?.propertyId,
                                  "Rejected"
                                )
                              }
                              sx={{ m: 1 }}
                            >
                              Rejected
                            </Button>
                          </Box>
                        )}
                      {status === "Rejected" &&
                        userData?.user?.roles.includes("Admin") && (
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() =>
                                handleChangePropertyStatus(
                                  listings?.propertyId,
                                  "Active"
                                )
                              }
                              sx={{ m: 1 }}
                            >
                              Approved
                            </Button>
                          </Box>
                        )}
                      {status === "Completed" &&
                        userData?.user?.roles.includes("Admin") && (
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() =>
                                handleChangePropertyStatus(
                                  listings?.propertyId,
                                  "Active"
                                )
                              }
                              sx={{ m: 1 }}
                            >
                              Re-launch
                            </Button>
                          </Box>
                        )}
                    </CardActions>
                  </Card>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "red",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    {listings.propertyId}
                  </Box>
                  <IconButton
                    onClick={(e) => handleOptions(e, listings.propertyId)}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 42,
                      right: 8,
                      backgroundColor: "white",
                      border: "1px solid #000",
                      color: "black",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      ml: 2,
                    }}
                    aria-controls={
                      Boolean(anchorOptions) ? "account-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorOptions) ? "true" : undefined}
                  >
                    <ListIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorOptions}
                    id="account-menu"
                    open={Boolean(anchorOptions)}
                    onClose={() => setAnchorOptions(null)}
                    onClick={() => setAnchorOptions(null)}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    {(status === "Active" ||
                      status === "pending" ||
                      status === "Rejected") && (
                        <MenuItem
                          onClick={() => {
                            navigate(`/property-edit/${propertyId}`);
                            setAnchorOptions(null);
                          }}
                        >
                          <ListItemIcon>
                            <EditIcon fontSize="small" />
                          </ListItemIcon>
                          Edit
                        </MenuItem>
                      )}
                    {(status === "Active" || status === "pending") && (
                      <MenuItem
                        onClick={() => {
                          setAnchorOptions(null);
                          navigate(`/view-property/${propertyId}`);
                        }}
                      >
                        <ListItemIcon>
                          <RemoveRedEyeIcon fontSize="small" />
                        </ListItemIcon>
                        More Details
                      </MenuItem>
                    )}
                    {userData?.user.roles.includes("Admin") &&
                      status === "Active" && [
                        <MenuItem
                          key="delete"
                          onClick={() =>
                            handleChangePropertyStatus(propertyId, "Deleted")
                          }
                        >
                          <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                          </ListItemIcon>
                          Delete
                        </MenuItem>,
                        <MenuItem
                          key="complete"
                          onClick={() =>
                            handleChangePropertyStatus(
                              propertyId,
                              "Completed"
                            )
                          }
                        >
                          <ListItemIcon>
                            <CheckIcon fontSize="small" />
                          </ListItemIcon>
                          Complete
                        </MenuItem>,
                      ]}
                  </Menu>
                </Box>
              </Grid>
            ))}
          </>
        ) : (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Grid item lg={4} md={6} xs={12} key={item}>
                <Skeleton variant="rectangular" width={"100%"} height={200} />
                <Skeleton width="100%" />
                <Skeleton width="80%" />
                <Skeleton width="50%" />
              </Grid>
            ))}
          </>
        )}
      </Grid>

      {/* Modal to update owner */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Assign Owner
          </Typography>

          {/* Mobile Number Input Field */}
          <TextField
            label="Enter Mobile Number"
            value={mobileNumberInput}
            onChange={handleMobileNumberChange}
            inputProps={{ maxLength: 10 }} // Restrict input to 10 digits
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="off"
          />

          {/* Display Matched Owner with Radio Button */}
          {matchedOwner && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: 1,
                p: 2,
                mb: 2,
              }}
            >
              <Radio
                checked={selectedOwnerId === matchedOwner.id}
                onChange={() => setSelectedOwnerId(matchedOwner.id)}
                value={matchedOwner.id}
                name="owner-radio"
              />
              <Typography>
                {matchedOwner.fullName} - {matchedOwner.mobileNumber}
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              onClick={assignOwnerToProperty}
              sx={{ mr: 2 }}
              disabled={!selectedOwnerId} // Disable if no owner is selected
            >
              Assign Owner
            </Button>
            <Button variant="outlined" onClick={handleAddOwner}>
              Add New Owner
            </Button>
          </Box>
        </Box>
      </Modal>
    </PropertyManagerTabs>
  );
}

export default MyPropertyLists;
