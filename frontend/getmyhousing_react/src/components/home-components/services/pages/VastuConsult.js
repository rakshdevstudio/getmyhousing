import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import Vastu from "../assets/vastu-consulting-service.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HealingIcon from '@mui/icons-material/Healing';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import consultationIcon from "../assets/icons/conversation.png"
import analysisIcon from "../assets/icons/exploration.png"
import resolutionIcon from "../assets/icons/conflict-resolution.png"
import supportIcon from "../assets/icons/customer-service.png"
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

const VastuConsult = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Vastu Consulting Service",
    heroSection: {
      heroTitle: "Transform Your Space with Expert Vastu Consultation",
      heroTitleDes: "Achieve harmony, positivity, and prosperity in your home or office with our expert Vastu consulting services. Get personalized recommendations for a balanced and successful life.",
      heroList: [
        "✅ Expert Vastu Analysis for Homes & Offices",
        "✅ Personalized Solutions for Positive Energy Flow",
        "✅ Remedies for Vastu Doshas & Imbalances",
        "✅ Consultation by Certified Vastu Experts"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Vastu Consultation",
      bannerImage: Vastu, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our Vastu consulting services.",
      main: [
        {
          question: "What is Vastu Shastra?",
          answer: "Vastu Shastra is an ancient Indian architectural science that focuses on balancing energy flow to bring peace, prosperity, and success.",
        },
        {
          question: "Do I need to renovate my house for Vastu correction?",
          answer: "Not necessarily! Our experts provide effective remedies and solutions without requiring major renovations.",
        },
        {
          question: "Can Vastu consultation help with business success?",
          answer: "Yes! A well-balanced office or commercial space enhances productivity, financial stability, and overall success.",
        },
        {
          question: "What do I get in a Vastu consultation?",
          answer: "You receive a detailed analysis of your space, expert recommendations, and easy-to-implement solutions for a positive energy balance.",
        },
      ],
    },
    enquirySection: {
      title: "Get Expert Vastu Guidance",
      titleDesc: "Fill out the form below to schedule a consultation and bring harmony to your space.",
    },
    ourProcess: {
      title: "Our Vastu Consultation Process",
      titleDesc: "We follow a structured approach to help you achieve a balanced and prosperous space.",
      main: [
        {
          title: "Initial Consultation",
          icon: consultationIcon, // Add actual icon path
          description: "We understand your concerns, goals, and expectations before conducting an in-depth analysis.",
        },
        {
          title: "Detailed Vastu Analysis",
          icon: analysisIcon, // Add actual icon path
          description: "Our experts evaluate your property’s layout and energy flow based on Vastu principles.",
        },
        {
          title: "Personalized Vastu Solutions",
          icon: resolutionIcon, // Add actual icon path
          description: "We provide customized recommendations and easy-to-follow remedies for better alignment and prosperity.",
        },
        {
          title: "Implementation & Follow-Up",
          icon: supportIcon, // Add actual icon path
          description: "We guide you in implementing changes and offer follow-up support to ensure lasting results.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Say",
      titleDesc: "See how our Vastu consulting services have transformed lives and spaces.",
      main: [
        {
          name: "Amit Sharma",
          feedback: "After following the Vastu corrections suggested by the experts, my home feels more peaceful and my business has seen significant growth!",
          location: "Mumbai, India",
          image: "https://i.pravatar.cc/100?img=15",
        },
        {
          name: "Neha Verma",
          feedback: "The consultation was insightful! Simple changes in my house created a more positive and harmonious environment.",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=16",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Vastu Consulting Service?",
      titleDesc: "We provide reliable and effective Vastu solutions tailored to your specific needs.",
      main: [
        { icon: <VerifiedUserIcon />, title: "Certified & Experienced Vastu Experts" }, // Trusted guidance from professionals
        { icon: <LightbulbIcon />, title: "Scientific & Logical Approach" }, // Modern Vastu solutions blended with tradition
        { icon: <HealingIcon />, title: "Easy & Effective Remedies" }, // No major renovations required
        { icon: <HeadsetMicIcon />, title: "Personalized Consultation & Support" }, // One-on-one guidance for lasting benefits
      ],
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Vastu Consulting Services", city);

  return (
    <>
      <Helmet
        title={`Vastu Consulting Service in ${city} | Get My Housing`}
        description="Get expert Vastu consulting services to bring harmony and positive energy to your home or office. Balance your space with Vastu Shastra principles."
        keywords="Vastu consulting, Vastu Shastra, home Vastu, office Vastu, property energy balance, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Vastu Consulting Service in ${city} | Get My Housing`}
        ogDescription="Get expert Vastu consulting services to bring harmony and positive energy to your home or office. Balance your space with Vastu Shastra principles."
        twitterTitle={`Vastu Consulting Service in ${city} | Get My Housing`}
        twitterDescription="Get expert Vastu consulting services to bring harmony and positive energy to your home or office. Balance your space with Vastu Shastra principles."
        ogImage={Vastu}
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

export default VastuConsult;
