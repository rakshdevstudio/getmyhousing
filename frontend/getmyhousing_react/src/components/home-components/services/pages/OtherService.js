import { useCookies } from "react-cookie";
import { config } from "../../../../config/config";
import Header from "../../../generic/Header";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import mobileNoValidation, {
  countryCodeList,
  otherService,
} from "../../../../common/common";
import Footer from "../../../generic/Footer";
import { useNavigate } from "react-router-dom";
import OtherServicesImage from "../assets/other-services.jpg"
import HeroSection from "../service-components/HeroSection";
import SubServices from "../service-components/SubServices";
import WhyChooseUs from "../service-components/WhyChooseUs";
import Testimonial from "../service-components/Testimonial";
import OurProcess from "../service-components/OurProcess";
import EnquirySection from "../service-components/EnquirySection";
import Faq from "../service-components/Faq";
import Helmet from "../../../functional-component/Helmet";

const OtherService = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const subService = otherService;

  return (
    <>
      <Helmet
        title="Get My Housing - Other Service"
        description="Discover a range of additional home services, including mosquito netting, waterproofing, pest control, and more. High-quality solutions for a comfortable living space."
        keywords="home services, mosquito netting, pest control, waterproofing, home maintenance, Get My Housing"
        canonicalUrl={window.location.href}
        ogTitle="Get My Housing - Other Service"
        ogDescription="Discover a range of additional home services, including mosquito netting, waterproofing, pest control, and more. High-quality solutions for a comfortable living space."
        twitterTitle="Get My Housing - Other Service"
        twitterDescription="Discover a range of additional home services, including mosquito netting, waterproofing, pest control, and more. High-quality solutions for a comfortable living space."
        ogImage={OtherServicesImage}
      />
      <Header />

      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            {/* <span className="services-label">Other Services</span> */}
            <h2 className="services-title">Other Services</h2>
            <p className="services-description">Discover our comprehensive range of property-related services</p>
          </div>
          <div className="services-grid" id="servicesGrid">
            {subService.map((item, index) => (
              <div className="service-card" onClick={() => navigate(
                item.navigate +
                cookies[config.preferencesCookie]?.city.toLowerCase()
              )}>
                <div className="service-icon-container">
                  {item.icon}
                  {/* <i className="service-icon ${service.iconClassName}"></i> */}
                </div>
                <h3 className="service-title">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section >
      <Footer />
    </>
  );
};

export default OtherService;
