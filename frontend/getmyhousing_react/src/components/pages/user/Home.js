import React, { useEffect, useRef } from "react";
import Header from "../../generic/Header";
import Footer from "../../generic/Footer";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import BannerSection from "../../home-components/BannerSection";
import Service from "../../home-components/Service";
import ExclusivePropertySection from "../../home-components/exclusive-property-section/ExclusivePropertySection";
import LatestPropertiesSection from "../../home-components/LatestPropertiesSection";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../global/redux/action";
import TopCities from "../../home-components/TopCities";

export function Home() {
  const [cookies] = useCookies();
  const dispatch = useDispatch();

  // User Data
  const { userData, userError, isFetching } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    // Check if the necessary conditions are met before dispatching
    if (
      cookies[config.cookieName]?.loginUserId &&
      !userData &&
      !isFetching &&
      !userError
    ) {
      dispatch(
        getUser({ id: cookies[config.cookieName]?.loginUserId, cookies })
      );
    }
  }, [
    dispatch,
    cookies,
    userData,
    isFetching,
    userError
  ]);

  useEffect(() => {
    if (userError) {
      alert(
        "Something went wrong while fetching user details. Please try again later!"
      );
    }
  }, [userError])

  return (
    <>
      <Header />
      <BannerSection />

      <ExclusivePropertySection />
      {/* below the section is for Hot Properties in India start */}

      <LatestPropertiesSection />

      {/* below the section is Find Your Dream Properties In Your Preferred City start */}
      <TopCities />

      <Service />
      <Footer />
    </>
  );
}
