import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import {
  generateFaqSchema,
  generateSchema,
  services,
} from "../../../../common/common";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import BrushIcon from '@mui/icons-material/Brush';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PaintingBanner from "../assets/interior-painting-service.jpg"
import SpeedIcon from '@mui/icons-material/Speed';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import prepIcon from "../assets/icons/screwdriver.png"
import colorIcon from "../assets/icons/color-selection.png"
import paintIcon from "../assets/icons/paint-roller.png"
import cleanupIcon from "../assets/icons/data-cleanup.png"
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import HeroSection from "../service-components/HeroSection";

export const InteriorPaintingService = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Interior Painting Services",
    heroSection: {
      heroTitle: "Revitalize Your Space with Professional Interior Painting",
      heroTitleDes: "Transform your home or workspace with high-quality interior painting services. Our expert painters ensure a flawless finish with durable, vibrant colors tailored to your style.",
      heroList: [
        "✅ Premium-Quality Paints & Expert Application",
        "✅ Smooth, Long-Lasting & Even Finishes",
        "✅ Color Consultation & Custom Color Matching",
        "✅ Minimal Disruption & Quick Turnaround Time"
      ],
      heroButton: "Book Now",
      formTitle: "Request an Interior Painting Estimate",
      bannerImage: PaintingBanner, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Learn more about our interior painting services and how we can give your space a fresh, new look.",
      main: [
        {
          question: "What types of interior painting do you offer?",
          answer: "We provide wall painting, ceiling painting, accent walls, textured finishes, and complete interior repainting for homes, offices, and commercial spaces.",
        },
        {
          question: "How long does an interior painting project take?",
          answer: "The duration depends on the project size, surface conditions, and paint type. Typically, a single room takes 1-2 days, while larger projects may take longer.",
        },
        {
          question: "Do you provide color consultation services?",
          answer: "Yes! Our experts help you choose the perfect colors and finishes to match your style and space requirements.",
        },
        {
          question: "Is there a mess during the painting process?",
          answer: "We ensure a clean and organized work process with proper masking, covering, and post-painting cleanup to minimize disruption.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Professional Interior Painting",
      titleDesc: "Fill out the form below to schedule a consultation and get a customized painting solution for your home or office.",
    },
    ourProcess: {
      title: "How Our Interior Painting Service Works",
      titleDesc: "Our streamlined process ensures a hassle-free painting experience with exceptional results.",
      main: [
        {
          title: "Surface Preparation & Protection",
          icon: prepIcon, // Add actual icon path
          description: "We prep walls, repair damages, and cover furniture to ensure a smooth and clean painting process.",
        },
        {
          title: "Color Selection & Priming",
          icon: colorIcon, // Add actual icon path
          description: "Choose from a variety of premium paints, and we apply primer to ensure vibrant and long-lasting color.",
        },
        {
          title: "Professional Painting & Finishing",
          icon: paintIcon, // Add actual icon path
          description: "Our skilled painters use high-quality tools and techniques for an even, flawless finish.",
        },
        {
          title: "Cleanup & Final Inspection",
          icon: cleanupIcon, // Add actual icon path
          description: "We remove all coverings, clean up, and conduct a final quality check to ensure perfection.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "See what our satisfied clients say about our interior painting services.",
      main: [
        {
          name: "Emily Johnson",
          feedback: "The team did a fantastic job painting our living room. The colors look amazing, and the finish is flawless!",
          location: "Los Angeles, USA",
          image: "https://i.pravatar.cc/100?img=7",
        },
        {
          name: "Michael Smith",
          feedback: "We hired them for an office repaint, and the results were outstanding. Professional, clean, and quick service!",
          location: "New York, USA",
          image: "https://i.pravatar.cc/100?img=8",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Interior Painting Services?",
      titleDesc: "We provide expert craftsmanship, premium materials, and a seamless painting experience.",
      main: [
        { icon: <BrushIcon />, title: "Skilled & Experienced Painters" }, // Expertise in painting techniques
        { icon: <ColorLensIcon />, title: "Premium Paints & Custom Colors" }, // High-quality materials
        { icon: <SpeedIcon />, title: "Quick Turnaround & Minimal Disruption" }, // Fast & efficient service
        { icon: <EnergySavingsLeafIcon />, title: "Eco-Friendly & Low-VOC Paints Available" }, // Safe & sustainable options
      ],
    },
    subServices: {
      title: "Our Interior Painting Services",
      main: services[1].childService
        .filter((item) => item.title !== "Interior Painting Service"), // Customize based on available painting services
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Interior Painting Services", city);

  return (
    <>
      <Helmet
        title={`Interior Painting Service in ${city} | Get My Housing`}
        description="Give your home or office a fresh look with expert interior painting services. High-quality paints, smooth finishes, and professional craftsmanship."
        keywords="interior painting, wall painting, house painting, home decor, commercial painting, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Interior Painting Service in ${city} | Get My Housing`}
        ogDescription="Give your home or office a fresh look with expert interior painting services. High-quality paints, smooth finishes, and professional craftsmanship."
        twitterTitle={`Interior Painting Service in ${city} | Get My Housing`}
        twitterDescription="Give your home or office a fresh look with expert interior painting services. High-quality paints, smooth finishes, and professional craftsmanship."
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