import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PropertyManagerTabs from "../post-properties/PropertyManagerTabs";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { apiList, invokeApi } from "../../../apis/apiServices";
import { config } from "../../../config/config";
import { useNavigate } from "react-router-dom";

function UsersList() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [addNewPropertyModal, setAddNewPropertyModal] = useState(false);
  const [editPropertyModal, setEditPropertyModal] = useState(false);

  const [groupdatas, setGroupDatas] = useState([]);
  const [groupDatasFetching, setGrupDatasFetching] = useState(true);

  const [propertyList, setPropertyList] = useState([]);
  const [propertyIdListError, setPropertyIDListError] = useState(false);
  const [propertyIdListHelperText, setPropertyIDListHelperText] = useState("");

  const [groupName, setGroupName] = useState("");
  const [groupNameFrror, setGroupNameError] = useState(false);
  const [groupnameHelperText, setGroupNameHelperText] = useState("");

  const handleChangeValue = (event, newValue) => {
    setSelectedIds(newValue);
  };

  const addInPropertyGroup = async () => {
    setLoading(true);
    let validate = true;
    if (!groupName) {
      setGroupNameError(true);
      setGroupNameHelperText("Please Enter Group Name");
      setLoading(false);
      validate = false;
    }
    if (selectedIds.length < 2) {
      setPropertyIDListError(true);
      setPropertyIDListHelperText("Please Select Min Two Property Id's");
      setLoading(false);
      validate = false;
    }
    if (validate) {
      let params = {
        groupName,
        propertyIdList: selectedIds,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.addInPropertyGroup,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response?.data.responseCode === "200") {
          toast.success("Property Group Created SuccessFully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        } else {
          alert(
            "Something went wrong while saving the Amenity Details. Please try again later!"
          );
        }
      } else if (response?.status === 401) {
        navigate("/logout");
      } else {
        alert(
          "Something went wrong while saving the Amenity Details. Please try again later!!"
        );
      }
    }
  };

  //My Listings
  useEffect(() => {
    const myListings = async () => {
      let params = {
        status: "Active",
        createdBy: cookies[config.cookieName]?.loginUserId,
      };
      const response = await invokeApi(
        config.apiDomains + apiList.allPropertyByStatusAndUserInDashboard,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          setPropertyList(response.data.dashboardProperties);
        } else {
          alert("An error occurred while fetching data!");
        }
      } else {
        alert("An error occurred while fetching data!!");
      }
    };
    if (fetching) {
      myListings();
      setFetching(false);
    }
  }, [cookies, fetching]);

  useEffect(() => {
    const getPropertyByGroupWise = async () => {
      let params = {};
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getPropertyByGroupWise,
          params,
          cookies
        );
        if (response) {
          setGroupDatas(response.data.propertyGroups);
        } else {
          console.error("No countries data in the response");
        }
      } catch (error) {
        console.error("An error occurred while fetching location:", error);
      }
    };
    if (groupDatasFetching) {
      getPropertyByGroupWise();
      setGrupDatasFetching(false);
    }
  }, [groupDatasFetching]);

  return (
    <>
      <PropertyManagerTabs tabActive={2}>
        <Box sx={{ p: 2, width: "100%" }}>
          <Button
            variant="contained"
            onClick={() => {
              setFetching(true);
              setAddNewPropertyModal(true);
            }}
          >
            Add
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ p: 2, mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#e7e7e7", color: "#fff" }}>
                <TableCell
                  sx={{
                    borderBottom: "3px solid #454545",
                    borderRight: "1px solid #ddd",
                    fontSize: "16px",
                    width: "10%",
                  }}
                >
                  Sl No
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    borderRight: "1px solid #ddd",
                    fontSize: "16px",
                  }}
                >
                  Group Name
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    borderRight: "1px solid #ddd",
                    fontSize: "16px",
                  }}
                >
                  Property Id's
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                    width: "10%",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupdatas
                ?.filter((item) => item.status === "Active")
                .map((items, index) => (
                  <TableRow key={items.id}>
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
                      {items.groupName}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "1px solid #ddd",
                        borderRight: "1px solid #ddd",
                      }}
                    >
                      {items.propertyIdList.join(", ")}
                    </TableCell>

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
                        onClick={() => {
                          setFetching(true);
                          setEditPropertyModal(true);
                        }}
                        sx={{ width: { xs: "100%", md: "100px" } }} // Full width on extra-small screens, fixed width on medium and larger
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PropertyManagerTabs>

      {/* below the modal is for adding Property Grouping   */}
      <Dialog
        open={addNewPropertyModal}
        onClose={() => setAddNewPropertyModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Add Property Grouping</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setAddNewPropertyModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Group Name"
            margin="normal"
            fullWidth
            error={groupNameFrror}
            helperText={groupnameHelperText}
            value={groupName}
            sx={{ mb: 2 }}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <Autocomplete
            multiple
            id="tags-outlined"
            options={propertyList.map((item) => item.propertyId)}
            // getOptionLabel={(option) => option.propertyId}
            defaultValue={[...selectedIds]}
            filterSelectedOptions
            onChange={handleChangeValue}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Property Id's"
                error={propertyIdListError}
                helperText={propertyIdListHelperText}
                placeholder="Favorites"
              />
            )}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <LoadingButton
              size="large"
              onClick={addInPropertyGroup}
              loading={loading}
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>

      {/* below the modal is for Edit Property Grouping   */}
      <Dialog
        open={editPropertyModal}
        onClose={() => setEditPropertyModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Edit Property Grouping</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setEditPropertyModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Group Name"
            margin="normal"
            fullWidth
            error={groupNameFrror}
            helperText={groupnameHelperText}
            value={groupName}
            sx={{ mb: 2 }}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <Autocomplete
            multiple
            id="tags-outlined"
            options={propertyList.map((item) => item.propertyId)}
            // getOptionLabel={(option) => option.propertyId}
            defaultValue={[...selectedIds]}
            filterSelectedOptions
            onChange={handleChangeValue}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Property Id's"
                error={propertyIdListError}
                helperText={propertyIdListHelperText}
                placeholder="Favorites"
              />
            )}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <LoadingButton
              size="large"
              onClick={addInPropertyGroup}
              loading={loading}
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UsersList;
