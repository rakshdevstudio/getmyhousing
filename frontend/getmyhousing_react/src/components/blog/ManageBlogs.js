import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { dateFormate } from "../../common/common";
import BlogManagerTabs from "./BlogManagerTabs";

const ManageBlogs = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState([]);
  const [isBlogDataFetching, setIsBlogDataFetching] = useState(true);
  const [offset, setOffset] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [isLoadMoreFetching, setIsLoadMoreFetching] = useState(false);
  const [invokeBlogsData, setInvokeBlogsData] = useState(false);
  const limit = 10;

  const loadMore = () => {
    setIsLoadMoreFetching(true);
    setOffset((curval) => curval + limit);
    setInvokeBlogsData(true);
  };

  useEffect(() => {
    const getBlogs = async () => {
      let params = { limit: limit, offset: offset };
      let response = await invokeApi(
        config.apiDomains + apiList.getBlogs,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          // setBlogsData((data) => [...data, ...response.data.blogs]);
          if (offset === 0) {
            setBlogsData(response.data.blogs);
          } else {
            setBlogsData((data) => [...data, ...response.data.blogs]);
          }
          setIsBlogDataFetching(false);
          if (response.data.blogs.length < limit) {
            setShowLoadMore(false);
          }
          setIsLoadMoreFetching(false);
        } else {
          alert(
            "Something went wrong while getting blogs. Please try again later!"
          );
          setIsLoadMoreFetching(false);
        }
      } else {
        alert(
          "Something went wrong while getting blogs. Please try again later!!"
        );
        setIsLoadMoreFetching(false);
      }
    };
    if (isBlogDataFetching) {
      getBlogs();
    }
    if (invokeBlogsData) {
      setInvokeBlogsData(false);
      getBlogs();
    }
  }, [isBlogDataFetching, limit, offset, invokeBlogsData, cookies]);

  const deleteblog = async (id) => {
    let params = { id: id, status: "Deleted" };
    let response = await invokeApi(
      config.apiDomains + apiList.updateBlog,
      params,
      cookies
    );
    if (response?.status >= 200 && response?.status < 300) {
      if (response.data.responseCode === "200") {
        setIsBlogDataFetching(true);
      } else {
        alert(
          "Something went wrong while getting blogs. Please try again later!"
        );
        setIsLoadMoreFetching(false);
      }
    } else {
      alert(
        "Something went wrong while getting blogs. Please try again later!!"
      );
      setIsLoadMoreFetching(false);
    }
  };
  return (
    <BlogManagerTabs tabActive={1}>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Manage Blogs
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90%",
          }}
        >
          {!isBlogDataFetching ? (
            <>
              {blogsData?.length > 0 ? (
                <>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <Typography>Blog ID</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography>Blog Tittle</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography>Blog Author</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography>Created Date</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography>Status</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography>Approval Status</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography>Action</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {blogsData.map((el, idx) => (
                          <TableRow>
                            <TableCell align="center">{el.id}</TableCell>
                            <TableCell align="center">
                              <Link
                                onClick={() => {
                                  navigate(`/review-blog/${el.id}`);
                                }}
                                sx={{ cursor: "pointer" }}
                              >
                                {el.blogTitle}
                              </Link>
                            </TableCell>
                            <TableCell align="center">
                              {el.blogAuthorName}
                            </TableCell>
                            <TableCell align="center">
                              {dateFormate(el.createdDate)}
                            </TableCell>
                            <TableCell align="center">{el?.status}</TableCell>
                            <TableCell align="center">
                              {el.approvalStatus}
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="contained"
                                sx={{
                                  margin: "5px",
                                }}
                                onClick={() => {
                                  navigate("/edit-blog", {
                                    state: { Id: el.id },
                                  });
                                }}
                              >
                                Edit
                              </Button>
                              {el?.status !== "Deleted" && (
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    alert(
                                      "Are you sure you want to delete the blog?"
                                    );
                                    deleteblog(el.id);
                                  }}
                                >
                                  Delete
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <>
                  <Typography variant="bodyparagraph">
                    No records found
                  </Typography>
                </>
              )}
            </>
          ) : (
            <CircularProgress sx={{ margin: "auto" }} />
          )}
          {!isBlogDataFetching ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {showLoadMore && (
                <Button
                  variant="outlined"
                  sx={{ my: 2 }}
                  onClick={() => loadMore()}
                  disabled={isLoadMoreFetching}
                >
                  {isLoadMoreFetching ? (
                    <CircularProgress size={24} sx={{ mr: 2 }} />
                  ) : (
                    <></>
                  )}
                  Load more
                </Button>
              )}
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Paper>
    </BlogManagerTabs>
  );
};

export default ManageBlogs;
