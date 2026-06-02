import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import DashBoardNavbar from "../generic/dashboard/DashBoardNavbar";
import DashBoardHeader from "../generic/dashboard/DashBoardHeader";
import DataTable from "react-data-table-component";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { config } from "../../config/config";
import { apiList, invokeApi } from "../../apis/apiServices";
import { Bounce, toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";

const columns = [
  {
    name: "Sl No",
    selector: (row, idx) => idx + 1,
    sortable: true,
    width: "15%",
  },
  {
    name: "Country",
    selector: (row) => row.country,
    sortable: true,
  },
  {
    name: "State",
    selector: (row) => row.state,
  },
  {
    name: "City/District",
    selector: (row) => row.district,
  },
  {
    name: "Pincode",
    selector: (row) => row.pincode,
  },
];

const Address = () => {
  const [cookies] = useCookies();

  const { locationData } = useSelector(
    (state) => state.location
  );

  const [loading, setLoading] = useState(true);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTextDB, setSearchTextDB] = useState("");
  const [isCountryAddressModal, setIsCountryAddressModal] = useState(false);
  const [isStateAddressModal, setIsStateAddressModal] = useState(false);
  const [isCityAddressModal, setIsCityAddressModal] = useState(false);
  const [isPincodeAddressModal, setIsPincodeAddressModal] = useState(false);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [countryError, setCountryError] = useState(false);
  const [countryHelperText, setCountryHelperText] = useState("");

  const [stateError, setStateError] = useState(false);
  const [stateHelperText, setStateHelperText] = useState("");

  const [cityError, setCityError] = useState(false);
  const [cityHelperText, setCityHelperText] = useState("");

  const [pincodeError, setPincodeError] = useState(false);
  const [pincodeHelperText, setPincodeHelperText] = useState("");

  const zoneMappingData = locationData?.countries;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchTextDB(search);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const getAddress = async () => {
      const params = {
        pageNumber: page,
        pageSize: rowsPerPage,
        search: searchTextDB,
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getAddress,
          params,
          cookies
        );
        if (response.status === 200) {
          const { content, pageNumber, pageSize, totalElement } =
            response.data.address;
          setAddressList(content);
          setPage(pageNumber);
          setRowsPerPage(pageSize);
          setTotalRows(totalElement);
          setLoading(false);
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
        toast.error("error while fetching address data in dashboard", {
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
    if (isInitialLoad.current) {
      getAddress();
      isInitialLoad.current = false;
    }
  }, [page, rowsPerPage, searchTextDB]);

  function handleChangeRowPerPage(change) {
    setRowsPerPage(change);
  }

  function handleChangePage(change) {
    setPage(change);
  }

  const FieldValidation = () => {
    let validate = true;
    setAddressLoading(true);
    if (!country) {
      setCountryError(true);
      setCountryHelperText("Please Enter Country Name");
      validate = false;
      setAddressLoading(false);
    }
    if (!state) {
      setStateError(true);
      setStateHelperText("Please Enter State Name");
      validate = false;
      setAddressLoading(false);
    }
    if (!city) {
      setCityError(true);
      setCityHelperText("Please Enter City Name");
      validate = false;
      setAddressLoading(false);
    }
    if (!pincode) {
      setPincodeError(true);
      setPincodeHelperText("Please Enter Pincode");
      validate = false;
      setAddressLoading(false);
    }

    if (validate) {
      return true;
    } else {
      return false;
    }
  };

  function clearFields() {
    setCountry("");
    setCountryError(false);
    setCountryHelperText("");

    setState("");
    setStateError(false);
    setStateHelperText("");

    setCity("");
    setCityError(false);
    setCityHelperText("");

    setPincode("");
    setPincodeError(false);
    setPincodeHelperText("");
  }

  const addAddress = async () => {
    const validationResult = FieldValidation();
    if (validationResult) {
      let params = {
        country,
        state,
        district: city,
        pincode,
      };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.addAddress,
          params,
          cookies
        );
        if (response.status === 200) {
          if (
            response.data.responseCode === "200" &&
            response.data.responseMessage === "Successful"
          ) {
            toast.success("Address Was Added Successful", {
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
            clearFields();
            setPage(0);
            setAddressLoading(false);
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
            setAddressLoading(false);
          }
        } else if (response.data.responseCode === "400") {
          toast.error(response.data.responseMessage, {
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
          setAddressLoading(false);
        }
      } catch (error) {
        toast.error("An error occurred while adding location!", {
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
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          position: "fixed",
          width: "100%",
        }}
      >
        <DashBoardNavbar />
        <Box
          component="header"
          sx={{
            flexGrow: 1,
            p: 2,
            backgroundColor: "#F6F8FB",
            overflowX: "auto",
          }}
        >
          <DashBoardHeader />
          <DataTable
            columns={columns}
            data={addressList}
            progressPending={loading}
            pagination
            paginationServer
            paginationPerPage={rowsPerPage}
            paginationTotalRows={totalRows}
            paginationRowsPerPageOptions={[20, 30, 40, 50]}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowPerPage}
            subHeader
            fixedHeader
            highlightOnHover
            subHeaderComponent={
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    size="small"
                    onClick={() => setIsCountryAddressModal(true)}
                  >
                    Add Country
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    size="small"
                    onClick={() => setIsStateAddressModal(true)}
                  >
                    Add State
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    size="small"
                    onClick={() => setIsCityAddressModal(true)}
                  >
                    Add District
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    size="small"
                    onClick={() => setIsPincodeAddressModal(true)}
                  >
                    Add Pincode
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    size="small"
                    placeholder="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ my: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      style: {
                        borderRadius: 25,
                        border: "none",
                        outline: "none",
                        backgroundColor: "#fff",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            }
          />
        </Box>
      </Box>
      {/* add new address modal */}
      <Dialog
        open={isCountryAddressModal}
        onClose={() => setIsCountryAddressModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Add Address</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setIsCountryAddressModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Enter Country Name"
            fullWidth
            onChange={(e) => {
              setCountry(e.target.value);
              setCountryError(false);
              setCountryHelperText("");
            }}
            error={countryError}
            margin="normal"
            helperText={countryHelperText}
            value={country}
          />
          <TextField
            label="Enter State Name"
            fullWidth
            onChange={(e) => {
              setState(e.target.value);
              setStateError(false);
              setStateHelperText("");
            }}
            error={stateError}
            margin="normal"
            helperText={stateHelperText}
            value={state}
          />
          <TextField
            label="Enter City Name"
            fullWidth
            onChange={(e) => {
              setCity(e.target.value);
              setCityError(false);
              setCityHelperText("");
            }}
            error={cityError}
            margin="normal"
            helperText={cityHelperText}
            value={city}
          />
          <TextField
            label="Enter Pincode"
            fullWidth
            onChange={(e) => {
              setPincode(e.target.value);
              setPincodeError(false);
              setPincodeHelperText("");
            }}
            error={pincodeError}
            margin="normal"
            helperText={pincodeHelperText}
            value={pincode}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <LoadingButton
              size="large"
              onClick={addAddress}
              loading={addressLoading}
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>

      {/* add new state modal  */}
      <Dialog
        open={isStateAddressModal}
        onClose={() => setIsStateAddressModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Add Address</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setIsStateAddressModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Autocomplete
            id="outlined-select-country"
            options={zoneMappingData?.map((item) => item.countryName) || []}
            value={country}
            freeSolo
            onChange={(event, newValue) => {
              setCountry(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Please select your country"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
          />
          <TextField
            label="Enter State Name"
            fullWidth
            onChange={(e) => {
              setState(e.target.value);
              setStateError(false);
              setStateHelperText("");
            }}
            error={stateError}
            margin="normal"
            helperText={stateHelperText}
            value={state}
          />
          <TextField
            label="Enter City Name"
            fullWidth
            onChange={(e) => {
              setCity(e.target.value);
              setCityError(false);
              setCityHelperText("");
            }}
            error={cityError}
            margin="normal"
            helperText={cityHelperText}
            value={city}
          />
          <TextField
            label="Enter Pincode"
            fullWidth
            onChange={(e) => {
              setPincode(e.target.value);
              setPincodeError(false);
              setPincodeHelperText("");
            }}
            error={pincodeError}
            margin="normal"
            helperText={pincodeHelperText}
            value={pincode}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <LoadingButton
              size="large"
              onClick={addAddress}
              loading={addressLoading}
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>

      {/* add new district modal  */}
      <Dialog
        open={isCityAddressModal}
        onClose={() => setIsCityAddressModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Add Address</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setIsCityAddressModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Autocomplete
            id="outlined-select-country"
            options={zoneMappingData?.map((item) => item.countryName) || []}
            value={country}
            freeSolo
            onChange={(event, newValue) => {
              setCountry(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Please select your country"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
          />
          <Autocomplete
            id="outlined-select-state"
            options={
              zoneMappingData
                ?.find((item) => item.countryName === country)
                ?.states?.map((state) => state.stateName) || []
            }
            value={state}
            freeSolo
            disabled={!country}
            onChange={(event, newValue) => {
              setState(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Please select your state"
                variant="outlined"
                fullWidth
                error={stateError}
                helperText={stateHelperText}
                onChange={(event) => {
                  setState(event.target.value);
                }}
              />
            )}
          />
          <TextField
            label="Enter City Name"
            fullWidth
            onChange={(e) => {
              setCity(e.target.value);
              setCityError(false);
              setCityHelperText("");
            }}
            error={cityError}
            margin="normal"
            helperText={cityHelperText}
            value={city}
          />
          <TextField
            label="Enter Pincode"
            fullWidth
            onChange={(e) => {
              setPincode(e.target.value);
              setPincodeError(false);
              setPincodeHelperText("");
            }}
            error={pincodeError}
            margin="normal"
            helperText={pincodeHelperText}
            value={pincode}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <LoadingButton
              size="large"
              onClick={addAddress}
              loading={addressLoading}
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>
      {/* add new pincode modal  */}
      <Dialog
        open={isPincodeAddressModal}
        onClose={() => setIsPincodeAddressModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Add Address</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setIsPincodeAddressModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Autocomplete
            id="outlined-select-country"
            options={zoneMappingData?.map((item) => item.countryName) || []}
            value={country}
            freeSolo
            onChange={(event, newValue) => {
              setCountry(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Please select your country"
                variant="outlined"
                error={countryError}
                helperText={countryHelperText}
                margin="normal"
                fullWidth
              />
            )}
          />
          <Autocomplete
            id="outlined-select-state"
            options={
              zoneMappingData
                ?.find((item) => item.countryName === country)
                ?.states?.map((state) => state.stateName) || []
            }
            value={state}
            freeSolo
            disabled={!country}
            onChange={(event, newValue) => {
              setState(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Please select your state"
                variant="outlined"
                fullWidth
                error={stateError}
                margin="normal"
                helperText={stateHelperText}
              />
            )}
          />
          <Autocomplete
            id="outlined-select-district"
            options={zoneMappingData
              ?.find((item) => item.countryName === country)
              ?.states?.find((stat) => stat.stateName === state)
              ?.districts?.map((district) => district.districtName) || []}
            value={city}
            disabled={!state}
            freeSolo
            onChange={(event, newValue) => {
              setCity(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Please select your city/district"
                variant="outlined"
                fullWidth
                margin="normal"
                error={cityError}
                helperText={cityHelperText}
              />
            )}
          />
          <TextField
            label="Enter Pincode"
            fullWidth
            onChange={(e) => {
              setPincode(e.target.value);
              setPincodeError(false);
              setPincodeHelperText("");
            }}
            error={pincodeError}
            margin="normal"
            helperText={pincodeHelperText}
            value={pincode}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <LoadingButton
              size="large"
              onClick={addAddress}
              loading={addressLoading}
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Address;
