import React from "react";
import { generateFaqSchema, generateSchema, services } from "../../../../common/common";
import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import PaintingBanner from "../assets/commercial-painting-service.jpg"
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png"
import preparationIcon from "../assets/icons/preparation.png"
import paintingIcon from "../assets/icons/paint-brush.png"
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";

export const CommercialPaintingService = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Commercial Painting",
    heroSection: {
      heroTitle: "Transform Your Commercial Space with Professional Painting Services",
      heroTitleDes: "Enhance the appearance of your business with our expert commercial painting services. We specialize in high-quality, long-lasting finishes for all types of commercial properties.",
      heroList: [
        "✅ Expert Commercial Painting for Offices, Retail, & Industrial Spaces",
        "✅ High-Quality Paints & Techniques for Lasting Results",
        "✅ Affordable Pricing & Transparent Costs",
        "✅ Fast, Reliable, & Professional Service"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Commercial Painting Service Quote",
      bannerImage: PaintingBanner, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our commercial painting services and how we can improve the look of your property.",
      main: [
        {
          question: "What commercial painting services do you offer?",
          answer: "We offer a variety of commercial painting services including office, retail, and industrial painting, as well as wall repairs, priming, and specialty finishes.",
        },
        {
          question: "Can you paint the exterior and interior of my commercial space?",
          answer: "Yes, we provide both interior and exterior painting services, ensuring that every aspect of your commercial property is professionally painted and well-maintained.",
        },
        {
          question: "How do I know if my commercial property needs a fresh coat of paint?",
          answer: "If the paint is peeling, cracking, fading, or simply looks outdated, it may be time to refresh your space. A fresh coat of paint can also improve the overall ambiance and brand appearance.",
        },
        {
          question: "How much do your commercial painting services cost?",
          answer: "Our pricing varies depending on the size and complexity of the project. Contact us for a customized quote that meets your specific painting needs.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Commercial Painting Services",
      titleDesc: "Fill out the form below to request a free consultation and quote for your commercial painting project. Let us help you enhance your business space.",
    },
    ourProcess: {
      title: "How Our Commercial Painting Service Works",
      titleDesc: "We ensure a hassle-free experience from consultation to final touch-ups with our expert painting services.",
      main: [
        {
          title: "Consultation & Color Selection",
          icon: consultationIcon, // Add actual icon path
          description: "We work closely with you to understand your color preferences, design themes, and specific needs for your space.",
        },
        {
          title: "Surface Preparation & Priming",
          icon: preparationIcon, // Add actual icon path
          description: "We carefully prepare and prime surfaces to ensure a smooth and long-lasting finish, addressing any imperfections before painting.",
        },
        {
          title: "Painting & Finishing Touches",
          icon: paintingIcon, // Add actual icon path
          description: "Our skilled painters apply high-quality paints and finishes, delivering a professional and durable result that revitalizes your commercial property.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Read feedback from businesses who trust us to provide expert commercial painting services that enhance their space and brand identity.",
      main: [
        {
          name: "Karen James",
          feedback: "The commercial painting team transformed our office space with a fresh new look. The quality of work was outstanding, and the team was efficient and professional.",
          location: "Los Angeles, USA",
          image: "https://i.pravatar.cc/100?img=5",
        },
        {
          name: "Michael Grant",
          feedback: "We needed our retail store painted quickly, and they delivered exceptional results on time. The new paint job has brought a much-needed fresh look to our store!",
          location: "New York, USA",
          image: "https://i.pravatar.cc/100?img=6",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Commercial Painting Services?",
      titleDesc: "We provide high-quality, cost-effective commercial painting solutions that enhance the appearance and longevity of your property.",
      main: [
        { icon: <FormatPaintIcon />, title: "Expert Interior & Exterior Painting" }, // Professional painting for all areas
        { icon: <ColorLensIcon />, title: "Customized Color & Finish Options" }, // Wide variety of color options and finishes
        { icon: <LocalOfferIcon />, title: "Affordable & Transparent Pricing" }, // No hidden costs, just clear quotes
        { icon: <AccessTimeIcon />, title: "Timely & Efficient Service" }, // Quick turnaround with minimal disruption to your business
      ],
    },
    subServices: {
      title: "Our Commercial Painting Services",
      main: services[1].childService
        .filter((item) => item.title !== "Commercial Painting Service"),
    }
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Commercial Painting Services", city);

  return (
    <>
      <Helmet
        title={`Get My Housing - Commercial Painting Service in ${city} | Get My Housing`}
        description="Enhance your commercial space with professional painting services. We provide high-quality interior and exterior painting for offices, retail stores, and more."
        keywords="commercial painting, office painting, retail painting, building painting, Get My Housing, professional painters"
        canonicalUrl={window.location.href}
        ogTitle={`Get My Housing - Commercial Painting Service in ${city} | Get My Housing`}
        ogDescription="Enhance your commercial space with professional painting services. We provide high-quality interior and exterior painting for offices, retail stores, and more."
        twitterTitle={`Get My Housing - Commercial Painting Service in ${city} | Get My Housing`}
        twitterDescription="Enhance your commercial space with professional painting services. We provide high-quality interior and exterior painting for offices, retail stores, and more."
        ogImage={PaintingBanner}
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