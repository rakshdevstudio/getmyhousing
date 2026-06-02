import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React from 'react'
import { useCookies } from 'react-cookie';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { config } from '../../../../config/config';

const SubServices = ({ content }) => {
    const [cookies] = useCookies();
    return (
        <Box component="section" className="sub-services-section">
            <Container maxWidth="lg">
                <Box className="primary-heading-container">
                    <Typography variant="h2" className="section-primary-heading">
                        {content.subServices.title}
                    </Typography>
                    <Box className="heading-underline">
                        <span className="line"></span>
                        <HomeIcon className="home-icon" />
                        <span className="line"></span>
                    </Box>
                </Box>
                <Grid container spacing={4}>
                    {content.subServices.main.map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <Link to={service.navigate + cookies[config.preferencesCookie]?.city.toLowerCase()} className="service-card-link">
                                <Card className="service-card">
                                    <CardMedia component="img" height="180" image={service.image} alt={service.title} />
                                    <CardContent>
                                        <Typography variant="h6" className="service-title" sx={{ mb: 1 }}>
                                            {service.title}
                                        </Typography>
                                        <ul className="service-points" style={{ paddingLeft: "16px", marginBottom: "16px" }}>
                                            {service.points.map((point, index) => (
                                                <li key={index}>✅ {point}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default SubServices