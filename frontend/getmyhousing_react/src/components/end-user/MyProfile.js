import {
  Box,
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Stack,
  CircularProgress,
  Typography,
  Breadcrumbs,
  Link,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../generic/Footer";
import Header from "../generic/Header";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../global/redux/action";
import { useNavigate } from "react-router-dom";
import { services } from "../../common/common";
import {
  styled as breadStyle,
  emphasize,
} from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";

const StyledBreadcrumb = breadStyle(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function MyProfile() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [datas, setdatas] = useState([]);
  const [loading, setloading] = useState(true);

  const { userData, userError, isFetching } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const userLeads = async () => {
      let params = { userId: cookies[config.cookieName]?.loginUserId };
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.userLeads,
          params,
          cookies
        );
        if (response.data.responseCode === "200") {
          setdatas(response.data.userLeads);
        } else if (response.data.responseCode === "401") {
          navigate("/logout");
        } else {
          console.error("No data in the response");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    if (loading) {
      userLeads();
      setloading(false);
    }
  }, [cookies, loading]);

  function getNavigateValue(name) {
    const tool = services.find((tool) => tool.name === name);
    return tool
      ? tool.navigate + cookies[config.preferencesCookie]?.city.toLowerCase()
      : null;
  }

  return (
    <>
      <Header />

      <Box
        sx={{
          p: { md: 5, xs: 2 },
          backgroundColor: "#f8f9fa",
        }}
      >
        <Grid>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="a"
                href="/"
                label="Home"
                icon={<HomeIcon fontSize="small" />}
              />
              {/* <StyledBreadcrumb component="a" href="#" label="Catalog" /> */}
              <StyledBreadcrumb label="My-profile" />
            </Breadcrumbs>
          </div>
        </Grid>
        <Box sx={{ px: { md: 20, xs: 5 }, py: 3, textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { md: "34px", xs: "28px" },
              fontWeight: 600,
              fontFamily: "Jost, sans-serif",
            }}
          >
            My Profile
          </Typography>
        </Box>
        <Paper sx={{ mt: 3, p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Grid container sx={{ display: "flex", flexDirection: "row" }}>
            <Grid item xs={12} md={6}>
              {" "}
              <Typography
                sx={{
                  fontSize: { md: "20px", xs: "16px" },
                  fontWeight: 600,
                  fontFamily: "Jost, sans-serif",
                  p: 2,
                }}
              >
                Name: {userData?.user?.fullName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: { md: "20px", xs: "16px" },
                  fontWeight: 600,
                  fontFamily: "Jost, sans-serif",
                  p: 2,
                }}
              >
                Email Id: {userData?.user?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: { md: "20px", xs: "16px" },
                  fontWeight: 600,
                  fontFamily: "Jost, sans-serif",
                  p: 2,
                }}
              >
                Phone No: {userData?.user?.mobileNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: { md: "20px", xs: "16px" },
                  fontWeight: 600,
                  fontFamily: "Jost, sans-serif",
                  p: 2,
                }}
              >
                Country: {userData?.user?.country}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: { md: "20px", xs: "16px" },
                  fontWeight: 600,
                  fontFamily: "Jost, sans-serif",
                  p: 2,
                }}
              >
                State: {userData?.user?.state}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: { md: "20px", xs: "16px" },
                  fontWeight: 600,
                  fontFamily: "Jost, sans-serif",
                  p: 2,
                }}
              >
                Distict: {userData?.user?.district}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: { md: "20px", xs: "16px" },
                  fontWeight: 600,
                  fontFamily: "Jost, sans-serif",
                  p: 2,
                }}
              >
                City: {userData?.user?.city}
              </Typography>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ p: 2, mt: 2 }}>
            {loading && (
              <Stack sx={{ display: "flex", alignItems: "center", mb: 5 }}>
                <CircularProgress sx={{ color: "black" }} />
              </Stack>
            )}
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#e7e7e7", color: "#fff" }}>
                  <TableCell
                    sx={{
                      borderBottom: "3px solid #454545",
                      borderRight: "1px solid #ddd",
                      fontSize: "16px",
                    }}
                  >
                    Sl No
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "3px solid #454545",
                      borderRight: "1px solid #ddd",
                      fontSize: "16px",
                    }}
                  >
                    Lead Name
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "3px solid #454545",
                      borderRight: "1px solid #ddd",
                      fontSize: "16px",
                    }}
                  >
                    Mobile Number
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "3px solid #454545",
                      borderRight: "1px solid #ddd",
                      fontSize: "16px",
                    }}
                  >
                    Submitted In
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "3px solid #454545",
                      borderRight: "1px solid #ddd",
                      fontSize: "16px",
                    }}
                  >
                    Listing Type
                  </TableCell>

                  {userData?.user?.roles.includes("Agent") ||
                    (userData?.user?.roles.includes("Customer") && (
                      <TableCell
                        sx={{
                          borderBottom: "3px solid #454545",
                          fontSize: "16px",
                        }}
                      >
                        Status
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {datas
                  ?.filter((item) => item.status === "Active")
                  .map((items, index) => (
                    <TableRow key={items.id}>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {items.customerName}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {items.mobileNumber}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                          cursor: "pointer",
                          color: "#00008B",
                        }}
                        onClick={() => {
                          navigate(getNavigateValue(items.leadSource));
                        }}
                      >
                        {items.propertyId === null && items.leadSource}
                        {items.propertyId !== null && items.leadSource}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {items.listingType}
                      </TableCell>
                      {userData?.user?.roles.includes("Agent") ||
                        (userData?.user?.roles.includes("Customer") && (
                          <TableCell
                            sx={{
                              borderBottom: "1px solid #ddd",
                              borderRight: "1px solid #ddd",
                            }}
                          >
                            {items.status}
                          </TableCell>
                        ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid
            p={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                navigate("/logout");
              }}
            >
              Log out
            </Button>
          </Grid>
        </Paper>
      </Box>
      <Footer />
    </>
  );
}
