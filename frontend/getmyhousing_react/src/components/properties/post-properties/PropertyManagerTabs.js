import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import DashBoardNavbar from "../../generic/dashboard/DashBoardNavbar";
import DashBoardHeader from "../../generic/dashboard/DashBoardHeader";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PropertyManagerTabs = (props) => {
  const navigate = useNavigate();
  const { userData, userError, isFetching } = useSelector(
    (state) => state.user
  );
  const { locationData, locationError, isLocationFetching } = useSelector(
    (state) => state.location
  );

  useEffect(() => {
    if (userError) {
      alert(
        "Something went wrong while fetching user details. Please try again later!"
      );
    }
    if (locationError) {
      alert(
        "Something went wrong while fetching Location details. Please try again later!"
      );
    }
  }, [userError, locationError]);
  const { children, tabActive } = props;
  const [value, setValue] = useState(tabActive || 0);
  const canManageGroups =
    userData?.user?.roles?.includes("Admin") ||
    userData?.user?.roles?.includes("Associate") ||
    userData?.user?.roles?.includes("Agent");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Use the navigate function to navigate to the desired route
    switch (newValue) {
      case 0:
        navigate("/post-property"); // Specify the route you want to navigate to
        break;
      case 1:
        navigate("/my-property-lists");
        break;
      case 2:
        navigate("/grouping-property");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          position: "fixed",
          width: "100%",
        }}
      >
        <DashBoardNavbar />
        <Box
          component="header"
          sx={{
            flexGrow: 1,
            p: 2,
            backgroundColor: "#F6F8FB",
            overflowX: "auto", // Add horizontal scrolling for small screens
          }}
        >
          <DashBoardHeader />
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ width: "100%", mb: 2 }}
          >
            <Tab label="Add Property" sx={{ backgroundColor: "white" }} />
            <Tab
              label="Active Properties list"
              sx={{ backgroundColor: "white" }}
            />
            {canManageGroups ? (
              <Tab label="Grouping" sx={{ backgroundColor: "white" }} />
            ) : null}
          </Tabs>
          <TabPanel value={value} index={tabActive}>
            {children}
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}
export default PropertyManagerTabs;
