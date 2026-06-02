import actionTypes from "../actionTypes";

const initialState = {
  isFetching: false,
  userData: null,
  userError: false,
  logout: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_GET_REQUEST:
      return { ...state, isFetching: true, userError: false };
    case actionTypes.USER_GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userData: action.data,
        userError: false,
      };
    case actionTypes.USER_GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        userError: true,
      };
    case actionTypes.USER_LOGOUT:
      return { ...state, logout: true, userData: null };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};
