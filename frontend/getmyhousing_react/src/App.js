import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PackagesList from "./components/packages/PackagesList";
import MyPackages from "./components/packages/MyPackages";
import PackageBuy from "./components/packages/PackageBuy";
import UsersList from "./components/user/UsersList";
import PackageAdd from "./components/packages/PackageAdd";
import PackageUpdate from "./components/packages/PackageUpdate";
import UserAdd from "./components/user/UserAdd";
import UserUpdate from "./components/user/UserUpdate";
import Login from "./components/login/Login";
import EditProperty from "./components/properties/propertiesList/edit-property/EditProperty";
import PropertyList from "./components/pages/user/property-list-filter/PropertyList";
import MyPropertyLists from "./components/properties/propertiesList/dashboard-property-list/MyPropertyLists";
import PropertyListingType from "./components/properties/post-properties/PropertyListingType";
import Logout from "./components/login/Logout";
import DashboardAnalytics from "./components/generic/dashboard/DashboardAnalytics";
import { CookiesProvider } from "react-cookie";
import { Home, AboutUs, ContactUs, NetworkStatusCheck, NonRefundPolicy, PrivacyAndPolicy, TermsAndConditions, NotFoundPage, WelcomePage, ServiceCharges } from "./components/pages/user/index";
import LeadsList from "./components/leads/leadsList";
import { Provider } from "react-redux";
import store from "./global/redux/store";
import ProtectedRoute from "./components/functional-component/ProtectedRoute";
import Register from "./components/login/Register";
import OverViewDetails from "./components/end-user/PropertyDetails/OverViewDetails";
import ViewProperty from "./components/properties/propertiesList/ViewProperty";
import CreateLead from "./components/leads/CreateLead";
import ResetPassword from "./components/login/reset-password/ResetPassword";
import AdminPendingPackages from "./components/packages/AdminPendingPackages";
import GroupingProperties from "./components/properties/grouping/GroupingProperties";
import ContactUsData from "./components/leads/ContactUsData";
import AddBlog from "./components/blog/AddBlog";
import ManageBlogs from "./components/blog/ManageBlogs";
import ReviewBlog from "./components/blog/ReviewBlog";
import EditBlog from "./components/blog/EditBlog";
import BlogList from "./components/pages/user/blog/BlogList";
import ViewBlog from "./components/pages/user/blog/ViewBlog";
import Address from "./components/address-manager/Address";
import MyProfile from "./components/end-user/MyProfile";
import AgentReg from "./components/login/AgentReg";
import { otherService, services } from "./common/common";
import InactiveUser from "./components/pages/user/InactiveUser";
import BlogVerifier from "./components/pages/admin/BlogVerifier"
import AgentList from "./components/pages/admin/operator/AgentList";
import AssociateList from "./components/pages/admin/operator/AssociateList";
import ChannelPartnerList from "./components/pages/admin/operator/ChannelPartnerList";
import Owner from "./components/pages/admin/owner-details/Owner";

const App = () => {
  return (
    <NetworkStatusCheck>
      <Routes>
        {/* <Route path="/post-sale-property" element={<AddSaleProperty />} /> */}
        {/* <Route path="/register-agent/:userId" element={<Register />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/agent-register" element={<AgentReg />} />
        {/* <Route path="/:id?" element={<Home />} /> */}

        {/* below the route for public users  */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/service-charges" element={<ServiceCharges />} />
        <Route path="/non-refund-policy" element={<NonRefundPolicy />} />
        <Route
          path="/terms-conditions"
          element={<TermsAndConditions />}
        />
        <Route path="/privacy-policy" element={<PrivacyAndPolicy />} />
        <Route path="/contact-us-data" element={<ContactUsData />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/inactive" element={<InactiveUser />} />

        {/* below the route for registered users  */}
        <Route
          path="/address-manager"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-blog"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review-blog/:id"
          element={
            <ProtectedRoute>
              <ReviewBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog-list"
          element={
            <ProtectedRoute>
              <ManageBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-blog"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:slug/:id" element={<ViewBlog />} />
        <Route path="/blog-verifier" element={<BlogVerifier />} />
        <Route
          path="/post-property"
          element={
            <ProtectedRoute>
              <PropertyListingType />
            </ProtectedRoute>
          }
        />
        {/* below the route for grouping properties  */}
        <Route
          path="/grouping-property"
          element={
            <ProtectedRoute>
              <GroupingProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator-associate-list"
          element={
            <ProtectedRoute>
              <AssociateList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/channel-partner-list"
          element={
            <ProtectedRoute>
              <ChannelPartnerList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator-agent-list"
          element={
            <ProtectedRoute>
              <AgentList />
            </ProtectedRoute>
          }
        />
        <Route path="/my-property-lists" element={<MyPropertyLists />} />
        <Route
          path="/property-edit/:id"
          element={
            <ProtectedRoute>
              <EditProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-property/:propertyId"
          element={
            <ProtectedRoute>
              <ViewProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-add"
          element={
            <ProtectedRoute>
              <UserAdd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users-list"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-package"
          element={
            <ProtectedRoute>
              <PackageAdd />
            </ProtectedRoute>
          }
        />
        <Route path="/packages-list" element={<PackagesList />} />
        <Route
          path="/user-update/:id"
          element={
            <ProtectedRoute>
              <UserUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buy-package"
          element={
            <ProtectedRoute>
              <PackageBuy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-packages"
          element={
            <ProtectedRoute>
              <MyPackages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-package/:id"
          element={
            <ProtectedRoute>
              <PackageUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads-list"
          element={
            <ProtectedRoute>
              <LeadsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-lead"
          element={
            <ProtectedRoute>
              <CreateLead />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property-owner"
          element={
            <ProtectedRoute>
              <Owner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pending-packages-list"
          element={
            <ProtectedRoute>
              <AdminPendingPackages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardAnalytics />
            </ProtectedRoute>
          }
        />

        {/* below the two route for property list and property details  */}
        <Route
          path="/property/:listingType?"
          element={<PropertyList />}
        />

        <Route
          path="/property/:listingType?/:propertyName?/:title?/:propertyId"
          element={<OverViewDetails />}
        />

        {/*Code for the Services Offers */}
        {/* <Route path="/litigation" element={<Litigation />} /> */}
        {/* <Route
                path="/fabrication-service/:city"
                element={<Fabrication />}
              /> */}
        {/* <Route
                path="/mosquito-netting-service/:city"
                element={<MosquitoNetting />}
              /> */}
        {/* <Route
                path="/water-purifier-service/:city"
                element={<WaterPurifier />}
              /> */}
        {/* <Route path="/geyser-service/:city" element={<Geyser />} /> */}
        {/* <Route
                path="/air-crack-filling-service/:city"
                element={<AirCrackFilling />}
              /> */}
        {/* <Route
                path="/water-proofing-service/:city"
                element={<WaterProofing />}
              /> */}
        {services.map((item, index) => (
          <Route
            key={index}
            path={item.navigate + ":city"}
            element={item.component}
          />
        ))}
        {otherService.map((item, index) => (
          <Route
            key={index}
            path={item.navigate + ":city"}
            element={item.component}
          />
        ))}

        {services
          .flatMap((item) => item.childService || []) // Collects all childService elements
          .map((child, index) => (
            <Route
              key={index}
              path={child.navigate + ":city"}
              element={child.component}
            />
          ))}

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/sitemap" component={<Sitemap />} /> */}
      </Routes>
    </NetworkStatusCheck>
  );
};

export default App;
