import React from 'react'
import HeroSection from '../service-components/HeroSection'
import Header from '../../../generic/Header'
import WhyChooseUs from '../service-components/WhyChooseUs'
import Testimonial from '../service-components/Testimonial'
import OurProcess from '../service-components/OurProcess'
import EnquirySection from '../service-components/EnquirySection'
import Faq from '../service-components/Faq'
import Footer from '../../../generic/Footer'
import bannerimage from "../assets/air-cracking-service.jpg"
import inspectionIcon from "../assets/icons/checked.png";
import crack from "../assets/icons/crack.png";
import feedbackIcon from "../assets/icons/checked.png";
import BuildIcon from '@mui/icons-material/Build';
import HardwareIcon from '@mui/icons-material/Hardware';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Helmet from '../../../functional-component/Helmet'
import { useCookies } from 'react-cookie'
import { generateFaqSchema, generateSchema } from '../../../../common/common'
import { config } from '../../../../config/config'

const AirCrackFilling = () => {
    const [cookies] = useCookies();
    const city = cookies[config.preferencesCookie]?.city || "bangalore";

    const landingPageContent = {
        leadSource: "Air Cracking",
        heroSection: {
            heroTitle: "Professional Air Cracking Services for Your Property",
            heroTitleDes: "Ensure your property’s safety and structural integrity with our advanced air cracking techniques. We provide expert services to address cracks in walls, ceilings, and other surfaces.",
            heroList: [
                "✅ Expert Crack Diagnosis & Solutions",
                "✅ Long-Lasting, Durable Repair Techniques",
                "✅ Affordable Pricing & Transparent Costs",
                "✅ Fast and Reliable Service"
            ],
            heroButton: "Book Now",
            formTitle: "Request an Air Cracking Service Quote",
            bannerImage: "path/to/your/banner/image", // Add your banner image here
        },
        faq: {
            title: "Frequently Asked Questions",
            titleDesc: "Get the answers to your questions about our air cracking services and how we can help repair cracks in your property.",
            main: [
                {
                    question: "What is air cracking, and how does it work?",
                    answer: "Air cracking is a technique used to address cracks in the walls, ceilings, and other surfaces of buildings. Using specialized equipment, we inject air under pressure to identify and address underlying issues.",
                },
                {
                    question: "Can air cracking be used for all types of surfaces?",
                    answer: "Yes, we use air cracking for various surfaces including concrete, plaster, and drywall. Our experts assess the type of material before proceeding with the best solution.",
                },
                {
                    question: "How do I know if my property needs air cracking?",
                    answer: "If you're noticing cracks or air gaps in walls, ceilings, or other structures, it's important to have it assessed by a professional to ensure the structural integrity of your property.",
                },
                {
                    question: "How long do the results of air cracking repairs last?",
                    answer: "Air cracking repairs are long-lasting, but the duration depends on the severity of the damage and the environmental conditions. We use the best materials to ensure durability.",
                },
                {
                    question: "How much do air cracking services cost?",
                    answer: "We offer affordable and transparent pricing for all air cracking services. The cost depends on the size of the cracks and the extent of the damage. Contact us for a customized quote.",
                },
            ]
        },
        enquirySection: {
            title: "Contact Us for Air Cracking Services",
            titleDesc: "Fill out the form below to get in touch, and our experts will provide you with a free assessment and quote for air cracking services.",
        },
        ourProcess: {
            title: "How Our Air Cracking Service Works",
            titleDesc: "Our seamless process ensures your property is repaired with minimal hassle and maximum efficiency.",
            main: [
                {
                    title: "Inspection & Assessment",
                    icon: inspectionIcon, // Add actual icon path
                    description: "We conduct a thorough inspection to identify cracks and determine the best course of action.",
                },
                {
                    title: "Air Cracking Treatment",
                    icon: crack, // Add actual icon path
                    description: "Our skilled technicians use advanced air cracking methods to address cracks and restore the structure's integrity.",
                },
                {
                    title: "Post-Repair Inspection & Feedback",
                    icon: feedbackIcon, // Add actual icon path
                    description: "We perform a final inspection to ensure everything is repaired to the highest standard and request your feedback to improve.",
                },
            ]
        },
        testimonialSection: {
            title: "What Our Clients Are Saying",
            titleDesc: "Read real feedback from clients who trust our air cracking services to repair and restore their properties.",
            main: [
                {
                    name: "Mark Robinson",
                    feedback: "The air cracking team did an excellent job on my property. They quickly identified and repaired cracks in the walls, and the service was highly professional.",
                    location: "Los Angeles, USA",
                    image: "https://i.pravatar.cc/100?img=4",
                },
                {
                    name: "Linda Green",
                    feedback: "I'm so pleased with the results of the air cracking repair. The cracks in my ceiling were gone in no time, and the team was fantastic!",
                    location: "Dallas, USA",
                    image: "https://i.pravatar.cc/100?img=6",
                },
            ]
        },
        whyChooseUs: {
            title: "Why Choose Our Air Cracking Services?",
            titleDesc: "We offer expert air cracking solutions to restore the structural integrity of your property with reliable, affordable, and fast service.",
            main: [
                { icon: <HardwareIcon />, title: "Expert Crack Diagnosis" }, // Skilled technicians for crack detection
                { icon: <BuildIcon />, title: "Durable Repair Solutions" }, // Long-lasting repairs
                { icon: <LocalOfferIcon />, title: "Affordable & Transparent Pricing" }, // No hidden fees
                { icon: <RocketLaunchIcon />, title: "Fast & Reliable Service" }, // Prompt service for quick repairs
            ]
        },
    }

    // Generate FAQ schema dynamically
    const faqSchema = generateFaqSchema(landingPageContent.faq);

    // Generate service schema
    const schema = generateSchema("Air Cracking", city);
    return (
        <>
            <Helmet
                title={`Air Cracking Service in ${city} | Get My Housing`}
                description="Explore detailed information about this property, including price, location, amenities, and more. Find your dream home with Get My Housing."
                keywords="real estate, about us, Get My Housing, property solutions, home buying, home selling"
                canonicalUrl={window.location.href}
                ogTitle={`Air Cracking Service in ${city} | Get My Housing`}
                ogDescription="Explore detailed information about this property, including price, location, amenities, and more. Find your dream home with Get My Housing."
                twitterTitle={`Air Cracking Service in ${city} | Get My Housing`}
                twitterDescription="Explore detailed information about this property, including price, location, amenities, and more. Find your dream home with Get My Housing."
                ogImage={bannerimage}
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

export default AirCrackFilling