import { all, takeEvery } from "redux-saga/effects";
import actionTypes from "../actionTypes";
import { getUserSaga } from "./userProfile.sagas";
import { getLocationSaga } from "./location.sagas";
import { getCitiesSaga } from "./cities.sagas";

export default function* rootSaga() {
  yield all([
    takeEvery(actionTypes.USER_GET_REQUEST, getUserSaga),
    takeEvery(actionTypes.LOCATION_GET_REQUEST, getLocationSaga),
    takeEvery(actionTypes.CITIES_GET_REQUEST, getCitiesSaga),
  ]);
}
