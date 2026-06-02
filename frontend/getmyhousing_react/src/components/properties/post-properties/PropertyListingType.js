import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SellIcon from "@mui/icons-material/Sell";
import StyleIcon from "@mui/icons-material/Style";
import {
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../apis/apiServices";
import { config } from "../../../config/config";
import AddRentAndLeaseProperty from "./post-rent&lease-property/AddRentAndLeaseProperty";
import AddSaleProperty from "./post-sale-property/AddSaleProperty";
import PropertyManagerTabs from "./PropertyManagerTabs";
import { useNavigate } from "react-router-dom";
import {
  allSaleStepsData1,
  allRentalAndLeaseStepsData1,
} from "../../../common/common";
import DefaultLoader from "../../DefaultLoader";

export default function PropertyListingType() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  // below the state store a property types like commercial, residential and industrial with subproperties
  const [getPropertyType, setGetPropertyType] = useState([]);
  // below the state save a sale, rent or lease
  const [propertyListingType, setPropertyListingType] = useState(null);
  // below the state store the building type like commercial, residential and industrial
  const [buildingType, setBuildingType] = useState(null);
  // below the state is store the apartment, villa, independetn house ect
  const [propertiesType, setPropertiesType] = useState("Preleased Properties");

  const [loading, setLoading] = useState(false);
  // below the state for store the rent and buy
  const [nextStep, setNextStep] = useState("");
  const [nextStepHandler, setNextStepHandler] = useState(true);

  const desiredOrder = ["residential", "commercial", "industrial"];
  // below the state is for all data object for sale or buy
  const [allSaleStepsData, setAllSaleStepsData] = useState(allSaleStepsData1);
  // below the state is for all data object for rent lease
  const [allRentalAndLeaseStepsData, setAllRentalAndLeaseStepsData] = useState(
    allRentalAndLeaseStepsData1
  );

  function moveNextStep() {
    setAllRentalAndLeaseStepsData((prevState) => ({
      ...prevState,
      buildingType: buildingType,
      propertyListingType: propertyListingType,
      propertiesType: propertiesType,
    }));
    setAllSaleStepsData((prevState) => ({
      ...prevState,
      buildingType: buildingType,
      propertyListingType: propertyListingType,
      propertiesType: propertiesType,
    }));
    propertyListingType !== "Sale" ? setNextStep("Rent") : setNextStep("Sale");
    setLoading(false);
  }

  // below the api call is for verify the user package include the property listing type
  // const verifyPackageByListingType = async () => {
  //   setLoading(true);
  //   let params = { listingType: propertyListingType };
  //   try {
  //     const response = await invokeApi(
  //       config.apiDomains + apiList.verifyUserPackageByListingType,
  //       params,
  //       cookies
  //     );

  //     if (response.status >= 200 && response.status < 300) {
  //       if (response.data.responseMessage === "Successful") {
  //         setAllRentalAndLeaseStepsData((prevState) => ({
  //           ...prevState,
  //           buildingType: buildingType,
  //           propertyListingType: propertyListingType,
  //           propertiesType: propertiesType,
  //         }));
  //         setAllSaleStepsData((prevState) => ({
  //           ...prevState,
  //           buildingType: buildingType,
  //           propertyListingType: propertyListingType,
  //           propertiesType: propertiesType,
  //         }));
  //         propertyListingType !== "Sale"
  //           ? setNextStep("Rent")
  //           : setNextStep("Sale");
  //         setLoading(false);
  //       } else {
  //         toast.info("No packages are found for this user ID!", {
  //           position: "top-center",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //           transition: Bounce,
  //         });
  //         setLoading(false);
  //       }
  //     } else if (response.status === 401) {
  //       navigate("/logout");
  //     } else {
  //       window.alert(response.data.responseMessage);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while verifying packages:", error);
  //     setLoading(false);
  //   }
  // };
  // below the useEffect calling the property Types
  useEffect(() => {
    const getProperty = async () => {
      let params = {};
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getPropertyType,
          params,
          cookies
        );
        if (response.data.PropertyTypes) {
          setGetPropertyType(response.data.PropertyTypes);
        } else if (response.status === 401) {
          navigate("/logout");
        } else {
          console.error("No data in the response");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    getProperty();
  }, [cookies]);

  useEffect(() => {
    if (propertyListingType && buildingType && propertiesType) {
      setNextStepHandler(false);
    }
  }, [propertyListingType, buildingType, propertiesType])

  const propertyListing = [
    { element: "Sale", iconPath: <SellIcon sx={{ marginBottom: -1 }} /> },
    { element: "Rent", iconPath: <StyleIcon sx={{ marginBottom: -0.9 }} /> },
  ];

  return (
    <>
      <PropertyManagerTabs tabActive={0}>
        <Box
          component={Paper}
          elevation={3}
          sx={{
            p: 2,
            pb: 4,
          }}
        >
          {nextStep !== "Rent" && nextStep !== "Sale" && (
            <>
              <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                Property Listing For <span style={{ color: "red" }}>*</span>
              </Typography>

              <Box
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                  mb: 3,
                }}
              >
                {propertyListing.map((item) => (
                  <label
                    className="mydict1 border1"
                    onChange={(event) => {
                      setPropertyListingType(event.target.value);
                    }}
                    key={item.element}
                    style={{ userSelect: "none" }}
                  >
                    <input
                      type="radio"
                      name="radio8"
                      value={item.element}
                      checked={propertyListingType === item.element}
                      readOnly
                    />
                    <span className="border1">
                      {item.iconPath}
                      {item.element}
                    </span>
                  </label>
                ))}
              </Box>

              <>
                <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                  Building Type <span style={{ color: "red" }}>*</span>
                </Typography>
                <Box
                  className="mydict"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    flexWrap: "wrap",
                    mb: 2,
                  }}
                >
                  {[...getPropertyType]
                    .sort(
                      (a, b) =>
                        desiredOrder.indexOf(a.propertyType.toLowerCase()) -
                        desiredOrder.indexOf(b.propertyType.toLowerCase())
                    )
                    .map((item, index) => (
                      <label
                        className="mydict1 border1"
                        key={index}
                        style={{ userSelect: "none" }}
                      >
                        <input
                          type="radio"
                          name="radio7"
                          value={item.propertyType}
                          onChange={(event) => {
                            setBuildingType(event.target.value);
                          }}
                          checked={buildingType === item.propertyType}
                          readOnly
                        />
                        <span className="border1">
                          <img
                            src={
                              item.propertyType === "Residential"
                                ? "/media/svg/home-icon-silhouette-svgrepo-com.svg"
                                : item.propertyType === "Commercial"
                                  ? "/media/svg/building-icon.svg"
                                  : item.propertyType === "Industrial"
                                    ? "/media/svg/factory-icon.svg"
                                    : ""
                            }
                            alt="icon"
                            width="20"
                            height="20"
                            style={{
                              marginRight: 8,
                            }}
                          />
                          {item.propertyType}
                        </span>
                      </label>
                    ))}
                </Box>

                {buildingType && (
                  <Box sx={{ mb: 2 }}>
                    <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                      Property Type <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Box
                      className="mydict"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                      }}
                    >
                      {getPropertyType
                        .find((item) => item.propertyType === buildingType)
                        ?.propertySubTypes.filter(
                          (item) =>
                            !(
                              propertyListingType === "Rent" &&
                              (item.propertySubType ===
                                "Residential Plot/Land" ||
                                item.propertySubType === "Form Plot/Land")
                            ) &&
                            !(
                              buildingType === "Commercial" &&
                              propertyListingType === "Sale" &&
                              item.propertySubType === "Co-Working Space"
                            ) &&
                            !(
                              buildingType === "Commercial" &&
                              propertyListingType === "Sale" &&
                              item.propertySubType === "Rooftop"
                            ) &&
                            !(
                              buildingType === "Commercial" &&
                              propertyListingType === "Rent" &&
                              item.propertySubType === "Preleased Properties"
                            ) &&
                            !(
                              buildingType === "Commercial" &&
                              propertyListingType === "Rent" &&
                              item.propertySubType === "Estate/Plantation"
                            ) &&
                            !(
                              buildingType === "Residential" &&
                              propertyListingType === "Rent" &&
                              item.propertySubType === "Farm Plot/Land"
                            ) &&
                            !(
                              buildingType === "Residential" &&
                              propertyListingType === "Sale" &&
                              item.propertySubType === "PG/Co-living"
                            )
                        )
                        .sort(
                          (a, b) => a.propertyRankOrder - b.propertyRankOrder
                        )
                        .map((item, index) => (
                          <label
                            className="mydict1 border1"
                            style={{
                              userSelect: "none",
                              flex: "0 0 auto", // Set flex-shrink and flex-grow to 0, allowing the item to maintain its intrinsic size
                              minWidth: "120px",
                              my: "4px", // Add margin for spacing between items
                              mx: 2,
                            }}
                            key={index}
                          >
                            <input
                              type="radio"
                              name="propertySubType"
                              value={item.propertySubType}
                              onChange={(event) => {
                                setPropertiesType(event.target.value);
                              }}
                              checked={propertiesType === item.propertySubType}
                              readOnly
                            />
                            <span
                              className="border1"
                              style={{ fontFamily: "Mulish, sans-serif" }}
                            >
                              {item.propertySubType}
                            </span>
                          </label>
                        ))}
                    </Box>
                  </Box>
                )}
              </>

              {loading && <DefaultLoader />}

              {/* {!detailsId && ( */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  pt: 2,
                }}
              >
                <Button color="inherit" disabled>
                  Back
                </Button>
                <Button
                  color="inherit"
                  disabled={nextStepHandler}
                  onClick={() => {
                    moveNextStep();
                  }}
                >
                  Next
                </Button>
              </Box>
            </>
          )}
          {nextStep === "Rent" && (
            <AddRentAndLeaseProperty
              nextStep={(back) => setNextStep(back)}
              allStepsData={allRentalAndLeaseStepsData}
              setAllStepsData={(data) => setAllRentalAndLeaseStepsData(data)}
            />
          )}

          {nextStep === "Sale" && (
            <AddSaleProperty
              nextStep={(back) => setNextStep(back)}
              allStepsData={allSaleStepsData}
              setAllStepsData={(data) => setAllSaleStepsData(data)}
            />
          )}
        </Box>
      </PropertyManagerTabs>
    </>
  );
}
