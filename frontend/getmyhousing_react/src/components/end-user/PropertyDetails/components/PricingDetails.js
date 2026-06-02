import {
  Box,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import "./PricingDetails.css";

const item = { display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0.75rem", background: "#f9fafb", borderRadius: ".375rem" };
const label = { fontWeight: "500", color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.25rem" }

const PricingDetails = ({ propertyData }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
      <div className="pricing-section">
        <div className="pricing-container">
          <div style={item}>
            <span style={label}>{propertyData.listingType === "Sale"
              ? "Sale Amount"
              : "Rent Amount"}</span>
            <span style={{ color: "red", fontWeight: "500", fontSize: "1.125rem" }}>
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
              }).format(propertyData.pricingDetails?.rent)}
            </span>
          </div>
          {propertyData.pricingDetails?.perSqftPrice && (
            <div style={item}>
              <span style={label}>Price per sq.ft</span>
              <span>₹{propertyData.pricingDetails?.perSqftPrice}/sq.ft</span>
            </div>
          )}
          {propertyData.pricingDetails?.bookingAmount && (
            <div style={item}>
              <span style={label}>Booking Amount</span>
              <span>₹{propertyData.pricingDetails?.bookingAmount?.toLocaleString()}</span>
            </div>
          )}
          {propertyData.pricingDetails?.maintananceCost && (
            <div style={item}>
              <span style={label}>Maintenance</span>
              <span>{propertyData.pricingDetails?.maintananceCost}/{propertyData.pricingDetails?.maintananceCostType}</span>
            </div>
          )}
          {propertyData.pricingDetails?.securityDeposit && (
            <div style={item}>
              <span style={label}>Security Deposit</span>
              <span>{propertyData.pricingDetails?.securityDeposit}</span>
            </div>
          )}
          {propertyData.pricingDetails?.depositAmount && (
            <div style={item}>
              <span style={label}>Deposit Amount</span>
              <span>{propertyData.pricingDetails?.depositAmount}</span>
            </div>
          )}
          {propertyData.pricingDetails?.lockInPeriod && (
            <div style={item}>
              <span style={label}>Min Lock In Period</span>
              <span>{propertyData.pricingDetails?.lockInPeriod}/{propertyData.pricingDetails?.lockInPeriodType}</span>
            </div>
          )}
          {propertyData.pricingDetails?.rentIncrement && (
            <div style={item}>
              <span style={label}>Rent Increment Every 11 Months</span>
              <span>{propertyData.pricingDetails?.rentIncrement} %</span>
            </div>
          )}
        </div>
      </div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, 1fr)"
            : "repeat(4, 1fr)",
          gridColumnGap: "10px", // Column gap of 10 pixels
          gridRowGap: "10px", // Row gap of 10 pixels
          mt: 3,
        }}
      >
        {propertyData.pricingDetails?.selectPriceInclude.map(
          (item, index) => (
            <Box
              key={index}
              sx={{
                py: "10px",
                px: "15px",
                border: "1px solid #000",
                borderRadius: "35px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {item}
            </Box>
          )
        )}
      </Box>
    </>
  );
};

export default PricingDetails;
