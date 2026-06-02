import React, { useEffect } from "react";
import Header from "../../generic/Header";
import { Box, Grid, Typography } from "@mui/material";
import Footer from "../../generic/Footer";
import Helmet from "../../functional-component/Helmet";

export function PrivacyAndPolicy() {
  return (
    <>
      <Helmet
        title="Get My Housing - Privacy Policy"
        description="Learn how Get My Housing collects, uses, and protects your personal information. Read our privacy policy for details on data security and user privacy."
        keywords="privacy policy, data protection, Get My Housing, user privacy, real estate data security"
        canonicalUrl={window.location.href}
        ogTitle="Get My Housing - Privacy Policy"
        ogDescription="Learn how Get My Housing collects, uses, and protects your personal information. Read our privacy policy for details on data security and user privacy."
        twitterTitle="Get My Housing - Privacy Policy"
        twitterDescription="Learn how Get My Housing collects, uses, and protects your personal information. Read our privacy policy for details on data security and user privacy."
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
            Privacy & Policy
          </Typography>
        </Box>
        <Box>
          <Box sx={{ mt: { md: 6, xs: 5 }, mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 500,
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
              This privacy policy explains our policy regarding the collection,
              use, disclosure and transfer of your information by get my
              housing, which operates various websites and other services
              including but not limited to delivery of information and content
              via any mobile or internet connected device or otherwise
              (collectively the "Services"). This privacy policy forms part and
              parcel of the Terms of Use for the Services. Capitalized terms
              which have been used here but are undefined shall have the same
              meaning as are attributed to them in the Terms of Use.
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
              As we update, improve and expand the Services, this policy may
              change, so please refer back to it periodically. By accessing the
              website(s) including but not limited to this Application or
              otherwise using the Services, users consent to collection,
              storage, and use of the personal information you provide
              (including any changes thereto as provided by you) for any of the
              services that we offer.
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
              2. Information We Collect
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
              (a) Personal Information:
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
              We may collect personal information that you provide to us
              voluntarily, such as your name, email address, phone number, and
              location.
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
              (b) Usage Data:
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
              We automatically collect information about how you interact with
              our website, including your IP address, browser type, and pages
              visited.
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
              (c) Cookies:
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
              We use cookies and similar tracking technologies to enhance your
              experience and collect data for analysis. You can manage your
              cookie preferences through your browser settings.
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
              3. How We Use Your Information
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
              We use your information for the following purposes:
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
              (a) To Provide Services:
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
              To deliver the services you request, such as property listings,
              real estate information, and related services.{" "}
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
              (b) Communication:{" "}
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
              To respond to your inquiries, send updates, and notify you of
              changes to our services or policies.
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
              (c) Analytics:{" "}
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
              To analyze user behavior, improve our website, and customize your
              experience.
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
              4. Information Sharing
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
              We do not sell, trade, or otherwise transfer your personal
              information to third parties, except as described in this Privacy
              Policy or when required by law.
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
              5. Third-Party Links
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
              Our website may contain links to third-party websites. We are not
              responsible for their privacy practices and encourage you to read
              their privacy policies.
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Footer />
    </>
  );
}
