import actionTypes from "../actionTypes";

const initialState = {
  isLocationFetching: false,
  locationData: null,
  locationError: false,
  logout: false,
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOCATION_GET_REQUEST:
      return { ...state, isLocationFetching: true, locationError: false };
    case actionTypes.LOCATION_GET_SUCCESS:
      return {
        ...state,
        isLocationFetching: false,
        locationData: action.data,
        locationError: false,
      };
    case actionTypes.LOCATION_GET_FAILURE:
      return {
        ...state,
        isLocationFetching: false,
        locationError: true,
      };
    case actionTypes.LOCATION_LOGOUT:
      return { ...state, logout: true, locationData: null };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};
