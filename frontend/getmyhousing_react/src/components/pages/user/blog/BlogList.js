import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { config } from "../../../../config/config";
import { apiList, invokeApi } from "../../../../apis/apiServices";
import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import { dateFormate } from "../../../../common/common";
import { useNavigate, useParams } from "react-router-dom";

const BlogList = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [blogsData, setBlogsData] = useState(null);
  const [isBlogsDataFetching, setIsBlogsDataFetching] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const { subid } = useParams();
  const [value, setValue] = useState(0);
  const [blogCategory, setBlogCategory] = useState([]);

  const handleChange = (event, newValue) => {
    const findId = blogCategory[newValue].id;
    setValue(newValue);
    setCategoryId(findId);
    setIsBlogsDataFetching(true);
  };

  useEffect(() => {
    const getBlogs = async () => {
      let params = {
        categoryId: categoryId,
        subCategoryId: subid,
        status: "Active",
      };
      let response = await invokeApi(
        config.apiDomains + apiList.getBlogs,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setBlogsData(response.data.blogs);
        } else {
          alert(
            "Something went wrong while getting blogs. Please try again later!"
          );
        }
      } else {
        alert(
          "Something went wrong while getting blogs. Please try again later!!"
        );
      }
    };
    if (isBlogsDataFetching && categoryId) {
      getBlogs();
      setIsBlogsDataFetching(false);
    }
  }, [isBlogsDataFetching, subid, categoryId, cookies]);

  useEffect(() => {
    const getBlogCategoriesHierarchy = async (id) => {
      let params = {};
      let response = await invokeApi(
        config.apiDomains + apiList.getBlogCategoriesHierarchy,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          let initialCategoryId = response.data.blogCategories[0].id;
          setBlogCategory(response.data.blogCategories);
          setCategoryId(initialCategoryId);
        } else {
          alert(
            "Something went wrong while getting the blogs. Please try again later!"
          );
        }
      } else {
        alert(
          "Something went wrong while getting the blogs. Please try again later!!"
        );
      }
    };
    getBlogCategoriesHierarchy();
  }, [cookies]);

  return (
    <>
      <Header />
      <Box
        sx={{
          py: { md: 5, xs: 3 },
        }}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item md={2} component="aside">
              <Tabs
                orientation={isMobile ? "horizontal" : "vertical"}
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                {blogCategory?.map((item, index) => (
                  <Tab key={item.id} label={item.category} />
                ))}
              </Tabs>
            </Grid>
            <Grid item md={10} sx={12}>
              <Grid container spacing={3}>
                {!isBlogsDataFetching ? (
                  blogsData?.map((el, idx) => (
                    <Grid item xs={12} sm={12} md={6} key={idx}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          gap: 1,
                          alignSelf: "stretch",
                          boxShadow: "15px 15px 30px #bebebe",
                          width: "100%",
                          maxHeight: "500px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            cursor: "pointer",
                            height: "280px",
                          }}
                          onClick={() => {
                            navigate(`/blog/${el.slug}/${el.id}`);
                          }}
                        >
                          <Box
                            component="img"
                            src={el.bannerImageUrl}
                            alt="Banner"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Box sx={{ p: "20px" }}>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {el.blogAuthorName} {"|"}{" "}
                            {dateFormate(el.createdDate)}{" "}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "1.4em",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                            onClick={() => {
                              navigate(`/blog/${el.slug}/${el.id}`);
                            }}
                          >
                            {el.blogTitle}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              textAlign: "justify",
                              lineHeight: "1.5",
                            }}
                          >
                            {el.metaDescription}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <CircularProgress sx={{ margin: "auto" }} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default BlogList;
