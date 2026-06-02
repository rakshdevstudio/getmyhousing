import React, { useEffect } from "react";
import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import AirConditionService from "../assets/air-condition-service.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png"
import installationIcon from "../assets/icons/maintenance.png"
import maintenanceIcon from "../assets/icons/customer-service.png"
import AirIcon from '@mui/icons-material/Air';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

export const AirCondition = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Air Condition",
    heroSection: {
      heroTitle: "Professional Air Conditioning Services for Your Home & Business",
      heroTitleDes: "Stay cool and comfortable all year round with our expert air conditioning installation, maintenance, and repair services.",
      heroList: [
        "✅ Expert Installation & Setup",
        "✅ Comprehensive Maintenance Plans",
        "✅ Emergency Repair Services",
        "✅ Energy-Efficient Systems & Solutions"
      ],
      heroButton: "Book Now",
      formTitle: "Get Your Air Conditioning Service Quote",
      bannerImage: AirConditionService, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our air conditioning services and how we can help keep your environment cool and comfortable.",
      main: [
        {
          question: "What types of air conditioning services do you offer?",
          answer: "We offer installation, repair, and maintenance for both residential and commercial air conditioning units, ensuring optimal performance and energy efficiency.",
        },
        {
          question: "Do you offer emergency air conditioning repair services?",
          answer: "Yes, we provide 24/7 emergency repair services to ensure your air conditioning system is always working when you need it most.",
        },
        {
          question: "How often should I have my air conditioning unit serviced?",
          answer: "We recommend regular maintenance at least once a year to ensure your system is running efficiently and to avoid costly repairs in the future.",
        },
        {
          question: "Can you help with installing energy-efficient AC systems?",
          answer: "Absolutely! We offer installation of energy-efficient AC systems that help reduce your energy bills while keeping your space comfortable.",
        },
        {
          question: "What is the cost of air conditioning services?",
          answer: "Our pricing is transparent and depends on the service you need. Contact us for a custom quote based on your requirements.",
        },
      ]
    },
    enquirySection: {
      title: "Get in Touch for Air Conditioning Services",
      titleDesc: "Fill out the form below, and our team will provide you with a free quote and expert advice on your air conditioning needs.",
    },
    ourProcess: {
      title: "How Our Air Conditioning Service Works",
      titleDesc: "We make the process smooth and hassle-free with our expert services, ensuring your comfort at every step.",
      main: [
        {
          title: "Consultation & Assessment",
          icon: consultationIcon, // Replace with actual icon path
          description: "We assess your space and recommend the best air conditioning solutions tailored to your needs.",
        },
        {
          title: "Installation or Repair",
          icon: installationIcon, // Replace with actual icon path
          description: "Our skilled technicians install or repair your air conditioning system with minimal disruption to your space.",
        },
        {
          title: "Ongoing Maintenance & Support",
          icon: maintenanceIcon, // Replace with actual icon path
          description: "We offer maintenance plans to ensure your system continues to run smoothly year-round.",
        },
      ]
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Real feedback from clients who trust us to keep their spaces cool and comfortable.",
      main: [
        {
          name: "James Williams",
          feedback: "The team was fantastic! They installed my new air conditioner quickly and efficiently, and now my office is comfortable all year round.",
          location: "Chicago, USA",
          image: "https://i.pravatar.cc/100?img=2",
        },
        {
          name: "Samantha Brown",
          feedback: "I called for an emergency repair, and they responded promptly. My air conditioning is now working better than ever.",
          location: "Miami, USA",
          image: "https://i.pravatar.cc/100?img=3",
        },
      ]
    },
    whyChooseUs: {
      title: "Why Choose Our Air Conditioning Services?",
      titleDesc: "We offer reliable, energy-efficient, and affordable air conditioning solutions to keep your environment cool and comfortable.",
      main: [
        { icon: <AirIcon />, title: "Expert Installation & Repair" }, // Skilled technicians for installation & repairs
        { icon: <EnergySavingsLeafIcon />, title: "Energy-Efficient Solutions" }, // Save on energy costs
        { icon: <EmergencyShareIcon />, title: "24/7 Emergency Services" }, // We're always here when you need us
        { icon: <PriceChangeIcon />, title: "Affordable & Transparent Pricing" }, // No hidden charges
      ]
    },
  }

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Air Condition Services", city);
  return (
    <>
      <Helmet
        title={`Air Condition Service in ${city} | Get My Housing`}
        description="Get professional air conditioning services, including installation, maintenance, and repair. Keep your home cool and comfortable with Get My Housing."
        keywords="real estate, air conditioning service, Get My Housing, AC installation, AC repair, home cooling solutions"
        canonicalUrl={window.location.href}
        ogTitle={`Air Condition Service in ${city} | Get My Housing`}
        ogDescription="Get professional air conditioning services, including installation, maintenance, and repair. Keep your home cool and comfortable with Get My Housing."
        twitterTitle={`Air Condition Service in ${city} | Get My Housing`}
        twitterDescription="Get professional air conditioning services, including installation, maintenance, and repair. Keep your home cool and comfortable with Get My Housing."
        ogImage={AirConditionService}
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