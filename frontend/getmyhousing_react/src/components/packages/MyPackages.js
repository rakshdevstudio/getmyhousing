import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import UserPackageVBTabs from "./UserPackageVBTabs";
import { Bounce, toast } from "react-toastify";

function MyPackages() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [activePackages, setActivePackages] = useState([]);
  const [expiredPackages, setExpiredPackages] = useState([]);
  const [pendingPackages, setPendingPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let params = { userId: cookies[config.cookieName]?.loginUserId };
      const response = await invokeApi(
        config.apiDomains + apiList.getUserPackage,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setActivePackages(
            response.data.UserPackages.filter(
              (item) => item.status === "Active"
            )
          );
          setExpiredPackages(
            response.data.UserPackages.filter(
              (item) => item.status === "Expired"
            )
          );
          setPendingPackages(
            response.data.UserPackages.filter(
              (item) => item.status === "Pending"
            )
          );
        } else {
          toast.error(
            "An error occurred while fetching data Please Try Again!",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            }
          );
        }
      } else if (response.data.responseCode === "401") {
        navigate("/logout");
      } else {
        toast.error("An error occurred while fetching data Please Try Again!", {
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
      fetchData();
      setIsFetching(false);
    }
  }, [cookies, isFetching]);

  return (
    <>
      <UserPackageVBTabs tabActive={0}>
        <h1 style={{ textAlign: "center" }}>My Packages</h1>
        {isFetching ? (
          <Stack sx={{ display: "flex", alignItems: "center", mb: 5 }}>
            <CircularProgress sx={{ color: "black" }} />
          </Stack>
        ) : (
          <>
            {/* Active packages */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow
                    style={{ backgroundColor: "#e7e7e7", color: "#fff" }}
                  >
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                      colSpan={7}
                    >
                      Active Packages
                    </TableCell>
                  </TableRow>
                  <TableRow
                    style={{ backgroundColor: "#e7e7e7", color: "#fff" }}
                  >
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Package Name
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Listing Type
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Duration In Days
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      No of Listings
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      No of Postings
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Active Date
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Expiry Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activePackages.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.packageName}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.listingType}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.durationInDays}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.noOfListings}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.noOfPostings}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {new Date(item.packageActiveDate).getDate() +
                          "-" +
                          new Date(item.packageActiveDate).getMonth() +
                          "-" +
                          new Date(item.packageActiveDate).getFullYear()}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {new Date(item.packageExpiryDate).getDate() +
                          "-" +
                          new Date(item.packageExpiryDate).getMonth() +
                          "-" +
                          new Date(item.packageExpiryDate).getFullYear()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Expired packages */}
            <TableContainer component={Paper} style={{ marginTop: "30px" }}>
              <Table>
                <TableHead>
                  <TableRow
                    style={{ backgroundColor: "#e7e7e7", color: "#fff" }}
                  >
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                      colSpan={7}
                    >
                      Expired Packages
                    </TableCell>
                  </TableRow>
                  <TableRow
                    style={{ backgroundColor: "#e7e7e7", color: "#fff" }}
                  >
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Package Name
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Listing Type
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Duration In Days
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      No of Listings
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      No of Postings
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Active Date
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Expiry Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expiredPackages.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.packageName}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.listingType}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.durationInDays}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.noOfListings}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.noOfPostings}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {new Date(item.packageActiveDate).getDate() +
                          "-" +
                          new Date(item.packageActiveDate).getMonth() +
                          "-" +
                          new Date(item.packageActiveDate).getFullYear()}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {new Date(item.packageExpiryDate).getDate() +
                          "-" +
                          new Date(item.packageExpiryDate).getMonth() +
                          "-" +
                          new Date(item.packageExpiryDate).getFullYear()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pending packages */}
            <TableContainer component={Paper} style={{ marginTop: "30px" }}>
              <Table>
                <TableHead>
                  <TableRow
                    style={{ backgroundColor: "#e7e7e7", color: "#fff" }}
                  >
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                      colSpan={7}
                    >
                      Pending Packages
                    </TableCell>
                  </TableRow>
                  <TableRow
                    style={{ backgroundColor: "#e7e7e7", color: "#fff" }}
                  >
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Package Name
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Listing Type
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      Duration In Days
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      No of Listings
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "3px solid #454545",
                        borderRight: "1px solid #ddd",
                        fontSize: "16px",
                      }}
                    >
                      No of Postings
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingPackages.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.packageName}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.listingType}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.durationInDays}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.noOfListings}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {item.noOfPostings}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </UserPackageVBTabs>
    </>
  );
}

export default MyPackages;
