import React, { useState } from "react";
import { Typography, Button, TextField, IconButton } from "@mui/material";
import "./Commercial.css";
import { Box, Grid } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import TextEditor from "./TextEditor";
import { apiList, invokeFormDataApi } from "../../../../../apis/apiServices";
import { config } from "../../../../../config/config";
import {
  definelocation,
  definesizestructure,
  explainingprice,
  explainingtheproperty,
} from "../../../../../common/common";

const DefineYourProperty = ({
  next,
  back,
  formData,
  updateFormData,
  detailsId,
}) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [summaryImage, setSummaryImage] = useState(null);
  const [summaryImageUrl, setSummaryImageUrl] = useState(null);
  const [insitialvalue, setInsitialvalue] = useState("");
  //Validation
  const validateSummaryImageUpload = async (ev) => {
    const fileUploaded = ev.target.files[0];
    if (fileUploaded) {
      // Check if the file format is supported
      const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
      if (supportedFormats.includes(fileUploaded.type)) {
        if (fileUploaded.size > 512 * 512) {
          try {
            const compressedFile = await compressSummaryImageUpload(
              fileUploaded
            );
            setSummaryImage(compressedFile);
            // setPreviewCollegeLogo(URL.createObjectURL(compressedFile));
            const uploadResult = await SummaryImageUpload(compressedFile);
            if (uploadResult.success) {
              setSummaryImageUrl(uploadResult.url);
            } else {
              alert(
                "Something went wrong while uploading Summary Image. Please try again later!"
              );
            }
          } catch (error) {
            console.error(
              "Error while processing and uploading the image:",
              error
            );
            alert(
              "Something went wrong while processing the image. Please try again later!"
            );
          }
        } else {
          // setPreviewCollegeLogo(URL.createObjectURL(fileUploaded));
          setSummaryImage(fileUploaded);
          const uploadResult = await SummaryImageUpload(fileUploaded);
          if (uploadResult.success) {
            setSummaryImageUrl(uploadResult.url);
          } else {
            alert(
              "Something went wrong while uploading Summary Image. Please try again later!"
            );
          }
        }
      } else {
        alert("Please upload a valid image in jpeg/jpg/png/gif format.");
      }
    }
  };

  // college logo compress
  const compressSummaryImageUpload = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 512 * 512;
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

  // college logo uploading getting path
  const SummaryImageUpload = async (file) => {
    try {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("path", "Summary_Images");

      let response = await invokeFormDataApi(
        config.apiDomains + apiList.uploadFile,
        formData,
        cookies
      );

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          return { success: true, url: response.data.url };
        } else {
          return { success: false };
        }
      } else if (response?.status === 401) {
        navigate("/logout");
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error while uploading college logo:", error);
      return { success: false };
    }
  };
  const [defineLocation, setdefineLocation] = useState(formData.defineLocation);
  const [explainingPrice, setexplainingPrice] = useState(
    formData.explainingPrice
  );
  const [explainingTheProperty, setexplainingTheProperty] = useState(
    formData.explainingTheProperty
  );
  const [defineSizeStructure, setdefineSizeStructure] = useState(
    formData.defineSizeStructure
  );

  const [description, setDescription] = useState(formData.description);

  const data5 = {
    defineLocation,
    explainingPrice,
    explainingTheProperty,
    defineSizeStructure,
    description,
  };

  const send = () => {
    updateFormData(data5);
  };

  return (
    <Box sx={{ mt: 5, mb: 5,ml:{xs:2, md:0} }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          sx={{
            marginBottom: 3,
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          Please choose the keywords that define your property clearly
        </Typography>
        <Grid container sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Grid
              item
              md={12}             
            >
              <Typography
                sx={{fontSize: "18px", fontWeight: 600, mb:2 }}
              >
                <b>
                  1: <span>Define Location</span>
                </b>
              </Typography>
            </Grid>
            <Grid
              item
              className="mydict"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                flexWrap: "wrap",
              }}
            >
              {definelocation.map((item) => (
                <label
                  className="mydict1 border1"
                  key={item}
                  style={{ marginRight: "15px", marginBottom: "25px" }}
                >
                  <input
                    type="checkbox"
                    name={item}
                    value={item}
                    checked={defineLocation.includes(item)}
                    onChange={(event) => {
                      const { value, checked } = event.target;
                      if (checked) {
                        setdefineLocation([...defineLocation, value]);
                      } else {
                        setdefineLocation(
                          defineLocation.filter((item) => item !== value)
                        );
                      }
                    }}
                  />
                  <span
                    className="border1"
                    style={{ fontFamily: "Mulish, sans-serif" }}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",     
            }}
          >
            <Grid
              item
              md={12} 
            >
              <Typography
                sx={{
                 
                  fontSize: { md: "18px" },
                  fontWeight: 600,
                  mb:2
                }}
              >
                <b>
                  2: <span>Explaining Price</span>
                </b>
              </Typography>
            </Grid>
            <Grid
              item
              className="mydict"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                flexWrap: "wrap",
               
              }}
            >
              {explainingprice.map((item) => (
                <label
                  className="mydict1 border1"
                  key={item}
                  style={{ marginRight: "15px", marginBottom: "25px" }}
                >
                  <input
                    type="checkbox"
                    name="202"
                    value={item}
                    checked={explainingPrice.includes(item)}
                    onChange={(event) => {
                      const { value, checked } = event.target;
                      if (checked) {
                        setexplainingPrice([...explainingPrice, value]);
                      } else {
                        setexplainingPrice(
                          explainingPrice.filter((item) => item !== value)
                        );
                      }
                    }}
                  />
                  <span
                    className="border1"
                    style={{ fontFamily: "Mulish, sans-serif" }}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              
            }}
          >
            <Grid
              item
              md={12}
              
            >
              <Typography
                sx={{
                  
                  fontSize: { md: "18px" },
                  fontWeight: 600,
                  mb:2,
                  display:"flex",textWrap:"nowrap"
                }}
              >
                <b>
                  3: <span>Explaining the Property</span>
                </b>
              </Typography>
            </Grid>
            <Grid
              item
              className="mydict"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                flexWrap: "wrap",
               
              }}
            >
              {explainingtheproperty.map((item) => (
                <label
                  className="mydict1 border1"
                  key={item}
                  style={{ marginRight: "15px", marginBottom: "25px" }}
                >
                  <input
                    type="checkbox"
                    name="203"
                    value={item}
                    checked={explainingTheProperty.includes(item)}
                    onChange={(event) => {
                      const { value, checked } = event.target;
                      if (checked) {
                        setexplainingTheProperty([
                          ...explainingTheProperty,
                          value,
                        ]);
                      } else {
                        setexplainingTheProperty(
                          explainingTheProperty.filter((item) => item !== value)
                        );
                      }
                    }}
                  />
                  <span
                    className="border1"
                    style={{ fontFamily: "Mulish, sans-serif" }}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Grid
              item
              md={12}
            >
              <Typography
                sx={{
                  fontSize: { md: "18px" },
                  fontWeight: 600,
                  mb:2,
                  display:"flex",textWrap:"nowrap"
                }}
              >
                <b>
                  4: <span>Define Size & Structure</span>
                </b>
              </Typography>
            </Grid>
            <Grid
              item
              className="mydict"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                flexWrap: "wrap",
              }}
            >
              {definesizestructure?.map((item) => (
                <label
                  className="mydict1 border1"
                  key={item}
                  style={{ marginRight: "15px", marginBottom: "25px" }}
                >
                  <input
                    type="checkbox"
                    name="204"
                    value={item}
                    checked={defineSizeStructure.includes(item)}
                    onChange={(event) => {
                      const { value, checked } = event.target;
                      if (checked) {
                        setdefineSizeStructure([...defineSizeStructure, value]);
                      } else {
                        setdefineSizeStructure(
                          defineSizeStructure.filter((item) => item !== value)
                        );
                      }
                    }}
                  />
                  <span
                    className="border1"
                    style={{ fontFamily: "Mulish, sans-serif" }}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
             
            }}
          >
            <Grid
              item   
            >
              <Typography
                sx={{
                  marginBottom: 1,
                  fontSize: { md: "18px" },
                  fontWeight: 600,               
                }}
              >
                <b>
                  5: <span>Description</span>
                </b>
              </Typography>
              <Typography
                sx={{             
                  fontSize: "110%",
                  mb:2
                }}
              >
                Please write a detailed description about property so clients
                can understand property better or generate using our AI tool
              </Typography>
            </Grid>
            <Grid item>
              {summaryImage ? (
                <>
                  <input
                    type="text"
                    value={summaryImageUrl}
                    sx={{ width: "100px" }}
                    disabled
                  />
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(summaryImageUrl);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSummaryImageUrl(null);
                      setSummaryImage(null);
                    }}
                  >
                    <RestartAltIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <TextField
                    id="file-upload"
                    type="file"
                    accept=".png, .jpg, .jpeg, .webp"
                    onChange={validateSummaryImageUpload}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </Grid>
            <TextEditor
              onEditorChange={(content) => setDescription(content)}
              initialValue={description}
            />
          </Grid>
        </Grid>
      </Box>
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
              next();
              send();
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
                send();
                next();
              }}
            >
              update
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DefineYourProperty;
