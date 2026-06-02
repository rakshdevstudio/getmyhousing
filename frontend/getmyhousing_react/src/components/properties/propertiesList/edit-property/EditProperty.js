import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import "./../../post-properties/post-sale-property/post-property-steps/Commercial.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import LocationDetails from "../../post-properties/post-rent&lease-property/post-property-steps/LocationDetails";
import AreaDetails from "../../post-properties/post-rent&lease-property/post-property-steps/AreaDetails";
import PropertyStatus from "../../post-properties/post-rent&lease-property/post-property-steps/PropertyStatus";
import PropertyRent from "../../post-properties/post-rent&lease-property/post-property-steps/PropertyRent";
import AdditionalDetails from "../../post-properties/post-rent&lease-property/post-property-steps/AdditionalDetails";
import Amenities from "../../post-properties/post-rent&lease-property/post-property-steps/Amenities";
import LandMark from "../../post-properties/post-rent&lease-property/post-property-steps/LandMark";
import DefineYourProperty from "../../post-properties/post-rent&lease-property/post-property-steps/DefineYourProperty";
import { apiList, invokeApi } from "../../../../apis/apiServices";
import { config } from "../../../../config/config";
import TenentStatus from "../../post-properties/post-rent&lease-property/post-property-steps/TenentStatus";
import ImageUploader from "../../post-properties/post-rent&lease-property/post-property-steps/UploadImage";
import PreView from "../../post-properties/post-rent&lease-property/post-property-steps/PreView";
import { useParams } from "react-router-dom";
import FurnishingStatus from "../../post-properties/post-rent&lease-property/post-property-steps/FurnishingStatus";
import { Bounce, toast } from "react-toastify";
import { isEmpty, units } from "../../../../common/common";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SaleEditProperty } from "./SaleEditProperty";
import BrakerageDetails from "../../post-properties/post-rent&lease-property/post-property-steps/BrokerageDetails";
import { useNavigate } from "react-router-dom";

export function RentEditProperty({ details }) {
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const updatedSteps = [
    // { label: "Property Listing", value: 0, isvisible: false },
    { label: "Location", value: 1, isvisible: true },
    { label: "Area Details", value: 2, isvisible: true },
    { label: "Tenent Status", value: 3, isvisible: true },
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

  const [loading, setLoading] = useState(false);
  const [stepValue, setstepValue] = useState("");
  const [endPoint, setendPoint] = useState(null);
  const [params, setParams] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [steps, setSteps] = useState(updatedSteps);

  let areadetail = [];

  if (!isEmpty(details.propertyAreaDetails?.plotArea)) {
    areadetail = [1];
  }
  if (!isEmpty(details.propertyAreaDetails?.superBuiltupArea)) {
    areadetail = [1, 2];
  }

  if (!isEmpty(details.propertyAreaDetails?.builtupPlotArea)) {
    areadetail = [1, 2, 3];
  }

  if (!isEmpty(details.propertyAreaDetails?.carpetArea)) {
    areadetail = [1, 2, 3, 4];
  }

  if (!isEmpty(details.propertyAreaDetails?.salebleArea)) {
    areadetail = [1, 2, 3, 4, 5];
  }

  const featuredImages = details.propertyGalleryImages
    ? details.propertyGalleryImages.filter(
        (image) => image.imageType === "featured"
      )
    : [];

  const featuredImageId = details.propertyGalleryImages
    ? details.propertyGalleryImages.filter(
        (image) => image.imageType === "featured"
      ).id
    : "";

  const galleryImages = details.propertyGalleryImages
    ? details.propertyGalleryImages.filter(
        (image) => image.imageType === "gallery"
      )
    : [];

  const airCondition = {
    count: details.furnishingStatus?.airConditionAvailable,
    name: details.furnishingStatus?.airConditionCount,
  };
  const linearDetail = {
    count: details.furnishingStatus?.linear,
    name: details.furnishingStatus?.linearCount,
  };
  const meetingRoomDetail = {
    count: details.furnishingStatus?.meetingRooms,
    name: details.furnishingStatus?.meetingRoomsCount,
  };
  const cubicalDetail = {
    count: details.furnishingStatus?.cubical,
    name: details.furnishingStatus?.cubicalCount,
  };
  const wifiDetail = {
    count: details.furnishingStatus?.wifiAvailable,
    name: details.furnishingStatus?.wifiCount,
  };
  const geyserDetail = {
    count: details.furnishingStatus?.geyserAvailable,
    name: details.furnishingStatus?.geyserCount,
  };
  const modularKitchenDetail = {
    count: details.furnishingStatus?.modularKitchen,
    name: details.furnishingStatus?.modularKitchenCount,
  };
  const diningTablesDetail = {
    count: details.furnishingStatus?.diningTables,
    name: details.furnishingStatus?.diningTablesCount,
  };
  const tableDetail = {
    count: details.furnishingStatus?.tables,
    name: details.furnishingStatus?.tablesCount,
  };
  const projectorsDetail = {
    count: details.furnishingStatus?.projectors,
    name: details.furnishingStatus?.projectorsCount,
  };
  const smartBoardDetail = {
    count: details.furnishingStatus?.smartBoard,
    name: details.furnishingStatus?.smartBoardCount,
  };
  const coffieMachineDetail = {
    count: details.furnishingStatus?.coffeeMachines,
    name: details.furnishingStatus?.coffeeMachinesCount,
  };
  const printingMachineDetail = {
    count: details.furnishingStatus?.printingMachines,
    name: details.furnishingStatus?.printingMachinesCount,
  };
  const recreationalDetail = {
    count: details.furnishingStatus?.recreational,
    name: details.furnishingStatus?.recreationalCount,
  };
  const confernceRoomsDetail = {
    count: details.furnishingStatus?.confernceRooms,
    name: details.furnishingStatus?.confernceRoomsCount,
  };
  const medicalKitDetail = {
    count: details.furnishingStatus?.mediclKits,
    name: details.furnishingStatus?.mediclKitsCount,
  };
  const chairsDetail = {
    count: details.furnishingStatus?.chairs,
    name: details.furnishingStatus?.chairsCount,
  };
  const microWaveDetail = {
    count: details.furnishingStatus?.microWave,
    name: details.furnishingStatus?.microWaveCount,
  };
  const chimneyDetail = {
    count: details.furnishingStatus?.chimney,
    name: details.furnishingStatus?.chimneyCount,
  };
  const curtainDetail = {
    count: details.furnishingStatus?.curtains,
    name: details.furnishingStatus?.curtainsCount,
  };
  const stoveDetail = {
    count: details.furnishingStatus?.stove,
    name: details.furnishingStatus?.stoveCount,
  };
  const exhaustFanDetail = {
    count: details.furnishingStatus?.exhaustFan,
    name: details.furnishingStatus?.exhaustFanCount,
  };
  const fanDetail = {
    count: details.furnishingStatus?.fan,
    name: details.furnishingStatus?.fanCount,
  };
  const officeTableDetail = {
    count: details.furnishingStatus?.officeTables,
    name: details.furnishingStatus?.officeTablesCount,
  };
  const waterPurifierDetail = {
    count: details.furnishingStatus?.waterPurifier,
    name: details.furnishingStatus?.waterPurifierCount,
  };

  const bedsdetail = {
    count: details.furnishingStatus?.bedsAvailable,
    name: details.furnishingStatus?.bedsCount,
  };
  const ledDetail = {
    count: details.furnishingStatus?.ledLightsAvailable,
    name: details.furnishingStatus?.ledLightsCount,
  };
  const sofaDetail = {
    count: details.furnishingStatus?.sofaAvailable,
    name: details.furnishingStatus?.sofaCount,
  };
  const tvDetail = {
    count: details.furnishingStatus?.tvAvailable,
    name: details.furnishingStatus?.tvCount,
  };
  const washingMachineDetail = {
    count: details.furnishingStatus?.washingMachineAvailable,
    name: details.furnishingStatus?.washingMachineCount,
  };
  const wardrobeDetail = {
    count: details.furnishingStatus?.wardrobeAvailable,
    name: details.furnishingStatus?.wardrobeCount,
  };
  const gasDetails = {
    count: details.furnishingStatus?.gasConnectionAvailable,
    name: details.furnishingStatus?.gasConnectionCount,
  };
  const refreigeratorDetail = {
    count: details.furnishingStatus?.refrigeratorAvailable,
    name: details.furnishingStatus?.refrigeratorCount,
  };

  let amenitiesArray = details.amenitiesList?.map((item) => item.amenities);

  const publicWashRoomValue = details.propertyAreaDetails?.publicWashroomCount;

  const [formData, setFormData] = useState({
    selectedCountry: details.country,
    selectedState: details.state,
    selectedDistrict: details.city,
    selectedTaluk: null,
    setsubLocality: details.setsubLocality,
    locality: details.locality,
    pinCode: details.pincode,
    propertyAdress: details.propertyAddress,
    landMark: details.landmark,
    ageofpropertyList: details.propertyStatus?.ageOfProperty,
    selectPriceInclude: details.pricingDetails?.selectPriceInclude,
    buildingName: details.propertyName,
    areaType: "",
    description: details.defineProperty?.description,
    brokerage: details?.brokerageType,
    brokeragedata: details?.brokergeValue,
    brokerageUnit: details?.brokerageUnit,
    plotArea: details.propertyAreaDetails?.plotArea,
    builtupArea: details.propertyAreaDetails
      ? details.propertyAreaDetails.builtupPlotArea
      : "",
    salableArea: details.propertyAreaDetails?.salableArea,
    superBuiltupArea: details.propertyAreaDetails
      ? details.propertyAreaDetails.superBuiltupArea
      : "",
    carpetArea: details.propertyAreaDetails
      ? details.propertyAreaDetails.carpetArea
      : "",
    areaUnit: details.propertyAreaDetails?.areaUnit,
    showAreas: areadetail,
    floorNumber: details.propertyAreaDetails?.floorNo,
    totalFloor: details.propertyAreaDetails?.totalFloors,
    flatNumber: details.propertyAreaDetails
      ? details.propertyAreaDetails.flatNo
      : "",
    cornerUnit: details.propertyAreaDetails
      ? details.propertyAreaDetails.cornerFlat
      : "",
    occupancyCertificate: details.propertyAreaDetails
      ? details.propertyAreaDetails.occupancyCertificate
      : "",
    privateWashRoom: details.propertyAreaDetails
      ? details.propertyAreaDetails.privateWashroom
      : "",
    publicWashRoom: details.propertyAreaDetails
      ? details.propertyAreaDetails.publicWashroom
      : "",
    availableFor: details.propertyStatus
      ? details.propertyStatus.availableFor
      : "",
    positionStatus: details.propertyStatus
      ? details.propertyStatus.positionStatus
      : "",
    availbleFrom: details.propertyStatus
      ? details.propertyStatus.availableFrom
      : "",
    availableFromDate: details.propertyStatus
      ? details.propertyStatus.availableFromDate
      : "",
    occupancyDays: details.propertyStatus
      ? details.propertyStatus.occupancyDays
      : "",
    ageofProperty: details.propertyStatus
      ? details.propertyStatus.ageOfProperty
      : "",
    owenershipType: details.propertyStatus
      ? details.propertyStatus.ownershipType
      : "",
    rentAmountFor: details.pricingDetails ? details.pricingDetails : "",
    maintenanceAmoutFor: details.pricingDetails ? details.pricingDetails : "",
    securityDeposit: details.pricingDetails
      ? details.pricingDetails.securityDeposit
      : "",
    pgSecurityDeposit: details.pgRoomDetails
      ? details.pgRoomDetails.securedDeposit
      : "",
    customSecurityDeposit: details.pricingDetails
      ? details.pricingDetails.depositAmount
      : "",
    pgCustomSecurityDeposit: details.pgRoomDetails
      ? details.pgRoomDetails.securedDepositAmount
      : "",
    bookingAmount: details.pricingDetails
      ? details.pricingDetails.bookingAmount
      : "",
    pantryOrCafeteria: details.propertyAreaDetails
      ? details.propertyAreaDetails.pantry
      : "",
    lockInPeriodFor: "",
    rentIncrementFor: details.pricingDetails ? details.pricingDetails : "",
    currentlyLeasedOut: details.additionalDetails
      ? details.additionalDetails.currentlyLeasedOut
      : "",
    taxCharges: details.additionalDetails
      ? details.additionalDetails.taxGovtCharges
      : "",
    modifyInterior: details.additionalDetails
      ? details.additionalDetails.modifyInterior
      : "",
    newInterior: details.additionalDetails
      ? details.additionalDetails.brandNewInterior
      : "",
    buildingGrade: details.additionalDetails
      ? details.additionalDetails.buildingGrade
      : "",
    eletricityCharges: details.additionalDetails
      ? details.additionalDetails.electricityCharges
      : "",
    electricityPower: details.additionalDetails
      ? details.additionalDetails.powerInKv
      : "",
    liftAvailability: details.additionalDetails
      ? details.additionalDetails.liftAvailable
      : "",
    buildingMaterial: details.additionalDetails
      ? details.additionalDetails
      : "",
    twoWheeler: details.additionalDetails
      ? details.additionalDetails.parking2Wheeler
      : "",
    pgTwoWheeler: details.pgRoomDetails
      ? details.pgRoomDetails.parking2Wheeler
      : "",
    fourWheeler: details.additionalDetails
      ? details.additionalDetails.parking4Wheeler
      : "",
    pgFourWheeler: details.pgRoomDetails
      ? details.pgRoomDetails.parking4Wheeler
      : "",
    powerBackUp: details.additionalDetails
      ? details.additionalDetails.powerBackup
      : "",
    waterSource: details.additionalDetails
      ? details.additionalDetails.waterSource
      : "",
    overLookingView: details.additionalDetails
      ? details.additionalDetails.overLookingView
      : "",
    frontRoadWidth: details.additionalDetails
      ? details.additionalDetails.frontRoadWidth
      : "",
    propertyListingType: details.listingType,
    buildingType: details.buildingType,
    propertiesType: details.propertyType,
    furnishingStatus: details.furnishingStatus
      ? details.furnishingStatus.furnishingType
      : "",
    typeOfWorkStation: "",
    seatType: "",
    noOfSeats: "",
    amenities: amenitiesArray,

    hospitalDistance: details.landMarks
      ? details.landMarks.hospitalDistance
      : "",
    hospitalDistanceUnit: details.landMarks
      ? details.landMarks.hospitalDistanceType
      : "",
    metroDistance: details.landMarks
      ? details.landMarks.metroStationDistance
      : "",
    airportDistance: details.landMarks ? details.landMarks.airportDistance : "",
    bankDistanceUnit: details.landMarks
      ? details.landMarks.bankDistanceType
      : "",
    airportDistanceUnit: details.landMarks
      ? details.landMarks.airportDistanceType
      : "",
    railwayDistance: details.landMarks
      ? details.landMarks.railwayStationDistance
      : "",
    busStopDistance: details.landMarks ? details.landMarks.busStopDistance : "",
    railwayDistanceUnit: details.landMarks
      ? details.landMarks.railwayStationDistanceType
      : "",
    atmDistance: details.landMarks ? details.landMarks.atmDistance : "",
    busStopDistanceUnit: details.landMarks
      ? details.landMarks.busStopDistanceType
      : "",
    atmDistanceUnit: details.landMarks ? details.landMarks.atmDistanceType : "",
    schoolDistance: details.landMarks ? details.landMarks.schoolDistance : "",
    schoolDistanceUnit: details.landMarks
      ? details.landMarks.schoolDistanceType
      : "",
    shoppingMallDistance: details.landMarks
      ? details.landMarks.shoppingMallDistance
      : "",
    shoppingMallDistanceUnit: details.landMarks
      ? details.landMarks.shoppingMallDistanceType
      : "",
    bankDistance: details.landMarks ? details.landMarks.bankDistance : "",
    metroDistanceUnit: details.landMarks
      ? details.landMarks.metroStationDistanceType
      : "",
    defineLocation: details.defineProperty
      ? details.defineProperty.defineLocation.split(", ")
      : "",
    explainingPrice: details.defineProperty
      ? details.defineProperty.explainingPrice.split(", ")
      : "",
    explainingTheProperty: details.defineProperty
      ? details.defineProperty.explainingProperty.split(", ")
      : "",
    defineSizeStructure: details.defineProperty
      ? details.defineProperty.defineSizeAndStructure.split(", ")
      : "",
    flooringType: details.additionalDetails
      ? details.additionalDetails.flooringType
      : "",
    livingFlooringType: details.additionalDetails
      ? details.additionalDetails.flooringLiving
      : "",
    kitchenFlooringType: details.additionalDetails
      ? details.additionalDetails.flooringKitchen
      : "",
    bedRoomFlooringType: details.additionalDetails
      ? details.additionalDetails.flooringBedroom
      : "",
    MasterBedRoomFlooringType: details.additionalDetails
      ? details.additionalDetails.flooringMasterBedroom
      : "",
    bathRoomFlooringType: details.additionalDetails
      ? details.additionalDetails.flooringBathroom
      : "",
    balconyFlooringType: details.additionalDetails
      ? details.additionalDetails.flooringBalcony
      : "",
    otherFlooringType: details.additionalDetails
      ? details.additionalDetails.flooringOther
      : "",
    noOfLifts: details.additionalDetails
      ? details.additionalDetails.liftCount
      : "",
    noOfServiceLifts: details.additionalDetails
      ? details.additionalDetails.serviceLiftAvailabilityCount
      : "",
    roomType: details.pgRoomDetails
      ? details.pgRoomDetails.roomType.split(", ")
      : "",
    noOfBedsinRoom: details.pgRoomDetails
      ? details.pgRoomDetails.totalBedsInRoom.split(", ")
      : "",
    facilityOffered: details.pgRoomDetails
      ? details.pgRoomDetails.facilityOffered.split(", ")
      : "",
    rentAmount: details.pricingDetails ? details.pricingDetails.rent : "",
    pgRentAmount: details.pgRoomDetails ? details.pgRoomDetails.rent : "",
    rentType: details.pricingDetails ? details.pricingDetails.rentType : "",
    pgRentType: details.pgRoomDetails ? details.pgRoomDetails.rentType : "",
    maintenanceAmout: details.pricingDetails
      ? details.pricingDetails.maintananceCost
      : "",
    maintananceCostType: details.pricingDetails
      ? details.pricingDetails.maintananceCostType
      : "",
    lockInPeriod: details.pricingDetails
      ? details.pricingDetails.lockInPeriod
      : "",
    lockInPeriodType: details.pricingDetails
      ? details.pricingDetails.lockInPeriodType
      : "",
    rentIncrement: details.pricingDetails
      ? details.pricingDetails.rentIncrement
      : "",
    nonVeg: details.pgRegulations ? details.pgRegulations.nonVegAllowed : "",
    oppSex: details.pgRegulations ? details.pgRegulations.oppositeSex : "",
    data: [],
    time: details.pgRegulations ? details.pgRegulations.anyTimeAllowed : "",
    visitor: details.pgRegulations ? details.pgRegulations.visitorAllowed : "",
    guardian: details.pgRegulations
      ? details.pgRegulations.guardianAllowed
      : "",
    drinks: details.pgRegulations ? details.pgRegulations.drinkingAllowed : "",
    smoking: details.pgRegulations ? details.pgRegulations.smokingAllowed : "",
    electricPower: details.additionalDetails
      ? details.additionalDetails.powerInKv
      : "",
    electricPowerUnit: "",
    serviceLiftAvailability: details.additionalDetails
      ? details.additionalDetails.serviceLiftAvailability
      : "",
    roadWidth: details.additionalDetails
      ? details.additionalDetails.frontRoadWidth
      : "",
    roadWidthUnit: details.additionalDetails
      ? details.additionalDetails.frontRoadWidthType
      : "",
    twoWheelerOpenType: details.additionalDetails?.parking2OpenCount,
    pgTwoWheelerOpenType: details.pgRoomDetails?.parking2OpenType,
    twoWheelerClosedType: details.additionalDetails?.parking2CoverCount,
    pgTwoWheelerClosedType: details.pgRoomDetails?.parking2CoverType,
    fourWheelerOpenType: details.additionalDetails?.parking4OpenCount,
    pgFourWheelerOpenType: details.pgRoomDetails?.parking4OpenType,
    fourWheelerClosedType: details.additionalDetails?.parking4CoverCount,
    pgFourWheelerClosedType: details.pgRoomDetails?.parking4CoverType,
    pantryCafeteria: details.propertyAreaDetails
      ? details.propertyAreaDetails.pantry
      : "",
    interestInCoWorking: "",
    ac: airCondition,
    linear: linearDetail,
    meetingRoom: meetingRoomDetail,
    cubical: cubicalDetail,
    wifi: wifiDetail,
    geyser: geyserDetail,
    modularKitchen: modularKitchenDetail,
    diningTables: diningTablesDetail,
    tables: tableDetail,
    projectors: projectorsDetail,
    smartBoard: smartBoardDetail,
    coffieMachine: coffieMachineDetail,
    printingMachine: printingMachineDetail,
    recreational: recreationalDetail,
    confernceRooms: confernceRoomsDetail,
    mediclKits: medicalKitDetail,
    chairs: chairsDetail,
    microWave: microWaveDetail,
    chimney: chimneyDetail,
    curtains: curtainDetail,
    stove: stoveDetail,
    exhaustFan: exhaustFanDetail,
    fan: fanDetail,
    officeTables: officeTableDetail,
    waterPurifier: waterPurifierDetail,
    gas: gasDetails,
    beds: bedsdetail,
    led: ledDetail,
    sofa: sofaDetail,
    tv: tvDetail,
    washingMachine: washingMachineDetail,
    wardrobe: wardrobeDetail,
    refrigerator: refreigeratorDetail,
    propertyManagedBy: details.pgOwnerDetails
      ? details.pgOwnerDetails.propertyManagedBy.split(", ")
      : "",
    propertyManagedStaysAtProperty: details.pgOwnerDetails
      ? details.pgOwnerDetails.propertyManagerStay
      : "",
    widthOfPropertyStatus: "",
    heightSealingOfPropertyStatus: "",
    locationHub: details.propertyStatus
      ? details.propertyStatus.locationHub.split(", ")
      : "",
    widthUnitOfPropertyStatus: "",
    heightSealingUnitOfPropertyStatus: "",
    locatedNear: "",
    hotelResortType: "",
    propertySuitableFor: details.propertyStatus?.aboutPropertySuitableFor
      ? details.propertyStatus.aboutPropertySuitableFor.split(", ")
      : "",
    govtApproved: details.propertyStatus?.govtApproved,
    tenetType: details.tenantStatus?.tenantType
      ? details.tenantStatus.tenantType.split(", ")
      : "",
    tenentBachelorsAllowed: details.tenantStatus?.bachelorsAllowed
      ? details.tenantStatus.bachelorsAllowed.split(", ")
      : "",
    tenentSpinstersAllowed: details.tenantStatus?.sprinstersAllowed
      ? details.tenantStatus.sprinstersAllowed.split(", ")
      : "",
    religiousType: details.tenantStatus
      ? details.tenantStatus.religiousType
      : "",
    workPreference: details.tenantStatus
      ? details.tenantStatus.workPreference
      : "",
    petsAllowed: details.tenantStatus ? details.tenantStatus.petsAllowed : "",
    foodPreference: details.tenantStatus
      ? details.tenantStatus.foodPreference
      : "",
    occupancyType: details.propertyAreaDetails?.occupancyType,
    privatePoolAvailability: details.propertyAreaDetails
      ? details.propertyAreaDetails.privatePoolAvailability
      : "",
    privateGardenAvailability: details.propertyAreaDetails
      ? details.propertyAreaDetails.privateGardenAvailability
      : "",
    privateGardenArea: details.propertyAreaDetails
      ? details.propertyAreaDetails.privateGardenArea
      : "",
    numberOfBedRooms: details.propertyAreaDetails?.noOfBedrooms,
    numberOfBathRooms: details.propertyAreaDetails
      ? details.propertyAreaDetails.noOfBathrooms
      : "",
    numberOfBalconies: details.propertyAreaDetails
      ? details.propertyAreaDetails.noOfBalconies
      : "",
    additionalRooms: details.propertyAreaDetails
      ? details.propertyAreaDetails.additionalRooms
      : "",
    towerOrBlockNumber: details.propertyAreaDetails
      ? details.propertyAreaDetails.towerBlockNo
      : "",
    propertyLevel: details.propertyAreaDetails
      ? details.propertyAreaDetails.propertyLevel
      : "",
    cornerFlat: details.propertyAreaDetails
      ? details.propertyAreaDetails.cornerFlat
      : "",
    facing: details.propertyAreaDetails
      ? details.propertyAreaDetails.facing
      : "",
    openSides: details.propertyAreaDetails
      ? details.propertyAreaDetails.openSides
      : "",
    terraceArea: details.propertyAreaDetails
      ? details.propertyAreaDetails.terraceArea
      : "",
    spaceType: "",
    privateWashroomCount: details.propertyAreaDetails?.privateWashroomCount,
    publicWashroomCount: publicWashRoomValue,
    compoundWallMade: details?.propertyAreaDetails?.compoundWallMade,
    terraceAreaFlag: details.propertyAreaDetails
      ? details.propertyAreaDetails.terraceAreaFlag
      : "",
    lengthInFeet: "",
    breadthInFeet: "",
    numberOfFloorsAllowed: "",
    numberOfRooms: "",
    allImages: [],
    featuredImageUrl: featuredImages,
    galleryImageUrl: galleryImages,
    featuredImageId,
    croppedFeaturedImage: details.propertyGalleryImages
      ? details.propertyGalleryImages[0]?.imagePath
      : "",
    tenantPreLeasedUnit: details.propertyStatus?.tenantPreLeasedUnit,
    videoUrl: "",
    videoLink: details.youtubeLink,
    videoPreview: "",
    keepItPrivate: details.propertyAreaDetails?.keepItPrivate,
    showUploadButton: false,
    uploadedVideo: details.videoLink,
    pgFor: details.pgDetails ? details.pgDetails.pgFor : "",
    bestSuitedFor: details.pgDetails ? details.pgDetails.bestSuitedFor : "",
    mealsAvailable: details.pgDetails ? details.pgDetails.mealsAvailable : "",
    noticePeriod: details.pgDetails ? details.pgDetails.noticePeriod : "",
    noticePeriodType: details.pgDetails ? details.pgDetails : "",
    commonAreas: details.pgDetails
      ? details.pgDetails.commonAreas.split(", ")
      : "",
    pgLockInPeriod: details.pgDetails ? details.pgDetails.lockInPeriod : "",
    pgLockInPeriodType: details.pgDetails ? details.pgDetails : "",
    noOfPgBeds: details.pgDetails ? details.pgDetails.totalBeds : "",
    reraAvailable: details.reraStatus?.reraAvailable,
    reraNumber: details.reraStatus?.reraNo,

    itemData: [
      {
        name: "Air Conditioner",
        count: details.furnishingStatus
          ? details.furnishingStatus.airConditionCount
          : "",
      },
      {
        name: "Beds",
        count: details.furnishingStatus
          ? details.furnishingStatus.bedsCount
          : "",
      },
      {
        name: "LED Light",
        count: details.furnishingStatus
          ? details.furnishingStatus.ledLightsCount
          : "",
      },
      {
        name: "Gas Connection",
        count: details.furnishingStatus
          ? details.furnishingStatus.gasConnectionCount
          : "",
      },
      {
        name: "Washing Machine",
        count: details.furnishingStatus
          ? details.furnishingStatus.washingMachineCount
          : "",
      },
      {
        name: "Refrigerator",
        count: details.furnishingStatus
          ? details.furnishingStatus.refrigeratorCount
          : "",
      },
      {
        name: "Sofa",
        count: details.furnishingStatus
          ? details.furnishingStatus.sofaCount
          : "",
      },
      {
        name: "Tv",
        count: details.furnishingStatus ? details.furnishingStatus.tvCount : "",
      },
      {
        name: "Wardrobe",
        count: details.furnishingStatus
          ? details.furnishingStatus.wardrobeCount
          : "",
      },
      {
        name: "Office Tables",
        count: details.furnishingStatus
          ? details.furnishingStatus.officeTablesCount
          : "",
      },
      {
        name: "Water Purifier",
        count: details.furnishingStatus
          ? details.furnishingStatus.waterPurifierCount
          : "",
      },
      {
        name: "Fan",
        count: details.furnishingStatus
          ? details.furnishingStatus.fanCount
          : "",
      },
      {
        name: "Exhaust Fan",
        count: details.furnishingStatus
          ? details.furnishingStatus.exhaustCount
          : "",
      },
      {
        name: "Stove",
        count: details.furnishingStatus
          ? details.furnishingStatus.stoveCount
          : "",
      },
      {
        name: "Curtains",
        count: details.furnishingStatus
          ? details.furnishingStatus.curtainsCount
          : "",
      },
      {
        name: "Chimney",
        count: details.furnishingStatus
          ? details.furnishingStatus.chimneyCount
          : "",
      },
      {
        name: "Micro Wave",
        count: details.furnishingStatus
          ? details.furnishingStatus.microwaveCount
          : "",
      },
      {
        name: "Chairs",
        count: details.furnishingStatus
          ? details.furnishingStatus.chairsCount
          : "",
      },
      {
        name: "Meeting Rooms",
        count: details.furnishingStatus
          ? details.furnishingStatus.meetingRoomsCount
          : "",
      },
      {
        name: "Medical Kits",
        count: details.furnishingStatus
          ? details.furnishingStatus.medicalKitsCount
          : "",
      },
      {
        name: "Conference Rooms",
        count: details.furnishingStatus
          ? details.furnishingStatus.conferenceRoomsCount
          : "",
      },
      {
        name: "Recreational Fecilities",
        count: details.furnishingStatus
          ? details.furnishingStatus.recreationalFacilityCount
          : "",
      },
      {
        name: "Printing Machine",
        count: details.furnishingStatus
          ? details.furnishingStatus.printingMachinesCount
          : "",
      },
      {
        name: "Coffie Machine",
        count: details.furnishingStatus
          ? details.furnishingStatus.coffeeMachinesCount
          : "",
      },
      {
        name: "Smart Board",
        count: details.furnishingStatus
          ? details.furnishingStatus.smartBoardCount
          : "",
      },
      {
        name: "Projectors",
        count: details.furnishingStatus
          ? details.furnishingStatus.projectorsCount
          : "",
      },
      {
        name: "Dining Tables",
        count: details.furnishingStatus
          ? details.furnishingStatus.diningTablesCount
          : "",
      },
      {
        name: "Modular Kitchen",
        count: details.furnishingStatus
          ? details.furnishingStatus.modularKitchenCount
          : "",
      },
    ],

    itemDataResidential: [
      {
        name: "Air Conditioner",
        count: details.furnishingStatus?.airConditionCount || 0,
      },
      { name: "Beds", count: details.furnishingStatus?.bedsCount || 0 },
      {
        name: "LED Light",
        count: details.furnishingStatus?.ledLightsCount || 0,
      },
      {
        name: "Gas Connection",
        count: details.furnishingStatus?.gasConnectionCount || 0,
      },
      {
        name: "Washing Machine",
        count: details.furnishingStatus?.washingMachineCount || 0,
      },
      {
        name: "Refrigerator",
        count: details.furnishingStatus?.refrigeratorCount || 0,
      },
      {
        name: "Sofa",
        count: details.furnishingStatus?.sofaCount || 0,
      },
      { name: "Tv", count: details.furnishingStatus?.tvCount || 0 },
      {
        name: "Wardrobe",
        count: details.furnishingStatus?.wardrobeCount || 0,
      },
      // { name: "Office Tables", count: 0 },
      {
        name: "Water Purifier",
        count: details.furnishingStatus?.waterPurifierCount || 0,
      },
      { name: "Fan", count: details.furnishingStatus?.fanCount || 0 },
      {
        name: "Exhaust Fan",
        count: details.furnishingStatus?.exhaustCount || 0,
      },
      { name: "Stove", count: details.furnishingStatus?.stoveCount || 0 },
      { name: "Curtains", count: details.furnishingStatus?.curtainsCount || 0 },
      { name: "Chimney", count: details.furnishingStatus?.chimneyCount || 0 },
      {
        name: "Micro Wave",
        count: details.furnishingStatus?.microwaveCount || 0,
      },
      { name: "Geyser", count: details.furnishingStatus?.geyserCount || 0 },
      { name: "Wi-Fi", count: details.furnishingStatus?.wifiCount || 0 },

      // { name: "Meeting Rooms", count: 0 },
      // { name: "Medical Kits", count: 0 },
      // { name: "Conference Rooms", count: 0 },
      // { name: "Recreational Fecilities", count: 0 },
      // { name: "Printing Machine", count: 0 },
      // { name: "Coffie Machine", count: 0 },
      // { name: "Smart Board", count: 0 },
      // { name: "Projectors", count: 0 },
      {
        name: "Dining Tables",
        count: details.furnishingStatus?.diningTablesCount || 0,
      },
      // { name: "Modular Kitchen", count: 0 },
      {
        name: "Modular Kitchen",
        count: details.furnishingStatus?.modularKitchenCount || 0,
      },
    ],

    itemDataIndustrial: [
      {
        name: "Air Conditioner",
        count: details.furnishingStatus?.airConditionCount || 0,
      },
      { name: "Beds", count: details.furnishingStatus?.bedsCount || 0 },
      {
        name: "LED Light",
        count: details.furnishingStatus?.ledLightsCount || 0,
      },
      {
        name: "Gas Connection",
        count: details.furnishingStatus?.gasConnectionCount || 0,
      },
      {
        name: "Washing Machine",
        count: details.furnishingStatus?.washingMachineCount || 0,
      },
      {
        name: "Refrigerator",
        count: details.furnishingStatus?.refrigeratorCount || 0,
      },
      { name: "Sofa", count: details.furnishingStatus?.sofaCount || 0 },
      { name: "Tv", count: details.furnishingStatus?.tvCount || 0 },
      { name: "Wardrobe", count: details.furnishingStatus?.wardrobeCount || 0 },
      {
        name: "Office Tables",
        count: details.furnishingStatus?.officeTablesCount || 0,
      },
      {
        name: "Water Purifier",
        count: details.furnishingStatus?.waterPurifierCount || 0,
      },
      { name: "Fan", count: details.furnishingStatus?.fanCount || 0 },
      {
        name: "Exhaust Fan",
        count: details.furnishingStatus?.exhaustCount || 0,
      },
      { name: "Stove", count: details.furnishingStatus?.stoveCount || 0 },
      { name: "Curtains", count: details.furnishingStatus?.curtainsCount || 0 },
      { name: "Chimney", count: details.furnishingStatus?.chimneyCount || 0 },
      {
        name: "Micro Wave",
        count: details.furnishingStatus?.microwaveCount || 0,
      },
      {
        name: "Meeting Rooms",
        count: details.furnishingStatus?.meetingRoomsCount || 0,
      },
      {
        name: "Medical Kits",
        count: details.furnishingStatus?.medicalKitsCount || 0,
      },
      {
        name: "Conference Rooms",
        count: details.furnishingStatus?.conferenceRoomsCount || 0,
      },
      {
        name: "Recreational Fecilities",
        count: details.furnishingStatus?.recreationalFacilityCount || 0,
      },
      {
        name: "Printing Machine",
        count: details.furnishingStatus?.printingMachinesCount || 0,
      },
      {
        name: "Coffie Machine",
        count: details.furnishingStatus?.coffeeMachinesCount || 0,
      },
      {
        name: "Smart Board",
        count: details.furnishingStatus?.smartBoardCount || 0,
      },
      {
        name: "Projectors",
        count: details.furnishingStatus?.projectorsCount || 0,
      },
      {
        name: "Dining Tables",
        count: details.furnishingStatus?.diningTablesCount || 0,
      },
      {
        name: "Modular Kitchen",
        count: details.furnishingStatus?.modularKitchenCount || 0,
      },
    ],

    itemDataCommercial: [
      {
        name: "Air Conditioner",
        count: details.furnishingStatus?.airConditionCount || 0,
      },
      // { name: "Beds", count: 0 },
      {
        name: "LED Light",
        count: details.furnishingStatus?.ledLightsCount || 0,
      },
      // { name: "Gas Connection", count: 0 },
      // { name: "Washing Machine", count: 0 },
      {
        name: "Refrigerator",
        count: details.furnishingStatus?.refrigeratorCount || 0,
      },
      { name: "Sofa", count: details.furnishingStatus?.sofaCount || 0 },
      // { name: "Tv", count: 0 },
      { name: "Wardrobe", count: details.furnishingStatus?.wardrobeCount || 0 },
      {
        name: "Office Tables",
        count: details.furnishingStatus?.officeTablesCount || 0,
      },
      {
        name: "Water Purifier",
        count: details.furnishingStatus?.waterPurifierCount || 0,
      },
      { name: "Fan", count: details.furnishingStatus?.fanCount || 0 },
      {
        name: "Exhaust Fan",
        count: details.furnishingStatus?.exhaustCount || 0,
      },
      { name: "Stove", count: details.furnishingStatus?.stoveCount || 0 },
      { name: "Curtains", count: details.furnishingStatus?.curtainsCount || 0 },
      { name: "Chimney", count: details.furnishingStatus?.chimneyCount || 0 },
      {
        name: "Micro Wave",
        count: details.furnishingStatus?.microwaveCount || 0,
      },
      {
        name: "Meeting Rooms",
        count: details.furnishingStatus?.meetingRoomsCount || 0,
      },
      {
        name: "Medical Kits",
        count: details.furnishingStatus?.medicalKitsCount || 0,
      },
      {
        name: "Conference Rooms",
        count: details.furnishingStatus?.conferenceRoomsCount || 0,
      },
      {
        name: "Recreational Fecilities",
        count: details.furnishingStatus?.recreationalFacilityCount || 0,
      },
      {
        name: "Printing Machine",
        count: details.furnishingStatus?.printingMachinesCount || 0,
      },
      {
        name: "Coffie Machine",
        count: details.furnishingStatus?.coffeeMachinesCount || 0,
      },
      {
        name: "Smart Board",
        count: details.furnishingStatus?.smartBoardCount || 0,
      },
      {
        name: "Projectors",
        count: details.furnishingStatus?.projectorsCount || 0,
      },
      { name: "Chairs", count: details.furnishingStatus?.chairsCount || 0 },
      { name: "Tables", count: details.furnishingStatus?.projectorsCount || 0 },
      // { name: "Cubical", count: 0 },
      // { name: "Linear", count: 0 },
      // { name: "Dining Tables", count: 0 },
      // { name: "Modular Kitchen", count: 0 },
      // { name: "Modular Kitchen", count: 0 },
    ],
  });

  useEffect(() => {
    // if (stepValue === "Property Listing") {
    //   setendPoint(apiList.updateProperty);
    //   setParams({
    //     id: details.id,
    //     propertyType: formData.propertiesType,
    //     listingType: formData.propertyListingType,
    //     buildingType: formData.buildingType,
    //   });
    // }
    if (stepValue === "Location") {
      setendPoint(apiList.updateProperty);
      setParams({
        id: details.id,
        propertyName: formData.buildingName,
        country: formData.selectedCountry,
        zone: formData.selectedTaluk,
        pincode: formData.pinCode,
        setsubLocality: formData.setsubLocality,
        state: formData.selectedState,
        landmark: formData.landMark,
        locality: formData.locality,
        propertyAddress:
          formData.propertyAdress === "" ? null : formData.propertyAdress,
        latitude: "73.73387",
        longitude: "23.3423",
        status: "yes",
        city: formData.selectedDistrict,
      });
    }
    if (stepValue === "Area Details") {
      setendPoint(apiList.updatePropertyAreaDetails);
      setParams({
        id: details.propertyAreaDetails ? details.propertyAreaDetails.id : "",
        builtupPlotArea: formData.builtupArea,
        keepItPrivate: formData?.keepItPrivate,
        superBuiltupArea: formData.superBuiltupArea,
        salableArea: formData.salableArea,
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
        cornerFlat: formData.cornerFlat
          ? formData.cornerFlat
          : formData.cornerUnit,
        terraceAreaFlag: formData.terraceAreaFlag,
        terraceArea: formData.terraceArea,
        terraceAreaUnit: formData.terraceAreaFlag,
        totalFloors: formData.totalFloor ? formData.totalFloor.label : "",
        openSides: formData.openSides,
        facing: formData.facing,
        // occupancyType: formData.occupancyType,
        occupancyCertificate: formData.occupancyCertificate,
        privateWashroom: formData.privateWashRoom,
        privateWashroomCount: formData.privateWashroomCount,
        publicWashroom: formData.publicWashroom,
        publicWashroomCount: formData.publicWashroomCount
          ? formData.publicWashroomCount.label
          : "",
        gardenArea: formData.privateGardenArea,
        pantry: formData.pantryCafeteria
          ? formData.pantryCafeteria
          : formData.pantryOrCafeteria,
        spaceType: formData.spaceType,
        occupancyType: formData.occupancyType,
        compoundWallMade: formData.compoundWallMade,
        breadthFeet: formData.breadthInFeet,
        lengthFeet: formData.lengthInFeet,
        noOfFloorsAllowed: formData.numberOfFloorsAllowed,
      });
    }
    if (stepValue === "Tenent Status") {
      setendPoint(apiList.updateTenantStatus);
      setParams({
        id: details.tenantStatus.id,
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
      });
    }
    if (stepValue === "Property Details") {
      setendPoint(apiList.updatePropertyStatus);
      setParams({
        id: details.propertyStatus.id,
        govtApproved: formData.govtApproved,
        ageOfProperty: formData.ageofProperty,
        availableFor: formData.availableFor,
        availableFrom: formData.availbleFrom,
        availableFromDate: formData.availableFromDate,
        entranceWidth: formData.widthOfPropertyStatus,
        createdDate: formData.positionStatusDate,
        positionStatus: formData.positionStatus,
        occupancyDays: formData.occupancyDays,
        ownershipType: formData.owenershipType,
        tenantPreLeasedUnit: formData.tenantPreLeasedUnit,
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
        positionStatusType: formData.positionStatus,
      });
    }
    if (stepValue === "Property Rent") {
      setendPoint(apiList.updatePricingDetails);
      setParams({
        id: details.pricingDetails.id,
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
      });
    }
    if (stepValue === "Additional Details") {
      setendPoint(apiList.updateAdditionalDetails);
      setParams({
        id: details.additionalDetails.id,
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
        flooringKitchen: formData.kitchenFlooringType,
        flooringBedroom: formData.bedRoomFlooringType,
        flooringMasterBedroom: formData.MasterBedRoomFlooringType,
        flooringbathRoom: formData.bathRoomFlooringType,
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
      });
    }
    if (stepValue === "RERA Status") {
      setendPoint(apiList.updateReraStatus);
      setParams({
        id: details.reraStatus.id,
        reraAvailable: formData.reraAvailable,
        reraNo: formData.reraNumber,
      });
    }
    if (stepValue === "Furnishing Status") {
      setendPoint(apiList.updateFurnishingStatus);
      setParams({
        id: details.furnishingStatus.id,
        furnishingType: formData.furnishingStatus,
        airConditionAvailable: formData.ac.name,
        airConditionCount: formData.ac.count,
        bedsAvailable: formData.beds.name,
        bedsCount: formData.beds.count,
        gasConnectionAvailable: formData.gas.name,
        gasConnectionCount: formData.gas.count,

        chimney: formData.chimney.name,
        chimneyCount: formData.chimney.count,

        coffeeMachinesCount: formData.coffieMachine.count,
        coffieMachine: formData.coffieMachine.name,

        confernceRooms: formData.confernceRooms.name,
        confernceRoomsCount: formData.confernceRooms.count,

        cubical: formData.cubical?.name,
        cubicalCount: formData.cubical?.count,

        curtains: formData.curtains.name,
        curtainsCount: formData.curtains.count,

        diningTables: formData.diningTables.name,
        diningTablesCount: formData.diningTables.count,

        exhaustFan: formData.exhaustFan.name,
        exhaustFanCount: formData.exhaustFan.count,

        fan: formData.fan.name,
        fanCount: formData.fan.count,

        ledLightsAvailable: formData.led.name,
        ledLightsCount: formData.led.count,

        linear: formData.linear?.name,
        linearCount: formData.linear?.count,

        mediclKits: formData.mediclKits.name,
        mediclKitsCount: formData.mediclKits.count,

        microWave: formData.microWave.name,
        microWaveCount: formData.microWave.count,

        modularKitchen: formData.modularKitchen.name,
        modularKitchenCount: formData.modularKitchen.count,

        meetingRooms: formData.meetingRoom.name,
        meetingRoomsCount: formData.meetingRoom.count,

        tables: formData.tables.name,
        tablesCount: formData.tables.count,

        geyserAvailable: formData.geyser.name,
        geyserCount: formData.geyser.count,

        officeTables: formData.officeTables.name,
        officeTablesCount: formData.officeTables.count,

        printingMachine: formData.printingMachine.name,
        printingMachineCount: formData.printingMachine.count,

        projectors: formData.projectors.name,
        projectorsCount: formData.projectors.count,

        recreational: formData.recreational.name,
        recreationalCount: formData.recreational.count,

        refrigerator: formData.refrigerator.name,
        refrigeratorCount: formData.refrigerator.count,

        smartBoard: formData.smartBoard.name,
        smartBoardCount: formData.smartBoard.count,

        sofaAvailable: formData.sofa.name,
        sofaCount: formData.sofa.count,

        stove: formData.stove.name,
        stoveCount: formData.stove.count,

        chairs: formData.chairs.name,
        chairsCount: formData.chairs.count,

        tvAvailable: formData.tv.name,
        tvCount: formData.tv.count,

        wardrobeAvailable: formData.wardrobe.name,
        wardrobeCount: formData.wardrobe.count,

        washingMachineAvailable: formData.washingMachine.name,
        washingMachineCount: formData.washingMachine.count,

        waterPurifier: formData.waterPurifier.name,
        waterPurifierCount: formData.waterPurifier.count,

        wifi: formData.wifi.name,
        wifiCount: formData.wifi.count,
      });
    }
    if (stepValue === "Amenities") {
      setendPoint(apiList.updateAmenities);
      setParams({ propertyId: details.id, amenitiesList: formData.amenities });
    }
    if (stepValue === "Land Mark") {
      setendPoint(apiList.updateLandMark);
      setParams({
        id: details.landMarks.id,
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
      });
    }
    if (stepValue === "Define Your Property") {
      setendPoint(apiList.updateDefineProperty);
      setParams({
        id: details.defineProperty.id,
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
        description: formData?.description,
      });
    }
    if (stepValue === "Image Gallery") {
      setendPoint(apiList.updateProperty);
      setParams({
        id: details.id,
        propertyImages: formData.allImages,
        videoLink: formData.videoUrl === "" ? null : formData.videoUrl,
        youtubeLink: formData.videoLink === "" ? null : formData.videoLink,
      });
    }
    if (stepValue === "Brokerage Details") {
      setendPoint(apiList.updateProperty);
      setParams({
        id: details.id,
        brokerageType: formData.brokerage,
        brokergeValue: formData.brokeragedata,
        brokerageUnit: formData.brokerageUnit,
      });
    }
    if (
      formData.propertiesType === "PG/Co-living" &&
      stepValue === "Area Details"
    ) {
      setendPoint(apiList.updatePgDetails);
      setParams({
        id: details.pgDetails ? details.pgDetails.id : "",
        totalBeds: formData.noOfPgBeds,
        pgFor: formData.pgFor,
        mealsAvailable: formData.mealsAvailable,
        commonAreas: formData.commonAreas
          ? formData.commonAreas.join(", ")
          : "",
        noticePeriod: formData.noticePeriod,
        lockInPeriod: formData.pgLockInPeriod,
        bestSuitedFor: formData.bestSuitedFor,
      });
    }
    if (
      formData.propertiesType === "PG/Co-living" &&
      stepValue === "Property Details"
    ) {
      setendPoint(apiList.updatePgOwnerDetails);
      setParams({
        id: details.pgOwnerDetails ? details.pgOwnerDetails.id : "",
        propertyManagedBy: formData.propertyManagedBy
          ? formData.propertyManagedBy.join(", ")
          : "",
        propertyManagerStay: formData.propertyManagedStaysAtProperty,
      });
    }
    if (
      formData.propertiesType === "PG/Co-living" &&
      stepValue === "Property Rent"
    ) {
      setendPoint(apiList.updatePgRegulations);
      setParams({
        id: details.pgRegulations.id,
        nonVegAllowed: formData.nonVeg,
        oppositeSex: formData.oppSex,
        anyTimeAllowed: formData.time,
        visitorAllowed: formData.visitor,
        guardianAllowed: formData.guardian,
        drinkingAllowed: formData.drinks,
        smokingAllowed: formData.smoking,
      });
    }
    if (
      formData.propertiesType === "PG/Co-living" &&
      stepValue === "Additional Details"
    ) {
      setendPoint(apiList.updatePgRoomDetails);
      setParams({
        id: details.pgRoomDetails.id,
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
      });
    }
  }, [activeStep]);

  useEffect(() => {
    if (params) {
      updateProperty();
    }
  }, [params]);

  const updateProperty = async () => {
    setLoading(true);

    let response = await invokeApi(
      config.apiDomains + endPoint,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success("Property data updated successfully!", {
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
    setParams(null);
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
  const handleNext2 = () => {
    if (formData.buildingType === "Residential") {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep(4);
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
      setActiveStep(7);
    }
  };
  const handleBack2 = () => {
    if (formData.buildingType === "Residential") {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      setActiveStep(2);
    }
  };
  const handleNextSkipReraStatus = () => {
    if (
      formData.propertiesType === "Office Space" ||
      formData.propertiesType === "Office Space in IT Park/SEZ" ||
      formData.propertiesType === "Commercial Building" ||
      formData.propertiesType === "Retail Shop/Show" ||
      formData.propertiesType === "Guest House/Banquet Hall" ||
      formData.propertiesType === "Rooftop" ||
      formData.propertiesType === "Hotel/Resorts" ||
      formData.propertiesType === "Shopping Mall" ||
      formData.propertiesType === "Industrial Building"
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep(8);
    }
    if (
      formData.propertiesType !== "Industrial Plot/Land" &&
      formData.propertiesType !== "Commercial Plot/Land" &&
      formData.propertiesType !== "Shed/Factory" &&
      formData.propertiesType !== "Warehouse/Godown"
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep);
    } else {
      setActiveStep(9);
    }
  };
  const handleBackSkipReraStatus = () => {
    if (
      formData.propertiesType === "Office Space" ||
      formData.propertiesType === "Office Space in IT Park/SEZ" ||
      formData.propertiesType === "Commercial Building" ||
      formData.propertiesType === "Retail Shop/Show" ||
      formData.propertiesType === "Guest House/Banquet Hall" ||
      formData.propertiesType === "Rooftop" ||
      formData.propertiesType === "Hotel/Resorts" ||
      formData.propertiesType === "Shopping Mall" ||
      formData.propertiesType === "Industrial Building"
    ) {
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

  useEffect(() => {
    if (activeStep >= 0 && activeStep < steps.length) {
      setstepValue(steps?.find((item) => item.value === activeStep).label);
    } else {
      setstepValue(null);
    }
  }, [activeStep, steps]);

  useEffect(() => {
    // Create a copy of the original steps array to avoid modifying it directly
    const updatedStepsCopy = updatedSteps?.map((step) => ({ ...step }));

    // Condition 1: Hide "Furnishing Status" step
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

    // Condition 2: Hide "Tenent Status" step
    if (formData.buildingType !== "Residential") {
      const indexOfTenentStatus = updatedStepsCopy.findIndex(
        (step) => step.label === "Tenent Status"
      );
      if (indexOfTenentStatus !== -1) {
        updatedStepsCopy[indexOfTenentStatus].isvisible = false;
      }
    }

    if (
      formData.propertiesType !== "Office Space" &&
      formData.propertiesType !== "Office Space in IT Park/SEZ" &&
      formData.propertiesType !== "Commercial Building" &&
      formData.propertiesType !== "Retail Shop/Show" &&
      formData.propertiesType !== "Guest House/Banquet Hall" &&
      formData.propertiesType !== "Rooftop" &&
      formData.propertiesType !== "Hotel/Resorts" &&
      formData.propertiesType !== "Shopping Mall" &&
      formData.propertiesType !== "Industrial Building"
    ) {
      const indexOfReraStatus = updatedStepsCopy.findIndex(
        (step) => step.label === "RERA Status"
      );
      if (indexOfReraStatus !== -1) {
        updatedStepsCopy[indexOfReraStatus].isvisible = false;
      }
    }

    // Update the steps state with the modified copy
    setSteps(updatedStepsCopy);
  }, [formData.propertiesType, formData.buildingType]);

  return (
    <>
      {loading && (
        <Stack sx={{ display: "flex", alignItems: "center", mb: 5 }}>
          <CircularProgress sx={{ color: "black" }} />
        </Stack>
      )}
      <Box
        sx={{
          boxShadow: "0 0 3px black",
          width: "100%",
          minHeight: "95vh",
          pt: 2,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            overflowX: "auto", // Enables horizontal scrolling
            gap: "10px",
            ml: 2,
          }}
          className="custom-scrollbar"
        >
          {activeStep !== 0 &&
            activeStep !== steps.length &&
            steps?.map((item, index) => {
              if (item.isvisible) {
                const uniqueId = `edit-property-tab-${index}`;
                return (
                  <Box
                    key={index}
                    className="mydict"
                    sx={{
                      boxSizing: "initial",
                      userSelect: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <label
                      className={`mydict1 border1 ${
                        activeStep === item.value ? "active-step" : ""
                      }`}
                      htmlFor={uniqueId}
                      style={{
                        marginRight: "5px",
                        marginBottom: "5px",
                        boxShadow: "none",
                      }}
                    >
                      <input
                        id={uniqueId}
                        type="radio"
                        name="20maage2"
                        value={item.label}
                        checked={activeStep === item.value}
                        onChange={() => setActiveStep(item.value)}
                        style={{ display: "none" }}
                        readOnly
                      />
                      <span
                        className="border1"
                        style={{
                          marginRight: "15px",
                          boxShadow: "none",
                          fontFamily: "Mulish, sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.label}
                      </span>
                    </label>
                  </Box>
                );
              }
              return null;
            })}
        </Box>

        {activeStep === steps.length ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "40vh",
            }}
          >
            <PreView formData={formData} detailsId={details.id} />

            {!loading && (
              <>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    color: "#343131",
                    mt: 3,
                    mb: 2,
                    "&:hover": {
                      backgroundColor: "#343131",
                      color: "white",
                    },
                  }}
                  onClick={() => navigate("/my-property-lists")}
                >
                  My Property List
                </Button>
                <Button
                  color="inherit"
                  onClick={() =>
                    setActiveStep((prevActiveStep) => prevActiveStep - 1)
                  }
                >
                  Back
                </Button>
              </>
            )}
          </Box>
        ) : (
          <Box sx={{ ml: 3, mt: 2 }}>
            {activeStep === 1 && (
              <LocationDetails
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
            {activeStep === 2 && (
              <Box>
                <AreaDetails
                  next={handleNext2}
                  back={() =>
                    setActiveStep((prevActiveStep) => prevActiveStep - 1)
                  }
                  updateFormData={(updatedData) =>
                    setFormData({ ...formData, ...updatedData })
                  }
                  detailsId={details.id}
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
                detailsId={details.id}
              />
            )}
            {activeStep === 4 && (
              <PropertyStatus
                next={() =>
                  setActiveStep((prevActiveStep) => prevActiveStep + 1)
                }
                back={handleBack2}
                updateFormData={(updatedData) =>
                  setFormData({ ...formData, ...updatedData })
                }
                formData={formData}
                detailsId={details.id}
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
                detailsId={details.id}
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
                detailsId={details.id}
              />
            )}
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
                detailsId={details.id}
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
                detailsId={details.id}
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
                detailsId={details.id}
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
                detailsId={details.id}
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
                detailsId={details.id}
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
                detailsId={details.id}
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
        )}
      </Box>
    </>
  );
}

function EditProperty() {
  const { id } = useParams();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState({});

  useEffect(() => {
    const getPropertyDetails = async () => {
      setLoading(true);
      try {
        let params = {
          id,
        };
        const response = await invokeApi(
          config.apiDomains + apiList.getPropertyDetailsById,
          params,
          cookies
        );

        if (response.status >= 200 && response.status < 300) {
          if (response.data.responseCode === "200") {
            setDatas(response.data.Properties);
            setLoading(false);
          } else {
            console.error(
              "An error occurred while fetching data:",
              response.data.errorMessage
            );
          }
        } else {
          console.error(
            "An error occurred while fetching data. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getPropertyDetails();
  }, [id, cookies]);

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 1000,
          width: "100%",
          maxHeight: { md: "80px", xs: "90px" },
        }}
      >
        <IconButton onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Divider />
      {loading ? (
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: "auto",
          }}
        >
          <Grid item>
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                mt: "85px",
              }}
            >
              <CircularProgress sx={{ color: "black" }} />
            </Stack>
            <Typography>Loading the data, please wait...</Typography>
          </Grid>
        </Grid>
      ) : datas.listingType === "Sale" ? (
        <SaleEditProperty details={datas} />
      ) : (
        <RentEditProperty details={datas} />
      )}
    </>
  );
}

export default EditProperty;
