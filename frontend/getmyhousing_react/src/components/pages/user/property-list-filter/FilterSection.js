import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Popover,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchSuggetions from "../../../home-components/SearchSuggetions";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../../apis/apiServices";
import { config } from "../../../../config/config";
import { useDebounce } from "../../../custom-hook/useDebounce";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  amenityList,
  bhkList,
  buyBudgets,
  facingList,
  furnish,
  positionstatus,
  propertyTypesDetails,
  rentBudgets,
  sizesList,
} from "../../../../common/common";

const FilterSection = ({
  handleChangePropertyFetching,
  handleClearAllFilter,
  openFilterDrawer,
  handleChangeFilter,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [cookies, setCookies] = useCookies();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchProperties, setSearchProperties] = useState("");
  const [searchedPropertiesList, setSearchedPropertiesList] = useState([]);
  const [propertyFetching, setPropertyFetching] = useState(false);
  const debounceSearch = useDebounce(searchProperties, 500);
  const [minPropertySize, setminPropertySize] = useState();
  const [minBudget, setminBudget] = useState(null);
  const [propertyListingType, setPropertyListingType] = useState(
    cookies[config.preferencesCookie]?.listingType || null
  );

  const handleChangeListingType = (newValue) => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      listingType: newValue,
    });

    // Update the cookie
    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000, // Adjust as needed
      sameSite: "strict",
    });

    setPropertyListingType(newValue);
  };

  //   below the store the value different type filter
  const [bhk, setBhk] = useState(cookies[config.preferencesCookie]?.bhk || []);
  const [amenities, setAmenities] = useState(
    cookies[config.preferencesCookie]?.amenities || []
  );
  const [furnishedType, setFurnishedType] = useState(
    cookies[config.preferencesCookie]?.furnishType || ""
  );
  const [facing, setFacing] = useState(
    cookies[config.preferencesCookie]?.facing || []
  );

  const [minPrice, setMinPrice] = useState(
    cookies[config.preferencesCookie]?.minPrice
  );
  const [propertyType, setPropertyType] = useState(
    cookies[config.preferencesCookie]?.propertyType || null
  );
  const [maxPrice, setMaxPrice] = useState(
    cookies[config.preferencesCookie]?.maxPrice
  );
  const [possessionStatus, setPossessionStatus] = useState(
    cookies[config.preferencesCookie]?.possessionStatus || null
  );
  const [minSize, setMinSize] = useState(
    cookies[config.preferencesCookie]?.minSize || null
  );
  const [buildingType, setbuildingType] = useState(
    cookies[config.preferencesCookie]?.buildingType || null
  );
  const [maxSize, setMaxSize] = useState(
    cookies[config.preferencesCookie]?.maxSize || null
  );

  //   below the anchor states
  const [listingTypeAnchor, setListingTypeAnchor] = useState(null);
  const [propertyTypeAnchor, setPropertyTypeAnchor] = useState(null);
  const [amenitiesAnchor, setAmenitiesAnchor] = useState(null);
  const [
    furnishedAndPossessionMenuAnchor,
    setFurnishedAndPossessionMenuAnchor,
  ] = useState(null);
  const [bhkAnchor, setBhkAnchor] = useState(null);
  const [facingAnchor, setFacingAnchor] = useState(null);
  const [budgetAnchor, setBudgetAnchor] = useState(null);
  const [sizeAnchor, setSizeAnchor] = useState(null);

  useEffect(() => {
    navigate(
      "/property/" +
      cookies[config.preferencesCookie]?.listingType?.toLowerCase()
    );
  }, [propertyListingType]);

  const budgets =
    propertyListingType === "Buy"
      ? buyBudgets
      : propertyListingType === "Rent"
        ? rentBudgets
        : propertyListingType === "Lease"
          ? buyBudgets
          : [];

  const handleFilterMenu = (event, anchorSetter) => {
    anchorSetter(event.currentTarget);
  };

  useEffect(() => {
    if (debounceSearch) {
      setPropertyFetching(true);
    } else {
      setSearchedPropertiesList([]);
      setPropertyFetching(false);
    }
  }, [debounceSearch]);

  const handleListingTypeChange = (value) => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      listingType: value,
    });

    // Update the cookie
    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000, // Adjust as needed
      sameSite: "strict",
    });

    // Update local state and perform other actions
    setListingTypeAnchor(null);
    setPropertyListingType(value);
    handleChangePropertyFetching();
  };

  const handleBuildingTypeChange = (value) => {
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
    setbuildingType(value);
    setPropertyTypeAnchor(null);
    handleChangePropertyFetching();
  };

  const handlePropertyTypeChange = (value) => {
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
    setPropertyTypeAnchor(null);
    handleChangePropertyFetching();
  };

  const handleBHKChange = (event) => {
    let newBHK = [...bhk];
    if (event.target.checked) {
      newBHK.push(event.target.value);
    } else {
      newBHK = newBHK.filter((bhk) => bhk !== event.target.value);
    }

    // Update the cookie immediately
    const updatedCookieValue = {
      ...cookies[config.preferencesCookie],
      bhk: newBHK,
    };

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });

    // Update the state
    setBhk(newBHK);
    setBhkAnchor(null);
    handleChangePropertyFetching();
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    if (minPrice === "") {
      setMinPrice(null);
    }

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
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    if (maxPrice === "") {
      setMaxPrice(null);
    }

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
  };

  const handleMinSizeChange = (value) => {
    setMinSize(value);

    if (minSize === "") {
      setMinSize(null);
    }

    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      minSize: value,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
  };

  const handleMaxSizeChange = (value) => {
    setMaxSize(value);
    if (maxSize === "") {
      setMaxSize(null);
    }

    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      maxSize: value,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
  };

  const handleFacingChange = (event) => {
    let newFacing = [...facing];
    if (event.target.checked) {
      newFacing.push(event.target.value);
    } else {
      newFacing = newFacing.filter((facing) => facing !== event.target.value);
    }
    setFacing(newFacing);

    // Create updated cookie value immediately
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      facing: newFacing,
    });

    // Update the cookie without delay
    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000, // Adjust maxAge as needed
      sameSite: "strict",
    });

    setFacingAnchor(null);
    handleChangePropertyFetching();
  };

  const handleAmenitiesChange = (event) => {
    let newAmenities = [...amenities];
    if (event.target.checked) {
      newAmenities.push(event.target.value);
    } else {
      newAmenities = newAmenities.filter(
        (amenity) => amenity !== event.target.value
      );
    }

    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      amenities: newAmenities,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });

    setAmenities(newAmenities);
    setAmenitiesAnchor(null);
    handleChangePropertyFetching();
  };

  const handleFurnishingStatusChange = (event) => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      furnishType: event.target.value,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
    setFurnishedType(event.target.checked ? event.target.value : "");
    setFurnishedAndPossessionMenuAnchor(null);
    handleChangePropertyFetching();
  };

  const handlePossessionStatus = (event) => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      possessionStatus: event.target.value,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
    setPossessionStatus(event.target.value);
    setFurnishedAndPossessionMenuAnchor(null);
    handleChangePropertyFetching();
  };

  // below the api is for search result
  useEffect(() => {
    const searchProperties = async () => {
      let params = {
        searchText: debounceSearch,
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
          setSearchedPropertiesList(response.data.searchByProperties);
        } else {
          alert("An error occurred while fetching search property data!");
        }
      } else {
        alert("An error occurred while fetching search property data!!");
      }
    };
    if (propertyFetching) {
      searchProperties();
      setPropertyFetching(false);
    }
  }, [cookies, propertyFetching, debounceSearch]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: "#dcdde1",
          boxShadow: "0px 2.4px 4.8px 0px rgba(0, 0, 0, 0.15)",
          position: "sticky",
          zIndex: 5,
          pt: 2,
          top: { md: "103px", xs: "72px" },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            pb: 2,
            scrollbarColor: "#ff0000 #dcdde1",
          }}
        >
          {/* below the select listing type and search field  */}
          <Box
            sx={{
              display: "flex",
              padding: "0px 8px",
              alignItems: "center",
              gap: { md: "5px", xs: "2px" },
              borderRadius: "5px",
              border: "1px solid #000",
              background: "#FFF",
            }}
          >
            <Box
              component={"img"}
              src="/media/images/rentIcon.svg"
              width="15px"
              onClick={(event) => handleFilterMenu(event, setListingTypeAnchor)}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event) => handleFilterMenu(event, setListingTypeAnchor)}
            >
              <Typography sx={{ fontSize: "15px" }}>
                {cookies[config.preferencesCookie]?.listingType}
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
            </Box>
            {/* listing type dropdown below  */}
            <Popover
              id="simple-menu"
              anchorEl={listingTypeAnchor}
              open={Boolean(listingTypeAnchor)}
              onClose={() => setListingTypeAnchor(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem
                sx={{
                  fontSize: { md: "15px", xs: "10px" },
                  userSelect: "none",
                }}
                onClick={() => handleListingTypeChange("Buy")}
              >
                Buy
              </MenuItem>
              <Divider />
              <MenuItem
                sx={{
                  fontSize: { md: "15px", xs: "10px" },
                  userSelect: "none",
                }}
                onClick={() => handleListingTypeChange("Rent")}
              >
                Rent
              </MenuItem>
            </Popover>
            <Box
              sx={{
                width: { sm: "280px", xs: "100%" },
              }}
            >
              <SearchSuggetions
                setValue={setSearchProperties}
                initialValue={searchProperties}
                options={searchedPropertiesList}
              />
            </Box>
          </Box>
          {isMobile ? null : (
            <Box sx={{ display: "flex", overflow: "auto", gap: "10px" }}>
              {/* below the filter related to property type  */}
              <Box
                sx={{
                  display: "flex",
                  height: { md: "35px", xs: "35px" },
                  padding: "0px 8px",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "5px",
                  border: "0.2px solid var(--BG-Color-6, #7C7C7C)",
                  background: "#FFF",
                  maxWidth: "192px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Mulish, sans-serif",
                    fontSize: { md: "18px", xs: "13px" },
                    whiteSpace: "nowrap",
                  }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) =>
                    setPropertyTypeAnchor(event.currentTarget)
                  }
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                    }}
                  >
                    Property Type
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
                </Box>
                <Menu
                  id="simple-menu"
                  anchorEl={propertyTypeAnchor}
                  keepMounted
                  open={Boolean(propertyTypeAnchor)}
                  onClose={() => setPropertyTypeAnchor(null)}
                  sx={{ maxHeight: "400px" }}
                >
                  <Box
                    sx={{
                      padding: "5px 14px",
                    }}
                  >
                    {propertyTypesDetails
                      ?.find((item) => item.listingType === propertyListingType)
                      .buildingTypes?.map((item) => (
                        <label
                          htmlFor={`radio-${item.buildingType}`}
                          className="radio-listingType"
                        >
                          <input
                            id={`radio-${item.buildingType}`}
                            type="radio"
                            name="radio1"
                            value={item.buildingType || ""}
                            checked={buildingType === item.buildingType}
                            onChange={() =>
                              handleBuildingTypeChange(item.buildingType)
                            }
                            style={{ marginRight: "10px", accentColor: "red" }}
                          />
                          {item.buildingType}
                        </label>
                      ))}
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      py: 1,
                      px: "7px",
                    }}
                  >
                    {buildingType && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column", // Align items horizontally
                          alignItems: "flex-start", // Center items vertically
                        }}
                      >
                        {propertyTypesDetails
                          .find(
                            (item) => item.listingType === propertyListingType
                          )
                          ?.buildingTypes?.find(
                            (buildingTypes) =>
                              buildingTypes.buildingType === buildingType
                          )
                          ?.propertyTypes?.map((item, index, array) => (
                            <React.Fragment key={index}>
                              <label
                                htmlFor={`radio-${index}`}
                                className="sub-property-type"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  id={`radio-${index}`}
                                  type="checkbox"
                                  name="radio7"
                                  value={item || ""}
                                  onChange={(event) =>
                                    handlePropertyTypeChange(event.target.value)
                                  }
                                  checked={propertyType === item}
                                  readOnly
                                  className="filter-sub-property-type-checkbox"
                                />
                                {item}
                              </label>
                              {index !== array?.length - 1 && (
                                <Divider
                                  sx={{ height: "1px", width: "100%" }}
                                />
                              )}
                            </React.Fragment>
                          ))}
                      </Box>
                    )}
                  </Box>
                </Menu>
              </Box>
              {/* below the filter related to bhk  */}
              <Box
                sx={{
                  display: "flex",
                  height: { md: "35px", xs: "35px" },
                  padding: "0px 8px",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "5px",
                  border: "0.2px solid var(--BG-Color-6, #7C7C7C)",
                  background: "#FFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Mulish, sans-serif",
                    fontSize: { md: "18px", xs: "13px" },
                  }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) => setBhkAnchor(event.currentTarget)}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                    }}
                  >
                    BHK
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
                </Box>
                <Menu
                  id="simple-menu"
                  anchorEl={bhkAnchor}
                  keepMounted
                  open={Boolean(bhkAnchor)}
                  onClose={() => setBhkAnchor(null)}
                  style={{
                    fontSize: { xs: "10px" },
                    maxHeight: "400px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Align items horizontally
                      alignItems: "flex-start", // Center items vertically
                      padding: "7px 5px",
                    }}
                  >
                    {bhkList?.map((item, index, array) => (
                      <React.Fragment key={index}>
                        <label
                          htmlFor={`radio1-${index}`}
                          className="sub-property-type"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            id={`radio1-${index}`}
                            type="checkbox"
                            name="bhk"
                            value={item || ""}
                            onChange={(event) => handleBHKChange(event)}
                            checked={bhk.includes(item)}
                            className="filter-sub-property-type-checkbox"
                          />
                          {item}
                        </label>
                        {index !== array?.length - 1 && (
                          <Divider sx={{ height: "1px", width: "100%" }} />
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Menu>
              </Box>
              {/* below the filter related to budget  */}
              <Box
                sx={{
                  display: "flex",
                  height: { md: "35px", xs: "35px" },
                  padding: "0px 8px",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "5px",
                  border: "0.2px solid var(--BG-Color-6, #7C7C7C)",
                  background: "#FFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Mulish, sans-serif",
                    fontSize: { md: "18px", xs: "13px" },
                  }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) => setBudgetAnchor(event.currentTarget)}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                    }}
                  >
                    Budget
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
                </Box>
                <Menu
                  id="simple-menu"
                  anchorEl={budgetAnchor}
                  keepMounted
                  open={Boolean(budgetAnchor)}
                  onClose={() => setBudgetAnchor(null)}
                  sx={{
                    fontSize: { xs: "10px" },
                    maxHeight: "400px",
                  }}
                >
                  <Box style={{ fontSize: { xs: "10px" }, width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "50%", textAlign: "center", m: 2 }}>
                        <input
                          placeholder="Min"
                          value={minPrice || ""}
                          style={{
                            width: "100px",
                            padding: "10px",
                            borderRadius: 6,
                            backgroundColor: "#f1f1ff",
                            border: "none",
                          }}
                          onClick={() => {
                            setminBudget(0);
                          }}
                          onChange={(e) => handleMinPriceChange(e.target.value)}
                        />
                      </Box>
                      -
                      <Box sx={{ width: "50%", textAlign: "center", m: 2 }}>
                        <input
                          placeholder="Max"
                          value={maxPrice || ""}
                          style={{
                            width: "100px",
                            padding: "10px",
                            borderRadius: 6,
                            backgroundColor: "#f1f1ff",
                            border: "none",
                          }}
                          onClick={() => {
                            setminBudget(1);
                          }}
                          onChange={(e) => handleMaxPriceChange(e.target.value)}
                        />
                      </Box>
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
                          return parseFloat(item.value) > parseFloat(minPrice);
                        } else if (maxPrice && minBudget === 0) {
                          return parseFloat(item.value) < parseFloat(maxPrice);
                        } else {
                          return item.value;
                        }
                      })
                      ?.map((item, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            fontSize: { xs: "10px", md: "15px" },
                            justifyContent:
                              minBudget === 1 ? "flex-end" : "flex-start",
                          }}
                          onClick={() => {
                            if (minBudget === 1) {
                              setMaxPrice(item.value);
                            } else {
                              setMinPrice(item.value);
                            }
                            if (minPrice) {
                              setBudgetAnchor(null);
                              handleChangePropertyFetching();
                            }
                          }}
                        >
                          ₹ {item.label}
                        </ListItem>
                      ))}
                  </List>
                </Menu>
              </Box>
              {/* below the filter related to Size  */}
              <Box
                sx={{
                  display: "flex",
                  height: { md: "35px", xs: "35px" },
                  padding: "0px 8px",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "5px",
                  border: "0.2px solid var(--BG-Color-6, #7C7C7C)",
                  background: "#FFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Mulish, sans-serif",
                    fontSize: { md: "18px", xs: "13px" },
                  }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) => setSizeAnchor(event.currentTarget)}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                    }}
                  >
                    Size
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
                </Box>
                <Menu
                  id="simple-menu"
                  anchorEl={sizeAnchor}
                  keepMounted
                  open={Boolean(sizeAnchor)}
                  onClose={() => setSizeAnchor(null)}
                  sx={{
                    fontSize: { xs: "10px" },
                    maxHeight: "400px",
                  }}
                >
                  <Box style={{ fontSize: { xs: "10px" }, width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "50%", textAlign: "center", m: 2 }}>
                        <input
                          placeholder="Min"
                          value={minSize || ""}
                          style={{
                            width: "100px",
                            padding: "10px",
                            borderRadius: 6,
                            backgroundColor: "#f1f1ff",
                            border: "none",
                          }}
                          onClick={() => {
                            setminPropertySize(0);
                          }}
                          onChange={(e) => handleMinSizeChange(e.target.value)}
                        />
                      </Box>
                      -
                      <Box sx={{ width: "50%", textAlign: "center", m: 2 }}>
                        <input
                          placeholder="Max"
                          value={maxSize || ""}
                          style={{
                            width: "100px",
                            padding: "10px",
                            borderRadius: 6,
                            backgroundColor: "#f1f1ff",
                            border: "none",
                          }}
                          onClick={() => {
                            setminPropertySize(1);
                          }}
                          onChange={(e) => handleMaxSizeChange(e.target.value)}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <List
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                  >
                    {sizesList
                      .filter((item, index) => {
                        if (minSize && minPropertySize === 1) {
                          return parseFloat(item.value) > parseFloat(minSize);
                        } else if (maxSize && minPropertySize === 0) {
                          return parseFloat(item.value) < parseFloat(maxSize);
                        } else {
                          return item.value;
                        }
                      })
                      ?.map((item, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            fontSize: { xs: "15px", md: "15px" },
                            justifyContent:
                              minPropertySize === 1 ? "flex-end" : "flex-start",
                          }}
                          onClick={() => {
                            if (minPropertySize === 1) {
                              setMaxSize(item.value);
                            } else {
                              setMinSize(item.value);
                            }
                            if (minSize) {
                              setSizeAnchor(null);
                              handleChangePropertyFetching();
                            }
                          }}
                        >
                          ₹ {item.label}
                        </ListItem>
                      ))}
                  </List>
                </Menu>
              </Box>

              {/* below the filter related on vastu facing  */}
              <Box
                sx={{
                  display: "flex",
                  height: { md: "35px", xs: "35px" },
                  padding: "0px 8px",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "5px",
                  border: "0.2px solid var(--BG-Color-6, #7C7C7C)",
                  background: "#FFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Mulish, sans-serif",
                    fontSize: { md: "18px", xs: "13px" },
                    whiteSpace: "nowrap",
                  }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) => setFacingAnchor(event.currentTarget)}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                    }}
                  >
                    Vastu Facing
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
                </Box>
                <Menu
                  id="simple-menu"
                  anchorEl={facingAnchor}
                  keepMounted
                  open={Boolean(facingAnchor)}
                  onClose={() => setFacingAnchor(null)}
                  style={{ fontSize: { xs: "10px" }, maxHeight: "400px" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Align items horizontally
                      alignItems: "flex-start", // Center items vertically
                      padding: "7px 5px",
                    }}
                  >
                    {facingList?.map((item, index, array) => (
                      <React.Fragment key={index}>
                        <label
                          htmlFor={`radio4-${index}`}
                          className="sub-property-type"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            id={`radio4-${index}`}
                            type="checkbox"
                            name="bhk"
                            value={item || ""}
                            onChange={(event) => handleFacingChange(event)}
                            checked={facing.includes(item)}
                            className="filter-sub-property-type-checkbox"
                          />
                          {item}
                        </label>
                        {index !== array?.length - 1 && (
                          <Divider sx={{ height: "1px", width: "100%" }} />
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Menu>
              </Box>
              {/* below the filter related on amenities  */}
              <Box
                sx={{
                  display: "flex",
                  height: { md: "35px", xs: "35px" },
                  padding: "0px 8px",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "5px",
                  border: "0.2px solid var(--BG-Color-6, #7C7C7C)",
                  background: "#FFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Mulish, sans-serif",
                    fontSize: { md: "18px", xs: "13px" },
                    whiteSpace: "nowrap",
                  }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) => setAmenitiesAnchor(event.currentTarget)}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                    }}
                  >
                    Amenities
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
                </Box>
                <Menu
                  id="simple-menu"
                  anchorEl={amenitiesAnchor}
                  keepMounted
                  open={Boolean(amenitiesAnchor)}
                  onClose={() => setAmenitiesAnchor(null)}
                  style={{ fontSize: { xs: "10px" }, maxHeight: "400px" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Align items horizontally
                      alignItems: "flex-start", // Center items vertically
                      padding: "7px 5px",
                    }}
                  >
                    {amenityList?.map((item, index, array) => (
                      <React.Fragment key={index}>
                        <label
                          htmlFor={`checkbox-${index}`}
                          className="sub-property-type"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            id={`checkbox-${index}`}
                            type="checkbox"
                            name="amenities"
                            value={item || ""}
                            onChange={(event) => handleAmenitiesChange(event)}
                            checked={amenities.includes(item)}
                            className="filter-sub-property-type-checkbox"
                          />
                          {item}
                        </label>
                        {index !== array?.length - 1 && (
                          <Divider sx={{ height: "1px", width: "100%" }} />
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Menu>
              </Box>
              {/* below the filter related on furnished type and Possission Status  */}
              <Box
                sx={{
                  display: "flex",
                  height: { md: "35px", xs: "35px" },
                  padding: "0px 8px",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "5px",
                  border: "0.2px solid var(--BG-Color-6, #7C7C7C)",
                  background: "#FFF",
                  maxWidth: "192px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Mulish, sans-serif",
                      fontSize: { md: "18px", xs: "13px" },
                      whiteSpace: "nowrap",
                    }}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(event) =>
                      setFurnishedAndPossessionMenuAnchor(event.currentTarget)
                    }
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        userSelect: "none",
                      }}
                    >
                      More Filters
                    </Typography>
                    <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
                  </Box>
                  <Menu
                    id="simple-menu"
                    anchorEl={furnishedAndPossessionMenuAnchor}
                    keepMounted
                    open={Boolean(furnishedAndPossessionMenuAnchor)}
                    onClose={() => setFurnishedAndPossessionMenuAnchor(null)}
                    sx={{ maxHeight: "400px" }}
                  >
                    <Box
                      sx={{
                        py: 1,
                        px: "7px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column", // Align items horizontally
                          alignItems: "flex-start", // Center items vertically
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Furnished Type:
                        </Typography>
                        <Divider sx={{ height: "1px", width: "100%" }} />

                        {/* Content for Furnished Type */}
                        {furnish?.map((item, index, array) => (
                          <React.Fragment key={index}>
                            <label
                              htmlFor={`radio3-${index}`}
                              className="sub-property-type"
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <input
                                id={`radio3-${index}`}
                                type="checkbox"
                                name="radio7"
                                value={item || ""}
                                onChange={(event) =>
                                  handleFurnishingStatusChange(event)
                                }
                                checked={furnishedType === item}
                                className="filter-sub-property-type-checkbox"
                              />
                              {item}
                            </label>
                          </React.Fragment>
                        ))}
                        {/* Conditionally render Possession Status */}
                        {cookies[config.preferencesCookie]?.listingType ===
                          "Buy" && (
                            <React.Fragment>
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  pt: 2,
                                }}
                              >
                                Possession Status:
                              </Typography>
                              <Divider sx={{ height: "1px", width: "100%" }} />

                              {positionstatus?.map((item, index, array) => (
                                <React.Fragment key={index}>
                                  <label
                                    htmlFor={`radio-${index}`}
                                    className="sub-property-type"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <input
                                      id={`radio-${index}`}
                                      type="checkbox"
                                      name="radio8"
                                      value={item || ""}
                                      onChange={(event) =>
                                        handlePossessionStatus(event)
                                      }
                                      checked={possessionStatus === item}
                                      readOnly
                                      className="filter-sub-property-type-checkbox"
                                    />
                                    {item}
                                  </label>
                                </React.Fragment>
                              ))}
                            </React.Fragment>
                          )}
                      </Box>
                    </Box>
                  </Menu>
                </Box>
              </Box>

              {/* below the clear all filtered data button  */}
              <Box
                sx={{
                  color: "#DB282F",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  display: "flex",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  alignItems: "center",
                  userSelect: "none",
                  px: 1,
                  borderRadius: "12px",
                  transition: "background-color 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "rgba(246, 153, 153, 0.594)"
                  }
                }}
                onClick={() => {
                  handleClearAllFilter();
                  handleChangePropertyFetching();
                }}
              >
                <RefreshIcon
                  sx={{ color: "#DB282F", mr: 1, fontSize: "17px", mr: 1 }}
                />
                Clear all
              </Box>
            </Box>
          )}
        </Container>
      </Box>

      <Drawer
        anchor={"bottom"}
        open={openFilterDrawer}
        onClose={handleChangeFilter}
      >
        <Box sx={{ height: "100vh" }}>
          <Box className="filter-drawer-top" sx={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", alignItems: "center" }}>
            <Typography variant="h6">Get My Housing</Typography>
            <IconButton onClick={handleChangeFilter}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ mt: 2, pb: 4 }}>
            {/* below the listing type selection start  */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                mx: "auto",
                gap: "30px",
                my: 2,
              }}
            >
              {propertyTypesDetails?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#f2f3f7",
                    boxShadow:
                      "1em 1em 1em #d8dae0b1, -0.75em -0.75em 1em #ffffff",
                    border: "1.5px solid #f2f3f7",
                    py: 1.5,
                    px: 2.5,
                    "&:hover": {
                      color: "#F63C43",
                      border: "1.5px solid #F63C43",
                      "& svg path": {
                        fill: "#F63C43",
                      },
                      "& .box-text": {
                        color: "#F63C43",
                      },
                    },
                    ...(propertyListingType === item.listingType && {
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
                    handleChangeListingType(item.listingType);
                  }}
                >
                  <svg
                    style={{
                      width: "30px",
                      height: "30px",
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

                  <Typography
                    className="box-text"
                    component={"span"}
                    sx={{
                      color: "#555656",
                      textAlign: "center",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeListingType(item.listingType)}
                  >
                    {item.listingType}
                  </Typography>
                </Box>
              ))}
            </Box>
            {/* above the listing type selection end  */}
            <Divider />
            {/* below the building type selection end  */}
            <Box sx={{ my: 2, width: "90%", mx: "auto" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Building Type
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  mt: 1,
                }}
              >
                {propertyTypesDetails
                  ?.find((item) => item.listingType === propertyListingType)
                  .buildingTypes?.map((item, index) => (
                    <label
                      htmlFor={`radio-${item.buildingType}`}
                      style={{
                        justifyContent: "center",
                        padding: "7px 10px",
                        backgroundColor:
                          buildingType === item.buildingType
                            ? "rgba(255, 0, 0, 0.3)"
                            : "transparent",
                        cursor: "pointer",
                        textAlign: "center",
                        borderRadius: "25px",
                        border:
                          buildingType === item.buildingType
                            ? "2px solid red"
                            : "2px solid gray",
                        fontSize: "14px",
                      }}
                    >
                      <input
                        id={`radio-${item.buildingType}`}
                        type="radio"
                        name="radio1"
                        value={item.buildingType || ""}
                        checked={buildingType === item.buildingType}
                        onChange={() =>
                          handleBuildingTypeChange(item.buildingType)
                        }
                        style={{
                          display: "none",
                        }}
                      />
                      {item.buildingType}
                    </label>
                  ))}
              </Box>
            </Box>
            {/* above the building type selection end  */}
            <Divider />
            {/* below the property type selection end  */}
            {buildingType && (
              <Box sx={{ my: 2, width: "90%", mx: "auto" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Property Type
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    mt: 1,
                  }}
                >
                  {propertyTypesDetails
                    .find((item) => item.listingType === propertyListingType)
                    ?.buildingTypes?.find(
                      (item) => item.buildingType === buildingType
                    )
                    ?.propertyTypes?.map((item, index) => (
                      <label
                        key={index}
                        htmlFor={`radio-${item}`}
                        style={{
                          justifyContent: "center",
                          padding: "7px 10px",
                          backgroundColor:
                            propertyType === item
                              ? "rgba(255, 0, 0, 0.3)"
                              : "transparent",
                          cursor: "pointer",
                          textAlign: "center",
                          borderRadius: "25px",
                          border:
                            propertyType === item
                              ? "2px solid red"
                              : "2px solid gray",
                          fontSize: "14px",
                        }}
                      >
                        <input
                          id={`radio-${item}`}
                          type="radio"
                          name="radio1"
                          value={propertyType || ""}
                          checked={propertyType === item}
                          onChange={() => handlePropertyTypeChange(item)}
                          style={{
                            display: "none",
                          }}
                        />
                        {item}
                      </label>
                    ))}
                </Box>
              </Box>
            )}
            {/* above the property type selection end  */}
            <Divider />
            {/* below the bhk selection end  */}
            <Box sx={{ my: 2, width: "90%", mx: "auto" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                BHK
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  mt: 1,
                }}
              >
                {bhkList?.map((item, index, array) => (
                  <label
                    key={index}
                    htmlFor={`radio-${index}`}
                    style={{
                      justifyContent: "center",
                      padding: "7px 10px",
                      backgroundColor: bhk.includes(item)
                        ? "rgba(255, 0, 0, 0.3)"
                        : "transparent",
                      cursor: "pointer",
                      textAlign: "center",
                      borderRadius: "25px",
                      border: bhk.includes(item)
                        ? "2px solid red"
                        : "2px solid gray",
                      fontSize: "14px",
                    }}
                  >
                    <input
                      id={`radio-${index}`}
                      type="checkbox"
                      name="bhk"
                      value={item || ""}
                      checked={bhk.includes(item)}
                      onChange={handleBHKChange}
                      style={{
                        display: "none",
                      }}
                    />
                    {item}
                  </label>
                ))}
              </Box>
            </Box>
            {/* above the bhk selection end  */}
            <Divider />
            {/* below the budget selection end  */}
            <Box sx={{ my: 2, width: "90%", mx: "auto" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Budget
              </Typography>
              <Box
                sx={{
                  fontSize: { xs: "10px" },
                  maxHeight: "300px",
                  overflow: "auto",
                }}
              >
                <Box style={{ fontSize: { xs: "10px" }, width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: "50%", textAlign: "center", m: 2 }}>
                      <input
                        placeholder="Min"
                        value={minPrice || ""}
                        style={{
                          width: "100px",
                          padding: "10px",
                          borderRadius: 6,
                          backgroundColor: "#f1f1ff",
                          border: "none",
                        }}
                        onClick={() => {
                          setminBudget(0);
                        }}
                        onChange={(e) => handleMinPriceChange(e.target.value)}
                      />
                    </Box>
                    -
                    <Box sx={{ width: "50%", textAlign: "center", m: 2 }}>
                      <input
                        placeholder="Max"
                        value={maxPrice || ""}
                        style={{
                          width: "100px",
                          padding: "10px",
                          borderRadius: 6,
                          backgroundColor: "#f1f1ff",
                          border: "none",
                        }}
                        onClick={() => {
                          setminBudget(1);
                        }}
                        onChange={(e) => handleMaxPriceChange(e.target.value)}
                      />
                    </Box>
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
                        return parseFloat(item.value) > parseFloat(minPrice);
                      } else if (maxPrice && minBudget === 0) {
                        return parseFloat(item.value) < parseFloat(maxPrice);
                      } else {
                        return item.value;
                      }
                    })
                    ?.map((item, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          fontSize: "15px",
                          justifyContent:
                            minBudget === 1 ? "flex-end" : "flex-start",
                        }}
                        onClick={() => {
                          if (minBudget === 1) {
                            setMaxPrice(item.value);
                          } else {
                            setMinPrice(item.value);
                          }
                          if (minPrice) {
                            setBudgetAnchor(null);
                            handleChangePropertyFetching();
                          }
                        }}
                      >
                        ₹ {item.label}
                      </ListItem>
                    ))}
                </List>
              </Box>
            </Box>
            {/* above the budget selection end  */}
            <Divider />
            {/* below the size selection end  */}
            <Box sx={{ my: 2, width: "90%", mx: "auto" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Size
              </Typography>
              <Box
                sx={{
                  fontSize: { xs: "10px" },
                  maxHeight: "300px",
                  overflow: "auto",
                }}
              >
                <Box style={{ fontSize: { xs: "10px" }, width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: "50%", textAlign: "center", m: 2 }}>
                      <input
                        placeholder="Min"
                        value={minSize || ""}
                        style={{
                          width: "100px",
                          padding: "10px",
                          borderRadius: 6,
                          backgroundColor: "#f1f1ff",
                          border: "none",
                        }}
                        onClick={() => {
                          setminPropertySize(0);
                        }}
                        onChange={(e) => handleMinSizeChange(e.target.value)}
                      />
                    </Box>
                    -
                    <Box sx={{ width: "50%", textAlign: "center", m: 2 }}>
                      <input
                        placeholder="Max"
                        value={maxSize || ""}
                        style={{
                          width: "100px",
                          padding: "10px",
                          borderRadius: 6,
                          backgroundColor: "#f1f1ff",
                          border: "none",
                        }}
                        onClick={() => {
                          setminPropertySize(1);
                        }}
                        onChange={(e) => handleMaxSizeChange(e.target.value)}
                      />
                    </Box>
                  </Box>
                </Box>
                <List
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                >
                  {sizesList
                    .filter((item, index) => {
                      if (minSize && minPropertySize === 1) {
                        return parseFloat(item.value) > parseFloat(minSize);
                      } else if (maxSize && minPropertySize === 0) {
                        return parseFloat(item.value) < parseFloat(maxSize);
                      } else {
                        return item.value;
                      }
                    })
                    ?.map((item, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          fontSize: { xs: "15px", md: "15px" },
                          justifyContent:
                            minPropertySize === 1 ? "flex-end" : "flex-start",
                        }}
                        onClick={() => {
                          if (minPropertySize === 1) {
                            setMaxSize(item.value);
                          } else {
                            setMinSize(item.value);
                          }
                          if (minSize) {
                            setSizeAnchor(null);
                            handleChangePropertyFetching();
                          }
                        }}
                      >
                        ₹ {item.label}
                      </ListItem>
                    ))}
                </List>
              </Box>
            </Box>
            {/* above the size selection end  */}
            {/* below the facing selection end  */}
            <Box sx={{ my: 2, width: "90%", mx: "auto" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Facing
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  mt: 1,
                }}
              >
                {facingList?.map((item, index) => (
                  <label
                    key={index}
                    htmlFor={`facing-${index}`}
                    style={{
                      justifyContent: "center",
                      padding: "7px 10px",
                      backgroundColor: facing.includes(item)
                        ? "rgba(255, 0, 0, 0.3)"
                        : "transparent",
                      cursor: "pointer",
                      textAlign: "center",
                      borderRadius: "25px",
                      border: facing.includes(item)
                        ? "2px solid red"
                        : "2px solid gray",
                      fontSize: "14px",
                    }}
                    aria-checked={facing.includes(item)}
                    aria-label={`Facing ${item}`}
                  >
                    <input
                      id={`facing-${index}`}
                      type="checkbox"
                      name="facing"
                      value={item || ""}
                      checked={facing.includes(item)}
                      onChange={(event) => handleFacingChange(event)}
                      style={{
                        display: "none",
                      }}
                    />
                    {item}
                  </label>
                ))}
              </Box>
            </Box>
            {/* above the facing selection end  */}
            {/* below the amenities selection end  */}
            <Box sx={{ my: 2, width: "90%", mx: "auto" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Amenities
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  mt: 1,
                }}
              >
                {amenityList?.map((item, index) => (
                  <label
                    key={index}
                    htmlFor={`amenities-${index}`}
                    style={{
                      justifyContent: "center",
                      padding: "7px 10px",
                      backgroundColor: amenities.includes(item)
                        ? "rgba(255, 0, 0, 0.3)"
                        : "transparent",
                      cursor: "pointer",
                      textAlign: "center",
                      borderRadius: "25px",
                      border: amenities.includes(item)
                        ? "2px solid red"
                        : "2px solid gray",
                      fontSize: "14px",
                    }}
                    aria-checked={amenities.includes(item)}
                    aria-label={`Facing ${item}`}
                  >
                    <input
                      id={`amenities-${index}`}
                      type="checkbox"
                      name="amenities"
                      value={item || ""}
                      checked={amenities.includes(item)}
                      onChange={(event) => handleAmenitiesChange(event)}
                      style={{
                        display: "none",
                      }}
                    />
                    {item}
                  </label>
                ))}
              </Box>
            </Box>
            {/* above the amenities selection end  */}
            {/* below the Furnishing type selection end  */}
            <Box sx={{ my: 2, width: "90%", mx: "auto" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Furnishing Type
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  mt: 1,
                }}
              >
                {furnish?.map((item, index) => (
                  <label
                    htmlFor={`furnishing-status-${index}`}
                    style={{
                      justifyContent: "center",
                      padding: "7px 10px",
                      backgroundColor:
                        furnishedType === item
                          ? "rgba(255, 0, 0, 0.3)"
                          : "transparent",
                      cursor: "pointer",
                      textAlign: "center",
                      borderRadius: "25px",
                      border:
                        furnishedType === item
                          ? "2px solid red"
                          : "2px solid gray",
                      fontSize: "14px",
                    }}
                  >
                    <input
                      id={`furnishing-status-${index}`}
                      type="radio"
                      name="furnishing-status"
                      value={item}
                      checked={furnishedType === item}
                      onChange={(e) => handleFurnishingStatusChange(e)}
                      style={{
                        display: "none",
                      }}
                    />
                    {item}
                  </label>
                ))}
              </Box>
            </Box>
            {/* above the Furnishing type selection end  */}
            {/* below the posession status selection end  */}
            {cookies[config.preferencesCookie]?.listingType === "Buy" && (
              <Box sx={{ my: 2, width: "90%", mx: "auto" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Possession Status
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    mt: 1,
                  }}
                >
                  {positionstatus?.map((item, index) => (
                    <label
                      htmlFor={`possession-status-${index}`}
                      style={{
                        justifyContent: "center",
                        padding: "7px 10px",
                        backgroundColor:
                          possessionStatus === item
                            ? "rgba(255, 0, 0, 0.3)"
                            : "transparent",
                        cursor: "pointer",
                        textAlign: "center",
                        borderRadius: "25px",
                        border:
                          possessionStatus === item
                            ? "2px solid red"
                            : "2px solid gray",
                        fontSize: "14px",
                      }}
                    >
                      <input
                        id={`possession-status-${index}`}
                        type="radio"
                        name="possession-status"
                        value={item}
                        checked={possessionStatus === item}
                        onChange={(event) => handlePossessionStatus(event)}
                        style={{
                          display: "none",
                        }}
                      />
                      {item}
                    </label>
                  ))}
                </Box>
              </Box>
            )}
            {/* above the posession status selection end  */}
          </Box>
          <Box
            sx={{
              position: "fixed",
              bottom: "0px",
              right: "0px",
              width: "100%",
            }}
          >
            <Button
              fullWidth
              sx={{ backgroundColor: "red", color: "white" }}
              variant="contained"
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterSection;
