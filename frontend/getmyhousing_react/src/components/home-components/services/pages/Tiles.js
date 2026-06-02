import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import TilesService from "../assets/tiles-service.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import siteInspectionIcon from "../assets/icons/building.png";
import materialSelectionIcon from "../assets/icons/folder.png"
import tileInstallationIcon from "../assets/icons/installing.png"
import groutingIcon from "../assets/icons/grouting.png"
import GridOnIcon from '@mui/icons-material/GridOn';
import ConstructionIcon from '@mui/icons-material/Construction';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

const Tiles = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Tiles Installation & Repair",
    heroSection: {
      heroTitle: "Premium Tiles Installation & Repair Services",
      heroTitleDes: "Enhance your spaces with expert tile installation and repair services. From flooring to walls, we deliver precision, durability, and stunning aesthetics for your home and business.",
      heroList: [
        "✅ High-Quality Tile Installation & Replacement",
        "✅ Professional Tile Repair & Grout Restoration",
        "✅ Wide Range of Tiles for Homes & Offices",
        "✅ Affordable Pricing with Expert Craftsmanship"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Free Tiles Service Consultation",
      bannerImage: TilesService, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our tile installation, repair, and maintenance services.",
      main: [
        {
          question: "What types of tile services do you offer?",
          answer: "We specialize in tile installation, replacement, grout cleaning, regrouting, and repairing broken or chipped tiles for residential and commercial spaces."
        },
        {
          question: "Do you provide customized tile designs?",
          answer: "Yes, we offer a variety of tile styles, patterns, and layouts customized to match your interior and exterior aesthetics."
        },
        {
          question: "Can you repair cracked or damaged tiles?",
          answer: "Absolutely! We provide tile repair services, including fixing cracks, replacing broken tiles, and restoring grout lines."
        },
        {
          question: "How long does tile installation take?",
          answer: "The duration depends on the project size. A small room may take 1-2 days, while larger spaces or complex designs may take longer."
        },
        {
          question: "Do you offer waterproof tile installation?",
          answer: "Yes, we install waterproof tiles, perfect for bathrooms, kitchens, and outdoor areas to prevent water damage."
        }
      ]
    },
    enquirySection: {
      title: "Get in Touch for Professional Tile Services",
      titleDesc: "Fill out the form below to get expert consultation and a personalized quote for your tiling needs."
    },
    ourProcess: {
      title: "Our Tile Installation & Repair Process",
      titleDesc: "We follow a structured process to ensure flawless tile work with long-lasting results.",
      main: [
        {
          title: "Site Inspection & Measurement",
          icon: siteInspectionIcon, // Add actual icon path
          description: "We assess the space and take precise measurements for accurate tile placement."
        },
        {
          title: "Material Selection & Design",
          icon: materialSelectionIcon, // Add actual icon path
          description: "Choose from a wide range of tile options, including ceramic, porcelain, and mosaic."
        },
        {
          title: "Professional Tile Installation",
          icon: tileInstallationIcon, // Add actual icon path
          description: "Our skilled technicians ensure seamless installation with precision cutting and alignment."
        },
        {
          title: "Grouting & Finishing Touches",
          icon: groutingIcon, // Add actual icon path
          description: "We apply high-quality grout and sealants for durability and an elegant finish."
        }
      ]
    },
    testimonialSection: {
      title: "What Our Customers Say",
      titleDesc: "See how our tile installation and repair services have transformed homes and businesses.",
      main: [
        {
          name: "Rahul Mehta",
          feedback: "Amazing tile work! The team installed my kitchen backsplash perfectly, and it looks fantastic.",
          location: "Mumbai, India",
          image: "https://i.pravatar.cc/100?img=21"
        },
        {
          name: "Anjali Sharma",
          feedback: "They fixed my broken bathroom tiles seamlessly. The repair was quick, and my floor looks brand new.",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=22"
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Our Tile Services?",
      titleDesc: "We offer expert tile solutions with high-quality materials and precise craftsmanship.",
      main: [
        { icon: <GridOnIcon />, title: "Wide Range of Tile Designs" }, // Stylish tile options
        { icon: <ConstructionIcon />, title: "Expert Installation & Repair" }, // Skilled professionals
        { icon: <WaterDropIcon />, title: "Waterproof & Durable Solutions" }, // Long-lasting tiles
        { icon: <ThumbUpIcon />, title: "Affordable & Transparent Pricing" }, // No hidden costs
      ]
    }
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Tiles Installation & Repair Services", city);
  return (
    <>
      <Helmet
        title={`Tiles Fitting Service in ${city} | Get My Housing`}
        description="Get professional tiles fitting services for your home or commercial space. Our experts ensure high-quality installation for floors, walls, and more."
        keywords="tiles fitting, tile installation, floor tiles, wall tiles, professional tiling, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Tiles Fitting Service in ${city} | Get My Housing`}
        ogDescription="Get professional tiles fitting services for your home or commercial space. Our experts ensure high-quality installation for floors, walls, and more."
        twitterTitle={`Tiles Fitting Service in ${city} | Get My Housing`}
        twitterDescription="Get professional tiles fitting services for your home or commercial space. Our experts ensure high-quality installation for floors, walls, and more."
        ogImage={TilesService}
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

export default Tiles;
