import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import DashBoardNavbar from "../generic/dashboard/DashBoardNavbar";
import DashBoardHeader from "../generic/dashboard/DashBoardHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserPackageVBTabs = (props) => {
  const navigate = useNavigate();
  const { children, tabActive } = props;
  const [value, setValue] = useState(tabActive || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/my-packages");
        break;
      case 1:
        navigate("/buy-package");
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
            <Tab label="My Package" sx={{ backgroundColor: "white" }} />
            <Tab label="Packages Buy" sx={{ backgroundColor: "white" }} />
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
export default UserPackageVBTabs;
