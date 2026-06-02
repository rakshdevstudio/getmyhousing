import { call, put } from "redux-saga/effects";
import actionTypes from "../actionTypes";
import { invokeApi, apiList } from "../../../apis/apiServices";
import { config } from "../../../config/config";

export function* getLocationSaga(action) {
  const { cookies } = action.params;
  const params = {};

  try {
    const response = yield call(
      invokeApi,
      `${config.apiDomains}${apiList.getZoneMapping}`,
      params,
      cookies
    );

    if (response?.status >= 200 && response?.status < 300) {
      if (response.data.responseCode === "200") {
        yield put({
          type: actionTypes.LOCATION_GET_SUCCESS,
          data: response.data,
        });
      } else {
        yield put({
          type: actionTypes.LOCATION_GET_FAILURE,
          data: response.data,
        });
      }
    } else if (response?.status === 401) {
      yield put({
        type: actionTypes.LOCATION_LOGOUT,
      });
    } else {
      yield put({
        type: actionTypes.LOCATION_GET_FAILURE,
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.LOCATION_GET_FAILURE,
    });
  }
}
