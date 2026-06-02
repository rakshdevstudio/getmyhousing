import React, { useState } from 'react'
import image from "../assets/property-management-enquiry.jpg";
import { Check, ChevronDown } from "lucide-react";
import { Bounce, toast } from 'react-toastify';
import { config } from '../../../../config/config';
import { apiList, invokeApi } from '../../../../apis/apiServices';
import { useSelector } from 'react-redux';
import mobileNoValidation from '../../../../common/common';
import { useCookies } from 'react-cookie';
import "../../../../styles/ServicesEnquirySection.css";

const EnquirySection = ({ content }) => {
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
    const [isStateOpen, setIsStateOpen] = useState(false);
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    let mobileValidate = mobileNoValidation(formData.mobileNumber);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        setErrors({ ...errors, [e.target.name]: "" })
    };

    const handleStateSelect = (state) => {
        setFormData(prev => ({ ...prev, customerState: state }));
        setIsStateOpen(false);
        setErrors({ ...errors, customerState: "" })
    };

    const handleCitySelect = (city) => {
        setFormData(prev => ({ ...prev, customerDistrict: city }));
        setIsCityOpen(false);
        setErrors({ ...errors, customerDistrict: "" })
    };

    // Validate form
    const validateForm = () => {
        let newErrors = {};

        if (!formData.customerName.trim()) newErrors.customerName = "Full Name is required.";

        // Mobile number validation (10 digits)
        if (!mobileValidate) {
            newErrors.mobileNumber = "Mobile Number is required.";
        }

        if (!formData.customerState.trim()) newErrors.customerState = "State is required.";

        if (!formData.customerDistrict.trim()) newErrors.customerDistrict = "District is required.";

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
                        leadSource: "Property Management",
                        leadType: "Own",
                        customerDistrict: "",
                        customerState: "",
                    })
                    setIsSubmitting(false);
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
                    setIsSubmitting(false);
                }
            } else {
                alert("Something Went Wrong");
                setIsSubmitting(false);
            }
        } catch (error) {
            toast.error("An error occurred while fetching location!", {
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
        <section className="enquiry-section" id="enquiry-section">
            <div className="container">
                <div className="enquiry-grid">
                    {/* Left side - Image and branding */}
                    <div className="enquiry-image-container">
                        <div className="image-wrapper">
                            <div className="blur-circle-top"></div>
                            <div className="blur-circle-bottom"></div>

                            <div className="image-frame">
                                <img
                                    src={image}
                                    alt="Customer Support"
                                    className="main-image"
                                    loading="lazy"
                                />
                            </div>

                            <div className="badge">
                                <div className="badge-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div className="badge-text">
                                    <p>Premium Support</p>
                                    <p>24/7 Customer Care</p>
                                </div>
                            </div>
                        </div>

                        <div className="feature">
                            <div className="feature-header">
                                <div className="feature-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                        <path d="M8 12L11 15L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">Quick Response</h3>
                            </div>
                            <p className="feature-description">
                                Our dedicated team ensures your queries are addressed promptly and effectively.
                            </p>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="form-container">
                        <div className="form-blur"></div>

                        <div className="form-card">
                            <div className="form-header">
                                <div className="form-title-container">
                                    <div className="form-title-indicator"></div>
                                    <h2 className="form-title">Get in Touch</h2>
                                </div>
                                <p className="form-subtitle">
                                    Fill in your details below and we'll get back to you as soon as possible.
                                </p>
                            </div>

                            <form onSubmit={addLead} className="enquiry-form">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        id="name"
                                        name="customerName"
                                        className={`form-input ${errors.customerName ? 'input-error' : ''}`}
                                        placeholder="Enter your name"
                                        value={formData.customerName}
                                        onChange={handleChange}
                                    />
                                    {errors.customerName && (
                                        <p className="error-message">{errors.customerName}</p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                    <input
                                        id="mobile"
                                        name="mobileNumber"
                                        className={`form-input ${errors.mobileNumber ? 'input-error' : ''}`}
                                        placeholder="Enter 10-digit mobile number"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        maxLength={10}
                                    />
                                    {errors.mobileNumber && (
                                        <p className="error-message">{errors.mobileNumber}</p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-input"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="two-columns">
                                    <div className="form-group">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <div className="select-container">
                                            <button
                                                type="button"
                                                id="state"
                                                className={`select-button ${formData.customerState ? 'select-value' : 'select-placeholder'} ${errors.customerState ? 'input-error' : ''}`}
                                                onClick={() => setIsStateOpen(!isStateOpen)}
                                            >
                                                {formData.customerState || "Select State"}
                                                <ChevronDown className="select-icon" size={16} />
                                            </button>

                                            {isStateOpen && (
                                                <div className="dropdown">
                                                    {zoneMappingData
                                                        ?.find((item) => item.countryName === "India")
                                                        ?.states.map((ite) => ite.stateName).map((state, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                className={`dropdown-item ${formData.customerState === state ? 'dropdown-item-selected' : ''}`}
                                                                onClick={() => handleStateSelect(state)}
                                                            >
                                                                {state}
                                                                {formData.customerState === state && <Check size={16} />}
                                                            </button>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                        {errors.customerState && (
                                            <p className="error-message">{errors.customerState}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <div className="select-container">
                                            <button
                                                type="button"
                                                id="city"
                                                className={`select-button ${formData.customerDistrict ? 'select-value' : 'select-placeholder'} ${!formData.customerState ? 'select-button-disabled' : ''} ${errors.customerDistrict ? 'input-error' : ''}`}
                                                onClick={() => formData.customerState && setIsCityOpen(!isCityOpen)}
                                                disabled={!formData.customerState}
                                            >
                                                {formData.customerDistrict || "Select City"}
                                                <ChevronDown className="select-icon" size={16} />
                                            </button>

                                            {isCityOpen && (
                                                <div className="dropdown">
                                                    {zoneMappingData
                                                        ?.find((item) => item.countryName === "India")
                                                        ?.states?.find(
                                                            (state) => state.stateName === formData.customerState
                                                        )?.districts.length > 0 ? (
                                                        zoneMappingData
                                                            ?.find((item) => item.countryName === "India")
                                                            ?.states?.find(
                                                                (state) => state.stateName === formData.customerState
                                                            )?.districts?.map((district) => district.districtName)?.map((city, index) => (
                                                                <button
                                                                    key={index}
                                                                    type="button"
                                                                    className={`dropdown-item ${formData.customerDistrict === city ? 'dropdown-item-selected' : ''}`}
                                                                    onClick={() => handleCitySelect(city)}
                                                                >
                                                                    {city}
                                                                    {formData.customerDistrict === city && <Check size={16} />}
                                                                </button>
                                                            ))
                                                    ) : (
                                                        <div className="dropdown-message">No cities available</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {errors.customerDistrict && (
                                            <p className="error-message">{errors.customerDistrict}</p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EnquirySection