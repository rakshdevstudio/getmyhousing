import React, { useEffect } from "react";
import { generateFaqSchema, generateSchema, services } from "../../../../common/common";
import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import HomeInteriorImage from "../assets/commercial-interior-service.jpg"
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png"
import designIcon from "../assets/icons/ruler.png"
import installationIcon from "../assets/icons/maintenance.png"
import BuildIcon from '@mui/icons-material/Build';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";

export const CommercialInteriorService = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Commercial Interior",
    heroSection: {
      heroTitle: "Transform Your Commercial Space with Expert Interior Services",
      heroTitleDes: "Enhance your business environment with our professional interior design and fit-out services. We specialize in creating functional, aesthetic, and efficient commercial spaces.",
      heroList: [
        "✅ Customized Interior Design Solutions",
        "✅ High-Quality Office Fit-Outs & Renovations",
        "✅ Affordable Pricing & Transparent Costs",
        "✅ Fast, Reliable, & Professional Service"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Commercial Interior Service Quote",
      bannerImage: HomeInteriorImage, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our commercial interior services and how we can help enhance your business space.",
      main: [
        {
          question: "What commercial interior services do you offer?",
          answer: "We provide a wide range of services including office fit-outs, commercial renovations, space planning, and interior design tailored to your business needs.",
        },
        {
          question: "Can you help with designing an office space?",
          answer: "Yes, we specialize in designing modern and functional office spaces that improve productivity and reflect your brand’s identity.",
        },
        {
          question: "How do I know if my business needs commercial interior services?",
          answer: "If your office or commercial space feels outdated, lacks functionality, or doesn’t align with your brand, it may be time for a professional redesign or renovation.",
        },
        {
          question: "How much do your commercial interior services cost?",
          answer: "Our pricing depends on the size and complexity of the project. Contact us for a personalized quote based on your business requirements.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Commercial Interior Services",
      titleDesc: "Fill out the form below to request a free consultation and quote for your commercial interior project. Let’s create a space that enhances your business.",
    },
    ourProcess: {
      title: "How Our Commercial Interior Service Works",
      titleDesc: "We ensure a smooth process from initial consultation to final installation with our expert interior services.",
      main: [
        {
          title: "Consultation & Planning",
          icon: consultationIcon, // Add actual icon path
          description: "We work closely with you to understand your vision, business needs, and design preferences, ensuring your space is functional and stylish.",
        },
        {
          title: "Design & Concept Development",
          icon: designIcon, // Add actual icon path
          description: "Our designers create a tailored concept with mood boards, layout plans, and visualizations, ensuring alignment with your brand and objectives.",
        },
        {
          title: "Construction & Installation",
          icon: installationIcon, // Add actual icon path
          description: "We manage the fit-out and construction process, ensuring quality craftsmanship and timely delivery for a seamless transformation.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Read feedback from businesses who trust us to create functional and stylish commercial spaces that reflect their brand and boost productivity.",
      main: [
        {
          name: "John Carter",
          feedback: "The commercial interior team helped us design a modern office that reflects our company culture. The results were amazing, and our employees love the new space!",
          location: "Chicago, USA",
          image: "https://i.pravatar.cc/100?img=3",
        },
        {
          name: "Sara Lee",
          feedback: "We had our office completely renovated, and the transformation was beyond our expectations. The team delivered on time, and the design exceeded our vision.",
          location: "Miami, USA",
          image: "https://i.pravatar.cc/100?img=4",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Commercial Interior Services?",
      titleDesc: "We specialize in creating inspiring and functional commercial spaces that boost productivity, brand identity, and employee satisfaction.",
      main: [
        { icon: <HomeWorkIcon />, title: "Tailored Interior Design Solutions" }, // Customized designs that suit your business needs
        { icon: <BuildIcon />, title: "High-Quality Fit-Outs & Renovations" }, // Quality materials and expert craftsmanship
        { icon: <LocalOfferIcon />, title: "Affordable & Transparent Pricing" }, // No hidden fees, just clear quotes
        { icon: <AccessTimeIcon />, title: "Timely & Efficient Execution" }, // On-time project completion with minimal disruption
      ],
    },
    subServices: {
      title: "Our Property Management Services",
      main: services[2].childService
        .filter((item) => item.title !== "Commercial Interior Service"),
    }
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Commercial Interior Services", city);
  return (
    <>
      <Helmet
        title={`Commercial Interior Service in ${city} | Get My Housing`}
        description="Transform your commercial space with expert interior design services. From office spaces to retail stores, we provide innovative and stylish solutions."
        keywords="commercial interior design, office renovation, retail interiors, workspace solutions, Get My Housing, interior services"
        canonicalUrl={window.location.href}
        ogTitle={`Commercial Interior Service in ${city} | Get My Housing`}
        ogDescription="Transform your commercial space with expert interior design services. From office spaces to retail stores, we provide innovative and stylish solutions."
        twitterTitle={`Commercial Interior Service in ${city} | Get My Housing`}
        twitterDescription="Transform your commercial space with expert interior design services. From office spaces to retail stores, we provide innovative and stylish solutions."
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