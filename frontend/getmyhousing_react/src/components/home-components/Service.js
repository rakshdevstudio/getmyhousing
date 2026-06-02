import { useNavigate } from "react-router-dom";
import { services } from "../../common/common";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import "../../styles/Services.css";

const Service = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <span className="services-label">Our Services</span>
          <h2 className="services-title">Complete Property Solutions</h2>
          <p className="services-description">Discover our comprehensive range of property-related services</p>
        </div>
        <div className="services-grid" id="servicesGrid">
          {services.map((item, index) => (
            <div
              key={item.navigate || item.name || index}
              className="service-card"
              onClick={() =>
                navigate(
                  item.navigate +
                    cookies[config.preferencesCookie]?.city.toLowerCase()
                )
              }
            >
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
  )
}

export default Service
