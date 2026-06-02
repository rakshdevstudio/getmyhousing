import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import EastIcon from "@mui/icons-material/East";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { apiList, invokeApi } from "../../apis/apiServices";
import { PriceFormatter, formatSegment } from "../../common/common";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import PropertyCard from "./exclusive-property-section/PropertyCard";
import LeadForm from "../end-user/PropertyDetails/LeadForm";
const emptyPropertyImage = "/media/images/gridimgae.jpeg";

const LatestPropertiesSection = () => {
  const [cookies] = useCookies();

  const [leadModal, setLeadModal] = useState(false);
  const [leadSource, setLeadSource] = useState("");
  const [propertyId, setPropertyId] = useState(null);

  const [isPropertiesFetching, setIsPropertiesFetching] = useState(true);
  const [propertiesList, setPropertiesList] = useState([]);
  const canLoopProperties = propertiesList.length > 3;

  const handeChangeModal = () => setLeadModal((prevState) => !prevState)

  function handleEnquiry(propertyId, propertyType) {
    handeChangeModal();
    setPropertyId(propertyId);
    setLeadSource(propertyType);
  }

  useEffect(() => {
    const propertiesList = async () => {
      let params = {};
      const response = await invokeApi(
        config.apiDomains + apiList.AllActiveProperties,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response?.data.responseCode === "200") {
          setPropertiesList(response.data.propertyDtl || []);
        } else {
          setPropertiesList([]);
          console.error(
            "Failed to fetch latest properties:",
            response?.data?.responseMessage
          );
        }
      } else {
        setPropertiesList([]);
        console.error("Failed to fetch latest properties:", response);
      }
    };
    if (isPropertiesFetching && !propertiesList.length > 0) {
      propertiesList();
      setIsPropertiesFetching(false);
    }
  }, [cookies, isPropertiesFetching]);

  return (
    <>
      {/* latest property list start  */}
      <Box component="section" sx={{ py: { md: 10, xs: 5 } }}>
        <Container maxWidth={"lg"}>
          <Box className="primary-heading-container">
            <Typography variant="h2" className="section-primary-heading">
              Latest Properties in {cookies[config.preferencesCookie]?.country}
            </Typography>
          </Box>
          <Swiper
            watchSlidesProgress={true}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={
              canLoopProperties
                ? {
                    delay: 3000,
                    disableOnInteraction: false,
                  }
                : false
            }
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 10 },
              1024: { slidesPerView: 3, spaceBetween: 15 },
            }}
            loop={canLoopProperties}
            className="mySwiper"
          >
            {propertiesList.length > 0
              ? propertiesList.map((property, index) => (
                <SwiperSlide key={index}>
                  <PropertyCard property={property} handleEnquiry={() => handleEnquiry(property.propertyId, property.propertyType)} />
                </SwiperSlide>
              ))
              : Array.from({ length: 15 }, (_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonCard />
                </SwiperSlide>
              ))}
          </Swiper>
          <Box sx={{ py: { md: 2, xs: 1 }, textAlign: "center" }}>
            <Link
              to={`/property/${formatSegment(
                cookies[config.preferencesCookie]?.listingType
              )}`}
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "red",
                fontWeight: "700",
              }}
            >
              View Other Properties <ArrowRightAltIcon />
            </Link>
          </Box>
        </Container>
      </Box>
      {/* latest property list end  */}

      <LeadForm
        isOpen={leadModal}
        onClose={() => setLeadModal(false)}
        leadSource={leadSource}
        propertyId={propertyId}
      />
    </>
  );
};

const SkeletonCard = () => (
  <Card sx={{ margin: "0 5px", minHeight: "290px", zIndex: 1 }}>
    <Skeleton variant="rectangular" width="100%" height={150} />
    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Skeleton width="60%" />
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Skeleton width={80} height={30} />
        <Skeleton width={80} height={30} />
      </Box>
    </CardContent>
  </Card>
);

export default LatestPropertiesSection;
