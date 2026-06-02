import React from "react";
import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import WaterPurifierService from "../assets/water-purifier.jpg"; // Update the image
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png";
import installationIcon from "../assets/icons/maintenance.png";
import maintenanceIcon from "../assets/icons/customer-service.png";
import DropletIcon from '@mui/icons-material/WaterDrop'; // Icon for water
import FilterIcon from '@mui/icons-material/FilterAlt'; // Icon for filtration
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icon for quality assurance
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf'; // Icon for energy efficiency
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

export const WaterPurifier = () => {
    const [cookies] = useCookies();
    const city = cookies[config.preferencesCookie]?.city || "bangalore";

    const landingPageContent = {
        leadSource: "Water Purifier",
        heroSection: {
            heroTitle: "Professional Water Purifier Services for Your Home & Business",
            heroTitleDes: "Ensure clean and safe drinking water with our expert water purifier installation, maintenance, and repair services.",
            heroList: [
                "✅ Expert Installation & Setup",
                "✅ Comprehensive Maintenance Plans",
                "✅ Emergency Repair Services",
                "✅ Energy-Efficient & Eco-Friendly Solutions"
            ],
            heroButton: "Book Now",
            formTitle: "Get Your Water Purifier Service Quote",
            bannerImage: WaterPurifierService, // Update the banner image
        },
        faq: {
            title: "Frequently Asked Questions",
            titleDesc: "Find answers to common questions about our water purifier services and how we can help ensure clean drinking water.",
            main: [
                {
                    question: "What types of water purifiers do you service?",
                    answer: "We service all types of water purifiers, including RO, UV, and UF systems, for both residential and commercial use.",
                },
                {
                    question: "Do you offer emergency repair services for water purifiers?",
                    answer: "Yes, we provide 24/7 emergency repair services to ensure your water purifier is always functioning properly.",
                },
                {
                    question: "How often should I service my water purifier?",
                    answer: "We recommend servicing your water purifier every 6 months to ensure optimal performance and water quality.",
                },
                {
                    question: "Can you help with installing energy-efficient water purifiers?",
                    answer: "Absolutely! We offer installation of energy-efficient water purifiers that help reduce your energy consumption.",
                },
                {
                    question: "What is the cost of water purifier services?",
                    answer: "Our pricing is transparent and depends on the service you need. Contact us for a custom quote based on your requirements.",
                },
            ]
        },
        enquirySection: {
            title: "Get in Touch for Water Purifier Services",
            titleDesc: "Fill out the form below, and our team will provide you with a free quote and expert advice on your water purifier needs.",
        },
        ourProcess: {
            title: "How Our Water Purifier Service Works",
            titleDesc: "We make the process smooth and hassle-free with our expert services, ensuring clean and safe drinking water for your home or business.",
            main: [
                {
                    title: "Consultation & Assessment",
                    icon: consultationIcon,
                    description: "We assess your water quality and recommend the best water purifier solutions tailored to your needs.",
                },
                {
                    title: "Installation or Repair",
                    icon: installationIcon,
                    description: "Our skilled technicians install or repair your water purifier with minimal disruption to your space.",
                },
                {
                    title: "Ongoing Maintenance & Support",
                    icon: maintenanceIcon,
                    description: "We offer maintenance plans to ensure your water purifier continues to provide clean and safe drinking water.",
                },
            ]
        },
        testimonialSection: {
            title: "What Our Clients Are Saying",
            titleDesc: "Real feedback from clients who trust us to provide clean and safe drinking water.",
            main: [
                {
                    name: "Rahul Sharma",
                    feedback: "The team installed my RO water purifier quickly and efficiently. The water quality has improved significantly!",
                    location: "Mumbai, India",
                    image: "https://i.pravatar.cc/100?img=2",
                },
                {
                    name: "Priya Patel",
                    feedback: "I had an issue with my UV purifier, and they fixed it the same day. Highly recommend their services!",
                    location: "Delhi, India",
                    image: "https://i.pravatar.cc/100?img=3",
                },
            ]
        },
        whyChooseUs: {
            title: "Why Choose Our Water Purifier Services?",
            titleDesc: "We offer reliable, energy-efficient, and affordable water purifier solutions to ensure clean and safe drinking water.",
            main: [
                { icon: <DropletIcon />, title: "Clean & Safe Water" }, // Represents clean water
                { icon: <FilterIcon />, title: "Advanced Filtration" }, // Represents filtration
                { icon: <CheckCircleIcon />, title: "Quality Assurance" }, // Represents quality assurance
                { icon: <EnergySavingsLeafIcon />, title: "Energy Efficiency" }, // Represents energy efficiency
            ]
        },
    };

    // Generate FAQ schema dynamically
    const faqSchema = generateFaqSchema(landingPageContent.faq);

    // Generate service schema
    const schema = generateSchema("Water Purifier Services", city);

    return (
        <>
            <Helmet
                title={`Water Purifier Service in ${city} | Get My Housing`}
                description="Get professional water purifier services, including installation, maintenance, and repair. Ensure clean and safe drinking water with Get My Housing."
                keywords="real estate, water purifier service, Get My Housing, RO water purifier, UV water purifier, clean drinking water"
                canonicalUrl={window.location.href}
                ogTitle={`Water Purifier Service in ${city} | Get My Housing`}
                ogDescription="Get professional water purifier services, including installation, maintenance, and repair. Ensure clean and safe drinking water with Get My Housing."
                twitterTitle={`Water Purifier Service in ${city} | Get My Housing`}
                twitterDescription="Get professional water purifier services, including installation, maintenance, and repair. Ensure clean and safe drinking water with Get My Housing."
                ogImage={WaterPurifierService}
                schema={[schema, faqSchema]}
            />
            <Header />
            <HeroSection content={landingPageContent} />

            <WhyChooseUs content={landingPageContent} />

            <Testimonial content={landingPageContent} />

            <OurProcess content={landingPageContent} />

            <EnquirySection content={landingPageContent} />

            <Faq content={landingPageContent} />
            <Footer />
        </>
    );
};