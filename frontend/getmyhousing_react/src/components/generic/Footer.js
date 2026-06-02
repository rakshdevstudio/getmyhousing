import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import RoofingOutlinedIcon from "@mui/icons-material/RoofingOutlined";
import VillaIcon from "@mui/icons-material/Villa";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import CallIcon from '@mui/icons-material/Call';
import { formatSegment } from "../../common/common";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageSquare, ArrowUp } from "lucide-react";
import "../../styles/Footer.css";

const Footer = ({ handleChangeFilter }) => {
  const location = useLocation();
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openontactDrawer, setOpenContactDrawer] = useState(false);
  const [openontactDrawer1, setOpenContactDrawer1] = useState(false);
  const [value, setValue] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isExactPropertyRoute = matchPath(
    "/property/:listingType?",
    location.pathname
  );

  const handleWhatsappClick = () => {
    const defaultMessage = encodeURIComponent("Hi! I'm interested in your real estate services.");
    window.open(`https://wa.me/${config.whatsappNumber}?text=${defaultMessage}`, '_blank');
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <img src="/getmyhousing.png" alt="Fusion Realty" className="footer-logo" />
              <p className="footer-text">
                Your trusted partner in finding the perfect property. We make real estate simple, efficient, and rewarding.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="quick-links">
                {/* {["Properties", "About Us", "Services", "Contact"].map((item) => (
                  <li>
                    <Link to="/">{item}</Link>
                  </li>
                ))} */}
                <li>
                  <Link to={`/property/${cookies[config.preferencesCookie]?.listingType?.toLowerCase()}`}>Properties</Link>
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/">Services</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3 className="footer-heading">Contact Us</h3>
              <div>
                <div className="contact-item">
                  <MapPin className="contact-icon" size={20} />
                  <span>Ashok Nagar Bengaluru, KA 560001</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" size={20} />
                  <span>+91 {config.mobileNumber1}</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" size={20} />
                  <span>info@getmyhousing.com</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="footer-section">
              <h3 className="footer-heading">Follow Us</h3>
              <div className="social-links">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a key={index} href="/" className="social-link">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-text">
                © {new Date().getFullYear()} Get My Housing. All rights reserved.
              </p>
              <div className="footer-bottom-links">
                <Link to="/privacy-policy" className="footer-bottom-link">
                  Privacy Policy
                </Link>
                <Link to="/terms-conditions" className="footer-bottom-link">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <div className="whatsapp-button" onClick={handleWhatsappClick}>
        <MessageSquare size={30} />
      </div>

      {/* Scroll To Top Button */}
      <div
        onClick={scrollToTop}
        className={`scroll-to-top ${isVisible ? 'visible animate-bounce' : ''}`}
        aria-label="Scroll to top"
      >
        <div className="scroll-to-top-inner">
          <ArrowUp size={24} className="animate-pulse" />
        </div>
      </div>

      {/* Bottom Navigation Bar for Mobile */}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        sx={{ width: "100%", position: "fixed", bottom: 0, zIndex: "999", display: { xs: "flex", sm: "none" }, }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate("/")}
        />
        {!isExactPropertyRoute && (
          <BottomNavigationAction
            label="Search"
            icon={<SearchIcon />}
            onClick={() =>
              navigate(
                `/property/${formatSegment(
                  cookies[config.preferencesCookie]?.listingType
                )}`
              )
            }
          />
        )}
        {isExactPropertyRoute && (
          <BottomNavigationAction
            label="Filter"
            icon={<FilterAltIcon />}
            onClick={() => handleChangeFilter()}
          />
        )}

        <BottomNavigationAction
          label="Profile"
          icon={<PersonOutlineIcon />}
          onClick={() => navigate(`/login`)}
        />
        <BottomNavigationAction
          label="Call"
          icon={<CallIcon />}
          onClick={() => window.location.href = `tel:${config.mobileNumber1}`}
        />
      </BottomNavigation>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="bottom"
        PaperProps={{
          sx: { width: "100%", height: "80%" },
        }}
        sx={{ zIndex: 949 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold", fontSize: "17px" }}>
            Contact our Real Estate Expert
          </DialogTitle>
          <IconButton
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{ display: "flex", gap: "2rem", p: 1 }}
          onClick={() => {
            setOpenContactDrawer(true);
          }}
        >
          <Grid item>
            <IconButton>
              <VillaIcon fontSize="large" sx={{ color: "#346c4e" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
              Buy a new home
            </Typography>
            <Typography sx={{ fontSize: "11px" }}>Property options</Typography>
          </Grid>
        </Box>
        <Divider />
        <Box
          sx={{ display: "flex", gap: "2rem", p: 1 }}
          onClick={() => {
            setOpenContactDrawer(true);
          }}
        >
          <Grid item>
            <IconButton>
              <DescriptionOutlinedIcon
                fontSize="large"
                sx={{ color: "#9fc5fd" }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
              Take a Property on Rent
            </Typography>
            <Typography sx={{ fontSize: "11px" }}>
              Matching your lifestyle
            </Typography>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: "2rem", p: 1 }}>
          <Grid item>
            <IconButton>
              <PersonOutlinedIcon fontSize="large" sx={{ color: "#d96e87" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
              Sell or Rent property
            </Typography>
            <Typography sx={{ fontSize: "11px" }}>
              No Success, No Fee
            </Typography>
          </Grid>
        </Box>
        <Divider />
        <Box
          sx={{ display: "flex", gap: "2rem", p: 1 }}
          onClick={() => {
            setOpenContactDrawer1(true);
          }}
        >
          <Grid item>
            <IconButton>
              <AttachMoneyRoundedIcon
                fontSize="large"
                sx={{ color: "#50586d" }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
              Get Home Loan Offers
            </Typography>
            <Typography sx={{ fontSize: "11px" }}>
              Paperless approval within minutes
            </Typography>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: "2rem", p: 1 }}>
          <Grid item>
            <IconButton>
              <ApartmentRoundedIcon
                fontSize="large"
                sx={{ color: "#401641" }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
              Home Interior & Construction
            </Typography>
            <Typography sx={{ fontSize: "11px" }}>
              From Concept to Completion
            </Typography>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: "2rem", p: 1 }}>
          <Grid item>
            <IconButton>
              <RoofingOutlinedIcon fontSize="large" sx={{ color: "#ee875a" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
              Legal or Technical Advice
            </Typography>
            <Typography sx={{ fontSize: "11px" }}>
              Everything from Disputes to ownership
            </Typography>
          </Grid>
        </Box>
        <Divider />
      </Drawer>
      {/* contact Real Estate Drawer */}
      <Drawer
        open={openontactDrawer}
        onClose={() => setOpenContactDrawer(false)}
        anchor="bottom"
        PaperProps={{
          sx: { width: "100%", height: "50%" },
        }}
      // sx={{zIndex: 949}}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            px: 2,
          }}
        >
          <IconButton>
            <PhoneOutlinedIcon fontSize="large" sx={{ color: "#76af70" }} />
          </IconButton>
          <DialogTitle sx={{ fontWeight: "bold", fontSize: "15px" }}>
            Contact our Real Estate Expert
          </DialogTitle>
          <IconButton
            onClick={() => {
              setOpenContactDrawer(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Card
          sx={{
            maxWidth: { xs: "auto" },
            height: "261px",
            // borderRadius: "40px",
            border: "1px solid #7C7E80",
            boxShadow: "0px 0px 4px rgba(124, 126, 128, 1)",
            justifyContent: "center",
            alignItems: "center",
            m: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              m: 1,
              gap: "0.5rem",
            }}
          >
            <TextField label="Name" variant="outlined" fullWidth />
            <TextField label="Email" variant="outlined" fullWidth />
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <TextField select defaultValue="+91" sx={{ width: "90px" }}>
                <MenuItem key={+91} value={+91}>
                  +91
                </MenuItem>
                <MenuItem key={+1} value={+1}>
                  +1
                </MenuItem>
                <MenuItem key={+61} value={+61}>
                  +61
                </MenuItem>
              </TextField>
              <TextField label="Number" variant="outlined" />
            </Box>
            <Button variant="contained" color="success">
              Contact now
            </Button>
          </Box>
        </Card>
      </Drawer>
      {/* 1 */}
      <Drawer
        open={openontactDrawer1}
        onClose={() => setOpenContactDrawer1(false)}
        anchor="bottom"
        PaperProps={{
          sx: { width: "100%", height: "60%" },
        }}
      // sx={{zIndex: 949}}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            px: 2,
          }}
        >
          <IconButton>
            <PhoneOutlinedIcon fontSize="large" sx={{ color: "#76af70" }} />
          </IconButton>
          <DialogTitle sx={{ fontWeight: "bold", fontSize: "15px" }}>
            Contact our Real Estate Expert
          </DialogTitle>
          <IconButton
            onClick={() => {
              setOpenContactDrawer1(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Card
          sx={{
            maxWidth: { xs: "auto" },
            height: "361px",
            // borderRadius: "40px",
            border: "1px solid #7C7E80",
            boxShadow: "0px 0px 4px rgba(124, 126, 128, 1)",
            justifyContent: "center",
            alignItems: "center",
            m: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              m: 1,
              gap: "0.5rem",
            }}
          >
            <TextField label="Name" variant="outlined" fullWidth />
            <TextField label="Email" variant="outlined" fullWidth />
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <TextField select sx={{ width: "90px" }}>
                <MenuItem key={+91} value={+91}>
                  +91
                </MenuItem>
                <MenuItem key={+1} value={+1}>
                  +1
                </MenuItem>
                <MenuItem key={+61} value={+61}>
                  +61
                </MenuItem>
              </TextField>
              <TextField label="Number" variant="outlined" />
            </Box>
            <TextField select label="Select City" fullWidth>
              <MenuItem key={"Bangalore"} value={"Bangalore"}>
                Bangalore
              </MenuItem>
              <MenuItem key={"Chennai"} value={"Chennai"}>
                Chennai
              </MenuItem>
              <MenuItem key={"Goa"} value={"Goa"}>
                Goa
              </MenuItem>
            </TextField>
            <Button variant="contained" color="success">
              Contact Now
            </Button>
          </Box>
        </Card>
      </Drawer>
      {/* end */}
    </>
  );
};

export default Footer;
