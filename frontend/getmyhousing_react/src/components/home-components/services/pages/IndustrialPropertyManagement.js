import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import {
  generateFaqSchema,
  generateSchema,
  services,
} from "../../../../common/common";
import { useParams } from "react-router-dom";
import IndustrialBanner from "../assets/industrial-property-management-service.jpg";
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import assessmentIcon from "../assets/icons/checklist.png"
import maintenanceIcon from "../assets/icons/customer-service.png"
import tenantIcon from "../assets/icons/house-owner.png"
import financeIcon from "../assets/icons/financial-profit.png"
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedIcon from '@mui/icons-material/Verified';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";

export const IndustrialPropertyManagement = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Industrial Property Management",
    heroSection: {
      heroTitle: "Optimize and Manage Your Industrial Property with Expert Solutions",
      heroTitleDes: "We provide comprehensive industrial property management services to maximize efficiency, maintain compliance, and enhance the value of your industrial space.",
      heroList: [
        "✅ End-to-End Property Management for Factories, Warehouses & Industrial Units",
        "✅ Regular Maintenance & Compliance with Safety Standards",
        "✅ Cost-Effective Solutions for Property Upkeep & Optimization",
        "✅ Tenant Management & Lease Administration Services"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Property Management Quote",
      bannerImage: IndustrialBanner, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Learn more about our industrial property management services and how we can assist you in maintaining and optimizing your property.",
      main: [
        {
          question: "What does industrial property management include?",
          answer: "Our services include facility maintenance, lease management, tenant coordination, property inspections, compliance monitoring, and financial management for industrial properties.",
        },
        {
          question: "Do you handle tenant management and lease agreements?",
          answer: "Yes, we manage tenant relations, lease agreements, rent collection, and ensure that your property remains occupied and profitable.",
        },
        {
          question: "How do you ensure industrial property compliance?",
          answer: "We stay updated with local and national safety regulations, conduct regular inspections, and implement necessary measures to ensure compliance with industrial standards.",
        },
        {
          question: "What is the cost of industrial property management?",
          answer: "Pricing varies based on property size, management scope, and specific service requirements. Contact us for a tailored quote based on your needs.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Industrial Property Management Services",
      titleDesc: "Fill out the form below to schedule a consultation and discuss how we can optimize and maintain your industrial property.",
    },
    ourProcess: {
      title: "How Our Industrial Property Management Works",
      titleDesc: "Our structured approach ensures smooth property operations, maintenance, and profitability.",
      main: [
        {
          title: "Property Assessment & Planning",
          icon: assessmentIcon, // Add actual icon path
          description: "We evaluate your industrial property’s current condition, occupancy status, and management needs to create a tailored plan.",
        },
        {
          title: "Facility Maintenance & Compliance",
          icon: maintenanceIcon, // Add actual icon path
          description: "Our team ensures regular upkeep, repairs, and adherence to industrial safety regulations and legal standards.",
        },
        {
          title: "Tenant & Lease Management",
          icon: tenantIcon, // Add actual icon path
          description: "We handle tenant acquisition, lease administration, rent collection, and tenant satisfaction to maintain occupancy rates.",
        },
        {
          title: "Financial Oversight & Reporting",
          icon: financeIcon, // Add actual icon path
          description: "We provide transparent financial management, budget planning, and regular reports to keep you informed about property performance.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "See what our satisfied clients say about our industrial property management services.",
      main: [
        {
          name: "Mark Roberts",
          feedback: "Their property management service has significantly improved our warehouse efficiency. From tenant management to maintenance, everything is handled professionally.",
          location: "Los Angeles, USA",
          image: "https://i.pravatar.cc/100?img=5",
        },
        {
          name: "Sophia Martinez",
          feedback: "We were struggling with compliance and maintenance issues, but their team took over and streamlined everything. Highly recommended for industrial property owners!",
          location: "New York, USA",
          image: "https://i.pravatar.cc/100?img=6",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Industrial Property Management Services?",
      titleDesc: "We provide reliable, cost-effective, and professional management solutions for industrial property owners.",
      main: [
        { icon: <BusinessIcon />, title: "Comprehensive Property Management" }, // End-to-end property solutions
        { icon: <VerifiedIcon />, title: "Regulatory Compliance & Safety Standards" }, // Ensuring legal & safety compliance
        { icon: <MonetizationOnIcon />, title: "Cost-Effective & Maximized ROI" }, // Smart management for profitability
        { icon: <SupportAgentIcon />, title: "24/7 Support & Professional Service" }, // Round-the-clock property assistance
      ],
    },
    subServices: {
      title: "Our Industrial Property Management Services",
      main: services[0].childService
        .filter((item) => item.title !== "Industrial Property Management"), // Customize based on available property management services
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Industrial Property Management Services", city);

  return (
    <>
      <Helmet
        title={`Industrial Property Management Service in ${city} | Get My Housing`}
        description="Ensure seamless industrial property management with expert services, including leasing, tenant management, maintenance, and compliance solutions."
        keywords="industrial property management, warehouse leasing, factory maintenance, tenant management, commercial real estate, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Industrial Property Management Service in ${city} | Get My Housing`}
        ogDescription="Ensure seamless industrial property management with expert services, including leasing, tenant management, maintenance, and compliance solutions."
        twitterTitle={`Industrial Property Management Service in ${city} | Get My Housing`}
        twitterDescription="Ensure seamless industrial property management with expert services, including leasing, tenant management, maintenance, and compliance solutions."
        ogImage={IndustrialBanner}
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