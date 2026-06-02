import React, { useEffect, useState } from "react";
import PackagesTabs from "./PackagesTabs";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const AdminPendingPackages = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);
  const [packagePaymentId, setPackagePaymentId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [packagePaymentsList, setPackagePaymentList] = useState([]);
  const [packageDetail, setPackageDetails] = useState({});
  const [userDetail, setUserDetail] = useState({});

  const [isUserDetailModal, setIsUserDetailModal] = useState(false);
  const [isPackageDetailModal, setIsPackageDetailModal] = useState(false);

  useEffect(() => {
    if (packagePaymentId !== null) {
      getPackageDetail();
    }
  }, [packagePaymentId]);

  useEffect(() => {
    if (userId !== null) {
      getUser();
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user package data based on userID
        const packageParams = { status: "Pending" };
        const response = await invokeApi(
          config.apiDomains + apiList.getPackagePayments,
          packageParams,
          cookies
        );
        if (response.data.responseCode === "200") {
          setPackagePaymentList(response.data.packagePayments);
        } else if (response.data.responseCode === "401") {
          navigate("/logout");
        } else {
          toast.error("Error fetching user package data!", {
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
        toast.error("An error occurred while fetching data!", {
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
    if (fetching) {
      fetchData();
      setFetching(false);
    }
  }, [cookies, fetching]);

  async function getUser() {
    try {
      // Fetch user package data based on userID
      const packageParams = { id: userId };
      const response = await invokeApi(
        config.apiDomains + apiList.getUser,
        packageParams,
        cookies
      );
      if (response.data.responseCode === "200") {
        setUserDetail(response.data.user);
        setIsUserDetailModal(true);
        setUserId(null);
      } else if (response.data.responseCode === "401") {
        navigate("/logout");
      } else {
        toast.error("Error fetching user data!", {
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
      toast.error("An error occurred while fetching data!", {
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
  }

  async function getPackageDetail() {
    try {
      // Fetch user package data based on userID
      const packageParams = { id: packagePaymentId };
      const response = await invokeApi(
        config.apiDomains + apiList.getPackage,
        packageParams,
        cookies
      );
      if (response.data.responseCode === "200") {
        setPackageDetails(response.data.packages);
        setIsPackageDetailModal(true);
        setPackagePaymentId(null);
      } else if (response.data.responseCode === "401") {
        navigate("/logout");
      } else {
        toast.error("Error fetching user package data!", {
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
      toast.error("An error occurred while fetching data!", {
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
  }

  async function updatePackagePayment(PackagePaymentID, status) {
    try {
      // Fetch user package data based on userID
      const packageParams = { id: PackagePaymentID, status: status };
      const response = await invokeApi(
        config.apiDomains + apiList.editPackagePayments,
        packageParams,
        cookies
      );
      if (response.data.responseCode === "200") {
        setFetching(true);
      } else if (response.data.responseCode === "401") {
        navigate("/logout");
      } else {
        toast.error("Error fetching update package data!", {
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
      toast.error("An error occurred while fetching data!", {
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
  }

  return (
    <>
      <PackagesTabs tabActive={2}>
        <TableContainer component={Paper} sx={{ mb: 2.1 }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#e7e7e7", color: "#fff" }}>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  Package ID
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  User ID
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  Transaction ID
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  Created Date
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packagePaymentsList?.map((items) => (
                <TableRow key={items.id}>
                  <TableCell
                    style={{
                      borderBottom: "1px solid #ddd",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setPackagePaymentId(items.packageId);
                    }}
                  >
                    See Package Details
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "1px solid #ddd",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setUserId(items.userId);
                    }}
                  >
                    See User Details
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                    {items.transactionId}
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                    {items.status}
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                    {items.createdDate}
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        updatePackagePayment(items.id, "Active");
                      }}
                    >
                      Approved
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => updatePackagePayment(items.id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PackagesTabs>
      {/* user details */}
      <Dialog
        open={isUserDetailModal}
        onClose={() => setIsUserDetailModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Lead Action
          <IconButton
            style={{ marginLeft: "250px" }}
            edge="end"
            color="inherit"
            onClick={() => setIsUserDetailModal(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{userDetail.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone</TableCell>
                  <TableCell>{userDetail.mobileNumber}</TableCell>
                </TableRow>
                {userDetail.whatsappNumber && (
                  <TableRow>
                    <TableCell>Whatsapp</TableCell>
                    <TableCell>{userDetail.whatsappNumber}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>{userDetail.roles}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>
                    {userDetail.district + ", "}
                    {userDetail.state + ", "}
                    {userDetail.pincode}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
            onClick={() => setIsUserDetailModal(false)}
          >
            <Button variant="contained" color="primary">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Package details */}
      <Dialog
        open={isPackageDetailModal}
        onClose={() => setIsPackageDetailModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Package Details
          <IconButton
            style={{ marginLeft: "250px" }}
            edge="end"
            color="inherit"
            onClick={() => setIsPackageDetailModal(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{packageDetail.packageName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Duration</TableCell>
                  <TableCell>{packageDetail.durationInDays}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Package For</TableCell>
                  <TableCell>{packageDetail.packageFor}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>No Of Listing</TableCell>
                  <TableCell>{packageDetail.noOfListings}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Selling Price</TableCell>
                  <TableCell>{packageDetail.sellingPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
            onClick={() => setIsPackageDetailModal(false)}
          >
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPendingPackages;
