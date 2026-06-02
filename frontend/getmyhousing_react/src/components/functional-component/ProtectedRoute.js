import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { config } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getUser } from "../../global/redux/action";

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies([config.cookieName]);
  const dispatch = useDispatch();
  const location = useLocation();
  const requestedUserIdRef = useRef(null);

  const { userData, userError, isFetching } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const loginUserId = cookies[config.cookieName]?.loginUserId;
    if (
      loginUserId &&
      !userData?.user &&
      !userError &&
      !isFetching &&
      requestedUserIdRef.current !== loginUserId
    ) {
      requestedUserIdRef.current = loginUserId;
      dispatch(
        getUser({ id: loginUserId, cookies })
      );
    }
  }, [cookies, dispatch, userData, userError, isFetching]);


  // Redirect if user is inactive (only after data is fully loaded)
  if (userData?.user && userData.user.status !== "Active") {
    return <Navigate to="/inactive" replace={true} state={{ redirectTo: location.pathname }} />;
  }

  // Redirect if not logged in
  if (
    !(
      !!cookies[config.cookieName] &&
      !!cookies[config.cookieName].token &&
      !!cookies[config.cookieName].loginUserId
    )
  ) {
    return (
      <Navigate
        to="/"
        replace={true}
        state={{ redirectTo: location.pathname }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
