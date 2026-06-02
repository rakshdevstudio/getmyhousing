import React, { useEffect } from "react";
import Header from "../../generic/Header";
import { Box, Grid, Typography } from "@mui/material";
import Footer from "../../generic/Footer";
import Helmet from "../../functional-component/Helmet";

export function NonRefundPolicy() {
  return (
    <>
      <Helmet
        title="Get My Housing - Non Refund Policy"
        description="Review the Non-Refund Policy of Get My Housing. Learn about our refund terms for property-related transactions and services."
        keywords="non-refund policy, no refund, Get My Housing, property transaction policy, refund terms"
        canonicalUrl={window.location.href}
        ogTitle="Get My Housing - Non Refund Policy"
        ogDescription="Review the Non-Refund Policy of Get My Housing. Learn about our refund terms for property-related transactions and services."
        twitterTitle="Get My Housing - Non Refund Policy"
        twitterDescription="Review the Non-Refund Policy of Get My Housing. Learn about our refund terms for property-related transactions and services."
      />
      <Header />
      <Grid
        container
        sx={{
          width: "90%",
          boxShadow: "5px 15px 15px 15px  rgb(62 65 159 / 10%)",
          margin: "auto",
          p: { md: 5, xs: 1 },
          mb: 5,
        }}
      >
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.75rem" },
              fontWeight: 700,
              fontFamily: "Jost, sans-serif",
            }}
          >
            Non Refund Policy
          </Typography>
        </Box>
        <Box>
          <Box sx={{ mt: { md: 6, xs: 5 }, mb: 0.5 }}>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              Get My Housing is committed to providing our clients with
              exceptional real estate services. We understand that real estate
              transactions can be complex and that our clients may have
              questions and concerns. We are dedicated to addressing those
              issues promptly and effectively. Please read this Non-Refund
              Policy carefully to understand our position on refunds and
              cancellations.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              style={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              1. Refund Eligibility:
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              We do not offer refunds for any services provided by our property
              broker company, including but not limited to property listings,
              real estate consultations, property evaluations, and other related
              services.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              style={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              2. Cancellation Policy:
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              We understand that unforeseen circumstances may arise, and you may
              need to cancel or reschedule a service. In such cases, please
              contact us as soon as possible. We will do our best to accommodate
              your request, but any decision to cancel or reschedule is at our
              discretion.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              style={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              3. Legal Compliance:
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              This Non-Refund Policy is subject to applicable laws and
              regulations. In cases where local, state, or federal laws require
              refunds or offer consumer protection, we will comply with those
              laws.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              style={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              4. Changes to the Policy:
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              We reserve the right to make changes or updates to this Non-Refund
              Policy at any time. We will notify our clients of any changes
              through our website.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              style={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              5. Contact Us:
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              If you have any questions or concerns about this Non-Refund
              Policy, please contact us using the contact information provided
              on our website.
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Footer />
    </>
  );
}
