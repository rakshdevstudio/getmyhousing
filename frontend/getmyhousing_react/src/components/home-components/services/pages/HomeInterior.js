import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import {
  generateFaqSchema,
  generateSchema,
  services
} from "../../../../common/common";
import HomeInteriorImage from "../assets/home-interior-service.jpg"
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png"
import planningIcon from "../assets/icons/planning.png"
import renovationIcon from "../assets/icons/home-maintenance.png"
import stylingIcon from "../assets/icons/dinning-table.png"
import HomeIcon from "@mui/icons-material/Home";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";


export const HomeInterior = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Home Interior Services",
    heroSection: {
      heroTitle: "Transform Your Home with Expert Interior Design and Renovation Services",
      heroTitleDes: "Create the home of your dreams with our professional interior design and renovation services. From modern designs to classic touches, we offer personalized solutions for every style and budget.",
      heroList: [
        "✅ Expert Interior Design & Renovation Services for Every Room",
        "✅ High-Quality Materials & Craftsmanship",
        "✅ Affordable & Customizable Design Solutions",
        "✅ Timely Completion with Minimal Disruption"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Home Interior Design Quote",
      bannerImage: HomeInteriorImage, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Learn more about our home interior services and how we can help you bring your vision to life.",
      main: [
        {
          question: "What home interior services do you offer?",
          answer: "We provide a full range of home interior services, including design consultations, space planning, remodeling, furniture selection, custom cabinetry, and more. We focus on creating personalized spaces that reflect your style and needs.",
        },
        {
          question: "Do you handle large renovation projects?",
          answer: "Yes, we specialize in both small updates and large-scale home renovations, ensuring high-quality work regardless of project size.",
        },
        {
          question: "How do I get started with my interior design project?",
          answer: "Getting started is easy! Simply contact us for a consultation, and our expert designers will work with you to understand your needs, preferences, and budget to create a plan that brings your vision to life.",
        },
        {
          question: "What is the cost of interior design services?",
          answer: "Pricing depends on the size and scope of your project. We offer customized quotes based on your requirements. Contact us for a free consultation and personalized estimate.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Your Home Interior Project",
      titleDesc: "Fill out the form below to request a free consultation for your interior design and renovation needs. Let's create the perfect space for your home.",
    },
    ourProcess: {
      title: "How Our Home Interior Service Works",
      titleDesc: "Our step-by-step process ensures a seamless experience from consultation to final touches.",
      main: [
        {
          title: "Initial Consultation & Design Planning",
          icon: consultationIcon, // Add actual icon path
          description: "We begin by discussing your vision, style preferences, and functional needs to create a personalized design plan tailored to your space and budget.",
        },
        {
          title: "Space Planning & Material Selection",
          icon: planningIcon, // Add actual icon path
          description: "Our team helps you select the right materials, furniture, and colors, ensuring they align with your design goals and enhance the overall look and feel of your space.",
        },
        {
          title: "Renovation & Customization",
          icon: renovationIcon, // Add actual icon path
          description: "Our skilled professionals execute the design, handling renovations, custom cabinetry, and any necessary changes to ensure your space is transformed to perfection.",
        },
        {
          title: "Final Touches & Styling",
          icon: stylingIcon, // Add actual icon path
          description: "Once the renovation is complete, we add the finishing touches, such as decor, lighting, and furniture placement, to make your space functional and beautiful.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Read testimonials from our happy clients who trusted us to transform their homes with expert design and renovation services.",
      main: [
        {
          name: "Emily Davis",
          feedback: "The team did an incredible job transforming our living room! Their design ideas were spot on, and the attention to detail was amazing. Highly recommend their services.",
          location: "Chicago, USA",
          image: "https://i.pravatar.cc/100?img=1",
        },
        {
          name: "David Wilson",
          feedback: "Our kitchen remodel was a dream come true. From design to execution, the team was professional, timely, and delivered exactly what we envisioned.",
          location: "Dallas, USA",
          image: "https://i.pravatar.cc/100?img=2",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Home Interior Services?",
      titleDesc: "We offer high-quality, customizable design solutions that fit your style, needs, and budget, transforming your house into the perfect home.",
      main: [
        { icon: <HomeIcon />, title: "Personalized Design for Every Space" }, // Tailored designs for your home
        { icon: <DesignServicesIcon />, title: "High-Quality Materials & Craftsmanship" }, // Premium materials for lasting results
        { icon: <CurrencyRupeeIcon />, title: "Affordable & Transparent Pricing" }, // Clear quotes with no hidden fees
        { icon: <AccessTimeIcon />, title: "Timely Completion & Professional Service" }, // Efficient project execution with minimal disruption
      ],
    },
    subServices: {
      title: "Our Home Interior Services",
      main: services[2].childService,
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Home Interior Services", city);

  return (
    <>
      <Helmet
        title={`Home Interior Service in ${city} | Get My Housing`}
        description="Transform your living space with expert home interior services. From modern designs to functional layouts, we create beautiful and comfortable interiors."
        keywords="home interior, interior design, home renovation, modular kitchen, living room design, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Home Interior Service in ${city} | Get My Housing`}
        ogDescription="Transform your living space with expert home interior services. From modern designs to functional layouts, we create beautiful and comfortable interiors."
        twitterTitle={`Home Interior Service in ${city} | Get My Housing`}
        twitterDescription="Transform your living space with expert home interior services. From modern designs to functional layouts, we create beautiful and comfortable interiors."
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