import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import {
  generateFaqSchema,
  generateSchema,
  services,
} from "../../../../common/common";
import HomeInteriorImage from "../assets/industrial-interior-service.jpg"
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import FactoryIcon from '@mui/icons-material/Factory';
import BuildIcon from '@mui/icons-material/Build';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import assessmentIcon from "../assets/icons/checklist.png"
import designIcon from "../assets/icons/ruler.png"
import executionIcon from "../assets/icons/process.png"
import qualityCheckIcon from "../assets/icons/quality-control.png"
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";

export const IndustrialInteriorService = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Industrial Interior Services",
    heroSection: {
      heroTitle: "Transform Your Industrial Space with Expert Interior Solutions",
      heroTitleDes: "Enhance your industrial workspace with our professional interior design and renovation services. We create functional, efficient, and aesthetically appealing environments tailored to your business needs.",
      heroList: [
        "✅ Customized Interior Solutions for Factories, Warehouses & Offices",
        "✅ High-Quality, Durable Materials for Industrial Environments",
        "✅ Efficient Space Planning & Functional Design",
        "✅ On-Time Project Completion with Minimal Downtime"
      ],
      heroButton: "Book Now",
      formTitle: "Request an Industrial Interior Design Quote",
      bannerImage: HomeInteriorImage, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Learn more about our industrial interior services and how we can enhance your workspace.",
      main: [
        {
          question: "What types of industrial spaces do you design?",
          answer: "We provide interior design services for warehouses, factories, production plants, commercial offices, R&D labs, and other industrial spaces. Our designs focus on maximizing efficiency, safety, and aesthetics.",
        },
        {
          question: "Do you handle industrial renovation projects?",
          answer: "Yes, we specialize in both new industrial interior design and renovation of existing spaces to improve functionality, workflow, and compliance with safety standards.",
        },
        {
          question: "How do I start my industrial interior project?",
          answer: "Simply contact us for a consultation. Our team will assess your needs, analyze your space, and propose a design plan that optimizes your industrial operations.",
        },
        {
          question: "What are the costs involved in industrial interior design?",
          answer: "Costs vary based on project scope, materials, and customization. We offer competitive pricing with transparent estimates to fit your budget.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Your Industrial Interior Needs",
      titleDesc: "Fill out the form below to schedule a consultation and get a customized interior design solution for your industrial space.",
    },
    ourProcess: {
      title: "How Our Industrial Interior Design Service Works",
      titleDesc: "Our structured process ensures an optimized industrial workspace with a focus on efficiency, durability, and aesthetics.",
      main: [
        {
          title: "Needs Assessment & Space Planning",
          icon: assessmentIcon, // Add actual icon path
          description: "We evaluate your industrial space, business needs, and operational requirements to develop an optimized layout.",
        },
        {
          title: "Design & Material Selection",
          icon: designIcon, // Add actual icon path
          description: "Our team selects high-quality, durable materials and ergonomic designs suited for industrial environments.",
        },
        {
          title: "Execution & Installation",
          icon: executionIcon, // Add actual icon path
          description: "We execute the interior transformation, ensuring all installations meet industrial safety standards and operational efficiency.",
        },
        {
          title: "Final Inspection & Handover",
          icon: qualityCheckIcon, // Add actual icon path
          description: "We conduct a thorough quality check to ensure the space meets your expectations before the final handover.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "See what our satisfied clients have to say about our industrial interior design services.",
      main: [
        {
          name: "John Carter",
          feedback: "Our warehouse redesign was completed on time and exceeded our expectations. The space is now more functional and optimized for productivity.",
          location: "Houston, USA",
          image: "https://i.pravatar.cc/100?img=3",
        },
        {
          name: "Lisa Thompson",
          feedback: "The interior transformation of our factory has improved workflow efficiency significantly. The team was professional and delivered a high-quality finish.",
          location: "Chicago, USA",
          image: "https://i.pravatar.cc/100?img=4",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Industrial Interior Services?",
      titleDesc: "We provide top-quality, durable, and efficient industrial interior solutions tailored to your business needs.",
      main: [
        { icon: <FactoryIcon />, title: "Tailored Designs for Industrial Spaces" }, // Custom industrial interiors
        { icon: <BuildIcon />, title: "High-Quality, Durable Materials" }, // Long-lasting industrial-grade materials
        { icon: <EngineeringIcon />, title: "Compliance with Safety Standards" }, // Ensuring regulatory compliance
        { icon: <AccessTimeIcon />, title: "Timely Completion & Minimal Downtime" }, // Efficient project execution
      ],
    },
    subServices: {
      title: "Our Industrial Interior Services",
      main: services[2].childService
        .filter((item) => item.title !== "Industrial Interior Service"), // Customize based on available industrial services
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Industrial Interior Services", city);
  return (
    <>
      <Helmet
        title={`Industrial Interior Service in ${city} | Get My Housing`}
        description="Enhance your industrial space with expert interior solutions. We design functional, durable, and aesthetic interiors for factories, warehouses, and offices."
        keywords="industrial interior, warehouse design, factory interiors, commercial interiors, industrial space planning, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Industrial Interior Service in ${city} | Get My Housing`}
        ogDescription="Enhance your industrial space with expert interior solutions. We design functional, durable, and aesthetic interiors for factories, warehouses, and offices."
        twitterTitle={`Industrial Interior Service in ${city} | Get My Housing`}
        twitterDescription="Enhance your industrial space with expert interior solutions. We design functional, durable, and aesthetic interiors for factories, warehouses, and offices."
        ogImage={HomeInteriorImage}
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