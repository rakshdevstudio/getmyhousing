import axios from "axios";
import { config } from "../config/config";
const packageJson = require("../../package.json");

export const invokeApi = async (url, params, cookies) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      appversion: packageJson.version,
      platform: "web",
    };
    if (
      cookies &&
      cookies[config.cookieName] &&
      cookies[config.cookieName].token &&
      cookies[config.cookieName].loginUserId
    ) {
      headers.Authorization = "Bearer " + cookies[config.cookieName].token;
      headers.loginUserId = cookies[config.cookieName].loginUserId;
    }
    if (
      cookies &&
      cookies[config.sessionCookie] &&
      cookies[config.sessionCookie].sessionId
    ) {
      headers.sessionId = cookies[config.sessionCookie].sessionId;
    }
    return await axios.post(url, params, { headers: headers });
  } catch (error) {
    return error?.response ?? null;
  }
};

export const invokeFormDataApi = async (url, formData, cookies) => {
  try {
    let headers = {
      "Content-Type": "multipart/form-data",
      appversion: packageJson.version,
      platform: "web",
    };
    if (
      cookies &&
      cookies[config.cookieName] &&
      cookies[config.cookieName].token &&
      cookies[config.cookieName].loginUserId
    ) {
      headers.Authorization = "Bearer " + cookies[config.cookieName].token;
      headers.loginUserId = cookies[config.cookieName].loginUserId;
    }
    if (
      cookies &&
      cookies[config.sessionCookie] &&
      cookies[config.sessionCookie].sessionId
    ) {
      headers.sessionId = cookies[config.sessionCookie].sessionId;
    }
    return await axios.post(url, formData, { headers: headers });
  } catch (error) {
    return error?.response ?? null;
  }
};

export const apiList = {
  // below the api is generate order id razorpay
  generateOrderId: "/v1/orders",

  //Login
  singup: "/user/signup",
  addRole: "/user/addRole",
  login: "/user/login",

  // Reset Password
  changePassowrd: "/user/changePassword",

  //Verify User Package by User IDs
  verifyUserPackage: "/package/verifyUserPackage",

  //Verify User Package by City
  verifyUserPackageByCity: "/package/verifyUserPackageByCity",

  //Verify User Package by Property Listing Type
  verifyUserPackageByListingType: "/package/verifyUserPackageByListingType",

  //Zone Mapping
  getZoneMapping: "/propertytype/getCountryPincodeMapping",
  getAddress: "/propertytype/getAddress",
  addAddress: "/propertytype/saveAddress",
  getAllCities: "/propertytype/getCities",

  //Get Property Type
  getPropertyType: "/propertytype/getPropertyTypes",
  getSubPropertyType: "/propertytype/getSubPropertyTypes",

  //Save Property
  saveProperty: "/rental/addProperty",
  addMedia: "/rental/addPropertyMedia",
  updateExclusivePropertyStatus: "/rental/exclusiveProperty",

  verifyPropertyAddress: "/rental/verifyPropertyAddress",

  uploadFile: "/upload/uploadFile",
  uploadVideo: "/upload/uploadVideoFile",

  //Add Packages
  addPackage: "/package/addPackage",

  //Get Packages For Admin i.e., whatever the packages he has added
  getPackages: "/package/getPackages",

  getPackage: "/package/getPackage",

  //Delete Package
  deletePackage: "/package/deletePackage",

  //update Package
  updatePackage: "/package/updatePackage",

  //user Package List
  getUserPackage: "/package/getUserPackages",

  //get User
  getUsers: "/user/getUsers",

  //get operators
  getOperators: "/user/getOperators",

  getUserByPincodeForOperator: "/user/getUsersForOperator",

  //get User
  getUsersForAssign: "/user/getUsersForAssign",

  //get User by id
  getUser: "/user/getUser",

  //delete User
  deleteUser: "/user/deleteUser",

  //update User
  updateUser: "/user/updateUser",

  //add User package
  addUserPackage: "/package/addUserPackage",

  //Purchase package
  purchasePackage: "/package/purchasePackage",

  // Update Purchase package Success
  updatePurchasePkgSuccess: "/package/updatePurchasePkgSuccess",

  // Update Purchase package Failure
  updatePurchasePkgFailure: "/package/updatePurchasePkgFailure",

  //add User
  addUsers: "/user/addUser",
  // user status change
  changeUserStatus: "/user/changeStatus",
  //get leads list
  getLeads: "/lead/getLeads",

  // get the agent and customer lead provided list
  userLeads: "/lead/userLeads",

  //assign leads
  assignLead: "/lead/assignLead",

  editLead: "/lead/editLead",

  //assign Associate leads
  assignAssociateLead: "/lead/assignAssociateLead",

  //add lead
  addLead: "/lead/addLead",

  //get lead by id
  getLead: "/lead/getLead",

  //get lead history by id
  getLeadHistory: "/lead/getLeadHistory",

  //get User leads by id
  // userLeads: "/lead/userLeads",

  //get Rental Property Details
  getPropertyDetailsById: "/rental/getProperty",

  //Update Property Details
  updateAdditionalDetails: "/rental/updateAdditionalDetails",
  updateDefineProperty: "/rental/updateDefineProperty",
  updateFurnishingStatus: "/rental/updateFurnishingStatus",
  updateLandMark: "/rental/updateLandMark",
  updatePgDetails: "/rental/updatePgDetails",
  updatePgRoomDetails: "/rental/updatePgRoomDetails",
  updatePgOwnerDetails: "/rental/updatePgOwnerDetails",
  updatePgRegulations: "/rental/updatePgRegulations",
  updatePricingDetails: "/rental/updatePricingDetails",
  updatePropertyAreaDetails: "/rental/updatePropertyAreaDetails",
  updateAmenities: "/rental/updateAmenities",
  updatePropertyFloorRooms: "/rental/updatePropertyFloorRooms",
  updatePropertyMedia: "/rental/updatePropertyMedia",
  updatePropertyStatus: "/rental/updatePropertyStatus",
  updateReraStatus: "/rental/updateReraStatus",
  updateTenantStatus: "/rental/updateTenantStatus",
  updateProperty: "/rental/updateProperty",

  //List Properties for Home Page no authenication
  AllActiveProperties: "/rental/allActiveProperties",
  searchByProperties: "/rental/searchProperties",
  allExclusiveProperties: "/rental/getAllExclusiveProperties",

  // below the api send in param status mandatory
  allPropertyByStatusAndUserInDashboard: "/rental/propertyListInDashboard",

  changePropertyStatus: "/rental/changePropertyStatusByAdmin",

  propertyByFilter: "/rental/getPropertiesByFilter",

  addAssociateLead: "/lead/addAssociateLead",
  getAssociateLeads: "/lead/getAssociateLeads",
  getAssociateLead: "/lead/getAssociateLead",
  editAssociateLead: "/lead/editAssociateLead",
  associateLeadHistory: "/lead/getAssociateLeadHistory",

  sendOtp: "/user/sendOtp",
  verifyOtp: "/user/verifyOtp",
  resetPassword: "/user/resetPassword",

  addPackagePayment: "/package/addPackagePayment",
  getPackagePayments: "/package/getPackagePayments",
  editPackagePayments: "/package/editStatusPackagePayment",

  // below the end point is to make group proeprties
  addInPropertyGroup: "/rental/addInPropertyGroup",
  getPropertyByGroupWise: "/rental/getPropertyByGroupWise",

  // below the contact us end point
  addContactUsData: "/user/addContactUsData",
  getContactUsData: "/user/getContactUsData",
  getContactUsDatas: "/user/getContactUsDatas",

  // below the blog apis endpoint
  addBlogCategory: "/blog/addBlogCategory",
  updateBlogCategory: "/blog/updateBlogCategory",
  getBlogCategoriesHierarchy: "/blog/getBlogCategoriesHierarchy",
  addBlogSubCategory: "/blog/addBlogSubCategory",
  updateBlogSubCategory: "/blog/updateBlogSubCategory",
  addBlog: "/blog/addBlog",
  getBlog: "/blog/getBlog",
  getBlogs: "/blog/getBlogs",
  reviewBlog: "/blog/reviewBlog",
  updateBlog: "/blog/updateBlog",

  // below the owner details
  addOwner: "/owner/addOwner",
  getOwnersByROle: "/owner/getOwnersByRole",
  getOwners: "/owner/getOwners",
  assignOwner: "/rental/assignOwnerToProperty",
};
