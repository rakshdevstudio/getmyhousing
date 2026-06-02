import React from "react";
import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import Customized from "../assets/customized-furniture-service.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png"
import materialIcon from "../assets/icons/processing.png"
import craftingIcon from "../assets/icons/handcraft.png"
import installationIcon from "../assets/icons/maintenance.png"
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

export const CustomizedFurniture = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Customized Furniture",
    heroSection: {
      heroTitle: "Transform Your Space with Custom-Made Furniture",
      heroTitleDes: "Bring your vision to life with our bespoke furniture design and crafting services. We specialize in creating high-quality, personalized furniture for homes and businesses that match your unique style and functionality needs.",
      heroList: [
        "✅ Tailored Furniture Designs for Every Space & Style",
        "✅ Premium Materials & Expert Craftsmanship",
        "✅ Functional, Aesthetic, and Long-lasting Furniture",
        "✅ Affordable Pricing with Transparent Costing"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Customized Furniture Quote",
      bannerImage: Customized, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our custom furniture services and how we can help you design the perfect furniture for your space.",
      main: [
        {
          question: "What types of custom furniture do you create?",
          answer: "We design and craft custom furniture for all types of spaces, including living rooms, bedrooms, offices, kitchens, and commercial spaces. Whether it's a sofa, dining table, or cabinetry, we bring your ideas to life.",
        },
        {
          question: "How long does it take to create custom furniture?",
          answer: "The timeline depends on the complexity of the design and the materials used. Typically, custom pieces can take 3 to 6 weeks to complete, but we will provide you with an estimated timeframe during the consultation.",
        },
        {
          question: "Can I request specific materials or finishes for my furniture?",
          answer: "Yes, we offer a wide range of materials and finishes for our custom furniture, including wood, metal, glass, and more. We work closely with you to choose the perfect materials that match your vision.",
        },
        {
          question: "How much does custom furniture cost?",
          answer: "The cost of custom furniture varies depending on the design, materials, and size of the piece. Contact us for a personalized quote based on your specific needs.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Customized Furniture Services",
      titleDesc: "Fill out the form below to request a free consultation and quote for your custom furniture project. Let us create pieces that complement your space and reflect your style.",
    },
    ourProcess: {
      title: "How Our Custom Furniture Design Process Works",
      titleDesc: "We take pride in creating unique and high-quality furniture that fits your needs, style, and space. Our process ensures a seamless and enjoyable experience from concept to completion.",
      main: [
        {
          title: "Initial Consultation & Design Brief",
          icon: consultationIcon, // Add actual icon path
          description: "We begin by discussing your furniture needs, design preferences, and budget. We work with you to understand your style and requirements before moving forward with the design.",
        },
        {
          title: "Material Selection & Design Finalization",
          icon: materialIcon, // Add actual icon path
          description: "Once the design is ready, we help you select the best materials, finishes, and colors to bring your custom furniture vision to life. This step ensures every detail is perfect.",
        },
        {
          title: "Crafting & Quality Control",
          icon: craftingIcon, // Add actual icon path
          description: "Our skilled craftsmen build your furniture with the highest quality materials. Each piece undergoes rigorous quality control to ensure durability, functionality, and aesthetic appeal.",
        },
        {
          title: "Delivery & Installation",
          icon: installationIcon, // Add actual icon path
          description: "Once your custom furniture is ready, we carefully deliver and install it in your space, ensuring it fits perfectly and enhances your environment.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Read feedback from clients who trust us to design and create custom furniture that elevates their space and reflects their personal style.",
      main: [
        {
          name: "Emma Williams",
          feedback: "The custom furniture pieces we ordered completely transformed our office space. The quality and craftsmanship are exceptional, and the team was very attentive to our needs.",
          location: "San Francisco, USA",
          image: "https://i.pravatar.cc/100?img=9",
        },
        {
          name: "John Smith",
          feedback: "We couldn’t be happier with the custom dining table and chairs we ordered. The design was exactly what we envisioned, and the craftsmanship is top-notch.",
          location: "Los Angeles, USA",
          image: "https://i.pravatar.cc/100?img=10",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Custom Furniture Services?",
      titleDesc: "We offer personalized, high-quality furniture solutions that perfectly match your style and space, backed by expert craftsmanship and customer-focused service.",
      main: [
        { icon: <DesignServicesIcon />, title: "Personalized Design Solutions" }, // Custom designs to match your vision
        { icon: <LoyaltyIcon />, title: "Premium Quality & Craftsmanship" }, // High-quality materials and expert artisanship
        { icon: <AttachMoneyIcon />, title: "Transparent Pricing & Value" }, // Clear quotes with no hidden costs
        { icon: <AccessTimeIcon />, title: "Timely Delivery & Installation" }, // On-time delivery and professional installation
      ],
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Customized Furniture Services", city);

  return (
    <>
      <Helmet
        title={`Customized Furniture Service in ${city} | Get My Housing`}
        description="Upgrade your home or office with high-quality, tailor-made furniture. Get stylish, functional, and customized furniture solutions for every space."
        keywords="custom furniture, bespoke furniture, home decor, office furniture, interior design, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Customized Furniture Service in ${city} | Get My Housing`}
        ogDescription="Upgrade your home or office with high-quality, tailor-made furniture. Get stylish, functional, and customized furniture solutions for every space."
        twitterTitle={`Customized Furniture Service in ${city} | Get My Housing`}
        twitterDescription="Upgrade your home or office with high-quality, tailor-made furniture. Get stylish, functional, and customized furniture solutions for every space."
        ogImage={Customized}
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