import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import PreviewEditor from "./PreviewEditor";
import DashBoardNavbar from "../generic/dashboard/DashBoardNavbar";
import DashBoardHeader from "../generic/dashboard/DashBoardHeader";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
const ReviewBlog = () => {
  const [cookies] = useCookies();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isBlogDataFetching, setIsBlogDataFetching] = useState(true);
  const [blogData, setBlogData] = useState(null);

  const [approvalRemarks, setAppovalRemarks] = useState("");
  const [approvalRemarksError, setApprovalRemarksError] = useState(false);
  const [approvalRemarksHelperText, setApprovalRemarksHelperText] =
    useState("");

  const [approve, setApprove] = useState(false);
  const [approvalDrawerOpen, setApprovalDrawerOpen] = useState(false);

  const [reviewStatus, setReviewStatus] = useState("");
  const [approveStatusFetching, setApproveStatusFetching] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      let params = {
        id: id,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.getBlog,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setIsBlogDataFetching(false);
          setBlogData(response.data.blog);
        } else {
          alert(
            "Something went wrong while getting the blog. Please try again later!"
          );
        }
      } else {
        alert(
          "Something went wrong while getting the blog. Please try again later!!"
        );
      }
    };
    if (isBlogDataFetching) {
      getBlog();
    }
  }, [id, cookies, isBlogDataFetching]);

  const reviewBlog = async () => {
    if (approvalRemarks !== "") {
      setApproveStatusFetching(true);
      let params = {
        id: id,
        status: reviewStatus,
        approvalRemarks: approvalRemarks,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.reviewBlog,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setApproveStatusFetching(false);
          setApprovalDrawerOpen(false);
          setIsBlogDataFetching(true);
        } else {
          alert(
            "Something went wrong while review the blog. Please try again later!"
          );
          setApprovalDrawerOpen(false);
          setApproveStatusFetching(false);
        }
      } else {
        alert(
          "Something went wrong while review the blog. Please try again later!!"
        );
        setApproveStatusFetching(false);
        setApprovalDrawerOpen(false);
      }
    } else {
      setApprovalRemarksError(true);
      setApprovalRemarksHelperText("Please enter the remarks!");
    }
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashBoardNavbar />
        <Box
          component="header"
          sx={{ flexGrow: 1, p: 2, backgroundColor: "#F6F8FB" }}
        >
          <DashBoardHeader />
          <Paper sx={{ p: 3 }}>
            <Breadcrumbs separator="›">
              <Link underline="hover" component={RouterLink} onClick={() => navigate(-1)}>
                Manage Blogs
              </Link>
              <Typography color="inherit"> Review Blog</Typography>
            </Breadcrumbs>

            <Box
              sx={{
                height: "90%",
                margin: "10px",
                position: "relative",
              }}
            >
              {!isBlogDataFetching ? (
                <>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ mb: 2, textAlign: "center" }}
                    >
                      {blogData?.blogTitle}
                    </Typography>
                    {blogData?.bannerImageUrl && (
                      <Typography variant="Body1" sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            component="img"
                            src={blogData?.bannerImageUrl}
                            alt="Banner"
                            sx={{
                              width: "100%",
                              height: "auto",
                              objectFit: "contain",
                              backgroundColor: "#eee",
                              ml: 2,
                            }}
                          />
                        </Box>
                        <br></br>
                      </Typography>
                    )}

                    <PreviewEditor
                      initialValue={blogData?.blogContent}
                      readOnly={true}
                      height="100vh"
                      width="100%"
                    />

                    {blogData?.approvalStatus == "Pending" ? (
                      <CardActions
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          mt: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            setApprove(false);
                            setReviewStatus("Rejected");
                            setApprovalDrawerOpen(true);
                          }}
                        >
                          Reject
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={() => {
                            setApprove(true);
                            setReviewStatus("Approved");
                            setApprovalDrawerOpen(true);
                          }}
                        >
                          Approve
                        </Button>
                      </CardActions>
                    ) : (
                      <></>
                    )}
                  </CardContent>
                </>
              ) : (
                <>
                  {" "}
                  <Box>
                    <CircularProgress
                      sx={{
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Paper>

          <Dialog open={approvalDrawerOpen}>
            <DialogTitle id="success-title">
              {" "}
              {approve ? "Approve!!" : "Rejected!!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="success-description" sx={{ mb: 2 }}>
                {approve
                  ? "Are you sure you want to approve?"
                  : "Are you sure you want to reject?"}
              </DialogContentText>
              <TextField
                id="outlined-multiline-flexible"
                label={approve ? "Approval remarks *" : "Rejection remarks *"}
                value={approvalRemarks}
                onChange={(ev) => {
                  setAppovalRemarks(ev.target.value);
                  setApprovalRemarksError(false);
                  setApprovalRemarksHelperText("");
                }}
                error={approvalRemarksError}
                helperText={approvalRemarksHelperText}
                multiline
                rows={4}
                style={{ width: 400 }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setApprovalDrawerOpen(false);
                  setAppovalRemarks("");
                  setApprovalRemarksError(false);
                  setApprovalRemarksHelperText("");
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={approveStatusFetching}
                onClick={() => {
                  reviewBlog();
                }}
              >
                Submit
                {approveStatusFetching ? (
                  <CircularProgress size={24} sx={{ ml: 2 }} />
                ) : (
                  <></>
                )}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

export default ReviewBlog;
