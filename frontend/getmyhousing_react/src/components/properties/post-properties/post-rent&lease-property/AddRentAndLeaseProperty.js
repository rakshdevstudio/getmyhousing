import React, { useEffect, useState, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import LocationDetails from "./post-property-steps/LocationDetails";
import AreaDetails from "./post-property-steps/AreaDetails";
import PropertyStatus from "./post-property-steps/PropertyStatus";
import PropertyRent from "./post-property-steps/PropertyRent";
import AdditionalDetails from "./post-property-steps/AdditionalDetails";
import FurnishingStatus from "./post-property-steps/FurnishingStatus";
import Amenities from "./post-property-steps/Amenities";
import LandMark from "./post-property-steps/LandMark";
import DefineYourProperty from "./post-property-steps/DefineYourProperty";
import { useCookies } from "react-cookie";
import "./post-property-steps/Commercial.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import TenentStatus from "./post-property-steps/TenentStatus";
import ImageUploader from "./post-property-steps/UploadImage";
import PreView from "./post-property-steps/PreView";
import BrakerageDetails from "./post-property-steps/BrokerageDetails";
import { apiList, invokeApi } from "../../../../apis/apiServices";
import { config } from "../../../../config/config";
import { Bounce, toast } from "react-toastify";

function AddRentAndLeaseProperty({
  details,
  nextStep,
  allStepsData,
  setAllStepsData,
}) {
  const [cookies] = useCookies();
  const updatedSteps = [
    { label: "Property Listing", value: 0, isvisible: true },
    { label: "Location", value: 1, isvisible: true },
    { label: "Area Details", value: 2, isvisible: true },
    { label: "Tenant Status", value: 3, isvisible: true },
    { label: "Property Details", value: 4, isvisible: true },
    { label: "Property Rent", value: 5, isvisible: true },
    { label: "Additional Details", value: 6, isvisible: true },
    // { label: "RERA Status", value: 7, isvisible: true },
    { label: "Furnishing Status", value: 7, isvisible: true },
    { label: "Amenities", value: 8, isvisible: true },
    { label: "Land Mark", value: 9, isvisible: true },
    { label: "Define Your Property", value: 10, isvisible: true },
    { label: "Image Gallery", value: 11, isvisible: true },
    { label: "Brokerage Details", value: 12, isvisible: true },
  ];
  const [stepValue, setstepValue] = useState("");
  const [activeStep, _setActiveStep] = useState(
    updatedSteps.value ? updatedSteps.value : 1
  );
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(updatedSteps);

  const [maxStepVisited, setMaxStepVisited] = useState(
    updatedSteps.value ? updatedSteps.value : 1
  );

  const pendingTargetStepRef = useRef(null);

  const setActiveStep = useCallback((val) => {
    if (pendingTargetStepRef.current !== null) {
      const target = pendingTargetStepRef.current;
      pendingTargetStepRef.current = null;
      _setActiveStep(target);
    } else {
      _setActiveStep(val);
    }
  }, []);

  useEffect(() => {
    setMaxStepVisited((prev) => Math.max(prev, activeStep));
  }, [activeStep]);

  const handleTabClick = (targetStep) => {
    if (targetStep === activeStep) return;

    if (targetStep < activeStep) {
      _setActiveStep(targetStep);
      return;
    }

    if (activeStep === 1 && !formData.verifyPackageByLocation) {
      alert("Please enter the location details and click on NEXT to verify your Package..!!");
      return;
    }

    const nextVisibleStep = steps.find(
      (step) => step.value > activeStep && step.isvisible
    )?.value;

    if (targetStep <= maxStepVisited || targetStep === nextVisibleStep) {
      const container = document.getElementById("active-step-container");
      if (container) {
        const buttons = Array.from(container.getElementsByTagName("button"));
        const nextButton = buttons.find((btn) => {
          const text = (btn.textContent || btn.innerText || "").trim().toLowerCase();
          return text === "next" || text === "update";
        });
        if (nextButton) {
          pendingTargetStepRef.current = targetStep;
          nextButton.click();
          setTimeout(() => {
            pendingTargetStepRef.current = null;
          }, 100);
        }
      }
    }
  };
  const [packageCheck, setpackageCheck] = useState(true);

  const [formData, setFormData] = useState(allStepsData);
  useEffect(() => {
    setAllStepsData(formData);
  }, [activeStep]);

  // useEffect(() => {
  //   const verifyPackage = async () => {
  //     setLoading(true);
  //     let params = {};
  //     try {
  //       const response = await invokeApi(
  //         config.apiDomains + apiList.verifyUserPackage,
  //         params,
  //         cookies
  //       );

  //       if (response.status >= 200 && response.status < 300) {
  //         if (response.data.responseMessage === "Successful") {
  //           setpackageCheck(true);
  //           setLoading(false);
  //         } else {
  //           console.error("No packages are found for this user id");
  //           setLoading(false);
  //         }
  //       } else {
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("An error occurred while verifying packages:", error);
  //       setLoading(false);
  //     }
  //   };

  //   verifyPackage();
  // }, [cookies]);

  const saveProperty = async () => {
    setLoading(true);
    let params = {
      createdBy: cookies[config.cookieName]?.loginUserId,
      propertyName: formData.buildingName,
      propertyType: formData.propertiesType,
      listingType: formData.propertyListingType,
      buildingType: formData.buildingType,
      subLocality: formData.setsubLocality,
      country: formData.selectedCountry,
      zone: formData.selectedTaluk,
      pincode: formData.pinCode,
      state: formData.selectedState,
      landmark: formData.landMark,
      locality: formData.locality,
      propertyAddress: formData.propertyAdress,
      userPackageId: formData.userPackageId,
      latitude: "73.73387",
      longitude: "23.3423",
      status: "yes",
      city:
        formData.selectedDistrict == "Bengaluru"
          ? "Bangalore"
          : formData.selectedDistrict,
      // amenities: formData.amenities,
      amenities: {
        amenity: formData.amenities,
      },
      youtubeLink: formData.videoLink,
      videoLink: formData.videoLink,
      brokerageType: formData.brokerage,
      brokergeValue: formData.brokeragedata,
      brokerageUnit: formData.brokerageUnit,
      pricingDetails: {
        rent: formData.rentAmount,
        rentType: formData.rentType,
        maintananceCost: formData.maintenanceAmout,
        maintananceCostType: formData.maintananceCostType,
        securityDeposit: formData.securityDeposit,
        depositAmount: formData.customSecurityDeposit,
        bookingAmount: formData.bookingAmount,
        lockInPeriod: formData.lockInPeriod,
        lockInPeriodType: formData.lockInPeriodType,
        rentIncrement: formData.rentIncrement,
      },
      additionalDetails: {
        serviceLiftAvailability: formData.serviceLiftAvailability,
        serviceLiftAvailabilityCount: formData.noOfServiceLifts,
        waterSource: formData.waterSource,
        currentlyLeasedOut: formData.currentlyLeasedOut,
        modifyInterior: formData.modifyInterior,
        brandNewInterior: formData.newInterior,
        interestedInCoWorking: formData.interestInCoWorking,
        buildingGrade: formData.buildingGrade,
        cafeteria: formData.pantryCafeteria,
        taxGovtCharges: formData.taxCharges,
        electricityCharges: formData.eletricityCharges,
        powerInKv: formData.electricPower,
        liftAvailable: formData.liftAvailability,
        liftCount: formData.noOfLifts,
        flooringType: formData.flooringType,
        flooringLiving: formData.livingFlooringType,
        flooringBathroom: formData.bathRoomFlooringType,
        flooringKitchen: formData.kitchenFlooringType,
        flooringBedroom: formData.bedRoomFlooringType,
        flooringMasterBedroom: formData.MasterBedRoomFlooringType,
        flooringBalcony: formData.balconyFlooringType,
        flooringOther: formData.otherFlooringType,
        parking2Wheeler: formData.twoWheeler,
        parking2OpenCount: formData.twoWheelerOpenType,
        parking2CoverCount: formData.twoWheelerClosedType,
        parking4Wheeler: formData.fourWheeler,
        parking4OpenCount: formData.fourWheelerOpenType,
        parking4CoverCount: formData.fourWheelerClosedType,
        powerBackup: formData.powerBackUp,
        waterResource: formData.waterSource,
        overLookingView: formData.overLookingView,
        frontRoadWidth: formData.roadWidth,
        frontRoadWidthType: formData.roadWidthUnit,
      },

      defineProperty: {
        defineLocation: formData.defineLocation
          ? formData.defineLocation.join(", ")
          : "",
        explainingPrice: formData.explainingPrice
          ? formData.explainingPrice.join(", ")
          : "",
        explainingProperty: formData.explainingTheProperty
          ? formData.explainingTheProperty.join(", ")
          : "",
        defineSizeAndStructure: formData.defineSizeStructure
          ? formData.defineSizeStructure.join(", ")
          : "",
        description: formData.description,
      },

      landMarks: {
        hospitalDistance: formData.hospitalDistance,
        hospitalDistanceType: formData.hospitalDistanceUnit,
        airportDistance: formData.airportDistance,
        airportDistanceType: formData.airportDistanceUnit,
        railwayStationDistance: formData.railwayDistance,
        railwayStationDistanceType: formData.railwayDistanceUnit,
        atmDistance: formData.atmDistance,
        atmDistanceType: formData.atmDistanceUnit,
        schoolDistance: formData.schoolDistance,
        schoolDistanceType: formData.schoolDistanceUnit,
        shoppingMallDistance: formData.shoppingMallDistance,
        shoppingMallDistanceType: formData.shoppingMallDistanceUnit,
        bankDistance: formData.bankDistance,
        bankDistanceType: formData.bankDistanceUnit,
        busStopDistance: formData.busStopDistance,
        busStopDistanceType: formData.busStopDistanceUnit,
        metroStationDistance: formData.metroDistance,
        metroStationDistanceType: formData.metroDistanceUnit,
      },

      tenantStatus: {
        foodPreference: formData.foodPreference,
        religiousType: formData.religiousType,
        petsAllowed: formData.petsAllowed,
        tenantType: formData.tenetType ? formData.tenetType.join(", ") : "",
        workPreference: formData.workPreference,
        bachelorsAllowed: formData.tenentBachelorsAllowed
          ? formData.tenentBachelorsAllowed.join(", ")
          : "",
        sprinstersAllowed: formData.tenentSpinstersAllowed
          ? formData.tenentSpinstersAllowed.join(", ")
          : "",
      },

      propertyStatus: {
        tenantPreLeasedUnit: formData.tenantPreleasedUnit,
        govtApproved: formData.govtApproved,
        ageOfProperty: formData.ageofProperty,
        availableFor: formData.availableFor,
        availableFromDate: formData.availableFromDate,
        availableFrom: formData.availbleFrom,
        entranceWidth: formData.widthOfPropertyStatus,
        createdDate: formData.positionStatusDate,
        positionStatus: formData.positionStatus,
        occupancyDays: formData.occupancyDays,
        ownershipType: formData.owenershipType,
        aboutPropertySuitableFor: formData.propertySuitableFor
          ? formData.propertySuitableFor.join(", ")
          : "",
        locationHub: formData.locationHub
          ? formData.locationHub.join(", ")
          : "",
        heightSealing: formData.heightSealingOfPropertyStatus,
        locatedNear: formData.locatedNear
          ? formData.locatedNear.join(", ")
          : "",
        positionStatusType: null,
      },

      furnishingStatus: {
        furnishingType: formData.furnishingStatus,
        airConditionAvailable: formData.ac.name,
        airConditionCount: formData.ac.count,
        bedsAvailable: formData.beds.name,
        bedsCount: formData.beds.count,
        gasConnectionAvailable: formData.gas.name,
        gasConnectionCount: formData.gas.count,
        modularKitchen: formData.modularKitchen.name,
        modularKitchenCount: formData.modularKitchen.count,
        ledLightsAvailable: formData.led.name,
        ledLightsCount: formData.led.count,
        washingMachineAvailable: formData.washingMachine.name,
        washingMachineCount: formData.washingMachine.count,
        refrigeratorAvailable: formData.refrigerator.name,
        refrigeratorCount: formData.refrigerator.count,
        sofaAvailable: formData.sofa.name,
        sofaCount: formData.sofa.count,
        tvAvailable: formData.tv.name,
        tvCount: formData.tv.count,
        wardrobeAvailable: formData.wardrobe.name,
        wardrobeCount: formData.wardrobe.count,
        waterPurifier: formData.waterPurifier.name,
        waterPurifierCount: formData.waterPurifier.count,
        fan: formData.fan.name,
        fanCount: formData.fan.count,
        exhaustFan: formData.exhaustFan.name,
        exhaustFanCount: formData.exhaustFan.count,
        stove: formData.stove.name,
        stoveCount: formData.stove.count,
        curtains: formData.curtains.name,
        curtainsCount: formData.curtains.count,
        chimney: formData.chimney.name,
        chimneyCount: formData.chimney.count,
        microWave: formData.microWave.name,
        microWaveCount: formData.microWave.count,
        diningTables: formData.diningTables.name,
        diningTablesCount: formData.diningTables.count,
        wifiAvailable: formData.wifi?.name,
        wifiCount: formData.wifi?.count,
        geyserAvailable: formData.geyser?.name,
        geyserCount: formData.geyser?.count,
        chairs: formData.chairs.name,
        chairsCount: formData.chairs.count,
        linear: formData.linear?.name,
        linearCount: formData.linear?.count,
        cubical: formData.cubical?.name,
        cubicalCount: formData.cubical?.count,
        officeTables: formData.officeTables.name,
        officeTablesCount: formData.officeTables.count,
        meetingRooms: formData.meetingRoom?.name,
        meetingRoomsCount: formData.meetingRoom?.count,
        medicalKits: formData.mediclKits.name,
        medicalKitsCount: formData.mediclKits.count,
        conferenceRooms: formData.confernceRooms.name,
        conferenceRoomsCount: formData.confernceRooms.count,
        recreationalFacility: formData.recreational.count,
        recreationalFacilityCount: formData.recreational.count,
        printingMachines: formData.printingMachine.name,
        printingMachinesCount: formData.printingMachine.count,
        smartBoard: formData.smartBoard.name,
        smartBoardCount: formData.smartBoard.count,
        projectors: formData.projectors.name,
        projectorsCount: formData.projectors.count,
        tables: formData.tables?.name,
        tablesCount: formData.tables?.count,
      },

      propertyAreaDetails: {
        salableArea: formData.salableArea,
        keepItPrivate: formData.keepItPrivate,
        builtupPlotArea: formData.builtupArea,
        plotArea: formData.plotArea,
        superBuiltupArea: formData.superBuiltupArea,
        carpetArea: formData.carpetArea,
        areaUnit: formData.areaUnit ? formData.areaUnit.label : "",
        privatePoolAvailability: formData.privatePoolAvailability,
        privateGardenAvailability: formData.privateGardenAvailability,
        privateGardenArea: formData.privateGardenArea,
        noOfBedrooms: formData.numberOfBedRooms,
        noOfBathrooms: formData.numberOfBathRooms,
        noOfBalconies: formData.numberOfBalconies,
        additionalRooms: formData.additionalRooms,
        floorNo: formData.floorNumber,
        towerBlockNo: formData.towerOrBlockNumber,
        flatNo: formData.flatNumber,
        propertyLevel: formData.propertyLevel,
        cornerFlat: formData.cornerUnit ? formData.cornerUnit : null,
        terraceAreaFlag: formData.terraceAreaFlag,
        terraceArea: formData.terraceArea,
        terraceAreaUnit: formData.terraceAreaFlag,
        totalFloors: formData.totalFloor,
        openSides: formData.openSides,
        facing: formData.facing,
        occupancyType: formData.occupancyType,
        occupancyCertificate: formData.occupancyCertificate,
        privateWashroom: formData.privateWashRoom,
        privateWashroomCount: formData.privateWashroomCount,
        publicWashroom: formData.publicWashRoom,
        publicWashroomCount: formData.publicWashroomCount
          ? formData.publicWashroomCount.label
          : "",
        gardenArea: formData.privateGardenArea,
        pantry: formData.pantryCafeteria
          ? formData.pantryCafeteria
          : formData.pantryOrCafeteria,
        spaceType: formData.spaceType,
        buildingStatus: formData.occupancyType,
        compoundWallMade: formData.compoundWallMade,
        breadthFeet: formData.breadthInFeet,
        lengthFeet: formData.lengthInFeet,
        noOfFloorsAllowed: formData.numberOfFloorsAllowed,
        areaUnit: formData.areaUnit,
      },
      reraStatus: {
        reraAvailable: formData.reraAvailable,
        reraNo: formData.reraNumber,
      },
      propertyImages: formData.allImages,
      propertyFloorRooms: formData.data,
    };

    if (formData.propertiesType === "PG/Co-living") {
      params.pgRegulations = {
        nonVegAllowed: formData.nonVeg,
        oppositeSex: formData.oppSex,
        anyTimeAllowed: formData.time,
        visitorAllowed: formData.visitor,
        guardianAllowed: formData.guardian,
        drinkingAllowed: formData.drinks,
        smokingAllowed: formData.smoking,
      };
    }

    if (formData.propertiesType === "PG/Co-living") {
      params.pgOwnerDetails = {
        propertyManagedBy: formData.propertyManagedBy
          ? formData.propertyManagedBy.join(", ")
          : "",
        propertyManagerStay: formData.propertyManagedStaysAtProperty,
      };
    }
    if (formData.propertiesType === "PG/Co-living") {
      params.pgDetails = {
        totalBeds: formData.noOfPgBeds,
        pgFor: formData.pgFor,
        mealsAvailable: formData.mealsAvailable,
        commonAreas: formData.commonAreas
          ? formData.commonAreas.join(", ")
          : "",
        noticePeriod: formData.noticePeriod,
        lockInPeriod: formData.pgLockInPeriod,
        bestSuitedFor: formData.bestSuitedFor,
      };
    }

    if (formData.propertiesType === "PG/Co-living") {
      params.pgRoomDetails = {
        totalBedsInRoom: formData.noOfBedsinRoom
          ? formData.noOfBedsinRoom.join(", ")
          : "",
        roomType: formData.roomType ? formData.roomType.join(", ") : "",
        rent: formData.pgRentAmount,
        rentType: formData.pgRentType,
        securedDeposit: formData.pgSecurityDeposit,
        securedDepositAmount: formData.pgCustomSecurityDeposit,
        parking2Wheeler: formData.pgTwoWheeler,
        parking2OpenType: formData.pgTwoWheelerOpenType?.label || "",
        parking2CoverType: formData.pgTwoWheelerClosedType?.label || "",
        parking4Wheeler: formData.pgFourWheeler,
        parking4OpenType: formData.pgFourWheelerOpenType?.label || "",
        parking4CoverType: formData.pgFourWheelerClosedType?.label || "",
        facilityOffered: formData.facilityOffered
          ? formData.facilityOffered.join(", ")
          : "",
      };
    }

    // Save Property
    let response = await invokeApi(
      config.apiDomains + apiList.saveProperty,
      params,
      cookies
    );

    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success("Property data saved successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setFormData(allStepsData);
      } else {
        alert(
          "Something went wrong while saving property data. Please try again later!"
        );
      }
    } else {
      alert(
        "Something went wrong while saving property data. Please try again later!!"
      );
    }
    setLoading(false);
    setActiveStep(0);
  };

  const handleNext1 = () => {
    if (
      formData.propertiesType !== "Rooftop" &&
      formData.propertiesType !== "Industrial Plot/Land" &&
      formData.propertiesType !== "Commercial Plot/Land" &&
      formData.propertiesType !== "Shed/Factory" &&
      formData.propertiesType !== "Warehouse/Godown"
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep(9);
    }
  };
  const handleNextSkipTenantStatus = () => {
    if (
      formData.buildingType !== "Commercial" &&
      formData.buildingType !== "Industrial" &&
      formData.propertyListingType !== "Lease" &&
      formData.propertiesType !== "PG Building" &&
      formData.propertiesType !== "PG/Co-living"
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep(4);
    }
  };
  const handleNextSkipReraStatus = () => {
    if (formData.propertyListingType !== "Rent") {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep(6);
    }
    if (
      formData.propertiesType !== "Industrial Plot/Land" &&
      formData.propertiesType !== "Commercial Plot/Land" &&
      formData.propertiesType !== "Shed/Factory" &&
      formData.propertiesType !== "Warehouse/Godown"
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep(9);
    }
  };
  const handleBackSkipReraStatus = () => {
    if (formData.propertyListingType !== "Rent") {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      setActiveStep(6);
    }
    if (
      formData.propertiesType !== "Industrial Plot/Land" &&
      formData.propertiesType !== "Commercial Plot/Land" &&
      formData.propertiesType !== "Shed/Factory" &&
      formData.propertiesType !== "Warehouse/Godown"
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep);
    } else {
      setActiveStep(6);
    }
  };
  const handleBack1 = () => {
    if (
      formData.propertiesType !== "Rooftop" &&
      formData.propertiesType !== "Industrial Plot/Land" &&
      formData.propertiesType !== "Commercial Plot/Land" &&
      formData.propertiesType !== "Shed/Factory" &&
      formData.propertiesType !== "Warehouse/Godown"
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      setActiveStep(6);
    }
  };
  const handleBackSkipTenantStatus = () => {
    if (
      formData.buildingType !== "Commercial" &&
      formData.buildingType !== "Industrial" &&
      formData.propertyListingType !== "Lease" &&
      formData.propertiesType !== "PG Building" &&
      formData.propertiesType !== "PG/Co-living"
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      setActiveStep(2);
    }
  };

  useEffect(() => {
    if (activeStep > 0 && activeStep < steps.length) {
      setstepValue(steps[activeStep].label);
    } else if (activeStep === 0) {
      nextStep(null);
    } else {
      setstepValue(null);
    }
  }, [activeStep, steps]);

  useEffect(() => {
    const updatedStepsCopy = updatedSteps.map((step) => ({ ...step }));

    if (
      [
        "Rooftop",
        "Industrial Plot/Land",
        "Commercial Plot/Land",
        "Shed/Factory",
        "Warehouse/Godown",
      ].includes(formData.propertiesType)
    ) {
      const indexOfFurnishingStatus = updatedStepsCopy.findIndex(
        (step) => step.label === "Furnishing Status"
      );
      if (indexOfFurnishingStatus !== -1) {
        updatedStepsCopy[indexOfFurnishingStatus].isvisible = false;
      }
    }

    if (
      formData.buildingType === "Commercial" ||
      formData.buildingType === "Industrial" ||
      formData.propertiesType === "PG Building" ||
      formData.propertyListingType === "Lease" ||
      formData.propertiesType === "PG/Co-living"
    ) {
      const indexOfTenentStatus = updatedStepsCopy.findIndex(
        (step) => step.label === "Tenant Status"
      );
      if (indexOfTenentStatus !== -1) {
        updatedStepsCopy[indexOfTenentStatus].isvisible = false;
      }
    }
    if (formData.propertyListingType === "Rent") {
      const indexOfReraStatus = updatedStepsCopy.findIndex(
        (step) => step.label === "RERA Status"
      );
      if (indexOfReraStatus !== -1) {
        updatedStepsCopy[indexOfReraStatus].isvisible = false;
      }
    }

    setSteps(updatedStepsCopy);
  }, [formData.propertiesType, formData.buildingType]);

  return (
    <>
      <Box>
        {packageCheck && (
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                margin: "auto",
                overflowX: "scroll",
                gap: "10px",
                pl: 2,
              }}
              className="custom-scrollbar"
            >
              {activeStep !== 0 &&
                activeStep !== steps.length &&
                steps.map((item) => {
                  if (
                    item.isvisible &&
                    formData.propertiesType !== "PG/Co-living"
                  ) {
                    return ( <Box key={item.label}
                          className="mydict"
                          sx={{
                            boxSizing: "initial",
                            userSelect: "none",
                          }}
                        >
                          <label
                            className={`mydict1 border1 ${activeStep === item.value ? "active-step" : ""
                              }`}
                            onClick={() => handleTabClick(item.value)}
                            style={{
                              marginRight: "5px",
                              marginBottom: "5px",
                              boxShadow: "none",
                              cursor: "pointer",
                            }}
                          >
                            <input
                              type="radio"
                              name="20maage2"
                              value={item.label}
                              checked={stepValue === item.label}
                              readOnly
                            />
                            <span
                              className="border1"
                              style={{
                                marginRight: "15px",
                                boxShadow: "none",
                                fontFamily: "Mulish, sans-serif",
                                whiteSpace: "nowrap", // Set white space to nowrap
                              }}
                            >
                              {item.label}
                            </span>
                          </label>
                        </Box> ); } else if (
                    item.isvisible &&
                    formData.propertiesType === "PG/Co-living"
                  ) {
                    return (
                      <Box
                        key={item.label}
                        className="mydict"
                        style={{
                          marginRight: "5px",
                          marginBottom: "5px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <label
                          className={`mydict1 border1 ${activeStep === item.value ? "active-step" : ""
                            }`}
                          onClick={() => handleTabClick(item.value)}
                          style={{
                            marginRight: "5px",
                            marginBottom: "5px",
                            boxShadow: "none",
                            userSelect: "none",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="radio"
                            name="20maage2"
                            value={item.label}
                            checked={stepValue === item.label}
                            readOnly
                          />
                          <span
                            className="border1"
                            style={{
                              marginRight: "15px",
                              marginBottom: "-15px",
                              boxShadow: "none",
                            }}
                          >
                            {formData.propertiesType === "PG/Co-living" &&
                              item.label === "Property Details"
                              ? "Owner/Care Taker Details"
                              : formData.propertiesType === "PG/Co-living" &&
                                item.label === "Area Details"
                                ? "Property Details"
                                : formData.propertiesType === "PG/Co-living" &&
                                  item.label === "Property Rent"
                                  ? "PG Rules"
                                  : formData.propertiesType === "PG/Co-living" &&
                                    item.label === "Additional Details"
                                    ? "Room Details"
                                    : item.label}
                          </span>
                        </label>
                      </Box>
                    );
                  }
                  return null;
                })}
            </Box>

            {activeStep === steps.length ? (
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "40vh",
                  }}
                >
                  {loading && (
                    <Typography
                      sx={{
                        mt: 10,
                        fontSize: "25px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Please wait... Property details are saving
                    </Typography>
                  )}
                  {loading && (
                    <Stack
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 2,
                      }}
                    >
                      <CircularProgress sx={{ color: "black" }} />
                    </Stack>
                  )}
                  {!loading && (
                    <PreView
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      }
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                      detailsId={details?.id}
                    />
                  )}
                  {!loading && (
                    <Button
                      onClick={() => saveProperty()}
                      variant="outlined"
                      sx={{
                        color: "black",
                        width: "8%",
                        mt: 3,
                        mb: 2,
                        borderColor: "black",
                      }}
                    >
                      Submit
                    </Button>
                  )}

                  {!loading && (
                    <Button
                      color="inherit"
                      onClick={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      }
                    >
                      Back
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            ) : (
              <>
                <Box id="active-step-container" sx={{ ml: 3, mt: 2 }}>
                  {/* {activeStep === 0 && (
                        <PropertyListing
                          next={() =>
                            setActiveStep(
                              (prevActiveStep) => prevActiveStep + 1
                            )
                          }
                          back={() =>
                            setActiveStep(
                              (prevActiveStep) => prevActiveStep - 1
                            )
                          }
                          updateFormData={(updatedData) =>
                            setFormData({ ...formData, ...updatedData })
                          }
                          formData={formData}
                          detailsId={details?.id}
                        />
                      )} */}
                  {activeStep === 1 && (
                    <LocationDetails
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={() => nextStep(null)}
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                    />
                  )}
                  {activeStep === 2 && (
                    <Box>
                      <AreaDetails
                        next={handleNextSkipTenantStatus}
                        back={() =>
                          setActiveStep((prevActiveStep) => prevActiveStep - 1)
                        }
                        updateFormData={(updatedData) =>
                          setFormData({ ...formData, ...updatedData })
                        }
                        formData={formData}
                      />
                    </Box>
                  )}
                  {activeStep === 3 && (
                    <TenentStatus
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      }
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                    />
                  )}
                  {activeStep === 4 && (
                    <PropertyStatus
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={handleBackSkipTenantStatus}
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                    />
                  )}
                  {activeStep === 5 && (
                    <PropertyRent
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      }
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                    />
                  )}
                  {activeStep === 6 && (
                    <AdditionalDetails
                      next={handleNextSkipReraStatus}
                      back={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      }
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                    />
                  )}
                  {/* {activeStep === 7 && (
                        <ReraStatus
                          next={handleNext1}
                          back={() =>
                            setActiveStep(
                              (prevActiveStep) => prevActiveStep - 1
                            )
                          }
                          updateFormData={(updatedData) =>
                            setFormData({ ...formData, ...updatedData })
                          }
                          formData={formData}
                        />
                      )} */}
                  {activeStep === 7 && (
                    <FurnishingStatus
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={handleBackSkipReraStatus}
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                      activeSteps={activeStep}
                    />
                  )}

                  {activeStep === 8 && (
                    <Amenities
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={handleBack1}
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                    />
                  )}
                  {activeStep === 9 && (
                    <LandMark
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      }
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                    />
                  )}
                  {activeStep === 10 && (
                    <DefineYourProperty
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      }
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                    />
                  )}
                  {activeStep === 11 && (
                    <ImageUploader
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      }
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                    />
                  )}
                  {activeStep === 12 && (
                    <BrakerageDetails
                      next={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                      }
                      back={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      }
                      updateFormData={(updatedData) =>
                        setFormData({ ...formData, ...updatedData })
                      }
                      formData={formData}
                    />
                  )}

                  {activeStep === steps.length && (
                    <Stack
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                      }}
                    >
                      <CircularProgress sx={{ color: "black" }} />
                    </Stack>
                  )}
                </Box>
              </>
            )}
          </>
        )}
      </Box>
      {activeStep === 0 && loading && (
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "200px",
          }}
        >
          <CircularProgress sx={{ color: "black" }} />
        </Stack>
      )}
      {activeStep === 0 && !loading && !packageCheck && (
        <Typography>Please purchase a package</Typography>
      )}
    </>
  );
}

export default AddRentAndLeaseProperty;
