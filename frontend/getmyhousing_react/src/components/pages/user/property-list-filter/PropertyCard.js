import { Box, Divider, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { formatSegment, PriceFormatter } from '../../../../common/common';
import { Facebook, LinkedIn, Twitter, WhatsApp } from "@mui/icons-material";
import { ChevronUp, ChevronDown, Clock } from "lucide-react"
import CallIcon from "@mui/icons-material/Call";
import { config } from '../../../../config/config';
import "../../../../styles/propCard.css";

const PropertyCard = ({ index, listings, setPropertyId, setLeadModal, setLeadSource }) => {
    const navigate = useNavigate();
    const [showOtherUnits, setShowOtherUnits] = useState(false);

    const handleImageError = (e) => {
        e.target.src = "/media/images/empty-property-image.jpg"; // Replace with the path to your default image
    };

    function callButtonHandle(propertyId, propertyType) {
        setPropertyId(propertyId);
        setLeadModal(true);
        setLeadSource(propertyType);
    }

    function handleNavigateProperty(property) {
        navigate(`/property/${formatSegment(property.listingType)}/${formatSegment(property.propertyName)}/${formatSegment(property.buildingType + "-" + property.propertyType + "-in-" + property.locality + "-" + property.city)}/${property.propertyId}`)
    }

    function dateFormate(unformatedate) {
        const date = new Date(unformatedate);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-based
        const year = date.getFullYear();

        return day + "/" + month + "/" + year
    }
    return (
        <Grid
            container
            key={index}
            spacing={2}
            sx={{
                display: "flex",
                flexDirection: { md: "row", xs: "column" },
                mb: 4,
                position: "relative",
                border: "1px solid rgba(241,75,75,0.3)",
                borderRadius: "16px",
                maxWidth: "700px",
                backgroundColor: "white",
                transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                    boxShadow: "0 1px 12px -4px rgba(0, 0, 0, 0.5)", // Red box shadow
                    transform: "scale(1.01)", // Slight zoom effect
                },
            }}
        >
            {/* below the grid property is include the proeprty image  */}
            <Grid item xs={12} md={4}>
                <Box
                    className={`property-main-image-container ${listings.approvalStatus === "Completed"
                        ? "completed-property"
                        : null
                        }`}
                >
                    <Link
                        to={`/property/${formatSegment(
                            listings.listingType
                        )}/${formatSegment(
                            listings.propertyName
                        )}/${formatSegment(
                            listings.buildingType +
                            "-" +
                            listings.propertyType +
                            "-in-" +
                            listings.locality +
                            "-" +
                            listings.city
                        )}/${listings.propertyId}`}
                    >
                        <img
                            src={listings.imageUrl}
                            loading="lazy"
                            alt="Property images"
                            style={{ width: "100%", objectFit: "cover", height: "12rem" }}
                            onError={handleImageError}
                        />
                        {listings.approvalStatus === "Completed" && (
                            <div className="watermark">Not Available</div>
                        )}
                    </Link>
                </Box>
            </Grid>
            <Grid item xs={12} md={8}>
                <Link
                    to={`/property/${formatSegment(
                        listings.listingType
                    )}/${formatSegment(
                        listings.propertyName
                    )}/${formatSegment(
                        listings.buildingType +
                        "-" +
                        listings.propertyType +
                        "-in-" +
                        listings.locality +
                        "-" +
                        listings.city
                    )}/${listings.propertyId}`}
                    style={{
                        textDecoration: "none",
                    }}
                >
                    {/* below the typography have the title of the property like listingtype, property type */}
                    <Box className="property-title-container">
                        <Typography variant="h1">
                            {listings?.title}
                        </Typography>
                    </Box>
                    {/* below the box includes the property name , address, and price details  */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Mulish, sans-serif",
                                    color: "var(--BG-Color-5, #DB282F)",
                                    fontSize: { md: "14px", xs: "13px" },
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "normal",
                                    mt: "10px",
                                }}
                            >
                                {listings.propertyName}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Mulish, sans-serif",
                                    color: "var(--Text-Color-Grey-Bold, #333)",
                                    fontSize: { md: "14px", xs: "13.5px" },
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "normal",
                                    mt: 0.5,
                                }}
                            >
                                {listings.locality
                                    ? listings.locality + ", "
                                    : null}
                                {listings.city}
                                {listings.pincode
                                    ? " - " + listings.pincode
                                    : null}
                            </Typography>
                        </Box>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            color="red"
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                color: "red",
                                fontWeight: 800,
                                fontSize: "15px",
                            }}
                        >
                            {PriceFormatter(listings.rent)}
                        </Typography>
                    </Box>
                </Link>
                <Box
                    sx={{
                        width: "100%",
                        overflow: "auto",
                        mx: 1,
                        mt: { md: 3, xs: 1 },
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        pt: 2,
                        zIndex: 2,
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                        "-ms-overflow-style": "none", // IE and Edge
                        "scrollbar-width": "none", // Firefox
                    }}
                >
                    {listings.numOfBedrooms && (
                        <Box
                            sx={{
                                backgroundColor: "#EAEAEA",
                                display: "inline-block",
                                px: 1.5,
                                py: 0.8,
                                borderRadius: "8px",
                                mr: 1,
                            }}
                        >
                            {listings.numOfBedrooms !== "Studio" ||
                                listings.numOfBedrooms !== "1 RK"
                                ? listings.numOfBedrooms + " BHK"
                                : listings.numOfBedrooms}
                        </Box>
                    )}
                    {listings.superBuiltupArea && (
                        <Box
                            sx={{
                                backgroundColor: "#EAEAEA",
                                display: "inline-block",
                                px: 1.5,
                                py: 0.8,
                                borderRadius: "8px",
                                mr: 1,
                            }}
                        >
                            {listings.superBuiltupArea +
                                " " +
                                listings.areaUnit}
                        </Box>
                    )}
                    {listings.furnishingType && (
                        <Box
                            sx={{
                                backgroundColor: "#EAEAEA",
                                display: "inline-block",
                                px: 1.5,
                                py: 0.7,
                                borderRadius: "8px",
                                mr: 1,
                            }}
                        >
                            {listings.furnishingType}
                        </Box>
                    )}
                    {listings.positionStatus && (
                        <Box
                            sx={{
                                backgroundColor: "#EAEAEA",
                                display: "inline-block",
                                px: 1.5,
                                py: 0.7,
                                borderRadius: "8px",
                                mr: 1,
                            }}
                        >
                            {listings.positionStatus}
                        </Box>
                    )}
                </Box>
                {listings.includedGroupProperty && listings.includedGroupProperty.length > 0 && (
                    <div className="property-card-other-unit">
                        <button
                            onClick={() => setShowOtherUnits(!showOtherUnits)}
                            className="property-card-other-unit-accordation"
                        >
                            Same Property (Other Options)
                            {showOtherUnits ? (
                                <ChevronUp className="property-card-up-arrow" />
                            ) : (
                                <ChevronDown className="property-card-down-arrow" />
                            )}
                        </button>

                        {showOtherUnits && (
                            <div className="other-unit-container">
                                {listings.includedGroupProperty.map((unit, index) => (
                                    <div
                                        onClick={() => handleNavigateProperty(unit)}
                                        key={index}
                                        className="item"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div>
                                            <p className="unit-no-of-bhk">{unit.numOfBedrooms && (unit.numOfBedrooms === "Studio" || unit.numOfBedrooms === "1 RK"
                                                ? unit.numOfBedrooms
                                                : `${unit.numOfBedrooms} BHK`)}
                                            </p>
                                            <p className="unit-area">{unit?.builtupPlotArea ||
                                                unit.carpetArea ||
                                                unit.salebleArea ||
                                                unit.superBuiltupArea ||
                                                unit.plotArea}{" "}
                                                {unit.areaUnit} {unit.floor && `• ${unit.floor}`}</p>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <p style={{ fontWeight: "500", color: "#DC2626" }}>
                                                ₹{unit.rent?.toLocaleString('en-IN')}
                                            </p>
                                            <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                                                5+ amenities
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </Grid>
            <Grid container>
                <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{ ml: 1, mb: 1, mt: 0.8 }}
                >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Box sx={{ flexGrow: 1, m: "auto" }}>
                            <div>
                                <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "#111827" }}>{listings?.username}</p>
                                <p style={{ fontSize: "0.75rem", color: "#4B5563" }}>{listings?.userRole}</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem", fontSize: "0.75rem", color: "#6B7280" }}>
                                <Clock style={{ height: '0.75rem', width: "0.75rem", marginRight: "0.25rem" }} />
                                {dateFormate(listings?.createdDate)}
                            </div>
                        </Box>
                        {listings.approvalStatus === "Completed" && (
                            <div className="watermark-highlight">
                                Not Available
                            </div>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: "auto",
                                mr: 1,
                                alignContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Link
                                to={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin +
                                    "/property/" +
                                    formatSegment(listings.listingType) +
                                    "/" +
                                    formatSegment(listings.propertyName) +
                                    "/" +
                                    formatSegment(
                                        listings.buildingType +
                                        "-" +
                                        listings.propertyType +
                                        "-in-" +
                                        listings.locality +
                                        "-" +
                                        listings.city
                                    ) +
                                    "/" +
                                    listings.propertyId
                                    }`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#365899" }}
                            >
                                <Facebook sx={{ mb: -0.8, ml: 4 }} />
                            </Link>
                            <Link
                                to={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin +
                                    "/property/" +
                                    formatSegment(listings.listingType) +
                                    "/" +
                                    formatSegment(listings.propertyName) +
                                    "/" +
                                    formatSegment(
                                        listings.buildingType +
                                        "-" +
                                        listings.propertyType +
                                        "-in-" +
                                        listings.locality +
                                        "-" +
                                        listings.city
                                    ) +
                                    "/" +
                                    listings.propertyId
                                    }`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#0a66c2" }}
                            >
                                <LinkedIn sx={{ mb: -0.8, ml: 1.5 }} />
                            </Link>
                            <Link
                                to={`https://twitter.com/intent/tweet?url=${window.location.origin +
                                    "/property/" +
                                    formatSegment(listings.listingType) +
                                    "/" +
                                    formatSegment(listings.propertyName) +
                                    "/" +
                                    formatSegment(
                                        listings.buildingType +
                                        "-" +
                                        listings.propertyType +
                                        "-in-" +
                                        listings.locality +
                                        "-" +
                                        listings.city
                                    ) +
                                    "/" +
                                    listings.propertyId
                                    }`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "rgb(29, 155, 240)" }}
                            >
                                <Twitter sx={{ mb: -0.8, ml: 1.5 }} />
                            </Link>
                            <Link
                                to={`https://api.whatsapp.com/send?phone=91${listings?.whatsappNumber || config.mobileNumber1
                                    }&text=${window.location.origin +
                                    "/property/" +
                                    formatSegment(listings.listingType) +
                                    "/" +
                                    formatSegment(listings.propertyName) +
                                    "/" +
                                    formatSegment(
                                        listings.buildingType +
                                        "-" +
                                        listings.propertyType +
                                        "-in-" +
                                        listings.locality +
                                        "-" +
                                        listings.city
                                    ) +
                                    "/" +
                                    listings.propertyId
                                    }%0AHi! I'm intrested in ${listings.propertyName
                                    }.Can i have some more info please.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#25d366" }}
                            >
                                <WhatsApp sx={{ mb: -0.8, ml: 1.5 }} />
                            </Link>
                            <Link
                                onClick={() => {
                                    callButtonHandle(
                                        listings?.propertyId,
                                        listings?.propertyType
                                    );
                                }}
                                style={{ color: "#0088cc" }}
                            >
                                <CallIcon sx={{ mb: -0.8, ml: 1.5, mr: 2 }} />
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PropertyCard