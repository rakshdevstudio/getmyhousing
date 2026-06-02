import React, { useState } from "react";
import { apiList, invokeApi } from "../../../../apis/apiServices";
import { config } from "../../../../config/config";
import { useCookies } from "react-cookie";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ExclusiveButton = ({ value, propertyId }) => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [exclusive, setExclusive] = useState(value);

  // exclusive property
  const changeExclusiveProperty = async (propertyId, newStatus) => {
    let validate = true;
    if (!propertyId) {
      alert("Something went wrong please reload page and try again");
      validate = false;
    }
    if (validate) {
      let params = {
        id: propertyId,
        isExclusiveProperty: newStatus,
      };
      let response = await invokeApi(
        config.apiDomains + apiList.updateExclusivePropertyStatus,
        params,
        cookies
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.responseCode === "200") {
          toast.success(`Successfully Changed the property Exclusive Status`, {
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
        } else {
          alert(
            "Something went wrong while adding the category. Please try again later!"
          );
        }
      } else if (response.status === 401) {
        navigate("/logout");
      } else if (response.status === 404) {
        toast.info(`Something went wrong please reload page and try again`, {
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
      } else {
        alert(
          "Something went wrong while adding the category. Please try again later!!"
        );
      }
    }
  };

  const handleToggle = async (prevStatus, propertyId) => {
    const newStatus = !prevStatus;
    setExclusive(newStatus);
    changeExclusiveProperty(propertyId, newStatus);
  };
  return (
    <>
      <Button
        onClick={() => handleToggle(exclusive, propertyId)}
        size="small"
        variant="contained"
      >
        {exclusive ? "Set as Not Exclusive" : "Set as Exclusive"}
      </Button>
    </>
  );
};

export default ExclusiveButton;
