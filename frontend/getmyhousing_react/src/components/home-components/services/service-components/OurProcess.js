import { Avatar, Box, Card, Container, Grid, Typography } from '@mui/material'
import React from 'react'

const OurProcess = ({ content }) => {
    return (
        <section style={{ backgroundColor: "#f8f9fa", padding: "80px 0" }}>
            <Container>
                {/* Section Heading */}
                <Box className="primary-heading-container" sx={{ textAlign: "center", mb: 6 }}>
                    <Typography variant="h2" className="section-primary-heading" sx={{ fontWeight: "bold", mb: 2 }}>
                        {content.ourProcess.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                        {content.ourProcess.titleDesc}
                    </Typography>
                    <Box
                        sx={{
                            width: "80px",
                            height: "4px",
                            backgroundColor: "#ff5252",
                            margin: "10px auto",
                            borderRadius: "2px",
                        }}
                    />
                </Box>

                {/* Process Steps */}
                <Grid container spacing={4} justifyContent="center">
                    {content.ourProcess.main.map((step, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    padding: "20px",
                                    textAlign: "center",
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    height: "100%",
                                    transition: "transform 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <Avatar
                                    src={step.icon}
                                    alt={step.title}
                                    sx={{ width: 60, height: 60, mb: 2, backgroundColor: "#ff5252" }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                                    {step.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {step.description}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </section>
    )
}

export default OurProcess