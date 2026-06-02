import { Box, Typography } from '@mui/material'
import React from 'react'

const WhyChooseUs = ({ content }) => {
    return (
        <Box component='section' className="why-choose-us">
            <Typography variant="h2">{content.whyChooseUs.title}</Typography>
            <Typography variant="body1" paragraph>
                {content.whyChooseUs.titleDesc}
            </Typography>
            <Box className="features-wrapper">
                {content.whyChooseUs.main.map((feature, index) => (
                    <Box className="feature-card" key={index}>
                        <Box className="feature-icon">{feature.icon}</Box>
                        <h3 className="feature-title">{feature.title}</h3>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default WhyChooseUs