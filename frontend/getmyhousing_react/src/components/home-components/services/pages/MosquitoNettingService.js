import Header from '../../../generic/Header'
import HeroSection from '../service-components/HeroSection'
import WhyChooseUs from '../service-components/WhyChooseUs'
import Testimonial from '../service-components/Testimonial'
import OurProcess from '../service-components/OurProcess'
import EnquirySection from '../service-components/EnquirySection'
import Faq from '../service-components/Faq'
import mosquitoNettingImage from "../assets/mosquito-netting-service.jpg"
import consultationIcon from "../assets/icons/conversation.png"
import customizationIcon from "../assets/icons/hand.png"
import installationIcon from "../assets/icons/maintenance.png"
import supportIcon from "../assets/icons/customer-service.png"
import ShieldIcon from '@mui/icons-material/Shield';
import BuildIcon from '@mui/icons-material/Build';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Footer from '../../../generic/Footer'
import Helmet from '../../../functional-component/Helmet'
import { useCookies } from 'react-cookie'
import { config } from '../../../../config/config'
import { generateFaqSchema, generateSchema } from '../../../../common/common'

const MosquitoNettingService = () => {
    const [cookies] = useCookies();
    const city = cookies[config.preferencesCookie]?.city || "bangalore";

    const landingPageContent = {
        leadSource: "Mosquito Netting Service",
        heroSection: {
            heroTitle: "Protect Your Home with High-Quality Mosquito Nets",
            heroTitleDes: "Say goodbye to mosquitoes and insects with our durable, custom-fitted mosquito net solutions. Enjoy a peaceful sleep and a safe home environment with our expert installation services.",
            heroList: [
                "✅ High-Quality, Durable Mosquito Nets",
                "✅ Custom-Fitted for Windows, Doors & Balconies",
                "✅ Hassle-Free Installation by Experts",
                "✅ Affordable Pricing & Long-Lasting Protection"
            ],
            heroButton: "Book Now",
            formTitle: "Request a Free Quote",
            bannerImage: mosquitoNettingImage, // Add your banner image here
        },
        faq: {
            title: "Frequently Asked Questions",
            titleDesc: "Find answers to common questions about our mosquito net solutions and installation services.",
            main: [
                {
                    question: "What types of mosquito nets do you offer?",
                    answer: "We provide sliding, fixed frame, roll-up, pleated, and magnetic mosquito nets for windows, doors, and balconies.",
                },
                {
                    question: "Are the mosquito nets durable?",
                    answer: "Yes, our nets are made from high-quality materials, ensuring long-lasting protection against mosquitoes and other insects.",
                },
                {
                    question: "Do you provide installation services?",
                    answer: "Yes, our expert team will measure, customize, and install mosquito nets for a perfect fit at your home or office.",
                },
                {
                    question: "How much does a mosquito net installation cost?",
                    answer: "The cost depends on the size, type, and quantity of nets required. Contact us for a free consultation and price estimate.",
                },
            ],
        },
        enquirySection: {
            title: "Get in Touch for Mosquito Net Solutions",
            titleDesc: "Fill out the form below to request a consultation and get a customized mosquito netting solution for your home.",
        },
        ourProcess: {
            title: "How Our Mosquito Net Installation Works",
            titleDesc: "We ensure a smooth and hassle-free experience from consultation to installation.",
            main: [
                {
                    title: "Consultation & Measurement",
                    icon: consultationIcon, // Add actual icon path
                    description: "Our team assesses your space and recommends the best mosquito netting solutions for your home or office.",
                },
                {
                    title: "Customization & Fabrication",
                    icon: customizationIcon, // Add actual icon path
                    description: "We customize the nets based on your window, door, or balcony size, ensuring a perfect fit.",
                },
                {
                    title: "Installation by Experts",
                    icon: installationIcon, // Add actual icon path
                    description: "Our skilled professionals install the mosquito nets securely and efficiently at your location.",
                },
                {
                    title: "After-Sales Support & Maintenance",
                    icon: supportIcon, // Add actual icon path
                    description: "We provide maintenance tips and offer repair services to keep your nets in top condition.",
                },
            ],
        },
        testimonialSection: {
            title: "What Our Customers Say",
            titleDesc: "See how our mosquito net solutions have helped homeowners enjoy a mosquito-free living environment.",
            main: [
                {
                    name: "Rohit Mehra",
                    feedback: "The mosquito nets are excellent quality and fit perfectly! The team was professional and installed them quickly. Highly recommended!",
                    location: "Pune, India",
                    image: "https://i.pravatar.cc/100?img=11",
                },
                {
                    name: "Sunita Kapoor",
                    feedback: "I am so happy with the mosquito nets! They keep insects out while allowing fresh air inside. Great service and pricing!",
                    location: "Bangalore, India",
                    image: "https://i.pravatar.cc/100?img=12",
                },
            ],
        },
        whyChooseUs: {
            title: "Why Choose Our Mosquito Netting Service?",
            titleDesc: "We provide high-quality mosquito net solutions tailored to your home or office needs.",
            main: [
                { icon: <ShieldIcon />, title: "Premium-Quality & Durable Nets" }, // Strong & long-lasting mosquito netting
                { icon: <BuildIcon />, title: "Custom-Fitted for Windows & Doors" }, // Tailor-made solutions for every home
                { icon: <EngineeringIcon />, title: "Expert Installation & Support" }, // Professional service from start to finish
                { icon: <LocalOfferIcon />, title: "Affordable Pricing & Free Consultation" }, // Best price guarantee with expert guidance
            ],
        },
    };

    // Generate FAQ schema dynamically
    const faqSchema = generateFaqSchema(landingPageContent.faq);

    // Generate service schema
    const schema = generateSchema("Mosquito Netting Services", city);

    return (
        <>
            <Helmet
                title={`Mosquito Netting Service in ${city} | Get My Housing`}
                description="Protect your home from mosquitoes and insects with high-quality mosquito netting solutions. Durable, customized, and easy-to-install nets for doors and windows."
                keywords="mosquito netting, insect protection, window nets, door nets, mosquito mesh, home safety, Get My Housing"
                canonicalUrl={window.location.href}
                ogTitle={`Mosquito Netting Service in ${city} | Get My Housing`}
                ogDescription="Protect your home from mosquitoes and insects with high-quality mosquito netting solutions. Durable, customized, and easy-to-install nets for doors and windows."
                twitterTitle={`Mosquito Netting Service in ${city} | Get My Housing`}
                twitterDescription="Protect your home from mosquitoes and insects with high-quality mosquito netting solutions. Durable, customized, and easy-to-install nets for doors and windows."
                ogImage={mosquitoNettingImage}
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

export default MosquitoNettingService