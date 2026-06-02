import { Autocomplete, Box, Button, Drawer, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashBoardNavbar from '../../../generic/dashboard/DashBoardNavbar'
import DashBoardHeader from '../../../generic/dashboard/DashBoardHeader'
import { useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab'
import CloseIcon from "@mui/icons-material/Close";
import { apiList, invokeApi } from '../../../../apis/apiServices'
import { config } from '../../../../config/config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import mobileNoValidation from '../../../../common/common'

const Owner = () => {
    const [cookies] = useCookies();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [owners, setOwners] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        whatsappNumber: "",
        email: "",
        pincode: "",
        address: "",
        state: "",
        city: "",
        country: "India",
    });
    const [errors, setErrors] = useState({});
    const { userData, userError } = useSelector(
        (state) => state.user
    );

    const { locationData } = useSelector(
        (state) => state.location
    );

    const zoneMappingData = locationData?.countries || [];

    const handleChangeModal = () => setIsModalOpen(!isModalOpen);

    let mobileValidate = mobileNoValidation(formData.mobileNumber);

    // Validate form
    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";

        // Mobile number validation (10 digits)
        if (!mobileValidate) {
            newErrors.mobileNumber = "Mobile Number is required.";
        }

        // Whatsapp number validation (10 digits)
        if (!mobileValidate) {
            newErrors.whatsappNumber = "Whatsapp Number is required.";
        }

        if (!formData.email.trim()) newErrors.email = "email is required.";

        if (!formData.address.trim()) newErrors.address = "address is required.";

        if (!formData.pincode.trim()) newErrors.pincode = "pincode is required.";

        if (!formData.state.trim()) newErrors.state = "State is required.";

        if (!formData.city.trim()) newErrors.city = "District is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        let response = await invokeApi(
            config.apiDomains + apiList.addOwner,
            formData,
            cookies
        );
        if (response.status >= 200 && response.status < 300) {
            if (response.data.responseCode === "200") {
                toast.success("Owner Detail Saved SuccessFully!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setFormData({
                    fullName: "",
                    mobileNumber: "",
                    whatsappNumber: "",
                    email: "",
                    pincode: "",
                    address: "",
                    state: "",
                    city: "",
                    country: "India",
                })
                setIsModalOpen(false);
                setIsLoading(false);
                setIsFetching(true);
            } else {
                alert(
                    "Something went wrong while saving the owner Details. Please try again later!"
                );
            }
        } else if (response.status === 401) {
            navigate("/logout");
        } else {
            alert(response.data.responseMessage);
        }
    };

    useEffect(() => {
        const getOwners = async () => {
            let params = {};
            let response = await invokeApi(
                config.apiDomains + apiList.getOwnersByROle,
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
        if (isFetching) {
            setIsFetching(false);
            getOwners();
        }
    }, [cookies, isFetching]);

    useEffect(() => {
        if (userError) {
            alert(
                "Something went wrong while fetching user details. Please try again later!"
            );
        }
    }, [userError]);
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
                        {(userData?.user?.roles.includes('Admin') || userData?.user?.roles.includes('Agent') || userData?.user?.roles.includes('Associate')) && (
                            <Box sx={{ p: 2, width: "100%" }}>
                                <Button variant="contained" onClick={handleChangeModal}>
                                    Add Owner
                                </Button>
                            </Box>
                        )}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow
                                        style={{ backgroundColor: "#e7e7e7", color: "#fff" }}
                                    >
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
                                            Phone
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                borderBottom: "3px solid #454545",
                                                borderRight: "1px solid #ddd",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Whatsapp
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
                                            Address
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                borderBottom: "3px solid #454545",
                                                borderRight: "1px solid #ddd",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Pincode
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                borderBottom: "3px solid #454545",
                                                borderRight: "1px solid #ddd",
                                                fontSize: "16px",
                                            }}
                                        >
                                            City
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                borderBottom: "3px solid #454545",
                                                borderRight: "1px solid #ddd",
                                                fontSize: "16px",
                                            }}
                                        >
                                            State
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {owners.map((o, i) => (
                                        <TableRow key={o.id || o.email || i}>
                                            <TableCell
                                                style={{
                                                    borderBottom: "1px solid #ddd",
                                                    borderRight: "1px solid #ddd",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {o.fullName}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    borderBottom: "1px solid #ddd",
                                                    borderRight: "1px solid #dddd",
                                                }}
                                            >
                                                {o.mobileNumber}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    borderBottom: "1px solid #ddd",
                                                    borderRight: "1px solid #ddd",
                                                }}
                                            >
                                                {o.whatsappNumber}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    borderBottom: "1px solid #ddd",
                                                    borderRight: "1px solid #ddd",
                                                }}
                                            >
                                                {o.email}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    borderBottom: "1px solid #ddd",
                                                    borderRight: "1px solid #ddd",
                                                }}
                                            >
                                                {o.address}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    borderBottom: "1px solid #ddd",
                                                    borderRight: "1px solid #ddd",
                                                }}
                                            >
                                                {o.pincode}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    borderBottom: "1px solid #ddd",
                                                    borderRight: "1px solid #ddd",
                                                }}
                                            >
                                                {o.city}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    borderBottom: "1px solid #ddd",
                                                    borderRight: "1px solid #ddd",
                                                }}
                                            >
                                                {o.state}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                </Box>
            </Box>

            {/* Below the Add owner Drawer */}
            <Drawer
                anchor="right"
                open={isModalOpen}
                onClose={handleChangeModal}
                elevation={3}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
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
                        <Typography variant="h6">Owner</Typography>
                        <IconButton onClick={handleChangeModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <TextField
                            label="Enter Owner Name"
                            margin="normal"
                            fullWidth
                            error={errors.fullName}
                            helperText={errors.fullName}
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                        <TextField
                            label="Enter Phone Number"
                            margin="normal"
                            fullWidth
                            value={formData.mobileNumber}
                            error={errors.mobileNumber}
                            helperText={errors.mobileNumber}
                            inputProps={{ maxLength: 10 }}
                            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        />
                        <TextField
                            label="Enter Whatsapp Number"
                            margin="normal"
                            fullWidth
                            value={formData.whatsappNumber}
                            error={errors.whatsappNumber}
                            helperText={errors.whatsappNumber}
                            inputProps={{ maxLength: 10 }}
                            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        />
                        <TextField
                            label="Enter Email ID"
                            margin="normal"
                            fullWidth
                            error={errors.email}
                            helperText={errors.email}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <TextField
                            label="Enter Address"
                            margin="normal"
                            fullWidth
                            error={errors.address}
                            helperText={errors.address}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                        <TextField
                            label="Enter Pincode"
                            margin="normal"
                            fullWidth
                            value={formData.pincode}
                            error={errors.pincode}
                            helperText={errors.pincode}
                            inputProps={{ maxLength: 6 }}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        />
                        <Autocomplete
                            id="outlined-select-state"
                            options={
                                zoneMappingData?.find((item) => item.countryName === formData.country)
                                    ?.states?.map((ite) => ite.stateName) || []
                            }
                            value={formData.state || null}
                            onChange={(event, newValue) => {
                                setFormData({ ...formData, state: newValue });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Please select owner state"
                                    error={errors.state}
                                    helperText={errors.state}
                                    margin="normal"
                                    variant="outlined"
                                />
                            )}
                        />
                        <Autocomplete
                            id="outlined-select-district"
                            options={(
                                zoneMappingData
                                    ?.find((item) => item.countryName === formData.country)
                                    ?.states?.find(
                                        (state) => state.stateName === formData.state
                                    )?.districts || []
                            ).map((district) => district.districtName)}
                            value={formData.city || null}
                            disabled={!formData.state}
                            onChange={(event, newValue) => {
                                setFormData({ ...formData, city: newValue });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Please select owner city / district"
                                    variant="outlined"
                                    error={errors.city}
                                    helperText={errors.city}
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
                            Save
                        </LoadingButton>
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}

export default Owner
