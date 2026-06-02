import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { config } from '../../../config/config'

const InactiveUser = () => {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 10, textAlign: "center", p: 3 }}>
            <CardContent>
                <Typography variant="h5" color="error">
                    Your account is inactive!
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Please contact <Link to={"tel:" + config.mobileNumber1} style={{ fontWeight: "bold" }}>{config.mobileNumber1}</Link> for assistance.
                </Typography>
                <Box sx={{ marginTop: 3 }}>
                    <Button variant='contained' onClick={() => {
                        navigate("/logout")
                    }}>Back To Home</Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default InactiveUser