import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import { generateFaqSchema, generateSchema, services } from "../../../../common/common";
import PaintingBanner from "../assets/exterior-painting-service.jpg"
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

export const ExteriorPaintingService = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Exterior Painting",
    heroSection: {
      heroTitle: "Enhance Your Curb Appeal with Professional Exterior Painting Services",
      heroTitleDes: "Transform the exterior of your property with our expert painting services. We specialize in durable, weather-resistant finishes that protect and beautify your home's exterior.",
      heroList: [
        "✅ High-Quality Exterior Painting for Homes & Commercial Properties",
        "✅ Durable, Weather-Resistant Paints for Long-Lasting Protection",
        "✅ Affordable Pricing & Transparent Quotes",
        "✅ Fast, Professional, & Clean Service"
      ],
      heroButton: "Book Now",
      formTitle: "Request an Exterior Painting Service Quote",
      bannerImage: PaintingBanner, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our exterior painting services and how we can improve the look and protection of your property.",
      main: [
        {
          question: "What exterior painting services do you offer?",
          answer: "We offer a variety of exterior painting services, including house painting, fence painting, deck staining, and commercial property exterior painting. We ensure that every surface is treated with care for lasting results.",
        },
        {
          question: "Do you provide color consultations for exterior painting?",
          answer: "Yes, we offer color consultations to help you choose the best shades that complement your home or business. Our experts will guide you through the color selection process.",
        },
        {
          question: "How long does exterior painting last?",
          answer: "Exterior painting typically lasts between 5 to 10 years, depending on the quality of the paint, the climate, and the maintenance of the surfaces. We use high-quality, weather-resistant paints to ensure durability.",
        },
        {
          question: "What’s the cost of exterior painting services?",
          answer: "The cost varies depending on the size of the property, type of surfaces, and complexity of the job. Contact us for a customized quote based on your specific needs and requirements.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Exterior Painting Services",
      titleDesc: "Fill out the form below to request a free consultation and quote for your exterior painting project. Let us help you enhance your property's first impression.",
    },
    ourProcess: {
      title: "How Our Exterior Painting Service Works",
      titleDesc: "We ensure your exterior painting project is smooth, efficient, and provides long-lasting results. Here’s how we approach every job:",
      main: [
        {
          title: "Consultation & Surface Evaluation",
          icon: consultationIcon, // Add actual icon path
          description: "We begin with an evaluation of the surfaces to be painted, addressing any repairs needed and discussing color preferences and design themes with you.",
        },
        {
          title: "Surface Preparation & Priming",
          icon: preparationIcon, // Add actual icon path
          description: "We carefully clean, sand, and prime all exterior surfaces to ensure a smooth, long-lasting finish. This step helps the paint adhere better and provides additional protection.",
        },
        {
          title: "Exterior Painting & Finishing Touches",
          icon: paintingIcon, // Add actual icon path
          description: "Our team applies premium paints and finishes to the exterior of your property, paying attention to every detail to achieve a flawless and protective coat.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Hear from homeowners and business owners who trust us for their exterior painting needs. We deliver outstanding results that boost curb appeal.",
      main: [
        {
          name: "Linda Walker",
          feedback: "The exterior painting team did an amazing job on our house. It looks brand new! The quality of the work was top-notch, and they completed it on time.",
          location: "San Francisco, USA",
          image: "https://i.pravatar.cc/100?img=1",
        },
        {
          name: "James Carter",
          feedback: "We hired this team to paint our office building, and we couldn't be happier. The job was done professionally, and our business now has a fresh and modern look.",
          location: "Chicago, USA",
          image: "https://i.pravatar.cc/100?img=2",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Exterior Painting Services?",
      titleDesc: "We provide premium exterior painting services that not only enhance the look of your property but also protect it from the elements.",
      main: [
        { icon: <FormatPaintIcon />, title: "Expert Exterior Painting" }, // Professional exterior painting services
        { icon: <ColorLensIcon />, title: "Wide Range of Color Options" }, // Choose the perfect color for your exterior
        { icon: <LocalOfferIcon />, title: "Affordable & Transparent Pricing" }, // No hidden fees, just clear and honest quotes
        { icon: <AccessTimeIcon />, title: "Efficient & Timely Service" }, // We complete the job on time with minimal disruption to your life or business
      ],
    },
    subServices: {
      title: "Our Exterior Painting Services",
      main: services[1].childService
        .filter((item) => item.title !== "Exterior Painting Service"),
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Exterior Painting Services", city);

  return (
    <>
      <Helmet
        title={`Exterior Painting Service in ${city} | Get My Housing`}
        description="Enhance your property's curb appeal with professional exterior painting services. High-quality finishes, weather-resistant paints, and expert craftsmanship for homes and buildings."
        keywords="exterior painting, house painting, commercial painting, outdoor painting, weather-resistant paint, home improvement, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Exterior Painting Service in ${city} | Get My Housing`}
        ogDescription="Enhance your property's curb appeal with professional exterior painting services. High-quality finishes, weather-resistant paints, and expert craftsmanship for homes and buildings."
        twitterTitle={`Exterior Painting Service in ${city} | Get My Housing`}
        twitterDescription="Enhance your property's curb appeal with professional exterior painting services. High-quality finishes, weather-resistant paints, and expert craftsmanship for homes and buildings."
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