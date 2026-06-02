import React, { useEffect } from "react";
import Header from "../../generic/Header";
import { Box, Grid, Typography } from "@mui/material";
import Footer from "../../generic/Footer";
import Helmet from "../../functional-component/Helmet";

export function TermsAndConditions() {
  return (
    <>
      <Helmet
        title="Get My Housing - Terms And Condition"
        description="Read the terms and conditions of Get My Housing. Understand our policies on property listings, transactions, and user agreements."
        keywords="terms and conditions, Get My Housing, real estate policies, property rules"
        canonicalUrl={window.location.href}
        ogTitle="Get My Housing - Terms And Condition"
        ogDescription="Read the terms and conditions of Get My Housing. Understand our policies on property listings, transactions, and user agreements."
        twitterTitle="Get My Housing - Terms And Condition"
        twitterDescription="Read the terms and conditions of Get My Housing. Understand our policies on property listings, transactions, and user agreements."
      />
      <Header />
      <Grid
        container
        sx={{
          width: "90%",
          boxShadow: "5px 15px 15px 15px  rgb(62 65 159 / 10%)",
          margin: "auto",
          p: { md: 5, xs: 2 },
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
            Terms & Conditions
          </Typography>
        </Box>
        <Box>
          <Box sx={{ mt: { md: 6, xs: 5 }, mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 600,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              1. Introduction
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", md: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              These terms and conditions constitute a legally binding agreement
              between you and www.propbroker.in and any services offered by the
              Company including but not limited to delivery of content via the
              Site, any mobile or internet connected device or otherwise.
            </Typography>
          </Box>
          <Box sx={{ mt: 1.5 }}>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              Your use of the Site and services and tools are governed by the
              following Terms and conditions as applicable including the
              applicable policies which are incorporated herein by way of
              reference. By mere use of the Site, You shall be contracting with
              get my housing, the owner of the Platform. These terms and
              conditions including the policies constitute Your binding
              obligations.
            </Typography>
          </Box>
          <Box sx={{ mt: 1.5 }}>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              When You use any of the services provided by Us through the
              Platform, including but not limited to, You will be subject to the
              rules, guidelines, policies, terms, and conditions applicable to
              such service, and they shall be deemed to be incorporated into
              this Terms and shall be considered as part and parcel of this
              Terms.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              2. Description of Services
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              Posting User profile or listing for the purpose of
              sale/rental/lease/project of property, and related property
              services etc.
            </Typography>
          </Box>
          <Box sx={{ mt: 1.5 }}>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              Secure a property through getmyhousing.com and its internet links.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              3. User Registration
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              To access certain features of our website, you may be required to
              create an account. You agree to provide accurate, current, and
              complete information during the registration process.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              4. User Responsibilities
            </Typography>
          </Box>
          <Box mb={1} mt={1}>
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              (a) Prohibited Activities:
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              You agree prohibited from engaging in any unlawful, unethical, or
              harmful activities on our platform, including but not limited to
              fraud, impersonation, or spamming.
            </Typography>
          </Box>
          <Box mb={1} mt={3}>
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              (b) User Content:
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              You agree solely responsible for the content you submit to our
              platform. We reserve the right to remove or restrict access to any
              content that violates these Terms and Conditions.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              5. Termination
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              These Terms shall continue to form a valid and binding contract
              between the Parties, and shall continue to be in full force and
              effect until the User continues to access and use the Site.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              6. Eligibility:
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              You hereby represent and warrant to the Company that you are at
              least 18 years of age or above and are capable of entering,
              performing and adhering to these Terms. While individuals under
              the age of 18 may utilize the Service of the site, they shall do
              so only with the involvement & guidance of their parents and / or
              legal guardians, under such Parent /Legal guardian's registered
              account. You agree to register prior to uploading any content and
              / or comment and any other use or services of this site and
              provide your details including but not limited to complete name,
              age, email address, residential address, and contact number.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              7. Refund Policy:
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "1.7",
                fontSize: { xs: "13px", sm: "16px" },
                textAlign: { xs: "justify", md: "left" },
              }}
            >
              We don't have refund policy.
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Footer />
    </>
  );
}
