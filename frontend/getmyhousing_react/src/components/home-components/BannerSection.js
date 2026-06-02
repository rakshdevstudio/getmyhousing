import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  InputAdornment,
  TextField,
  List,
  Divider,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  MenuList,
  useMediaQuery,
  useTheme,
  Popper,
  Grow,
  Paper,
  Button,
  Autocomplete,
} from "@mui/material";
import { useCookies } from "react-cookie";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CottageIcon from "@mui/icons-material/Cottage";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { config } from "../../config/config";
import {
  propertyTypesDetails,
  buyBudgets,
  rentBudgets,
  indiaTopCities,
} from "../../common/common";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../apis/apiServices";
import { useDebounce } from "../custom-hook/useDebounce";
import SearchSuggetions from "./SearchSuggetions";
import UseBreakpoints from "../custom-hook/UseBreakpoints";
import { useSelector } from "react-redux";

const BannerSection = () => {
  const { small, medium, large, extraLarge } = UseBreakpoints();

  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [propetyFetching, setPropertyFetching] = useState(false);
  const [propertiesList, setPropertiesList] = useState([]);
  const [anchorBudget, setanchorBudget] = useState(null);
  const [searchText, setSearchText] = useState("");
  const debounceSearchProperty = useDebounce(searchText, 500);

  const [searchCity, setSearchCity] = useState("");
  const debounceSearchCity = useDebounce(searchCity, 500);
  const [filteredCitiesList, setFilteredCitiesList] = useState([]);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [addressDrawer, setAddressDrawer] = useState(false);
  const [cookies, setCookies] = useCookies();
  const [open, setOpen] = useState(false);

  const [activeListingType, setActiveListingType] = useState(
    cookies[config.preferencesCookie]?.listingType || "Buy"
  );

  const [buildingType, setBuildingType] = useState(
    cookies[config.preferencesCookie]?.buildingType || null
  );

  // Cities Data
  const { citiesData, citiesError } = useSelector(
    (state) => state.cities
  );

  useEffect(() => {
    if (debounceSearchCity) {
      const filtered = citiesData?.cities.filter((city) =>
        city.toLowerCase().includes(searchCity)
      );
      setFilteredCitiesList(filtered);
    }
  }, [debounceSearchCity]);

  useEffect(() => {
    if (debounceSearchProperty) {
      setPropertyFetching(true);
    } else {
      setPropertiesList([]);
      setPropertyFetching(false);
    }
  }, [activeListingType, debounceSearchProperty]);

  useEffect(() => {
    if (debounceSearchProperty && buildingType) {
      setPropertyFetching(true);
    }
  }, [buildingType]);

  const [propertyType, setPropertyType] = useState(
    cookies[config.preferencesCookie]?.propertyType || ""
  );

  useEffect(() => {
    if (debounceSearchProperty && propertyType) {
      setPropertyFetching(true);
    }
  }, [propertyType]);

  const [minPrice, setMinPrice] = useState(
    cookies[config.preferencesCookie]?.minPrice || null
  );
  const [maxPrice, setMaxPrice] = useState(
    cookies[config.preferencesCookie]?.maxPrice || null
  );

  const [minBudget, setminBudget] = useState();

  const handleOpenFilterDrawer = () => {
    setOpenFilterDrawer((prev) => !prev);
  };

  const handleAddressDrawer = () => {
    setAddressDrawer((editing) => !editing);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const searchProperties = async () => {
      let params = {
        searchText: debounceSearchProperty,
        listingType:
          cookies[config.preferencesCookie]?.listingType === "Buy"
            ? "Sale"
            : cookies[config.preferencesCookie]?.listingType,
        buildingType: cookies[config.preferencesCookie]?.buildingType,
        propertyType: cookies[config.preferencesCookie]?.propertyType,
        city: null,
        minRent: cookies[config.preferencesCookie]?.minPrice || null,
        maxRent: cookies[config.preferencesCookie]?.maxPrice || null,
        facing: cookies[config.preferencesCookie]?.facing || [],
        bhk: cookies[config.preferencesCookie]?.bhk || [],
        amenities: cookies[config.preferencesCookie]?.amenities || [],
        minSuperBuiltupArea: cookies[config.preferencesCookie]?.minSize,
        maxSuperBuiltupArea: cookies[config.preferencesCookie]?.maxSize,
      };
      const response = await invokeApi(
        config.apiDomains + apiList.searchByProperties,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          setPropertiesList(response.data.searchByProperties);
        } else {
          alert("An error occurred while fetching search property data!");
        }
      } else {
        alert("An error occurred while fetching search property data!!");
      }
    };
    if (propetyFetching) {
      searchProperties();
      setPropertyFetching(false);
    }
  }, [cookies, propetyFetching, debounceSearchProperty]);

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
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
    handleOpenFilterDrawer();
  };

  const handleListingType = (value) => {
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

    setActiveListingType(value);

    // Create updated cookie value
    const updatedCookieValue2 = JSON.stringify({
      ...cookies[config.preferencesCookie],
      minPrice: null,
      maxPrice: null,
    });

    setCookies(config.preferencesCookie, updatedCookieValue2, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
  };

  const handleMinPrice = (value) => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      minPrice: value,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });

    setMinPrice(value);
  };

  const handleBuildingType = (value) => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      buildingType: value,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });

    setBuildingType(value);
  };

  const handleMaxPrice = (value) => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      maxPrice: value,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
    setMaxPrice(value);
  };

  const handlePropertyType = (value) => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      propertyType: value,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
    setPropertyType(value);
  };

  function handelReset() {
    setCookies(
      config.preferencesCookie,
      JSON.stringify({
        ...cookies[config.preferencesCookie],
        listingType: propertyTypesDetails[0].listingType,
        buildingType: null,
        propertyType: null,
        minPrice: null,
        maxPrice: null,
        city: "Bangalore",
        amenities: [],
        bhk: [],
        facing: [],
        minSize: null,
        maxSize: null,
      }),
      { path: "/", maxAge: 3000000, sameSite: "strict" }
    );
    handleListingType("Buy");
    setPropertyType(null);
    setBuildingType(null);
    setMaxPrice("");
    setMinPrice("");
  }

  const budgets =
    activeListingType === "Buy"
      ? buyBudgets
      : activeListingType === "Rent"
        ? rentBudgets
        : activeListingType === "Lease"
          ? buyBudgets
          : [];

  useEffect(() => {
    if (citiesError) {
      alert(
        "Something went wrong while fetching Cities details. Please try again later!"
      );
    }
  }, [citiesError]);

  return (
    <>
      <Box
        component="section"
        sx={{
          background: `linear-gradient(0deg, rgba(238, 69, 69, 0.10) 0%, rgba(238, 69, 69, 0.10) 100%), url("/media/images/home-bg.webp") lightgray 50% / cover no-repeat`,
          height: { md: "500px", xs: "350px" },
          width: "100%",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Box
          sx={{
            color: "#FFF",
            textAlign: "center",
            textShadow: "0px 2.4px 4.8px rgba(0, 0, 0, 0.15)",
            fontFamily: "Mulish, sans-serif ",
            fontSize: { md: "50px", xs: "15px" },
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            mb: "20px",
          }}
        >
          {/* <Typography variant="h4">Bengaluru</Typography> */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { md: "50px", xs: "26px", sm: "30px" },
              fontWeight: 700,
            }}
          >
            <Box component="span" sx={{ color: "white", mt: 1, mr: 1 }}>
              {cookies[config.preferencesCookie]?.country + "'s"
                ? cookies[config.preferencesCookie]?.country + "'s"
                : "India's"}
            </Box>
            Growing Property Portal
          </Typography>
          {/* Real Estate Made Real Easy */}
          <Typography
            variant="h5"
            sx={{ fontSize: { xs: "14px", md: "15px" } }}
          >
            Your Searching Property now in
            <Box component="span" sx={{ color: "red", mt: 1, ml: 1 }}>
              {cookies[config.preferencesCookie]?.city
                ? cookies[config.preferencesCookie]?.city
                : "Bangalore"}
            </Box>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background:
              "linear-gradient(180deg, rgba(26, 26, 26, 0.00) 0%, rgba(0, 0, 0, 0.35) 100%)",
            borderRadius: "20px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            sx={{
              width: { md: "350px", xs: "50%" },
              height: { md: "97px", xs: "auto" },
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 2.4px 4.8px 0px rgba(0, 0, 0, 0.15)",
              px: { md: "28px", xs: 1 },
              py: { md: "28px", xs: 1 },
            }}
            container
          >
            {propertyTypesDetails?.map((item, index) => (
              <Grid
                item
                key={index}
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "&:hover": {
                    color: "#F63C43",
                    "& svg path": {
                      fill: "#F63C43",
                    },
                    "& .box-text": {
                      color: "#F63C43",
                    },
                  },
                  ...(activeListingType === item.listingType && {
                    color: "#F63C43",
                    "& svg path": {
                      fill: "#F63C43",
                    },
                    "& .box-text": {
                      color: "#F63C43",
                    },
                  }),
                }}
                onClick={() => {
                  if (!medium) {
                    if (cookies[config.preferencesCookie]?.city) {
                      handleOpenFilterDrawer();
                      handleListingType(item.listingType);
                    } else {
                      handleAddressDrawer();
                      handleListingType(item.listingType);
                    }
                  } else {
                    handleListingType(item.listingType);
                  }
                }}
              >
                <Box
                  className="box-text" // Add a class to the Box component
                  sx={{
                    width: { md: "40px", xs: "25px" },
                    height: { md: "40px", xs: "25px" },
                    display: "block",
                    transition: "color 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    style={{
                      width: { md: "40px", xs: "25px" },
                      height: { md: "40px", xs: "25px" },
                    }}
                    viewBox="0 0 40 41"
                    fill="#555656"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M37.5 33H35V15.5C35 14.837 34.7366 14.2011 34.2678 13.7322C33.7989 13.2634 33.163 13 32.5 13H22.5V5.50001C22.5003 5.04729 22.3777 4.603 22.1452 4.21454C21.9127 3.82608 21.5791 3.50804 21.18 3.29437C20.7808 3.08069 20.3312 2.9794 19.879 3.00131C19.4268 3.02322 18.9891 3.1675 18.6125 3.41876L6.1125 11.75C5.76959 11.9788 5.48858 12.2888 5.29448 12.6525C5.10038 13.0161 4.99922 13.4222 5 13.8344V33H2.5C2.16848 33 1.85054 33.1317 1.61612 33.3661C1.3817 33.6005 1.25 33.9185 1.25 34.25C1.25 34.5815 1.3817 34.8995 1.61612 35.1339C1.85054 35.3683 2.16848 35.5 2.5 35.5H37.5C37.8315 35.5 38.1495 35.3683 38.3839 35.1339C38.6183 34.8995 38.75 34.5815 38.75 34.25C38.75 33.9185 38.6183 33.6005 38.3839 33.3661C38.1495 33.1317 37.8315 33 37.5 33ZM32.5 15.5V33H22.5V15.5H32.5ZM7.5 13.8344L20 5.50001V33H7.5V13.8344ZM17.5 18V20.5C17.5 20.8315 17.3683 21.1495 17.1339 21.3839C16.8995 21.6183 16.5815 21.75 16.25 21.75C15.9185 21.75 15.6005 21.6183 15.3661 21.3839C15.1317 21.1495 15 20.8315 15 20.5V18C15 17.6685 15.1317 17.3505 15.3661 17.1161C15.6005 16.8817 15.9185 16.75 16.25 16.75C16.5815 16.75 16.8995 16.8817 17.1339 17.1161C17.3683 17.3505 17.5 17.6685 17.5 18ZM12.5 18V20.5C12.5 20.8315 12.3683 21.1495 12.1339 21.3839C11.8995 21.6183 11.5815 21.75 11.25 21.75C10.9185 21.75 10.6005 21.6183 10.3661 21.3839C10.1317 21.1495 10 20.8315 10 20.5V18C10 17.6685 10.1317 17.3505 10.3661 17.1161C10.6005 16.8817 10.9185 16.75 11.25 16.75C11.5815 16.75 11.8995 16.8817 12.1339 17.1161C12.3683 17.3505 12.5 17.6685 12.5 18ZM12.5 26.75V29.25C12.5 29.5815 12.3683 29.8995 12.1339 30.1339C11.8995 30.3683 11.5815 30.5 11.25 30.5C10.9185 30.5 10.6005 30.3683 10.3661 30.1339C10.1317 29.8995 10 29.5815 10 29.25V26.75C10 26.4185 10.1317 26.1005 10.3661 25.8661C10.6005 25.6317 10.9185 25.5 11.25 25.5C11.5815 25.5 11.8995 25.6317 12.1339 25.8661C12.3683 26.1005 12.5 26.4185 12.5 26.75ZM17.5 26.75V29.25C17.5 29.5815 17.3683 29.8995 17.1339 30.1339C16.8995 30.3683 16.5815 30.5 16.25 30.5C15.9185 30.5 15.6005 30.3683 15.3661 30.1339C15.1317 29.8995 15 29.5815 15 29.25V26.75C15 26.4185 15.1317 26.1005 15.3661 25.8661C15.6005 25.6317 15.9185 25.5 16.25 25.5C16.5815 25.5 16.8995 25.6317 17.1339 25.8661C17.3683 26.1005 17.5 26.4185 17.5 26.75Z"
                    // Remove the fill attribute from here
                    />
                  </svg>
                </Box>

                <Box
                  className="box-text" // Add a class to the Box component
                  sx={{
                    color: "var(--Text-Color-Grey-Light, #555656)",
                    textAlign: "center",
                    fontFamily: "Mulish, sans-serif",
                    fontSize: { md: "14px", xs: "12px" },
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    cursor: "pointer",
                    pl: 2,
                    pr: 2,
                  }}
                  onClick={() => handleListingType(item.listingType)}
                >
                  {item.listingType}
                </Box>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            sx={{
              width: { md: "auto", xs: "80%" },
              height: { md: "51px", xs: "40px" },
              pl: { md: 1 },
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "25px",
              mr: "5%",
              mt: "12px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              ml: { xs: 0.2, md: 0 },
            }}
          >
            {!extraLarge && !large && !medium && !small ? (
              <>
                <Grid item sx={{ width: "80%" }}>
                  <SearchSuggetions
                    setValue={setSearchText}
                    initialValue={searchText}
                    options={propertiesList}
                  />
                </Grid>
                <Box
                  sx={{
                    // ml: { md: "16px", xs: "86px" },
                    borderRadius: "55px",
                    display: "flex",
                    border: "1px solid var(--BG-Color-4, #F8F8F8)",
                    background: "var(--BG-Color-5, #DB282F)",
                    minWidth: { md: "20%", xs: "20%" },
                    height: { md: "38px", xs: "39px" },
                    "&:hover": {
                      backgroundColor: "var(--Text-Color-Grey-Bold, #333)",
                      color: "black",
                    },
                    color: "var(--BG-Color-4, #F8F8F8)",
                    fontFamily: "Jost, sans-serif",
                    fontSize: { md: "18px", xs: "11px" },
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    textAlign: "center",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() =>
                    navigate(
                      "/property/" +
                      (cookies[
                        config.preferencesCookie
                      ]?.listingType?.toLowerCase() || null)
                    )
                  }
                >
                  <SearchIcon sx={{ width: { xs: "26px", md: "19px" } }} />
                  {/* Search */}
                </Box>
              </>
            ) : (
              <>
                <Grid item sx={{ width: { sm: "225px", lg: "320px" } }}>
                  <SearchSuggetions
                    setValue={setSearchText}
                    initialValue={searchText}
                    options={propertiesList}
                  />
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}
                >
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ mx: { lg: 1, sm: 0.5 } }}
                  />
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      flexWrap: "nowrap",
                      alignItems: "center",
                      cursor: "pointer",
                      px: { lg: "3px" },
                      mr: { md: "1px", lg: "3px" },
                      "&:hover": {
                        backgroundColor: "#dfe6e9",
                        borderRadius: "40px",
                      },
                      transition: "0.3s ease-in-out",
                    }}
                    onClick={handleToggle}
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Mulish, sans-serif",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                        px: "7px",
                        userSelect: "none",
                      }}
                      ref={anchorRef}
                      id="composition-button"
                    >
                      <CottageIcon
                        sx={{
                          width: { xs: "12px", md: "18px" },
                          color: "#DB282F",
                          mr: "3px",
                        }}
                      />
                      Property Type
                      {open ? (
                        <KeyboardArrowUpIcon
                          sx={{
                            width: { md: "22px", xs: "15px" },
                            height: "22px",
                          }}
                        />
                      ) : (
                        <KeyboardArrowDownIcon
                          sx={{
                            width: { md: "22px", xs: "15px" },
                            height: "22px",
                          }}
                        />
                      )}
                    </Box>
                  </Grid>
                  {/* below the popover menu is to show property type  */}
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                    sx={{
                      maxHeight: "350px",
                      overflowY: "auto",
                      maxWidth: "367px",
                      overflowX: "auto",
                    }}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom-start"
                              ? "left top"
                              : "left bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              {/* below the box element is for building types  */}
                              <Box
                                sx={{
                                  fontSize: "15px",
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                {propertyTypesDetails
                                  ?.find(
                                    (item) =>
                                      item.listingType === activeListingType
                                  )
                                  .buildingTypes?.map(
                                    (propertyTypeN, index) => (
                                      <Box
                                        key={index}
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          cursor: "pointer",
                                          py: 1,
                                          px: 2, // Padding inside each item
                                          borderRadius: "4px", // Rounded corners
                                          flex: "1 1 30%", // Flex grow and shrink to make each item take up equal space
                                          justifyContent: "center",
                                          "&:hover": {
                                            backgroundColor: "#e56267", // Hover background color
                                            color: "white",
                                          },
                                          transition: "0.2s ease-in-out",
                                          color:
                                            buildingType ===
                                              propertyTypeN.buildingType
                                              ? "white"
                                              : "black",
                                          backgroundColor:
                                            buildingType ===
                                              propertyTypeN.buildingType
                                              ? "#e0454b"
                                              : "transparent", // Checked background color
                                          position: "relative", // For positioning hidden radio button
                                        }}
                                        onClick={() => {
                                          handleBuildingType(
                                            propertyTypeN.buildingType
                                          );
                                        }}
                                      >
                                        <input
                                          type="radio"
                                          name="radio1"
                                          value={propertyTypeN.buildingType}
                                          checked={
                                            buildingType ===
                                            propertyTypeN.buildingType
                                          }
                                          onChange={() => { }}
                                          style={{
                                            position: "absolute",
                                            opacity: 0,
                                            width: 0,
                                            height: 0,
                                          }}
                                        />
                                        {propertyTypeN.buildingType}
                                      </Box>
                                    )
                                  )}
                              </Box>

                              <Divider />
                              {buildingType && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    p: 1,
                                  }}
                                >
                                  {propertyTypesDetails
                                    .find(
                                      (item) =>
                                        item.listingType === activeListingType
                                    )
                                    ?.buildingTypes?.find(
                                      (propertyTypeN) =>
                                        propertyTypeN.buildingType ===
                                        buildingType
                                    )
                                    ?.propertyTypes.map((item, index) => (
                                      <Box
                                        mr={0.5}
                                        className="mydict"
                                        key={index}
                                      >
                                        <label className="mydict1 border2">
                                          <input
                                            type="radio"
                                            name="radio7"
                                            value={item || ""}
                                            onChange={(event) => {
                                              handlePropertyType(
                                                event.target.value
                                              );
                                            }}
                                            checked={propertyType === item}
                                            readOnly
                                          />
                                          <dev className="border2">
                                            <Box
                                              sx={{
                                                fontSize: {
                                                  md: "13px",
                                                  xs: "12px",
                                                },
                                                fontFamily:
                                                  "Mulish, sans-serif",
                                              }}
                                            >
                                              {item}
                                            </Box>
                                          </dev>
                                        </label>
                                      </Box>
                                    ))}
                                </Box>
                              )}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>

                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ mx: { lg: 1, sm: 0.5 } }}
                  />
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      flexWrap: "nowrap",
                      alignItems: "center",
                      cursor: "pointer",
                      px: { lg: "3px" },
                      mr: { lg: "3px" },
                      "&:hover": {
                        backgroundColor: "#dfe6e9",
                        borderRadius: "40px",
                      },
                      transition: "0.3s ease-in-out",
                    }}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(event) => setanchorBudget(event.currentTarget)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Mulish, sans-serif",
                        fontSize: "14px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        px: "7px",
                      }}
                    >
                      <CurrencyRupeeIcon
                        sx={{
                          width: { xs: "12px", md: "18px" },
                          color: "#DB282F",
                          mr: "3px",
                        }}
                      />
                      {/* <Box>Budget</Box> */}
                      <Box sx={{ whiteSpace: "nowrap" }}>
                        {minPrice && maxPrice
                          ? `₹ ${budgets.find((item) => item.value === minPrice)
                            ?.label
                          } - ₹ ${budgets.find((item) => item.value === maxPrice)
                            ?.label
                          }`
                          : "Budget"}
                      </Box>
                      {anchorBudget ? (
                        <KeyboardArrowUpIcon
                          sx={{
                            width: { md: "22px", xs: "15px" },
                            height: "22px",
                          }}
                        />
                      ) : (
                        <KeyboardArrowDownIcon
                          sx={{
                            width: { md: "22px", xs: "15px" },
                            height: "22px",
                          }}
                        />
                      )}
                    </Box>
                  </Grid>
                  {/* below the popover menu is to show budget  */}
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorBudget}
                    keepMounted
                    open={Boolean(anchorBudget)}
                    onClose={() => setanchorBudget(null)}
                  >
                    <Box sx={{ maxHeight: "300px", maxWidth: "200px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px", // Space between items
                          p: 1, // Padding around the entire container
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <input
                            type="text"
                            placeholder="min"
                            value={minPrice || ""}
                            onChange={(e) => {
                              handleMinPrice(e.target.value);
                            }}
                            onClick={() => setminBudget(0)}
                            style={{
                              width: "100%", // Full width within the container
                              padding: "10px", // Consistent padding
                              boxSizing: "border-box", // Ensures padding is included in the width
                              borderRadius: "4px", // Rounded corners
                              border: "1px solid #ccc", // Border styling
                            }}
                          />
                        </Box>
                        <span>-</span>
                        <Box sx={{ flex: 1 }}>
                          <input
                            type="text"
                            placeholder="max"
                            value={maxPrice || ""}
                            onChange={(e) => {
                              handleMaxPrice(e.target.value);
                            }}
                            onClick={() => setminBudget(1)}
                            style={{
                              width: "100%", // Full width within the container
                              padding: "10px", // Consistent padding
                              boxSizing: "border-box", // Ensures padding is included in the width
                              borderRadius: "4px", // Rounded corners
                              border: "1px solid #ccc", // Border styling
                            }}
                          />
                        </Box>
                      </Box>
                      <List
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer",
                        }}
                      >
                        {budgets
                          .filter((item, index) => {
                            if (minPrice && minBudget === 1) {
                              return (
                                parseFloat(item.value) > parseFloat(minPrice)
                              );
                            } else if (maxPrice && minBudget === 0) {
                              return (
                                parseFloat(item.value) < parseFloat(maxPrice)
                              );
                            } else {
                              return item.value;
                            }
                          })
                          .map((item, index) => (
                            <ListItem
                              key={index}
                              sx={{
                                fontSize: { xs: "10px", md: "15px" },
                                justifyContent: [
                                  minBudget === 1 ? "flex-end" : "flex-start",
                                ],
                              }}
                              onClick={() => {
                                if (minBudget === 1) {
                                  handleMaxPrice(item.value);
                                  setanchorBudget(null);
                                } else {
                                  handleMinPrice(item.value);
                                }
                              }}
                            >
                              ₹ {item.label}
                            </ListItem>
                          ))}
                      </List>
                    </Box>
                  </Menu>

                  {/* below the desktop search button  */}
                  <Box
                    sx={{
                      borderRadius: "25px",
                      display: "flex",
                      border: "1px solid #F8F8F8",
                      background: "#DB282F",
                      minWidth: { md: "132px", sm: "78px" },
                      height: { md: "51px", sm: "39px" },
                      "&:hover": {
                        backgroundColor: "#c12027",
                        color: "white",
                      },
                      color: "white",
                      fontFamily: "Jost, sans-serif",
                      fontSize: { md: "18px", xs: "11px" },
                      lineHeight: "normal",
                      textAlign: "center",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "0.3s ease-in-out",
                    }}
                    onClick={() =>
                      navigate(
                        "/property/" +
                        (cookies[
                          config.preferencesCookie
                        ]?.listingType?.toLowerCase() || null)
                      )
                    }
                  >
                    <SearchIcon sx={{ width: { xs: "12px", md: "19px" } }} />
                    Search
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Box>
      {/* property filter drawer  */}
      <Drawer
        open={openFilterDrawer}
        onClose={handleOpenFilterDrawer}
        anchor="bottom"
        PaperProps={{
          sx: { height: "100%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              px: 2,
            }}
          >
            <IconButton onClick={handleOpenFilterDrawer}>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              onClick={handleAddressDrawer}
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              {cookies[config.preferencesCookie]?.city || "City"}
              <KeyboardArrowDownIcon fontSize="small" />
            </Typography>
          </Box>
          <Typography onClick={handelReset} sx={{ color: "blue" }}>
            Reset
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {propertyTypesDetails?.map((propertyType, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #b2bec3",
                  borderRadius: "5px",
                  px: "15px",
                  mx: "5px",
                  py: "5px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleListingType(propertyType.listingType);
                }}
              >
                <svg
                  style={{
                    width: { md: "40px", xs: "20px" },
                    height: { md: "40px", xs: "20px" },
                  }}
                  viewBox="0 0 40 41"
                  fill={
                    activeListingType === propertyType.listingType
                      ? "#e74c3c"
                      : "#555656"
                  }
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.5 33H35V15.5C35 14.837 34.7366 14.2011 34.2678 13.7322C33.7989 13.2634 33.163 13 32.5 13H22.5V5.50001C22.5003 5.04729 22.3777 4.603 22.1452 4.21454C21.9127 3.82608 21.5791 3.50804 21.18 3.29437C20.7808 3.08069 20.3312 2.9794 19.879 3.00131C19.4268 3.02322 18.9891 3.1675 18.6125 3.41876L6.1125 11.75C5.76959 11.9788 5.48858 12.2888 5.29448 12.6525C5.10038 13.0161 4.99922 13.4222 5 13.8344V33H2.5C2.16848 33 1.85054 33.1317 1.61612 33.3661C1.3817 33.6005 1.25 33.9185 1.25 34.25C1.25 34.5815 1.3817 34.8995 1.61612 35.1339C1.85054 35.3683 2.16848 35.5 2.5 35.5H37.5C37.8315 35.5 38.1495 35.3683 38.3839 35.1339C38.6183 34.8995 38.75 34.5815 38.75 34.25C38.75 33.9185 38.6183 33.6005 38.3839 33.3661C38.1495 33.1317 37.8315 33 37.5 33ZM32.5 15.5V33H22.5V15.5H32.5ZM7.5 13.8344L20 5.50001V33H7.5V13.8344ZM17.5 18V20.5C17.5 20.8315 17.3683 21.1495 17.1339 21.3839C16.8995 21.6183 16.5815 21.75 16.25 21.75C15.9185 21.75 15.6005 21.6183 15.3661 21.3839C15.1317 21.1495 15 20.8315 15 20.5V18C15 17.6685 15.1317 17.3505 15.3661 17.1161C15.6005 16.8817 15.9185 16.75 16.25 16.75C16.5815 16.75 16.8995 16.8817 17.1339 17.1161C17.3683 17.3505 17.5 17.6685 17.5 18ZM12.5 18V20.5C12.5 20.8315 12.3683 21.1495 12.1339 21.3839C11.8995 21.6183 11.5815 21.75 11.25 21.75C10.9185 21.75 10.6005 21.6183 10.3661 21.3839C10.1317 21.1495 10 20.8315 10 20.5V18C10 17.6685 10.1317 17.3505 10.3661 17.1161C10.6005 16.8817 10.9185 16.75 11.25 16.75C11.5815 16.75 11.8995 16.8817 12.1339 17.1161C12.3683 17.3505 12.5 17.6685 12.5 18ZM12.5 26.75V29.25C12.5 29.5815 12.3683 29.8995 12.1339 30.1339C11.8995 30.3683 11.5815 30.5 11.25 30.5C10.9185 30.5 10.6005 30.3683 10.3661 30.1339C10.1317 29.8995 10 29.5815 10 29.25V26.75C10 26.4185 10.1317 26.1005 10.3661 25.8661C10.6005 25.6317 10.9185 25.5 11.25 25.5C11.5815 25.5 11.8995 25.6317 12.1339 25.8661C12.3683 26.1005 12.5 26.4185 12.5 26.75ZM17.5 26.75V29.25C17.5 29.5815 17.3683 29.8995 17.1339 30.1339C16.8995 30.3683 16.5815 30.5 16.25 30.5C15.9185 30.5 15.6005 30.3683 15.3661 30.1339C15.1317 29.8995 15 29.5815 15 29.25V26.75C15 26.4185 15.1317 26.1005 15.3661 25.8661C15.6005 25.6317 15.9185 25.5 16.25 25.5C16.5815 25.5 16.8995 25.6317 17.1339 25.8661C17.3683 26.1005 17.5 26.4185 17.5 26.75Z"
                  // Remove the fill attribute from here
                  />
                </svg>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color:
                      activeListingType === propertyType.listingType
                        ? "#e74c3c"
                        : "#000",
                  }}
                >
                  {propertyType.listingType}
                </Typography>
              </Box>
            ))}
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              placeholder="Search"
              size="small"
              fullWidth
              value={searchText || ""}
              onChange={(e) => setSearchText(e.target.value)}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Mulish, sans-serif",
              fontSize: { md: "16px", xs: "13px" },
              mt: 3,
            }}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Typography
              sx={{
                textWrap: "nowrap",
                fontWeight: 800,
                ml: 3,
                userSelect: "none",
              }}
            >
              Property Type
            </Typography>
          </Box>
          <MenuList
            autoFocusItem={open}
            id="composition-menu"
            aria-labelledby="composition-button"
            onKeyDown={handleListKeyDown}
          >
            <MenuItem style={{ fontSize: { xs: "10px" } }}>
              {propertyTypesDetails
                ?.find((item) => item.listingType === activeListingType)
                .buildingTypes?.map((propertyTypeN, index) => (
                  <Box sx={{ marginRight: "5px" }} key={index}>
                    <input
                      type="radio"
                      name="radio1"
                      value={buildingType || ""}
                      checked={buildingType === propertyTypeN.buildingType}
                      onChange={() => {
                        handleBuildingType(propertyTypeN.buildingType);
                      }}
                      style={{ marginRight: "3px" }}
                    />
                    {propertyTypeN.buildingType}
                  </Box>
                ))}
            </MenuItem>

            {buildingType && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  p: 1,
                }}
              >
                {propertyTypesDetails
                  .find((item) => item.listingType === activeListingType)
                  ?.buildingTypes?.find(
                    (item) => item.buildingType === buildingType
                  )
                  ?.propertyTypes.map((item, index) => (
                    <Box mr={0.5} className="mydict" key={index}>
                      <label className="mydict1 border2">
                        <input
                          type="radio"
                          name="radio7"
                          value={item || ""}
                          onChange={(event) => {
                            setPropertyType(event.target.value);
                          }}
                          checked={propertyType === item}
                          readOnly
                        />
                        <dev className="border2">
                          <Box
                            sx={{
                              fontSize: {
                                md: "13px",
                                xs: "12px",
                              },
                              fontFamily: "Mulish, sans-serif",
                            }}
                          >
                            {item}
                          </Box>
                        </dev>
                      </label>
                    </Box>
                  ))}
              </Box>
            )}
          </MenuList>
          <Grid item>
            <Box
              sx={{
                // display: "flex",
                alignItems: "center",
                fontFamily: "Mulish, sans-serif",
                fontSize: { md: "18px", xs: "13px" },
              }}
              aria-controls="simple-menu"
              aria-haspopup="true"
            // onClick={(event) => setanchorBudget(event.currentTarget)}
            >
              <Box
                sx={{
                  textWrap: "nowrap",
                  fontWeight: 800,
                  ml: 3,
                  fontSize: "15px  ",
                }}
              >
                {/* {minPrice && maxPrice
                  ? `₹ ${
                      budgets.find((item) => item.value === minPrice)?.label
                    } - ₹ ${
                      budgets.find((item) => item.value === maxPrice)?.label
                    }`
                  : "Budget"} */}
                Budget
              </Box>
              <List>
                <ListItem sx={{ gap: "20px" }}>
                  <TextField
                    variant="outlined"
                    placeholder="min"
                    size="small"
                    value={minPrice || ""}
                    onClick={(e) => {
                      setanchorBudget(e.currentTarget);
                      handleMinPrice(e.target.value);
                      setminBudget(0);
                    }}
                    sx={{ width: "50%" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyboardArrowDownIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  -
                  <TextField
                    variant="outlined"
                    placeholder="max"
                    size="small"
                    value={maxPrice || ""}
                    onClick={(e) => {
                      setanchorBudget(e.currentTarget);
                      handleMaxPrice(e.target.value);
                      setminBudget(1);
                    }}
                    sx={{ width: "50%" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyboardArrowDownIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </ListItem>
              </List>
            </Box>
            <Menu
              id="simple-menu"
              anchorEl={anchorBudget}
              keepMounted
              open={Boolean(anchorBudget)}
              onClose={() => setanchorBudget(null)}
              style={{ fontSize: { xs: "10px" } }}
            >
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                {budgets
                  .filter((item, index) => {
                    if (minPrice && minBudget === 1) {
                      return parseFloat(item.value) > parseFloat(minPrice);
                    } else if (maxPrice && minBudget === 0) {
                      return parseFloat(item.value) < parseFloat(maxPrice);
                    } else {
                      return item.value;
                    }
                  })
                  .map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        fontSize: { xs: "20px" },
                        justifyContent: [
                          minBudget === 1 ? "flex-end" : "flex-start",
                        ],
                      }}
                      onClick={() => {
                        if (minBudget === 1) {
                          handleMaxPrice(item.value);
                          setanchorBudget(null);
                        } else {
                          handleMinPrice(item.value);
                          setanchorBudget(null);
                        }
                      }}
                    >
                      ₹ {item.label}
                    </ListItem>
                  ))}
              </List>
            </Menu>
          </Grid>
        </List>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            textAlign: "center",
          }}
          onClick={() =>
            navigate(
              "/property/" +
              (cookies[
                config.preferencesCookie
              ]?.listingType?.toLowerCase() || null)
            )
          }
        >
          <Button variant="contained" color="success" sx={{ width: "94%" }}>
            View Properties
          </Button>
        </Box>
      </Drawer>

      {/* Address Drawer */}
      <Drawer
        open={addressDrawer}
        onClose={handleAddressDrawer}
        anchor="right"
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
          <IconButton onClick={handleAddressDrawer}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <>
            <ListItem>
              <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
                fullWidth
                value={searchCity || ""}
                onChange={(e) => setSearchCity(e.target.value)}
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
            {!searchCity && !debounceSearchCity ? (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    px: "15px",
                    columnGap: "10px",
                  }}
                >
                  {indiaTopCities?.map((city, index) => (
                    <Box
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
                      key={city.name}
                      onClick={() => {
                        setCity(city.name);
                        handleAddressDrawer();
                      }}
                    >
                      <img src={city.svg} height="30px" alt="cities" />
                      <Typography
                        variant="caption"
                        sx={{ "&:hover": { color: "blue" } }}
                      >
                        {city.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                {citiesData?.cities?.map((city) => (
                  <ListItem
                    key={city}
                    button
                    onClick={() => {
                      setCity(city);
                      handleAddressDrawer();
                    }}
                  >
                    <ListItemText primary={city} />
                  </ListItem>
                ))}
              </>
            ) : (
              filteredCitiesList?.map((city) => (
                <ListItem
                  key={city}
                  button
                  onClick={() => {
                    setCity(city);
                    handleAddressDrawer();
                  }}
                >
                  <ListItemText primary={city} />
                </ListItem>
              ))
            )}
          </>
        </List>
      </Drawer>
    </>
  );
};

export default BannerSection;
