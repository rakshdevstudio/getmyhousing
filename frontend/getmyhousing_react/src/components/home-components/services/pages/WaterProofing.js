import React from "react";
import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import WaterProofingService from "../assets/water-proofing-service.jpg"; // Update the image
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png";
import installationIcon from "../assets/icons/maintenance.png";
import maintenanceIcon from "../assets/icons/customer-service.png";
import DropletIcon from '@mui/icons-material/WaterDrop'; // Icon for water resistance
import ShieldIcon from '@mui/icons-material/Shield'; // Icon for protection
import LayersIcon from '@mui/icons-material/Layers'; // Icon for coatings
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icon for quality assurance
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

export const WaterProofing = () => {
    const [cookies] = useCookies();
    const city = cookies[config.preferencesCookie]?.city || "bangalore";

    const landingPageContent = {
        leadSource: "Water Proofing",
        heroSection: {
            heroTitle: "Professional Water Proofing Services for Your Home & Business",
            heroTitleDes: "Protect your property from water damage with our expert waterproofing solutions. We offer tailored services for roofs, basements, and more.",
            heroList: [
                "✅ Comprehensive Waterproofing Solutions",
                "✅ Expert Installation & Repair",
                "✅ High-Quality Materials & Coatings",
                "✅ Affordable & Transparent Pricing"
            ],
            heroButton: "Book Now",
            formTitle: "Get Your Water Proofing Service Quote",
            bannerImage: WaterProofingService, // Update the banner image
        },
        faq: {
            title: "Frequently Asked Questions",
            titleDesc: "Find answers to common questions about our waterproofing services and how we can help protect your property.",
            main: [
                {
                    question: "What areas can be waterproofed?",
                    answer: "We provide waterproofing solutions for roofs, basements, bathrooms, terraces, and more to protect your property from water damage.",
                },
                {
                    question: "Do you offer emergency waterproofing services?",
                    answer: "Yes, we provide emergency waterproofing services to address leaks and water damage promptly.",
                },
                {
                    question: "How long does waterproofing last?",
                    answer: "With proper maintenance, our waterproofing solutions can last for many years, depending on the materials and conditions.",
                },
                {
                    question: "Can you waterproof an existing structure?",
                    answer: "Yes, we offer waterproofing services for both new constructions and existing structures.",
                },
                {
                    question: "What is the cost of waterproofing services?",
                    answer: "Our pricing is transparent and depends on the size of the area and the type of waterproofing required. Contact us for a custom quote.",
                },
            ]
        },
        enquirySection: {
            title: "Get in Touch for Water Proofing Services",
            titleDesc: "Fill out the form below, and our team will provide you with a free quote and expert advice on your waterproofing needs.",
        },
        ourProcess: {
            title: "How Our Water Proofing Service Works",
            titleDesc: "We make the process smooth and hassle-free with our expert services, ensuring your property is protected at every step.",
            main: [
                {
                    title: "Consultation & Assessment",
                    icon: consultationIcon,
                    description: "We assess your property and recommend the best waterproofing solutions tailored to your needs.",
                },
                {
                    title: "Installation or Repair",
                    icon: installationIcon,
                    description: "Our skilled technicians install or repair waterproofing systems with minimal disruption to your property.",
                },
                {
                    title: "Ongoing Maintenance & Support",
                    icon: maintenanceIcon,
                    description: "We offer maintenance plans to ensure your waterproofing system remains effective over time.",
                },
            ]
        },
        testimonialSection: {
            title: "What Our Clients Are Saying",
            titleDesc: "Real feedback from clients who trust us to protect their properties from water damage.",
            main: [
                {
                    name: "Rahul Sharma",
                    feedback: "The team did an excellent job waterproofing my terrace. No more leaks during the monsoon season!",
                    location: "Mumbai, India",
                    image: "https://i.pravatar.cc/100?img=2",
                },
                {
                    name: "Priya Patel",
                    feedback: "I had a basement leakage issue, and they fixed it quickly. Highly recommend their services!",
                    location: "Delhi, India",
                    image: "https://i.pravatar.cc/100?img=3",
                },
            ]
        },
        whyChooseUs: {
            title: "Why Choose Our Water Proofing Services?",
            titleDesc: "We offer reliable, high-quality, and affordable waterproofing solutions to protect your property from water damage.",
            main: [
                { icon: <DropletIcon />, title: "Water Resistance" }, // Represents water resistance
                { icon: <ShieldIcon />, title: "Protection" }, // Represents protection
                { icon: <LayersIcon />, title: "High-Quality Coatings" }, // Represents coatings
                { icon: <CheckCircleIcon />, title: "Quality Assurance" }, // Represents quality assurance
            ]
        },
    };

    // Generate FAQ schema dynamically
    const faqSchema = generateFaqSchema(landingPageContent.faq);

    // Generate service schema
    const schema = generateSchema("Water Proofing Services", city);

    return (
        <>
            <Helmet
                title={`Water Proofing Service in ${city} | Get My Housing`}
                description="Get professional waterproofing services, including installation, maintenance, and repair. Protect your property from water damage with Get My Housing."
                keywords="real estate, waterproofing service, Get My Housing, roof waterproofing, basement waterproofing, home protection"
                canonicalUrl={window.location.href}
                ogTitle={`Water Proofing Service in ${city} | Get My Housing`}
                ogDescription="Get professional waterproofing services, including installation, maintenance, and repair. Protect your property from water damage with Get My Housing."
                twitterTitle={`Water Proofing Service in ${city} | Get My Housing`}
                twitterDescription="Get professional waterproofing services, including installation, maintenance, and repair. Protect your property from water damage with Get My Housing."
                ogImage={WaterProofingService}
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