import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Helmet from "../../functional-component/Helmet"
import Header from "../../generic/Header"
import Footer from "../../generic/Footer"
import "../../../styles/AboutUs.css";
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AboutImg from "./assets/about-us.jpeg"
import { Box } from '@mui/material';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const AboutUs = () => {
  return (
    <>
      <Helmet
        title="Get My Housing - About Us"
        description="Learn more about Get My Housing, our mission, and how we help buyers, sellers, and renters find the perfect home."
        keywords="real estate, about us, Get My Housing, property solutions, home buying, home selling"
        canonicalUrl={window.location.href}
        ogTitle="Get My Housing - About Us"
        ogDescription="Discover Get My Housing's mission and commitment to providing the best real estate solutions for buyers, sellers, and renters."
        twitterTitle="Get My Housing - About Us"
        twitterDescription="Learn about Get My Housing and how we make property buying, selling, and renting easier for everyone."
      />
      <Header />
      <Box>
        {/* Hero Section */}
        <motion.section
          className="contact-hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-hero-overlay" />
          <div className="contact-hero-content">
            <motion.div {...fadeIn}>
              <span className="contact-hero-badge">
                About Us
              </span>
              <h1 className="contact-hero-title">
                Building Dreams, Creating Homes
              </h1>
              <p className="contact-hero-description">
                With over 20 years of experience, we've helped thousands of families find their perfect home.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section with Image */}
        <motion.section
          className="about-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="about-grid">
            <div className="about-content">
              <span className="about-label">Our Story</span>
              <h2 className="about-heading">Leading the Way in Real Estate Excellence</h2>
              <p className="about-text">
                Founded in 2003, our journey began with a simple mission: to transform the real estate experience.
                Today, we're proud to be one of the most trusted names in property, serving thousands of satisfied clients.
              </p>
              <p className="about-text">
                Our team of experienced professionals combines deep market knowledge with personalized service to
                ensure every client finds their perfect property match.
              </p>
              <div className="stats-grid">
                <div className="stat-box">
                  <h3 className="stat-number">20+</h3>
                  <p className="stat-label">Years Experience</p>
                </div>
                <div className="stat-box">
                  <h3 className="stat-number">5000+</h3>
                  <p className="stat-label">Properties Sold</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img
                src={AboutImg}
                alt="Real Estate Team"
              />
            </div>
          </div>
        </motion.section>

        {/* Vision, Mission, Values Section */}
        <motion.section
          className="vision-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="vision-container">
            <div className="vision-header">
              <h2 className="vision-title">Our Vision & Mission</h2>
              <div className="vision-grid">
                {/* Vision */}
                <div className="vision-card">
                  <div className="icon-circle">
                    <ApartmentIcon />
                  </div>
                  <h3 className="vision-card-title">Our Vision</h3>
                  <p className="vision-card-text">
                    To be the most trusted and innovative real estate company, setting new standards in client service and satisfaction.
                  </p>
                </div>

                {/* Mission */}
                <div className="vision-card">
                  <div className="icon-circle">
                    <ShieldOutlinedIcon />
                  </div>
                  <h3 className="vision-card-title">Our Mission</h3>
                  <p className="vision-card-text">
                    To provide exceptional real estate services while maintaining the highest standards of integrity and professionalism.
                  </p>
                </div>

                {/* Values */}
                <div className="vision-card">
                  <div className="icon-circle">
                    <PeopleAltOutlinedIcon />
                  </div>
                  <h3 className="vision-card-title">Our Values</h3>
                  <p className="vision-card-text">
                    Integrity, Excellence, Innovation, and Client-First approach guide everything we do.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values Grid */}
            <div className="values-grid">
              {[
                { title: "Integrity", description: "Honest and ethical practices in all dealings" },
                { title: "Excellence", description: "Commitment to outstanding service" },
                { title: "Innovation", description: "Embracing new ideas and technologies" },
                { title: "Community", description: "Building lasting relationships" }
              ].map((value) => (
                <motion.div
                  key={value.title}
                  className="value-card"
                  whileHover={{ y: -5 }}
                >
                  <h4 className="value-title">{value.title}</h4>
                  <p className="value-description">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/" className="cta-button">
            Back to Home
            <ArrowForwardOutlinedIcon />
          </Link>
        </motion.div>
      </Box>
      <Footer />
    </>
  )
}