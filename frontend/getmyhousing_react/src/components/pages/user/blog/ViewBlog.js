import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { config } from "../../../../config/config";
import { apiList, invokeApi } from "../../../../apis/apiServices";
import Header from "../../../generic/Header";
import Footer from "../../../generic/Footer";
import "../../../../styles/Blog.css";
import Helmet from "../../../functional-component/Helmet";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [isBlogDataFetching, setIsBlogDataFetching] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      let params = { id: id };
      let response = await invokeApi(
        config.apiDomains + apiList.getBlog,
        params,
        cookies
      );

      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          const { headings, modifiedContent } = preprocessBlogContent(
            response.data.blog.blogContent
          );

          setIsBlogDataFetching(false);
          setBlogData({ ...response.data.blog, blogContent: modifiedContent });
          setHeadings(headings);
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

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  // Function to extract headings from HTML content
  function preprocessBlogContent(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const headings = Array.from(doc.querySelectorAll("h2")).map(
      (elem) => {
        const slug = slugify(elem.innerText);
        elem.id = slug; // Inject the id directly into the element
        return {
          id: slug,
          text: elem.innerText,
          level: Number(elem.nodeName.charAt(1)),
        };
      }
    );

    // Serialize the modified HTML back to a string
    const serializedContent = new XMLSerializer().serializeToString(doc.body);
    return { headings, modifiedContent: serializedContent };
  }

  // Inside your ViewBlog component

  const handleToCClick = (slug, event) => {
    event.preventDefault(); // Prevent default anchor link behavior
    const targetElement = document.getElementById(slug);
    if (targetElement) {
      window.history.pushState({}, "", `#${slug}`); // This updates the URL hash
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let nearestHeading = "";
      let nearestHeadingDistance = Number.POSITIVE_INFINITY;

      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        // Check if the element exists before proceeding
        if (element) {
          const distance = Math.abs(element.getBoundingClientRect().top);

          if (distance < nearestHeadingDistance) {
            nearestHeadingDistance = distance;
            nearestHeading = heading.id;
          }
        }
      });

      setActiveHeading(nearestHeading);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]); // Make sure to update if headings change

  return (
    <>
      <Helmet
        title={blogData?.metaTitle}
        description={blogData?.metaDescription}
        keywords={blogData?.metaKeywords}
        canonicalUrl={window.location.href}
        ogTitle={blogData?.metaTitle}
        ogDescription={blogData?.metaDescription}
        twitterTitle={blogData?.metaTitle}
        twitterDescription={blogData?.metaDescription}
        ogImage={blogData?.bannerImageUrl}
      />
      <Header />
      <Grid container>
        <Grid item md={9} sm={12}>
          <Box
            sx={{
              height: "90%",
              margin: "10px",
              position: "relative",
              overflowY: "auto",
              maxHeight: "calc(100vh - 100px)",
            }}
          >
            <Box sx={{ padding: "30px" }}>
              <Breadcrumbs separator="›">
                <RouterLink
                  underline="hover"
                  component={RouterLink}
                  to="/blogs"
                >
                  Blogs
                </RouterLink>
                <RouterLink underline="hover">
                  <Typography
                    onClick={() => {
                      navigate(
                        `/blogs/${blogData?.categoryName.replace(/\s+/g, "")}/${blogData?.categoryId
                        }`
                      );
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    {blogData?.categoryName}
                  </Typography>
                </RouterLink>

                {blogData?.subCategoryId && (
                  <RouterLink underline="hover">
                    <Typography
                      onClick={() => {
                        navigate(
                          `/blogs/${blogData?.categoryName.replace(
                            /\s+/g,
                            ""
                          )}/${blogData?.subCategoryName.replace(/\s+/g, "")}/${blogData?.subCategoryId
                          }`
                        );
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      {blogData?.subCategoryName}
                    </Typography>
                  </RouterLink>
                )}
              </Breadcrumbs>
            </Box>
            {!isBlogDataFetching ? (
              <>
                <Container>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h3" component={"h1"} sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: "700", py: 2 }}>
                      {blogData.blogTitle}
                    </Typography>
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
                        maxHeight: "auto", // Set maximum height
                      }}
                    />
                  </Box>
                  <Box
                    className="blog-content"
                    dangerouslySetInnerHTML={{
                      __html: blogData?.blogContent,
                    }}
                  />
                </Container>
              </>
            ) : (
              <>
                <CircularProgress
                  sx={{
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </>
            )}
          </Box>
        </Grid>
        <Grid
          item
          md={3}
          sm={12}
          className="table-content"
          sx={{
            position: "sticky", // Fix the TOC column
            right: 0, // Align to the right
            top: "101px", // Adjust based on your header height
            bottom: "30px", // Stretch to the bottom
            width: "25%", // Adjust width as needed
            padding: "20px",
            background: "#f4f4f4",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            overflowY: "auto", // Allow vertical scrolling
          }}
        >
          <Typography variant="h5" gutterBottom>
            Table of Contents
          </Typography>
          <ul style={{ listStyle: "none", paddingLeft: "0" }}>
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`head${heading.level}`}
                style={{
                  marginLeft: `${heading.level * 20}px`,
                  fontWeight:
                    activeHeading === heading.id ? "bold" : "normal",
                  marginBottom: "10px",
                }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleToCClick(heading.id, e)}
                  style={{
                    textDecoration: "none",
                    color:
                      activeHeading === heading.id ? "#007bff" : "inherit",
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default ViewBlog;
