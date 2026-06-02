import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import CarpenterService from "../assets/carpenter-service.jpg"
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import consultationIcon from "../assets/icons/conversation.png"
import constructionIcon from "../assets/icons/hook.png"
import installationIcon from "../assets/icons/maintenance.png"
import ForestIcon from '@mui/icons-material/Forest';
import BuildIcon from '@mui/icons-material/Build';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SpeedIcon from '@mui/icons-material/Speed';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

export const Carpenter = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Carpenter",
    heroSection: {
      heroTitle: "Professional Carpenter Services for Your Home & Office",
      heroTitleDes: "Enhance the beauty and functionality of your space with expert carpentry services. We specialize in custom woodwork, repairs, and furniture solutions.",
      heroList: [
        "✅ Custom Furniture & Woodwork Solutions",
        "✅ High-Quality Repairs & Restoration",
        "✅ Affordable Pricing & Transparent Costs",
        "✅ Fast, Reliable, & Professional Service"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Carpenter Service Quote",
      bannerImage: CarpenterService, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our carpentry services and how we can help transform your property with expert woodwork.",
      main: [
        {
          question: "What carpentry services do you offer?",
          answer: "We offer a wide range of services including custom furniture, wood repairs, restoration, cabinet making, and general carpentry work.",
        },
        {
          question: "Can you create custom furniture for my home or office?",
          answer: "Yes, we specialize in designing and building custom furniture tailored to your specific needs and space requirements.",
        },
        {
          question: "Do you offer wood repairs or restoration services?",
          answer: "Absolutely! We provide wood repair services, including restoration of damaged furniture and wooden structures, bringing them back to their original condition.",
        },
        {
          question: "How much do your carpentry services cost?",
          answer: "Our pricing is competitive and depends on the scope of the project. Contact us for a personalized quote based on your requirements.",
        },
      ]
    },
    enquirySection: {
      title: "Get in Touch for Carpentry Services",
      titleDesc: "Fill out the form below to request a free quote for any carpentry project you have in mind, whether it's furniture, repairs, or custom woodwork.",
    },
    ourProcess: {
      title: "How Our Carpentry Service Works",
      titleDesc: "We ensure a seamless process from consultation to delivery with our professional carpentry services.",
      main: [
        {
          title: "Consultation & Design",
          icon: consultationIcon, // Add actual icon path
          description: "We consult with you to understand your needs, preferences, and space requirements for custom furniture or repairs.",
        },
        {
          title: "Craftsmanship & Construction",
          icon: constructionIcon, // Add actual icon path
          description: "Our expert craftsmen bring your ideas to life, ensuring the highest quality in woodwork and construction.",
        },
        {
          title: "Installation & Finishing",
          icon: installationIcon, // Add actual icon path
          description: "We provide professional installation and finishing touches to ensure your carpentry work enhances the beauty and function of your space.",
        },
      ]
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Read feedback from clients who have trusted us to create custom woodwork and perform repairs that elevate their properties.",
      main: [
        {
          name: "Emily Walker",
          feedback: "The carpenter team crafted custom cabinets for my kitchen, and the quality is outstanding. I couldn’t be happier with the results!",
          location: "San Francisco, USA",
          image: "https://i.pravatar.cc/100?img=1",
        },
        {
          name: "David Smith",
          feedback: "I had a wooden chair that needed restoration, and they did a fantastic job bringing it back to life. Very impressed with their work!",
          location: "New York, USA",
          image: "https://i.pravatar.cc/100?img=2",
        },
      ]
    },
    whyChooseUs: {
      title: "Why Choose Our Carpenter Services?",
      titleDesc: "We offer high-quality, custom carpentry solutions that transform your home or office, ensuring durability and style.",
      main: [
        { icon: <ForestIcon />, title: "Custom Woodwork Solutions" }, // Custom furniture and wood projects
        { icon: <BuildIcon />, title: "Expert Repairs & Restoration" }, // Restoration and repairs of furniture and structures
        { icon: <LocalOfferIcon />, title: "Affordable & Transparent Pricing" }, // No hidden fees
        { icon: <SpeedIcon />, title: "Timely & Efficient Service" }, // Fast and reliable service
      ]
    },
  }

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Carpenter Services", city);

  return (
    <>
      <Helmet
        title={`Carpenter Service in ${city} | Get My Housing`}
        description="Find professional carpentry services for furniture repair, custom woodwork, and home improvements. Get expert craftsmanship with Get My Housing."
        keywords="carpenter service, woodwork, furniture repair, home improvement, Get My Housing, custom carpentry"
        canonicalUrl={window.location.href}
        ogTitle={`Carpenter Service in ${city} | Get My Housing`}
        ogDescription="Find professional carpentry services for furniture repair, custom woodwork, and home improvements. Get expert craftsmanship with Get My Housing."
        twitterTitle={`Carpenter Service in ${city} | Get My Housing`}
        twitterDescription="Find professional carpentry services for furniture repair, custom woodwork, and home improvements. Get expert craftsmanship with Get My Housing."
        ogImage={CarpenterService}
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