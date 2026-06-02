import React from 'react'
import geyser from "../assets/geyser-service.jpg"
import Header from '../../../generic/Header'
import HeroSection from '../service-components/HeroSection'
import WhyChooseUs from '../service-components/WhyChooseUs'
import Testimonial from '../service-components/Testimonial'
import OurProcess from '../service-components/OurProcess'
import EnquirySection from '../service-components/EnquirySection'
import Faq from '../service-components/Faq'
import Footer from '../../../generic/Footer'
import installationIcon from "../assets/icons/maintenance.png"
import consultationIcon from "../assets/icons/conversation.png"
import qualityIcon from "../assets/icons/high-quality.png"
import maintenanceIcon from "../assets/icons/customer-service.png"
import DownloadIcon from '@mui/icons-material/Download';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SellIcon from '@mui/icons-material/Sell';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Helmet from '../../../functional-component/Helmet'
import { useCookies } from 'react-cookie'
import { config } from '../../../../config/config'
import { generateFaqSchema, generateSchema } from '../../../../common/common'

const Geyser = () => {
    const [cookies] = useCookies();
    const city = cookies[config.preferencesCookie]?.city || "bangalore";

    const landingPageContent = {
        leadSource: "Geyser Service",
        heroSection: {
            heroTitle: "Reliable Geyser Installation & Repair Services",
            heroTitleDes: "Ensure a steady supply of hot water with our professional geyser installation, repair, and maintenance services. We offer tailored solutions for both residential and commercial properties.",
            heroList: [
                "✅ Expert Installation & Repair for All Types of Geysers",
                "✅ High-Quality Parts and Professional Technicians",
                "✅ Safe, Efficient, and Reliable Geyser Solutions",
                "✅ Affordable Pricing with Transparent Estimates"
            ],
            heroButton: "Book Now",
            formTitle: "Request a Geyser Service Quote",
            bannerImage: geyser, // Add your banner image here
        },
        faq: {
            title: "Frequently Asked Questions",
            titleDesc: "Get answers to common questions about our geyser installation, repair, and maintenance services.",
            main: [
                {
                    question: "What types of geysers do you install and repair?",
                    answer: "We specialize in installing and repairing both electric and gas geysers. We offer solutions for residential and commercial properties, ensuring reliable hot water supply.",
                },
                {
                    question: "Do you offer geyser maintenance services?",
                    answer: "Yes, we provide regular maintenance services to ensure your geyser functions efficiently, extends its lifespan, and avoids unexpected breakdowns.",
                },
                {
                    question: "How do I know if my geyser needs repair?",
                    answer: "If your geyser is not producing hot water, is leaking, making strange noises, or has inconsistent temperature settings, it may require repair. Contact us for a thorough inspection.",
                },
                {
                    question: "How long does a geyser installation or repair take?",
                    answer: "The time required depends on the complexity of the installation or repair. We strive to complete installations and repairs promptly, ensuring minimal disruption to your daily routine.",
                },
            ],
        },
        enquirySection: {
            title: "Get in Touch for Expert Geyser Services",
            titleDesc: "Contact us for a free consultation and quote. Our team is ready to handle all your geyser installation, repair, and maintenance needs.",
        },
        ourProcess: {
            title: "How Our Geyser Services Work",
            titleDesc: "Our step-by-step process ensures that your geyser is installed, repaired, or maintained to the highest standards of quality and safety.",
            main: [
                {
                    title: "Initial Consultation & Assessment",
                    icon: consultationIcon, // Add actual icon path
                    description: "We begin by assessing your geyser requirements, including the type, size, and installation or repair needs. Our team provides an accurate estimate and timeline for the work.",
                },
                {
                    title: "Installation & Repair",
                    icon: installationIcon, // Add actual icon path
                    description: "Our skilled technicians handle the installation or repair process, ensuring your geyser is set up according to safety standards and functions effectively from day one.",
                },
                {
                    title: "Testing & Quality Assurance",
                    icon: qualityIcon, // Add actual icon path
                    description: "Once the installation or repair is complete, we conduct thorough testing to ensure your geyser works efficiently and meets all operational requirements.",
                },
                {
                    title: "Ongoing Support & Maintenance",
                    icon: maintenanceIcon, // Add actual icon path
                    description: "We provide regular maintenance services to ensure your geyser continues to function optimally, extending its lifespan and preventing future breakdowns.",
                },
            ],
        },
        testimonialSection: {
            title: "What Our Clients Are Saying",
            titleDesc: "Hear from satisfied customers who trust our geyser installation, repair, and maintenance services for their homes and businesses.",
            main: [
                {
                    name: "Michael Johnson",
                    feedback: "The team did an excellent job installing a new geyser in our home. They were quick, professional, and the installation was flawless. Highly recommend their services.",
                    location: "Los Angeles, USA",
                    image: "https://i.pravatar.cc/100?img=5",
                },
                {
                    name: "Sarah Lee",
                    feedback: "We had an issue with our geyser, and the repair team was fantastic. They identified the problem quickly and had it fixed in no time. Very satisfied with the service!",
                    location: "New York, USA",
                    image: "https://i.pravatar.cc/100?img=6",
                },
            ],
        },
        whyChooseUs: {
            title: "Why Choose Our Geyser Services?",
            titleDesc: "We offer top-quality geyser installation, repair, and maintenance services with a focus on reliability, safety, and customer satisfaction.",
            main: [
                { icon: <DownloadIcon />, title: "Expert Installation & Repair" }, // Skilled technicians for geyser services
                { icon: <HealthAndSafetyIcon />, title: "Strict Safety Standards" }, // We ensure all work meets safety regulations
                { icon: <SellIcon />, title: "Affordable & Transparent Pricing" }, // No hidden fees, clear quotes
                { icon: <RocketLaunchIcon />, title: "Fast Response & On-Time Service" }, // Quick service and punctuality
            ],
        },
    };

    // Generate FAQ schema dynamically
    const faqSchema = generateFaqSchema(landingPageContent.faq);

    // Generate service schema
    const schema = generateSchema("Geyser Services", city);

    return (
        <>
            <Helmet
                title={`Geyser Service in ${city} | Get My Housing`}
                description="Expert geyser installation, repair, and maintenance services for homes and businesses. Ensure a reliable hot water supply with professional servicing."
                keywords="geyser service, water heater repair, geyser installation, hot water system, geyser maintenance, Get My Housing"
                canonicalUrl={window.location.href}
                ogTitle={`Geyser Service in ${city} | Get My Housing`}
                ogDescription="Expert geyser installation, repair, and maintenance services for homes and businesses. Ensure a reliable hot water supply with professional servicing."
                twitterTitle={`Geyser Service in ${city} | Get My Housing`}
                twitterDescription="Expert geyser installation, repair, and maintenance services for homes and businesses. Ensure a reliable hot water supply with professional servicing."
                ogImage={geyser}
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

export default Geyser