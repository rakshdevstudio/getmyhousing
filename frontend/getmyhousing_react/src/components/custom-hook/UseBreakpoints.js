// src/hooks/useBreakpoints.js

import { useMediaQuery, useTheme } from "@mui/material";

const UseBreakpoints = () => {
  const theme = useTheme();
  const extraSmall = useMediaQuery(theme.breakpoints.up("xs")); // above 0px
  const small = useMediaQuery(theme.breakpoints.up("sm")); // above 600px
  const medium = useMediaQuery(theme.breakpoints.up("md")); // above 900px
  const large = useMediaQuery(theme.breakpoints.up("lg")); // above 1200px
  const extraLarge = useMediaQuery(theme.breakpoints.up("xl")); // above 1536px

  return { extraSmall, small, medium, large, extraLarge };
};

export default UseBreakpoints;
