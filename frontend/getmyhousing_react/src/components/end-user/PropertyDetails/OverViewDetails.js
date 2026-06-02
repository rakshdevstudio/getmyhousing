import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../generic/Header";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import { ChevronUp, ChevronDown } from "lucide-react"
import Footer from "../../generic/Footer";
import { apiList, invokeApi } from "../../../apis/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Loader from "../../Loader";
import FurnishingStatus from "./components/FurnishingStatus";
import {
  PriceFormatter,
  StyledBreadcrumb,
  formatSegment,
} from "../../../common/common";
import OverViewDetailsLeadForm from "./components/OverViewDetailsLeadForm";
import defaultImage from "./components/img1.png";
import PropertyDetails from "./components/PropertyDetails";
import PricingDetails from "./components/PricingDetails";
import DefineProperty from "./components/DefineProperty";
import AreaDetails from "./components/AreaDetails";
import AdditionalDetails from "./components/AdditionalDetails";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ImageViewer from "react-simple-image-viewer";
import Helmet from "../../functional-component/Helmet";
import "./../../../styles/OverViewDetails.css";
import RelatedPropertiesSection from "./components/RelatedPropertiesSection";
import PropertyImages from "./components/PropertyImages";
import PropertyFeatures from "./components/PropertyFeatures";
import LocationDetails from "./components/LocationDetails";
import LeadForm from "./LeadForm";
import { SectionWrapper } from "./components/SectionWrapper";

const OverViewDetails = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [showOtherUnits, setShowOtherUnits] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [propertyData, setpropertyData] = useState([]);
  const [relatedProperties, setRelatedProperties] = useState(null);
  const [leadModal, setLeadModal] = useState(false);
  const [value, setValue] = useState("overview");
  const [userDetailsModal, setUserDetailModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = propertyData.propertyGalleryImages?.map(
    (item) => item.imagePath
  );

  const handeChangeModal = () => {
    setLeadModal(true);
  };

  function handleNavigateProperty(property) {
    navigate(`/property/${formatSegment(property.listingType)}/${formatSegment(property.propertyName)}/${formatSegment(property.buildingType + "-" + property.propertyType + "-in-" + property.locality + "-" + property.city)}/${property.propertyId}`)
  }

  let allFurnishingStatusNull = false;

  if (!fetching) {
    const excludedKeys = new Set([
      "id", "updatedBy", "updatedDate", "createdBy", "createdDate", "status",
      "limit", "offset", "officeSpaceType", "managedType", "seatType",
      "workStationType", "sofaType"
    ]);

    allFurnishingStatusNull = Object.entries(propertyData?.furnishingStatus || {})
      .filter(([key]) => !excludedKeys.has(key))
      .every(([_, value]) => value === "No" || value === null);
  }

  // Define specific properties to check for each object
  const pricingDetailsProps = [
    "rent", "maintananceCost", "securityDeposit", "depositAmount", "bookingAmount",
    "lockInPeriod", "rentIncrement"
  ];

  const areaDetailsProps = [
    "builtupPlotArea", "carpetArea", "superBuiltupArea", "areaUnit", "privatePoolAvailability",
    "privateGardenAvailability", "noOfBedrooms", "noOfBathrooms", "noOfBalconies", "additionalRooms",
    "floorNo", "towerBlockNo", "flatNo", "propertyLevel", "cornerFlat", "terraceArea", "totalFloors",
    "openSides", "facing", "occupancyType", "privateWashroom", "publicWashroom", "gardenArea",
    "pantry", "buildingStatus", "spaceType", "breadthFeet", "lengthFeet", "noOfFloorsAllowed",
    "compoundWallMade", "salableArea", "plotArea", "additionalRoomsList"
  ];

  const propertyDetailsProps = [
    "availableFor", "positionStatus", "availableFrom", "ageOfProperty", "ownershipType",
    "aboutPropertySuitableFor", "locationHub", "entranceWidth", "heightSealing", "locatedNear",
    "govtApproved", "tenantPreLeasedUnit"
  ];

  const definePropertyProps = [
    "defineLocation", "explainingPrice", "explainingProperty", "defineSizeAndStructure"
  ];

  const additionalDetailsProps = [
    "currentlyLeasedOut", "modifyInterior", "brandNewInterior", "interestedInCoWorking",
    "buildingGrade", "cafeteria", "taxGovtCharges", "electricityCharges", "powerInKv",
    "liftAvailable", "flooringType", "flooringLiving", "flooringKitchen", "flooringBedroom",
    "flooringMasterBedroom", "flooringBalcony", "flooringOther", "parking2Wheeler",
    "parking4Wheeler", "powerBackup", "waterSource", "overLookingView", "frontRoadWidth",
    "serviceLiftAvailability", "flooringBathroom"
  ];

  const tenantDetailsProps = [
    "tenantType", "religiousType", "workPreference", "petsAllowed",
    "foodPreference", "bachelorsAllowed", "sprinstersAllowed"
  ];

  // Function to check if any specified property has a valid value
  const hasValidValue = (obj, props) => props.some(prop => obj?.[prop]);

  // Assign boolean values
  const pricingdetailsRenderTab = hasValidValue(propertyData?.pricingDetails, pricingDetailsProps);
  const areaDetailsRenderTab = hasValidValue(propertyData?.propertyAreaDetails, areaDetailsProps);
  const propertydetailsRenderTab = hasValidValue(propertyData?.propertyStatus, propertyDetailsProps);
  const definePropertyRenderTab = hasValidValue(propertyData?.defineProperty, definePropertyProps);
  const additionalDetailsRenderTab = hasValidValue(propertyData?.additionalDetails, additionalDetailsProps);
  const tenantdetailsRenderTab = hasValidValue(propertyData?.tenantStatus, tenantDetailsProps);


  const featuredImagePath = propertyData.propertyGalleryImages?.find(
    (item) => item.imageType === "featured"
  )?.imagePath;

  // Function to handle image load error
  const handleImageError = (event) => {
    event.target.src = defaultImage; // Set to default image path
  };

  const paperRefs = {
    overview: useRef(null),
    amenities: useRef(null),
    furnishing: useRef(null),
    location: useRef(null),
    gallery: useRef(null),
    propertydetails: useRef(null),
    pricingdetails: useRef(null),
    defineproperty: useRef(null),
    areadetails: useRef(null),
    tenantdetails: useRef(null),
    additionaldetails: useRef(null),
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Scroll to the corresponding Paper component
    if (paperRefs[newValue].current) {
      paperRefs[newValue].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (!propertyId) {
      navigate(
        "/property/" +
        (cookies[config.preferencesCookie]?.listingType?.toLowerCase() ||
          null)
      );
    } else {
      setFetching(true)
    }
  }, [cookies, propertyId]);

  function leadProvided(propertyId) {
    // Retrieve the current array from localStorage
    let existingLeads = localStorage.getItem(config.leadProvided);

    // Parse the retrieved value to get the array, if it exists, otherwise initialize an empty array
    existingLeads = existingLeads ? JSON.parse(existingLeads) : [];

    // Add the new element to the array
    existingLeads.push(propertyId);

    // Save the updated array back to localStorage
    localStorage.setItem(config.leadProvided, JSON.stringify(existingLeads));
  }

  useEffect(() => {
    const getPropertyDetailsById = async () => {
      let params = { id: propertyId };
      const response = await invokeApi(
        config.apiDomains + apiList.getPropertyDetailsById,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setpropertyData(response.data.Properties);
          setRelatedProperties(response.data.relatedProperties);
          setFetching(false);
        } else {
          alert("Error Occurred while fetching property overview data!");
        }
      } else {
        alert("Error Occurred while fetching property overview data!");
      }
    };
    if (fetching) {
      getPropertyDetailsById();
    }
  }, [cookies, fetching]);

  const showGalleryTab = propertyData?.propertyGalleryImages?.some(
    (item) => item.imageType === "gallery"
  ) || propertyData.youtubeLink;

  const userWhatsappNumber = propertyData.userWhatsappNumber || config.mobileNumber1;

  const checkLeadProvided = localStorage
    .getItem(config.leadProvided)
    ?.includes(propertyData.id);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      <Helmet
        title={"Get My Housing - " + propertyData?.title}
        description="Explore detailed information about this property, including price, location, amenities, and more. Find your dream home with Get My Housing."
        keywords="real estate, about us, Get My Housing, property solutions, home buying, home selling"
        canonicalUrl={window.location.href}
        ogTitle={"Get My Housing - " + propertyData?.title}
        ogDescription="Explore detailed information about this property, including price, location, amenities, and more. Find your dream home with Get My Housing."
        twitterTitle={"Get My Housing - " + propertyData?.title}
        twitterDescription="Explore detailed information about this property, including price, location, amenities, and more. Find your dream home with Get My Housing."
        ogImage={featuredImagePath || defaultImage}
      />
      <Header />
      <main style={{ backgroundColor: '#fbcece1d' }}>
        {fetching ? (
          <Box sx={{ height: "100svh", display: "flex", alignItems: "center", background: 'white' }}>
            <Loader />
          </Box>
        ) : (
          <>
            {/* breadcrumbs */}
            <Box
              role="presentation"
              sx={{
                px: 2,
                width: "100%",
                overflow: "hidden",
                py: 2,
                backgroundColor: "white"
              }}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                  component="a"
                  href="/"
                  label="Home"
                  icon={<HomeIcon fontSize="small" />}
                />
                <StyledBreadcrumb
                  component="a"
                  href={`/property/${cookies[
                    config.preferencesCookie
                  ]?.listingType?.toLowerCase() || null
                    }`}
                  label="Property List"
                />
                <StyledBreadcrumb label={propertyData?.title} />
              </Breadcrumbs>
            </Box>

            <Box
              sx={{
                position: "relative",
                padding: "10px",
                background: "white",
              }}
            >
              <Grid container sx={{ zIndex: "30", gap: "30px" }}>
                {/* below the grid have the property image  */}
                <Grid
                  item
                  md={5}
                  xs={12}
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                  }}
                >
                  <PropertyImages images={propertyData.propertyGalleryImages} className="animate-fade-in" />

                </Grid>
                {/* below the grid have basic and import details of the proeprty  */}
                <Grid item md={6} xs={12} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>

                  <Typography
                    sx={{
                      fontSize: { md: "20px", xs: "17px" },
                      lineHeight: "30px",
                      fontWeight: 700,
                    }}
                  >
                    {propertyData?.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { md: "16px", xs: "13px" },
                      color: "#95a5a6",
                    }}
                  >
                    {propertyData?.propertyName}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { md: "28px", xs: "22px" },
                      my: "10px",
                      fontWeight: "600",
                      color: "red",
                    }}
                  >
                    {PriceFormatter(propertyData.pricingDetails?.rent)}
                  </Typography>
                  {/* below the grid container contain the list of two column highlight points  */}
                  <PropertyFeatures propertyData={propertyData} />
                  {propertyData.includedGroupProperty && propertyData.includedGroupProperty.length > 0 && (
                    <div className="property-card-other-unit">
                      <button
                        onClick={() => setShowOtherUnits(!showOtherUnits)}
                        className="property-card-other-unit-accordation"
                      >
                        Same Property (Other Options)
                        {showOtherUnits ? (
                          <ChevronUp className="property-card-up-arrow" />
                        ) : (
                          <ChevronDown className="property-card-down-arrow" />
                        )}
                      </button>

                      {showOtherUnits && (
                        <div className="other-unit-container">
                          {propertyData.includedGroupProperty.map((unit, index) => (
                            <div
                              onClick={() => handleNavigateProperty(unit)}
                              key={index}
                              className="item"
                              style={{ cursor: "pointer" }}
                            >
                              <div>
                                <p className="unit-no-of-bhk">{unit.numOfBedrooms && (unit.numOfBedrooms === "Studio" || unit.numOfBedrooms === "1 RK"
                                  ? unit.numOfBedrooms
                                  : `${unit.numOfBedrooms} BHK`)}
                                </p>
                                <p className="unit-area">{unit?.builtupPlotArea ||
                                  unit.carpetArea ||
                                  unit.salebleArea ||
                                  unit.superBuiltupArea ||
                                  unit.plotArea}{" "}
                                  {unit.areaUnit} {unit.floor && `• ${unit.floor}`}</p>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <p style={{ fontWeight: "500", color: "#DC2626" }}>
                                  ₹{unit.rent?.toLocaleString('en-IN')}
                                </p>
                                <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                                  5+ amenities
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {propertyData.approvalStatus === "Completed" && (
                    <div className="watermar-detail-page">Not Available</div>
                  )}
                  {/* below the grid container contain the buttons like whatsapp and contact us  */}
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<WhatsAppIcon />}
                        sx={{
                          backgroundColor: "#25d366",
                          border: "1px solid #25d366",
                          color: "#fff",
                          borderRadius: "35px",
                          padding: "10px", // Adjust padding for better visualization
                          transition: "transform 0.3s", // Add transition for smooth effect
                          "&:hover": {
                            border: "1px solid #25d366",
                            backgroundColor: "#25d366",
                            transform: "scale(1.05)", // Zoom in on hover
                          },
                        }}
                        onClick={() =>
                          window.open(
                            `https://api.whatsapp.com/send?phone=91${userWhatsappNumber}&text=${window.location.origin +
                            "/property/" +
                            formatSegment(propertyData.listingType) +
                            "/" +
                            formatSegment(propertyData.propertyName) +
                            "/" +
                            formatSegment(
                              propertyData.buildingType +
                              "-" +
                              propertyData.propertyType +
                              "-in-" +
                              propertyData.locality +
                              "-" +
                              propertyData.city
                            ) +
                            "/" +
                            propertyData.id
                            }%0AHi! I'm intrested in ${propertyData.propertyName
                            }.Can i have some more info please.`,
                            "_blank"
                          )
                        }
                      >
                        Whatsapp
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<CallIcon />}
                        sx={{
                          backgroundColor: "white",
                          border: "1px solid red",
                          color: "red",
                          borderRadius: "35px",
                          padding: "10px",
                          transition: "background-color 0.3s, transform 0.3s", // Added transition
                          "&:hover": {
                            backgroundColor: "red",
                            color: "#fff",
                            transform: "scale(1.05)", // Zoom effect
                          },
                        }}
                        onClick={() => {
                          if (checkLeadProvided) {
                            setUserDetailModal(true);
                          } else {
                            handeChangeModal();
                          }
                        }}
                      >
                        Contact Us
                      </Button>
                    </Grid>
                    {propertyData.propertyBrochure && (
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <button
                          className="button"
                          onClick={() =>
                            window.open(propertyData.propertyBrochure, "_blank")
                          }
                        >
                          <svg
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            height="40"
                            width="40"
                            className="button__icon"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="none"
                              d="M0 0h24v24H0z"
                              stroke="none"
                            ></path>
                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                            <path d="M7 11l5 5l5 -5"></path>
                            <path d="M12 4l0 12"></path>
                          </svg>
                          <span className="button__text">Download</span>
                        </button>
                        {/* <Link
                        to={propertyData.propertyBrochure}
                        target="_blank"
                        style={{
                          textDecoration: "none",
                          color: "white",
                          backgroundColor: "#000",
                          padding: "10px 25px",
                          borderRadius: "25px",
                        }}
                      >
                        View Brochure
                      </Link> */}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            {/* below the body of overview  */}
            <Box
              sx={{
                position: "sticky",
                top: { md: "103px", xs: "74px" },
                zIndex: 7,
                bgcolor: "background.paper",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                maxWidth: "100%",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile={false}
                aria-label="scrollable force tabs example"
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab value="overview" label="Overview" />

                {propertyData.amenitiesList?.length && <Tab value="amenities" label="Amenities" />}

                {allFurnishingStatusNull && <Tab value="furnishing" label="Furnishing Details" />}

                <Tab value="location" label="Location" />

                {showGalleryTab && <Tab value="gallery" label="Gallery" />}

                {propertydetailsRenderTab && (
                  <Tab value="propertydetails" label="Property Details" />
                )}

                {pricingdetailsRenderTab && (
                  <Tab value="pricingdetails" label="Pricing Details" />
                )}

                {definePropertyRenderTab && (
                  <Tab value="defineproperty" label="Define Property" />
                )}

                {areaDetailsRenderTab && (
                  <Tab value="areadetails" label="Area Details" />
                )}

                {tenantdetailsRenderTab && (
                  <Tab value="tenantdetails" label="Tenant Details" />
                )}

                {additionalDetailsRenderTab && (
                  <Tab value="additionaldetails" label="Additional Details" />
                )}
              </Tabs>
            </Box>

            <Grid container spacing={2}>
              <Grid item md={8} xs={12} sx={{ mt: { md: "15px", xs: "0px" } }}>
                {propertyData.defineProperty?.description !== "" && (
                  <SectionWrapper title="Description" refProp={paperRefs.overview} id="overview">
                    <Box
                      sx={{ pt: 1 }}
                      dangerouslySetInnerHTML={{
                        __html: propertyData.defineProperty?.description,
                      }}
                    />
                  </SectionWrapper>
                )}
                {allFurnishingStatusNull && (
                  <SectionWrapper title="Furnishing Details" refProp={paperRefs.furnishing} id="furnishing">
                    <FurnishingStatus propertyData={propertyData} />
                  </SectionWrapper>
                )}
                {propertydetailsRenderTab && (
                  <SectionWrapper title="Property Details" refProp={paperRefs.propertydetails} id="propertydetails">
                    <PropertyDetails propertyData={propertyData} />
                  </SectionWrapper>
                )}

                {propertyData.amenitiesList?.length >= 1 && (
                  <SectionWrapper title="Amenities" refProp={paperRefs.amenities} id="amenities">
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" },
                        gap: 2, // shorthand for row and column gap
                        pt: 2,
                      }}
                    >
                      {propertyData?.amenitiesList?.map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                            textAlign: "center",
                            p: 1,
                            borderRadius: "10px",
                          }}
                        >
                          {item.amenities}
                        </Box>
                      ))}
                    </Box>
                  </SectionWrapper>
                )}
                <SectionWrapper title="Location And LandMarks" refProp={paperRefs.location} id="location">
                  <LocationDetails propertyData={propertyData} />
                </SectionWrapper>
                {definePropertyRenderTab && (
                  <SectionWrapper title="Define Property" refProp={paperRefs.defineproperty} id="defineproperty">
                    <DefineProperty propertyData={propertyData} />
                  </SectionWrapper>
                )}
                {areaDetailsRenderTab && (
                  <SectionWrapper title="Area Details" refProp={paperRefs.areadetails} id="areadetails">
                    <AreaDetails propertyData={propertyData} />
                  </SectionWrapper>
                )}

                {tenantdetailsRenderTab && (
                  <SectionWrapper title="Tenant Details" refProp={paperRefs.tenantdetails} id="tenantdetails">
                    <AreaDetails propertyData={propertyData} />
                  </SectionWrapper>
                )}

                {additionalDetailsRenderTab && (
                  <SectionWrapper title="Additional Details" refProp={paperRefs.additionaldetails} id="additionaldetails">
                    <AdditionalDetails propertyData={propertyData} />
                  </SectionWrapper>
                )}

                {pricingdetailsRenderTab && (
                  <SectionWrapper title="Pricing Details" refProp={paperRefs.pricingdetails} id="pricingdetails">
                    <PricingDetails propertyData={propertyData} />
                  </SectionWrapper>
                )}
                {showGalleryTab && (
                  <SectionWrapper title="Gallery" refProp={paperRefs.gallery} id="gallery">
                    {propertyData.propertyGalleryImages.length > 0 && (
                      <ImageList
                        sx={{ width: "100%", height: "100%", pt: 1 }}
                        cols={3}
                        rowHeight={164}
                      >
                        {propertyData.propertyGalleryImages?.map(
                          (item, index) => (
                            <ImageListItem
                              key={index}
                              onClick={() => openImageViewer(index)}
                            >
                              <img
                                // srcSet={`${item.imagePath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.imagePath}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.imageType}
                                loading="lazy"
                              />
                            </ImageListItem>
                          )
                        )}
                      </ImageList>
                    )}
                    {propertyData.youtubeLink && (
                      <div style={{ maxWidth: "800px", margin: "20px 0" }}>
                        <iframe
                          width="100%"
                          height="400"
                          src={propertyData.youtubeLink}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </SectionWrapper>
                )}
              </Grid>
              {/* below the grid have the lead form  */}
              <Grid
                item
                md={4}
                sx={{
                  position: "sticky",
                  top: 130,
                  zIndex: 1,
                  height: "70vh",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <OverViewDetailsLeadForm
                  propertyData={propertyData}
                  postDetails={true}
                  leadProvided={leadProvided}
                />
              </Grid>
            </Grid>
          </>
        )}
        {relatedProperties && (
          <RelatedPropertiesSection relatedProperties={relatedProperties} />
        )}
      </main >
      <Footer />
      {/* modal start */}
      <LeadForm
        isOpen={leadModal}
        onClose={() => setLeadModal(false)}
        leadSource={propertyData.propertyType}
        propertyId={propertyId}
        productUrl={window.location.href}
        leadProvided={leadProvided}
      />
      {/* modal end */}
      <Dialog
        open={userDetailsModal}
        onClose={() => setUserDetailModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          User Details
          <IconButton
            style={{ marginLeft: "250px" }}
            edge="end"
            color="inherit"
            onClick={() => setUserDetailModal(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* <Box sx={{ width: { md: "30%", xs: "80%" } }}> */}
          Name: {propertyData?.username}
          <br />
          Role: {propertyData?.userRole}
          <br />
          whatsappNumber:{" "}
          {checkLeadProvided
            ? propertyData?.userWhatsappNumber
            : propertyData?.maskedUserWhatsappNumber}
          {/* </Box> */}
        </DialogContent>
      </Dialog>

      {
        isViewerOpen && (
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            onClose={closeImageViewer}
            disableScroll={false}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
              zIndex: 9999,
            }}
            closeOnClickOutside={true}
          />
        )
      }
    </>
  );
};

export default OverViewDetails;
