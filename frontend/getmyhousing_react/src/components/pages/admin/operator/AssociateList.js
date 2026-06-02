import React, { useEffect, useState } from "react";
import OperatorTabs from "./OperatorTabs";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import NavigationIcon from "@mui/icons-material/Navigation";
import { apiList, invokeApi } from "../../../../apis/apiServices";
import { config } from "../../../../config/config";
import { dateFormate, formatSegment } from "../../../../common/common";

const StatusList = [
  {
    status: "Active",
    // endPoint: apiList.activeProperties,
  },
  {
    status: "Pending",
    // endPoint: apiList.pendingProperties,
  },
  {
    status: "Rejected",
    // endPoint: apiList.rejectedProperties,
  },
  {
    status: "Completed",
    // endPoint: apiList.closedProperties,
  },
];

const AssociateList = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [leadsList, setLeadsList] = useState([]);

  const [isUserFetching, setIsUserFetching] = useState(true);
  const [propertyListModal, setPropertyListModal] = useState(false);
  const [leadModal, setLeadModal] = useState(false);
  const [propertyFetching, setPropertyFetching] = useState(false);
  const [isLeadsFetching, setIsLeadsFetching] = useState(false);

  const [status, setStatus] = useState("Active");

  const [userId, setUserId] = useState(null);
  const [propertyId, setPropertyId] = useState(null);

  function handleChangeStatus(e) {
    let valueSelected = e.target.value;
    setStatus(valueSelected);
    setPropertyFetching(true);
  }

  useEffect(() => {
    const getLeads = async () => {
      let params = {
        userId: cookies[config.cookieName]?.loginUserId,
        propertyId,
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getLeads,
          params,
          cookies
        );
        if (response.status === 200) {
          setLeadsList(response.data.leads);
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

  useEffect(() => {
    const getProperties = async () => {
      let params = {
        createdBy: userId,
        status,
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.allPropertyByStatusAndUserInDashboard,
          params,
          cookies
        );
        if (response.status >= 200 && response.status < 300) {
          if (response.data.responseCode === "200") {
            setPropertyList(response.data.dashboardProperties);
            setPropertyFetching(false);
          } else {
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
          }
        } else if (response.status === 400) {
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
    if (propertyFetching) {
      getProperties();
    }
  }, [cookies, propertyFetching]);

  useEffect(() => {
    const getUsers = async () => {
      let params = {
        role: "Associate",
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getUserByPincodeForOperator,
          params,
          cookies
        );
        if (
          response.status === 200 &&
          response.data.responseMessage === "Successful"
        ) {
          setUsersList(response.data.users);
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
    if (isUserFetching) {
      getUsers();
      setIsUserFetching(false);
    }
  }, [cookies, isUserFetching]);

  return (
    <>
      <OperatorTabs tabActive={0}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((item, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.mobileNumber}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setUserId(item.id);
                        setPropertyFetching(true);
                        setPropertyListModal(true);
                      }}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </OperatorTabs>
      {/* below the drawer is for show the user proeprties  */}
      <Drawer
        anchor={"bottom"}
        open={propertyListModal}
        onClose={() => {
          setPropertyListModal(false);
          setPropertyList([]);
        }}
        onOpen={() => setPropertyListModal(true)}
      >
        <Box
          sx={{
            width: "100%",
            p: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Properties</Typography>
          <IconButton
            onClick={() => {
              setPropertyListModal(false);
              setPropertyList([]);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <TableContainer>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              width: "100%",
              overflowX: "auto",
              my: 2,
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
                  background: status === item.status ? "#1976d2" : "#e0e0e0",
                  color: status === item.status ? "#fff" : "#000",
                  cursor: "pointer",
                  transition: "background 0.3s, color 0.3s",
                }}
              >
                {item.status}
                <input
                  type="radio"
                  id={`status-by-property-${index}`}
                  name="radio7"
                  value={item.status}
                  onChange={handleChangeStatus}
                  checked={status === item.status}
                  style={{ display: "none" }} // Hide the default radio button
                />
              </label>
            ))}
          </Box>
          {propertyFetching ? (
            <Box
              sx={{
                minHeight: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl No</TableCell>
                  <TableCell>Property Name</TableCell>
                  <TableCell>Property Type</TableCell>
                  <TableCell>Property Posted On</TableCell>
                  {status === ("Active" || "Completed") && (
                    <TableCell>Action</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {propertyList.length > 0 ? (
                  propertyList.map((item, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link
                          to={`/property/${formatSegment(
                            item.listingType
                          )}/${formatSegment(
                            item.propertyName
                          )}/${formatSegment(
                            item.buildingType +
                            "-" +
                            item.propertyType +
                            "-in-" +
                            item.locality +
                            "-" +
                            item.city
                          )}/${item.propertyId}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          {item.propertyName}{" "}
                          <NavigationIcon sx={{ fontSize: "11px" }} />
                        </Link>
                      </TableCell>
                      <TableCell>
                        {item.listingType +
                          "/" +
                          item.buildingType +
                          "/" +
                          item.propertyType}{" "}
                      </TableCell>
                      <TableCell>{dateFormate(item.postDate)}</TableCell>
                      {status === ("Active" || "Completed") && (
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={() => {
                              setPropertyId(item.propertyId);
                              setIsLeadsFetching(true);
                              setPropertyListModal(false);
                              setLeadModal(true);
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{ textAlign: "center", fontSize: "20px" }}
                    >
                      No Property Posted
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Drawer>

      {/* below the drawer is for show the property leads  */}
      <Drawer
        anchor={"bottom"}
        open={leadModal}
        onClose={() => {
          setLeadModal(false);
        }}
        onOpen={() => setLeadModal(true)}
      >
        <Box
          sx={{
            width: "100%",
            p: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Leads</Typography>
          <IconButton
            onClick={() => {
              setLeadModal(false);
              setPropertyListModal(true);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date/Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leadsList.length > 0 ? (
                leadsList.map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>{item.mobileNumber}</TableCell>
                    <TableCell>{item.email || "-"}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{dateFormate(item.createdDate)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{ textAlign: "center", fontSize: "20px" }}
                  >
                    No Leads
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Drawer>
    </>
  );
};

export default AssociateList;
