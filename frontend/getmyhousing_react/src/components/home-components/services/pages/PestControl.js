import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import PestControlService from "../assets/pest-control.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import BugReportIcon from '@mui/icons-material/BugReport';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import inspectionIcon from "../assets/icons/checked.png";
import treatmentPlanIcon from "../assets/icons/care.png";
import treatmentIcon from "../assets/icons/care.png";
import followUpIcon from "../assets/icons/follow.png";
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

const PestControl = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Pest Control Service",
    heroSection: {
      heroTitle: "Say Goodbye to Pests with Our Expert Pest Control Services",
      heroTitleDes: "Protect your home and business from unwanted pests with our safe, effective, and eco-friendly pest control solutions. Our expert team ensures a pest-free environment with long-lasting results.",
      heroList: [
        "✅ Comprehensive Pest Control for Homes & Businesses",
        "✅ Safe, Eco-Friendly, and Government-Approved Solutions",
        "✅ Experienced Professionals & Guaranteed Results",
        "✅ Affordable Pricing with Customized Plans"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Free Pest Control Quote",
      bannerImage: PestControlService, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our pest control services and how we can help you stay pest-free.",
      main: [
        {
          question: "What types of pests do you handle?",
          answer: "We provide pest control services for cockroaches, termites, mosquitoes, rodents, bed bugs, ants, and other common pests.",
        },
        {
          question: "Are your pest control treatments safe?",
          answer: "Yes, we use eco-friendly and government-approved chemicals that are safe for humans and pets while being highly effective against pests.",
        },
        {
          question: "How often should I schedule pest control?",
          answer: "The frequency depends on the level of infestation and type of pest. We recommend quarterly or bi-annual treatments for long-term protection.",
        },
        {
          question: "Do you offer a warranty on pest control services?",
          answer: "Yes, we offer service guarantees and follow-up treatments if pests return within a specified period after our service.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Professional Pest Control",
      titleDesc: "Fill out the form below to schedule an inspection and get a customized pest control solution for your property.",
    },
    ourProcess: {
      title: "How Our Pest Control Service Works",
      titleDesc: "We follow a structured process to ensure complete pest elimination with minimal disruption to your home or business.",
      main: [
        {
          title: "Pest Inspection & Assessment",
          icon: inspectionIcon, // Add actual icon path
          description: "Our experts conduct a thorough inspection to identify pest infestations and their sources.",
        },
        {
          title: "Customized Treatment Plan",
          icon: treatmentPlanIcon, // Add actual icon path
          description: "We develop a tailored pest control strategy based on the type of pest and level of infestation.",
        },
        {
          title: "Safe & Effective Pest Treatment",
          icon: treatmentIcon, // Add actual icon path
          description: "Our trained professionals apply safe and effective treatments using advanced pest control methods.",
        },
        {
          title: "Follow-Up & Prevention Tips",
          icon: followUpIcon, // Add actual icon path
          description: "We provide post-treatment follow-ups and expert tips to keep your space pest-free in the long run.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Customers Say",
      titleDesc: "See how our pest control services have helped customers maintain a clean and pest-free environment.",
      main: [
        {
          name: "Amit Sharma",
          feedback: "Their pest control service was outstanding! No more cockroaches in my kitchen, and the process was quick and safe.",
          location: "Mumbai, India",
          image: "https://i.pravatar.cc/100?img=15",
        },
        {
          name: "Priya Verma",
          feedback: "Highly professional team! They eliminated termites from my wooden furniture, and I haven't seen a single one since.",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=16",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Pest Control Services?",
      titleDesc: "We provide industry-leading pest control solutions that are safe, effective, and affordable.",
      main: [
        { icon: <BugReportIcon />, title: "Comprehensive Pest Solutions" }, // Effective treatment for all pests
        { icon: <EnergySavingsLeafIcon />, title: "Eco-Friendly & Safe Methods" }, // Safe for families and pets
        { icon: <VerifiedUserIcon />, title: "Experienced & Certified Professionals" }, // Trusted by thousands
        { icon: <AttachMoneyIcon />, title: "Affordable Pricing & No Hidden Costs" }, // Transparent pricing with no surprises
      ],
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Pest Control Services", city);
  return (
    <>
      <Helmet
        title={`Pest Control Service in ${city} | Get My Housing`}
        description="Protect your home and office with professional pest control services. Get rid of termites, rodents, cockroaches, and other pests with eco-friendly solutions.  "
        keywords="pest control, termite treatment, rodent control, cockroach removal, home pest management, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Pest Control Service in ${city} | Get My Housing`}
        ogDescription="Protect your home and office with professional pest control services. Get rid of termites, rodents, cockroaches, and other pests with eco-friendly solutions.  "
        twitterTitle={`Pest Control Service in ${city} | Get My Housing`}
        twitterDescription="Protect your home and office with professional pest control services. Get rid of termites, rodents, cockroaches, and other pests with eco-friendly solutions. "
        ogImage={PestControlService}
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

export default PestControl;
