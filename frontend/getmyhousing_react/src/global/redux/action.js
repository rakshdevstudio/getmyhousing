import actionTypes from "./actionTypes";

export const getUser = (params) => ({
  type: actionTypes.USER_GET_REQUEST,
  params,
});

export const getLocation = (params) => ({
  type: actionTypes.LOCATION_GET_REQUEST,
  params,
});

export const getCities = (params) => ({
  type: actionTypes.CITIES_GET_REQUEST,
  params,
});

export const reset = () => ({
  type: actionTypes.RESET,
});
