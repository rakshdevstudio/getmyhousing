import { Bed, Bath, Maximize, Compass, Calendar, Eye, ScanFace } from 'lucide-react';
import "./PropertyFeatures.css";

const PropertyFeatures = ({ propertyData }) => {
    const featureItems = [
    ];

    const getAreaInfo = () => {
        const { propertyAreaDetails } = propertyData;

        if (propertyAreaDetails?.builtupPlotArea) {
            return `${propertyAreaDetails.builtupPlotArea} ${propertyAreaDetails.areaUnit} (Built-up)`;
        } else if (propertyAreaDetails?.carpetArea) {
            return `${propertyAreaDetails.carpetArea} ${propertyAreaDetails.areaUnit} (Carpet)`;
        } else if (propertyAreaDetails?.salebleArea) {
            return `${propertyAreaDetails.salebleArea} ${propertyAreaDetails.areaUnit} (Saleable)`;
        } else if (propertyAreaDetails?.superBuiltupArea) {
            return `${propertyAreaDetails.superBuiltupArea} ${propertyAreaDetails.areaUnit} (S Built-up)`;
        } else if (propertyAreaDetails?.plotArea) {
            return `${propertyAreaDetails.plotArea} ${propertyAreaDetails.areaUnit} (Plot)`;
        }

        return null; // No area information available
    };

    const areaInfo = getAreaInfo();

    // Add no of bedrooms info if available
    if (propertyData.propertyAreaDetails?.noOfBedrooms) {
        featureItems.push({
            icon: <Bed className="feature-icon-b" />,
            label: "Bedrooms",
            value: (propertyData.propertyAreaDetails?.noOfBedrooms === "1 RK" || propertyData.propertyAreaDetails?.noOfBedrooms === "Studio")
                ? `${propertyData.propertyAreaDetails?.noOfBedrooms}`
                : `${propertyData.propertyAreaDetails?.noOfBedrooms} BHK`
        });
    }
    // Add no of bathroom info if available
    if (propertyData.propertyAreaDetails?.noOfBathrooms) {
        featureItems.push({
            icon: <Bath className="feature-icon-b" />,
            label: "Bathrooms",
            value: propertyData.propertyAreaDetails?.noOfBathrooms
        });
    }
    // Add AREA info if available
    if (areaInfo) {
        featureItems.push({
            icon: <Maximize className="feature-icon-b" />,
            label: "Area",
            value: areaInfo
        });
    }
    // Add facing info if available
    if (propertyData.propertyAreaDetails?.facing) {
        featureItems.push({
            icon: <ScanFace className="feature-icon-b" />,
            label: "Facing",
            value: propertyData.propertyAreaDetails?.facing
        });
    }
    // Add possion status info if available
    if (propertyData.propertyStatus?.positionStatus) {
        featureItems.push({
            icon: <Calendar className="feature-icon-b" />,
            label: "Possession",
            value: propertyData.propertyStatus?.positionStatus
        });
    }
    // Add facing info if available
    if (propertyData.additionalDetails?.overLookingView) {
        featureItems.push({
            icon: <Eye className="feature-icon-b" />,
            label: "View",
            value: propertyData.additionalDetails?.overLookingView
        });
    }

    return (
        <div className="feature-grid-container">
            {featureItems.map((feature, index) => (
                <div key={index} className='feature-item-contain'>
                    {feature.icon}
                    <div className="feature-item">
                        <span className="feature-item-label">{feature.label}</span>
                        <span className="feature-item-value">{feature.value}</span>
                    </div>
                </div>
            ))}
            {propertyData?.furnishingStatus?.furnishingType && (
                <div className='feature-item-contain'>
                    <div style={{ width: "1rem", height: "1rem", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 0, 0, 0.1)", borderRadius: "50%" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: "500", color: "red" }}>F</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-item-label">Furnishing</span>
                        <span className="feature-item-value">{propertyData?.furnishingStatus?.furnishingType}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PropertyFeatures