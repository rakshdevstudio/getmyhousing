import React from 'react'
import Landmarks from './LandMark'
import { Box } from '@mui/material';
import "./LocationDetails.css";

const nearbyItem = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.75rem",
    backgroundColor: "#f9fafb",
    borderRadius: "0.375rem"
}

const LocationDetails = ({ propertyData }) => {
    const nearbyPlaces = [{ name: "Hospital", distance: "1.5 KM" }];

    const googleMapsUrl = `https://maps.google.com/maps?q=${propertyData?.latitude},${propertyData?.longitude}&hl=es&z=14&amp;output=embed`;

    if (propertyData.landMarks?.hospitalDistance) {
        nearbyPlaces.push({
            name: "Hospital",
            distance: propertyData.landMarks.hospitalDistance + " " + propertyData.landMarks.hospitalDistanceType
        })
    }
    if (propertyData.landMarks.airportDistance) {
        nearbyPlaces.push({
            name: "Airport",
            distance: propertyData.landMarks.airportDistance + " " + propertyData.landMarks.airportDistanceType
        })
    }
    if (propertyData.landMarks.railwayStationDistance) {
        nearbyPlaces.push({
            name: "Railway Station",
            distance: propertyData.landMarks.railwayStationDistance + " " + propertyData.landMarks.railwayStationDistanceType
        })
    }
    if (propertyData.landMarks.atmDistance) {
        nearbyPlaces.push({
            name: "ATM",
            distance: propertyData.landMarks.atmDistance + " " + propertyData.landMarks.atmDistanceType
        })
    }
    if (propertyData.landMarks.shoppingMallDistance) {
        nearbyPlaces.push({
            name: "Shopping Mall",
            distance: propertyData.landMarks.shoppingMallDistance + " " + propertyData.landMarks.shoppingMallDistanceType
        })
    }
    if (propertyData.landMarks.bankDistance) {
        nearbyPlaces.push({
            name: "Bank",
            distance: propertyData.landMarks.bankDistance + " " + propertyData.landMarks.bankDistanceType
        })
    }
    if (propertyData.landMarks.busStopDistance) {
        nearbyPlaces.push({
            name: "Bus Stop",
            distance: propertyData.landMarks.busStopDistance + " " + propertyData.landMarks.busStopDistanceType
        })
    }
    if (propertyData.landMarks.metroStationDistance) {
        nearbyPlaces.push({
            name: "Metro Station",
            distance: propertyData.landMarks.metroStationDistance + " " + propertyData.landMarks.metroStationDistanceType
        })
    }
    if (propertyData.landMarks.schoolDistance) {
        nearbyPlaces.push({
            name: "School",
            distance: propertyData.landMarks.schoolDistance + " " + propertyData.landMarks.schoolDistanceType
        })
    }
    return (
        <>
            <div style={{ marginTop: "1.5rem" }}>
                <div style={{}}>
                    <iframe
                        width="100%"
                        style={{ pt: 1 }}
                        title="Sub-locality"
                        height="300px"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        src={googleMapsUrl}
                    ></iframe>
                </div>
                <div style={{ paddingTop: "1rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "500", marginBottom: "1rem" }}>Nearby Places</h4>
                    <div className="near-by-location-container">
                        {nearbyPlaces.map((place, index) => (
                            <div key={index} style={nearbyItem}>
                                <span>{place.name}</span>
                                <span style={{ color: "red", fontWeight: "500" }}>{place.distance}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LocationDetails