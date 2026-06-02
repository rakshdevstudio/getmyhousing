import { Box, Container, Grid, Typography } from '@mui/material'
import { Bounce, toast } from 'react-toastify';
import { config } from '../../../../config/config';
import { apiList, invokeApi } from '../../../../apis/apiServices';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import mobileNoValidation from '../../../../common/common';
import { useCookies } from 'react-cookie';
import "./HeroSection.css";

const HeroSection = ({ content }) => {
    const [cookies] = useCookies();
    const { userData } = useSelector(
        (state) => state.user
    );
    const { locationData } = useSelector(
        (state) => state.location
    );
    const zoneMappingData = locationData?.countries;
    const [formData, setFormData] = useState({
        email: userData?.user?.email || "",
        customerName: userData?.user?.fullName || "",
        mobileNumber: userData?.user?.mobileNumber || "",
        leadSource: content.leadSource,
        leadType: "Own",
        customerDistrict: userData?.user?.district || "",
        customerState: userData?.user?.state || "",
    })

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    let mobileValidate = mobileNoValidation(formData.mobileNumber);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        setErrors({ ...errors, [e.target.name]: "" })
    };

    // Validate form
    const validateForm = () => {
        let newErrors = {};

        if (!formData.customerName.trim()) newErrors.customerName = "Full Name is required.";

        // Mobile number validation (10 digits)
        if (!mobileValidate) {
            newErrors.mobileNumber = "Mobile Number is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addLead = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await invokeApi(
                config.apiDomains + apiList.addLead,
                formData,
                cookies
            );

            if (response) {
                if (
                    response.status === "200" ||
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
                    setFormData({
                        email: "",
                        customerName: "",
                        mobileNumber: "",
                        leadSource: content.leadSource,
                        leadType: "Own",
                        customerDistrict: "",
                        customerState: "",
                    })
                    setIsSubmitting(false);
                } else {
                    toast.error("Sorry, something went wrong. Please try again.", {
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
                    setIsSubmitting(false);
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.", {
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
            setIsSubmitting(false);
        }
    };
    return (
        <Box
            component="section"
            className="hero-section"
            sx={{ backgroundImage: `url(${content.heroSection.bannerImage})` }}
            aria-label="Professional cleaning services banner"
            loading="lazy"
        >
            <Box className="hero-overlay"></Box>
            <Container maxWidth="lg">
                <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} md={7} className="hero-content">
                        <Typography variant="h1" className="hero-title" sx={{ mb: 2 }}>
                            {content.heroSection.heroTitle}
                        </Typography>
                        <Typography variant="body1" className="hero-text" sx={{ mb: 2 }}>
                            {content.heroSection.heroTitleDes}
                        </Typography>
                        <ul className="hero-list" style={{ marginBottom: "24px" }}>
                            {content.heroSection.heroList.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <a href="tel:9900823404" className="hero-button">{content.heroSection.heroButton}</a>
                    </Grid>

                    <Grid item xs={12} md={5} className="hero-form-container">
                        <form className="form" onSubmit={addLead}>
                            <p className="service-form-title">{content.heroSection.formTitle}</p>

                            <div className="input-container">
                                <input placeholder="Full Name *" autoComplete="name" type="text" value={formData.customerName} name="customerName" onChange={handleChange} aria-label="Enter your full name" />
                                {errors.customerName && <p className="error">{errors.customerName}</p>}
                            </div>

                            <div className="input-container">
                                <input placeholder="Phone Number *" autoComplete="tel" type="tel" name="mobileNumber" value={formData.mobileNumber}
                                    onChange={handleChange} aria-label="Enter your Phone Number" />
                                {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
                            </div>
                            <div className="input-container">
                                <input placeholder="Enter email" type="email" autoComplete="email" name="email" value={formData.email}
                                    onChange={handleChange} aria-label="Enter your email" />
                            </div>
                            <div className="input-container">
                                <select value={formData.customerState} name="customerState" aria-label="Enter your state" onChange={handleChange}>
                                    <option value="">Select State</option>
                                    {zoneMappingData?.find((item) => item.countryName === "India")
                                        ?.states.map((item, index) => (
                                            <option key={index} value={item.stateName}>{item.stateName}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="input-container">
                                <select required
                                    aria-label="Enter your City"
                                    name="customerDistrict"
                                    onChange={handleChange}
                                    value={formData.customerDistrict}
                                    disabled={!formData.customerState}
                                >
                                    <option value="">Select District</option>
                                    {zoneMappingData
                                        ?.find((item) => item.countryName === "India")
                                        ?.states?.find((state) => state.stateName === formData.customerState)
                                        ?.districts?.map((district, index) => (
                                            <option key={index} value={district.districtName}>
                                                {district.districtName}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <button className="submit" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Request a Free Consultation"}
                            </button>
                            <p className="signup-link">
                                Need immediate assistance?
                                <a href={"tel:" + config.mobileNumber1}> Call us now</a>
                            </p>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    )
}

export default HeroSection