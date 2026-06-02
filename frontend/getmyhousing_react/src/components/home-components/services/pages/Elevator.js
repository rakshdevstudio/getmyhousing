import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import ElevatorService from "../assets/elevator-service.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png"
import designIcon from "../assets/icons/ruler.png"
import installationIcon from "../assets/icons/maintenance.png"
import inspectionIcon from "../assets/icons/checked.png";
import ElevatorIcon from '@mui/icons-material/Elevator';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

export const Elevator = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Elevator Service",
    heroSection: {
      heroTitle: "Reliable and Professional Elevator Installation & Maintenance Services",
      heroTitleDes: "Ensure smooth, safe, and efficient operation of your elevator systems with our expert installation, maintenance, and repair services. We provide tailored solutions for residential, commercial, and industrial buildings.",
      heroList: [
        "✅ Expert Installation and Maintenance Services",
        "✅ High-Quality Parts and Professional Technicians",
        "✅ Safe, Efficient, and Reliable Elevator Solutions",
        "✅ Affordable Pricing with Transparent Estimates"
      ],
      heroButton: "Book Now",
      formTitle: "Request an Elevator Service Quote",
      bannerImage: ElevatorService, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Get answers to common questions about our elevator services, including installation, maintenance, and repairs.",
      main: [
        {
          question: "What types of elevators do you install and maintain?",
          answer: "We specialize in installing and maintaining a variety of elevators, including residential, commercial, and industrial elevators, as well as freight and service elevators.",
        },
        {
          question: "Do you offer elevator repair services?",
          answer: "Yes, we offer comprehensive elevator repair services, from minor fixes to major component replacements. Our technicians are equipped to handle any issue and restore functionality promptly.",
        },
        {
          question: "How often should my elevator be serviced?",
          answer: "For optimal performance and safety, we recommend regular maintenance every 6 to 12 months, depending on the elevator's usage and type. Our team can provide a tailored service plan.",
        },
        {
          question: "How much does it cost to install or maintain an elevator?",
          answer: "Costs vary depending on the type of elevator and the scope of the services required. Contact us for a personalized quote based on your specific needs.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Expert Elevator Services",
      titleDesc: "Fill out the form below to request a free consultation and quote for your elevator installation, maintenance, or repair needs. Let us help keep your elevator system running smoothly and safely.",
    },
    ourProcess: {
      title: "How Our Elevator Services Work",
      titleDesc: "We take pride in offering professional and reliable elevator services. Here's how our process works from start to finish:",
      main: [
        {
          title: "Initial Consultation & Site Assessment",
          icon: consultationIcon, // Add actual icon path
          description: "We begin by evaluating your site and discussing your elevator needs. Our team assesses the space, installation requirements, and your specific usage to provide accurate solutions.",
        },
        {
          title: "Elevator Design & Customization",
          icon: designIcon, // Add actual icon path
          description: "Once the assessment is complete, we help design and customize your elevator system according to your building's layout, style preferences, and functionality requirements.",
        },
        {
          title: "Installation & System Setup",
          icon: installationIcon, // Add actual icon path
          description: "Our professional technicians handle the installation process, ensuring your elevator meets all safety regulations and operates smoothly from the moment it's up and running.",
        },
        {
          title: "Maintenance & Safety Inspections",
          icon: inspectionIcon, // Add actual icon path
          description: "We offer ongoing maintenance and safety inspections to ensure your elevator remains in optimal condition, reducing the risk of downtime and extending its lifespan.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Hear from clients who trust us for their elevator installation, maintenance, and repair needs. We provide efficient and reliable services to ensure your elevator systems are always working seamlessly.",
      main: [
        {
          name: "Emily Davis",
          feedback: "We had an elevator installed in our office building, and the service was outstanding. The team was professional, timely, and the installation was flawless. Highly recommend!",
          location: "Chicago, USA",
          image: "https://i.pravatar.cc/100?img=13",
        },
        {
          name: "David Brown",
          feedback: "Their maintenance team is fantastic. They’ve been keeping our building's elevator in perfect condition for years. Always reliable and professional.",
          location: "Miami, USA",
          image: "https://i.pravatar.cc/100?img=14",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Elevator Services?",
      titleDesc: "We offer top-quality elevator installation, maintenance, and repair services backed by expertise, efficiency, and a commitment to safety.",
      main: [
        { icon: <ElevatorIcon />, title: "Comprehensive Elevator Solutions" }, // Full range of services from installation to maintenance
        { icon: <HealthAndSafetyIcon />, title: "Strict Safety Standards" }, // We ensure compliance with all safety regulations
        { icon: <AttachMoneyIcon />, title: "Affordable & Transparent Pricing" }, // Clear quotes with no hidden costs
        { icon: <AccessTimeIcon />, title: "Fast Response & On-Time Service" }, // Quick response to service requests and punctual project completion
      ],
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Elevator Services", city);
  return (
    <>
      <Helmet
        title={`Elevator Service in ${city} | Get My Housing`}
        description="Get expert elevator installation, maintenance, and repair services for residential and commercial buildings. Ensure safety and smooth operations with our professional solutions."
        keywords="elevator service, lift installation, elevator maintenance, lift repair, commercial elevators, residential elevators, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Elevator Service in ${city} | Get My Housing`}
        ogDescription="Get expert elevator installation, maintenance, and repair services for residential and commercial buildings. Ensure safety and smooth operations with our professional solutions."
        twitterTitle={`Elevator Service in ${city} | Get My Housing`}
        twitterDescription="Get expert elevator installation, maintenance, and repair services for residential and commercial buildings. Ensure safety and smooth operations with our professional solutions."
        ogImage={ElevatorService}
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