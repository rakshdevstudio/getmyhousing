import React from 'react'
// Sample data - replace with actual data from your backend
const sampleProperties = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
        title: "Modern Apartment with Lake View",
        city: "Mumbai",
        state: "Maharashtra",
        price: 12500000,
        amenities: ["Swimming Pool", "Gym", "Parking", "24/7 Security", "Garden"],
        postedBy: {
            name: "John Doe",
            role: "Premium Agent",
            phone: "+91 9876543210"
        },
        postedDate: "2 days ago",
        otherUnits: [
            {
                id: 11,
                price: 13500000,
                type: "3 BHK",
                size: 1500,
                floor: "5th Floor",
                amenities: ["Swimming Pool", "Gym", "Parking"]
            },
            {
                id: 12,
                price: 11000000,
                type: "2 BHK",
                size: 1200,
                floor: "3rd Floor",
                amenities: ["Swimming Pool", "Parking"]
            }
        ]
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
        title: "Luxury Villa in Prime Location",
        city: "Bangalore",
        state: "Karnataka",
        price: 25000000,
        amenities: ["Private Pool", "Home Theater", "Smart Home", "Tennis Court", "BBQ Area"],
        postedBy: {
            name: "Jane Smith",
            role: "Property Expert",
            phone: "+91 9876543211"
        },
        postedDate: "1 week ago"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
        title: "Commercial Space in Business District",
        city: "Delhi",
        state: "Delhi",
        price: 35000000,
        amenities: ["24/7 Access", "Conference Room", "Parking", "Security", "Cafeteria"],
        postedBy: {
            name: "Robert Wilson",
            role: "Commercial Agent",
            phone: "+91 9876543212"
        },
        postedDate: "3 days ago",
        otherUnits: [
            {
                id: 31,
                price: 32000000,
                type: "Office Space",
                size: 2000,
                floor: "12th Floor",
                amenities: ["24/7 Access", "Conference Room", "Parking"]
            }
        ]
    }
];


const PropList = () => {
    return (
        <div>PropList</div>
    )
}

export default PropList