import React from 'react'
import fabricationImage from "../assets/fabrication-service.jpg"
import HeroSection from '../service-components/HeroSection'
import WhyChooseUs from '../service-components/WhyChooseUs'
import Testimonial from '../service-components/Testimonial'
import OurProcess from '../service-components/OurProcess'
import EnquirySection from '../service-components/EnquirySection'
import Faq from '../service-components/Faq'
import Footer from '../../../generic/Footer'
import Header from '../../../generic/Header'
import consultationIcon from "../assets/icons/conversation.png"
import fabricationIcon from "../assets/icons/cutting.png"
import qualityIcon from "../assets/icons/high-quality.png"
import deliveryIcon from "../assets/icons/delivery-bike.png"
import BuildIcon from '@mui/icons-material/Build';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Helmet from '../../../functional-component/Helmet'
import { useCookies } from 'react-cookie'
import { config } from '../../../../config/config'
import { generateFaqSchema, generateSchema } from '../../../../common/common'

const FabricationService = () => {
    const [cookies] = useCookies();
    const city = cookies[config.preferencesCookie]?.city || "bangalore";

    const landingPageContent = {
        leadSource: "Fabrication Service",
        heroSection: {
            heroTitle: "Custom Fabrication Services for Your Unique Needs",
            heroTitleDes: "Transform your ideas into reality with our precision fabrication services. Whether it's metalwork, structural components, or custom parts, we offer high-quality solutions for commercial and industrial projects.",
            heroList: [
                "✅ Expert Custom Fabrication for Metal, Steel, and More",
                "✅ Precision Cutting, Welding, and Assembly",
                "✅ Tailored Solutions for Commercial & Industrial Projects",
                "✅ Competitive Pricing & On-Time Delivery"
            ],
            heroButton: "Book Now",
            formTitle: "Request a Fabrication Service Quote",
            bannerImage: fabricationImage, // Add your banner image here
        },
        faq: {
            title: "Frequently Asked Questions",
            titleDesc: "Explore common questions about our fabrication services and how we can assist with your next project.",
            main: [
                {
                    question: "What types of fabrication services do you offer?",
                    answer: "We specialize in a range of fabrication services, including metal fabrication, structural steel work, custom part manufacturing, welding, cutting, and assembly for commercial and industrial projects.",
                },
                {
                    question: "Do you handle custom fabrication projects?",
                    answer: "Absolutely! We specialize in custom fabrication projects and can work with you to design and create parts and components that meet your exact specifications.",
                },
                {
                    question: "What materials do you work with?",
                    answer: "We work with a wide variety of materials including steel, aluminum, stainless steel, and other metals, as well as plastics and composites for specific applications.",
                },
                {
                    question: "How long does a typical fabrication project take?",
                    answer: "The timeline for each project depends on its complexity and scale. We provide realistic delivery estimates and ensure your project is completed on time and to your satisfaction.",
                },
            ],
        },
        enquirySection: {
            title: "Get in Touch for Expert Fabrication Services",
            titleDesc: "Contact us today for a free consultation and quote. Let our experts help with your fabrication needs, whether you're working on a small or large-scale project.",
        },
        ourProcess: {
            title: "How Our Fabrication Service Works",
            titleDesc: "Our step-by-step process ensures precision, quality, and timely delivery for every project. Here's how we work:",
            main: [
                {
                    title: "Initial Consultation & Design",
                    icon: consultationIcon, // Add actual icon path
                    description: "We begin with a thorough consultation to understand your needs, project scope, and material requirements. Our design team then develops a tailored solution for your project.",
                },
                {
                    title: "Precision Fabrication & Assembly",
                    icon: fabricationIcon, // Add actual icon path
                    description: "Our skilled fabricators use state-of-the-art equipment to cut, weld, and assemble components to your exact specifications, ensuring high-quality results.",
                },
                {
                    title: "Quality Assurance & Testing",
                    icon: qualityIcon, // Add actual icon path
                    description: "Once the fabrication is complete, we conduct thorough quality checks and tests to ensure all parts meet industry standards and your requirements.",
                },
                {
                    title: "Delivery & Installation",
                    icon: deliveryIcon, // Add actual icon path
                    description: "We offer timely delivery and, if required, on-site installation to ensure your fabricated components are seamlessly integrated into your project.",
                },
            ],
        },
        testimonialSection: {
            title: "What Our Clients Are Saying",
            titleDesc: "Hear from our satisfied clients who rely on our fabrication expertise to complete their projects on time and with precision.",
            main: [
                {
                    name: "John Smith",
                    feedback: "The fabrication team delivered exceptional quality work for our commercial project. Their attention to detail and professional approach exceeded our expectations.",
                    location: "San Francisco, USA",
                    image: "https://i.pravatar.cc/100?img=7",
                },
                {
                    name: "Lisa Turner",
                    feedback: "We needed custom steel parts for our industrial site, and they handled the entire fabrication process flawlessly. Highly recommend their services.",
                    location: "Houston, USA",
                    image: "https://i.pravatar.cc/100?img=8",
                },
            ],
        },
        whyChooseUs: {
            title: "Why Choose Our Fabrication Services?",
            titleDesc: "We offer top-notch fabrication solutions with a focus on quality, precision, and customer satisfaction. Here’s why you should choose us:",
            main: [
                { icon: <BuildIcon />, title: "Custom Fabrication for Any Project" }, // Tailored solutions for all needs
                { icon: <PrecisionManufacturingIcon />, title: "High-Precision Workmanship" }, // Precision cutting, welding, and assembly
                { icon: <PriceCheckIcon />, title: "Affordable & Transparent Pricing" }, // Competitive pricing with no hidden costs
                { icon: <AccessTimeIcon />, title: "Timely Delivery & Project Completion" }, // On-time delivery and efficient service
            ],
        },
    };

    // Generate FAQ schema dynamically
    const faqSchema = generateFaqSchema(landingPageContent.faq);

    // Generate service schema
    const schema = generateSchema("Fabrication Services", city);

    return (
        <>
            <Helmet
                title={`Fabrication Service in ${city} | Get My Housing`}
                description="Get high-quality metal fabrication services for residential and commercial needs. Expert welding, custom metalwork, and durable solutions for structures, gates, and interiors."
                keywords="fabrication service, metal fabrication, welding, custom metalwork, steel fabrication, aluminum fabrication, Get My Housing"
                canonicalUrl={window.location.href}
                ogTitle={`Fabrication Service in ${city} | Get My Housing`}
                ogDescription="Get high-quality metal fabrication services for residential and commercial needs. Expert welding, custom metalwork, and durable solutions for structures, gates, and interiors."
                twitterTitle={`Fabrication Service in ${city} | Get My Housing`}
                twitterDescription="Get high-quality metal fabrication services for residential and commercial needs. Expert welding, custom metalwork, and durable solutions for structures, gates, and interiors."
                ogImage={fabricationImage}
                schema={[schema, faqSchema]}
            />
            <Header />
            <HeroSection content={landingPageContent} />

            {/* <SubServices subServices={subService} /> */}

            <WhyChooseUs content={landingPageContent} />

            <Testimonial content={landingPageContent} />

            <OurProcess content={landingPageContent} />

            <EnquirySection content={landingPageContent} />

            <Faq content={landingPageContent} />
            <Footer />
        </>
    )
}

export default FabricationService