import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import {
  generateFaqSchema,
  generateSchema,
  services
} from "../../../../common/common";
import { useParams } from "react-router-dom";
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import Residential from "../assets/residential-property-management-service.jpg"
import GppGoodIcon from '@mui/icons-material/GppGood';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddHomeIcon from '@mui/icons-material/AddHome';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import propertyEvaluationIcon from "../assets/icons/tax.png"
import tenantScreeningIcon from "../assets/icons/house-owner.png"
import rentCollectionIcon from "../assets/icons/lease.png"
import maintenanceIcon from "../assets/icons/customer-service.png"
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";

export const ResidentialPropertyManagement = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Residential Property Management",
    heroSection: {
      heroTitle: "Hassle-Free Property Management for Homeowners & Landlords",
      heroTitleDes: "We take care of everything—from tenant screening to rent collection and maintenance—so you can enjoy stress-free property ownership. Let us maximize your rental income while ensuring your home stays in top condition.",
      heroList: [
        "✅ Verified Tenants & Background Screening",
        "✅ Hassle-Free Rent Collection & Financial Reports",
        "✅ 24/7 Property Maintenance & Emergency Support",
        "✅ Legal Assistance & Compliance Management"
      ],
      heroButton: "Book Now",
      formTitle: "Get Expert Residential Property Management",
      bannerImage: Residential, // Replace with actual image
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our residential property management services.",
      main: [
        {
          question: "What does your residential property management service include?",
          answer: "We handle tenant placement, rent collection, property maintenance, legal compliance, and financial reporting to ensure your property is well-managed.",
        },
        {
          question: "How do you screen tenants for my property?",
          answer: "We conduct background checks, verify employment and rental history, and assess financial stability to ensure you get responsible tenants.",
        },
        {
          question: "What happens if a tenant doesn’t pay rent?",
          answer: "We follow up with tenants and take necessary legal actions if rent remains unpaid. Our team ensures timely resolution to minimize losses.",
        },
        {
          question: "Do you offer property maintenance services?",
          answer: "Yes, we provide 24/7 maintenance support, coordinate repairs, and schedule inspections to keep your property in top condition.",
        },
        {
          question: "Can you help with legal and compliance issues?",
          answer: "Absolutely! We stay updated with rental laws and handle lease agreements, eviction processes, and other legal matters.",
        },
        {
          question: "What are your property management fees?",
          answer: "Our pricing is flexible and depends on your property size and services required. Contact us for a customized quote.",
        },
        {
          question: "Do you manage furnished and unfurnished properties?",
          answer: "Yes, we manage both furnished and unfurnished properties, ensuring they are well-maintained and attract the right tenants.",
        },
        {
          question: "How do I get started with your property management services?",
          answer: "Simply reach out via our website or call us. We'll schedule a consultation and create a tailored management plan for your property.",
        },
      ]
    },
    enquirySection: {
      title: "Let’s Manage Your Property the Smart Way",
      titleDesc: "Fill out the form below, and our expert property managers will get in touch with you.",
    },
    ourProcess: {
      title: "Our Property Management Process",
      titleDesc: "We follow a structured approach to ensure your property remains profitable and well-maintained.",
      main: [
        {
          title: "Property Evaluation & Pricing",
          icon: propertyEvaluationIcon, // Replace with actual icon path
          description: "We assess your property and determine optimal rental pricing based on market trends.",
        },
        {
          title: "Tenant Screening & Leasing",
          icon: tenantScreeningIcon, // Replace with actual icon path
          description: "We find and verify tenants, handle lease agreements, and ensure smooth move-ins.",
        },
        {
          title: "Rent Collection & Financial Reports",
          icon: rentCollectionIcon, // Replace with actual icon path
          description: "We ensure on-time rent collection and provide detailed financial statements.",
        },
        {
          title: "24/7 Maintenance & Inspections",
          icon: maintenanceIcon, // Replace with actual icon path
          description: "We manage repairs, conduct inspections, and ensure your property stays in great condition.",
        },
      ]
    },
    testimonialSection: {
      title: "What Our Clients Say",
      titleDesc: "Hear from satisfied homeowners who trust us with their properties.",
      main: [
        {
          name: "Rajesh Malhotra",
          feedback: "Their team took complete control of my rental property, ensuring timely rent payments and maintenance. Great service!",
          location: "Mumbai, India",
          image: "https://i.pravatar.cc/100?img=6"
        },
        {
          name: "Neha Aggarwal",
          feedback: "I no longer worry about tenant issues or maintenance. They handle everything professionally!",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=8"
        },
        {
          name: "Ankit Sharma",
          feedback: "Managing my rental property remotely has never been easier. I receive regular updates and financial reports.",
          location: "Bangalore, India",
          image: "https://i.pravatar.cc/100?img=11"
        },
        {
          name: "Priyanka Mehta",
          feedback: "The best decision I made was to hire this team! My rental property is well-maintained, and I get rent on time.",
          location: "Pune, India",
          image: "https://i.pravatar.cc/100?img=14"
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Our Property Management Services?",
      titleDesc: "We ensure a hassle-free rental experience with expert management and transparent processes.",
      main: [
        { icon: <GppGoodIcon />, title: "Trusted & Secure Property Management" }, // Ensures property & tenant safety
        { icon: <PsychologyAltIcon />, title: "Expert Property Managers" }, // Professional guidance
        { icon: <SupportAgentIcon />, title: "24/7 Maintenance & Support" }, // Round-the-clock service
        { icon: <VerifiedIcon />, title: "Verified Tenants & Screening" }, // Ensures reliable tenants
        { icon: <AddHomeIcon />, title: "End-to-End Property Solutions" }, // Covers all property needs
        { icon: <CurrencyRupeeIcon />, title: "Transparent & Competitive Pricing" } // No hidden fees
      ]
    },
    subServices: {
      title: "Our Residential Property Management Services",
      main: services[0].childService
        .filter((item) => item.title !== "Residential Property Management")
    }
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Residential Property Management Services", city);
  return (
    <>
      <Helmet
        title={`Residential Property Management Service in ${city} | Get My Housing`}
        description="Get expert residential property management services for hassle-free renting, tenant management, maintenance, and more. Ensure seamless property operations with our professional services."
        keywords="property management, residential property, rental management, tenant management, property maintenance, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Residential Property Management Service in ${city} | Get My Housing`}
        ogDescription="Get expert residential property management services for hassle-free renting, tenant management, maintenance, and more. Ensure seamless property operations with our professional services."
        twitterTitle={`Residential Property Management Service in ${city} | Get My Housing`}
        twitterDescription="Get expert residential property management services for hassle-free renting, tenant management, maintenance, and more. Ensure seamless property operations with our professional services."
        ogImage={Residential}
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