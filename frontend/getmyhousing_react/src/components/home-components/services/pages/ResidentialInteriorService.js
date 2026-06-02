import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import {
  generateFaqSchema,
  generateSchema,
  services,
} from "../../../../common/common";
import HomeInteriorImage from "../assets/residential-interior-service.jpg"
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import BuildIcon from '@mui/icons-material/Build';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import consultationIcon from "../assets/icons/conversation.png"
import visualizationIcon from "../assets/icons/eye.png"
import materialSelectionIcon from "../assets/icons/folder.png"
import handoverIcon from "../assets/icons/giving.png"
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";

const ResidentialInteriorService = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Residential Interior Design",
    heroSection: {
      heroTitle: "Transform Your Home with Stunning Interior Designs",
      heroTitleDes: "Bring elegance, functionality, and comfort to your living space with our expert interior design services. Whether you need a modern, classic, or customized look, we create spaces that reflect your style.",
      heroList: [
        "✅ Customized Interior Designs for Every Space",
        "✅ Premium Quality Materials & Finishes",
        "✅ End-to-End Design & Execution",
        "✅ Affordable Pricing & On-Time Delivery"
      ],
      heroButton: "Book Now",
      formTitle: "Book Your Free Interior Design Consultation",
      bannerImage: HomeInteriorImage, // Replace with actual image
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our residential interior design services.",
      main: [
        {
          question: "What interior design styles do you offer?",
          answer: "We specialize in modern, contemporary, traditional, minimalist, and custom designs to match your vision.",
        },
        {
          question: "Do you provide end-to-end interior solutions?",
          answer: "Yes! From space planning and 3D visualization to furniture selection and execution, we handle everything.",
        },
        {
          question: "Can I customize my interior design?",
          answer: "Absolutely! Our designers work closely with you to create personalized interiors that suit your taste and lifestyle.",
        },
        {
          question: "What is the estimated cost for home interiors?",
          answer: "The cost varies based on design complexity, materials, and space size. We offer flexible packages to fit different budgets.",
        },
        {
          question: "How long does the interior design process take?",
          answer: "On average, it takes 4-8 weeks depending on the project scope and customization requirements.",
        },
        {
          question: "Do you offer modular kitchen and wardrobe solutions?",
          answer: "Yes, we design and install premium-quality modular kitchens, wardrobes, and customized furniture.",
        },
        {
          question: "How do I get started with your interior design services?",
          answer: "Simply contact us through our website or call us. Our team will schedule a consultation to discuss your requirements.",
        },
      ]
    },
    enquirySection: {
      title: "Let's Create Your Dream Home",
      titleDesc: "Fill out the form below, and our expert designers will get in touch with you.",
    },
    ourProcess: {
      title: "Our Interior Design Process",
      titleDesc: "We follow a structured process to ensure a smooth and hassle-free interior transformation.",
      main: [
        {
          title: "Consultation & Concept Planning",
          icon: consultationIcon, // Replace with actual icon path
          description: "Our designers understand your vision, preferences, and budget to create a tailored design plan.",
        },
        {
          title: "3D Visualization & Design Finalization",
          icon: visualizationIcon, // Replace with actual icon path
          description: "Get a realistic 3D view of your space before finalizing the design.",
        },
        {
          title: "Material Selection & Execution",
          icon: materialSelectionIcon, // Replace with actual icon path
          description: "Choose from a wide range of premium materials, furniture, and decor elements.",
        },
        {
          title: "On-Time Delivery & Handover",
          icon: handoverIcon, // Replace with actual icon path
          description: "We ensure a seamless execution and deliver your dream interiors on time.",
        },
      ]
    },
    testimonialSection: {
      title: "What Our Clients Say",
      titleDesc: "Hear from our happy homeowners about their interior design experience.",
      main: [
        {
          name: "Rohit Mehra",
          feedback: "The interior design exceeded my expectations! My home looks elegant and feels so comfortable.",
          location: "Mumbai, India",
          image: "https://i.pravatar.cc/100?img=7"
        },
        {
          name: "Sneha Kapoor",
          feedback: "Highly professional team! They handled everything from design to execution with perfection.",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=10"
        },
        {
          name: "Amit Gupta",
          feedback: "Loved the modular kitchen and wardrobe designs! The quality and finishing are top-notch.",
          location: "Bangalore, India",
          image: "https://i.pravatar.cc/100?img=9"
        },
        {
          name: "Priya Sharma",
          feedback: "Affordable yet premium-quality interiors! The 3D visualization helped me finalize my dream home design.",
          location: "Pune, India",
          image: "https://i.pravatar.cc/100?img=12"
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Our Interior Design Services?",
      titleDesc: "We blend creativity, functionality, and affordability to deliver stunning interior spaces.",
      main: [
        { icon: <DesignServicesIcon />, title: "Bespoke Interior Designs" }, // Personalized solutions
        { icon: <EmojiObjectsIcon />, title: "Innovative 3D Visualizations" }, // Realistic design previews
        { icon: <BuildIcon />, title: "Expert Craftsmanship" }, // High-quality materials & finishing
        { icon: <AlarmOnIcon />, title: "On-Time Project Delivery" }, // Timely completion
        { icon: <WorkspacePremiumIcon />, title: "Premium-Quality Materials" }, // Durable and stylish designs
        { icon: <CurrencyRupeeIcon />, title: "Affordable Pricing & No Hidden Costs" } // Transparent pricing
      ]
    },
    subServices: {
      title: "Our Interior Design Services",
      main: services[2].childService
        .filter((item) => item.title !== "Residential Interior Service")
    }
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Residential Interior Services", city);

  return (
    <>
      <Helmet
        title={`Residential Interior Service in ${city} | Get My Housing`}
        description="Transform your home with expert residential interior design services. Get stylish, functional, and personalized interiors for your dream living space."
        keywords="interior design, home interiors, residential interiors, interior decoration, home renovation, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Residential Interior Service in ${city} | Get My Housing`}
        ogDescription="Transform your home with expert residential interior design services. Get stylish, functional, and personalized interiors for your dream living space."
        twitterTitle={`Residential Interior Service in ${city} | Get My Housing`}
        twitterDescription="Transform your home with expert residential interior design services. Get stylish, functional, and personalized interiors for your dream living space."
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

export default ResidentialInteriorService;
