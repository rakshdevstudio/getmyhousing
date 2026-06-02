import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import "./Commercial.css";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FurnishingStatus = ({
  next,
  back,
  formData,
  updateFormData,
  detailsId,
}) => {
  const [furnishingStatus, setFurnishingStatus] = useState(
    formData.furnishingStatus
  );
  const [typeOfWorkStation, setTypeOfWorkStation] = useState(
    formData.typeOfWorkStation
  );
  const [seatType, setSeatType] = useState(formData.seatType);
  const [noOfSeats, setNoOfSeats] = useState(formData.noOfSeats);
  const [ac, setac] = useState(formData.ac);
  const [beds, setbeds] = useState(formData.beds);
  const [gas, setgas] = useState(formData.gas);
  const [led, setLed] = useState(formData.led);
  const [refrigerator, setrefrigerator] = useState(formData.refrigerator);
  const [sofa, setsofa] = useState(formData.sofa);
  const [tv, settv] = useState(formData.tv);
  const [wardrobe, setwardrobe] = useState(formData.wardrobe);
  const [washingMachine, setwashingMachine] = useState(formData.washingMachine);
  const [officeTables, setofficeTables] = useState(formData.officeTables);
  const [waterPurifier, setwaterPurifier] = useState(formData.waterPurifier);
  const [fan, setfan] = useState(formData.fan);
  const [exhaustFan, setexhaustFan] = useState(formData.exhaustFan);
  const [stove, setstove] = useState(formData.stove);
  const [curtains, setcurtains] = useState(formData.curtains);
  const [chimney, setchimney] = useState(formData.chimney);
  const [microWave, setmicroWave] = useState(formData.microWave);
  const [chairs, setchairs] = useState(formData.chairs);
  const [mediclKits, setmediclKits] = useState(formData.mediclKits);
  const [confernceRooms, setconfernceRooms] = useState(formData.confernceRooms);
  const [recreational, setrecreational] = useState(formData.recreational);
  const [printingMachine, setprintingMachine] = useState(
    formData.printingMachine
  );
  const [coffieMachine, setcoffieMachine] = useState(formData.coffieMachine);
  const [smartBoard, setsmartBoard] = useState(formData.smartBoard);
  const [projectors, setprojectors] = useState(formData.projectors);
  const [diningTables, setdiningTables] = useState(formData.diningTables);
  const [modularKitchen, setmodularKitchen] = useState(formData.modularKitchen);
  const [manageType, setmanageType] = useState(formData.manageType);
  const [officeSpaceType, setofficeSpaceType] = useState(
    formData.officeSpaceType
  );
  const [geyser, setgeyser] = useState(formData.geyser);
  const [wifi, setwifi] = useState(formData.wifi);

  const [tables, settables] = useState(formData.tables);

  const [itemDataResidential, setItemDataResidential] = useState(
    formData.itemDataResidential.map((item, index) => ({
      index,
      name: item.name,
      count: item.count,
    }))
  );
  const [itemDataIndustrial, setItemDataIndustrial] = useState(
    formData.itemDataIndustrial.map((item, index) => ({
      index,
      name: item.name,
      count: item.count,
    }))
  );
  const [itemDataCommercial, setItemDataCommercial] = useState(
    formData.itemDataCommercial.map((item, index) => ({
      index,
      name: item.name,
      count: item.count,
    }))
  );

  const [open, setOpen] = useState(false);

  const [adservices, setadservices] = useState(formData.adservices);

  const increment = (index) => {
    let updatedItemData;
    if (formData.buildingType === "Residential") {
      updatedItemData = itemDataResidential.map((item) =>
        item.index === index ? { ...item, count: item.count + 1 } : item
      );
      setItemDataResidential(updatedItemData);
    } else if (formData.buildingType === "Commercial") {
      updatedItemData = itemDataCommercial.map((item) =>
        item.index === index ? { ...item, count: item.count + 1 } : item
      );
      setItemDataCommercial(updatedItemData);
    } else if (formData.buildingType === "Industrial") {
      updatedItemData = itemDataIndustrial.map((item) =>
        item.index === index ? { ...item, count: item.count + 1 } : item
      );
      setItemDataIndustrial(updatedItemData);
    }
  };

  const decrement = (index) => {
    let updatedItemData;
    if (formData.buildingType === "Residential") {
      updatedItemData = itemDataResidential.map((item) =>
        item.index === index
          ? { ...item, count: Math.max(item.count - 1, 0) }
          : item
      );
      setItemDataResidential(updatedItemData);
    } else if (formData.buildingType === "Commercial") {
      updatedItemData = itemDataCommercial.map((item) =>
        item.index === index
          ? { ...item, count: Math.max(item.count - 1, 0) }
          : item
      );
      setItemDataCommercial(updatedItemData);
    } else if (formData.buildingType === "Industrial") {
      updatedItemData = itemDataIndustrial.map((item) =>
        item.index === index
          ? { ...item, count: Math.max(item.count - 1, 0) }
          : item
      );
      setItemDataIndustrial(updatedItemData);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setadservices([...adservices, value]);
    } else {
      setadservices(adservices.filter((item) => item !== value));
    }
  };

  const data6 = {
    officeTables,
    curtains,
    chimney,
    microWave,
    chairs,
    stove,
    mediclKits,
    printingMachine,
    smartBoard,
    coffieMachine,
    projectors,
    diningTables,
    modularKitchen,
    exhaustFan,
    confernceRooms,
    recreational,
    fan,
    waterPurifier,
    furnishingStatus,
    typeOfWorkStation,
    seatType,
    noOfSeats,
    itemDataResidential,
    itemDataCommercial,
    itemDataIndustrial,
    ac,
    gas,
    led,
    beds,
    sofa,
    tv,
    washingMachine,
    wardrobe,
    refrigerator,
    manageType,
    officeSpaceType,
    geyser,
    wifi,
    tables,
    adservices,
  };

  const send = () => {
    updateFormData(data6);
  };

  const services = [
    // "Mall",
    // "Commercial Project",
    // "Residential Project",
    // "Retail/Commercial Building",
    // "Market/High Street",
    // "Others",
    "Laundry",
    "House Keeping",
    "Internet/Wifi Connectivity",
    "CCTV",
    "Gated Community",
    "Security",
    "Biometric",
  ];

  useEffect(() => {
    const stateVariables = {
      0: setac,
      1: setbeds,
      2: setLed,
      3: setgas,
      4: setwashingMachine,
      5: setrefrigerator,
      6: setsofa,
      7: settv,
      8: setwardrobe,
      // 9: setofficeTables,
      9: setwaterPurifier,
      10: setfan,
      11: setexhaustFan,
      12: setstove,
      13: setcurtains,
      14: setchimney,
      15: setmicroWave,
      // 16: setchairs,
      // 18: setmediclKits,
      // 19: setconfernceRooms,
      // 20: setrecreational,
      // 21: setprintingMachine,
      // 22: setcoffieMachine,
      // 23: setsmartBoard,
      // 24: setprojectors,
      // 25: setprojectors,
      16: setgeyser,
      17: setwifi,
      18: setdiningTables,
      19: setmodularKitchen,
    };

    itemDataResidential.forEach((item) => {
      const stateUpdater = stateVariables[item.index];
      if (stateUpdater) {
        stateUpdater({
          count: item.count,
          name: item.count > 0 ? "yes" : "No",
        });
      }
    });
  }, [itemDataResidential]);

  useEffect(() => {
    const stateVariables = {
      0: setac,
      // 1: setbeds,
      1: setLed,
      // 3: setgas,
      // 4: setwashingMachine,
      2: setrefrigerator,
      3: setsofa,
      // 7: settv,
      4: setwardrobe,
      5: setofficeTables,
      6: setwaterPurifier,
      7: setfan,
      8: setexhaustFan,
      9: setstove,
      10: setcurtains,
      11: setchimney,
      12: setmicroWave,
      13: setofficeTables,
      14: setchairs,
      15: setmediclKits,
      16: setconfernceRooms,
      17: setrecreational,
      18: setprintingMachine,
      19: setcoffieMachine,
      20: setsmartBoard,
      21: setprojectors,
      22: setprojectors,
      // 27: setmodularKitchen,
    };

    itemDataCommercial.forEach((item) => {
      const stateUpdater = stateVariables[item.index];
      if (stateUpdater) {
        stateUpdater({
          count: item.count,
          name: item.count > 0 ? "yes" : "No",
        });
      }
    });
  }, [itemDataCommercial]);

  useEffect(() => {
    const stateVariables = {
      0: setac,
      1: setbeds,
      2: setLed,
      3: setgas,
      4: setwashingMachine,
      5: setrefrigerator,
      6: setsofa,
      7: settv,
      8: setwardrobe,
      9: setofficeTables,
      10: setwaterPurifier,
      11: setfan,
      12: setexhaustFan,
      13: setstove,
      14: setcurtains,
      15: setchimney,
      16: setmicroWave,
      17: setchairs,
      18: setmediclKits,
      19: setconfernceRooms,
      20: setrecreational,
      21: setprintingMachine,
      22: setcoffieMachine,
      23: setsmartBoard,
      24: setprojectors,
      25: setprojectors,
      26: setdiningTables,
      27: setmodularKitchen,
    };

    itemDataIndustrial.forEach((item) => {
      const stateUpdater = stateVariables[item.index];
      if (stateUpdater) {
        stateUpdater({
          count: item.count,
          name: item.count > 0 ? "yes" : "No",
        });
      }
    });
  }, [itemDataIndustrial]);

  const workstation = ["Cubical", "Linear"];
  const seattype = ["Open Seat", "Private Cabin", " Conference Cabin"];
  const officeSpace = ["Semi Fitted", "Fitted Space", " Shell & Core"];
  const manage = ["Non Managed", "Fully Managed"];

  const furnish = ["Unfurnished", "Semi Furnished", "Fully Furnished"];

  return (
    <Box sx={{ marginTop: 5, marginBottom: 5 }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: "25px",
            fontWeight: 600,
            mb: { md: 3, xs: 1 },
            ml: { md: 1 },
          }}
        >
          Furnishing Type
        </Typography>
        <Grid container sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}>
          {formData.buildingType !== "Residential" &&
            formData.propertiesType !== "Commercial Building" &&
            formData.propertiesType !== "Guest House/Banquet Hall" &&
            formData.propertiesType !== "Retail Shop/Showroom" &&
            formData.propertiesType !== "Hotel/Resorts" &&
            formData.propertiesType !== "Industrial Building" &&
            formData.propertiesType !== "Shopping Mall" && (
              <Grid
                container
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                }}
              >
                {furnish.map((item) => (
                  <Grid item sx={{ ml: { md: 1 } }}>
                    <label
                      className="mydict1 border1"
                      onChange={(event) => {
                        setFurnishingStatus(event.target.value);
                      }}
                      onClick={(event) => {
                        if (
                          event.target.value === "Semi Furnished" ||
                          event.target.value === "Fully Furnished" ||
                          event.target.value === "Office Space"
                        ) {
                          setOpen(true);
                        } else {
                          setOpen(false);
                        }
                      }}
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "25px" }}
                    >
                      <input
                        type="radio"
                        name="20144"
                        value={item}
                        checked={furnishingStatus === item}
                        readOnly
                      />
                      <span
                        className="border1"
                        style={{ fontFamily: "Mulish,sans-serif" }}
                      >
                        {item}
                      </span>
                    </label>
                  </Grid>
                ))}
              </Grid>
            )}
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{ maxHeight: "80%", overflowY: "auto" }}>
              <Grid container>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "90%",
                    margin: "auto",
                    mb: 3,
                  }}
                >
                  {(formData.buildingType === "Residential"
                    ? itemDataResidential
                    : formData.buildingType === "Commercial"
                    ? itemDataCommercial
                    : itemDataIndustrial
                  ).map((item) => (
                    <Grid
                      item
                      key={item.index}
                      xs={4}
                      md={3}
                      sx={{
                        boxShadow: "0 0 .1vw .01vw black", // Customize the shadow as needed
                        padding: "20px",
                        position: "relative", // Add some padding to give more space around the grid
                      }}
                    >
                      {item.count > 0 && (
                        <Box
                          component="img"
                          sx={{
                            width: "35px",
                            height: "35px",
                            position: "absolute",
                            top: "19%",
                            left: "89.5%",
                            transform: "translate(-50%, -50%)",
                          }}
                          src="/media/images/ok.jpg"
                        />
                      )}
                      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                        <Grid item>
                          <Box
                            component="img"
                            sx={{
                              width: "100px",
                              height: "70px",
                              padding: 0,
                              margin: 0,
                            }}
                            src="/media/images/bg-login.jpg"
                          />
                        </Grid>
                        <Grid item>
                          <Typography sx={{ mt: 1.5, ml: 2 }}>
                            {item.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          boxShadow: "0 0 .1vw .01vw black",
                          width: "40%",
                          marginLeft: "auto",
                          marginBottom: "-7%",
                        }}
                      >
                        <span onClick={() => decrement(item.index)}>
                          <RemoveIcon sx={{ cursor: "pointer" }} />
                        </span>
                        <Typography
                          variant="h6"
                          sx={{
                            marginBottom: "auto",
                            marginRight: "10px",
                            ml: "10px",
                          }}
                        >
                          {item.count}
                        </Typography>
                        <span onClick={() => increment(item.index)}>
                          <AddIcon sx={{ cursor: "pointer" }} />
                        </span>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Modal>

          {formData.propertiesType === "PG/Co-living" && (
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginRight: { md: "10%" },
                ml: { xs: 1 },
              }}
            >
              <Grid
                item
                sx={{
                  marginRight: { md: "17px", xs: "5px" },
                  marginTop: { md: "10px", xs: "2px" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { md: "18px" },
                    fontWeight: 600,
                    mb: { md: 0.5 },
                  }}
                >
                  Services
                </Typography>
              </Grid>
              <Grid
                item
                md={12}
                className="mydict"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1,
                  flexWrap: "wrap",
                  mt: { md: 1 },
                }}
              >
                {services.map((label, index) => (
                  <label
                    className="mydict1 border1"
                    onChange={handleCheckboxChange}
                    key={index}
                    style={{ marginRight: "15px", marginBottom: "30px" }}
                  >
                    <input
                      type="checkbox"
                      name={`radi7${index + 1}`}
                      value={label}
                    />
                    <span
                      className="border1"
                      style={{ fontFamily: "Mulish, sans-serif" }}
                    >
                      {label}
                    </span>
                  </label>
                ))}
              </Grid>
            </Grid>
          )}

          {(formData.propertiesType === "Office Space" ||
            (formData.propertiesType === "Office Space in IT Park/SEZ" &&
              formData.propertiesType !== "Commercial Building")) && (
            <Box
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  ml: { xs: 1 },
                }}
              >
                <Grid
                  item
                  md={12}
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "5px", xs: "10px" },
                    mb: { xs: 1 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography
                    sx={{ fontSize: { md: "17px" }, fontWeight: 600 }}
                  >
                    Managed Type
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={12}
                  className="mydict"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {manage.map((item) => (
                    <label
                      className="mydict1 border1"
                      onChange={(event) => {
                        setmanageType(event.target.value);
                      }}
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "15px" }}
                    >
                      <input
                        type="radio"
                        name="20maage2"
                        value={item}
                        checked={manageType === item}
                        readOnly
                      />
                      <span
                        className="border1"
                        style={{ fontFamily: "Mulish,sans-serif" }}
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
                  ml: { xs: 1 },
                }}
              >
                <Grid
                  item
                  md={12}
                  sx={{
                    marginRight: { md: "17px", xs: "5px" },
                    marginTop: { md: "5px", xs: "10px" },
                    mb: { xs: 1 },
                    mr: { xs: "30%" },
                  }}
                >
                  <Typography
                    sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                  >
                    Office Space Type
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={12}
                  className="mydict"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {officeSpace.map((item) => (
                    <label
                      className="mydict1 border1"
                      onChange={(event) => {
                        setofficeSpaceType(event.target.value);
                      }}
                      key={item}
                      style={{ marginRight: "15px", marginBottom: "15px" }}
                    >
                      <input
                        type="radio"
                        name="officespa"
                        value={item}
                        checked={officeSpaceType === item}
                        readOnly
                      />
                      <span
                        className="border1"
                        style={{ fontFamily: "Mulish,sans-serif" }}
                      >
                        {item}
                      </span>
                    </label>
                  ))}
                </Grid>
              </Grid>
            </Box>
          )}

          {formData.buildingType !== "Residential" &&
            formData.propertiesType !== "Office Space" &&
            formData.propertiesType !== "Office Space in IT Park/SEZ" &&
            formData.propertiesType !== "Commercial Building" &&
            formData.propertiesType !== "Guest House/Banquet Hall" &&
            formData.propertiesType !== "Retail Shop/Showroom" &&
            formData.propertiesType !== "Industrial Building" &&
            formData.propertiesType !== "Hotel/Resorts" &&
            formData.propertiesType !== "Shopping Mall" && (
              <Box>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    ml: { xs: 1 },
                  }}
                >
                  <Grid
                    item
                    md={12}
                    sx={{
                      marginRight: { md: "17px", xs: "5px" },
                      marginTop: { md: "5px", xs: "10px" },
                      mb: { xs: 1 },
                      mr: { xs: "30%" },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { md: "18px" }, fontWeight: 600 }}
                    >
                      Seat Type
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    className="mydict"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {seattype.map((item) => (
                      <label
                        className="mydict1 border1"
                        onChange={(event) => {
                          setSeatType(event.target.value);
                        }}
                        key={item}
                        style={{ marginRight: "15px", marginBottom: "15px" }}
                      >
                        <input
                          type="radio"
                          name="202"
                          value={item}
                          checked={seatType === item}
                          readOnly
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

                <Grid container>
                  <Grid item sx={{ width: { md: "100%" } }}>
                    <Typography
                      sx={{ fontSize: "18px", fontWeight: 600, ml: { md: 1 } }}
                    >
                      Number Of Seats Available
                    </Typography>
                    <TextField
                      label="Enter the Number of Seat Available"
                      id="demo-simple-select"
                      sx={{ minWidth: { md: "78.5%" } }}
                      value={noOfSeats}
                      onChange={(event) => {
                        setNoOfSeats(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Box>
            )}
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
};

export default FurnishingStatus;
