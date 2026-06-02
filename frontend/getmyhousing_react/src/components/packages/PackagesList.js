import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../apis/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import PackagesTabs from "./PackagesTabs";
import { Bounce, toast } from "react-toastify";

function PackagesList() {
  const [cookies] = useCookies();

  const [datas, setdatas] = useState([]);
  const [loading, setloading] = useState(true);

  const handleDeleteClick = (id) => {
    const confirmDeletion = window.confirm(
      `Do you want to delete the item with ID: ${id}?`
    );

    if (confirmDeletion) {
      deletePackage(id);
    }
  };

  const handleEditClick = (getId) => {
    const confirmEdit = window.confirm(
      `Do you want to edit the item with ID: ${getId}?`
    );
    if (confirmEdit) {
      //`id` is the variable containing the ID
      navigate(`/update-package/${getId}`);
    } else {
      alert("Failed to edit this record");
    }
  };

  const deletePackage = async (id) => {
    let params = { id: id };
    try {
      const response = await invokeApi(
        config.apiDomains + apiList.deletePackage,
        params,
        cookies
      );
      if (response) {
        if (
          response.status === "200" ||
          response.data.responseMessage === "Successful"
        ) {
          toast.success("Deleted Record Successfully!", {
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
          toast.error("Failed to delete this Record!", {
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
        }
      }
    } catch (error) {
      toast.error("Error deleting the item!", {
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
    }
  };

  useEffect(() => {
    const getPackages = async () => {
      let params = {};
      try {
        const response = await invokeApi(
          config.apiDomains + apiList.getPackages,
          params,
          cookies
        );
        if (response) {
          setdatas(response.data.packages);
        } else {
          console.error("No countries data in the response");
        }
      } catch (error) {
        console.error("An error occurred while fetching location:", error);
      }
    };
    if (loading) {
      getPackages();
      setloading(false);
    }
  }, [loading]);

  const navigate = useNavigate();

  return (
    <>
      <PackagesTabs tabActive={1}>
        {loading && (
          <Stack sx={{ display: "flex", alignItems: "center", mb: 5 }}>
            <CircularProgress sx={{ color: "black" }} />
          </Stack>
        )}
        <TableContainer component={Paper} sx={{ mb: 2.1 }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#e7e7e7", color: "#fff" }}>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  Package Name
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  Package For
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  Listing Type
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  Duration In Days
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  No Of Listings
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  id
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "3px solid #454545",
                    fontSize: "16px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas?.map(
                (items) =>
                  items.status === "Active" && (
                    <TableRow key={items.id}>
                      <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                        {items.packageName}
                      </TableCell>
                      <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                        {items.packageFor}
                      </TableCell>
                      <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                        {items.listingType}
                      </TableCell>
                      <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                        {items.durationInDays}
                      </TableCell>
                      <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                        {items.noOfListings}
                      </TableCell>
                      <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                        {items.id}
                      </TableCell>
                      <TableCell style={{ borderBottom: "1px solid #ddd" }}>
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditClick(items.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteClick(items.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </PackagesTabs>
    </>
  );
}

export default PackagesList;
