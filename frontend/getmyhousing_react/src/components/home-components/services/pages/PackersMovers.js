import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import PackersAndMovers from "../assets/packers-and-movers-service.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import surveyIcon from "../assets/icons/surveyor.png"
import packingIcon from "../assets/icons/shipping.png"
import transportIcon from "../assets/icons/delivery-truck.png"
import unloadingIcon from "../assets/icons/unload.png"
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandymanIcon from '@mui/icons-material/Handyman';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

const PackersMovers = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Packers and Movers Services",
    heroSection: {
      heroTitle: "Seamless & Hassle-Free Moving Services",
      heroTitleDes: "Relocate stress-free with our professional packers and movers. Whether it's a local or long-distance move, we ensure safe and efficient transportation of your belongings.",
      heroList: [
        "✅ Safe & Secure Packing with Quality Materials",
        "✅ Professional Handling & Damage-Free Transport",
        "✅ Timely Pickup & On-Time Delivery",
        "✅ Affordable & Transparent Pricing"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Free Moving Estimate",
      bannerImage: PackersAndMovers, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our packers and movers services.",
      main: [
        {
          question: "What types of moving services do you offer?",
          answer: "We provide local, domestic, and office relocation services, including packing, loading, transportation, unloading, and unpacking.",
        },
        {
          question: "How are my belongings protected during the move?",
          answer: "We use high-quality packing materials and specialized handling techniques to ensure the safety of your items during transit.",
        },
        {
          question: "How much does it cost to hire packers and movers?",
          answer: "The cost depends on factors such as distance, volume of items, and additional services. Contact us for a personalized quote.",
        },
        {
          question: "Do you provide insurance for transported goods?",
          answer: "Yes, we offer insurance options to cover any potential damages during transit.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for a Stress-Free Move",
      titleDesc: "Fill out the form below to request a free consultation and customized moving plan.",
    },
    ourProcess: {
      title: "How Our Packing & Moving Service Works",
      titleDesc: "Our structured process ensures a smooth and stress-free relocation.",
      main: [
        {
          title: "Free Pre-Move Survey & Quote",
          icon: surveyIcon, // Add actual icon path
          description: "We assess your moving needs and provide a customized quote with clear pricing.",
        },
        {
          title: "Packing & Secure Loading",
          icon: packingIcon, // Add actual icon path
          description: "Our professionals pack and load your belongings with care using high-quality packing materials.",
        },
        {
          title: "Safe Transportation",
          icon: transportIcon, // Add actual icon path
          description: "We transport your belongings securely with real-time tracking and on-time delivery.",
        },
        {
          title: "Unloading & Setup",
          icon: unloadingIcon, // Add actual icon path
          description: "Upon arrival, we unload, unpack, and help you set up at your new location.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Customers Say",
      titleDesc: "Hear from our happy customers about their smooth moving experience.",
      main: [
        {
          name: "Amit Verma",
          feedback: "The team was professional and efficient. They packed and moved everything safely without any hassle. Highly recommended!",
          location: "Mumbai, India",
          image: "https://i.pravatar.cc/100?img=15",
        },
        {
          name: "Priya Sharma",
          feedback: "Moving was never this easy! The team handled everything from packing to unpacking. Great service at an affordable price.",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=16",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Packers & Movers?",
      titleDesc: "We offer professional moving services with reliability and affordability.",
      main: [
        { icon: <SecurityIcon />, title: "Safe & Secure Packing" }, // Protection for fragile & valuable items
        { icon: <LocalShippingIcon />, title: "Reliable & Timely Transportation" }, // On-time delivery
        { icon: <HandymanIcon />, title: "Expert Packing & Handling" }, // Professional service
        { icon: <PriceCheckIcon />, title: "Affordable & Transparent Pricing" }, // No hidden charges
      ],
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Packers and Movers Services", city);

  return (
    <>
      <Helmet
        title={`Packers and Movers Service in ${city} | Get My Housing`}
        description="Make your relocation stress-free with our professional packers and movers services. We ensure safe and timely shifting of your home or office."
        keywords="packers and movers, home relocation, office shifting, moving services, transport services, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Packers and Movers Service in ${city} | Get My Housing`}
        ogDescription="Make your relocation stress-free with our professional packers and movers services. We ensure safe and timely shifting of your home or office."
        twitterTitle={`Packers and Movers Service in ${city} | Get My Housing`}
        twitterDescription="Make your relocation stress-free with our professional packers and movers services. We ensure safe and timely shifting of your home or office."
        ogImage={PackersAndMovers}
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
  );
};

export default PackersMovers;
