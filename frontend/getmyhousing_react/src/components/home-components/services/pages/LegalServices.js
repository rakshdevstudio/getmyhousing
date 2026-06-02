import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import LegalServicesImage from "../assets/legal-services.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png"
import documentationIcon from "../assets/icons/documentation.png"
import negotiationIcon from "../assets/icons/agreement.png"
import resolutionIcon from "../assets/icons/conflict-resolution.png"
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

const LegalServices = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Legal Services",
    heroSection: {
      heroTitle: "Expert Legal Services for Your Personal & Business Needs",
      heroTitleDes: "Our experienced legal professionals provide reliable solutions for individuals and businesses. From legal consultations to contract drafting and dispute resolution, we ensure expert guidance and compliance.",
      heroList: [
        "✅ Expert Legal Consultation for Individuals & Businesses",
        "✅ Contract Drafting, Review & Legal Documentation",
        "✅ Property & Real Estate Legal Assistance",
        "✅ Dispute Resolution & Litigation Support"
      ],
      heroButton: "Get a Free Legal Consultation",
      formTitle: "Request a Legal Consultation",
      bannerImage: LegalServicesImage, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our legal services and how we can assist you with legal matters.",
      main: [
        {
          question: "What types of legal services do you offer?",
          answer: "We offer a wide range of legal services, including business law, contract drafting, property law, family law, and dispute resolution.",
        },
        {
          question: "How can I book a legal consultation?",
          answer: "You can schedule a consultation by filling out our contact form or calling us directly. Our legal experts will guide you based on your requirements.",
        },
        {
          question: "Do you provide legal support for property disputes?",
          answer: "Yes, we handle property disputes, title verifications, lease agreements, and real estate transactions to ensure a smooth legal process.",
        },
        {
          question: "What are the charges for legal services?",
          answer: "Our fees depend on the type and complexity of the case. Contact us for a tailored quote based on your legal needs.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Professional Legal Services",
      titleDesc: "Fill out the form below to schedule a consultation with our experienced legal experts and receive tailored legal advice.",
    },
    ourProcess: {
      title: "How Our Legal Service Process Works",
      titleDesc: "We follow a structured approach to provide the best legal solutions with transparency and efficiency.",
      main: [
        {
          title: "Initial Consultation & Case Evaluation",
          icon: consultationIcon, // Add actual icon path
          description: "We discuss your legal concerns, analyze the case, and provide professional guidance on the best course of action.",
        },
        {
          title: "Legal Documentation & Drafting",
          icon: documentationIcon, // Add actual icon path
          description: "Our team prepares legal documents, contracts, and agreements while ensuring compliance with the latest legal regulations.",
        },
        {
          title: "Negotiation & Legal Representation",
          icon: negotiationIcon, // Add actual icon path
          description: "We negotiate on your behalf, mediate disputes, and provide legal representation in court if needed.",
        },
        {
          title: "Case Resolution & Compliance Support",
          icon: resolutionIcon, // Add actual icon path
          description: "Our experts assist in dispute resolution, settlements, and ensuring that all legal aspects are managed effectively.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Say",
      titleDesc: "See how our legal expertise has helped individuals and businesses with their legal matters.",
      main: [
        {
          name: "Amit Khanna",
          feedback: "The legal team provided me with expert guidance on my property dispute, ensuring a smooth and fair resolution. Highly recommended!",
          location: "Bangalore, India",
          image: "https://i.pravatar.cc/100?img=9",
        },
        {
          name: "Neha Sharma",
          feedback: "Their contract drafting services were top-notch. The team ensured all legal aspects were covered and protected my business interests.",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=10",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Legal Services?",
      titleDesc: "We provide professional, transparent, and result-oriented legal solutions for individuals and businesses.",
      main: [
        { icon: <GavelIcon />, title: "Experienced & Trusted Legal Experts" }, // Highly qualified legal professionals
        { icon: <DescriptionIcon />, title: "Comprehensive Legal Documentation" }, // Assistance with contracts & legal paperwork
        { icon: <HandshakeIcon />, title: "Effective Dispute Resolution & Mediation" }, // Negotiation & legal representation
        { icon: <SupportAgentIcon />, title: "Personalized Legal Guidance & Support" }, // Client-focused legal solutions
      ],
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Legal Services", city);

  return (
    <>
      <Helmet
        title={`Legal Service in ${city} | Get My Housing`}
        description="Get expert legal services for property transactions, agreements, and disputes. Secure your real estate investments with professional legal support."
        keywords="legal service, property law, real estate legal advice, property agreements, legal consultation, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Legal Service in ${city} | Get My Housing`}
        ogDescription="Get expert legal services for property transactions, agreements, and disputes. Secure your real estate investments with professional legal support."
        twitterTitle={`Legal Service in ${city} | Get My Housing`}
        twitterDescription="Get expert legal services for property transactions, agreements, and disputes. Secure your real estate investments with professional legal support."
        ogImage={LegalServicesImage}
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

export default LegalServices;
