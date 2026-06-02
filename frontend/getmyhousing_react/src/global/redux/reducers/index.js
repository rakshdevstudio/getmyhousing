import { combineReducers } from "@reduxjs/toolkit";
import { user } from "./userProfile.reducers";
import { locationReducer } from "./location.reducers";
import { citiesReducer } from "./cities.reducers";

const rootReducer = combineReducers({
  user: user,
  location: locationReducer,
  cities: citiesReducer,
});

export default rootReducer;
