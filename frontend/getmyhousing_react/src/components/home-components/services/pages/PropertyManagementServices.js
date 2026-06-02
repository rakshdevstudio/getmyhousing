import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import backgroundImage from "../assets/property-management-hero.jpg";
import Faq from "../service-components/Faq";
import EnquirySection from "../service-components/EnquirySection";
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import GppGoodIcon from '@mui/icons-material/GppGood';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddHomeIcon from '@mui/icons-material/AddHome';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import propertyAssessment from "../assets/icons/good-feedback.png";
import marketingTenant from "../assets/icons/billboard.png";
import maintenanceService from "../assets/icons/house.png";
import rentCollection from "../assets/icons/plan.png";
import { generateFaqSchema, generateSchema, services } from "../../../../common/common";
import "./PropertyManagementServices.css";
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";



export const PropertyManagementServices = () => {
    const [cookies] = useCookies();
    const city = cookies[config.preferencesCookie]?.city || "bangalore";

    const landingPageContent = {
        leadSource: "Property Management",
        heroSection: {
            heroTitle: "Effortless Property Management Solutions for Landlords & Investors",
            heroTitleDes: "Take control of your properties with our comprehensive property management platform. From tenant screening to maintenance tracking, we simplify every aspect of property management.",
            heroList: [
                "✅ Streamlined Tenant Onboarding & Management",
                "✅ Automated Rent Collection & Financial Reporting",
                "✅ Expert Legal & Compliance Support",
                "✅ 24/7 Maintenance & Emergency Services"
            ],
            heroButton: "Book Now",
            formTitle: "Get Expert Property Management Services",
            bannerImage: backgroundImage,
        },
        faq: {
            title: "Frequently Asked Questions",
            titleDesc: "Find answers to common questions about our property management services, rental assistance, and more.",
            main: [
                {
                    question: "What is property management, and how can it help me?",
                    answer: "Property management involves overseeing residential or commercial properties on behalf of owners. Our services include tenant screening, rent collection, maintenance coordination, and legal compliance, saving you time and ensuring your property is well-maintained.",
                },
                {
                    question: "How do you handle tenant screening and selection?",
                    answer: "We conduct thorough background checks, including credit history, employment verification, and rental history, to ensure reliable and responsible tenants for your property.",
                },
                {
                    question: "What happens if a tenant doesn’t pay rent on time?",
                    answer: "We have a structured rent collection process and follow up promptly with tenants in case of delays. If necessary, we initiate legal actions to recover unpaid rent while keeping you informed every step of the way.",
                },
                {
                    question: "Do you provide maintenance and repair services?",
                    answer: "Yes, we offer 24/7 maintenance support. Our team coordinates repairs, schedules inspections, and ensures your property remains in excellent condition.",
                },
                {
                    question: "Can you help with legal and compliance issues?",
                    answer: "Absolutely. We stay updated on local property laws and regulations, helping you avoid legal disputes and ensuring compliance with tenant-landlord laws.",
                },
                {
                    question: "How much does property management cost?",
                    answer: "Our fees are competitive and tailored to your needs. We offer flexible pricing plans, starting at 8% of monthly rent, with no hidden charges.",
                },
                {
                    question: "Do you manage both residential and commercial properties?",
                    answer: "Yes, we specialize in managing both residential and commercial properties, offering customized solutions to meet the unique needs of each property type.",
                },
                {
                    question: "How do I get started with your property management services?",
                    answer: "Getting started is easy! Simply contact us through our website or call us directly. We’ll schedule a consultation to understand your needs and provide a tailored plan.",
                },
            ]
        },
        enquirySection: {
            title: "Get in Touch",
            titleDesc: "Fill in the details and our team will contact you soon.",
        },
        ourProcess: {
            title: "Our Property Management Process",
            titleDesc: "Streamlined steps to ensure your property is managed efficiently and stress-free.",
            main: [
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
            ]
        },
        testimonialSection: {
            title: "What Our Customers Say",
            titleDesc: "Real experiences from happy clients who trusted our property management services.",
            main: [
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
            ]
        },
        whyChooseUs: {
            title: "Why Choose GetMyHousing?",
            titleDesc: "GetMyHousing is committed to providing the best housing solutions for our clients. We offer a wide range of services designed to help you find your perfect home quickly and easily. Our team of experts is here to guide you through every step of the process, ensuring a smooth and hassle-free experience.",
            main: [
                { icon: <GppGoodIcon />, title: "Trust & Security" }, // Ensures property & tenant safety
                { icon: <PsychologyAltIcon />, title: "Expert Property Managers" }, // Professional guidance
                { icon: <SupportAgentIcon />, title: "24/7 Maintenance Support" }, // Round-the-clock service
                { icon: <VerifiedIcon />, title: "Verified Tenants & Screening" }, // Ensures reliable tenants
                { icon: <AddHomeIcon />, title: "End-to-End Property Management" }, // Covers all property needs
                { icon: <CurrencyRupeeIcon />, title: "Transparent & Affordable Pricing" } // No hidden fees
            ]
        },
        subServices: {
            title: "Our Property Management Services",
            main: services[0].childService,
        }
    }

    // Generate FAQ schema dynamically
    const faqSchema = generateFaqSchema(landingPageContent.faq);

    // Generate service schema
    const schema = generateSchema("Property Management Services", city);
    return (
        <>
            <Helmet
                title={`Property Management Service ${city} | Get My Housing`}
                description="Ensure hassle-free property management with our expert services, including tenant management, maintenance, and leasing solutions."
                keywords="property management, rental management, tenant services, real estate maintenance, property leasing, Get My Housing"
                canonicalUrl={window.location.href}
                ogTitle={`Property Management Service ${city} | Get My Housing`}
                ogDescription="Ensure hassle-free property management with our expert services, including tenant management, maintenance, and leasing solutions."
                twitterTitle={`Property Management Service ${city} | Get My Housing`}
                twitterDescription="Ensure hassle-free property management with our expert services, including tenant management, maintenance, and leasing solutions."
                ogImage={backgroundImage}
                schema={[schema, faqSchema]}
            />
            <Header />

            <HeroSection content={landingPageContent} />


            <SubServices content={landingPageContent} />

            <WhyChooseUs content={landingPageContent} />

            <Testimonial content={landingPageContent} />

            <OurProcess content={landingPageContent} />


            <EnquirySection content={landingPageContent} />
            <Faq content={landingPageContent} />

            <Footer />
        </>
    )
}