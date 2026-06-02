import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SellIcon from "@mui/icons-material/Sell";
import StyleIcon from "@mui/icons-material/Style";
import LockResetIcon from "@mui/icons-material/LockReset";
import DomainIcon from "@mui/icons-material/Domain";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import "./App.css";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import { apiList, invokeApi } from "../../../../../apis/apiServices";
import { config } from "../../../../../config/config";

export default function PropertyListing({
  next,
  back,
  formData,
  updateFormData,
  detailsId,
}) {
  const [getPropertyType, setGetPropertyType] = useState([]);
  const propertyTypes = getPropertyType ?? [];
  const [propertyListingType, setPropertyListingType] = useState(
    formData.propertyListingType
  );

  const [buildingType, setBuildingType] = useState(formData.buildingType);
  const [propertiesType, setPropertiesType] = useState(formData.propertiesType);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies();

  const data1 = { propertyListingType, buildingType, propertiesType };

  const send = () => {
    updateFormData(data1);
  };

  const verifyPackageByListingType = async () => {
    setLoading(true);
    let params = { listingType: propertyListingType };
    try {
      const response = await invokeApi(
        config.apiDomains + apiList.verifyUserPackageByListingType,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseMessage === "Successful") {
          next();
          setLoading(false);
        } else {
          window.alert("No packages are found for this user ID");
          setLoading(false);
        }
      } else {
        window.alert(response.data.responseMessage);
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred while verifying packages:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getProperty = async () => {
      let params = {};
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getPropertyType,
          params,
          cookies
        );

        if (response.data.PropertyTypes) {
          setGetPropertyType(response.data.PropertyTypes);
        } else {
          console.error("No data in the response");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    getProperty();
  }, [cookies]);

  const propertyListing = [
    { element: "Sale", iconPath: <SellIcon sx={{ marginBottom: -1 }} /> },
    { element: "Rent", iconPath: <StyleIcon sx={{ marginBottom: -0.9 }} /> },
    {
      element: "Lease",
      iconPath: <LockResetIcon sx={{ marginBottom: -0.9 }} />,
    },
    {
      element: "Project",
      iconPath: <DomainIcon sx={{ marginBottom: -0.7 }} />,
    },
  ];

  return (
    <Box>
      <Typography sx={{ mb: 1 }}>
        <b>Property Listing For</b>
      </Typography>
      <Box
        className="mydict"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        {propertyListing.map((item) => (
          <label
            className="mydict1 border1"
            onChange={(event) => {
              setPropertyListingType(event.target.value);
            }}
            key={item.element}
          >
            <input
              type="radio"
              name="radio8"
              value={item.element}
              checked={propertyListingType === item.element}
              readOnly
            />
            <span className="border1">
              {item.iconPath} {item.element}
            </span>
          </label>
        ))}
      </Box>

      <Box sx={{ marginBottom: { md: 2 }, marginLeft: 0.5 }}>
        {propertyListingType === "Sale" && (
          <Box sx={{ ml: -0.6, pb: 2 }}>
            <Typography sx={{ mb: 1 }}>
              <b>Building Type</b>
            </Typography>
            <Box
              className="mydict"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                flexWrap: "wrap",
                mb: 2,
              }}
            >
              {propertyTypes.map((item) => (
                <label className="mydict1 border1" key={item.propertyType}>
                  <input
                    type="radio"
                    name="radio7"
                    value={item.propertyType}
                    onChange={(event) => {
                      setBuildingType(event.target.value);
                    }}
                    checked={buildingType === item.propertyType}
                    readOnly
                  />
                  <span className="border1">
                    <img
                      src={item.iconPath}
                      alt="icon"
                      width="20"
                      height="20"
                      style={{ marginRight: 8 }}
                    />
                    {item.propertyType}
                  </span>
                </label>
              ))}
            </Box>

            {buildingType && (
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>
                  <b>Property Type</b>
                </Typography>
                <Box
                  className="mydict"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {propertyTypes
                    .find((item) => item.propertyType === buildingType)
                    ?.propertySubTypes.sort(
                      (a, b) => a.propertyRankOrder - b.propertyRankOrder
                    ) // Sort by propertyRankOrder
                    .map((item) => (
                      <label className="mydict1 border1" key={uuidv4()}>
                        <input
                          type="radio"
                          name="propertySubType"
                          value={item.propertySubType}
                          onChange={(event) => {
                            setPropertiesType(event.target.value);
                          }}
                          checked={propertiesType === item.propertySubType}
                          readOnly
                        />
                        <span className="border1">
                          <img
                            src={item.iconPath}
                            alt="icon"
                            width="20"
                            height="20"
                            style={{ marginRight: 8, marginBottom: -4 }}
                          />
                          {item.propertySubType}
                        </span>
                      </label>
                    ))}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {loading && (
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            mt: "auto",
          }}
        >
          <CircularProgress sx={{ color: "black" }} />
        </Stack>
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
          <Button color="inherit" onClick={() => back()} disabled>
            Back
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              // verifyPackageByListingType();
              send();
              next();
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
              }}
            >
              update
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                next();
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
