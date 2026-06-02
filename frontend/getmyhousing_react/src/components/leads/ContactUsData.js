import React, { useEffect, useState } from "react";
import DashBoardNavbar from "../generic/dashboard/DashBoardNavbar";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DashBoardHeader from "../generic/dashboard/DashBoardHeader";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { Bounce, toast } from "react-toastify";
import { dateFormate } from "../../common/common";

const ContactUsData = () => {
  const [cookies] = useCookies();
  const [isFetching, setIsFetching] = useState(true);
  const [contactUsData, setContactUsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let params = {};
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getContactUsDatas,
          params,
          cookies
        );
        if (response.status >= 200 && response.status < 300) {
          if (response.data.responseCode === "200") {
            setContactUsData(response.data.contactUsDataList);
          } else {
            toast.error("Something Went Wrong While Fetching Data!", {
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
          }
        } else {
          toast.error("No data in the response!", {
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
        }
      } catch (error) {
        toast.error("An error occurred while fetching contact us data!", {
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
      }
    };
    if (isFetching) {
      setIsFetching(false);
      getData();
    }
  }, [cookies, isFetching]);
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
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
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead
                  style={{ backgroundColor: "#e7e7e7", color: "#fff" }}
                >
                  <TableRow>
                    <TableCell>Sl.No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>MobileNumber</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Created Date/Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contactUsData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.mobileNumber}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>{item.message}</TableCell>
                      <TableCell>{dateFormate(item.createdDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ContactUsData;
