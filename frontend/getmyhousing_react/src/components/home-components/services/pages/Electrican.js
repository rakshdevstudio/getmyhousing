import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import ElectricanService from "../assets/electrician-service.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png"
import materialIcon from "../assets/icons/processing.png"
import installationIcon from "../assets/icons/maintenance.png"
import testingIcon from "../assets/icons/testing.png"
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

export const Electrican = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Electrician",
    heroSection: {
      heroTitle: "Reliable and Professional Electrician Services for Your Home and Business",
      heroTitleDes: "Ensure the safety and efficiency of your electrical systems with our expert electrician services. Whether it's electrical repairs, installations, or upgrades, we are here to provide top-quality solutions for your needs.",
      heroList: [
        "✅ Residential and Commercial Electrical Services",
        "✅ Expert Wiring, Repairs, and Upgrades",
        "✅ Safe, Efficient, and Reliable Electrical Solutions",
        "✅ Transparent Pricing with No Hidden Fees"
      ],
      heroButton: "Book Now",
      formTitle: "Request an Electrical Service Quote",
      bannerImage: ElectricanService, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our electrical services and how we can help ensure your electrical systems are safe and functioning properly.",
      main: [
        {
          question: "What types of electrical services do you offer?",
          answer: "We offer a wide range of services, including electrical installations, repairs, rewiring, lighting design, circuit upgrades, and more for both residential and commercial properties.",
        },
        {
          question: "Are your electricians licensed and insured?",
          answer: "Yes, all of our electricians are fully licensed, insured, and highly trained to provide safe and professional electrical services. Your safety is our top priority.",
        },
        {
          question: "How quickly can you respond to electrical emergencies?",
          answer: "We offer emergency electrical services 24/7. Our team is ready to respond quickly to ensure your electrical systems are back up and running as soon as possible.",
        },
        {
          question: "How much do your electrical services cost?",
          answer: "Our pricing is based on the scope of the work and the complexity of the services required. Contact us for a customized quote based on your specific needs.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Professional Electrician Services",
      titleDesc: "Fill out the form below to request a free consultation and quote for your electrical needs. We ensure efficient, safe, and reliable service for all your electrical requirements.",
    },
    ourProcess: {
      title: "How Our Electrical Services Work",
      titleDesc: "Our team ensures that your electrical systems are safe, efficient, and reliable. Here’s a step-by-step breakdown of how we work:",
      main: [
        {
          title: "Initial Consultation & Assessment",
          icon: consultationIcon, // Add actual icon path
          description: "We begin with an assessment of your electrical needs, understanding the scope of the project and any potential issues. This helps us provide an accurate quote and solution.",
        },
        {
          title: "Work Planning & Material Selection",
          icon: materialIcon, // Add actual icon path
          description: "Once we have a clear understanding of your needs, we plan the work, select the appropriate materials, and schedule the project at a time convenient for you.",
        },
        {
          title: "Electrical Installation & Repairs",
          icon: installationIcon, // Add actual icon path
          description: "Our licensed electricians handle all installations and repairs with precision, ensuring compliance with all safety standards and codes.",
        },
        {
          title: "Final Inspection & Testing",
          icon: testingIcon, // Add actual icon path
          description: "Once the work is complete, we perform a thorough inspection and testing to ensure everything is functioning correctly and safely.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Hear from clients who trust us to provide safe and reliable electrical services for their homes and businesses.",
      main: [
        {
          name: "Sarah Thompson",
          feedback: "The electrician team did a great job fixing the wiring issues in our office. They were prompt, professional, and left everything in perfect working order.",
          location: "New York, USA",
          image: "https://i.pravatar.cc/100?img=11",
        },
        {
          name: "Mike Johnson",
          feedback: "We hired this team for our home electrical upgrades, and they exceeded our expectations. Fast, affordable, and very professional. Highly recommended!",
          location: "Los Angeles, USA",
          image: "https://i.pravatar.cc/100?img=12",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Electrician Services?",
      titleDesc: "We provide expert electrical services with a focus on safety, efficiency, and customer satisfaction.",
      main: [
        { icon: <ElectricalServicesIcon />, title: "Expert Electrical Solutions" }, // Skilled electricians providing safe and efficient services
        { icon: <HealthAndSafetyIcon />, title: "Comprehensive Safety Standards" }, // Fully licensed and insured for your safety
        { icon: <AttachMoneyIcon />, title: "Affordable & Transparent Pricing" }, // No hidden fees, just clear and honest quotes
        { icon: <AccessTimeIcon />, title: "Fast Response & Timely Service" }, // On-time service to minimize disruption to your life or business
      ],
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Electrician Services", city);
  return (
    <>
      <Helmet
        title={`Electrican Service in ${city} | Get My Housing`}
        description="Get professional electrician services for home and office. Expert wiring, repairs, installations, and maintenance for a safe and efficient space."
        keywords="electrician service, electrical repairs, home wiring, office electrician, electrical maintenance, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Electrican Service in ${city} | Get My Housing`}
        ogDescription="Get professional electrician services for home and office. Expert wiring, repairs, installations, and maintenance for a safe and efficient space."
        twitterTitle={`Electrican Service in ${city} | Get My Housing`}
        twitterDescription="Get professional electrician services for home and office. Expert wiring, repairs, installations, and maintenance for a safe and efficient space."
        ogImage={ElectricanService}
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