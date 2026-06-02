import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import {
  generateFaqSchema,
  generateSchema,
  services,
} from "../../../../common/common";
import HeroSection from "../service-components/HeroSection";
import PaintingBanner from "../assets/painting-service.jpg"
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import PaletteIcon from '@mui/icons-material/Palette';
import BrushIcon from '@mui/icons-material/Brush';
import ScheduleIcon from "@mui/icons-material/Schedule";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import consultationIcon from "../assets/icons/conversation.png"
import preparationIcon from "../assets/icons/preparation.png"
import paintingIcon from "../assets/icons/paint-brush.png"
import cleanupIcon from "../assets/icons/data-cleanup.png"
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";

export const PaintingService = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Painting Services",
    heroSection: {
      heroTitle: "Transform Your Space with Professional Painting Services",
      heroTitleDes: "Give your home or office a fresh new look with our expert painting services. We provide high-quality interior and exterior painting solutions tailored to your style and needs.",
      heroList: [
        "✅ High-Quality Interior & Exterior Painting",
        "✅ Experienced Painters & Hassle-Free Service",
        "✅ Premium Paints for Long-Lasting Finish",
        "✅ Affordable Pricing & On-Time Completion"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Free Painting Estimate",
      bannerImage: PaintingBanner, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our painting services and how we can enhance your space.",
      main: [
        {
          question: "What types of painting services do you offer?",
          answer: "We provide interior and exterior painting for residential and commercial properties, including wall painting, textured painting, and waterproof coatings.",
        },
        {
          question: "How do I choose the right paint for my space?",
          answer: "Our experts will guide you in selecting the best paint type and finish based on your preferences, lighting, and surface conditions.",
        },
        {
          question: "How long does a painting project take?",
          answer: "The duration depends on the size of the project. Most interior painting jobs are completed in 1-3 days, while larger projects may take longer.",
        },
        {
          question: "Do you provide a warranty on your painting services?",
          answer: "Yes, we offer a satisfaction guarantee and warranty on our painting services for durability and quality assurance.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Professional Painting Services",
      titleDesc: "Fill out the form below to schedule a consultation and get a customized painting solution for your home or business.",
    },
    ourProcess: {
      title: "Our Painting Process",
      titleDesc: "We follow a step-by-step approach to ensure a flawless painting experience and long-lasting results.",
      main: [
        {
          title: "Consultation & Color Selection",
          icon: consultationIcon, // Add actual icon path
          description: "Our experts help you choose the perfect colors and finishes to match your style and space.",
        },
        {
          title: "Surface Preparation",
          icon: preparationIcon, // Add actual icon path
          description: "We clean and prepare surfaces by filling cracks, sanding, and priming for a smooth finish.",
        },
        {
          title: "Professional Painting",
          icon: paintingIcon, // Add actual icon path
          description: "Our skilled painters apply high-quality paint with precision and efficiency.",
        },
        {
          title: "Final Inspection & Cleanup",
          icon: cleanupIcon, // Add actual icon path
          description: "We ensure a spotless finish, clean up the space, and conduct a final quality check.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Customers Say",
      titleDesc: "See how our painting services have transformed homes and offices.",
      main: [
        {
          name: "Rahul Sharma",
          feedback: "Excellent painting service! The team was professional, and the results exceeded my expectations. My home looks brand new!",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=6",
        },
        {
          name: "Neha Verma",
          feedback: "Very happy with the painting work. The colors turned out great, and the finish is smooth. Highly recommended!",
          location: "Mumbai, India",
          image: "https://i.pravatar.cc/100?img=7",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Painting Services?",
      titleDesc: "We provide expert painting solutions with quality, precision, and reliability.",
      main: [
        { icon: <PaletteIcon />, title: "Premium Paints & Finishes" }, // High-quality materials
        { icon: <BrushIcon />, title: "Skilled & Experienced Painters" }, // Professional team
        { icon: <ScheduleIcon />, title: "Timely Completion & No Delays" }, // On-time service
        { icon: <ThumbUpIcon />, title: "Affordable Pricing & Satisfaction Guarantee" }, // Best value
      ],
    },
    subServices: {
      title: "Our Painting Services",
      main: services[1].childService, // Customize based on available painting services
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Painting Services", city);

  return (
    <>
      <Helmet
        title={`Painting Service in ${city} | Get My Housing`}
        description="Transform your home or office with our expert painting services. Get high-quality, long-lasting finishes with professional painters and premium materials."
        keywords="painting service, home painting, commercial painting, wall painting, professional painters, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Painting Service in ${city} | Get My Housing`}
        ogDescription="Transform your home or office with our expert painting services. Get high-quality, long-lasting finishes with professional painters and premium materials."
        twitterTitle={`Painting Service in ${city} | Get My Housing`}
        twitterDescription="Transform your home or office with our expert painting services. Get high-quality, long-lasting finishes with professional painters and premium materials."
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