import Footer from "../../../generic/Footer";
import Header from "../../../generic/Header";
import HeroSection from "../service-components/HeroSection";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import HomeLoanImage from "../assets/home-loan-service.jpg"
import consultationIcon from "../assets/icons/conversation.png"
import documentationIcon from "../assets/icons/documentation.png"
import approvalIcon from "../assets/icons/stamp.png"
import disbursementIcon from "../assets/icons/budget.png"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SpeedIcon from '@mui/icons-material/Speed';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Helmet from "../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import { generateFaqSchema, generateSchema } from "../../../../common/common";

export const HomeLoan = () => {
  const [cookies] = useCookies();
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Home Loan Service",
    heroSection: {
      heroTitle: "Get the Best Home Loan Deals with Easy Approvals",
      heroTitleDes: "Secure your dream home with our hassle-free home loan services. We offer competitive interest rates, flexible repayment options, and fast approvals to make your home-buying journey smooth and stress-free.",
      heroList: [
        "✅ Low-Interest Rates & Flexible Repayment Plans",
        "✅ Quick & Hassle-Free Loan Approval Process",
        "✅ Loans for Salaried & Self-Employed Individuals",
        "✅ Expert Guidance & Paperwork Assistance"
      ],
      heroButton: "Book Now",
      formTitle: "Get Your Free Home Loan Consultation",
      bannerImage: HomeLoanImage, // Add your banner image here
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our home loan services and how we can help you finance your dream home.",
      main: [
        {
          question: "What are the eligibility criteria for a home loan?",
          answer: "Eligibility depends on factors such as your income, credit score, employment status, and existing financial commitments. Our experts can help you determine the best loan option for you.",
        },
        {
          question: "How much loan amount can I get?",
          answer: "The loan amount is based on your income, credit history, and property value. We offer loans covering up to 90% of the property cost, subject to eligibility.",
        },
        {
          question: "What is the interest rate for home loans?",
          answer: "Interest rates vary based on market conditions and borrower eligibility. Contact us to get the latest competitive rates available for you.",
        },
        {
          question: "How long does the loan approval process take?",
          answer: "Loan approvals can take anywhere from a few days to a couple of weeks, depending on the completeness of your documents and verification process.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for Your Home Loan Needs",
      titleDesc: "Fill out the form below for a free consultation on home loan eligibility, interest rates, and loan options that best suit your needs.",
    },
    ourProcess: {
      title: "How Our Home Loan Process Works",
      titleDesc: "We ensure a seamless home loan application process, guiding you every step of the way from application to loan disbursement.",
      main: [
        {
          title: "Loan Consultation & Eligibility Check",
          icon: consultationIcon, // Add actual icon path
          description: "Our financial experts assess your eligibility and help you choose the best home loan options available in the market.",
        },
        {
          title: "Application & Documentation",
          icon: documentationIcon, // Add actual icon path
          description: "We assist you in gathering and submitting all necessary documents, making the application process smooth and hassle-free.",
        },
        {
          title: "Loan Approval & Processing",
          icon: approvalIcon, // Add actual icon path
          description: "Once submitted, we coordinate with banks and financial institutions to ensure quick processing and approval of your loan.",
        },
        {
          title: "Loan Disbursement & Property Registration",
          icon: disbursementIcon, // Add actual icon path
          description: "After final verification, the loan amount is disbursed, allowing you to proceed with property registration and ownership transfer.",
        },
      ],
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "See what our happy homeowners have to say about our home loan services and how we helped them buy their dream homes.",
      main: [
        {
          name: "Rahul Sharma",
          feedback: "The home loan process was incredibly smooth. The team guided me through everything, and I got my loan approved quickly at a great interest rate. Highly recommended!",
          location: "Mumbai, India",
          image: "https://i.pravatar.cc/100?img=7",
        },
        {
          name: "Priya Verma",
          feedback: "Excellent service! They provided me with the best loan options and handled all the paperwork efficiently. I got my dream home without any hassle!",
          location: "Delhi, India",
          image: "https://i.pravatar.cc/100?img=8",
        },
      ],
    },
    whyChooseUs: {
      title: "Why Choose Our Home Loan Services?",
      titleDesc: "We provide expert home loan assistance, ensuring a smooth and stress-free borrowing experience for our customers.",
      main: [
        { icon: <CurrencyRupeeIcon />, title: "Low Interest Rates & Flexible EMIs" }, // Affordable and customized loan options
        { icon: <SpeedIcon />, title: "Fast Loan Processing & Approvals" }, // Quick loan disbursement with minimal delays
        { icon: <AssignmentTurnedInIcon />, title: "Minimal Documentation & Hassle-Free Process" }, // Simplified paperwork
        { icon: <SupportAgentIcon />, title: "Dedicated Loan Advisors for Personalized Support" }, // Expert guidance throughout the loan process
      ],
    },
  };

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Home Loan Services", city);

  return (
    <>
      <Helmet
        title={`Home Loan Service in ${city} | Get My Housing`}
        description="Get hassle-free home loans with low-interest rates. Compare multiple lenders, check eligibility, and secure your dream home with ease."
        keywords="home loan, mortgage, housing finance, property loan, home loan eligibility, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Home Loan Service in ${city} | Get My Housing`}
        ogDescription="Get hassle-free home loans with low-interest rates. Compare multiple lenders, check eligibility, and secure your dream home with ease."
        twitterTitle={`Home Loan Service in ${city} | Get My Housing`}
        twitterDescription="Get hassle-free home loans with low-interest rates. Compare multiple lenders, check eligibility, and secure your dream home with ease."
        ogImage={HomeLoanImage}
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