import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CssBaseline,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Drawer,
  MenuItem,
  Toolbar,
  Typography,
  Collapse,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import { useCookies } from "react-cookie";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import MinimizeIcon from "@mui/icons-material/Minimize";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { config } from "../../config/config";
import { Logout, PersonAdd } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  indiaTopCities,
  MenuServices,
  propertyTypesDetails,
} from "../../common/common";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getLocation } from "../../global/redux/action";
import UseBreakpoints from "./../custom-hook/UseBreakpoints";
import NavBar from "./NavBar";
import { useDebounce } from "../custom-hook/useDebounce";
import { useMenuItems } from "./dashboard/NavPermissionUtils";
import { apiList, invokeApi } from "../../apis/apiServices";

const StickyHeader = styled(AppBar)({
  position: "sticky",
  top: 0,
  backgroundColor: "#000", // White background
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow
  zIndex: 1000, // Ensures it stays above other content
});

const Header = () => {
  const { medium, large, extraLarge } = UseBreakpoints();
  const menuItems = useMenuItems();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();

  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [addressDrawer, setAddressDrawer] = useState(false);

  const [searchCity, setSearchCity] = useState("");
  const debounceSearch = useDebounce(searchCity, 500);
  const [filteredCitiesList, setFilteredCitiesList] = useState([]);

  const [mobileServiceDrawer, setMobileServiceDrawer] = useState(false);
  const [mobileforBuyersMenu, setMobileforBuyersMenu] = useState(false);
  const [mobileforTenantsMenu, setMobileforTenantsMenu] = useState(false);
  const [mobileforOwnersMenu, setMobileforOwnersMenu] = useState(false);

  // User Data
  const { userData, userError } = useSelector(
    (state) => state.user
  );

  // Location Data
  const { locationData, locationError, isLocationFetching } = useSelector(
    (state) => state.location
  );

  // Cities Data
  const { citiesData, citiesError, isCitiesFetching } = useSelector(
    (state) => state.cities
  );

  useEffect(() => {
    if (locationError) {
      alert(
        "Something went wrong while fetching Location details. Please try again later!"
      );
    }
    if (citiesError) {
      alert(
        "Something went wrong while fetching Cities details. Please try again later!"
      );
    }
  }, [locationError, citiesError]);

  useEffect(() => {
    if (!locationData?.countries && !isLocationFetching && !locationError) {
      dispatch(
        getLocation({ id: cookies[config.cookieName]?.loginUserId, cookies })
      );
    }
    if (!citiesData?.cities && !isCitiesFetching && !citiesError) {
      dispatch(
        getCities({ id: cookies[config.cookieName]?.loginUserId, cookies })
      );
    }
  }, [
    dispatch,
    cookies,
    locationError,
    locationData,
    isLocationFetching,
    isCitiesFetching,
    citiesError,
    citiesData
  ]);

  const handleSearchCityChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchCity(value);
  };

  const handleOpenServiceDrawer = () => {
    setMobileServiceDrawer((open) => !open);
  };

  const handleMenuDrawer = () => {
    setIsMenuDrawerOpen((editing) => !editing);
  };
  const handleAddressDrawer = () => {
    setAddressDrawer((editing) => !editing);
  };

  // open menu
  const [anchorElProfileMenu, setAnchorElProfileMenu] = useState(null);
  const openProfileMenu = Boolean(anchorElProfileMenu);

  const handleOpenProfileMenu = (event) => {
    setAnchorElProfileMenu(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfileMenu(null);
  };

  const setCity = (value) => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      city: value,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
  };

  useEffect(() => {
    if (!cookies[config.preferencesCookie]?.listingType) {
      setCookies(
        config.preferencesCookie,
        JSON.stringify({
          ...cookies[config.preferencesCookie],
          listingType: propertyTypesDetails[0].listingType,
          buildingType: null,
          propertyType: null,
          minPrice: null,
          maxPrice: null,
          minSize: null,
          maxSize: null,
          country: "India",
          city: "Bangalore",
          postedOn: null,
          amenities: [],
          furnishType: null,
          facing: [],
          bhk: [],
          searchCity: null,
          possessionStatus: null,
        }),
        { path: "/", maxAge: 3000000, sameSite: "strict" }
      );
    }
  }, [cookies]);

  useEffect(() => {
    if (debounceSearch) {
      const filtered = citiesData?.cities.filter((city) =>
        city.toLowerCase().includes(searchCity)
      );
      setFilteredCitiesList(filtered);
    }
  }, [debounceSearch]);

  const handleCookieListingType = (value) => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      listingType: value,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });

    navigate("/property/" + value.toLowerCase());
    handleMenuDrawer();
  };

  useEffect(() => {
    if (userError) {
      alert(
        "Something went wrong while fetching user details. Please try again later!"
      );
    }
  }, [userError])

  return (
    <>
      <CssBaseline />
      <StickyHeader>
        <Toolbar>
          <Grid container alignItems="center">
            {!medium && !large && !extraLarge ? (
              <>
                <Grid item xs={3}>
                  <IconButton
                    color="inherit"
                    edge="start"
                    aria-label="menu"
                    onClick={handleMenuDrawer}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={5} sx={{ textAlign: "center" }}>
                  <Box
                    component={"img"}
                    src="/getmyhousing.png"
                    height={"50px"}
                    sx={{ my: 1, cursor: "pointer" }}
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  {/* Render city menu for mobile */}
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={handleAddressDrawer}
                    sx={{ fontSize: "15px" }}
                  >
                    City
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={2}>
                  <Box
                    sx={{
                      cursor: "pointer",
                      my: 1,
                    }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    {/* Get My Housing */}

                    <img src="/getmyhousing.png" height="80px" />
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <NavBar />
                </Grid>
                <Grid
                  item
                  md={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { md: "0.7rem", lg: "0.9rem", xl: "1.1rem" },
                    }}
                  >
                    Enquiry Now : {config.mobileNumber1}
                  </Typography>
                  {cookies[config.cookieName]?.token &&
                    cookies[config.cookieName]?.loginUserId ? (
                    <>
                      <IconButton
                        onClick={handleOpenProfileMenu}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={
                          anchorElProfileMenu ? "account-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={anchorElProfileMenu ? "true" : undefined}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            textTransform: "uppercase",
                          }}
                        >
                          {userData?.user?.fullName[0]}
                        </Avatar>
                      </IconButton>
                      <Menu
                        anchorEl={anchorElProfileMenu}
                        id="account-menu"
                        open={openProfileMenu}
                        onClose={handleCloseProfileMenu}
                        onClick={handleCloseProfileMenu}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        {userData?.user?.roles?.includes("Customer") ? (
                          <MenuItem
                            onClick={() => {
                              navigate("/my-profile");
                              handleCloseProfileMenu();
                            }}
                          >
                            <ListItemIcon>
                              <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            My Profile
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={() => {
                              const dashboardPath =
                                menuItems?.find((item) => item?.path)?.path || "/";
                              navigate(dashboardPath);
                              handleCloseProfileMenu();
                            }}
                          >
                            <ListItemIcon>
                              <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            DashBoard
                          </MenuItem>
                        )}

                        <Divider />
                        <MenuItem
                          onClick={() => {
                            handleCloseProfileMenu();
                            navigate("/logout");
                          }}
                        >
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                      sx={{
                        flexDirection: { sm: "row", xs: "column" }, // Set to column under 600px
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          color: "white",
                          borderColor: "#fff",
                          background: "red",
                          "&:hover": {
                            background: "var(--BG-Color-5, #F8F8F8)",
                            color: "#DB282F",
                          },
                        }}
                        size="small"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "white",
                          borderColor: "#fff",
                          background: "red",
                          "&:hover": {
                            background: "var(--BG-Color-5, #F8F8F8)",
                            color: "#DB282F",
                          },
                        }}
                        onClick={() => navigate("/contact-us")}
                        size="small"
                      >
                        Enquiry
                      </Button>
                    </ButtonGroup>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Toolbar>
      </StickyHeader>
      {/* mobile Menu Drawer */}
      <Drawer
        open={isMenuDrawerOpen}
        onClose={handleMenuDrawer}
        PaperProps={{
          sx: { width: "100%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: "bold",
              fontSize: "15px",
              textTransform: "uppercase",
            }}
          >
            Get My Housing
          </DialogTitle>
          <IconButton onClick={handleMenuDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleCookieListingType("Buy");
              }}
            >
              <Typography>Home</Typography>
              <IconButton size="small" sx={{ marginLeft: "auto" }}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleCookieListingType("Buy");
              }}
            >
              <Typography>Buy</Typography>
              <IconButton size="small" sx={{ marginLeft: "auto" }}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleCookieListingType("Rent");
              }}
            >
              <Typography>Rent</Typography>
              <IconButton size="small" sx={{ marginLeft: "auto" }}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleOpenServiceDrawer}>
              <Typography>Services</Typography>
              <IconButton size="small" sx={{ marginLeft: "auto" }}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleMenuDrawer();
                navigate("/about-us");
              }}
            >
              <Typography>About Us</Typography>
              <IconButton size="small" sx={{ marginLeft: "auto" }}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={() => {
                handleMenuDrawer();
                navigate("/contact-us");
              }}
            >
              <Typography>Contact Us</Typography>
              <IconButton size="small" sx={{ marginLeft: "auto" }}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            left: "50%",
            transform: "translate(-50%, 0%)",
            py: 2,
            boxShadow: "0px 14px 10px 10px #777",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            {!cookies[config.cookieName]?.token &&
              !cookies[config.cookieName]?.loginUserId ? (
              <>
                <Link
                  to={"/login"}
                  style={{
                    padding: "10px 21px",
                    borderRadius: "25px",
                    backgroundColor: "rgb(119 119 119 / 40%)",
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Login
                </Link>
                <Link
                  to={"/contact-us"}
                  style={{
                    padding: "10px 21px",
                    borderRadius: "25px",
                    backgroundColor: "rgb(119 119 119 / 40%)",
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Enquiry
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/post-property"}
                  style={{
                    padding: "10px 21px",
                    borderRadius: "25px",
                    backgroundColor: "rgb(119 119 119 / 40%)",
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  to={"/logout"}
                  style={{
                    padding: "10px 21px",
                    borderRadius: "25px",
                    backgroundColor: "rgb(119 119 119 / 40%)",
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Logout
                </Link>
              </>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "block",
              textAlign: "center",
              py: 2,
              fontWeight: "700",
              fontSize: "1.1rem",
            }}
          >
            <Typography>Enquiry Now: {config.mobileNumber1}</Typography>
          </Box>
        </Box>
      </Drawer >

      {/* Address Drawer */}
      <Drawer
        open={addressDrawer}
        onClose={handleAddressDrawer}
        anchor="right"
        PaperProps={{
          sx: { width: "100%" },
        }
        }
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <IconButton onClick={handleAddressDrawer}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              placeholder="Search"
              size="small"
              fullWidth
              value={searchCity || ""}
              onChange={handleSearchCityChange}
              sx={{ backgroundColor: "#EFEFEF", width: "100%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem
            sx={{
              cursor: "default",
              fontWeight: "bold",
            }}
          >
            <ListItemText
              primary="Top Cities"
              sx={{
                fontSize: "15px",
                textDecoration: "underline",
              }}
            />
          </ListItem>
          {!searchCity && !debounceSearch ? (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  px: "15px",
                  columnGap: "10px",
                }}
              >
                {indiaTopCities.map((city) => (
                  <Box
                    key={city.name}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid gray",
                      borderRadius: "5px",
                      my: "10px",
                      p: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setCity(city.name);
                      // handleCloseMenu("City");
                      setAddressDrawer(false);
                    }}
                  >
                    <img src={city.svg} height="30px" alt="cities" />
                    <Typography
                      variant="caption"
                      sx={{
                        "&:hover": { color: "blue" },
                      }}
                    >
                      {city.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
              {citiesData?.cities.map((item) => (
                <ListItem key={item} button onClick={() => setCity(item)}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </>
          ) : (
            filteredCitiesList.map((item) => (
              <ListItem key={item} button onClick={() => setCity(item)}>
                <ListItemText primary={item} />
              </ListItem>
            ))
          )}
        </List>
      </Drawer>

      {/* Services List Drawer */}
      < Drawer
        open={mobileServiceDrawer}
        onClose={handleOpenServiceDrawer}
        anchor="right"
        PaperProps={{
          sx: { width: "100%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
          }}
        >
          <IconButton onClick={handleOpenServiceDrawer}>
            <ArrowBackIcon />
          </IconButton>
          <Typography>Services</Typography>
        </Box>
        <Divider />
        <List component="nav">
          <ListItem
            button
            onClick={() => setMobileforBuyersMenu(!mobileforBuyersMenu)}
          >
            <ListItemText primary="For Buyers" />
            {mobileforBuyersMenu ? <MinimizeIcon /> : <AddIcon />}
          </ListItem>
          <Collapse in={mobileforBuyersMenu} timeout="auto" unmountOnExit>
            <List component="div">
              {MenuServices.forBuyers?.map((item, index) => (
                <ListItem
                  button
                  style={{ paddingLeft: "16px" }}
                  key={index}
                  onClick={() => {
                    // handleCloseMenu("Services");
                    navigate(
                      item.navigate + cookies[config.preferencesCookie]?.city
                    );
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
              {/* Add more sub-menu items as needed */}
            </List>
          </Collapse>
          <ListItem
            button
            onClick={() => setMobileforTenantsMenu(!mobileforTenantsMenu)}
          >
            <ListItemText primary="For Tenants" />
            {mobileforTenantsMenu ? <MinimizeIcon /> : <AddIcon />}
          </ListItem>
          <Collapse in={mobileforTenantsMenu} timeout="auto" unmountOnExit>
            <List component="div">
              {MenuServices.forTenants?.map((item, index) => (
                <ListItem
                  button
                  style={{ paddingLeft: "16px" }}
                  key={index}
                  onClick={() => {
                    // handleCloseMenu("Services");
                    navigate(
                      item.navigate + cookies[config.preferencesCookie]?.city
                    );
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
              {/* Add more sub-menu items as needed */}
            </List>
          </Collapse>
          <ListItem
            button
            onClick={() => setMobileforOwnersMenu(!mobileforOwnersMenu)}
          >
            <ListItemText primary="For Owners" />
            {mobileforOwnersMenu ? <MinimizeIcon /> : <AddIcon />}
          </ListItem>
          <Collapse in={mobileforOwnersMenu} timeout="auto" unmountOnExit>
            <List component="div">
              {MenuServices.forOwners?.map((item, index) => (
                <ListItem
                  button
                  style={{ paddingLeft: "16px" }}
                  key={index}
                  onClick={() => {
                    // handleCloseMenu("Services");
                    navigate(
                      item.navigate + cookies[config.preferencesCookie]?.city
                    );
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
              {/* Add more sub-menu items as needed */}
            </List>
          </Collapse>
        </List>
      </Drawer >
    </>
  );
};

export default Header;
