import React, { useEffect, useState } from "react";
import { cardItems } from "../../common/common";
import { Box } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";

const PopularLocality = () => {
  const [cookies] = useCookies();
  const [visibleItems, setVisibleItems] = useState(4);

  const handleShowMore = () => {
    if (visibleItems === cardItems.length) {
      setVisibleItems(4);
    } else {
      setVisibleItems(cardItems.length);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setVisibleItems(4);
      } else if (window.innerWidth >= 600) {
        setVisibleItems(3);
      } else if (window.innerWidth >= 400) {
        setVisibleItems(2);
      } else if (window.innerWidth >= 200) {
        setVisibleItems(2);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            color: "var(--Text-Color-Grey-Bold, #333)",
            textAlign: "center",
            fontFamily: "Mulish, sans-serif",
            fontSize: { md: "26px", xs: "19px" },
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            mb: { md: "30px", xs: "18px" },
          }}
        >
          Popular Localities in{" "}
          <span style={{ color: "var(--BG-Color-5, #DB282F)" }}>
            {cookies[config.preferencesCookie]?.city
              ? cookies[config.preferencesCookie]?.city
              : "Bangalore"}
          </span>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: { md: "20px", xs: "8px" },
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {cardItems.slice(0, visibleItems).map((items, index) => (
            <Box key={index}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    width: { md: "292px", xs: "160px" },
                    height: { md: "279px", xs: "210px" },
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                    m: 0.2,
                    border: "0.5px solid var(--Text-Color-Grey-Light, #555656)",
                    background: "#FFF",
                    boxShadow: "0px 2.4px 4.8px 0px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <Box
                    sx={{
                      color: "var(--Text-Color-Grey-Bold, #333)",
                      fontFamily: "Mulish, sans-serif",
                      fontSize: { md: "20px", xs: "16px" },
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      textAlign: "center",
                    }}
                  >
                    {items.place}
                  </Box>
                  <Box
                    sx={{
                      color: "var(--Text-Color-Grey-Light, #555656)",
                      fontFamily: "Mulish, sans-serif",
                      fontSize: { md: "14px", xs: "12px" },
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      textAlign: "center",
                      mt: { md: 1, xs: 0.5 },
                    }}
                  >
                    {items.amount}
                  </Box>
                  <Box
                    sx={{
                      color: "var(--Text-Color-Grey-Light, #555656)",
                      fontFamily: "Mulish, sans-serif",
                      fontSize: { md: "14px", xs: "12px" },
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      textAlign: "center",
                      mt: 1,
                    }}
                  >
                    {items.review}
                  </Box>
                  <Box sx={{ display: { md: "flex", xs: "none" } }}>
                    <Box
                      component="img"
                      src="/media/images/gridimgae.jpeg"
                      style={{
                        width: "290.836px",
                        height: "130px",

                        objectFit: "cover no-repeat",
                      }}
                    ></Box>
                  </Box>
                  <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <Box
                      component="img"
                      src="/media/images/gridimgae.jpeg"
                      style={{
                        width: "160px",
                        height: "85px",

                        objectFit: "cover no-repeat",
                      }}
                    ></Box>
                  </Box>

                  <Box
                    sx={{
                      color: "var(--BG-Color-5, #DB282F)",
                      fontFamily: "Mulish, sans-serif",
                      fontSize: { md: "20px", xs: "16px" },
                      fontStyle: "normal",
                      fontWeight: 500,
                      mt: 1.5,
                      lineHeight: "normal",
                      textAlign: "center",
                    }}
                  >
                    {items.year}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            color: "var(--BG-Color-5, #DB282F)",
            fontFamily: "Mulish, sans-serif",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            display: "flex",
            justifyContent: "center",
            m: "auto",
            mt: 2,
            cursor: "pointer",
          }}
          onClick={handleShowMore}
        >
          {visibleItems < cardItems.length ? (
            <>
              Sell all Properties
              <EastIcon sx={{ ml: 1 }} />
            </>
          ) : (
            <>
              <WestIcon sx={{ mr: 1 }} />
              Sell less Properties
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PopularLocality;
