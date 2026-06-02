import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Autocomplete,
  MenuItem,
  Select,
  TextField,
  Chip,
} from "@mui/material";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import UserManagerTabs from "./UserManagerTabs";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../global/redux/action";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import UserStatusToggle from "./UserStatusToggle";

const presentRoles = ["Admin",
  "Agent",
  "Owner",
  "Associate",
  "Operator",
  "Telecaller",
  "Team Leader"];

const tableHeaderStyle = {
  borderBottom: "3px solid #454545",
  borderRight: "1px solid #ddd",
  fontSize: "16px",
};

function UsersList() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [datas, setdatas] = useState([]);
  const [loading, setloading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState("");
  const [pincodeList, setPincodeList] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([
    "Admin",
    "Agent",
    "Owner",
    "Associate",
    "Operator",
    "Telecaller",
    "Team Leader",
    "Channel Partner"
  ]);

  const [type, setType] = useState('pincode');
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { userData } = useSelector(
    (state) => state.user
  );

  const [isDeleteUser, setIsDeleteUser] = useState(false);

  const handleEditClick = (getId) => {
    navigate(`/user-update/${getId}`);
  };

  const handleMultiSelect = (event, newValue) => {
    setSelectedRoles(newValue);
  };

  const deleteUser = async () => {
    let params = { id: userId };
    try {
      const response = await invokeApi(
        config.apiDomains + apiList.deleteUser,
        params,
        cookies
      );
      if (response) {
        if (
          response.status === "200" ||
          response.data.responseMessage === "Successful"
        ) {
          setloading(true);
          toast.success("Deleted Record Successfully!", {
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
          setIsDeleteUser(false);
        } else if (response.status === 401) {
          navigate("/logout");
        } else {
          toast.error("Failed to delete this Record!", {
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
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error deleting the item");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      if (!userData?.user?.roles) {
        // Wait for userData to be ready
        return;
      }

      let rolesParam = userData.user.roles.includes("Admin")
        ? selectedRoles
        : ["Operator"];

      let endPoint = userData.user.roles.includes("Admin")
        ? apiList.getUsers
        : apiList.getOperators;

      let params = { roles: rolesParam, pincode: selectedPincode };
      try {
        const response = await invokeApi(
          config.apiDomains + endPoint,
          params,
          cookies
        );
        if (response.data.responseCode === "200") {
          setdatas(response.data.users);
          setPincodeList(response.data.pincodeList);
        } else if (response.data.responseCode === "401") {
          navigate("/logout");
        } else {
          console.error("No data in the response");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    if (loading && userData?.user?.roles) {
      getUsers();
      setloading(false);
    }
  }, [userData, cookies, loading, navigate]);

  return (
    <>
      <UserManagerTabs tabActive={1}>
        <TableContainer component={Paper} sx={{ p: 2, mt: 2 }}>
          {loading && (
            <Stack sx={{ display: "flex", alignItems: "center", mb: 5 }}>
              <CircularProgress sx={{ color: "black" }} />
            </Stack>
          )}
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e7e7e7", color: "#fff" }}>
                <TableCell sx={tableHeaderStyle}>
                  Sl No
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Full Name
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Email
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Mobile Number
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Whatsapp Number
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Country
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  State
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  District
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Pincode
                  <IconButton
                    aria-label="filter pincode"
                    size="small"
                    onClick={() => {
                      setType("pincode");
                      setIsModalOpen(true);
                    }}
                    sx={{ ml: 1 }}
                  >
                    <FilterAltIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Roles
                  <IconButton
                    size="small"
                    onClick={() => {
                      setType("roles")
                      setIsModalOpen(true);
                    }}
                    sx={{ ml: 1 }}
                  >
                    <FilterAltIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Status
                </TableCell>
                {userData?.user?.roles.includes("Admin") && (
                  <TableCell sx={tableHeaderStyle}>
                    Action
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {datas
                .map((items, index) => (
                  <TableRow key={items.id || items.email || index}>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #ddd",
                        borderRight: "1px solid #ddd",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "1px solid #ddd",
                        borderRight: "1px solid #ddd",
                      }}
                    >
                      {items.fullName}
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
                      }}
                    >
                      {items.mobileNumber}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "1px solid #ddd",
                        borderRight: "1px solid #ddd",
                        textAlign: items.whatsappNumber || "center",
                      }}
                    >
                      {items.whatsappNumber || "-"}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "1px solid #ddd",
                        borderRight: "1px solid #ddd",
                        textAlign: items.country || "center",
                      }}
                    >
                      {items.country || "-"}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "1px solid #ddd",
                        borderRight: "1px solid #ddd",
                        textAlign: items.state || "center",
                      }}
                    >
                      {items.state || "-"}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "1px solid #ddd",
                        borderRight: "1px solid #ddd",
                        textAlign: items.district || "center",
                      }}
                    >
                      {items.district || "-"}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "1px solid #ddd",
                        borderRight: "1px solid #ddd",
                        textAlign: items.pincode || "center",
                      }}
                    >
                      {items.pincode || "-"}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "1px solid #ddd",
                        borderRight: "1px solid #ddd",
                      }}
                    >
                      {items.roles.join(", ")}
                    </TableCell>
                    {/* Status Column with Badge */}
                    <TableCell style={{ borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                      <UserStatusToggle userId={items.id} initialStatus={items.status} />
                    </TableCell>
                    {userData?.user?.roles.includes("Admin") && (
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          display: "flex",
                          flexDirection: {
                            xs: "column", // Stack vertically on extra-small screens
                            md: "row", // Arrange in a row on medium and larger screens
                          },
                          gap: "8px",
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditClick(items.id)}
                          sx={{ width: { xs: "100%", md: "100px" } }} // Full width on extra-small screens, fixed width on medium and larger
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setUserId(items.id);
                            setIsDeleteUser(true);
                          }}
                          sx={{ width: { xs: "100%", md: "100px" } }} // Full width on extra-small screens, fixed width on medium and larger
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </UserManagerTabs>

      <Dialog
        open={isDeleteUser}
        onClose={() => setIsDeleteUser(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteUser(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteUser} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* filter modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>{type === "pincode" ? "Select Pincode" : "Select Roles"}</DialogTitle>
        <DialogContent>
          {type === "pincode" ? (
            <Select value={selectedPincode} onChange={(e) => setSelectedPincode(e.target.value)} fullWidth>
              {pincodeList.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          ) : (
            <Autocomplete
              multiple
              options={presentRoles}
              value={selectedRoles}
              onChange={handleMultiSelect}
              renderInput={(params) => <TextField {...params} label="Select Roles" variant="outlined" fullWidth />}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setloading(true);
              setIsModalOpen(false);
            }}
            variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog >
    </>
  );
}

export default UsersList;
