import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  TextField,
  styled,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiList, invokeFormDataApi } from "../../../../../apis/apiServices";
import { config } from "../../../../../config/config";
import { useCookies } from "react-cookie";
import "./App.css";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const StyledInput = styled("input")({
  display: "none",
});

const UploadBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  border: "2px dashed #ccc",
  borderRadius: "10px",
  backgroundColor: "#fafafa",
  cursor: "pointer",
  "&:hover": {
    borderColor: "#888",
  },
});

const ImagePreview = styled("img")({
  marginTop: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
});

function ImageUploader({ next, back, formData, updateFormData, detailsId }) {
  const [cookies] = useCookies();
  const [featuredImageUrl, setfeaturedImageUrl] = useState(
    formData.featuredImageUrl
  );
  const [galleryImageUrl, setgalleryImageUrl] = useState(
    formData.galleryImageUrl
  );
  const [allImages, setAllImages] = useState(formData.allImages);

  const [loading, setloading] = useState(false);

  const [featureImageHelperText, setFeatureImageHelperText] = useState("");
  const [featureImageError, setFeatureImageError] = useState(false);

  const [videoUrl, setVideoUrl] = useState(formData.videoUrl);
  const [videoLink, setvideoLink] = useState(formData.videoLink);

  function handleYoutubeLink(e) {
    const value = e.target.value;
    if (value) {
      let videoId = "";

      // Check if the URL is a regular YouTube URL
      if (value.includes("youtube.com/watch?v=")) {
        videoId = value.split("v=")[1]?.split("&")[0];
      }
      // Check if the URL is a YouTube Shorts URL
      else if (value.includes("youtube.com/shorts/")) {
        videoId = value.split("shorts/")[1]?.split("?")[0];
      }

      // If a video ID was found, set the embed URL
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        setvideoLink(embedUrl);
      } else {
        setvideoLink("");
      }
    } else {
      setvideoLink("");
    }
  }

  const data6 = {
    allImages,
    featuredImageUrl,
    galleryImageUrl,
    videoUrl,
    videoLink,
  };
  const imageComressor = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 250 * 250;
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
              const compressedFile = new File([blob], imageFile.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            "image/jpeg",
            0.8
          );
        };
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const uploadImageGetPath = async (file, type) => {
    setloading(true);
    try {
      let propertyImages = new FormData();
      propertyImages.append("file", file);
      propertyImages.append("path", "property_gallery");

      let response = await invokeFormDataApi(
        config.apiDomains + apiList.uploadFile,
        propertyImages,
        cookies
      );

      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          if (type === "Single Image") {
            setfeaturedImageUrl([
              {
                id: formData.featuredImageId,
                imagePath: response.data.url,
                imageType: "featured",
                status: "Active",
              },
            ]);
            setloading(false);
          } else if (type === "Multiple Images") {
            setgalleryImageUrl((prevImages) => [
              ...prevImages,
              {
                imagePath: response.data.url,
                imageType: "gallery",
              },
            ]);
            setloading(false);
          }
        } else {
          return { success: false };
        }
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error while uploading college logo:", error);
      return { success: false };
    }
    setloading(false);
  };

  useEffect(() => {
    const combinedImages = featuredImageUrl.concat(galleryImageUrl);
    setAllImages(combinedImages);
  }, [featuredImageUrl, galleryImageUrl]);

  const handleFeaturedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImageGetPath(file, "Single Image");
    }
  };

  const handleGalleryImages = async (e) => {
    const files = Array.from(e.target.files);

    // Iterate through each file
    for (const file of files) {
      const compressedFile = await imageComressor(file);
      await uploadImageGetPath(compressedFile, "Multiple Images");
    }
  };

  const handleDeleteImage = (index) => {
    const updatedSelectedImages = [...galleryImageUrl];

    if (index >= 0 && index <= updatedSelectedImages.length) {
      const previousImage = updatedSelectedImages[index - 1];
      if (previousImage && "status" in previousImage) {
        previousImage.status = "Deleted";
      } else if (
        featuredImageUrl.length === 0 &&
        !updatedSelectedImages.every((image) => "status" in image)
      ) {
        updatedSelectedImages.splice(index, 1);
      } else if (
        featuredImageUrl.length !== 0 &&
        !updatedSelectedImages.every((image) => "status" in image)
      ) {
        updatedSelectedImages.splice(index - 1, 1);
      }

      setgalleryImageUrl(updatedSelectedImages);
    }
  };

  const send = () => {
    updateFormData(data6);
  };

  function validateTab() {
    if (featuredImageUrl.length > 0) {
      next();
      send();
    } else {
      setFeatureImageError(true);
      setFeatureImageHelperText("Please upload Feature Image");
    }
  }
  return (
    <>
      <Box>
        <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 2 }}>
          Featured Image
        </Typography>
        <Box sx={{ maxWidth: 400 }}>
          <UploadBox>
            <StyledInput
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={handleFeaturedImage}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
              <Typography variant="body1" color="textSecondary">
                Click to upload Main Image
              </Typography>
            </label>
          </UploadBox>
          {featuredImageUrl[0] && (
            <ImagePreview
              src={featuredImageUrl[0].imagePath}
              alt="Cropped Image"
              width="100%"
              height="auto"
            />
          )}
        </Box>
        <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 2, mt: 2 }}>
          {" "}
          Gallery Images
        </Typography>
        <Box>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryImages}
          />
        </Box>

        <Box
          className="cropped-images"
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          {allImages.map((image, index) => {
            if (
              image.imageType === "gallery" &&
              (image.status === "Active" || !image.status)
            ) {
              return (
                <Box
                  key={index}
                  className="image-container"
                  sx={{
                    position: "relative",
                    margin: "10px",
                    boxShadow: "0 0 3px black",
                  }}
                >
                  <DeleteIcon
                    onClick={() => handleDeleteImage(index)}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  />

                  <img
                    style={{ width: 200, height: 200 }}
                    src={image.imagePath}
                    alt={`Cropped Image ${index + 1}`}
                  />
                </Box>
              );
            }
            return null;
          })}
        </Box>
        <Box>
          <TextField
            label="Youtube Link"
            id="demo-simple-select"
            onChange={handleYoutubeLink}
            size="small"
            value={videoLink}
          />
          {videoLink && (
            <div style={{ maxWidth: "800px", margin: "20px 0" }}>
              <iframe
                width="100%"
                height="400"
                src={videoLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </Box>

        {featureImageError && (
          <Box
            sx={{
              width: "80%",
              backgroundColor: "#ff7675",
              py: 2,
              mx: "auto",
              borderRadius: "20px",
              border: "1px solid #000",
              textAlign: "center",
            }}
          >
            {featureImageHelperText}
          </Box>
        )}

        {!detailsId && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              pt: 2,
            }}
          >
            <Button
              color="inherit"
              onClick={() => {
                back();
                send();
              }}
            >
              Back
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                validateTab();
              }}
            >
              Next
            </Button>
          </Box>
        )}
        {detailsId && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              pt: 2,
            }}
          >
            <Button
              color="inherit"
              onClick={() => {
                back();
              }}
            >
              Back
            </Button>
            <Box>
              <Button
                color="inherit"
                onClick={() => {
                  validateTab();
                }}
              >
                update
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {loading && (
        <Box className="backdrop">
          <Box>
            <Typography variant="h6">Uploading...</Typography>
            <CircularProgress sx={{ color: "black" }} />
          </Box>
        </Box>
      )}
    </>
  );
}

export default ImageUploader;
