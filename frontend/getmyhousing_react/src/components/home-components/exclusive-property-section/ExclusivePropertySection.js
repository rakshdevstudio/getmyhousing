import {
  Box,
  Card,
  CardContent,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { config } from "../../../config/config";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { apiList, invokeApi } from "../../../apis/apiServices";
import { useNavigate } from "react-router-dom";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import PropertyCard from "./PropertyCard";
import LeadForm from "../../end-user/PropertyDetails/LeadForm";

const ExclusivePropertySection = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const [leadModal, setLeadModal] = useState(false);
  const [leadSource, setLeadSource] = useState("");
  const [propertyId, setPropertyId] = useState(null);

  const [isPropertiesFetching, setIsPropertiesFetching] = useState(true);
  const [propertiesList, setPropertiesList] = useState([]);
  const canLoopProperties = propertiesList.length > 3;

  const handeChangeModal = () => setLeadModal((prevState) => !prevState);

  useEffect(() => {
    const propertiesList = async () => {
      let params = {
        city: cookies[config.preferencesCookie]?.city || "Bangalore",
      };
      const response = await invokeApi(
        config.apiDomains + apiList.allExclusiveProperties,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response?.data.responseCode === "200") {
          setPropertiesList(response.data.exclusiveProperties || []);
        } else {
          setPropertiesList([]);
          console.error(
            "Failed to fetch exclusive properties:",
            response?.data?.responseMessage
          );
        }
      } else {
        setPropertiesList([]);
        console.error("Failed to fetch exclusive properties:", response);
      }
    };
    if (isPropertiesFetching && !propertiesList.length > 0) {
      propertiesList();
      setIsPropertiesFetching(false);
    }
  }, [cookies, isPropertiesFetching]);

  function handleEnquiry(propertyId, propertyType) {
    handeChangeModal();
    setPropertyId(propertyId);
    setLeadSource(propertyType);
  }

  useEffect(() => {
    setIsPropertiesFetching(true);
  }, [cookies[config.preferencesCookie]?.city]);

  return (
    <>
      {/* latest property list start  */}
      <Box
        component="section"
        sx={{ py: { md: 10, xs: 5 } }}
      >
        <Container maxWidth={"lg"}>
          <Box
            sx={{
              textAlign: "center",
              margin: "20px 0",
              position: "relative",
              zIndex: 1,
              "&::before": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "150%",
                // backgroundColor: "#f2f2f2",
                zIndex: -1,
                borderRadius: "10px",
                // boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontSize: { md: "33px", xs: "20px" },
                position: "relative",
                zIndex: 2,
                background: "linear-gradient(90deg, #e74c3c 30%, #FFD700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                padding: "10px 20px",
                borderRadius: "10px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                "& span": {
                  color: "#FFD700",
                  fontStyle: "italic",
                },
              }}
            >
              Exclusive Properties in {cookies[config.preferencesCookie]?.city}
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

const Badge = ({ label }) => (
  <Box sx={{ backgroundColor: "#EAEAEA", px: 1.5, py: 0.8, borderRadius: "8px", fontSize: "12px" }}>
    {label}
  </Box>
);

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



export default ExclusivePropertySection;
