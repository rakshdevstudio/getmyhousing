import React from "react";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // Add Autoplay module
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay CSS
import { ArrowForward, ArrowBack } from "@mui/icons-material";

const services = [
  {
    iconPath: "/servicePhotos/icons/house-deep-cleaning.png",
    title: "House Deep Cleaning",
    link: "/deep-cleaning-service-in-",
  },
  {
    iconPath: "/servicePhotos/icons/bathroom-cleaning.png",
    title: "Bathroom",
    link: "/bathroom-cleaning-service-in-",
  },
  {
    iconPath: "/servicePhotos/icons/kitchen-cleaning.png",
    title: "Kitchen",
    link: "/kitchen-cleaning-service-in-",
  },
  {
    iconPath: "/servicePhotos/icons/chimney-cleaning.png",
    title: "Chimney",
    link: "/chimney-cleaning-service-",
  },
  {
    iconPath: "/servicePhotos/icons/carpet-cleaner.png",
    title: "Carpet",
    link: "/carpet-cleaning-service-in-",
  },
  {
    iconPath: "/servicePhotos/icons/sofa-cleaning.png",
    title: "Sofa",
    link: "/sofa-cleaning-service-in-",
  },
  {
    iconPath: "/servicePhotos/icons/mattress-cleaning.png",
    title: "Mattress",
    link: "/mattress-cleaning-service-in-",
  },
  {
    iconPath: "/servicePhotos/icons/window-cleaning.png",
    title: "Window",
    link: "/window-cleaning-service-in-",
  },
  {
    iconPath: "/servicePhotos/icons/balcony-cleaning.png",
    title: "Balcony",
    link: "/balcony-cleaning-service-in-",
  },
  {
    iconPath: "/servicePhotos/icons/chair-cleaning.png",
    title: "Chair",
    link: "/chair-cleaning-service-in-",
  },
  // Add more services as needed
];

const WhatWeWillDo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const slidesPerView = isMobile ? 2 : 5; // Responsive slides per view

  return (
    <Box sx={{ position: "relative", width: "100%", padding: "0 40px" }}>
      <Swiper
        modules={[Navigation, Autoplay]} // Enable Autoplay module
        spaceBetween={10}
        slidesPerView={slidesPerView}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        autoplay={{
          delay: 3000, // Auto-scroll every 3 seconds
          disableOnInteraction: false, // Continue autoplay after user interaction
          pauseOnMouseEnter: true,
        }}
        loop={true} // Enable infinite loop
        breakpoints={{
          320: { slidesPerView: 1 }, // 1 slide on very small screens
          600: { slidesPerView: 2 }, // 2 slides on mobile
          960: { slidesPerView: 3 }, // 3 slides on tablets
          1280: { slidesPerView: 5 }, // 5 slides on desktop
        }}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ padding: 2, textAlign: "center", "&:hover .service-card": { transform: "translateY(-10px)", boxShadow: 6 } }}>
              <Paper className="service-card" elevation={3} sx={{ padding: 2, borderRadius: 2, transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer", "&:hover": { backgroundColor: theme.palette.background.paper } }}>
                <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "center", alignItems: "center", height: "80px" }}>
                  <img
                    src={service.iconPath}
                    alt={`${service.title}`}
                    height="60px"
                    width="60px"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                  }}>
                  {service.title}
                </Typography>
              </Paper>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <IconButton
        className="custom-swiper-button-prev"
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
          boxShadow: 3,
          zIndex: 10,
          width: "40px",
          height: "40px",
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        className="custom-swiper-button-next"
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
          boxShadow: 3,
          zIndex: 10,
          width: "40px",
          height: "40px",
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default WhatWeWillDo;