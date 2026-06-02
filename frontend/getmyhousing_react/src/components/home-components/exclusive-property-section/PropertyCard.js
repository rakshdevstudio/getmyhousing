import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { formatSegment, PriceFormatter } from '../../../common/common';
import { useNavigate } from 'react-router-dom';
import '../../../styles/PropertyCard.css';
const emptyPropertyImage = "/media/images/gridimgae.jpeg";

function normalizeImageUrl(imagePath) {
    if (!imagePath || typeof imagePath !== "string") {
        return emptyPropertyImage;
    }

    const s3Prefix = "https://propertybroker.s3.ap-south-1.amazonaws.com/";
    if (imagePath.startsWith(s3Prefix)) {
        return imagePath.replace(
            s3Prefix,
            "https://s3.ap-south-1.amazonaws.com/propertybroker/"
        );
    }

    return imagePath;
}

const PropertyCard = ({ property, handleEnquiry }) => {
    const navigate = useNavigate();

    const formatPriceINR = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0 // No decimal points
        }).format(price);
    };

    function handleToNavigate() {
        navigate(`/property/${formatSegment(property.listingType)}/${formatSegment(property.propertyName)}/${formatSegment(property.buildingType + "-" + property.propertyType + "-in-" + property.locality + "-" + property.city)}/${property.propertyId}`)
    }

    const featuredImage = property.imageData?.find(
        (item) => item.imageType === "featured"
    )?.imagePath;

    return (
        <div className="property-card">
            <div className="image-container">
                <img
                    src={normalizeImageUrl(featuredImage)}
                    alt={property.title}
                    className="property-image"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = emptyPropertyImage;
                    }}
                />
                <div className="image-overlay" />
                <div className="listing-type">{property.listingType === 'rent' ? 'For Rent' : 'For Sale'}</div>
            </div>

            <div className="content-container">
                <h3 className="property-title">{property.title}</h3>

                <div className="location-container">
                    <AddLocationIcon className="icon" />
                    <span className="location-text">
                        {property.city}, {property.state}
                    </span>
                </div>

                <div className="price-container">
                    <span className="price-text">
                        {formatPriceINR(property.rent)}
                        {property.listingType === 'rent' && '/month'}
                    </span>
                </div>

                <div className="amenities-container">
                    {property.numOfBedrooms && (
                        <span className="amenity-tag">
                            {property.numOfBedrooms && (property.numOfBedrooms === "Studio" || property.numOfBedrooms === "1 RK" ? property.numOfBedrooms : property.numOfBedrooms + " BHK")}
                        </span>
                    )}
                    {property.superBuiltupArea && (
                        <span className="amenity-tag">
                            {property.superBuiltupArea && property.superBuiltupArea + property.areaUnit}
                        </span>
                    )}
                    {property.furnishingType && (
                        <span className="amenity-tag">
                            {property.furnishingType}
                        </span>
                    )}
                    {property.positionStatus && (
                        <span className="amenity-tag">
                            {property.positionStatus && property.positionStatus}
                        </span>
                    )}
                </div>

                <div className="buttons-container">
                    <button
                        className="btn btn-primary"
                        onClick={handleEnquiry}
                    >
                        <span className="icon-container">
                            <ChatBubbleIcon className="icon" />
                        </span>
                        Enquiry Now
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => handleToNavigate(property)}
                    >
                        <span>More Details</span>
                        <span className="icon-container">
                            <ArrowForwardIcon className="icon" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard
