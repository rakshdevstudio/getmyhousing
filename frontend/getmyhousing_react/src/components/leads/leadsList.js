import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Drawer,
  Divider,
} from "@mui/material";
import { Grid, Button, Box, Typography, Autocomplete } from "@mui/material";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import CloseIcon from "@mui/icons-material/Close";
import DashBoardNavbar from "../generic/dashboard/DashBoardNavbar";
import DashBoardHeader from "../generic/dashboard/DashBoardHeader";
import {
  dateFormate,
  listingTypeOptions,
} from "../../common/common";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultLoader from "../DefaultLoader";

function LeadsList() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [subPropertyTypeIsFetching, setSubPropertyTypeIsFetcing] =
    useState(false);
  const [subPropertyTypes, setSubPropertyTypes] = useState([]);
  const { locationData } = useSelector(
    (state) => state.location
  );
  const globalState = useSelector((state) => state.user);
  const { userData } = globalState;

  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [nextFollowupDate, setNextFollowupDate] = useState("");

  const state = locationData?.countries[0]?.states;

  // loading state is below
  const [isLeadsFetching, setIsLeadsFetching] = useState(true);
  const [isLeadDetailFetching, setIsLeadDetailFetching] = useState(false);
  // popup
  const [isLeadAssignModal, setIsLeadAssignModal] = useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isLeadActionModal, setIsLeadActionModal] = useState(false);
  const [isLeadDrawer, setIsLeadDrawer] = useState(false);

  // selected id's for assigning
  const [checkedIds, setCheckedIds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  //displaying userData and leadsData
  const [leadsData, setLeadsData] = useState([]);
  const [leadHistories, setLeadHistories] = useState([]);
  const [leadData, setLeadData] = useState("");
  const [userList, setUserList] = useState([]);

  //setting button name for differentiate input fields
  const [filterType, setFilterType] = useState(null);
  useEffect(() => {
    if (filterType === "PropertyType") {
      setSubPropertyTypeIsFetcing(true);
    }
  }, [filterType]);
  const [actionType, setActionType] = useState(null);

  //for filter popup
  const [stateName, setstateName] = useState([]);
  const [districtName, setdistrictName] = useState([]);

  const [filteredDistricts, setfilteredDistricts] = useState(null);
  const [selectedPropetyType, setSelectedPropertyType] = useState(null);
  const [leadStartDate, setLeadStartDate] = useState(null);
  const [leadEndDate, setLeadEndDate] = useState(null);
  const [nextFollowStartDate, setNextFollowStartDate] = useState(null);
  const [nextFollowEndDate, setNextFollowEndDate] = useState(null);

  //tracking user input data in filter popup
  const [selectedState, setSelectedState] = useState(null);
  const [selectedBuildingType, setSelectedBuildingType] = useState(null);

  //popup values tracking
  const [leadStatus, setleadStatus] = useState(null);
  const [assignedToNameFilter, setassignedToNameFilter] = useState(null);
  const [listingTypeFilter, setlistingTypeFilter] = useState(null);
  const [extractedName, setExtractedName] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [LeadId, setLeadId] = useState(null);

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

  const renderStringOption = (props, option) => {
    const { key, ...optionProps } = props;
    return (
      <MenuItem key={option || key} {...optionProps}>
        {option}
      </MenuItem>
    );
  };

  const handleIsLeadDetail = (id) => {
    setLeadId(id);
    setIsLeadDetailFetching(true);
    setIsLeadDrawer(true);
  };

  useEffect(() => {
    if (assignedToNameFilter !== null) {
      const userName = getUserOptionLabel(assignedToNameFilter).trim();
      setExtractedName(userName);
    }
  }, [assignedToNameFilter]);

  // apply filtering for district
  useEffect(() => {
    const filteredDistricts = selectedState
      ? districtName?.filter((district) => {
        const stateOfDistrict = state.find((item) =>
          item.districts.some((d) => d.districtName === district)
        );
        return stateOfDistrict && stateOfDistrict.stateName === selectedState;
      })
      : districtName;

    // Set the filtered districts to the state
    setfilteredDistricts(filteredDistricts);
  }, [selectedState]);

  // selecting id's for assign lead
  const handleCheckboxChange = (id) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds?.filter((checkedId) => checkedId !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  //lead and lead history popup
  const handleIsLeadActionModal = (name) => {
    setActionType(name);
    setIsLeadActionModal(true);
  };

  const handleFilterModal = (name) => {
    setFilterType(name);
    setIsFilterModal((prev) => !prev);
  };

  // mapping states
  useEffect(() => {
    const stateNames = state?.map((item) => item.stateName);
    setstateName(stateNames);
  }, [state]);

  // mapping districts
  useEffect(() => {
    const districtNames = state?.reduce((allDistricts, stateItem) => {
      const stateDistricts = stateItem.districts?.map(
        (district) => district.districtName
      );
      return allDistricts.concat(stateDistricts);
    }, []);
    setdistrictName(districtNames);
  }, [state]);

  //fetching property and subproperty details
  useEffect(() => {
    const getPropertyType = async () => {
      let params = {};
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getSubPropertyType,
          params,
          cookies
        );
        if (response.status === 200) {
          setSubPropertyTypes(response.data.SubPropertyTypes);
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
        toast.error("An error occurred while fetching data!", {
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

    if (subPropertyTypeIsFetching) {
      getPropertyType();
      setSubPropertyTypeIsFetcing(false);
    }
  }, [subPropertyTypeIsFetching]);

  //fetching user details
  const getUsers = async () => {
    let params = { roles: ["Admin", "Telecaller", "Team Leader"] };
    try {
      const response = await invokeApi(
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
      toast.error("An error occurred while fetching data!", {
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

  // getting leads API
  useEffect(() => {
    const getLeads = async () => {
      let params = {
        userId: cookies[config.cookieName]?.loginUserId,
        leadStartDate: leadStartDate,
        leadEndDate: leadEndDate,
        status: leadStatus,
        assignedToName: extractedName,
        listingType: listingTypeFilter,
        buildingType: selectedBuildingType,
        propertyType: selectedPropetyType,
        state: selectedState,
        city: selectedCity,
        nextFollowupStartDate: nextFollowStartDate,
        nextFollowupEndDate: nextFollowEndDate,
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getLeads,
          params,
          cookies
        );
        if (response) {
          setLeadsData(response.data.leads);
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
        toast.error("An error occurred while fetching data!", {
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
    if (isLeadsFetching) {
      getLeads();
      setIsLeadsFetching(false);
    }
  }, [cookies, isLeadsFetching]);

  //getting lead details by id
  useEffect(() => {
    const getLeadHistory = async () => {
      let params = {
        leadId: LeadId,
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getLeadHistory,
          params,
          cookies
        );
        if (response) {
          setLeadHistories(response.data.leadHistories);
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
        toast.error("An error occurred while fetching data!", {
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
    const getLead = async () => {
      let params = {
        id: LeadId,
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getLead,
          params,
          cookies
        );
        if (response) {
          setLeadData(response.data.lead);
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
        toast.error("An error occurred while fetching data!", {
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
    if (isLeadDetailFetching) {
      getLead();
      getLeadHistory();
      setIsLeadDetailFetching(false);
    }
  }, [LeadId, isLeadDetailFetching]);

  // assign leads API
  const assignLead = async () => {
    let params = {
      userId: selectedId,
      leads: checkedIds,
    };
    try {
      const response = await invokeApi(
        config.apiDomains + apiList.assignLead,
        params,
        cookies
      );
      if (response) {
        if (
          response.status === "200" ||
          response.data.responseMessage === "Successful"
        ) {
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
          setIsLeadsFetching(true);
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
    } catch (error) {
      toast.error("An error occurred while fetching data!", {
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

  const updateLead = async () => {
    let params = {
      id: LeadId,
      remarks: remarks,
      status: status,
      nextFollowupDate,
    };
    try {
      const response = await invokeApi(
        config.apiDomains + apiList.editLead,
        params,
        cookies
      );
      if (response) {
        if (
          response.status === "200" ||
          response.data.responseMessage === "Successful"
        ) {
          toast.success("Lead Update SuccessFully", {
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
          setIsLeadDetailFetching(true);
          setIsLeadActionModal(false);
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
    } catch (error) {
      toast.error("An error occurred while fetching data!", {
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
            {isLeadsFetching ? (
              <DefaultLoader />
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow
                      style={{ backgroundColor: "#e7e7e7", color: "#fff" }}
                    >
                      {!userData?.user?.roles.includes("Telecaller") && (
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
                        Customer Name
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Mobile Number
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
                        Cus State
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Cus City/District
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Lead Date
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Lead Status
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Lead Source
                      </TableCell>
                      {/* {userData?.user?.roles.includes("Admin") && ( */}
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Assigned to
                      </TableCell>
                      {/* )} */}
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Listing type
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Building type
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Property type
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Next Follow-Up Date
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "3px solid #454545",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                        }}
                      >
                        Lead Provided By
                        <br></br>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leadsData?.map((items) => (
                      <TableRow key={items.id}>
                        {!userData?.user?.roles.includes("Telecaller") && (
                          <TableCell
                            style={{
                              borderBottom: "1px solid #ddd",
                              borderRight: "1px solid #ddd",
                            }}
                          >
                            <Checkbox
                              onChange={() => handleCheckboxChange(items.id)}
                              checked={checkedIds.includes(items.id)}
                            />
                          </TableCell>
                        )}
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                            cursor: "pointer",
                          }}
                          onClick={() => handleIsLeadDetail(items.id)}
                        >
                          {items.customerName}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {items.mobileNumber}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {items.email}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                            textAlign: items.customerState || "center",
                          }}
                        >
                          {items.customerState || " - "}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                            textAlign: items.customerDistrict || "center",
                          }}
                        >
                          {items.customerDistrict || " - "}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {dateFormate(items.createdDate)}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {items.status}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {items.leadSource}
                        </TableCell>
                        {/* {userData?.user?.roles.includes("Admin") && ( */}
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {items.assignedToName}
                        </TableCell>
                        {/* )} */}
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {items.listingType}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {items.buildingType}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {items.propertyType}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {dateFormate(items.nextFollowupDate)}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {items.leadProviderRole !== null
                            ? items.leadProviderRole
                            : "Non Reg"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {!userData?.user?.roles.includes(
              "Telecaller",
              "Associate",
              "Agent"
            ) && (
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
      {/* below  the modal is to filter the leads*/}
      <Dialog
        open={isFilterModal}
        onClose={() => setIsFilterModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Apply Filters
          <IconButton
            style={{ marginLeft: "250px" }}
            edge="end"
            color="inherit"
            onClick={() => setIsFilterModal(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {filterType === "LeadDate" && (
            <div>
              <Grid>
                <label>Start Date</label>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="date"
                  value={leadStartDate}
                  onChange={(event) => {
                    setLeadStartDate(event.target.value);
                  }}
                />
              </Grid>
              <Grid style={{ marginTop: "10px" }}>
                <label>End Date</label>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="date"
                  value={leadEndDate}
                  onChange={(event) => {
                    setLeadEndDate(event.target.value);
                  }}
                />
              </Grid>
            </div>
          )}
          {filterType === "NextFollowUp" && (
            <div>
              <Grid>
                <label>Start Date</label>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="date"
                  value={nextFollowStartDate}
                  onChange={(event) => {
                    setNextFollowStartDate(event.target.value);
                  }}
                />
              </Grid>
              <Grid style={{ marginTop: "10px" }}>
                <label>End Date</label>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="date"
                  value={nextFollowEndDate}
                  onChange={(event) => {
                    setNextFollowEndDate(event.target.value);
                  }}
                />
              </Grid>
            </div>
          )}
          {filterType === "LeadStatus" && (
            <Grid style={{ marginTop: "10px" }}>
              <Autocomplete
                id="searchable-dropdown"
                options={["Fake", "Closed", "Converted", "Follow Up"]}
                value={leadStatus}
                onChange={(event, newValue) => {
                  setleadStatus(newValue);
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lead Status"
                    variant="outlined"
                  />
                )}
                renderOption={renderStringOption}
              />
            </Grid>
          )}
          {filterType === "AssignedTo" && (
            <Grid style={{ marginTop: "10px" }}>
              <Autocomplete
                value={assignedToNameFilter}
                onChange={(event, newValue) => {
                  setassignedToNameFilter(newValue);
                }}
                id="searchable-dropdown"
                options={userList?.filter((items) => items.status === "Active")}
                getOptionLabel={getUserOptionLabel}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assigned To"
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
            </Grid>
          )}
          {filterType === "ListingType" && (
            <Grid style={{ marginTop: "10px" }}>
              <Autocomplete
                value={listingTypeFilter}
                onChange={(event, newValue) => {
                  setlistingTypeFilter(newValue);
                }}
                id="searchable-dropdown"
                options={listingTypeOptions}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Listing Type"
                    variant="outlined"
                  />
                )}
                renderOption={renderStringOption}
              />
            </Grid>
          )}
          {filterType === "BuildingType" && (
            <Grid style={{ marginTop: "10px" }}>
              <Autocomplete
                onChange={(event, newValue) =>
                  setSelectedBuildingType(newValue)
                }
                id="searchable-dropdown"
                options={["Residential", "Commercial", "Industrial"]}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Building Type"
                    variant="outlined"
                  />
                )}
                renderOption={renderStringOption}
              />
            </Grid>
          )}
          {filterType === "PropertyType" && (
            <Grid style={{ marginTop: "10px" }}>
              <Autocomplete
                value={selectedPropetyType}
                onChange={(event, newValue) => {
                  setSelectedPropertyType(newValue);
                }}
                id="searchable-dropdown"
                options={subPropertyTypes}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Property Type"
                    variant="outlined"
                  />
                )}
                renderOption={renderStringOption}
              />
            </Grid>
          )}
          {filterType === "District" && (
            <Grid style={{ marginTop: "10px" }}>
              <Autocomplete
                value={selectedCity}
                onChange={(event, newValue) => setSelectedCity(newValue)}
                id="searchable-dropdown"
                options={
                  filteredDistricts !== null && filteredDistricts.length > 0
                    ? filteredDistricts
                    : districtName
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City/District"
                    variant="outlined"
                  />
                )}
                renderOption={renderStringOption}
              />
            </Grid>
          )}
          {filterType === "State" && (
            <Grid style={{ marginTop: "10px" }}>
              <Autocomplete
                onChange={(event, newValue) => setSelectedState(newValue)}
                id="searchable-dropdown"
                options={stateName}
                fullWidth
                value={selectedState}
                renderInput={(params) => (
                  <TextField {...params} label="State" variant="outlined" />
                )}
                renderOption={renderStringOption}
              />
            </Grid>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => (
                setIsLeadsFetching(true), setIsFilterModal(false)
              )}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Drawer
        anchor="right"
        open={isLeadDrawer}
        onClose={() => setIsLeadDrawer(false)}
      >
        <div style={{ width: "500px", padding: "20px" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Lead Details</Typography>
            <IconButton onClick={() => setIsLeadDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            {[
              { label: "Property ID", value: leadData?.id },
              { label: "Customer Name", value: leadData?.customerName },
              { label: "Mobile Number", value: leadData?.customerName },
              { label: "Email", value: leadData?.email },
              { label: "Lead Source", value: leadData?.leadSource },
              { label: "Lead Type", value: leadData?.leadType },
              { label: "Assigned To", value: leadData?.assignedToName },
              { label: "Assigned By", value: leadData?.assignedByName },
              {
                label: "Assigned Date",
                value: dateFormate(leadData?.assignedDate),
              },
              {
                label: "Next Follow-Up Date",
                value: dateFormate(leadData?.nextFollowupDate),
              },
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

          <Grid container spacing={2} sx={{ marginTop: "20px" }}>
            <Grid item md={6} xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleIsLeadActionModal("Fake");
                  setStatus("Fake");
                }}
              >
                Fake
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleIsLeadActionModal("Closed");
                  setStatus("Closed");
                }}
              >
                Closed
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleIsLeadActionModal("Converted");
                  setStatus("Converted");
                }}
              >
                Converted
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleIsLeadActionModal("FollowUp");
                  setStatus("Follow Up");
                }}
              >
                Follow-Up
              </Button>
            </Grid>
          </Grid>

          <div style={{ marginTop: "30px" }}>
            <Typography variant="h6">Lead History</Typography>
            {leadHistories ? (
              leadHistories.map((item, index) => (
                <React.Fragment
                  key={item.id || `${item.assignedDate || "history"}-${index}`}
                >
                  <div style={{ marginTop: "15px" }}>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bold" }}
                    >
                      {index + 1}.
                    </Typography>
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
                        { label: "Call Notes", value: item.callNotes },
                        {
                          label: "Status Change From",
                          value: item.statusChangeFrom,
                        },
                        {
                          label: "Status Change To",
                          value: item.statusChangeTo,
                        },
                        {
                          label: "Next Follow-Up Date",
                          value: dateFormate(item.nextFollowupDate),
                        },
                        { label: "Status", value: item.status },
                      ].map(
                        (historyItem, index) =>
                          historyItem.value && (
                            <Grid item xs={6} key={index}>
                              <Typography
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                              >
                                {historyItem.label}:
                              </Typography>
                              <Typography style={{ fontSize: "15px" }}>
                                {historyItem.value}
                              </Typography>
                            </Grid>
                          )
                      )}
                    </Grid>
                  </div>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography>No lead histories available.</Typography>
            )}
          </div>
        </div>
      </Drawer>
      {/* lead action modal is below */}
      <Dialog
        open={isLeadActionModal}
        onClose={() => setIsLeadActionModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Lead Action
          <IconButton
            style={{ marginLeft: "250px" }}
            edge="end"
            color="inherit"
            onClick={() => setIsLeadActionModal(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {actionType !== "FollowUp" && (
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
          {actionType === "FollowUp" && (
            <>
              <Grid style={{ marginTop: "10px" }}>
                <label> Next Follow-Up (Date & Time) :</label>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="datetime-local"
                  value={nextFollowupDate}
                  onChange={(event) => {
                    setNextFollowupDate(event.target.value);
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
          >
            <Button variant="contained" color="primary" onClick={updateLead}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* below the modal is for assign lead to a telecaller  */}
      <Dialog
        open={isLeadAssignModal}
        onClose={() => setIsLeadAssignModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Assigning Leads</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setIsLeadAssignModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Assign Selected leads to any Team Lead or to any Tele Caller
          </Typography>
          <Autocomplete
            value={userList.find((item) => item.id === selectedId) || null}
            onChange={(event, newValue) => setSelectedId(newValue?.id || null)}
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
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                assignLead();
                setIsLeadAssignModal(false);
              }}
            >
              Assign
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LeadsList;
