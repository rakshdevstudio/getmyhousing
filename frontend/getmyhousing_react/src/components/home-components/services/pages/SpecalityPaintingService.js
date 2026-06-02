import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import {
  generateFaqSchema,
  generateSchema,
  services,
} from "../../../../common/common";
import PaintingBanner from "../assets/speciality-painting-service.jpg"
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import BrushIcon from '@mui/icons-material/Brush';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import TimerIcon from '@mui/icons-material/Timer';
import StarRateIcon from '@mui/icons-material/StarRate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import consultationIcon from "../assets/icons/conversation.png"
import preparationIcon from "../assets/icons/preparation.png"
import paintingIcon from "../assets/icons/paint-brush.png"
import finishingIcon from "../assets/icons/check.png"
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";

const SpecalityPaintingService = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Specialty Painting Service",
    heroSection: {
      heroTitle: "Transform Your Space with Expert Specialty Painting Services",
      heroTitleDes: "Give your home or office a stunning makeover with our high-quality specialty painting services. We offer customized painting solutions for interiors and exteriors, ensuring a flawless finish.",
      heroList: [
        "✅ Premium-Quality Paints & Finishes",
        "✅ Skilled & Experienced Painters",
        "✅ Custom Colors & Artistic Designs",
        "✅ Affordable Pricing & Timely Completion"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Free Painting Estimate",
      bannerImage: PaintingBanner, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our specialty painting services and how we can bring your vision to life.",
      main: [
        {
          question: "What types of painting services do you offer?",
          answer: "We specialize in residential and commercial painting, including decorative finishes, textured painting, stencil art, and eco-friendly painting solutions."
        },
        {
          question: "Do you provide color consultation?",
          answer: "Yes! Our experts help you choose the perfect colors and finishes based on your preferences and space requirements."
        },
        {
          question: "Are your paints safe and eco-friendly?",
          answer: "We use high-quality, low-VOC, and eco-friendly paints that are safe for families, pets, and the environment."
        },
        {
          question: "How long does a painting project take?",
          answer: "The duration depends on the project size and complexity. Most residential projects take 3-7 days for completion."
        },
        {
          question: "Do you offer a warranty on your painting services?",
          answer: "Yes, we provide a workmanship guarantee, ensuring quality and durability in every project we complete."
        },
        {
          question: "How do I maintain my painted walls?",
          answer: "We provide post-painting care tips, including cleaning recommendations and touch-up advice for maintaining the fresh look."
        }
      ]
    },
    enquirySection: {
      title: "Get in Touch for a Stunning Paint Makeover",
      titleDesc: "Fill out the form below to get a personalized quote and expert painting advice.",
    },
    ourProcess: {
      title: "Our Specialty Painting Process",
      titleDesc: "We follow a meticulous painting process to ensure a smooth, high-quality finish that lasts.",
      main: [
        {
          title: "Consultation & Color Selection",
          icon: consultationIcon, // Add actual icon path
          description: "Our experts help you choose the best colors and finishes for your space."
        },
        {
          title: "Surface Preparation",
          icon: preparationIcon, // Add actual icon path
          description: "We clean, repair, and prime surfaces for a smooth and long-lasting paint application."
        },
        {
          title: "Professional Painting",
          icon: paintingIcon, // Add actual icon path
          description: "Our skilled painters apply high-quality paints using advanced techniques for a flawless look."
        },
        {
          title: "Final Touches & Cleanup",
          icon: finishingIcon, // Add actual icon path
          description: "We conduct a final inspection, add finishing touches, and leave your space spotless."
        }
      ]
    },
    testimonialSection: {
      title: "What Our Clients Say",
      titleDesc: "Hear from happy customers who transformed their spaces with our specialty painting services.",
      main: [
        {
          name: "Rahul Kapoor",
          feedback: "Amazing transformation! The team was professional, and the textured wall looks stunning. Highly recommended!",
          location: "Mumbai, India",
          image: "https://i.pravatar.cc/100?img=10"
        },
        {
          name: "Sneha Mehta",
          feedback: "Loved the artistic stencil work they did in my living room. The colors are just perfect!",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=12"
        },
        {
          name: "Amit Verma",
          feedback: "The best painting service I've ever hired! My office now has a vibrant, professional look.",
          location: "Bangalore, India",
          image: "https://i.pravatar.cc/100?img=14"
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Our Specialty Painting Services?",
      titleDesc: "We offer top-quality painting solutions tailored to your needs, ensuring durability and aesthetic appeal.",
      main: [
        { icon: <ColorLensIcon />, title: "Customized Painting Solutions" }, // Personalized color and design choices
        { icon: <BrushIcon />, title: "Skilled & Professional Painters" }, // Expertise in specialty finishes
        { icon: <EnergySavingsLeafIcon />, title: "Eco-Friendly & Non-Toxic Paints" }, // Safe for health and environment
        { icon: <TimerIcon />, title: "Timely Project Completion" }, // Fast and efficient service
        { icon: <StarRateIcon />, title: "High-Quality & Durable Finishes" }, // Long-lasting paint jobs
        { icon: <AttachMoneyIcon />, title: "Affordable Pricing & No Hidden Costs" } // Transparent and budget-friendly
      ]
    },
    subServices: {
      title: "Our Specialty Painting Services",
      main: services[1].childService
        .filter((item) => item.title !== "Specality Painting Service")
    }
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Specialty Painting Services", city);

  return (
    <>
      <Helmet
        title={`Specality Painting Service in ${city} | Get My Housing`}
        description="Get high-quality specialty painting services for your home or commercial space. Our professional painters deliver exceptional finishes with precision and durability."
        keywords="specialty painting, professional painters, wall painting, home painting, commercial painting, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Specality Painting Service in ${city} | Get My Housing`}
        ogDescription="Get high-quality specialty painting services for your home or commercial space. Our professional painters deliver exceptional finishes with precision and durability."
        twitterTitle={`Specality Painting Service in ${city} | Get My Housing`}
        twitterDescription="Get high-quality specialty painting services for your home or commercial space. Our professional painters deliver exceptional finishes with precision and durability."
        ogImage={PaintingBanner}
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
  );
};

export default SpecalityPaintingService;
