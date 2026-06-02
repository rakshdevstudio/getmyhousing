import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import DashBoardNavbar from "../generic/dashboard/DashBoardNavbar";
import DashBoardHeader from "../generic/dashboard/DashBoardHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserManagerTabs = (props) => {
  const navigate = useNavigate();
  const { children, tabActive } = props;
  const [value, setValue] = useState(tabActive || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Use the navigate function to navigate to the desired route
    switch (newValue) {
      case 0:
        navigate("/user-add"); // Specify the route you want to navigate to
        break;
      case 1:
        navigate("/users-list");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
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
            sx={{ width: "100%" }}
          >
            <Tab label="Add User" sx={{ backgroundColor: "white" }} />
            <Tab label="Users list" sx={{ backgroundColor: "white" }} />
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
export default UserManagerTabs;
