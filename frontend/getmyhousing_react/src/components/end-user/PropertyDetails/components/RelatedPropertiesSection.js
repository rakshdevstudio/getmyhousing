import { Box, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import PropertyCard from '../../../pages/user/property-list-filter/PropertyCard'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LeadForm from '../LeadForm';

const RelatedPropertiesSection = ({ relatedProperties }) => {
    const [propertyId, setPropertyId] = useState(null);
    const [leadModal, setLeadModal] = useState(false);
    const [leadSource, setLeadSource] = useState("");

    return (
        <>
            <Box component='section' sx={{ mt: 3, py: 5 }}>
                <Container maxWidth="md">
                    {/* Heading for Similar Properties */}
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            textAlign: 'center', // Center the heading
                            fontWeight: 'bold',  // Make the text bold
                            mb: 4,              // Add margin bottom for spacing
                        }}
                    >
                        Similar Properties
                    </Typography>
                    <Swiper
                        watchSlidesProgress={true}
                        // pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Navigation, Autoplay]}
                        autoplay={{
                            delay: 10000,
                            disableOnInteraction: false,
                        }}
                        slidesPerView={1}
                        // spaceBetween={10}
                        loop={true}
                        className="mySwiper"
                    >
                        {relatedProperties?.map((p, i) => (
                            <SwiperSlide key={i} style={{ paddingTop: "30px" }}>
                                {/* Center the PropertyCard horizontally */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center', // Center horizontally
                                        alignItems: 'center',
                                    }}
                                >
                                    <PropertyCard index={i} listings={p}
                                        setPropertyId={setPropertyId}
                                        setLeadModal={setLeadModal}
                                        setLeadSource={setLeadSource} />
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </Box>

            <LeadForm
                isOpen={leadModal}
                onClose={() => setLeadModal(false)}
                leadSource={leadSource}
                propertyId={propertyId}
            />
        </>
    )
}

export default RelatedPropertiesSection