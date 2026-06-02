import { Avatar, Box, Card, Container, Typography } from '@mui/material'
import React from 'react'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonial = ({ content }) => {
    return (
        <Box sx={{ py: 8, px: 2, textAlign: "center" }}>
            <Container maxWidth="lg">
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    {content.testimonialSection.title}
                </Typography>

                <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ mb: 2 }}>
                    {content.testimonialSection.titleDesc}
                </Typography>

                <Box sx={{ maxWidth: 110, height: 4, backgroundColor: "red", margin: "auto", mb: 4 }} />

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true, dynamicBullets: false }}
                    autoplay={{ delay: 3000 }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 }
                    }}
                >
                    {content.testimonialSection.main.map((customer, index) => (
                        <SwiperSlide key={index}>
                            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, textAlign: "left", position: "relative" }}>
                                <FormatQuoteIcon size={30} color="#ff5252" />
                                <Typography variant="body1" sx={{ mt: 2, color: "#555" }}>
                                    "{customer.feedback}"
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                                    <Avatar src={customer.image} sx={{ width: 50, height: 50, mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {customer.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {customer.location}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Box>
    )
}

export default Testimonial