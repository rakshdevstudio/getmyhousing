import {
  Box,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import { MenuServices, indiaTopCities } from "../../common/common";
import { useDebounce } from "../custom-hook/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/NavBar.css"

const NavBar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const [searchCity, setSearchCity] = useState("");

  const debounceSearch = useDebounce(searchCity, 500);
  const [filteredCitiesList, setFilteredCitiesList] = useState([]);

  // Cities Data
  const { citiesData, citiesError, isCitiesFetching } = useSelector(
    (state) => state.cities
  );

  const handleSearchCityChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchCity(value);
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

  function handleBuyNavigate() {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      listingType: "Buy",
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
  }

  function handleRentNavigate() {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      listingType: "Rent",
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
  }

  useEffect(() => {
    if (debounceSearch) {
      const filtered = citiesData?.cities.filter((city) =>
        city.toLowerCase().includes(searchCity)
      );
      setFilteredCitiesList(filtered);
    }
  }, [debounceSearch]);

  useEffect(() => {
    if (citiesError) {
      alert(
        "Something went wrong while fetching Cities details. Please try again later!"
      );
    }
  }, [citiesError]);

  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#" className="nav-link">
              City
            </a>
            <ul className="submenu">
              <li style={{ marginTop: "10px" }}>
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
              </li>
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
                          navigate("/");
                        }}
                      >
                        <img src={city.svg} height="30px" alt="cities" />
                        <Typography
                          variant="caption"
                          sx={{
                            "&:hover": { color: "blue" },
                            color: "#000",
                          }}
                        >
                          {city.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  {citiesData?.cities.map((item) => (
                    <li
                      key={item}
                      onClick={() => {
                        setCity(item);
                        navigate("/");
                      }}
                      style={{
                        color: "#000",
                        padding: "10px 15px",
                        borderBottom: "1px solid #000",
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </>
              ) : (
                filteredCitiesList.map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setCity(item);
                      navigate("/");
                    }}
                    style={{
                      color: "#000",
                      padding: "10px 15px",
                      borderBottom: "1px solid #000",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </li>
                ))
              )}
            </ul>
          </li>
          <li className="nav-item">
            <Link
              to="/property/buy"
              className="nav-link"
              onClick={handleBuyNavigate}
            >
              Buy
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/property/rent"
              className="nav-link"
              onClick={handleRentNavigate}
            >
              Rent
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Services
            </a>
            <ul className="submenu">
              <li className="submenu-item">
                <div className="submenu-column">
                  <h3>For Buyers</h3>
                  <ul>
                    {MenuServices.forBuyers.map((item, index) => (
                      <li
                        key={index}
                        className="submenu-list-item"
                        onClick={() =>
                          navigate(
                            item.navigate +
                            cookies[
                              config.preferencesCookie
                            ]?.city.toLowerCase()
                          )
                        }
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="submenu-column">
                  <h3>For Tenants</h3>
                  <ul>
                    {MenuServices.forTenants.map((item, index) => (
                      <li
                        key={index}
                        className="submenu-list-item"
                        onClick={() =>
                          navigate(
                            item.navigate +
                            cookies[
                              config.preferencesCookie
                            ]?.city.toLowerCase()
                          )
                        }
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="submenu-column">
                  <h3>For Owners</h3>
                  <ul>
                    {MenuServices.forOwners.map((item, index) => (
                      <li
                        key={index}
                        className="submenu-list-item"
                        onClick={() =>
                          navigate(
                            item.navigate +
                            cookies[
                              config.preferencesCookie
                            ]?.city.toLowerCase()
                          )
                        }
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a href="/about-us" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact-us" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
