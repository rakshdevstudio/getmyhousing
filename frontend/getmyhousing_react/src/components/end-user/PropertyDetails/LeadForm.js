import { X, Check, Mail, User, Phone, Calendar, ArrowRight, Globe } from 'lucide-react';
import './LeadModal.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import mobileNoValidation, { countryCodeList, emailValidation } from "../../../common/common"
import { apiList, invokeApi } from '../../../apis/apiServices';
import { config } from '../../../config/config';
import { Bounce, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LeadForm = ({ isOpen, onClose, leadSource, propertyId, productUrl, leadProvided }) => {
    const [cookies] = useCookies();
    const { userData, userError } = useSelector(
        (state) => state.user
    );
    const [formData, setFormData] = useState({
        customerName: '',
        countryCode: '91',
        mobileNumber: '',
        email: '',
        scheduleDateTime: '',
    });
    let mobileValidate = mobileNoValidation(formData.mobileNumber);
    let emailValidate = emailValidation(formData.email);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => setAnimate(true), 50);
        } else {
            document.body.style.overflow = 'auto';
            setAnimate(false);
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailValidate) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (!mobileValidate) {
            newErrors.mobileNumber = 'Mobile number must be 10 digits';
        }

        if (!formData.scheduleDateTime.trim()) {
            newErrors.scheduleDateTime = 'Please select a date and time';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error message when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            let params = {
                email: formData.email,
                customerName: formData.customerName,
                mobileNumber: formData.mobileNumber,
                propertyId: propertyId,
                leadSource: leadSource,
                leadType: "Own",
                scheduleDateTime: formData.scheduleDateTime,
                countryCode: formData.countryCode,
                productUrl,
            };
            const response = await invokeApi(
                config.apiDomains + apiList.addLead,
                params,
                cookies
            );
            if (response.status >= 200 && response.status < 300) {
                if (response.data.responseCode === "200") {
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
                    resetForm();
                    onClose();
                    // leadProvided(propertyId);
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
        }
    };

    const resetForm = () => {
        setFormData({
            customerName: '',
            countryCode: '91',
            mobileNumber: '',
            email: '',
            scheduleDateTime: '',
        });
        setErrors({});
        setIsSubmitted(false);
    };

    useEffect(() => {
        if (userError) {
            alert(
                "Something went wrong while fetching user details. Please try again later!"
            );
        }
    }, [userError]);

    if (!isOpen) return null;
    return (
        <div className={`lead-modal-overlay ${animate ? 'active' : ''}`} onClick={onClose}>
            <div className={`lead-modal-container ${animate ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className="lead-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="lead-modal-content">
                    {!isSubmitted ? (
                        <>
                            <div className="lead-modal-header">
                                <div className="lead-modal-badge">Exclusive Offer</div>
                                <h2 className="lead-modal-title">Interested? Let’s Connect!</h2>
                                <p className="lead-modal-subtitle">
                                    Fill out the form below and our real estate expert will get in touch with you shortly.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="lead-modal-form">
                                <div className="form-group">
                                    <label htmlFor="customerName">Full Name</label>
                                    <div className="input-wrapper">
                                        <User size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            id="customerName"
                                            name="customerName"
                                            value={formData.customerName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={errors.customerName ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.customerName && <span className="error-message">{errors.customerName}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <div className="input-wrapper">
                                        <Mail size={18} className="input-icon" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="johndoe@example.com"
                                            className={errors.email ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mobileNumber">Mobile Number</label>
                                    <div className="phone-input-container">
                                        <div className="country-code-wrapper">
                                            <select
                                                id="countryCode"
                                                name="countryCode"
                                                value={formData.countryCode}
                                                onChange={handleChange}
                                                className="country-code-select"
                                            >
                                                {countryCodeList.map((country) => (
                                                    <option key={country.code} value={country.code}>
                                                        +{country.code} {country.iso}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="phone-wrapper">
                                            <Phone size={18} className="input-icon phone-icon" />
                                            <input
                                                type="tel"
                                                id="mobileNumber"
                                                name="mobileNumber"
                                                value={formData.mobileNumber}
                                                onChange={handleChange}
                                                placeholder="123 456 7890"
                                                className={errors.mobileNumber ? 'error' : ''}
                                            />
                                        </div>
                                    </div>
                                    {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="scheduleDateTime">Schedule Date & Time</label>
                                    <div className="input-wrapper">
                                        <Calendar size={18} className="input-icon" />
                                        <input
                                            type="datetime-local"
                                            id="scheduleDateTime"
                                            name="scheduleDateTime"
                                            value={formData.scheduleDateTime}
                                            onChange={handleChange}
                                            className={errors.scheduleDateTime ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.scheduleDateTime && <span className="error-message">{errors.scheduleDateTime}</span>}
                                </div>

                                {/* <div className="form-group">
                                    <label htmlFor="message">Your Message (Optional)</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="I'm interested in scheduling a viewing for this property..."
                                        rows="3"
                                    ></textarea>
                                </div> */}

                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="button-loading">Processing...</span>
                                    ) : (
                                        <>
                                            <span>Get Property Details</span>
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>

                                <p className="privacy-note">
                                    By submitting this form, you agree to our <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms-conditions">Terms of Service</Link>.
                                </p>
                            </form>
                        </>
                    ) : (
                        <div className="lead-modal-success">
                            <div className="success-icon">
                                <Check size={32} />
                            </div>
                            <h2>Thank You!</h2>
                            <p>Your information has been submitted successfully. Our agent will contact you shortly for your property viewing at your scheduled time.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeadForm