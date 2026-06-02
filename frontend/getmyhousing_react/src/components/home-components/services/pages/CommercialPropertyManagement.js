import React from "react";
import { useParams } from "react-router-dom";
import { generateFaqSchema, generateSchema, services } from "../../../../common/common";
import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import commercial from "../assets/commercial-property-management-service.jpg";
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import evaluationIcon from "../assets/icons/checklist.png"
import leasingIcon from "../assets/icons/lease.png"
import maintenanceIcon from "../assets/icons/customer-service.png"
import ApartmentIcon from '@mui/icons-material/Apartment';
import SecurityIcon from '@mui/icons-material/Security';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Helmet from "../../../functional-component/Helmet";
import { config } from "../../../../config/config";
import { useCookies } from "react-cookie";

export const CommercialPropertyManagement = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Commercial Property Management",
    heroSection: {
      heroTitle: "Expert Commercial Property Management Services for Your Business",
      heroTitleDes: "Ensure the smooth operation and profitability of your commercial property with our expert property management services. We handle everything from leasing to maintenance, so you can focus on growing your business.",
      heroList: [
        "✅ Comprehensive Property Management for Offices, Retail, & Industrial Spaces",
        "✅ Full-Service Leasing, Maintenance, & Tenant Management",
        "✅ Transparent Pricing & No Hidden Fees",
        "✅ Reliable, Professional Service with a Focus on Your Property’s Success"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Commercial Property Management Service Quote",
      bannerImage: commercial, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our commercial property management services and how we can help maximize the value of your property.",
      main: [
        {
          question: "What commercial property management services do you offer?",
          answer: "We offer comprehensive property management services including tenant placement, lease administration, maintenance, rent collection, and property inspections to ensure the smooth operation of your commercial space.",
        },
        {
          question: "How do you handle tenant issues?",
          answer: "We provide efficient tenant management services, including handling maintenance requests, enforcing lease terms, and resolving disputes to ensure your property is well-maintained and your tenants are satisfied.",
        },
        {
          question: "Do you manage both office and retail properties?",
          answer: "Yes, we specialize in managing a variety of commercial properties, including office buildings, retail spaces, and industrial properties. We tailor our services to the specific needs of each property type.",
        },
        {
          question: "How much do your commercial property management services cost?",
          answer: "Our pricing is based on the size and complexity of your property. Contact us for a customized quote that meets your property management needs and budget.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Commercial Property Management Services",
      titleDesc: "Fill out the form below to request a free consultation and quote for your commercial property management needs. Let us handle the details while you focus on your business.",
    },
    ourProcess: {
      title: "How Our Commercial Property Management Service Works",
      titleDesc: "We ensure seamless property management with expert services from start to finish, tailored to meet the unique needs of your commercial property.",
      main: [
        {
          title: "Property Evaluation & Consultation",
          icon: evaluationIcon, // Add actual icon path
          description: "We begin with an in-depth evaluation of your property to assess its current condition and determine the best management strategies to increase its value.",
        },
        {
          title: "Tenant Placement & Leasing",
          icon: leasingIcon, // Add actual icon path
          description: "Our team helps you find the right tenants, handles lease agreements, and ensures proper leasing terms to maximize occupancy and rental income.",
        },
        {
          title: "Ongoing Property Maintenance & Management",
          icon: maintenanceIcon, // Add actual icon path
          description: "We provide regular maintenance services, inspections, and tenant management to ensure your property remains in excellent condition and compliant with regulations.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Read feedback from businesses who trust us to effectively manage their commercial properties, ensuring optimal performance and value.",
      main: [
        {
          name: "David Nelson",
          feedback: "The property management team has been fantastic in handling all aspects of our office building. Their prompt service and attention to detail have been key to keeping our tenants happy.",
          location: "San Francisco, USA",
          image: "https://i.pravatar.cc/100?img=7",
        },
        {
          name: "Jessica Brown",
          feedback: "We’ve had a great experience with their property management services for our retail space. They have ensured our property is well-maintained and tenants are satisfied.",
          location: "Chicago, USA",
          image: "https://i.pravatar.cc/100?img=8",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Commercial Property Management Services?",
      titleDesc: "We provide efficient, cost-effective, and comprehensive management solutions to ensure your commercial property operates smoothly and remains profitable.",
      main: [
        { icon: <ApartmentIcon />, title: "Comprehensive Property Management" }, // Full-service management for all property types
        { icon: <SecurityIcon />, title: "Reliable Tenant & Lease Management" }, // Secure leasing and tenant support
        { icon: <LocalOfferIcon />, title: "Affordable & Transparent Pricing" }, // No hidden fees, just clear quotes
        { icon: <AccessTimeIcon />, title: "Timely & Efficient Service" }, // Fast responses and minimal disruption to your property’s operations
      ],
    },
    subServices: {
      title: "Our Commercial Property Management Services",
      main: services[0].childService
        .filter((item) => item.title !== "Commercial Property Management"),
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Commercial Property Management Services", city);

  return (
    <>
      <Helmet
        title={`Get My Housing - Commercial Property Management Service ${city}`}
        description="Ensure seamless commercial property management with expert services including leasing, tenant management, and maintenance solutions."
        keywords="commercial property management, real estate services, tenant management, leasing solutions, property maintenance, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Get My Housing - Commercial Property Management Service ${city}`}
        ogDescription="Ensure seamless commercial property management with expert services including leasing, tenant management, and maintenance solutions."
        twitterTitle={`Get My Housing - Commercial Property Management Service ${city}`}
        twitterDescription="Ensure seamless commercial property management with expert services including leasing, tenant management, and maintenance solutions."
        ogImage={commercial}
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