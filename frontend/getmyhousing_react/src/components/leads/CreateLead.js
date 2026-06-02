import React, { useEffect, useState } from "react";
import DashBoardNavbar from "../generic/dashboard/DashBoardNavbar";
import DashBoardHeader from "../generic/dashboard/DashBoardHeader";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import { apiList, invokeApi, invokeFormDataApi } from "../../apis/apiServices";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import mobileNoValidation, { dateFormate, services } from "../../common/common";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../global/redux/action";

const defaultLeadImage = "/media/images/default-image.jpg";

function normalizeLeadImageUrl(imagePath) {
  if (!imagePath || typeof imagePath !== "string") {
    return defaultLeadImage;
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

const CreateLead = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
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

  const [associateLeadId, setAssociateLeadId] = useState(null);

  useEffect(() => {
    if (associateLeadId !== null) {
      getAssocicateLead();
      getAssocicateLeadHistory();
    }
  }, [associateLeadId]);

  const [isLeadStatusModal, setIsLeadStatusModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [followupDate, setFollowupDate] = useState("");

  const [isLeadDrawer, setIsLeadDrawer] = useState(false);
  const [leadData, setLeadData] = useState(null);

  const [isLeadAssignModal, setIsLeadAssignModal] = useState(false);
  const [userList, setUserList] = useState([]);

  const [checkedIds, setCheckedIds] = useState([]);
  const [assignUserId, setAssignUserId] = useState(null);

  const [associateLeadsList, setAssociateLeadsList] = useState([]);
  const [associateLeadHistories, setAssociateLeadHistories] = useState([]);

  const [isCreateLeadModal, setIsCreateLeadModal] = useState(false);
  const [isFetching1, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [previewFile, setPreviewFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const [customerName, setCustomerName] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const mobileValidation = mobileNoValidation(mobileNumber);
  const [mobileError, setMobileError] = useState(false);
  const [mobileHelperText, setMobileHelperText] = useState("");

  const [email, setEmail] = useState("");

  const [location, setLocation] = useState("");
  const [locationError1, setLocationError] = useState(false);
  const [locationHelperText, setLocationHelperText] = useState("");

  const [pincode, setPincode] = useState('');
  const [pincodeError, setPincodeError] = useState(false);
  const [pincodeHelperText, setPincodeHelperText] = useState("");

  const [landmark, setLandmark] = useState("");
  const [landMarkError, setLandMarkError] = useState(false);
  const [landMarkHelperText, setLandMarkHelperText] = useState("");

  const [bestTimeToCall, setBestTimeToCall] = useState("");

  const [typeOfLead, setTypeOfLead] = useState("");
  const [typOfLeadError, setTypeOfLeadError] = useState(false);
  const [typeOfLeadHelperText, setTypeOfLeadHelperText] = useState("");

  const getUserOptionLabel = (option) => {
    if (!option || Array.isArray(option)) {
      return "";
    }
    if (typeof option === "string") {
      return option;
    }
    return [option.fullName, option.mobileNumber, option.district]
      .filter(Boolean)
      .join(" ");
  };

  const createLeadHandler = () => {
    setIsCreateLeadModal(!isCreateLeadModal);
    setTypeOfLead("");
    setTypeOfLeadError(false);
    setTypeOfLeadHelperText("");
    setBestTimeToCall("");
    setLandMarkHelperText("");
    setLandMarkError(false);
    setLandmark("");
    setLocationHelperText("");
    setLocationError(false);
    setLocation("");
    setMobileHelperText("");
    setMobileError(false);
    setMobileNumber("");
    setCustomerName("");
    setEmail("");
    setUploadedFile(null);
    setPreviewFile("");
  };

  // selecting id's for assign lead
  const handleCheckboxChange = (id) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds?.filter((checkedId) => checkedId !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const handleFileUploadValidate = (ev) => {
    ev.preventDefault();
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(
      /^image\/(jpe?g|png|gif)/
    );

    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 1024 * 1024 * 5) {
        setUploadedFile(fileUploaded);
        setPreviewFile(URL.createObjectURL(fileUploaded));
        // setMaxFileSizeErr("");
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const image = new Image();
          image.src = event.target.result;

          image.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_SIZE = 1024 * 1024 * 5;
            let width = image.width;
            let height = image.height;

            while (width * height > MAX_SIZE) {
              width *= 0.9;
              height *= 0.9;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                const compressedFile = new File([blob], fileUploaded.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                setUploadedFile(compressedFile);
                setPreviewFile(URL.createObjectURL(compressedFile));
                // setMaxFileSizeErr("");
              },
              "image/jpeg",
              0.8
            );
          };
        };
        reader.readAsDataURL(fileUploaded);
      }
    } else {
      alert("Please upload a valid image in jpeg/jpg/png/gif format");
    }
  };

  const handleUploadFile = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    let validate = true;
    if (!mobileValidation) {
      setMobileError(true);
      setMobileHelperText("Please Enter Valid Mobile Number");
      validate = false;
      setIsLoading(false);
    }
    if (!typeOfLead) {
      setTypeOfLeadError(true);
      setTypeOfLeadHelperText("Please Select the Lead Type");
      validate = false;
      setIsLoading(false);
    }
    if (!location) {
      setLocationError(true);
      setLocationHelperText("Please Enter The Location of Property");
      validate = false;
      setIsLoading(false);
    }
    if (!pincode) {
      setPincodeError(true);
      setPincodeHelperText("Please Enter The Pincode of Property");
      validate = false;
      setIsLoading(false);
    }
    if (!landmark) {
      setLandMarkError(true);
      setLandMarkHelperText("Please Enter The LandMark of Property");
      validate = false;
      setIsLoading(false);
    }

    if (uploadedFile && validate) {
      let formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("path", "associate_lead");

      let response = await invokeFormDataApi(
        config.apiDomains + apiList.uploadFile,
        formData,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          saveAssociateLead(response.data.url);
          setIsLoading(false);
        } else {
          alert(
            "Something went wrong while uploading associate picture. Please try again later!"
          );
        }
      } else if (response?.status === 401) {
        navigate("/logout");
      } else {
        alert(
          "Something went wrong while uploading associate picture. Please try again later!!"
        );
      }
    } else if (!uploadedFile && validate) {
      saveAssociateLead(null);
      setIsLoading(false);
    }
  };

  const saveAssociateLead = async (url) => {
    let params = {
      imagePath: url,
      customerName: customerName,
      mobileNumber: mobileNumber,
      email: email,
      location: location,
      pincode: pincode,
      landmark: landmark,
      typeOfLead: typeOfLead,
      bestTimeToCall: bestTimeToCall,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.addAssociateLead,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success("Associate Lead Saved SuccessFully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsFetching(true);
        setIsLoading(false);
        createLeadHandler();
      } else {
        alert(
          "Something went wrong while saving the Amenity Details. Please try again later!"
        );
      }
    } else if (response.status === 401) {
      navigate("/logout");
    } else {
      alert(response.data.responseMessage);
    }
  };
  // below the useEffect getting all associate leads
  useEffect(() => {
    const getAssocicateLeads = async () => {
      let params = {};
      let response = await invokeApi(
        config.apiDomains + apiList.getAssociateLeads,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setAssociateLeadsList(response.data.associatedLeads);
        } else {
          alert(
            "Something went wrong while saving the associate Leads Details. Please try again later!"
          );
        }
      } else if (response.status === 401) {
        navigate("/logout");
      } else {
        alert(
          "Something went wrong while saving the associate Leads Details. Please try again later!!"
        );
      }
    };
    if (isFetching1) {
      setIsFetching(false);
      getAssocicateLeads();
    }
  }, [cookies, isFetching1]);

  const getAssocicateLeadHistory = async () => {
    let params = { associateLeadId };
    let response = await invokeApi(
      config.apiDomains + apiList.associateLeadHistory,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        setAssociateLeadHistories(response.data.associateLeadHistories);
      } else {
        alert(
          "Something went wrong while saving the associate Leads history Details. Please try again later!"
        );
      }
    } else if (response.status === 401) {
      navigate("/logout");
    } else {
      alert(
        "Something went wrong while saving the associate Leads history Details. Please try again later!!"
      );
    }
  };

  //fetching user details
  const getUsers = async () => {
    let params = {}; // Initialize params object
    const loggedInUserRole = userData?.user?.roles || []; // Get the logged-in user's roles

    if (loggedInUserRole.includes("Admin")) {
      // Admin can assign both "Telecaller" and "Team Leader"
      params.roles = ["Telecaller", "Team Leader"];
    } else if (loggedInUserRole.includes("Team Leader")) {
      // Team Leader can only assign "Telecaller"
      params.roles = ["Telecaller"];
    }
    try {
      const response = await invokeApi(
        // config.apiDomains + apiList.getUsers,
        config.apiDomains + apiList.getUsersForAssign,
        params,
        cookies
      );
      if (
        response.status === 200 &&
        response.data.responseMessage === "Successful"
      ) {
        setUserList(response.data.users);
      } else if (response.status === 401) {
        navigate("/logout");
      } else {
        toast.error("No data in the response!", {
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
      toast.error("An error occurred while fetching users data!", {
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
  };

  // assign leads API
  const assignLead = async () => {
    let params = {
      assignedTo: assignUserId,
      associateLeads: checkedIds,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.assignAssociateLead,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success("Lead Assigned SuccessFully", {
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
        setCheckedIds([]);

        setIsFetching(true);
        setIsLeadAssignModal(false);
      } else {
        toast.error("Something Went Wrong Please Try Again!", {
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
        setIsLeadAssignModal(false);
      }
    } else if (response.data.responseCode === "401") {
      navigate("/logout");
    } else {
      toast.error("Failed to Assign Lead!", {
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
      setIsLeadAssignModal(false);
    }
  };

  // assign leads API
  const getAssocicateLead = async () => {
    let params = { associateLeadId: associateLeadId };
    let response = await invokeApi(
      config.apiDomains + apiList.getAssociateLead,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        setLeadData(response.data.associatedLead);
        setIsLeadDrawer(true);
      } else {
        toast.error("Something Went Wrong Please Try Again!", {
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
    } else if (response.data.responseCode === "401") {
      navigate("/logout");
    } else {
      toast.error("Failed to Assign Lead!", {
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

  async function updateAssociateLead() {
    let params = {
      associateLeadId: associateLeadId,
      status: actionType,
      remarks: remarks,
      followupDate: followupDate,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.editAssociateLead,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success("Updated!", {
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
        setIsLeadDrawer(true);
        setFollowupDate(null);
        setRemarks(null);
        getAssocicateLead();
        getAssocicateLeadHistory();
        setIsLeadStatusModal(false);
        setIsFetching(true);
        setAssociateLeadId(null);
      } else {
        toast.error("Something Went Wrong Please Try Again!", {
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
    } else if (response.data.responseCode === "401") {
      navigate("/logout");
    } else {
      toast.error("Failed to Assign Lead!", {
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
  }

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
        <DashBoardNavbar />
        <Box
          component="header"
          sx={{
            flexGrow: 1,
            p: 2,
            backgroundColor: "#F6F8FB",
            overflowX: "auto", // Add horizontal scrolling for small screens
          }}
        >
          <DashBoardHeader />
          <Paper elevation={3}>
            {!userData?.user?.roles.includes('Team Leader') && !userData?.user?.roles.includes('Telecaller') && (
              <Box sx={{ p: 2, width: "100%" }}>
                <Button variant="contained" onClick={createLeadHandler}>
                  Add
                </Button>
              </Box>
            )}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow
                    style={{ backgroundColor: "#e7e7e7", color: "#fff" }}
                  >
                    {!userData?.user?.roles.includes("Associate") &&
                      !userData?.user?.roles.includes("Telecaller") && (
                        <TableCell
                          style={{
                            borderBottom: "3px solid #454545",
                            borderRight: "1px solid #ddd",
                            fontSize: "16px",
                          }}
                        ></TableCell>
                      )}
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Image
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Phone Number
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Location
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Landmark
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Type of lead
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Best time to call
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Assigned To
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Status
                    </TableCell>
                    {userData?.user?.roles.includes("Admin") && (
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Lead Provided By
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {associateLeadsList?.map((item, index) => (
                    <TableRow key={index}>
                      {!(userData?.user?.roles.includes("Associate") || userData?.user?.roles.includes("Telecaller")) && (
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          <Checkbox
                            onChange={() => handleCheckboxChange(item.id)}
                            checked={checkedIds.includes(item.id)}
                          />
                        </TableCell>
                      )}

                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setAssociateLeadId(item.id);
                        }}
                      >
                        <img
                          src={normalizeLeadImageUrl(item?.imagePath)}
                          height="50px"
                          alt={item.customerName}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = defaultLeadImage;
                          }}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setAssociateLeadId(item.id);
                        }}
                      >
                        {item.customerName}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #dddd",
                        }}
                      >
                        {item.email}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.mobileNumber}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.location}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.landmark}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.typeOfLead}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {dateFormate(item.bestTimeToCall)}
                      </TableCell>
                      {/* {userData?.user?.roles.includes("Admin") && ( */}
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.assignedToName !== null &&
                          item.assignedToName !== "" && (
                            <span>
                              {item.assignedToName}
                              <br /> ({dateFormate(item.assignedDate)})
                            </span>
                          )}
                      </TableCell>
                      {/* )} */}
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.status}
                      </TableCell>
                      {userData?.user?.roles.includes("Admin") && (
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {item.associateLeadProviderId !== null
                            ? item.associateLeadProviderId
                            : "Non Reg"}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {(userData?.user?.roles.includes("Admin") ||
              userData?.user?.roles.includes("Team Leader")) && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsLeadAssignModal(true);
                    if (userList.length === 0) {
                      getUsers();
                    }
                  }}
                  size="large"
                  sx={{
                    position: "absolute",
                    right: 3,
                    bottom: 3,
                  }}
                >
                  Assign
                </Button>
              )}

          </Paper>
        </Box>
      </Box>

      {/* Below the Add Associate Lead Drawer */}
      <Drawer
        anchor="right"
        open={isCreateLeadModal}
        onClose={createLeadHandler}
        elevation={3}
      >
        <Box
          component="form"
          onSubmit={handleUploadFile}
          sx={{
            width: 500,
            "@media (max-width: 768px)": {
              // Adjust width for tablet and mobile
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              py: 1,
            }}
          >
            <Typography variant="h6">Create Lead</Typography>
            <IconButton onClick={createLeadHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                id="to-let-board-photo"
                type="file"
                accept="image/*"
                onChange={handleFileUploadValidate}
                style={{ display: "none" }}
              />
              {!uploadedFile ? (
                <Box
                  component="label"
                  htmlFor="to-let-board-photo"
                  sx={{
                    cursor: "pointer",
                    border: "2px dotted #000",
                    width: "100%",
                    minHeight: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.5s",
                    "&:hover": {
                      border: "2px dotted #3498db",
                      color: "#3498db",
                    },
                  }}
                >
                  Click Here To Upload To-Let Board
                </Box>
              ) : (
                <label
                  htmlFor="to-let-board-photo"
                  style={{ cursor: "pointer" }}
                >
                  <Box
                    component="img"
                    src={previewFile}
                    alt="To-Let"
                    sx={{
                      width: 200,
                      height: "auto",
                      objectFit: "cover",
                      boxShadow: "0px 5px 25px rgba(42, 48, 55, 0.12)",
                      mt: 2, // Add margin at the top
                      borderRadius: 8, // Add border radius for a softer look
                    }}
                  />
                </label>
              )}
            </Box>
            <TextField
              label="Enter Customer Name"
              margin="normal"
              fullWidth
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <TextField
              label="Enter Phone Number"
              margin="normal"
              fullWidth
              error={mobileError}
              helperText={mobileHelperText}
              value={mobileNumber}
              inputProps={{ maxLength: 10 }}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                setMobileError(false);
                setMobileHelperText("");
              }}
            />
            <TextField
              label="Enter Email"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Enter Location"
              margin="normal"
              fullWidth
              error={locationError1}
              helperText={locationHelperText}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setLocationError(false);
                setLocationHelperText("");
              }}
            />
            <TextField
              label="Enter Pincode"
              margin="normal"
              fullWidth
              error={pincodeError}
              helperText={pincodeHelperText}
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
                setPincodeError(false);
                setPincodeHelperText("");
              }}
            />
            <TextField
              label="Enter Landmark"
              margin="normal"
              fullWidth
              error={landMarkError}
              helperText={landMarkHelperText}
              value={landmark}
              onChange={(e) => {
                setLandmark(e.target.value);
                setLandMarkError(false);
                setLandMarkHelperText("");
              }}
            />
            <TextField
              type="datetime-local"
              // label="Enter Best time to call"
              margin="normal"
              fullWidth
              value={bestTimeToCall}
              onChange={(e) => setBestTimeToCall(e.target.value)}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={typeOfLead}
              options={["Sale", "Rent", ...services.map((item) => item.name)]}
              onChange={(event, newValue) => {
                setTypeOfLead(newValue);
                setTypeOfLeadError(false);
                setTypeOfLeadHelperText("");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type Of Lead"
                  error={typOfLeadError}
                  helperText={typeOfLeadHelperText}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
              fullWidth
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </Drawer>

      {/* Below the Associate Lead Update Drawer */}
      <Drawer
        anchor="right"
        open={isLeadDrawer}
        onClose={() => {
          setIsLeadDrawer(false);
          setAssociateLeadId(null);
        }}
      >
        <Box
          sx={{
            p: 3,
            width: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Associate Lead Details</Typography>
            <IconButton
              onClick={() => {
                setIsLeadDrawer(false);
                setAssociateLeadId(null);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              textAlign: "center",
              mb: 3,
              mt: 2,
            }}
          >
            <img
              src={normalizeLeadImageUrl(leadData?.imagePath)}
              height="300px"
              alt={leadData?.customerName}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = defaultLeadImage;
              }}
              style={{
                borderRadius: "8px",
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { label: "Property ID", value: leadData?.id },
              { label: "Customer Name", value: leadData?.customerName },
              { label: "Mobile Number", value: leadData?.mobileNumber },
              { label: "Email", value: leadData?.email },
              { label: "Assigned To", value: leadData?.assignedToName },
              { label: "Assigned By", value: leadData?.assignedByName },
              {
                label: "Assigned Date",
                value: dateFormate(leadData?.assignedDate),
              },
              // { label: 'Next Follow-Up Date', value: leadData?.nextFollowupDate },
              { label: "Status", value: leadData?.status },
            ].map(
              (item, index) =>
                item.value && (
                  <Grid item xs={6} key={index}>
                    <Typography
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      {item.label}:
                    </Typography>
                    <Typography style={{ fontSize: "15px" }}>
                      {item.value}
                    </Typography>
                  </Grid>
                )
            )}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setActionType("Fake");
                setIsLeadStatusModal(true);
              }}
            >
              Fake
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setActionType("Closed");
                setIsLeadStatusModal(true);
              }}
            >
              Closed
            </Button>
            {leadData?.status !== "Closed" && leadData?.status !== "Fake" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setActionType("Converted");
                  setIsLeadStatusModal(true);
                }}
              >
                Converted
              </Button>
            )}
            {leadData?.status !== "Closed" && leadData?.status !== "Fake" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setActionType("Follow Up");
                  setIsLeadStatusModal(true);
                }}
              >
                Follow-Up
              </Button>
            )}
          </Box>
          <Divider />
          <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
            Lead History
          </Typography>
          {associateLeadHistories && associateLeadHistories.length > 0 ? (
            associateLeadHistories.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Grid container spacing={2}>
                  {[
                    { label: "Assigned To", value: item.assignToName },
                    { label: "Assigned By", value: item.assignedByName },
                    {
                      label: "Assigned Date",
                      value: dateFormate(item.assignedDate),
                    },
                    { label: "Call Date", value: item.callDate },
                    { label: "Call By", value: item.callBy },
                    { label: "Call Response", value: item.callResponse },
                    { label: "Remarks", value: item.remarks },
                    {
                      label: "Status Change From",
                      value: item.statusChangeFrom,
                    },
                    { label: "Status Change To", value: item.statusChangeTo },
                    {
                      label: "Next Follow-Up Date",
                      value: dateFormate(item.followupDate),
                    },
                    // { label: "Status", value: item.status },
                  ].map(
                    (historyItem, historyIndex) =>
                      historyItem.value && (
                        <Grid item xs={6} key={historyIndex}>
                          <Typography variant="body2">
                            <strong>{historyItem.label}:</strong>{" "}
                            {historyItem.value}
                          </Typography>
                        </Grid>
                      )
                  )}
                </Grid>
              </Box>
            ))
          ) : (
            <Typography>No lead histories available.</Typography>
          )}
        </Box>
      </Drawer>

      {/* below the modal is for assign lead to a telecaller  */}
      <Dialog
        open={isLeadAssignModal}
        onClose={() => setIsLeadAssignModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Assigning Leads
          <IconButton
            style={{ marginLeft: "200px" }}
            edge="end"
            color="inherit"
            onClick={() => setIsLeadAssignModal(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Assign Selected leads to any Team Lead or to any Tele Caller
          </Typography>
          <Autocomplete
            value={userList.find((item) => item.id === assignUserId) || null}
            onChange={(event, newValue) => setAssignUserId(newValue?.id || null)}
            id="searchable-dropdown"
            options={userList?.filter((items) => items.status === "Active")}
            getOptionLabel={getUserOptionLabel}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                label="Assign Telecaller/Team Lead"
                variant="outlined"
              />
            )}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <MenuItem key={option.id || key} {...optionProps}>
                  {getUserOptionLabel(option) +
                    " " +
                    "(" +
                    option.roles.map((item) => item).join(", ") +
                    ")"}
                </MenuItem>
              );
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              assignLead();
            }}
            sx={{ mt: 2 }}
          >
            Assign
          </Button>
        </DialogContent>
      </Dialog>

      {/* lead action modal is below */}
      <Dialog
        open={isLeadStatusModal}
        onClose={() => setIsLeadStatusModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Lead Action
          <IconButton
            style={{ marginLeft: "250px" }}
            edge="end"
            color="inherit"
            onClick={() => setIsLeadStatusModal(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {actionType !== "Follow Up" && (
            <>
              <label>Remarks</label>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={remarks}
                onChange={(event) => {
                  setRemarks(event.target.value);
                }}
              />
            </>
          )}
          {actionType === "Follow Up" && (
            <>
              <Grid style={{ marginTop: "10px" }}>
                <label> Next Follow-Up (Date & Time) :</label>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="datetime-local"
                  value={followupDate}
                  onChange={(event) => {
                    setFollowupDate(event.target.value);
                  }}
                />
              </Grid>
              <Grid style={{ marginTop: "10px" }}>
                <label>Remarks</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={remarks}
                  onChange={(event) => {
                    setRemarks(event.target.value);
                  }}
                />
              </Grid>
            </>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
            onClick={updateAssociateLead}
          >
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateLead;
