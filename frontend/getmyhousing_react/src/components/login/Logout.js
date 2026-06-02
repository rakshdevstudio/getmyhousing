import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { config } from "../../config/config";
import { useDispatch } from "react-redux";
import { reset } from "../../global/redux/action";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [cookies, setCookies, removeCookie] = useCookies([]);

  useEffect(() => {
    if (cookies[config.cookieName]) {
      removeCookie(config.cookieName, { path: "/" });
    }
    if (cookies[config.preferencesCookie]) {
      removeCookie(config.preferencesCookie, { path: "/" });
    }
    dispatch(reset());
    navigate("/", { replace: true });
  }, [cookies, navigate, removeCookie]);

  return <CircularProgress sx={{ margin: "auto" }} />;
};

export default Logout;
