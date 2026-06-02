import CleaningService from "../components/home-components/services/pages/cleaning-service/CleaningService";
import LegalServices from "../components/home-components/services/pages/LegalServices";
import OtherService from "../components/home-components/services/pages/OtherService";
import PackersMovers from "../components/home-components/services/pages/PackersMovers";
import PestControl from "../components/home-components/services/pages/PestControl";
import PowerSystem from "../components/home-components/services/pages/PowerSystem";
import { Droplet, House, Factory, PaintBucket, Sofa, Truck, Compass, Table, Sun, Banknote, Scale, Trash, Bug, Zap, Wrench, Hammer, Wind, ArrowDownUp, ShowerHead, GlassWater, Grid2x2, Ellipsis } from "lucide-react";
import { emphasize, styled } from "@mui/material/styles";
import {
  PropertyManagementServices,
  ResidentialPropertyManagement,
  IndustrialPropertyManagement,
  CommercialPropertyManagement,
  PaintingService,
  InteriorPaintingService,
  AirCondition,
  Carpenter,
  CommercialInteriorService,
  CommercialPaintingService,
  CustomizedFurniture,
  Electrican,
  Elevator,
  ExteriorPaintingService,
  HomeInterior,
  HomeLoan,
  IndustrialInteriorService
} from "../components/home-components/services/pages/index";
import ResidentialInteriorService from "../components/home-components/services/pages/ResidentialInteriorService";
import SolarRooftop from "../components/home-components/services/pages/SolarRooftop";
import SpecalityPaintingService from "../components/home-components/services/pages/SpecalityPaintingService";
import Tiles from "../components/home-components/services/pages/Tiles";
import VastuConsult from "../components/home-components/services/pages/VastuConsult";
import ResidentialPropertyManagementCardImage from "../components/home-components/services/assets/residential-property-management-service-card.jpg";
import IndustrialPropertyManagementCardImage from "../components/home-components/services/assets/industrial-property-management-service-card.jpg";
import CommercialPropertyManagementCardImage from "../components/home-components/services/assets/commercial-property-management-service-card.jpg";
import GppGoodIcon from '@mui/icons-material/GppGood';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddHomeIcon from '@mui/icons-material/AddHome';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import propertyAssessment from "../components/home-components/services/assets/icons/good-feedback.png";
import marketingTenant from "../components/home-components/services/assets/icons/billboard.png";
import maintenanceService from "../components/home-components/services/assets/icons/house.png";
import rentCollection from "../components/home-components/services/assets/icons/plan.png";
import InteriorPaintingServiceImage from "../components/home-components/services/assets/interior-painting-service.jpg";
import ExterirorPaintingServiceImage from "../components/home-components/services/assets/exterior-painting-service.jpg";
import CommercialPaintingServiceImage from "../components/home-components/services/assets/commercial-painting-service.jpg";
import SpecialityPaintingServiceImage from "../components/home-components/services/assets/speciality-painting-service.jpg";
import CommercialInteriorServiceImage from "../components/home-components/services/assets/commercial-interior-service.jpg";
import ResidentialInteriorServiceImage from "../components/home-components/services/assets/residential-interior-service.jpg";
import IndustrialInteriorServiceImage from "../components/home-components/services/assets/industrial-interior-service.jpg";
import FabricationServiceImage from "../components/home-components/services/assets/fabrication-service.jpg";
import FabricationService from "../components/home-components/services/pages/FabricationService";
import MosquitoNettingService from "../components/home-components/services/pages/MosquitoNettingService";
import { WaterPurifier } from "../components/home-components/services/pages/WaterPurifier";
import Geyser from "../components/home-components/services/pages/Geyser";
import AirCrackFilling from "../components/home-components/services/pages/AirCrackFilling";
import MosquitoNettingServiceImage from "../components/home-components/services/assets/mosquito-netting-service.jpg";
import WaterPurifierImage from "../components/home-components/services/assets/water-purifier.jpg";
import GeyserImage from "../components/home-components/services/assets/geyser-service.jpg";
import AirCrackFillingImage from "../components/home-components/services/assets/air-cracking-service.jpg";
import WaterProofingImage from "../components/home-components/services/assets/water-proofing-service.jpg";
import { Chip } from "@mui/material";
import { WaterProofing } from "../components/home-components/services/pages/WaterProofing";

export default function mobileNoValidation(mobileNumber) {
  const mobileNoRegex = /^[6-9][0-9]{9}$/;
  if (mobileNoRegex.test(mobileNumber)) {
    return true;
  }
  return false;
}

export const formatSegment = (segment) => {
  if (!segment) return "";
  return segment.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-");
};

export function displayMobileNumber(mobileNumber) {
  if (mobileNumber?.length >= 4) {
    return mobileNumber.substring(0, 4) + "*".repeat(mobileNumber?.length - 4);
  } else {
    return "*".repeat(mobileNumber?.length);
  }
}

export function validAmountChecker(amount, characters) {
  if (amount.length < characters) {
    return false;
  } else {
    return true;
  }
}

export const generateOrderId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "-");
};

export const isEmpty = (value) => {
  // Check for null or undefined
  if (value == null) return true;

  // Check for empty arrays
  if (Array.isArray(value) && value.length === 0) return true;

  // Check for empty objects
  if (typeof value === "object" && Object.keys(value).length === 0) return true;

  // Check for empty strings
  if (typeof value === "string" && value.trim().length === 0) return true;

  return false;
};

export function dateFormate(dbDate) {
  // Create a new Date object with a specific date and time
  if (dbDate) {
    const myDate = new Date(dbDate);

    // Get various components of the date and time
    const year = myDate.getFullYear(); // Get the year (e.g., 2024)
    const monthIndex = myDate.getMonth(); // Get the month index (0-11)
    const day = myDate.getDate(); // Get the day of the month (1-31)
    const hours = myDate.getHours(); // Get the hours (0-23)
    const minutes = myDate.getMinutes(); // Get the minutes (0-59)
    const seconds = myDate.getSeconds(); // Get the seconds (0-59)
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine if it's AM or PM
    const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format

    // Array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Format the date and time as a string
    const formattedDateTime = `${formattedHours}:${minutes < 10 ? "0" : ""
      }${minutes} ${ampm} ${day} ${monthNames[monthIndex]} ${year}`;

    return formattedDateTime;
  } else {
    return null;
  }
}

export const emailValidation = (email) => {
  return email.match(
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  // Reference: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
};

export const validatePassword = (password) => {
  const criteria = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  return criteria;
};

export function PriceFormatter(number) {
  if (number >= 10000000) {
    const valueInCrores = number / 10000000;
    const formattedValue = Number.isInteger(valueInCrores)
      ? valueInCrores.toFixed(0)
      : valueInCrores.toFixed(2);
    return "₹ " + formattedValue + " Cr";
  } else if (number >= 100000) {
    const valueInLakhs = number / 100000;
    const formattedValue = Number.isInteger(valueInLakhs)
      ? valueInLakhs.toFixed(0)
      : valueInLakhs.toFixed(2);
    return "₹ " + formattedValue + " Lac";
  } else if (number >= 1000) {
    const valueInThousands = number / 1000;
    const formattedValue = Number.isInteger(valueInThousands)
      ? valueInThousands.toFixed(0)
      : valueInThousands.toFixed(2);
    return "₹ " + formattedValue + "K";
  } else {
    const formattedValue = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(number);
    return formattedValue;
  }
}

export const indiaTopCities = [
  {
    name: "Ahmedabad",
    svg: "/media/svg/ahmedabad.svg",
  },
  {
    // name: "Bengaluru",
    name: "Bangalore",
    svg: "/media/svg/bangalore.svg",
  },
  {
    name: "Bhubaneswar",
    svg: "/media/svg/Bhubaneswar.svg",
  },
  {
    name: "Chandigarh",
    svg: "/media/svg/Chandigarh.svg",
  },
  {
    name: "Chennai",
    svg: "/media/svg/Chennai.svg",
  },
  {
    name: "Dehradun",
    svg: "/media/svg/Dehradun.svg",
  },
  {
    name: "Delhi",
    svg: "/media/svg/Delhi.svg",
  },
  {
    name: "Faridabad",
    svg: "/media/svg/Faridabad.svg",
  },
  {
    name: "Ghaziabad",
    svg: "/media/svg/Ghaziabad.svg",
  },
  {
    name: "Greater Noida",
    svg: "/media/svg/Greater-Noida.svg",
  },
  {
    name: "Gurgaon",
    svg: "/media/svg/Gurgaon.svg",
  },
  {
    name: "Hyderabad",
    svg: "/media/svg/Hyderabad.svg",
  },
  {
    name: "Indore",
    svg: "/media/svg/Indore.svg",
  },
  {
    name: "Jaipur",
    svg: "/media/svg/Jaipur.svg",
  },
  {
    name: "Kolkata",
    svg: "/media/svg/Kolkata.svg",
  },
  {
    name: "Lucknow",
    svg: "/media/svg/Lucknow.svg",
  },
  {
    name: "Meerut",
    svg: "/media/svg/Meerut.svg",
  },
  {
    name: "Mohali",
    svg: "/media/svg/Mohali.svg",
  },
  {
    name: "mumbai",
    svg: "/media/svg/mumbai.svg",
  },
  {
    name: "noida",
    svg: "/media/svg/noida.svg",
  },
  {
    name: "vizag",
    svg: "/media/svg/vizag.svg",
  },
];

export const cardItems = [
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
  {
    place: "Electronic City",
    amount: "₹5,334 - ₹10,544 per sqft",
    review: "(214 reviews)",
    year: "12104 Properties for Sale",
  },
];

// below the array for service section in home page
export const services = [
  {
    icon: <House className="service-icon" />,
    name: "Property Management",
    navigate: "/property-management-service/",
    component: <PropertyManagementServices />,
    childService: [
      {
        id: 1,
        title: "Residential Property Management",
        image: ResidentialPropertyManagementCardImage,
        points: [
          "Hassle-free tenant screening & leasing",
          "Routine inspections & property maintenance",
          "Automated rent collection & legal support"
        ],
        navigate: "/residential-property-management-service/",
        component: <ResidentialPropertyManagement />,
      },
      {
        id: 2,
        title: "Commercial Property Management",
        image: CommercialPropertyManagementCardImage,
        points: [
          "Retail & office space leasing solutions",
          "Property upkeep & maintenance services",
          "Financial reporting & legal compliance"
        ],
        navigate: "/commercial-property-management-service/",
        component: <CommercialPropertyManagement />,
      },
      {
        id: 3,
        title: "Industrial Property Management",
        image: IndustrialPropertyManagementCardImage,
        points: [
          "Specialized facility management",
          "Compliance with industry safety regulations",
          "Lease management & tenant coordination"
        ],
        navigate: "/industrial-property-management-service/",
        component: <IndustrialPropertyManagement />,
      },
    ],
  },
  {
    icon: <PaintBucket className="service-icon" />,
    name: "Painting Service",
    navigate: "/painting-service/",
    component: <PaintingService />,
    childService: [
      {
        id: 1,
        image: InteriorPaintingServiceImage,
        title: "Interior Painting Service",
        navigate: "/interior-painting-service/",
        points: [
          "High-quality interior wall coatings",
          "Professional & mess-free painting",
          "Customized color consultation"
        ],
        component: <InteriorPaintingService />,
      },
      {
        id: 2,
        image: ExterirorPaintingServiceImage,
        title: "Exterior Painting Service",
        navigate: "/exterior-painting-service/",
        points: [
          "Weather-resistant exterior paint solutions",
          "Protection from moisture & UV damage",
          "Long-lasting finish with vibrant colors"
        ],
        component: <ExteriorPaintingService />,
      },
      {
        id: 3,
        image: CommercialPaintingServiceImage,
        title: "Commercial Painting Service",
        navigate: "/commercial-painting-service/",
        points: [
          "Durable coatings for commercial properties",
          "Minimal disruption to business operations",
          "Custom branding & design options"
        ],
        component: <CommercialPaintingService />,
      },
      {
        id: 4,
        image: SpecialityPaintingServiceImage,
        title: "Specality Painting Service",
        navigate: "/specality-painting-service/",
        points: [
          "Custom textures & decorative finishes",
          "Eco-friendly & odor-free painting options",
          "Special coatings for unique applications"
        ],
        component: <SpecalityPaintingService />,
      },
    ],
  },
  {
    icon: <Sofa className="service-icon" />,
    name: "Interior Service",
    navigate: "/home-interior-service/",
    component: <HomeInterior />,
    childService: [
      {
        id: 1,
        image: CommercialInteriorServiceImage,
        title: "Commercial Interior Service",
        navigate: "/commercial-home-interior-service/",
        component: <CommercialInteriorService />,
        points: [
          "Modern & functional office designs",
          "Space optimization & branding solutions",
          "Premium-quality materials & finishes"
        ],
      },
      {
        id: 2,
        image: ResidentialInteriorServiceImage,
        title: "Residential Interior Service",
        navigate: "/residential-home-interior-service/",
        component: <ResidentialInteriorService />,
        points: [
          "Customized home decor & design",
          "Smart space utilization solutions",
          "Elegant furniture & lighting concepts"
        ],
      },
      {
        id: 3,
        image: IndustrialInteriorServiceImage,
        title: "Industrial Interior Service",
        navigate: "/industrial-home-interior-service/",
        component: <IndustrialInteriorService />,
        points: [
          "Durable & practical industrial setups",
          "Heavy-duty flooring & storage solutions",
          "Optimized workflow designs for efficiency"
        ],
      },
    ],
  },
  {
    icon: <Truck className="service-icon" />,
    name: "Packers & Movers",
    navigate: "/packers-movers-service/",
    component: <PackersMovers />,
  },
  {
    icon: <Compass className="service-icon" />,
    name: "Vastu Consult",
    navigate: "/vastu-consult-service/",
    component: <VastuConsult />,
  },
  {
    icon: <Table className="service-icon" />,
    name: "Customized Furniture",
    navigate: "/customized-furniture-service/",
    component: <CustomizedFurniture />,
  },
  {
    icon: <Sun className="service-icon" />,
    name: "Solar Rooftop",
    navigate: "/solar-rooftop-service/",
    component: <SolarRooftop />,
  },
  {
    icon: <Banknote className="service-icon" />,
    name: "Property Loan",
    navigate: "/home-loan-service/",
    component: <HomeLoan />,
  },
  {
    icon: <Scale className="service-icon" />,
    name: "Legal Services",
    navigate: "/legal-service/",
    component: <LegalServices />,
  },
  {
    icon: <Trash className="service-icon" />,
    name: "Cleaning Service",
    navigate: "/cleaning-service/",
    component: <CleaningService />,
  },
  {
    icon: <Bug className="service-icon" />,
    name: "Pest Control",
    navigate: "/pest-control-service/",
    component: <PestControl />,
  },
  {
    icon: <Zap className="service-icon" />,
    name: "Power System's",
    navigate: "/power-system-service/",
    component: <PowerSystem />,
  },
  {
    icon: <Wrench className="service-icon" />,
    name: "Electrican",
    navigate: "/electrican-service/",
    component: <Electrican />,
  },
  {
    icon: <Hammer className="service-icon" />,
    name: "Carpenter",
    navigate: "/carpenter-service/",
    component: <Carpenter />,
  },
  {
    icon: <Wind className="service-icon" />,
    name: "Air Condition",
    navigate: "/air-condition-service/",
    component: <AirCondition />,
  },
  {
    icon: <ArrowDownUp className="service-icon" />,
    name: "Elevator",
    navigate: "/elevator-service/",
    component: <Elevator />,
  },
  {
    icon: <Grid2x2 className="service-icon" />,
    name: "Tiles",
    navigate: "/tiles-fitting-service/",
    component: <Tiles />,
  },
  {
    icon: <Ellipsis className="service-icon" />,
    name: "Other Service",
    navigate: "/other-services/",
    component: <OtherService />,
  },
];

export const otherService = [
  {
    icon: <Factory className="service-icon" />,
    name: "Fabrication",
    navigate: "/fabrication-service/",
    component: <FabricationService />,
  },
  {
    icon: <Grid2x2 className="service-icon" />,
    name: "Mosquito netting",
    navigate: "/mosquito-netting-service/",
    component: <MosquitoNettingService />,
  },
  {
    icon: <GlassWater className="service-icon" />,
    name: "Water Purifier",
    navigate: "/water-purifier-service/",
    component: <WaterPurifier />,
  },
  {
    icon: <ShowerHead className="service-icon" />,
    name: "Geyser",
    navigate: "/geyser-service/",
    component: <Geyser />,
  },
  {
    icon: <Zap className="service-icon" />,
    name: "Air Crack Filling",
    navigate: "/air-crack-filling-service/",
    component: <AirCrackFilling />,
  },
  {
    icon: <Droplet className="service-icon" />,
    name: "Water Proofing",
    navigate: "/water-proofing-service/",
    component: <WaterProofing />,
  },
];

export const buyBudgets = [
  { value: 500000, label: "5 Lac" },
  { value: 1000000, label: "10 Lac" },
  { value: 1500000, label: "15 Lac" },
  { value: 2000000, label: "20 Lac" },
  { value: 2500000, label: "25 Lac" },
  { value: 3000000, label: "30 Lac" },
  { value: 4000000, label: "40 Lac" },
  { value: 5000000, label: "50 Lac" },
  { value: 6000000, label: "60 Lac" },
  { value: 7000000, label: "70 Lac" },
  { value: 8000000, label: "80 Lac" },
  { value: 9000000, label: "90 Lac" },
  { value: 10000000, label: "1 Cr" },
  { value: 15000000, label: "1.5 Cr" },
  { value: 20000000, label: "2 Cr" },
  { value: 25000000, label: "2.5 Cr" },
  { value: 30000000, label: "3 Cr" },
  { value: 40000000, label: "4 Cr" },
  { value: 50000000, label: "5 Cr" },
  { value: 60000000, label: "6 Cr" },
  { value: 70000000, label: "7 Cr" },
  { value: 80000000, label: "8 Cr" },
  { value: 90000000, label: "9 Cr" },
  { value: 100000000, label: "10 Cr" },
  { value: 150000000, label: "15 Cr" },
  { value: 200000000, label: "20 Cr" },
  { value: 250000000, label: "25 Cr" },
  { value: 300000000, label: "30 Cr" },
  { value: 400000000, label: "40 Cr" },
  { value: 500000000, label: "50 Cr" },
  { value: 600000000, label: "60 Cr" },
  { value: 700000000, label: "70 Cr" },
  { value: 800000000, label: "80 Cr" },
  { value: 900000000, label: "90 Cr" },
  { value: 1000000000, label: "100 Cr" },
  { value: 1500000000, label: "150 Cr" },
  { value: 200000000, label: "200 Cr" },
  { value: 300000000, label: "300 Cr" },
  { value: 400000000, label: "400 Cr" },
  { value: 500000000, label: "500 Cr" },
  { value: 600000000, label: "600 Cr" },
  { value: 700000000, label: "700 Cr" },
  { value: 800000000, label: "800 Cr" },
  { value: 900000000, label: "900 Cr" },
  { value: 1000000000, label: "1000 Cr" },
  // { value: , label: "unlimited" },
  // Add more options as needed
];

export const rentBudgets = [
  { value: 5000, label: "5,000" },
  { value: 10000, label: "10,000" },
  { value: 15000, label: "15,000" },
  { value: 20000, label: "20,000" },
  { value: 25000, label: "25,000" },
  { value: 30000, label: "30,000" },
  { value: 35000, label: "35,000" },
  { value: 40000, label: "40,000" },
  { value: 45000, label: "45,000" },
  { value: 50000, label: "50,000" },
  { value: 55000, label: "55,000" },
  { value: 60000, label: "60,000" },
  { value: 65000, label: "65,000" },
  { value: 70000, label: "70,000" },
  { value: 75000, label: "75,000" },
  { value: 80000, label: "80,000" },
  { value: 85000, label: "85,000" },
  { value: 90000, label: "90,000" },
  { value: 95000, label: "95,000" },
  { value: 100000, label: "1 Lac" },
  { value: 105000, label: "1.05 Lac" },
  { value: 110000, label: "1.10 Lac" },
  { value: 115000, label: "1.15 Lac" },
  { value: 120000, label: "1.20 Lac" },
  { value: 125000, label: "1.25 Lac" },
  { value: 150000, label: "1.50 Lac" },
  { value: 175000, label: "1.75 Lac" },
  { value: 200000, label: "2 Lac" },
  { value: 300000, label: "3 Lac" },
  { value: 400000, label: "4 Lac" },
  { value: 500000, label: "5 Lac" },
  { value: 1000000, label: "10 Lac" },
  { value: 2000000, label: "20 Lac" },
  { value: 3000000, label: "30 Lac" },
  { value: 5000000, label: "50 Lac" },
  { value: 7500000, label: "75 Lac" },
  { value: 1000000000, label: "unlimited" },
  // Add more options as needed
];
export const sizesList = [
  { value: 100, label: "100 sq.ft." },
  { value: 200, label: "200 sq.ft." },
  { value: 300, label: "300 sq.ft." },
  { value: 400, label: "400 sq.ft." },
  { value: 500, label: "500 sq.ft." },
  { value: 600, label: "600 sq.ft." },
  { value: 800, label: "800 sq.ft." },
  { value: 1000, label: "1000 sq.ft." },
  { value: 1200, label: "1200 sq.ft." },
  { value: 1400, label: "1400 sq.ft." },
  { value: 1600, label: "1600 sq.ft." },
  { value: 1800, label: "1800 sq.ft." },
  { value: 2000, label: "2000 sq.ft." },
  { value: 2500, label: "2500 sq.ft." },
  { value: 3000, label: "3000 sq.ft." },
  { value: 3500, label: "3500 sq.ft." },
  { value: 4000, label: "4000 sq.ft." },
  { value: 4500, label: "4500 sq.ft." },
  { value: 5000, label: "5000 sq.ft." },
  { value: 5500, label: "5500 sq.ft." },
  { value: 6000, label: "6000 sq.ft." },
  { value: 6500, label: "6500 sq.ft." },
  { value: 7000, label: "7000 sq.ft." },
  { value: 8000, label: "8000 sq.ft." },
  { value: 9000, label: "9000 sq.ft." },
  { value: 10000, label: "10000 sq.ft." },
  { value: 15000, label: "15000 sq.ft." },
  { value: 20000, label: "20000 sq.ft." },
  { value: 25000, label: "25000 sq.ft." },
  { value: 30000, label: "30000 sq.ft." },
  { value: 35000, label: "35000 sq.ft." },
  { value: 40000, label: "40000 sq.ft." },
  { value: 45000, label: "45000 sq.ft." },
  { value: 50000, label: "50000 sq.ft." },
  { value: 60000, label: "60000 sq.ft." },
  { value: 70000, label: "70000 sq.ft." },
  { value: 80000, label: "80000 sq.ft." },
  { value: 90000, label: "90000 sq.ft." },
  { value: 100000, label: "100000 sq.ft." },
  { value: 125000, label: "125000 sq.ft." },
  { value: 150000, label: "150000 sq.ft." },
  { value: 175000, label: "175000 sq.ft." },
  { value: 200000, label: "200000 sq.ft." },
  { value: 225000, label: "225000 sq.ft." },
  { value: 325000, label: "325000 sq.ft." },
  { value: 425000, label: "425000 sq.ft." },
  { value: 525000, label: "525000 sq.ft." },
  { value: 625000, label: "625000 sq.ft." },
  { value: 725000, label: "725000 sq.ft." },
  { value: 825000, label: "825000 sq.ft." },
  { value: 925000, label: "925000 sq.ft." },
  { value: 1025000, label: "1025000 sq.ft." },
  { value: 1125000, label: "1125000 sq.ft." },
  // Add more options as needed
];

export const estateOptions = [
  "Cotton",
  "Coffee",
  "Tea",
  "Cocoa",
  "Sugarcane",
  "Opium",
  "Sisal",
  "Oil Seeds",
  "Oil Palms",
  "Fruits",
  "Rubber Trees",
  "Forest Trees",
  "Cashew Nut",
  "Black Pepper",
  "Other",
];

export const MenuServices = {
  forBuyers: [
    { name: "Home Loan", navigate: "/home-loan-service/" },
    { name: "Property Legal Services", navigate: "/legal-service/" },
    // { name: "Escrow", navigate: "/escrow-services" },
    { name: "Vastu Consultation", navigate: "/vastu-consult-service/" },
    // { name: "Property Inspection", navigate: "/site-inspection" },
    { name: "Tiles Fitting", navigate: "/tiles-fitting-service/" },
    // { name: "Site Registration", navigate: "/site-registration" },
    {
      name: "Customized Furniture",
      navigate: "/customized-furniture-service/",
    },
    // {name:"Real Estate Services",navigate:"/"},
    // {name:"Check Your Credit Score",navigate:"/"},
    // {name:"Buyer Guide",navigate:"/"},
    // {name:"NRI Guide",navigate:"/"},
  ],
  forTenants: [
    // { name: "Rent Receipt Generator", navigate: "/rent-receipt-generator" },
    // { name: "Furniture on Rent", navigate: "/rental-furniture" },
    { name: "Packers & Movers", navigate: "/packers-movers-service/" },
    { name: "Electrican", navigate: "/electrican-service/" },
    { name: "Pest Control", navigate: "/pest-control-service/" },
    { name: "Cleaning Service", navigate: "/cleaning-service/" },
    // {name:"Tenant Guide",navigate:"/"},
    // {name:"Online Rent Agreement",navigate:"/"},
  ],
  forOwners: [
    // { name: "Sell/Rent Property Online", navigate: "/sell-or-rent-property" },
    { name: "Property Management", navigate: "/property-management-service/" },
    { name: "Home Interior Designers", navigate: "/home-interior-service/" },
    { name: "Home Painting Services", navigate: "/painting-service/" },
    { name: "Solar Rooftop", navigate: "/solar-rooftop-service/" },
    { name: "Elevator", navigate: "/elevator-service/" },
    // { name: "IT Services", navigate: "/it-services" },
    // {name:"Seller Guide",navigate:"/"},
  ],
};

export const buySubmenu = [
  {
    heading: "Popular Searches",
    points: [
      "Property in Bangalore for Sale",
      "Gated Community Flats in Bangalore for Sale",
      "Property in Bangalore for Sale Without Brokerage",
      "Semi-Furnished Flats in Bangalore for Sale",
      "Furnished Flats in Bangalore for Sale",
      "Top Localities in Bangalore",
      "Bangalore Real Estate News ",
      "Bangalore Property Rates & Prices ",
      "Properties with Power Backup in Bangalore for Sale ",
      "Properties with Swimming Pool in Bangalore for Sale ",
      "Properties with Gymnasium in Bangalore for Sale ",
      "Properties with Clubhouse in Bangalore for Sale ",
    ],
  },
  {
    heading: "Residential Properties",
    points: [
      "Plot in Bangalore for Sale ",
      "Flats in Bangalore for Sale ",
      "Villa in Bangalore for Sale ",
      "Houses in Bangalore for Sale ",
      "Builder Floor in Bangalore for Sale ",
      "Penthouse in Bangalore for Sale ",
    ],
  },
  {
    heading: "Commercial Properties",
    points: [
      "Land in Bangalore for Sale ",
      "Office Space in Bangalore for Sale ",
      "Industrial Plot in Bangalore for Sale ",
      "Shop in Bangalore for Sale ",
      "Showroom in Bangalore for Sale ",
      "Warehouse in Bangalore for Sale ",
      "Co-working Space in Bangalore for Sale ",
      "Commercial Properties in Bangalore for Sale ",
    ],
  },
  {
    heading: "No. of Rooms",
    points: [
      "1 BHK Flats in Bangalore for Sale ",
      " 1 RK in Bangalore for Sale ",
      "2 BHK Flats in Bangalore for Sale ",
      "3 BHK Flats in Bangalore for Sale ",
      "4 BHK Flats in Bangalore for Sale ",
      "5 BHK Flats in Bangalore for Sale ",
      "6 BHK Flats in Bangalore for Sale ",
      " Studio Apartment in Bangalore for Sale ",
    ],
  },
];

export const propertyTypesDetails = [
  {
    listingType: "Buy",
    buildingTypes: [
      {
        buildingType: "Residential",
        propertyTypes: [
          "Apartment",
          "Builder Floor",
          "Pent House",
          "Studio Flat",
          "Serviced Apartment",
          "Residential Building",
          "PG Building",
          "Independent House/Bungalow",
          "Villa",
          "Row House",
          "Farm House",
          "Farm Plot/Land",
          "Residential Plot/Land,",
        ],
      },
      {
        buildingType: "Commercial",
        propertyTypes: [
          "Office Space",
          "Office Space In IT Park/SEZ",
          "Commercial Building",
          "Retail Shop/Showroom",
          "Guest House/Banquet Hall",
          "Hotel/Resorts",
          "Shopping Mall",
          "Preleased Properties",
          "Estate/Plantation",
          "Commercial Plot/Land",
        ],
      },
      {
        buildingType: "Industrial",
        propertyTypes: [
          "Shed/Factory",
          "Warehouse/Godown",
          "Industrial Building",
          "Industrial Plot/Land",
        ],
      },
    ],
  },
  {
    listingType: "Rent",
    buildingTypes: [
      {
        buildingType: "Residential",
        propertyTypes: [
          "Apartment",
          "Builder Floor",
          "Pent House",
          "Studio Flat",
          "Serviced Apartment",
          "Residential Building",
          "PG Building",
          "PG/Co-Living",
          "Independent House/Bungalow",
          "Villa",
          "Row House",
          "Farm House",
        ],
      },
      {
        buildingType: "Commercial",
        propertyTypes: [
          "Co-Working Space",
          "Office Space",
          "Office Space In IT Park/SEZ",
          "Commercial Building",
          "Retail Shop/Showroom",
          "Guest House/Banquet Hall",
          "Hotel/Resorts",
          "Shopping Mall",
          "Rooftop",
          "Commercial Plot/Land",
        ],
      },
      {
        buildingType: "Industrial",
        propertyTypes: [
          "Shed/Factory",
          "Warehouse/Godown",
          "Industrial Building",
          "Industrial Plot/Land",
        ],
      },
    ],
  },
  // {
  //   buildingType: "Lease",
  //   propertyType: [
  //     {
  //       propertyTypeName: "Residential",
  //       subPropertyType: [
  //         "Apartment",
  //         "Builder Floor",
  //         "Pent House",
  //         "Studio Flat",
  //         "Serviced Apartment",
  //         "Residential Building",
  //         "PG Building",
  //         "Independent House/Bungalow",
  //         "Villa",
  //         "Row House",
  //         "Farm House",
  //         "Farm Plot/Land",
  //         "Residential Plot/Land,"
  //       ],
  //     },
  //     {
  //       propertyTypeName: "Commercial",
  //       subPropertyType: [
  //         "Office Space",
  //         "Office Space In IT Park/SEZ",
  //         "Commercial Building",
  //         "Retail Shop/Showroom",
  //         "Guest House/Banquet Hall",
  //         "Hotel/Resorts",
  //         "Shopping Mall",
  //         "Preleased Properties",
  //         "Estate/Plantation",
  //         "Commercial Plot/Land",
  //       ],
  //     },
  //     {
  //       propertyTypeName: "Industrial",
  //       subPropertyType: [
  //         "Shed/Factory",
  //         "Warehouse/Godown",
  //         "Industrial Building",
  //         "Industrial Plot/Land",
  //       ],
  //     }

  //   ]
  // }
];

export const bhkList = [
  "studio",
  "1 RK",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "4.5",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];

// below the two export is for the PackageAdd & PackageUpdate & LeadList component used
//defining packagesForOptions
export const UsersRolesList = ["Owner", "Agent", "Developer", "Associate"];

export const AddUserRoleList = [
  "Admin",
  "Team Leader",
  "Associate",
  "Blog Moderator",
  "Blog Author",
  "Agent",
  "Channel Partner",
  "Telecaller",
  "Operator",
];

//defining listingTypeOptions
export const listingTypeOptions = ["Sale", "Rent"];

// below the export is used for UserAdd & UserUpdate Component
export const userRoles = ["Admin", "Telecaller", "Team Leader", "Associate"];

// below the export is used for LeadModal component
export const countryCodeList = [
  { country: "Afghanistan", code: "93", iso: "AF" },
  { country: "Albania", code: "355", iso: "AL" },
  { country: "Algeria", code: "213", iso: "DZ" },
  { country: "American Samoa", code: "1-684", iso: "AS" },
  { country: "Andorra", code: "376", iso: "AD" },
  { country: "Angola", code: "244", iso: "AO" },
  { country: "Anguilla", code: "1-264", iso: "AI" },
  { country: "Antarctica", code: "672", iso: "AQ" },
  { country: "Antigua and Barbuda", code: "1-268", iso: "AG" },
  { country: "Argentina", code: "54", iso: "AR" },
  { country: "Armenia", code: "374", iso: "AM" },
  { country: "Aruba", code: "297", iso: "AW" },
  { country: "Australia", code: "61", iso: "AU" },
  { country: "Austria", code: "43", iso: "AT" },
  { country: "Azerbaijan", code: "994", iso: "AZ" },
  { country: "Bahamas", code: "1-242", iso: "BS" },
  { country: "Bahrain", code: "973", iso: "BH" },
  { country: "Bangladesh", code: "880", iso: "BD" },
  { country: "Barbados", code: "1-246", iso: "BB" },
  { country: "Belarus", code: "375", iso: "BY" },
  { country: "Belgium", code: "32", iso: "BE" },
  { country: "Belize", code: "501", iso: "BZ" },
  { country: "Benin", code: "229", iso: "BJ" },
  { country: "Bermuda", code: "1-441", iso: "BM" },
  { country: "Bhutan", code: "975", iso: "BT" },
  { country: "Bolivia", code: "591", iso: "BO" },
  { country: "Bosnia and Herzegovina", code: "387", iso: "BA" },
  { country: "Botswana", code: "267", iso: "BW" },
  { country: "Brazil", code: "55", iso: "BR" },
  { country: "British Indian Ocean Territory", code: "246", iso: "IO" },
  { country: "British Virgin Islands", code: "1-284", iso: "VG" },
  { country: "Brunei", code: "673", iso: "BN" },
  { country: "Bulgaria", code: "359", iso: "BG" },
  { country: "Burkina Faso", code: "226", iso: "BF" },
  { country: "Burundi", code: "257", iso: "BI" },
  { country: "Cambodia", code: "855", iso: "KH" },
  { country: "Cameroon", code: "237", iso: "CM" },
  { country: "Canada", code: "1", iso: "CA" },
  { country: "Cape Verde", code: "238", iso: "CV" },
  { country: "Cayman Islands", code: "1-345", iso: "KY" },
  { country: "Central African Republic", code: "236", iso: "CF" },
  { country: "Chad", code: "235", iso: "TD" },
  { country: "Chile", code: "56", iso: "CL" },
  { country: "China", code: "86", iso: "CN" },
  { country: "Christmas Island", code: "61", iso: "CX" },
  { country: "Cocos Islands", code: "61", iso: "CC" },
  { country: "Colombia", code: "57", iso: "CO" },
  { country: "Comoros", code: "269", iso: "KM" },
  { country: "Cook Islands", code: "682", iso: "CK" },
  { country: "Costa Rica", code: "506", iso: "CR" },
  { country: "Croatia", code: "385", iso: "HR" },
  { country: "Cuba", code: "53", iso: "CU" },
  { country: "Curacao", code: "599", iso: "CW" },
  { country: "Cyprus", code: "357", iso: "CY" },
  { country: "Czech Republic", code: "420", iso: "CZ" },
  { country: "Democratic Republic of the Congo", code: "243", iso: "CD" },
  { country: "Denmark", code: "45", iso: "DK" },
  { country: "Djibouti", code: "253", iso: "DJ" },
  { country: "Dominica", code: "1-767", iso: "DM" },
  { country: "Dominican Republic", code: "1-809, 1-829, 1-849", iso: "DO" },
  { country: "East Timor", code: "670", iso: "TL" },
  { country: "Ecuador", code: "593", iso: "EC" },
  { country: "Egypt", code: "20", iso: "EG" },
  { country: "El Salvador", code: "503", iso: "SV" },
  { country: "Equatorial Guinea", code: "240", iso: "GQ" },
  { country: "Eritrea", code: "291", iso: "ER" },
  { country: "Estonia", code: "372", iso: "EE" },
  { country: "Ethiopia", code: "251", iso: "ET" },
  { country: "Falkland Islands", code: "500", iso: "FK" },
  { country: "Faroe Islands", code: "298", iso: "FO" },
  { country: "Fiji", code: "679", iso: "FJ" },
  { country: "Finland", code: "358", iso: "FI" },
  { country: "France", code: "33", iso: "FR" },
  { country: "French Polynesia", code: "689", iso: "PF" },
  { country: "Gabon", code: "241", iso: "GA" },
  { country: "Gambia", code: "220", iso: "GM" },
  { country: "Georgia", code: "995", iso: "GE" },
  { country: "Germany", code: "49", iso: "DE" },
  { country: "Ghana", code: "233", iso: "GH" },
  { country: "Gibraltar", code: "350", iso: "GI" },
  { country: "Greece", code: "30", iso: "GR" },
  { country: "Greenland", code: "299", iso: "GL" },
  { country: "Grenada", code: "1-473", iso: "GD" },
  { country: "Guam", code: "1-671", iso: "GU" },
  { country: "Guatemala", code: "502", iso: "GT" },
  { country: "Guernsey", code: "44-1481", iso: "GG" },
  { country: "Guinea", code: "224", iso: "GN" },
  { country: "Guinea-Bissau", code: "245", iso: "GW" },
  { country: "Guyana", code: "592", iso: "GY" },
  { country: "Haiti", code: "509", iso: "HT" },
  { country: "Honduras", code: "504", iso: "HN" },
  { country: "Hong Kong", code: "852", iso: "HK" },
  { country: "Hungary", code: "36", iso: "HU" },
  { country: "Iceland", code: "354", iso: "IS" },
  { country: "India", code: "91", iso: "IN" },
  { country: "Indonesia", code: "62", iso: "ID" },
  { country: "Iran", code: "98", iso: "IR" },
  { country: "Iraq", code: "964", iso: "IQ" },
  { country: "Ireland", code: "353", iso: "IE" },
  { country: "Isle of Man", code: "44-1624", iso: "IM" },
  { country: "Israel", code: "972", iso: "IL" },
  { country: "Italy", code: "39", iso: "IT" },
  { country: "Ivory Coast", code: "225", iso: "CI" },
  { country: "Jamaica", code: "1-876", iso: "JM" },
  { country: "Japan", code: "81", iso: "JP" },
  { country: "Jersey", code: "44-1534", iso: "JE" },
  { country: "Jordan", code: "962", iso: "JO" },
  { country: "Kazakhstan", code: "7", iso: "KZ" },
  { country: "Kenya", code: "254", iso: "KE" },
  { country: "Kiribati", code: "686", iso: "KI" },
  { country: "Kosovo", code: "383", iso: "XK" },
  { country: "Kuwait", code: "965", iso: "KW" },
  { country: "Kyrgyzstan", code: "996", iso: "KG" },
  { country: "Laos", code: "856", iso: "LA" },
  { country: "Latvia", code: "371", iso: "LV" },
  { country: "Lebanon", code: "961", iso: "LB" },
  { country: "Lesotho", code: "266", iso: "LS" },
  { country: "Liberia", code: "231", iso: "LR" },
  { country: "Libya", code: "218", iso: "LY" },
  { country: "Liechtenstein", code: "423", iso: "LI" },
  { country: "Lithuania", code: "370", iso: "LT" },
  { country: "Luxembourg", code: "352", iso: "LU" },
  { country: "Macao", code: "853", iso: "MO" },
  { country: "Macedonia", code: "389", iso: "MK" },
  { country: "Madagascar", code: "261", iso: "MG" },
  { country: "Malawi", code: "265", iso: "MW" },
  { country: "Malaysia", code: "60", iso: "MY" },
  { country: "Maldives", code: "960", iso: "MV" },
  { country: "Mali", code: "223", iso: "ML" },
  { country: "Malta", code: "356", iso: "MT" },
  { country: "Marshall Islands", code: "692", iso: "MH" },
  { country: "Mauritania", code: "222", iso: "MR" },
  { country: "Mauritius", code: "230", iso: "MU" },
  { country: "Mayotte", code: "262", iso: "YT" },
  { country: "Mexico", code: "52", iso: "MX" },
  { country: "Micronesia", code: "691", iso: "FM" },
  { country: "Moldova", code: "373", iso: "MD" },
  { country: "Monaco", code: "377", iso: "MC" },
  { country: "Mongolia", code: "976", iso: "MN" },
  { country: "Montenegro", code: "382", iso: "ME" },
  { country: "Montserrat", code: "1-664", iso: "MS" },
  { country: "Morocco", code: "212", iso: "MA" },
  { country: "Mozambique", code: "258", iso: "MZ" },
  { country: "Myanmar", code: "95", iso: "MM" },
  { country: "Namibia", code: "264", iso: "NA" },
  { country: "Nauru", code: "674", iso: "NR" },
  { country: "Nepal", code: "977", iso: "NP" },
  { country: "Netherlands", code: "31", iso: "NL" },
  { country: "Netherlands Antilles", code: "599", iso: "AN" },
  { country: "New Caledonia", code: "687", iso: "NC" },
  { country: "New Zealand", code: "64", iso: "NZ" },
  { country: "Nicaragua", code: "505", iso: "NI" },
  { country: "Niger", code: "227", iso: "NE" },
  { country: "Nigeria", code: "234", iso: "NG" },
  { country: "Niue", code: "683", iso: "NU" },
  { country: "North Korea", code: "850", iso: "KP" },
  { country: "Northern Mariana Islands", code: "1-670", iso: "MP" },
  { country: "Norway", code: "47", iso: "NO" },
  { country: "Oman", code: "968", iso: "OM" },
  { country: "Pakistan", code: "92", iso: "PK" },
  { country: "Palau", code: "680", iso: "PW" },
  { country: "Palestine", code: "970", iso: "PS" },
  { country: "Panama", code: "507", iso: "PA" },
  { country: "Papua New Guinea", code: "675", iso: "PG" },
  { country: "Paraguay", code: "595", iso: "PY" },
  { country: "Peru", code: "51", iso: "PE" },
  { country: "Philippines", code: "63", iso: "PH" },
  { country: "Pitcairn", code: "64", iso: "PN" },
  { country: "Poland", code: "48", iso: "PL" },
  { country: "Portugal", code: "351", iso: "PT" },
  { country: "Puerto Rico", code: "1-787, 1-939", iso: "PR" },
  { country: "Qatar", code: "974", iso: "QA" },
  { country: "Republic of the Congo", code: "242", iso: "CG" },
  { country: "Reunion", code: "262", iso: "RE" },
  { country: "Romania", code: "40", iso: "RO" },
  { country: "Russia", code: "7", iso: "RU" },
  { country: "Rwanda", code: "250", iso: "RW" },
  { country: "Saint Barthelemy", code: "590", iso: "BL" },
  { country: "Saint Helena", code: "290", iso: "SH" },
  { country: "Saint Kitts and Nevis", code: "1-869", iso: "KN" },
  { country: "Saint Lucia", code: "1-758", iso: "LC" },
  { country: "Saint Martin", code: "590", iso: "MF" },
  { country: "Saint Pierre and Miquelon", code: "508", iso: "PM" },
  { country: "Saint Vincent and the Grenadines", code: "1-784", iso: "VC" },
  { country: "Samoa", code: "685", iso: "WS" },
  { country: "San Marino", code: "378", iso: "SM" },
  { country: "Sao Tome and Principe", code: "239", iso: "ST" },
  { country: "Saudi Arabia", code: "966", iso: "SA" },
  { country: "Senegal", code: "221", iso: "SN" },
  { country: "Serbia", code: "381", iso: "RS" },
  { country: "Seychelles", code: "248", iso: "SC" },
  { country: "Sierra Leone", code: "232", iso: "SL" },
  { country: "Singapore", code: "65", iso: "SG" },
  { country: "Sint Maarten", code: "1-721", iso: "SX" },
  { country: "Slovakia", code: "421", iso: "SK" },
  { country: "Slovenia", code: "386", iso: "SI" },
  { country: "Solomon Islands", code: "677", iso: "SB" },
  { country: "Somalia", code: "252", iso: "SO" },
  { country: "South Africa", code: "27", iso: "ZA" },
  { country: "South Korea", code: "82", iso: "KR" },
  { country: "South Sudan", code: "211", iso: "SS" },
  { country: "Spain", code: "34", iso: "ES" },
  { country: "Sri Lanka", code: "94", iso: "LK" },
  { country: "Sudan", code: "249", iso: "SD" },
  { country: "Suriname", code: "597", iso: "SR" },
  { country: "Svalbard and Jan Mayen", code: "47", iso: "SJ" },
  { country: "Swaziland", code: "268", iso: "SZ" },
  { country: "Sweden", code: "46", iso: "SE" },
  { country: "Switzerland", code: "41", iso: "CH" },
  { country: "Syria", code: "963", iso: "SY" },
  { country: "Taiwan", code: "886", iso: "TW" },
  { country: "Tajikistan", code: "992", iso: "TJ" },
  { country: "Tanzania", code: "255", iso: "TZ" },
  { country: "Thailand", code: "66", iso: "TH" },
  { country: "Togo", code: "228", iso: "TG" },
  { country: "Tokelau", code: "690", iso: "TK" },
  { country: "Tonga", code: "676", iso: "TO" },
  { country: "Trinidad and Tobago", code: "1-868", iso: "TT" },
  { country: "Tunisia", code: "216", iso: "TN" },
  { country: "Turkey", code: "90", iso: "TR" },
  { country: "Turkmenistan", code: "993", iso: "TM" },
  { country: "Turks and Caicos Islands", code: "1-649", iso: "TC" },
  { country: "Tuvalu", code: "688", iso: "TV" },
  { country: "U.S. Virgin Islands", code: "1-340", iso: "VI" },
  { country: "Uganda", code: "256", iso: "UG" },
  { country: "Ukraine", code: "380", iso: "UA" },
  { country: "United Arab Emirates", code: "971", iso: "AE" },
  { country: "United Kingdom", code: "44", iso: "GB" },
  { country: "United States", code: "1", iso: "US" },
  { country: "Uruguay", code: "598", iso: "UY" },
  { country: "Uzbekistan", code: "998", iso: "UZ" },
  { country: "Vanuatu", code: "678", iso: "VU" },
  { country: "Vatican", code: "379", iso: "VA" },
  { country: "Venezuela", code: "58", iso: "VE" },
  { country: "Vietnam", code: "84", iso: "VN" },
  { country: "Wallis and Futuna", code: "681", iso: "WF" },
  { country: "Western Sahara", code: "212", iso: "EH" },
  { country: "Yemen", code: "967", iso: "YE" },
  { country: "Zambia", code: "260", iso: "ZM" },
  { country: "Zimbabwe", code: "263", iso: "ZW" },
];

// below the export used in signUp
export const users = ["Owner", "Agent", "Developer"];

// below the export is used in properties/propertiesList/MyPropertyLists
export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// below the export is used in properties/post-properties/PropertyListingType.js
export const allSaleStepsData1 = {
  selectedCountry: "India",
  selectedState: null,
  selectedDistrict: null,
  positionStatusType: null,
  propertyBrochure: null,
  perSqftPrice: "",
  selectedTaluk: null,
  showFloors: [1],
  showAreas: [1],
  locality: "",
  subLocality: "",
  preleasedUnit: "",
  userPackageId: null,
  typeOfEstate: "",
  seventhFloor: "",
  eightFloor: "",
  ninethFloor: "",
  tenthFloor: "",
  noOfPgBeds: "",
  firstFloor: "",
  groundFloor: "",
  secondFloor: "",
  thirdFloor: "",
  fourthFloor: "",
  fifthFloor: "",
  sixthFloor: "",
  floorsUnit: "BHK",
  pinCode: "",
  both: "",
  propertyAdress: "",
  landMark: "",
  buildingName: "",
  areaType: "",
  builtupArea: "",
  superBuiltupArea: "",
  carpetArea: "",
  salableArea: "",
  areaUnit: null,
  floorNumber: null,
  totalFloor: null,
  flatNumber: "",
  selectPriceInclude: [],
  availableFromDate: "",
  keepItPrivate: "",
  cornerUnit: null,
  occupancyType: "",
  occupancyCertificate: "",
  privateWashRoom: "",
  publicWashRoom: "",
  plotArea: "",
  pantryOrCafeteria: "",
  availableFor: "",
  positionStatus: "",
  positionStatusDate: "",
  description: "",
  availbleFrom: "",
  occupancyDays: "",
  ageofProperty: "",
  owenershipType: "",
  rentAmountFor: "",
  maintenanceAmoutFor: "",
  securityDeposit: "",
  pgSecurityDeposit: "",
  customSecurityDeposit: "",
  pgCustomSecurityDeposit: "",
  bookingAmount: "",
  lockInPeriodFor: "",
  rentIncrementFor: "",
  currentlyLeasedOut: "",
  taxCharges: "",
  modifyInterior: "",
  newInterior: "",
  buildingGrade: "",
  eletricityCharges: "",
  electricityPower: "",
  liftAvailability: "",
  buildingMaterial: "",
  twoWheeler: "",
  pgTwoWheeler: "",
  fourWheeler: "",
  pgFourWheeler: "",
  powerBackUp: "",
  subProperty: null,
  waterSource: "",
  overLookingView: "",
  frontRoadWidth: "",
  propertyListingType: null,
  buildingType: null,
  propertiesType: null,
  furnishingStatus: "",
  typeOfWorkStation: "",
  seatType: "",
  noOfSeats: "",
  amenities: [],
  hospitalDistance: "",
  hospitalDistanceUnit: "Meter",
  metroDistance: "",
  noparking: "",
  airportDistance: "",
  bankDistanceUnit: "Meter",
  airportDistanceUnit: "Meter",
  railwayDistance: "",
  busStopDistance: "",
  railwayDistanceUnit: "Meter",
  atmDistance: "",
  busStopDistanceUnit: "Meter",
  atmDistanceUnit: "Meter",
  schoolDistance: "",
  schoolDistanceUnit: "Meter",
  shoppingMallDistance: "",
  shoppingMallDistanceUnit: "Meter",
  bankDistance: "",
  metroDistanceUnit: "Meter",
  defineLocation: "",
  explainingPrice: "",
  explainingTheProperty: "",
  defineSizeStructure: "",
  flooringType: "",
  livingFlooringType: "",
  kitchenFlooringType: "",
  bedRoomFlooringType: "",
  MasterBedRoomFlooringType: "",
  bathRoomFlooringType: "",
  balconyFlooringType: "",
  otherFlooringType: "",
  noOfLifts: "",
  noOfServiceLifts: "",
  roomType: "",
  noOfBedsinRoom: "",
  facilityOffered: "",
  rentAmount: "",
  pgRentAmount: "",
  saleType: null,
  pgRentType: "",
  maintenanceAmout: "",
  maintananceCostType: "",
  lockInPeriod: "",
  lockInPeriodType: "",
  rentIncrement: "",
  nonVeg: "",
  oppSex: "",
  data: [],
  time: "",
  visitor: "",
  guardian: "",
  drinks: "",
  smoking: "",
  electricPower: "",
  electricPowerUnit: "",
  serviceLiftAvailability: "",
  roadWidth: "",
  roadWidthUnit: "",
  twoWheelerOpenType: null,
  pgTwoWheelerOpenType: null,
  twoWheelerClosedType: null,
  pgTwoWheelerClosedType: null,
  fourWheelerOpenType: null,
  pgFourWheelerOpenType: null,
  fourWheelerClosedType: null,
  pgFourWheelerClosedType: null,
  pantryCafeteria: "",
  interestInCoWorking: "",
  ac: "",
  gas: "",
  beds: "",
  led: "",
  sofa: "",
  tv: "",
  officeTables: "",
  curtains: "",
  chimney: "",
  microWave: "",
  chairs: "",
  stove: "",
  mediclKits: "",
  printingMachine: "",
  smartBoard: "",
  coffieMachine: "",
  projectors: "",
  diningTables: "",
  modularKitchen: "",
  exhaustFan: "",
  confernceRooms: "",
  recreational: "",
  fan: "",
  waterPurifier: "",
  washingMachine: "",
  wardrobe: "",
  refrigerator: "",
  propertyManagedBy: "",
  propertyManagedStaysAtProperty: "",
  widthOfPropertyStatus: "",
  heightSealingOfPropertyStatus: "",
  locationHub: "",
  widthUnitOfPropertyStatus: "",
  heightSealingUnitOfPropertyStatus: "",
  locatedNear: "",
  hotelResortType: "",
  propertySuitableFor: "",
  govtApproved: "",
  tenantPreLeasedUnit: "",
  transactionType: "",
  tenentBachelorsAllowed: "",
  tenentSpinstersAllowed: "",
  religiousType: "",
  workPreference: "",
  petsAllowed: "",
  foodPreference: "",
  privatePoolAvailability: "",
  privateGardenAvailability: "",
  privateGardenArea: "",
  numberOfBedRooms: "",
  numberOfBathRooms: "",
  numberOfBalconies: "",
  additionalRooms: "",
  towerOrBlockNumber: "",
  propertyLevel: "",
  cornerFlat: "",
  facing: "",
  openSides: "",
  terraceArea: "",
  spaceType: "",
  privateWashroomCount: null,
  publicWashroomCount: null,
  compoundWallMade: "",
  terraceAreaFlag: "",
  tenantPreleasedUnit: "",
  lengthInFeet: "",
  breadthInFeet: "",
  numberOfFloorsAllowed: null,
  numberOfRooms: "",
  croppedGalleryImages: [],
  selectedImages: [],
  allImages: [],
  featuredImageUrl: [],
  floorImageUrl: [],
  galleryImageUrl: [],
  croppedFeaturedImage: null,
  videoUrl: "",
  videoLink: "",
  videoPreview: null,
  uploadedVideo: "",
  showUploadButton: false,
  pgFor: "",
  bestSuitedFor: "",
  mealsAvailable: "",
  noticePeriod: "",
  noticePeriodType: "",
  commonAreas: "",
  pgLockInPeriod: "",
  pgLockInPeriodType: "",
  noOfPgBeds: "",
  reraAvailable: "",
  reraNumber: "",
  preleased: "",
  defaultMapLocation: {
    latitude: 12.9038631,
    longitude: 77.5855457,
  },
  itemDataResidential: [
    { name: "Air Conditioner", count: 0 },
    { name: "Beds", count: 0 },
    { name: "LED Light", count: 0 },
    { name: "Gas Connection", count: 0 },
    { name: "Washing Machine", count: 0 },
    { name: "Refrigerator", count: 0 },
    { name: "Sofa", count: 0 },
    { name: "Tv", count: 0 },
    { name: "Wardrobe", count: 0 },
    // { name: "Office Tables", count: 0 },
    { name: "Water Purifier", count: 0 },
    { name: "Fan", count: 0 },
    { name: "Exhaust Fan", count: 0 },
    { name: "Stove", count: 0 },
    { name: "Curtains", count: 0 },
    { name: "Chimney", count: 0 },
    { name: "Micro Wave", count: 0 },
    { name: "Geyser", count: 0 },
    { name: "Wi-Fi", count: 0 },

    // { name: "Meeting Rooms", count: 0 },
    // { name: "Medical Kits", count: 0 },
    // { name: "Conference Rooms", count: 0 },
    // { name: "Recreational Fecilities", count: 0 },
    // { name: "Printing Machine", count: 0 },
    // { name: "Coffie Machine", count: 0 },
    // { name: "Smart Board", count: 0 },
    // { name: "Projectors", count: 0 },
    { name: "Dining Tables", count: 0 },
    // { name: "Modular Kitchen", count: 0 },
    { name: "Modular Kitchen", count: 0 },
  ],

  itemDataIndustrial: [
    { name: "Air Conditioner", count: 0 },
    { name: "Beds", count: 0 },
    { name: "LED Light", count: 0 },
    { name: "Gas Connection", count: 0 },
    { name: "Washing Machine", count: 0 },
    { name: "Refrigerator", count: 0 },
    { name: "Sofa", count: 0 },
    { name: "Tv", count: 0 },
    { name: "Wardrobe", count: 0 },
    { name: "Office Tables", count: 0 },
    { name: "Water Purifier", count: 0 },
    { name: "Fan", count: 0 },
    { name: "Exhaust Fan", count: 0 },
    { name: "Stove", count: 0 },
    { name: "Curtains", count: 0 },
    { name: "Chimney", count: 0 },
    { name: "Micro Wave", count: 0 },
    { name: "Chairs", count: 0 },
    { name: "Medical Kits", count: 0 },
    { name: "Conference Rooms", count: 0 },
    { name: "Recreational Fecilities", count: 0 },
    { name: "Printing Machine", count: 0 },
    { name: "Coffie Machine", count: 0 },
    { name: "Smart Board", count: 0 },
    { name: "Meeting Rooms", count: 0 },
    { name: "Projectors", count: 0 },
    { name: "Dining Tables", count: 0 },
    { name: "Modular Kitchen", count: 0 },
    { name: "Cubical", count: 0 },
    { name: "Linear", count: 0 },
  ],

  itemDataCommercial: [
    { name: "Air Conditioner", count: 0 },
    // { name: "Beds", count: 0 },
    { name: "LED Light", count: 0 },
    // { name: "Gas Connection", count: 0 },
    // { name: "Washing Machine", count: 0 },
    { name: "Refrigerator", count: 0 },
    { name: "Sofa", count: 0 },
    // { name: "Tv", count: 0 },
    { name: "Wardrobe", count: 0 },
    { name: "Office Tables", count: 0 },
    { name: "Water Purifier", count: 0 },
    { name: "Fan", count: 0 },
    { name: "Exhaust Fan", count: 0 },
    { name: "Stove", count: 0 },
    { name: "Curtains", count: 0 },
    { name: "Chimney", count: 0 },
    { name: "Micro Wave", count: 0 },
    { name: "Chairs", count: 0 },
    { name: "Meeting Rooms", count: 0 },
    { name: "Medical Kits", count: 0 },
    { name: "Conference Rooms", count: 0 },
    { name: "Recreational Fecilities", count: 0 },
    { name: "Printing Machine", count: 0 },
    { name: "Coffie Machine", count: 0 },
    { name: "Smart Board", count: 0 },
    { name: "Projectors", count: 0 },
    { name: "Tables", count: 0 },
    { name: "Cubical Workstations", count: 0 },
    { name: "Linear Workstations", count: 0 },
    // { name: "Dining Tables", count: 0 },
    // { name: "Modular Kitchen", count: 0 },
    // { name: "Modular Kitchen", count: 0 },
  ],

  itemData: [
    { name: "Air Conditioner", count: 0 },
    { name: "Beds", count: 0 },
    { name: "LED Light", count: 0 },
    { name: "Gas Connection", count: 0 },
    { name: "Washing Machine", count: 0 },
    { name: "Refrigerator", count: 0 },
    { name: "Sofa", count: 0 },
    { name: "Tv", count: 0 },
    { name: "Wardrobe", count: 0 },
    { name: "Office Tables", count: 0 },
    { name: "Water Purifier", count: 0 },
    { name: "Fan", count: 0 },
    { name: "Exhaust Fan", count: 0 },
    { name: "Stove", count: 0 },
    { name: "Curtains", count: 0 },
    { name: "Chimney", count: 0 },
    { name: "Micro Wave", count: 0 },
    { name: "Meeting Rooms", count: 0 },
    { name: "Medical Kits", count: 0 },
    { name: "Conference Rooms", count: 0 },
    { name: "Recreational Fecilities", count: 0 },
    { name: "Printing Machine", count: 0 },
    { name: "Coffie Machine", count: 0 },
    { name: "Smart Board", count: 0 },
    { name: "Projectors", count: 0 },
    { name: "Dining Tables", count: 0 },
    { name: "Modular Kitchen", count: 0 },
    { name: "Chairs", count: 0 },
  ],
  runLocation: true,
  verifyPackageByLocation: false,
};

// below the export is used in properties/post-properties/PropertyListingType.js
export const allRentalAndLeaseStepsData1 = {
  selectedCountry: "India",
  selectedState: null,
  selectedDistrict: null,
  positionStatusType: null,
  selectedTaluk: null,
  locality: "",
  showFloors: [1],
  showAreas: [1],
  setsubLocality: "",
  userPackageId: "",
  pinCode: "",
  propertyAdress: "",
  seventhFloor: "",
  eightFloor: "",
  ninethFloor: "",
  tenthFloor: "",
  noOfPgBeds: "",
  firstFloor: "",
  groundFloor: "",
  secondFloor: "",
  thirdFloor: "",
  fourthFloor: "",
  availableFromDate: "",
  fifthFloor: "",
  sixthFloor: "",
  floorsUnit: "BHK",
  landMark: "",
  buildingName: "",
  plotArea: "",
  areaType: "",
  builtupArea: "",
  superBuiltupArea: "",
  brokerage: "",
  brokerageUnit: "",
  brokeragedata: "",
  carpetArea: "",
  salableArea: "",
  areaUnit: null,
  floorNumber: null,
  totalFloor: null,
  flatNumber: "",
  keepItPrivate: "",
  cornerUnit: null,
  both: "",
  occupancyType: "",
  occupancyCertificate: "",
  privateWashRoom: "",
  publicWashRoom: "",
  pantryOrCafeteria: "",
  availableFor: "",
  positionStatus: "",
  positionStatusDate: "",
  availbleFrom: "",
  occupancyDays: "",
  ageofProperty: "",
  owenershipType: "",
  rentAmountFor: "",
  maintenanceAmoutFor: "",
  securityDeposit: "",
  pgSecurityDeposit: "",
  customSecurityDeposit: "",
  pgCustomSecurityDeposit: "",
  bookingAmount: "",
  lockInPeriodFor: "",
  rentIncrementFor: "",
  currentlyLeasedOut: "",
  taxCharges: "",
  modifyInterior: "",
  newInterior: "",
  buildingGrade: "",
  eletricityCharges: "",
  electricityPower: "",
  liftAvailability: "",
  buildingMaterial: "",
  twoWheeler: "",
  pgTwoWheeler: "",
  fourWheeler: "",
  pgFourWheeler: "",
  powerBackUp: "",
  waterSource: "",
  overLookingView: "",
  frontRoadWidth: "",
  propertyListingType: "",
  buildingType: "",
  propertiesType: "",
  furnishingStatus: "",
  typeOfWorkStation: "",
  seatType: "",
  noOfSeats: "",
  amenities: [],
  hospitalDistance: "",
  hospitalDistanceUnit: "Meter",
  metroDistance: "",
  airportDistance: "",
  bankDistanceUnit: "Meter",
  airportDistanceUnit: "Meter",
  railwayDistance: "",
  busStopDistance: "",
  railwayDistanceUnit: "Meter",
  atmDistance: "",
  busStopDistanceUnit: "Meter",
  atmDistanceUnit: "Meter",
  schoolDistance: "",
  schoolDistanceUnit: "Meter",
  shoppingMallDistance: "",
  shoppingMallDistanceUnit: "Meter",
  bankDistance: "",
  metroDistanceUnit: "Meter",
  defineLocation: "",
  explainingPrice: "",
  explainingTheProperty: "",
  defineSizeStructure: "",
  flooringType: "",
  livingFlooringType: "",
  kitchenFlooringType: "",
  bedRoomFlooringType: "",
  MasterBedRoomFlooringType: "",
  bathRoomFlooringType: "",
  balconyFlooringType: "",
  otherFlooringType: "",
  noOfLifts: "",
  noOfServiceLifts: "",
  roomType: "",
  noOfBedsinRoom: "",
  facilityOffered: "",
  rentAmount: "",
  pgRentAmount: "",
  rentType: "",
  pgRentType: "",
  maintenanceAmout: "",
  maintananceCostType: "",
  lockInPeriod: "",
  lockInPeriodType: "",
  rentIncrement: "",
  nonVeg: "",
  oppSex: "",
  data: [],
  time: "",
  visitor: "",
  guardian: "",
  drinks: "",
  smoking: "",
  electricPower: "",
  electricPowerUnit: "",
  serviceLiftAvailability: "",
  roadWidth: "",
  roadWidthUnit: "",
  twoWheelerOpenType: null,
  pgTwoWheelerOpenType: null,
  twoWheelerClosedType: null,
  pgTwoWheelerClosedType: null,
  fourWheelerOpenType: null,
  pgFourWheelerOpenType: null,
  fourWheelerClosedType: null,
  pgFourWheelerClosedType: null,
  pantryCafeteria: "",
  interestInCoWorking: "",
  ac: "",
  gas: "",
  beds: "",
  led: "",
  sofa: "",
  tv: "",
  officeTables: "",
  curtains: "",
  chimney: "",
  microWave: "",
  chairs: "",
  stove: "",
  mediclKits: "",
  printingMachine: "",
  smartBoard: "",
  coffieMachine: "",
  projectors: "",
  diningTables: "",
  modularKitchen: "",
  exhaustFan: "",
  confernceRooms: "",
  recreational: "",
  fan: "",
  waterPurifier: "",
  washingMachine: "",
  wardrobe: "",
  refrigerator: "",
  propertyManagedBy: "",
  propertyManagedStaysAtProperty: "",
  widthOfPropertyStatus: "",
  heightSealingOfPropertyStatus: "",
  locationHub: "",
  widthUnitOfPropertyStatus: "",
  heightSealingUnitOfPropertyStatus: "",
  locatedNear: "",
  hotelResortType: "",
  propertySuitableFor: "",
  govtApproved: "",
  tenantPreLeasedUnit: "",
  tenetType: "",
  tenentBachelorsAllowed: "",
  tenentSpinstersAllowed: "",
  religiousType: "",
  workPreference: "",
  petsAllowed: "",
  foodPreference: "",
  privatePoolAvailability: "",
  privateGardenAvailability: "",
  privateGardenArea: "",
  numberOfBedRooms: "",
  numberOfBathRooms: null,
  numberOfBalconies: null,
  additionalRooms: null,
  towerOrBlockNumber: "",
  propertyLevel: "",
  cornerFlat: "",
  facing: "",
  openSides: "",
  terraceArea: "",
  spaceType: "",
  privateWashroomCount: null,
  publicWashroomCount: null,
  compoundWallMade: "",
  terraceAreaFlag: "",
  lengthInFeet: "",
  breadthInFeet: "",
  numberOfFloorsAllowed: null,
  numberOfRooms: "",
  croppedGalleryImages: [],
  selectedImages: [],
  allImages: [],
  featuredImageUrl: [],
  galleryImageUrl: [],
  croppedFeaturedImage: null,
  videoUrl: "",
  videoLink: "",
  abtproperty: [],
  abtproperty1: [],
  adservices: [],
  videoPreview: null,
  uploadedVideo: "",
  showUploadButton: false,
  pgFor: "",
  bestSuitedFor: "",
  mealsAvailable: "",
  noticePeriod: "",
  noticePeriodType: "",
  commonAreas: "",
  pgLockInPeriod: "",
  pgLockInPeriodType: "",
  noOfPgBeds: "",
  reraAvailable: "",
  reraNumber: "",
  defaultMapLocation: {
    latitude: 12.9038631,
    longitude: 77.5855457,
  },
  itemDataResidential: [
    { name: "Air Conditioner", count: 0 },
    { name: "Beds", count: 0 },
    { name: "LED Light", count: 0 },
    { name: "Gas Connection", count: 0 },
    { name: "Washing Machine", count: 0 },
    { name: "Refrigerator", count: 0 },
    { name: "Sofa", count: 0 },
    { name: "Tv", count: 0 },
    { name: "Wardrobe", count: 0 },
    // { name: "Office Tables", count: 0 },
    { name: "Water Purifier", count: 0 },
    { name: "Fan", count: 0 },
    { name: "Exhaust Fan", count: 0 },
    { name: "Stove", count: 0 },
    { name: "Curtains", count: 0 },
    { name: "Chimney", count: 0 },
    { name: "Micro Wave", count: 0 },
    { name: "Geyser", count: 0 },
    { name: "Wi-Fi", count: 0 },

    // { name: "Meeting Rooms", count: 0 },
    // { name: "Medical Kits", count: 0 },
    // { name: "Conference Rooms", count: 0 },
    // { name: "Recreational Fecilities", count: 0 },
    // { name: "Printing Machine", count: 0 },
    // { name: "Coffie Machine", count: 0 },
    // { name: "Smart Board", count: 0 },
    // { name: "Projectors", count: 0 },
    { name: "Dining Tables", count: 0 },
    // { name: "Modular Kitchen", count: 0 },
    { name: "Modular Kitchen", count: 0 },
  ],

  itemDataIndustrial: [
    { name: "Air Conditioner", count: 0 },
    { name: "Beds", count: 0 },
    { name: "LED Light", count: 0 },
    { name: "Gas Connection", count: 0 },
    { name: "Washing Machine", count: 0 },
    { name: "Refrigerator", count: 0 },
    { name: "Sofa", count: 0 },
    { name: "Tv", count: 0 },
    { name: "Wardrobe", count: 0 },
    // { name: "Office Tables", count: 0 },
    { name: "Water Purifier", count: 0 },
    { name: "Fan", count: 0 },
    { name: "Exhaust Fan", count: 0 },
    { name: "Stove", count: 0 },
    { name: "Curtains", count: 0 },
    { name: "Chimney", count: 0 },
    { name: "Micro Wave", count: 0 },
    // { name: "Meeting Rooms", count: 0 },
    // { name: "Medical Kits", count: 0 },
    // { name: "Conference Rooms", count: 0 },
    // { name: "Recreational Fecilities", count: 0 },
    // { name: "Printing Machine", count: 0 },
    // { name: "Coffie Machine", count: 0 },
    // { name: "Smart Board", count: 0 },
    // { name: "Projectors", count: 0 },
    { name: "Dining Tables", count: 0 },
    { name: "Modular Kitchen", count: 0 },
    { name: "Greyser", count: 0 },
    { name: "Wifi", count: 0 },
  ],

  itemDataCommercial: [
    { name: "Air Conditioner", count: 0 },
    // { name: "Beds", count: 0 },
    { name: "LED Light", count: 0 },
    // { name: "Gas Connection", count: 0 },
    // { name: "Washing Machine", count: 0 },
    { name: "Refrigerator", count: 0 },
    { name: "Sofa", count: 0 },
    // { name: "Tv", count: 0 },
    { name: "Wardrobe", count: 0 },
    { name: "Office Tables", count: 0 },
    { name: "Water Purifier", count: 0 },
    { name: "Fan", count: 0 },
    { name: "Exhaust Fan", count: 0 },
    { name: "Stove", count: 0 },
    { name: "Curtains", count: 0 },
    { name: "Chimney", count: 0 },
    { name: "Micro Wave", count: 0 },
    { name: "Meeting Rooms", count: 0 },
    { name: "Medical Kits", count: 0 },
    { name: "Conference Rooms", count: 0 },
    { name: "Recreational Fecilities", count: 0 },
    { name: "Printing Machine", count: 0 },
    { name: "Coffie Machine", count: 0 },
    { name: "Smart Board", count: 0 },
    { name: "Projectors", count: 0 },
    { name: "Chairs", count: 0 },
    { name: "Tables", count: 0 },
    { name: "Cubical", count: 0 },
    { name: "Linear", count: 0 },
    // { name: "Dining Tables", count: 0 },
    // { name: "Modular Kitchen", count: 0 },
    // { name: "Modular Kitchen", count: 0 },
  ],

  itemData: [
    { name: "Air Conditioner", count: 0 },
    // { name: "Beds", count: 0 },
    { name: "LED Light", count: 0 },
    { name: "Gas Connection", count: 0 },
    { name: "Washing Machine", count: 0 },
    { name: "Refrigerator", count: 0 },
    { name: "Sofa", count: 0 },
    { name: "Tv", count: 0 },
    { name: "Wardrobe", count: 0 },
    { name: "Office Tables", count: 0 },
    { name: "Water Purifier", count: 0 },
    { name: "Fan", count: 0 },
    { name: "Exhaust Fan", count: 0 },
    { name: "Stove", count: 0 },
    { name: "Curtains", count: 0 },
    { name: "Chimney", count: 0 },
    { name: "Micro Wave", count: 0 },
    { name: "Chairs", count: 0 },
    { name: "Medical Kits", count: 0 },
    { name: "Conference Rooms", count: 0 },
    { name: "Recreational Fecilities", count: 0 },
    { name: "Meeting Rooms", count: 0 },
    { name: "Printing Machine", count: 0 },
    { name: "Coffie Machine", count: 0 },
    { name: "Smart Board", count: 0 },
    { name: "Projectors", count: 0 },
    { name: "Dining Tables", count: 0 },
    { name: "Modular Kitchen", count: 0 },
  ],

  runLocation: true,
  verifyPackageByLocation: false,
};

// below the export is used in properties/post-properties/post-sale-property/AddSaleProperty.js
export const saleUpdatedSteps = [
  { label: "Property Listing", value: 0, isvisible: true },
  { label: "Sub-property Type", value: 1, isvisible: true },
  { label: "Location", value: 2, isvisible: true },
  { label: "Area Details", value: 3, isvisible: true },
  { label: "Property Details", value: 4, isvisible: true },
  { label: "ROI/Tenant Details", value: 5, isvisible: true },
  { label: "Property Price", value: 6, isvisible: true },
  { label: "Additional Details", value: 7, isvisible: true },
  // { label: "RERA Status", value: 8, isvisible: true },
  { label: "Furnishing Status", value: 8, isvisible: true },
  { label: "Amenities", value: 9, isvisible: true },
  { label: "Land Mark", value: 10, isvisible: true },
  { label: "Define Your Property", value: 11, isvisible: true },
  { label: "Image Gallery", value: 12, isvisible: true },
  { label: "Brokerage Details", value: 13, isvisible: true },
];

// below the export is used in properties/post-properties/post-sale-property/post-property-steps/AdditionalDetail.js for sale and rent also
export const facingList = [
  "East",
  "West",
  "North",
  "South",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
];

export const flooringTypeList = [
  "Vetrified",
  "Marble",
  "Ceramic",
  "Mosaie",
  "Wooden",
  "Granite",
  "Marbonite",
  "Other",
];

export const yesOrNo = ["Yes", "No"];

export const backup = ["None", "Partially", "100%"];
export const pantry = ["Dry", "Wet", "None"];

export const roomtype = [
  "Private Room",
  "Double Sharing",
  " Triple Sharing",
  "3+ Sharing",
];
export const watersource = [
  "None",
  "Borewell",
  "Muncipal Corparation",
  "Both",
  "Other",
];
export const noOfBedsInRooms = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];
export const overlookingview = [
  "Beach View",
  "Garden View",
  "Golf View",
  "Lake View",
  "Park View",
  "Road View",
  "Community View",
  "Creek View",
  "Sea View",
];

export const facilityoffers = [
  "Personal Cupboard",
  "Table Chair",
  "TV in Room",
  "Attached Balcony",
  "Attached Bathroom",
  "Meal Includes",
  "AC",
];
export const buildinggrade = ["Not Applicable", "A+", "A", "B", "C"];

// below the export used in amenities component

export const amenityList = [
  "Gymnasium",
  "Swimming Pool",
  "Badminton Court(s)",
  "Tennis Court(s)",
  "Squash Court",
  "Kid's Play Areas",
  "Jogging / Cycle Track",
  "Power Backup",
  "Central AC",
  "Central Wi-Fi",
  "Attached Market",
  "Restaurant",
  "Home Automation",
  "24 x 7 Security",
  "Clubhouse",
  "Balcony",
  "High Speed Elevators",
  "Pre - School",
  "Medical Facility",
  "Pet Area",
  "Indoor Games",
  "Conference Room",
  "Large Green Area",
  "Concierge Desk",
  "Helipad",
  "Golf Course",
  "Multiplex",
  "Visitor's Parking",
  "Serviced Apartments",
  "Service Elevators",
  "High Street Retail",
  "Hypermarket",
  "ATM's",
  "Food Court",
  "Servant Quarter",
  "Study Room",
  "Private Pool",
  "Private Gym",
  "Private Jacuzzi",
  "View of Water",
  "View of Landmark",
  "Built-in Wardrobes",
  "Walk-in Closet",
  "Lobby in Building",
  "Barbeque Area",
  "Double Glazed Windows",
  "Centrally Air - Conditioned",
  "Central Heating",
  "Electricity Backup",
  "Waste Disposal",
  "First Aid Medical Center",
  "Tiles",
  "Broadband Internet",
  "Satellite / Cable TV",
  "Conference Room ",
  "Intercom",
  "Jacuzzi ",
  "Kids Play Area ",
  "Reception / Waiting Room",
  "Room Maintenance Staff",
  "Sauna",
  "Security Staff",
  "CCTV Security",
  "Laundry Facility ",
  "Cleaning Services",
  "Facilities for Disabled",
  "24 Hours Concierge ",
  "Balcony or Terrace",
];

// below the export used in areaDetail component
export const units = [
  "sq.ft",
  "sq.yd",
  "sq.mt",
  "Acre",
  "Bigha",
  "Marla",
  "Kanal",
  "Biswa1",
  "Biswa2",
  "Ground",
  "Aankadam",
  "Rood",
  "Chatak",
  "Kottah",
  "Maria",
  "Cent",
  "Perch",
  "Guntha",
  "Are",
  "Katha",
  "Gaj",
  "Killa",
];

export const spaceTypeOptions = ["Open", "Covered"];
export const occupType = ["Vacant", "Tenant", "Owner"];
export const occuType2 = ["Vacant", "Constructed", "Shed"];
export const numberOfBedroomOptions = [
  "Studio",
  "1 RK",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "4.5",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "10+",
];
export const numberOfBedroomStudio = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "10+",
];
export const numberOfBathRoomOptions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "10+",
];
export const numberOfBathRoomOptionsStudio = ["0", "1"];
export const numberOfBalconiesOptions = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "10+",
];
export const numberOfBalconiesOptionsStudio = ["1", "2"];
export const additionalRoomSOptions = [
  "None",
  "Prayer Room",
  "Pooja Room",
  "Servant Room",
  "Store Room",
  // "Study/Library Room",
  // "Dinning Hall",
  // "Kitchen",
  "Extra Room",
];
export const additionalRoomSOptions1 = [
  "None",
  "Prayer Room",
  "Pooja Room",
  "Servent Room",
  "Store Room",
  "Study/Library Room",
  "Dinning Hall",
  "Kitchen",
  "Extra Room",
];
export const pgForOptions = ["Girls", "Boys"];
export const bestSuitedForOptions = ["Students", "Professionals"];
export const propertyLevelOptions = [
  "Single Level",
  "Duplex Level",
  "Triplex Level",
];
export const commonAreaOptions = [
  "Living Room",
  "Kitchen",
  "Dinning Hall",
  "Study Room/Library",
  "Breakout Room",
];
export const openSidesOptions = ["None", "1", "2", "3", "4"];

// below the export used in defineYourProperty component

export const definelocation = [
  "Schools in Vicinity",
  "Adjoining Metro Station",
  "Peacefull Vicinity",
  "Wide Road",
  "Near City",
  "Safe & Secure Locality",
];
export const explainingprice = [
  " Breakthrough Price ",
  " Quick Deal ",
  "Investment Opportunity",
  "Affordable",
];
export const explainingtheproperty = [
  " Reputed Developer ",
  " Well Ventilated ",
  "Fully Renovated ",
  " Vastu Complaint ",
  " Spacious",
  " Ample Parking",
  " Free Hold",
  " Gated Society",
  "NRI Owner",
];
export const definesizestructure = [
  " Tasteful Interiors",
  "Prime Location",
  "Luxury Lifestyle",
  "Well Maintained",
  "Plenty of Sunlight",
  "Newly Built",
];

// below the export used in furnishingstatus component

export const seattype = ["Open Seat", "Private Cabin", " Conference Cabin"];
export const officeSpaceUnfurnished = ["Semi Fitted", "Fitted Space"];
export const officeSpace = [" Shell & Core"];
export const manage = ["Non Managed", "Fully Managed"];

export const furnish = ["Unfurnished", "Semi Furnished", "Fully Furnished"];

export const servicesRent = [
  // "Mall",
  // "Commercial Project",
  // "Residential Project",
  // "Retail/Commercial Building",
  // "Market/High Street",
  // "Others",
  "Laundry",
  "House Keeping",
  "Internet/Wifi Connectivity",
  "CCTV",
  "Gated Community",
  "Security",
  "Biometric",
];

export const servicesSale = [
  "Mall",
  "Commercial Project",
  "Residential Project",
  "Retail/Commercial Building",
  "Market/High Street",
  "Others",
];

// below the export used in landmark component

export const securitydeposit = [
  "Zero Deposit",
  "1 Month",
  "2 Month",
  "3 Month",
  "Custom",
];

export const suitableForOptions = [
  "Restuarants",
  "Cafe",
  "Pub",
  "Bar",
  "Other",
];
export const locatednearme = ["Enterance", "Elevator", "Staircase"];

export const abouttheproperty = [
  "Jewellary",
  "Gym",
  "Grossary",
  "Clinic",
  "Salon/Spa",
  "Footwear",
  "Electronic",
  "Clothes",
  "Restuarants",
  "Cafe",
  "Pub/Bar",
  "Vehicle-Car/Bike",
  "Heavy/Commercial Vehicles",
  "Meat",
  "Stationary",
  "Mobile",
  "Medical",
  "Fast Food",
  "Atm",
  "Juice",
  "Sweet",
  "Bakery",
  "Boutique",
  "Tea Stall",
  "Dental Clinic",
  "Cloud Kitchen",
  "Others",
];

export const locationHubOptions = [
  "It Park",
  "Mall",
  "Commercial Project",
  "Residential Project",
  "Retail/Commercial Building",
  "Market/High Street",
  "Other",
];
export const owenershiptype = [
  "Free Hold",
  "Lease Hold",
  "Power of Attorney",
  "Co-operative Society",
  "Agreement Holder",
  "Other",
];
export const ageofproperty = [
  "New Property",
  "0-5 Years ",
  "5-10 Years",
  "10-15 Years",
  "15-20 Years",
  "20-25 Years",
  "25-30 Years",
  "Above 30+ Years",
];
export const occupancydays = [
  "Immediate",
  "within 7 days",
  "15 Days",
  "30 Days",
  "45 Days",
  "60 Days",
  "75 Days",
  "90 Days",
];
export const availablefrom = ["Immediate", "Later"];
export const hotelResortTypeOptions = [
  "7 Star Hotel",
  "5 Star Hotel",
  "4 Star Hotel",
  "3 Star Hotel",
  "2 Star Hotel",
  "1 Star Hotel",
];

export const availableForOptions1 = ["Individual", "Company", "No Preference"];
// export const locatedNearOptions = ["Enterence", "Elevator", "Starecase"];
export const positionstatus = ["Ready to Move", "Under Construction"];
export const propertyManage = [
  "Landlord",
  "Care Taker",
  "Dedicated professionals",
];

export const tenentTypeOptions = [
  "Family",
  "Bachelors",
  "Spinsters",
  "Single Men",
  "Single Girl/Women",
  "foreigner/Expacts",
  "Company Lease",
  "No Preference",
  "All",
];
export const relegiousOptions = [
  "Hindu",
  "Sikh",
  "Christian",
  "Muslim",
  "Others",
  "No Preference",
];
export const workPreferenceOptions = [
  "Student",
  "Salaried",
  "BusinessMen",
  "All",
  "No Preference",
];
export const foodPreferenceOptions = [
  "Vegetarian",
  "Non-Vegetarian",
  "No Preference",
];
export const petAllowedOptions = ["Yes", "No", "No Preference"];
export const bachelorsOrSpinstersOptions = ["1-2", "2-4", "Above 4+"];

export const unitSaleList = [
  "Total Amount",
  // { value: 4, label: "sq.ft" },
  // { value: 5, label: "sq.yd" },
  // { value: 6, label: "sq.mt" },
  // { value: 7, label: "Acre" },
  // { value: 8, label: "Bigha" },
  // { value: 9, label: "Marla" },
  // { value: 10, label: "Kanal" },
  // { value: 11, label: "Biswa1" },
  // { value: 12, label: "Biswa2" },
  // { value: 13, label: "Ground" },
  // { value: 14, label: "Aankadam" },
  // { value: 15, label: "Rood" },
  // { value: 16, label: "Chatak" },
  // { value: 17, label: "Kottah" },
  // { value: 18, label: "Maria" },
  // { value: 19, label: "Cent" },
  // { value: 20, label: "Perch" },
  // { value: 21, label: "Guntha" },
  // { value: 22, label: "Are" },
  // { value: 23, label: "Katha" },
  // { value: 24, label: "Gaj" },
  // { value: 25, label: "Killa" },
];

export const priceincludeoptions = [
  "plc",
  "Car parking",
  "Club membership",
  "Edc/idc",
  "Registration Charges",
];
export const positionStatusOptions = [
  "Prelaunch",
  "Under Construction",
  "New Booking",
  "Upcoming",
  "Ready to move",
];
export const occupTypeSale = [
  "Vacant Position",
  "Tenant is Staying",
  "Owner/Self use",
];
export const availableForOptions = [
  "Any one",
  "Company Lease",
  "Pesonal Lease",
];
export const availableforRes = ["Individual", "Company", "No Preference"];
export const transactionTypeOptions = ["New Property", "Resale"];

export const customerReviews = [
  {
    name: "Rahul Sharma",
    feedback: "The property management team handles everything seamlessly! From tenant screening to maintenance, I have complete peace of mind.",
    location: "Mumbai, India",
    image: "https://i.pravatar.cc/100?img=1"
  },
  {
    name: "Sneha Patel",
    feedback: "Reliable and professional service! Rent collection is now automated, and I get detailed reports every month.",
    location: "Bangalore, India",
    image: "https://i.pravatar.cc/100?img=5"
  },
  {
    name: "Amit Verma",
    feedback: "Excellent property maintenance support. My rental property stays in top condition, and my tenants are happy.",
    location: "Delhi, India",
    image: "https://i.pravatar.cc/100?img=3"
  },
  {
    name: "Priya Singh",
    feedback: "Stress-free property management! Their team takes care of everything, allowing me to focus on other investments.",
    location: "Pune, India",
    image: "https://i.pravatar.cc/100?img=4"
  }
];

export const features = [
  { icon: <GppGoodIcon />, title: "Trust & Security" }, // Ensures property & tenant safety
  { icon: <PsychologyAltIcon />, title: "Expert Property Managers" }, // Professional guidance
  { icon: <SupportAgentIcon />, title: "24/7 Maintenance Support" }, // Round-the-clock service
  { icon: <VerifiedIcon />, title: "Verified Tenants & Screening" }, // Ensures reliable tenants
  { icon: <AddHomeIcon />, title: "End-to-End Property Management" }, // Covers all property needs
  { icon: <CurrencyRupeeIcon />, title: "Transparent & Affordable Pricing" } // No hidden fees
];


export const processSteps = [
  {
    title: "Property Assessment",
    icon: propertyAssessment, // Replace with actual path
    description: "We evaluate your property’s condition and rental potential.",
  },
  {
    title: "Marketing & Tenant Screening",
    icon: marketingTenant, // Replace with actual path
    description: "We list your property, attract tenants, and conduct thorough screenings.",
  },
  {
    title: "Property Maintenance",
    icon: maintenanceService, // Replace with actual path
    description: "We handle repairs, inspections, and regular upkeep for hassle-free management.",
  },
  {
    title: "Rent Collection & Reports",
    icon: rentCollection, // Replace with actual path
    description: "We manage rent collection and provide financial reports for transparency.",
  },
];

export const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export const generateSchema = (serviceType, city) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceType,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Get My Housing",
      "image": "https://www.getmyhousing.com/getmyhousing.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ashok Nagar",
        "addressLocality": city,
        "postalCode": "560001",
        "addressCountry": "India",
      },
      "telephone": "+919900823404",
    },
    "description": `Affordable and reliable ${serviceType.toLowerCase()} services in ${city}.`,
    "areaServed": city,
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": window.location.href,
    },
  };
};

export const generateFaqSchema = (faqData) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.main.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
};