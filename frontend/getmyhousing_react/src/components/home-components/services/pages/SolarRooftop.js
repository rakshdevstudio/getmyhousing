import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import Solar from "../assets/solar-rooftop.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import assessmentIcon from "../assets/icons/checklist.png"
import systemDesignIcon from "../assets/icons/ruler.png"
import installationIcon from "../assets/icons/maintenance.png"
import gridConnectionIcon from "../assets/icons/smart-grid.png"
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

const SolarRooftop = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Solar Rooftop Service",
    heroSection: {
      heroTitle: "Power Your Home & Business with Clean Solar Energy",
      heroTitleDes: "Switch to solar energy and reduce your electricity bills while contributing to a greener planet. Our expert solar rooftop solutions offer high efficiency, durability, and affordability for homes and businesses.",
      heroList: [
        "✅ High-Efficiency Solar Panels for Maximum Savings",
        "✅ Customized Solutions for Homes & Businesses",
        "✅ Hassle-Free Installation & Maintenance",
        "✅ Government Subsidies & Financing Options Available"
      ],
      heroButton: "Book Now",
      formTitle: "Book Your Free Solar Rooftop Consultation",
      bannerImage: Solar, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Get answers to common questions about our solar rooftop solutions and how you can benefit from clean energy.",
      main: [
        {
          question: "How much can I save with solar rooftop panels?",
          answer: "Savings depend on your energy consumption, location, and panel efficiency. Most homeowners save 50-80% on their electricity bills.",
        },
        {
          question: "Do you provide financing or government subsidy assistance?",
          answer: "Yes, we assist in availing government subsidies and provide flexible financing options to make solar affordable.",
        },
        {
          question: "How long does solar installation take?",
          answer: "Installation typically takes 3-5 days, depending on the system size and site conditions.",
        },
        {
          question: "What is the lifespan of solar panels?",
          answer: "Our high-quality solar panels last 25+ years with minimal maintenance, offering a long-term return on investment.",
        },
        {
          question: "Will my solar system work during power cuts?",
          answer: "Grid-connected systems do not work during power outages, but hybrid and off-grid systems with battery storage can provide backup power.",
        }
      ],
    },
    enquirySection: {
      title: "Start Your Solar Journey Today",
      titleDesc: "Fill out the form below, and our solar experts will guide you through the process of switching to clean energy.",
    },
    ourProcess: {
      title: "Our Solar Rooftop Installation Process",
      titleDesc: "We follow a streamlined process to ensure a smooth transition to solar power.",
      main: [
        {
          title: "Site Assessment & Consultation",
          icon: assessmentIcon, // Add actual icon path
          description: "Our team evaluates your roof space and energy needs to design the best solar solution.",
        },
        {
          title: "Customized System Design",
          icon: systemDesignIcon, // Add actual icon path
          description: "We create a tailored solar panel layout to maximize efficiency and savings.",
        },
        {
          title: "Installation & Setup",
          icon: installationIcon, // Add actual icon path
          description: "Our certified technicians ensure a hassle-free and high-quality installation.",
        },
        {
          title: "Grid Connection & Maintenance",
          icon: gridConnectionIcon, // Add actual icon path
          description: "We handle approvals, connect your system to the grid, and offer ongoing support.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Customers Say",
      titleDesc: "See how our solar solutions have helped customers save money and contribute to a greener future.",
      main: [
        {
          name: "Rajesh Malhotra",
          feedback: "Switching to solar was the best decision! My electricity bill has dropped significantly, and the installation process was seamless.",
          location: "Mumbai, India",
          image: "https://i.pravatar.cc/100?img=17",
        },
        {
          name: "Neha Sharma",
          feedback: "The team provided excellent support throughout the installation. Now, I generate my own power and save every month!",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=18",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Solar Rooftop Services?",
      titleDesc: "We provide efficient, affordable, and hassle-free solar solutions tailored to your energy needs.",
      main: [
        { icon: <SolarPowerIcon />, title: "High-Efficiency Solar Panels" }, // Maximum energy savings
        { icon: <MonetizationOnIcon />, title: "Cost Savings & Government Subsidies" }, // Financial benefits
        { icon: <HandshakeIcon />, title: "End-to-End Service & Maintenance" }, // Complete solar solutions
        { icon: <EnergySavingsLeafIcon />, title: "Sustainable & Eco-Friendly Energy" }, // Clean energy for a greener future
      ],
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Solar Rooftop Services", city);

  return (
    <>
      <Helmet
        title={`Solar Rooftop Service in ${city} | Get My Housing`}
        description="Harness the power of solar energy with our expert rooftop solar panel installation. Reduce electricity costs and promote a sustainable future."
        keywords="solar rooftop, solar energy, solar panel installation, renewable energy, sustainable living, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Solar Rooftop Service in ${city} | Get My Housing`}
        ogDescription="Harness the power of solar energy with our expert rooftop solar panel installation. Reduce electricity costs and promote a sustainable future."
        twitterTitle={`Solar Rooftop Service in ${city} | Get My Housing`}
        twitterDescription="Harness the power of solar energy with our expert rooftop solar panel installation. Reduce electricity costs and promote a sustainable future."
        ogImage={Solar}
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

export default SolarRooftop;
