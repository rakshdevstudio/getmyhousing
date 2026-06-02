import React, { useEffect, useState } from "react";
import BlogManagerTabs from "./BlogManagerTabs";
import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TextEditor from "./TextEditor";
import { useCookies } from "react-cookie";
import { generateSlug } from "../../common/common";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi, invokeFormDataApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AddBlog = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [isBlogCategory, setIsBlogCategory] = useState(false);
  const [isBlogSubCategory, setIsBlogSubCategory] = useState(false);
  const [isBlogCategoryListModal, setIsBlogCategoryListModal] = useState(false);
  const [blogTittle, setBlogTittle] = useState("");
  const [slug, setSlug] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImageUrl, setBannerImageUrl] = useState(null);
  const [bannerImageUploadStatus, setBannerImageUploadStatus] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [maxFileSizeErr, setMaxFileSizeErr] = useState("");
  const [isFileUploadFetching, setIsFileUploadFetching] = useState(false);
  const [isAddBlogFetching, setIsAddBlogFetching] = useState(false);

  const [blogCategoriesData, setBlogCategoriesData] = useState(null);
  const [blogCategorie, setBlogCategorie] = useState("");
  const [blogCategorieId, setBlogCategorieId] = useState(null);

  const [blogSubCategory, setBlogSubCategory] = useState(null);
  const [blogSubCategoryId, setBlogSubCategoryId] = useState(null);

  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState(false);
  const [categoryFetching, setCategoryFetching] = useState(false);
  const [isBlogCategoriesFetching, setIsBlogCategoriesFetching] =
    useState(true);

  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [categoryDisable, setCategoryDisable] = useState(false);

  const [slugError, setSlugError] = useState(false);
  const [slugHelperText, setSlugHelperText] = useState("");

  const [subCategoryError, setSubCategoryError] = useState(false);
  const [subCategoryHelperText, setsubCategoryHelperText] = useState("");

  const [blogTitleError, setBlogTitleError] = useState(false);
  const [blogTitleHelperText, setBlogTitleHelperText] = useState("");

  const [blogContentError, setBlogContentError] = useState(false);
  const [blogContentHelperText, setBlogContentHelperText] = useState("");

  const [metaTitleError, setMetaTitleError] = useState(false);
  const [metaTitleHelperText, setMetaTitleHelperText] = useState("");

  const [metaDescriptionError, setMetaDescriptionError] = useState(false);
  const [metaDescriptionHelperText, setMetaDescriptionHelperText] =
    useState("");

  const [categoryError, setCategoryError] = useState(false);
  const [categoryHelperText, setCategoryHelperText] = useState("");

  const [keywordsError, setKeywordsError] = useState(false);
  const [keywordsHelperText, setKeywordsHelperText] = useState("");

  const updateSlug = (title) => {
    const generatedSlug = generateSlug(title);
    setSlug(generatedSlug);
  };

  //get getBlogCategoriesHierarchy
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
          setIsBlogCategoriesFetching(false);
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
    if (isBlogCategoriesFetching) {
      getBlogCategoriesHierarchy();
    }
  }, [cookies, isBlogCategoriesFetching]);

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

  //file upload
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

  // handle submit
  const handleSubmit = async () => {
    const blogValid = blogValidation();
    if (blogValid) {
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
    }
  };

  //add blog
  useEffect(() => {
    const addBlog = async () => {
      setIsAddBlogFetching(true);
      let params = {
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
        config.apiDomains + apiList.addBlog,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          navigate("/blog-list");
        } else {
          alert(
            "Something went wrong while adding the blog. Please try again later!"
          );
        }
      } else {
        alert(
          "Something went wrong while adding the blog. Please try again later!!"
        );
      }
    };

    if (bannerImageUploadStatus) {
      addBlog();
      setBannerImageUploadStatus(false);
    }
  }, [
    bannerImageUploadStatus,
    blogCategorieId,
    blogSubCategoryId,
    blogTittle,
    blogContent,
    metaTitle,
    keywords,
    slug,
    bannerImageUrl,
    cookies,
    metaDescription,
    navigate,
  ]);

  //Add Category
  const addBlogCategory = async () => {
    if (categoryName.trim() !== "") {
      setCategoryFetching(true);
      let params = {
        category: categoryName,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.addBlogCategory,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          toast.success("Category added successfully");
          setCategoryFetching(false);
          setIsBlogCategoriesFetching(true);
          setIsBlogCategory(false);
          setCategoryName("");
          setCategoryError(false);
          setCategoryHelperText("");
        } else {
          alert(
            "Something went wrong while adding the category. Please try again later!"
          );
          setCategoryFetching(false);
        }
      } else {
        alert(
          "Something went wrong while adding the category. Please try again later!!"
        );
        setCategoryFetching(false);
      }
    } else {
      setCategoryError(true);
      setCategoryHelperText("Please enter the category");
      setCategoryFetching(false);
    }
  };

  //update Category
  const updateBlogCategory = async () => {
    if (categoryName.trim() !== "") {
      setCategoryFetching(true);
      let params = {
        id: categoryId,
        category: categoryName,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.updateBlogCategory,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          toast.success("Category updated successfully");
          setCategoryFetching(false);
          setIsBlogCategoriesFetching(true);
          setIsBlogCategory(false);
          setCategoryName("");
        } else {
          alert(
            "Something went wrong while adding the category. Please try again later!"
          );
        }
      } else {
        alert(
          "Something went wrong while adding the category. Please try again later!!"
        );
      }
    } else {
      setCategoryError(true);
      setCategoryHelperText("Please enter the category");
    }
  };

  //delete the blog category
  const deleteBlogCategory = async (id) => {
    let params = {
      id: id,
      status: "Deleted",
    };
    let response = await invokeApi(
      config.apiDomains + apiList.updateBlogCategory,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success("Category deleted successfully");
        setCategoryFetching(false);
        setIsBlogCategoriesFetching(true);
        setIsBlogCategory(false);
        setCategoryName("");
      } else {
        alert(
          "Something went wrong while deleting the category. Please try again later!"
        );
      }
    } else {
      alert(
        "Something went wrong while deleting the category. Please try again later!!"
      );
    }
  };

  //Add Subcategory
  const addBlogSubCategory = async () => {
    if (subCategoryName.trim() !== "" && categoryName !== "") {
      setCategoryFetching(true);
      let params = {
        categoryId: categoryId,
        subCategory: subCategoryName,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.addBlogSubCategory,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          toast.success("Subcategory added successfully");
          setCategoryFetching(false);
          setIsBlogCategoriesFetching(true);
          setIsBlogSubCategory(false);
          setSubCategoryError(false);
          setCategoryError(false);
          setCategoryHelperText("");
          setsubCategoryHelperText("");
          setCategoryName("");
          setSubCategoryName("");
        } else {
          alert(
            "Something went wrong while adding the category. Please try again later!"
          );
        }
      } else {
        alert(
          "Something went wrong while adding the category. Please try again later!!"
        );
      }
    } else if (subCategoryName.trim() === "" || categoryName === "") {
      if (subCategoryName.trim() === "") {
        setSubCategoryError(true);
        setsubCategoryHelperText("Please enter the Subcategory");
      } else {
        setCategoryError(true);
        setCategoryHelperText("Please select the category");
      }
    }
    // else if (categoryName !== "") {
    //   setCategoryError(true);
    //   setCategoryHelperText("Please select the category");
    // }
  };

  //Update Blog Subcategory
  const updateBlogSubCategory = async () => {
    if (subCategoryName.trim() !== "") {
      let params = {
        id: subCategoryId,
        categoryId: categoryId,
        subCategory: subCategoryName,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.updateBlogSubCategory,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          toast.success("Subcategory updated successfully");
          setCategoryFetching(false);
          setIsBlogCategoriesFetching(true);
          setIsBlogSubCategory(false);
          setSubCategoryError(false);
          setCategoryError(false);
          setCategoryHelperText("");
          setsubCategoryHelperText("");
          setCategoryName("");
          setSubCategoryName("");
        } else {
          alert(
            "Something went wrong while updating the category. Please try again later!"
          );
          setCategoryFetching(false);
          setIsBlogSubCategory(false);
        }
      } else {
        alert(
          "Something went wrong while updating the category. Please try again later!!"
        );
        setCategoryFetching(false);
        setIsBlogSubCategory(false);
      }
    } else {
      setSubCategoryError(true);
      setsubCategoryHelperText("Please enter the Subcategory");
    }
  };

  //delete Blog Subcategory
  const deleteBlogSubCategory = async (subId, id) => {
    let params = {
      id: subId,
      categoryId: id,
      status: "Deleted",
    };
    let response = await invokeApi(
      config.apiDomains + apiList.updateBlogSubCategory,
      params,
      cookies
    );
    if (response.status >= 200 && response.status < 300) {
      if (response.data.responseCode === "200") {
        toast.success("Subcategory deleted successfully");
        setCategoryFetching(false);
        setIsBlogCategoriesFetching(true);
        setIsBlogSubCategory(false);
        setSubCategoryError(false);
        setCategoryError(false);
        setCategoryHelperText("");
        setsubCategoryHelperText("");
        setCategoryName("");
        setSubCategoryName("");
      } else {
        alert(
          "Something went wrong while deleting the category. Please try again later!"
        );
        setCategoryFetching(false);
        setIsBlogSubCategory(false);
      }
    } else {
      alert(
        "Something went wrong while deleting the category. Please try again later!!"
      );
      setCategoryFetching(false);
      setIsBlogSubCategory(false);
    }
  };

  return (
    <>
      <BlogManagerTabs tabActive={0}>
        <Box sx={{ width: "100%" }}>
          <Button
            variant="contained"
            onClick={() => {
              setIsBlogCategory(true);
              setEditCategoryName(false);
              setCategoryName("");
            }}
          >
            Add New Category
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsBlogSubCategory(true);
              setCategoryDisable(false);
              setCategoryName("");
              setSubCategoryName("");
            }}
          >
            Add New Sub-Category
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsBlogCategoryListModal(true);
            }}
          >
            View Category / Sub-Category
          </Button>
        </Box>
        <Paper sx={{ mt: 2, p: 3 }}>
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
            onEditorChange={(html) => {
              setBlogContent(html);
              setBlogContentError(false);
              setBlogContentHelperText("");
            }}
            initialValue={blogContent}
          />
          {blogContentError && (
            <Typography sx={{ fontSize: "13px", color: "red" }}>
              {blogContentHelperText}
            </Typography>
          )}
          <br></br>
          <TextField
            id="slug"
            label="Slug *"
            value={slug}
            variant="standard"
            disabled
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
            error={keywordsError}
            helperText={keywordsHelperText}
          />
          <Box>
            <FormControl variant="standard" sx={{ width: "200px" }}>
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
              <FormHelperText error>{categoryHelperText}</FormHelperText>
            </FormControl>
          </Box>

          {blogCategoriesData?.map((el) =>
            el.category === blogCategorie && el.subCategories ? (
              <FormControl
                key={el.id}
                variant="standard"
                sx={{ width: "200px" }}
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
            ) : null
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              id="to-let-board-photo"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            {(!bannerImage && !maxFileSizeErr) || maxFileSizeErr ? (
              <Box
                component="label"
                htmlFor="to-let-board-photo"
                sx={{
                  cursor: "pointer",
                  border: "2px dotted #000",
                  width: "100%",
                  minHeight: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.5s",
                  "&:hover": {
                    border: "2px dotted #3498db",
                    color: "#3498db",
                  },
                }}
              >
                {maxFileSizeErr
                  ? maxFileSizeErr
                  : "Click Here To Upload Blog Image"}
              </Box>
            ) : (
              <label htmlFor="to-let-board-photo" style={{ cursor: "pointer" }}>
                <Box
                  component="img"
                  src={previewImage}
                  alt="To-Let"
                  sx={{
                    width: 200,
                    height: "auto",
                    objectFit: "cover",
                    boxShadow: "0px 5px 25px rgba(42, 48, 55, 0.12)",
                    mt: 2,
                    borderRadius: 8,
                  }}
                />
              </label>
            )}
          </Box>

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
              Submit
              {isFileUploadFetching || isAddBlogFetching ? (
                <CircularProgress size={24} sx={{ ml: 2 }} />
              ) : (
                <></>
              )}
            </Button>
          </CardActions>
        </Paper>
      </BlogManagerTabs>

      {/* below the dialog modal is for add category  */}
      <Dialog
        open={isBlogCategory}
        onClose={() => {
          setIsBlogCategory(false);
          setIsBlogCategory(false);
          setCategoryError(false);
          setCategoryHelperText("");
          setCategoryName("");
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Category
        </DialogTitle>
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          color="inherit"
          onClick={() => {
            setIsBlogCategory(false);
            setCategoryError(false);
            setCategoryHelperText("");
            setCategoryName("");
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            id="categoryName"
            label="Category Name *"
            value={categoryName}
            variant="standard"
            sx={{ mb: 2 }}
            fullWidth
            onChange={(ev) => {
              setCategoryName(ev.target.value);
              setCategoryError(false);
              setCategoryHelperText("");
            }}
            inputProps={{ maxLength: 60 }}
            error={categoryError}
            helperText={categoryHelperText}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsBlogCategory(false);
              setCategoryError(false);
              setCategoryHelperText("");
              setCategoryName("");
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            disabled={categoryFetching}
            onClick={() => {
              if (editCategoryName) {
                updateBlogCategory();
              } else {
                addBlogCategory();
              }
            }}
          >
            Save changes
            {categoryFetching ? (
              <CircularProgress size={24} sx={{ ml: 2 }} />
            ) : (
              <></>
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* below the dialog modal is for add sub-category  */}
      <Dialog
        open={isBlogSubCategory}
        onClose={() => setIsBlogSubCategory(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Sub-Category
        </DialogTitle>
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          color="inherit"
          onClick={() => setIsBlogSubCategory(false)}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <FormControl variant="standard" sx={{ mt: 2 }}>
            <InputLabel>Category Name *</InputLabel>
            <Select
              label="Categorie"
              value={categoryName}
              onChange={(ev) => {
                setCategoryName(ev.target.value);
                setCategoryError(false);
                setCategoryHelperText("");
              }}
              sx={{ width: "200px" }}
              error={categoryError}
              disabled={categoryDisable}
            >
              { }
              {blogCategoriesData?.map((el) => (
                <MenuItem
                  key={el.id}
                  value={el.category}
                  onClick={() => {
                    setCategoryId(el.id);
                  }}
                >
                  {" "}
                  {el.category}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>{categoryHelperText}</FormHelperText>
          </FormControl>
          <TextField
            id="subCategoryName"
            label="Subcategory Name *"
            value={subCategoryName}
            variant="standard"
            sx={{ mb: 2 }}
            fullWidth
            onChange={(ev) => {
              setSubCategoryName(ev.target.value);
              setSubCategoryError(false);
              setsubCategoryHelperText("");
            }}
            inputProps={{ maxLength: 60 }}
            error={subCategoryError}
            helperText={subCategoryHelperText}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsBlogSubCategory(false);
              setSubCategoryError(false);
              setsubCategoryHelperText("");
              setCategoryError(false);
              setCategoryHelperText("");
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            disabled={categoryFetching}
            onClick={() => {
              if (categoryDisable) {
                updateBlogSubCategory();
              } else {
                addBlogSubCategory();
              }
            }}
          >
            Save changes
            {categoryFetching ? (
              <CircularProgress size={24} sx={{ ml: 2 }} />
            ) : (
              <></>
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* below the dialog modal is for show category and subcategory  */}
      <Dialog
        open={isBlogCategoryListModal}
        onClose={() => {
          setIsBlogCategoryListModal(false);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Category / Sub-Category
        </DialogTitle>
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          color="inherit"
          onClick={() => {
            setIsBlogCategoryListModal(false);
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {!isBlogCategoriesFetching ? (
            <>
              {blogCategoriesData?.length > 0 ? (
                <>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <Typography variant="bodybold">Category</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="bodybold">Action</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <TableRow>
                              <Typography
                                variant="bodybold"
                                sx={{ marginLeft: "15px" }}
                              >
                                Sub Category
                              </Typography>

                              <Typography
                                variant="bodybold"
                                sx={{ marginLeft: "100px" }}
                              >
                                Action
                              </Typography>
                            </TableRow>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {blogCategoriesData.map((el) => (
                          <TableRow key={el.id}>
                              <TableCell align="center">
                                {el.category}
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => {
                                    setEditCategoryName(true);
                                    setCategoryName(el.category);
                                    setCategoryId(el.id);
                                    setIsBlogCategory(true);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>

                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => {
                                    alert(
                                      "Are you sure you want to delete the category?"
                                    );
                                    deleteBlogCategory(el.id);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>

                              <TableCell align="center">
                                {el.subCategories?.map((e) => (
                                  <TableRow key={e.id}>
                                    <TableCell
                                      align="center"
                                    //sx={{ marginLeft: "110px" }}
                                    >
                                      {e.subCategory}
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{ marginLeft: "100px" }}
                                    >
                                      <IconButton
                                        size="small"
                                        color="success"
                                        onClick={() => {
                                          setCategoryDisable(true);
                                          setSubCategoryId(e.id);
                                          setCategoryName(el.category);
                                          setCategoryId(el.id);
                                          setSubCategoryName(e.subCategory);
                                          setIsBlogSubCategory(true);
                                        }}
                                      >
                                        <EditIcon />
                                      </IconButton>

                                      <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => {
                                          alert(
                                            "Are you sure you want to delete the subcategory?"
                                          );
                                          deleteBlogSubCategory(e.id, el.id);
                                        }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
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
            <>
              <CircularProgress sx={{ margin: "auto" }} />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsBlogCategoryListModal(false);
              setCategoryName("");
              setCategoryId("");
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            disabled={categoryFetching}
            onClick={() => {
              setIsBlogCategoryListModal(false);
              setIsBlogCategory(true);
            }}
          >
            Add Category
          </Button>
          <Button
            autoFocus
            disabled={categoryFetching}
            onClick={() => {
              setIsBlogCategoryListModal(false);
              setIsBlogSubCategory(true);
            }}
          >
            Add Sub-Category
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddBlog;
