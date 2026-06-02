import React, { useState, useEffect, memo } from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../../apis/apiServices";
import { config } from "../../../../config/config";
import Header from "../../../generic/Header";
import RefreshIcon from "@mui/icons-material/Refresh";
import Footer from "../../../generic/Footer";
import { LoadingButton } from "@mui/lab";
import Loader from "../../../Loader";
import {
  propertyTypesDetails,
} from "../../../../common/common";
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import OverViewDetailsLeadForm from "../../../end-user/PropertyDetails/components/OverViewDetailsLeadForm";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  styled as breadStyle,
  emphasize,
} from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import FilterSection from "./FilterSection";
import PropertyCard from "./PropertyCard";
import Helmet from "../../../functional-component/Helmet";
import LeadForm from "../../../end-user/PropertyDetails/LeadForm";

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

const PropertyList = memo(() => {
  const [cookies, setCookies] = useCookies();
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [leadModal, setLeadModal] = useState(false);
  const [leadSource, setLeadSource] = useState("");
  const { listingType } = useParams();
  console.log(listingType)
  const [fetching, setFetching] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [propertiesList, setPropertiesList] = useState([]);

  //Property Listings
  useEffect(() => {
    const allProperties = async () => {
      let params = {
        listingType:
          cookies[config.preferencesCookie]?.listingType === "Buy"
            ? "Sale"
            : cookies[config.preferencesCookie]?.listingType,
        buildingType: cookies[config.preferencesCookie]?.buildingType || null,
        propertyType: cookies[config.preferencesCookie]?.propertyType || null,
        minRent: cookies[config.preferencesCookie]?.minPrice || null,
        maxRent: cookies[config.preferencesCookie]?.maxPrice || null,
        minSuperBuiltupArea: cookies[config.preferencesCookie]?.minSize || null,
        maxSuperBuiltupArea: cookies[config.preferencesCookie]?.maxSize || null,
        positionStatus:
          cookies[config.preferencesCookie]?.possessionStatus || null,
        searchText: null,
        city: cookies[config.preferencesCookie]?.city || "Bangalore",
        bhk: cookies[config.preferencesCookie]?.bhk || [],
        postedOn: cookies[config.preferencesCookie]?.postedOn || null,
        furnishingType: cookies[config.preferencesCookie]?.furnishType || null,
        facing: cookies[config.preferencesCookie]?.facing || [],
        // amenity: cookies[config.preferencesCookie]?.amenity || null,
        amenities: cookies[config.preferencesCookie]?.amenities || [],
      };
      const response = await invokeApi(
        config.apiDomains + apiList.propertyByFilter,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setPropertiesList(response.data.properties);
          setIsLoading(false);
        } else {
          toast.error(
            "An error occurred while fetching data Please Try Again!",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            }
          );
        }
      } else {
        toast.error("An error occurred while fetching data Please Try Again!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    };
    if (fetching) {
      allProperties();
      setFetching(false);
    }
  }, [fetching]);

  const handleChangePropertyFetching = () => {
    setFetching((prev) => !prev);
  };

  function handleClearAllFilter() {
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
        postedOn: null,
        amenities: [],
        furnishType: null,
        city: "Bangalore",
        facing: [],
        bhk: [],
        searchText: null,
        possessionStatus: null,
      }),
      { path: "/", maxAge: 3000000, sameSite: "strict" }
    );
  }

  const handleChangeFilter = () => {
    setOpenFilterDrawer((open) => !open);
  };

  useEffect(() => {
    // Create updated cookie value
    const updatedCookieValue = JSON.stringify({
      ...cookies[config.preferencesCookie],
      listingType:
        listingType === "rent" ? "Rent" : listingType === "buy" ? "Buy" : null,
    });

    setCookies(config.preferencesCookie, updatedCookieValue, {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
    setFetching(true);
  }, [listingType]);

  return (
    <>
      <Helmet
        title={`Get My Housing - Properties for ${listingType}`}
        description="Find the best properties for rent or sale with Get My Housing. Explore listings with detailed information on pricing, location, and amenities."
        keywords="real estate, property listings, buy property, rent property, Get My Housing, home search"
        canonicalUrl={window.location.href}
        ogTitle={`Get My Housing - Properties for ${listingType}`}
        ogDescription="Find the best properties for rent or sale with Get My Housing. Explore listings with detailed information on pricing, location, and amenities."
        twitterTitle={`Get My Housing - Properties for ${listingType}`}
        twitterDescription="Find the best properties for rent or sale with Get My Housing. Explore listings with detailed information on pricing, location, and amenities."
      />
      <Header />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100svh",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <FilterSection
            handleChangePropertyFetching={handleChangePropertyFetching}
            handleClearAllFilter={handleClearAllFilter}
            openFilterDrawer={openFilterDrawer}
            handleChangeFilter={handleChangeFilter}
          />
          {/* breadcrumbs */}
          <Grid sx={{ p: 2, mb: 2 }}>
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                  component="a"
                  href="/"
                  label="Home"
                  icon={<HomeIcon fontSize="small" />}
                />
                {/* <StyledBreadcrumb component="a" href="#" label="Catalog" /> */}
                <StyledBreadcrumb label="Property-List" />
              </Breadcrumbs>
            </div>
          </Grid>

          {/* filter section end  */}
          <Container>
            <Grid container spacing={2}>
              {propertiesList?.length <= 0 ? (
                <Grid
                  item
                  xs={12}
                  sx={{
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="/media/svg/result-not-found.svg"
                    alt="result not found"
                    height="80px"
                    style={{ color: "#b2bec3" }}
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "900",
                      color: "#b2bec3",
                      fontSize: { xs: "1.5rem", md: "3rem" },
                    }}
                  >
                    No Property Available
                  </Typography>

                  <Grid xs={12} item sx={{ textAlign: "center", mt: 3 }}>
                    <LoadingButton
                      size="medium"
                      variant="contained"
                      onClick={() => {
                        handleClearAllFilter();
                        setFetching(true);
                      }}
                    >
                      <RefreshIcon
                        sx={{ color: "#ffffff", mr: 0.5, fontSize: "17px" }}
                      />
                      <span>Set Default</span>
                    </LoadingButton>
                  </Grid>
                </Grid>
              ) : (
                <>
                  <Grid item md={8} xs={12}>
                    {propertiesList?.map((listings, index) => (
                      <PropertyCard listings={listings}
                        setPropertyId={setPropertyId}
                        setLeadModal={setLeadModal}
                        setLeadSource={setLeadSource} />
                    ))}
                  </Grid>
                  <Grid item md={4}>
                    <Box sx={{ position: "sticky", top: "170px" }}>
                      <OverViewDetailsLeadForm postDetails={false} />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Container>
        </>
      )}

      <Footer handleChangeFilter={handleChangeFilter} />
      <LeadForm
        isOpen={leadModal}
        onClose={() => setLeadModal(false)}
        leadSource={leadSource}
        propertyId={propertyId}
      />
    </>
  );
});

export default PropertyList;
