import React from "react";
import Header from "../../generic/Header";
import { Box, Grid, Typography } from "@mui/material";
import Footer from "../../generic/Footer";

export function ServiceCharges() {
  return (
    <>
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
        <Box
          sx={{
            display: "flex",
            margin: "auto",
          }}
        >
          <span
            style={{
              fontSize: "1.75rem",
              fontWeight: 600,
              fontFamily: "Jost, sans-serif",
            }}
          >
            Brokerage Charges
          </span>
        </Box>
        <Box>
          <Box sx={{ mt: { md: 6, xs: 5 }, mb: 0.5 }}>
            <Typography
              style={{
                fontSize: "23px",
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              New Sale Property Transaction:
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "25px",
                fontSize: "16px",
              }}
            >
              Property Broker Charge 2% of property transaction from
              Builder,Developer and Promoter.We do not charge anything from
              buyer in property transaction,brokerage fees formalities to be
              completed on or before at the time of registration along with
              applicable GST.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              style={{
                fontSize: "23px",
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              Resale Property Transaction:
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "25px",
                fontSize: "16px",
              }}
            >
              Property Broker Charge 2% from the seller and 2% from the buyer in
              case of resale property transaction,brokerage fees formalities to
              be completed on or before at the time of registration along with
              applicable GST.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              style={{
                fontSize: "23px",
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              Rental Property Transaction:
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "25px",
                fontSize: "16px",
              }}
            >
              Property Broker Charge 1 month rental from Landlord,Builder and
              Developer and Tenant in case of any rental agreement if the
              lock-in/lease if the rental is below 3 years,if the lock-in/lease
              is above 3+ years then we charge 2 month rental,brokerage fees
              formalities to be completed on or before and the time of rental
              agreement or registered agreement along with applicable GST.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              style={{
                fontSize: "23px",
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              Renewal of Rental/lease Agreement:
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "25px",
                fontSize: "16px",
              }}
            >
              Property Broker Charge 15 days commission for any renewal of lease
              from the LESSOR and LESSEE or the approaching party.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 0.5 }}>
            <Typography
              style={{
                fontSize: "23px",
                fontWeight: 500,
                color: "#262525",
                fontFamily: "Jost, sans-serif",
              }}
            >
              Joint Venture Development:
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#343434",
                fontFamily: "Jost, sans-serif",
                lineHeight: "25px",
                fontSize: "16px",
              }}
            >
              Property Broker Charge 2% commission each from the developer /
              owner on the total land value.brokerage fees formalities to be
              completed on or before at the time of Joint Venture agreement
              along with applicable GST.
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Footer></Footer>
    </>
  );
}
