import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Typography,
  Link,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardActions,
  CircularProgress,
  Paper,
  FormHelperText,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import TextEditor from "./TextEditor";
import { invokeApi, invokeFormDataApi, apiList } from "../../apis/apiServices";
import { config } from "./../../config/config";
import DashboardNavbar from "./../generic/dashboard/DashBoardNavbar";
import DashBoardHeader from "./../generic/dashboard/DashBoardHeader";

const EditBlog = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [blogTittle, setBlogTittle] = useState("");
  const [slug, setSlug] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [bannerImageUrl, setBannerImageUrl] = useState(null);
  const [maxFileSizeErr, setMaxFileSizeErr] = useState("");
  const [bannerImageUploadStatus, setBannerImageUploadStatus] = useState(false);
  const [isFileUploadFetching, setIsFileUploadFetching] = useState(false);
  const [isAddBlogFetching, setIsAddBlogFetching] = useState(false);
  const [blogDataFetching, setBlogDataFetching] = useState(true);

  const [blogCategoriesData, setBlogCategoriesData] = useState(null);
  const [blogCategorie, setBlogCategorie] = useState("");
  const [blogCategorieId, setBlogCategorieId] = useState(null);

  const [blogSubCategory, setBlogSubCategory] = useState(null);
  const [blogSubCategoryId, setBlogSubCategoryId] = useState(null);

  const [blogTitleError, setBlogTitleError] = useState(false);
  const [blogTitleHelperText, setBlogTitleHelperText] = useState("");

  const [blogContentError, setBlogContentError] = useState(false);
  const [blogContentHelperText, setBlogContentHelperText] = useState("");

  const [slugError, setSlugError] = useState(false);
  const [slugHelperText, setSlugHelperText] = useState("");

  const [metaTitleError, setMetaTitleError] = useState(false);
  const [metaTitleHelperText, setMetaTitleHelperText] = useState("");

  const [metaDescriptionError, setMetaDescriptionError] = useState(false);
  const [metaDescriptionHelperText, setMetaDescriptionHelperText] =
    useState("");

  const [keywordsError, setKeywordsError] = useState(false);
  const [keywordsHelperText, setKeywordsHelperText] = useState("");

  const [categoryError, setCategoryError] = useState(false);
  const [categoryHelperText, setCategoryHelperText] = useState("");

  const location = useLocation();
  const { Id } = location.state || {};

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  };
  const updateSlug = (title) => {
    const generatedSlug = generateSlug(title);
    setSlug(generatedSlug);
  };

  const handleEditorChange = (html) => {
    setBlogContent(html);
  };

  //vaidation
  const blogValidation = () => {
    let validationErrors = false;

    if (blogTittle === "") {
      setBlogTitleError(true);
      setBlogTitleHelperText("Please enter blog title");
      validationErrors = true;
    }

    if (blogContent === "") {
      setBlogContentError(true);
      setBlogContentHelperText("Please enter the blog content");
      validationErrors = true;
    }
    if (slug === "") {
      setSlugError(true);
      setSlugHelperText("Please enter the slug");
      validationErrors = true;
    }
    if (metaTitle === "") {
      setMetaTitleError(true);
      setMetaTitleHelperText("Please enter the meta title");
      validationErrors = true;
    }
    if (metaDescription === "") {
      setMetaDescriptionError(true);
      setMetaDescriptionHelperText("Please enter the meta Description");
      validationErrors = true;
    }
    if (keywords === "") {
      setKeywordsError(true);
      setKeywordsHelperText("Please enter the keywords");
      validationErrors = true;
    }
    if (blogCategorie === "") {
      setCategoryError(true);
      setCategoryHelperText("Please select the category");
      validationErrors = true;
    }
    if (!validationErrors) {
      return true;
    } else {
      return false;
    }
  };

  const handleFileUpload = (ev) => {
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(
      /^image\/(jpe?g|png|gif)/
    );

    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 1024 * 1024) {
        setBannerImage(fileUploaded);
        setPreviewImage(URL.createObjectURL(fileUploaded));
        setMaxFileSizeErr("");
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const image = new Image();
          image.src = event.target.result;
          image.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_SIZE = 1024 * 1024;
            let width = image.width;
            let height = image.height;

            while (width * height > MAX_SIZE) {
              width *= 0.9;
              height *= 0.9;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                const compressedFile = new File([blob], fileUploaded.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });

                setBannerImage(compressedFile);
                setPreviewImage(URL.createObjectURL(compressedFile));
                setMaxFileSizeErr("");
              },
              "image/jpeg",
              0.8
            );
          };
        };
        reader.readAsDataURL(fileUploaded);
      }
    } else {
      setMaxFileSizeErr(
        "Please upload a valid image in jpeg/jpg/png/gif format"
      );
    }
  };

  useEffect(() => {
    const getBlogCategoriesHierarchy = async () => {
      let params = {};
      let response = await invokeApi(
        config.apiDomains + apiList.getBlogCategoriesHierarchy,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setBlogCategoriesData(response.data.blogCategories);
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

  const updateBlog = async () => {
    setIsAddBlogFetching(true);
    let params = {
      id: Id,
      blogTitle: blogTittle,
      blogContent: blogContent,
      slug: slug,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
      keywords: keywords,
      bannerImageUrl,
      subCategoryId: blogSubCategoryId,
      categoryId: blogCategorieId,
    };
    let response = await invokeApi(
      config.apiDomains + apiList.updateBlog,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        navigate("/blog-list");
      } else {
        alert(
          "Something went wrong while updating blog. Please try again later!"
        );
      }
    } else {
      alert(
        "Something went wrong while updating blog. Please try again later!!"
      );
    }
  };

  if (bannerImageUploadStatus) {
    const blogValid = blogValidation();
    if (blogValid) {
      updateBlog();
    }
    setBannerImageUploadStatus(false);
  }

  // handle submit
  const handleSubmit = async () => {
    if (bannerImage) {
      setIsFileUploadFetching(true);
      let formData = new FormData();
      formData.append("file", bannerImage);
      formData.append("path", "blog_image");

      let response = await invokeFormDataApi(
        config.apiDomains + apiList.uploadFile,
        formData,
        cookies
      );

      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setBannerImageUrl(response.data.url);
          setIsFileUploadFetching(false);
          setBannerImageUploadStatus(true);
        } else {
          alert(
            "Something went wrong while uploading banner image. Please try again later!"
          );
          setIsFileUploadFetching(false);
        }
      } else if (response.status === 401) {
        navigate("/logout");
      } else {
        alert(
          "Something went wrong while uploading banner image. Please try again later!!"
        );
        setIsFileUploadFetching(false);
      }
      setBannerImageUploadStatus(true);
    } else {
      setBannerImageUploadStatus(true);
    }
    setBannerImageUploadStatus(true);
  };

  useEffect(() => {
    const getBlog = async () => {
      let params = {
        id: Id,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.getBlog,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          setBlogDataFetching(false);
          setBlogTittle(response.data.blog.blogTitle);
          setBlogContent(response.data.blog.blogContent);
          setSlug(response.data.blog.slug);
          setMetaDescription(response.data.blog.metaDescription);
          setMetaTitle(response.data.blog.metaTitle);
          setKeywords(response.data.blog.keywords);
          setBlogCategorie(response.data.blog.categoryName);
          setBlogSubCategory(response.data.blog.subCategoryName);
          setPreviewImage(response.data.blog.bannerImageUrl);
          setBannerImageUrl(response.data.blog.bannerImageUrl);
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
    if (blogDataFetching) {
      getBlog();
    }
  }, [Id, cookies, blogDataFetching]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardNavbar />
        <Box
          component="header"
          sx={{ flexGrow: 1, p: 2, backgroundColor: "#F6F8FB" }}
        >
          <DashBoardHeader />

          <Paper sx={{ p: 3 }}>
            <Breadcrumbs separator="›">
              <Link underline="hover" component={RouterLink} to="/blog-list">
                Manage Blogs
              </Link>
              <Typography color="inherit"> Edit Blog</Typography>
            </Breadcrumbs>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Update Blog
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "90%",
                margin: "10px",
              }}
            >
              {!blogDataFetching ? (
                <>
                  <TextField
                    id="blogTitle"
                    label="Blog Title *"
                    value={blogTittle}
                    variant="standard"
                    sx={{ mb: 2 }}
                    fullWidth
                    onChange={(ev) => {
                      const title = ev.target.value;
                      setBlogTittle(title);
                      updateSlug(title);
                      setBlogTitleError(false);
                      setBlogTitleHelperText("");
                    }}
                    inputProps={{ maxLength: 60 }}
                    error={blogTitleError}
                    helperText={blogTitleHelperText}
                  />

                  <TextEditor
                    onEditorChange={handleEditorChange}
                    initialValue={blogContent}
                  />
                  <br></br>
                  <TextField
                    id="slug"
                    label="Slug *"
                    value={slug}
                    variant="standard"
                    sx={{ mb: 2 }}
                    fullWidth
                    onChange={(ev) => {
                      const enteredSlug = ev.target.value.replace(
                        /[^a-zA-Z0-9-]/g,
                        "-"
                      );
                      setSlug(enteredSlug);
                      setSlugError(false);
                      setSlugHelperText("");
                    }}
                    inputProps={{ maxLength: 60 }}
                    error={slugError}
                    helperText={slugHelperText}
                  />
                  <TextField
                    id="metaTitle"
                    label="Meta Title *"
                    value={metaTitle}
                    variant="standard"
                    sx={{ mb: 2 }}
                    fullWidth
                    onChange={(ev) => {
                      setMetaTitle(ev.target.value);
                      setMetaTitleError(false);
                      setMetaTitleHelperText("");
                    }}
                    inputProps={{ maxLength: 60 }}
                    error={metaTitleError}
                    helperText={metaTitleHelperText}
                  />

                  <TextField
                    id="metaDescription"
                    label="Meta Description *"
                    value={metaDescription}
                    variant="standard"
                    sx={{ mb: 2 }}
                    fullWidth
                    onChange={(ev) => {
                      setMetaDescription(ev.target.value);
                      setMetaDescriptionError(false);
                      setMetaDescriptionHelperText("");
                    }}
                    inputProps={{ maxLength: 200 }}
                    error={metaDescriptionError}
                    helperText={metaDescriptionHelperText}
                  />

                  <TextField
                    id="keywords"
                    label="Keywords *"
                    value={keywords}
                    variant="standard"
                    sx={{ mb: 2 }}
                    fullWidth
                    onChange={(ev) => {
                      setKeywords(ev.target.value);
                      setKeywordsError(false);
                      setKeywordsHelperText("");
                    }}
                    inputProps={{ maxLength: 60 }}
                    error={keywordsError}
                    helperText={keywordsHelperText}
                  />

                  <Box>
                    <FormControl
                      variant="standard"
                      sx={{ width: "200px", mb: 2 }}
                    >
                      <InputLabel>Category *</InputLabel>
                      <Select
                        label="Categorie"
                        value={blogCategorie}
                        onChange={(ev) => {
                          setBlogCategorie(ev.target.value);
                        }}
                        error={categoryError}
                      >
                        {blogCategoriesData?.map((el) => (
                          <MenuItem
                            key={el.id}
                            value={el.category}
                            onClick={() => {
                              setBlogCategorieId(el.id);
                            }}
                          >
                            {" "}
                            {el.category}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error>
                        {categoryHelperText}
                      </FormHelperText>
                    </FormControl>
                  </Box>

                  {blogCategoriesData?.map((el) =>
                    el.category === blogCategorie && el.subCategories ? (
                      <FormControl
                        key={el.id}
                        variant="standard"
                        sx={{ width: "200px", mb: 2 }}
                      >
                        <InputLabel>Sub Category </InputLabel>
                        <Select
                          label="Categorie"
                          value={blogSubCategory}
                          onChange={(ev) => {
                            setBlogSubCategory(ev.target.value);
                          }}
                        >
                          {el.subCategories.map((e) => (
                            <MenuItem
                              key={e.id}
                              value={e.subCategory}
                              onClick={() => {
                                setBlogSubCategoryId(e.id);
                              }}
                            >
                              {" "}
                              {e.subCategory}{" "}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <></>
                    )
                  )}
                  <Box>
                    <label htmlFor="image">
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="image"
                        multiple
                        type="file"
                        onChange={handleFileUpload}
                      />
                      <Button
                        color="primary"
                        variant="contained"
                        component="span"
                        sx={{ mt: 2 }}
                      >
                        <AddAPhotoIcon sx={{ mr: 1 }} />
                        Upload Banner Image
                      </Button>
                    </label>
                  </Box>
                  {Id && previewImage ? (
                    <Box sx={{ padding: "10px" }}>
                      <label htmlFor="Banner Image">
                        <Box
                          sx={{
                            width: "100px",
                            height: "108px",
                            flex: "none",
                            order: 0,
                            flexGrow: 0,
                            position: "relative",
                          }}
                        >
                          <Box
                            component="img"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              border: "1px solid #d3d3d3",
                            }}
                            src={previewImage}
                            alt="preview"
                          />
                        </Box>
                      </label>
                    </Box>
                  ) : (
                    <Box sx={{ padding: "10px" }}>
                      {bannerImage && !maxFileSizeErr && (
                        <label htmlFor="Banner Image">
                          <Box
                            sx={{
                              width: "100px",
                              height: "108px",
                              flex: "none",
                              order: 0,
                              flexGrow: 0,
                              position: "relative",
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                border: "1px solid #d3d3d3",
                              }}
                              alt="preview"
                              src={previewImage}
                            />
                          </Box>
                        </label>
                      )}
                    </Box>
                  )}

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
                        navigate("/manage-blogs");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isFileUploadFetching || isAddBlogFetching}
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Update
                      {isFileUploadFetching || isAddBlogFetching ? (
                        <CircularProgress size={24} sx={{ ml: 2 }} />
                      ) : (
                        <></>
                      )}
                    </Button>
                  </CardActions>
                </>
              ) : (
                <>
                  <CircularProgress sx={{ margin: "auto" }} />
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default EditBlog;
