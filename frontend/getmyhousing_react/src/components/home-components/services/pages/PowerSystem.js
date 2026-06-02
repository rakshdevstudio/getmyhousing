import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import PowerSystemService from "../assets/power-system-service.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import inspectionIcon from "../assets/icons/checked.png";
import designIcon from "../assets/icons/ruler.png"
import installationIcon from "../assets/icons/maintenance.png"
import maintenanceIcon from "../assets/icons/customer-service.png"
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

const PowerSystem = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Power System Services",
    heroSection: {
      heroTitle: "Reliable Power System Solutions for Your Home & Business",
      heroTitleDes: "Ensure uninterrupted power supply with our expert power system solutions. From installation to maintenance, we provide safe, efficient, and cost-effective services tailored to your needs.",
      heroList: [
        "✅ Comprehensive Power System Installation & Maintenance",
        "✅ Energy-Efficient & Sustainable Solutions",
        "✅ Certified Professionals & Guaranteed Reliability",
        "✅ Customized Plans at Affordable Pricing"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Free Power System Quote",
      bannerImage: PowerSystemService, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our power system services and how we can help you ensure reliable energy solutions.",
      main: [
        {
          question: "What types of power systems do you install?",
          answer: "We provide installation and maintenance for solar power systems, backup generators, inverters, and complete electrical setups.",
        },
        {
          question: "Are your power solutions energy efficient?",
          answer: "Yes, we offer eco-friendly, energy-efficient systems that help reduce electricity costs and promote sustainability.",
        },
        {
          question: "How often should power systems be maintained?",
          answer: "Regular maintenance is recommended at least once a year to ensure optimal performance and longevity.",
        },
        {
          question: "Do you offer warranties on installations?",
          answer: "Yes, we provide warranties on our power system installations and offer post-installation support for any issues.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Professional Power Solutions",
      titleDesc: "Fill out the form below to schedule an inspection and get a customized power system solution for your home or business.",
    },
    ourProcess: {
      title: "How Our Power System Service Works",
      titleDesc: "We follow a structured process to ensure a seamless and efficient power system installation and maintenance.",
      main: [
        {
          title: "Site Inspection & Energy Assessment",
          icon: inspectionIcon, // Add actual icon path
          description: "Our experts analyze your power needs and inspect your site to determine the best energy solutions.",
        },
        {
          title: "Custom Power System Design",
          icon: designIcon, // Add actual icon path
          description: "We develop a tailored power system design that meets your energy requirements and budget.",
        },
        {
          title: "Professional Installation & Setup",
          icon: installationIcon, // Add actual icon path
          description: "Our certified professionals handle the installation process with safety and efficiency.",
        },
        {
          title: "Ongoing Maintenance & Support",
          icon: maintenanceIcon, // Add actual icon path
          description: "We provide regular check-ups and maintenance to ensure the longevity and performance of your power system.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Customers Say",
      titleDesc: "See how our power system services have helped customers enjoy uninterrupted and efficient energy solutions.",
      main: [
        {
          name: "Rahul Mehta",
          feedback: "Their solar panel installation was smooth, and I’ve significantly reduced my electricity bills. Highly recommended!",
          location: "Bangalore, India",
          image: "https://i.pravatar.cc/100?img=20",
        },
        {
          name: "Sneha Kapoor",
          feedback: "Professional team and excellent service! They installed a backup generator in my factory, ensuring no downtime.",
          location: "Pune, India",
          image: "https://i.pravatar.cc/100?img=21",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Power System Services?",
      titleDesc: "We provide reliable, sustainable, and cost-effective power solutions for homes and businesses.",
      main: [
        { icon: <ElectricBoltIcon />, title: "Advanced Power Solutions" }, // Cutting-edge technology for energy efficiency
        { icon: <EnergySavingsLeafIcon />, title: "Sustainable & Eco-Friendly" }, // Reducing carbon footprint with green energy
        { icon: <EngineeringIcon />, title: "Certified & Skilled Technicians" }, // Expertise you can trust
        { icon: <PriceCheckIcon />, title: "Cost-Effective & Transparent Pricing" }, // No hidden costs
      ],
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Power System Services", city);
  return (
    <>
      <Helmet
        title={`Power System Service in ${city} | Get My Housing`}
        description="Get reliable power system services, including solar installations, backup power solutions, and energy management for residential and commercial properties."
        keywords="power system, solar energy, backup power, energy solutions, renewable energy, power management, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Power System Service in ${city} | Get My Housing`}
        ogDescription="Get reliable power system services, including solar installations, backup power solutions, and energy management for residential and commercial properties."
        twitterTitle={`Power System Service in ${city} | Get My Housing`}
        twitterDescription="Get reliable power system services, including solar installations, backup power solutions, and energy management for residential and commercial properties."
        ogImage={PowerSystemService}
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

export default PowerSystem;
