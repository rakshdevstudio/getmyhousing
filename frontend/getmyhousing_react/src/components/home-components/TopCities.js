import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import React, { useRef } from 'react'
import { useCookies } from 'react-cookie';
import { config } from '../../config/config';
import { indiaTopCities } from '../../common/common';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./TopCities.css";

const TopCities = () => {
    const [cookies, setCookies] = useCookies();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

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
    return (
        <>
            <Box component='section' sx={{ py: 6, textAlign: "center", backgroundColor: "#F9F9F9" }}>
                <Container fixed>
                    {/* Heading */}
                    <Box className="primary-heading-container">
                        <Typography variant="h2" className="section-primary-heading">
                            Find Your Dream Properties In{" "}
                            {cookies[config.preferencesCookie]?.city
                                ? cookies[config.preferencesCookie]?.city
                                : "Your Preferred City"}
                        </Typography>
                    </Box>
                    <div className="carousel-container">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={25}
                            slidesPerView={5}
                            loop={true}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            autoplay={{ delay: 3000 }}
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                600: { slidesPerView: 3 },
                                1000: { slidesPerView: 4 },
                            }}
                            onInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                        >
                            {indiaTopCities.map((item) => (
                                <SwiperSlide key={item.name}>
                                    <Card
                                        sx={{
                                            margin: "15px 5px",
                                            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                                            borderRadius: "15px",
                                            border: "1px solid #E0E0E0",
                                            background: "#FFF",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
                                            },
                                            cursor: "pointer"
                                        }}
                                        onClick={() => setCity(item.name)}
                                    >
                                        <CardContent
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: "20px",
                                            }}
                                        >
                                            {/* Icon/Image */}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: { md: "60px", xs: "40px" },
                                                    height: { md: "60px", xs: "40px" },
                                                    background: "#F5F5F5",
                                                    borderRadius: "50%",
                                                    padding: "10px",
                                                    mb: "10px",
                                                }}
                                            >
                                                <img
                                                    src={item.svg}
                                                    alt={item.name}
                                                    style={{ width: "70%", height: "auto" }}
                                                />
                                            </Box>

                                            {/* City Name */}
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    color: "#333",
                                                    fontSize: { md: "16px", xs: "12px" },
                                                    fontWeight: 600,
                                                    textAlign: "center",
                                                    fontFamily: "Mulish, sans-serif",
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                        {/* Custom Navigation Buttons at the Bottom */}
                        {/* <div className="carousel-controls">
                            <button ref={prevRef} className="carousel-button prev"><ArrowBackIcon className="arrow-icon left-icon" /></button>
                            <button ref={nextRef} className="carousel-button next"><ArrowForwardIcon className="arrow-icon right-icon" /></button>
                        </div> */}
                    </div>
                </Container>
            </Box>
        </>
    )
}

export default TopCities