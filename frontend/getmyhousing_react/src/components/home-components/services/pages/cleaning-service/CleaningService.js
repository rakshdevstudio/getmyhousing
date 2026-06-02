import React, { useEffect } from "react";
import Footer from "../../../../generic/Footer";
import Header from "../../../../generic/Header";
import { Box, Button, Container, useMediaQuery, useTheme } from "@mui/material";
import {
  Typography,
} from "@mui/material";
import WhatWeWillDo from "./WhatWeWillDo";
import CleaningServiceImage from "../../assets/cleaning-services.jpg"
import HeroSection from "../../service-components/HeroSection";
import Testimonial from "../../service-components/Testimonial";
import EnquirySection from "../../service-components/EnquirySection";
import Faq from "../../service-components/Faq";
import Helmet from "../../../../functional-component/Helmet";
import { useCookies } from "react-cookie";
import { config } from "../../../../../config/config";
import "./CleaningServiceOurProcess.css";
import { generateFaqSchema, generateSchema } from "../../../../../common/common";

const CleaningService = () => {
  const [cookies] = useCookies();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const city = cookies[config.preferencesCookie]?.city || "bangalore";

  const landingPageContent = {
    leadSource: "Cleaning Services",
    heroSection: {
      heroTitle: "Professional Cleaning Services for Homes & Offices",
      heroTitleDes: "Get your spaces sparkling clean with our expert cleaning services. We offer tailored solutions for homes, offices, and more, ensuring a fresh and hygienic environment.",
      heroList: [
        "✅ Residential & Commercial Cleaning",
        "✅ Eco-friendly Cleaning Products",
        "✅ Flexible Scheduling for Your Convenience",
        "✅ Experienced & Trustworthy Cleaners"
      ],
      heroButton: "Book Now",
      formTitle: "Request a Cleaning Quote",
      bannerImage: CleaningServiceImage,
    },
    faq: {
      title: "Frequently Asked Questions",
      titleDesc: "Find answers to common questions about our cleaning services and how we can help keep your spaces clean and safe.",
      main: [
        {
          question: "What types of cleaning services do you offer?",
          answer: "We offer a variety of cleaning services, including bathroom cleaning, kitchen cleaning, deep cleaning, move-in/move-out cleaning, and office cleaning.",
        },
        {
          question: "Do you provide specialized cleaning for bathrooms?",
          answer: "Yes, our bathroom cleaning service includes thorough cleaning of tiles, fixtures, and sanitization to ensure a hygienic environment.",
        },
        {
          question: "What is included in kitchen cleaning?",
          answer: "Our kitchen cleaning service covers countertops, appliances, cabinets, and floors, ensuring a spotless and safe cooking space.",
        },
        {
          question: "What is deep cleaning, and how is it different from regular cleaning?",
          answer: "Deep cleaning involves a comprehensive cleaning of your entire home or office, including hard-to-reach areas, to remove dirt, dust, and allergens.",
        },
        {
          question: "Do you offer move-in/move-out cleaning services?",
          answer: "Yes, we provide professional cleaning services for homes before moving in or after moving out, ensuring the space is spotless for the next occupants.",
        },
        {
          question: "Can I book a cleaning service on short notice?",
          answer: "Yes, we offer flexible scheduling and can accommodate last-minute cleaning requests depending on availability.",
        },
        {
          question: "Do you use eco-friendly cleaning products?",
          answer: "Yes, we use eco-friendly and non-toxic cleaning products that are safe for your family, pets, and the environment.",
        },
        {
          question: "Are your cleaning professionals insured?",
          answer: "Yes, all our cleaning professionals are fully insured and trained to provide the highest level of service.",
        },
        {
          question: "How much does a cleaning service cost?",
          answer: "Our pricing is competitive and transparent. Costs depend on the size of your space and the type of cleaning needed. Contact us for a custom quote.",
        },
      ],
    },
    enquirySection: {
      title: "Get in Touch for a Cleaning Quote",
      titleDesc: "Fill out the form and our team will get back to you with a personalized cleaning quote.",
    },
    ourProcess: {
      title: "How Our Cleaning Service Works",
      titleDesc: "Our efficient process ensures you get a thorough clean every time, with minimal disruption to your day.",
      main: [
        {
          icon: 'calendar',
          title: "Book Service",
          description: "Schedule your cleaning service at your convenience through our easy online booking system."
        },
        {
          icon: 'wand-sparkles',
          title: "Professional Cleaning",
          description: "Our expert team arrives with professional equipment and eco-friendly cleaning supplies."
        },
        {
          icon: 'clipboard-check',
          title: "Quality Check",
          description: "We perform a thorough inspection to ensure everything meets our high standards."
        },
        {
          icon: 'thumbs-up',
          title: "Satisfaction Guaranteed",
          description: "Enjoy your spotless space with our 100% satisfaction guarantee."
        }
      ]
    },
    testimonialSection: {
      title: "What Our Clients Are Saying",
      titleDesc: "Real feedback from customers who trust our cleaning services to maintain a spotless environment.",
      main: [
        {
          name: "Rahul Sharma",
          feedback: "The cleaning team was very professional and thorough. My home was sparkling clean, and they used eco-friendly products. Highly recommended!",
          location: "Mumbai, India",
          image: "/images/testimonials/empty-profile.png" // Empty profile image
        },
        {
          name: "Priya Patel",
          feedback: "I booked a deep cleaning service, and the team did an amazing job. They were punctual, efficient, and left my house smelling fresh. Will definitely use their services again!",
          location: "Delhi, India",
          image: "/images/testimonials/empty-profile.png" // Empty profile image
        },
        {
          name: "Anil Kumar",
          feedback: "The sofa cleaning service was excellent! The team removed all the stains, and my sofa looks brand new. Very happy with their work.",
          location: "Bangalore, India",
          image: "/images/testimonials/empty-profile.png" // Empty profile image
        },
        {
          name: "Sneha Gupta",
          feedback: "I hired them for regular home cleaning, and they have been consistent in delivering high-quality service. My home always feels fresh and tidy.",
          location: "Hyderabad, India",
          image: "/images/testimonials/empty-profile.png" // Empty profile image
        },
        {
          name: "Vikram Singh",
          feedback: "The bathroom cleaning service was outstanding. They removed all the stubborn stains and left the bathroom spotless. Great job!",
          location: "Chennai, India",
          image: "/images/testimonials/empty-profile.png" // Empty profile image
        },
        {
          name: "Anjali Mehta",
          feedback: "I booked a move-in cleaning service, and the team did a fantastic job. The house was spotless, and they even finished ahead of schedule. Highly recommend!",
          location: "Pune, India",
          image: "/images/testimonials/empty-profile.png" // Empty profile image
        },
      ]
    },
    whyChooseUs: {
      title: "Why Choose Our Cleaning Services?",
      titleDesc: "We provide reliable and professional cleaning services to help you maintain a clean, fresh, and healthy space. Here’s why our customers love us:",
      reasons: [
        {
          title: "Experienced Staff",
          description: "Our professional cleaners have years of experience and extensive training to deliver exceptional results."
        },
        {
          title: "Eco-Friendly Products",
          description: "We use environmentally friendly cleaning products that are safe for your family, pets, and the planet."
        },
        {
          title: "Customized Solutions",
          description: "Every space is unique. We offer personalized cleaning plans tailored to your specific needs."
        },
        {
          title: "100% Satisfaction",
          description: "We stand by our work with a 100% satisfaction guarantee on all our cleaning services."
        }
      ]
    },
  }

  // Generate FAQ schema dynamically
  const faqSchema = generateFaqSchema(landingPageContent.faq);

  // Generate service schema
  const schema = generateSchema("Cleaning Services", city);

  useEffect(() => {
    // Simple intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    // Target all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Animation for reasons cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with the animation class
    document.querySelectorAll('.reasons-card').forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Helper function to render the appropriate icon
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        );
      case 'wand-sparkles':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m8 9 2 3" />
            <path d="m14 9-2 3" />
            <path d="M8.5 15.5 10 17" />
            <path d="m14.5 15.5-2 1.5" />
            <path d="M12 8v2" />
            <path d="M12 14v2" />
            <path d="M15.5 11h-2" />
            <path d="M10.5 11h-2" />
            <path d="m5 3 4 4" />
            <path d="M5 3 3 5" />
            <path d="m21 21-4-4" />
            <path d="m21 21-2-2" />
            <path d="m19 5-4 4" />
            <path d="m19 5 2 2" />
          </svg>
        );
      case 'clipboard-check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="m9 14 2 2 4-4" />
          </svg>
        );
      case 'thumbs-up':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Helmet
        title={`Professional Cleaning Services in ${cookies[config.preferencesCookie]?.city} | Get My Housing`}
        description={`Book expert cleaning services in ${cookies[config.preferencesCookie]?.city} for your home and office. Affordable, reliable, and eco-friendly cleaning solutions. Get a spotless space today!`}
        keywords="cleaning service, home cleaning, office cleaning, professional cleaners, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle={`Professional Cleaning Services in ${cookies[config.preferencesCookie]?.city} | Get My Housing`}
        ogDescription={`Book expert cleaning services in ${cookies[config.preferencesCookie]?.city} for your home and office. Affordable, reliable, and eco-friendly cleaning solutions. Get a spotless space today!`}
        twitterTitle={`Professional Cleaning Services in ${cookies[config.preferencesCookie]?.city} | Get My Housing`}
        twitterDescription={`Book expert cleaning services in ${cookies[config.preferencesCookie]?.city} for your home and office. Affordable, reliable, and eco-friendly cleaning solutions. Get a spotless space today!`}
        ogImage={CleaningServiceImage}
        schema={[schema, faqSchema]}
      />
      <Header />
      <HeroSection content={landingPageContent} />

      <Box
        component="section"
        sx={{ py: { md: 8, xs: 3 }, width: "100%", textAlign: "center" }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            What We Will Do
          </Typography>
          <WhatWeWillDo />
        </Container>
      </Box>

      {/* <WhyChooseUs content={landingPageContent} /> */}

      <section className="why-choose-us-section">
        <div className="choose-us-container">
          <header className="choose-us-header">
            <span className="choose-us-label">Why Choose Us</span>
            <h2 className="choose-us-title">Reliable & Quality Cleaning Services</h2>
            <p className="choose-us-description">
              Discover the difference professional cleaning services can make for your home or business
            </p>
          </header>

          <div className="reasons-container">
            {landingPageContent.whyChooseUs.reasons.map((reason, index) => (
              <div
                key={index}
                className="reasons-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-number">{index + 1}</div>
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Container
        maxWidth="lg"
        sx={{
          padding: isMobile ? "20px" : "40px",
          margin: "40px auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "40px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "16px", // Added border radius
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {/* Left Side: Content */}
          <Box sx={{ maxWidth: isMobile ? "100%" : "60%" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
                marginBottom: "10px",
              }}
            >
              Get a Spotless Home Today!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                marginBottom: "20px",
              }}
            >
              Book our professional cleaning services and enjoy a clean, fresh, and
              hygienic living space. Affordable, reliable, and eco-friendly solutions
              tailored to your needs.
            </Typography>
          </Box>

          {/* Right Side: Button */}
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                padding: "12px 30px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px", // Added border radius to the button
                textTransform: "none",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              onClick={() => {
                window.location.href = "#enquiry-section"
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Container>

      {/* <OurProcess content={landingPageContent} /> */}
      {/* Our Process Section Start */}
      <section className="cleaning-our-process-section">
        <div className="our-process-container">
          <div className="our-process-header">
            <span className="our-process-label fade-in">Our Process</span>
            <h2 className="our-process-title fade-in">How We Make Your Space Shine</h2>
            <p className="our-process-description fade-in">
              Experience our streamlined cleaning process designed to deliver exceptional results every time
            </p>
          </div>

          <div className="process-cards">
            {landingPageContent.ourProcess.main.map((step, index) => (
              <div
                key={index}
                className="process-card fade-in"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="card-icon">
                  {renderIcon(step.icon)}
                </div>
                <h3 className="card-title">{step.title}</h3>
                <p className="card-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Our Process Section End */}

      <Testimonial content={landingPageContent} />

      <EnquirySection content={landingPageContent} />

      <Faq content={landingPageContent} />

      <Footer />
    </>
  );
};

export default CleaningService;
