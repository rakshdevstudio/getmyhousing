import actionTypes from "../actionTypes";

const initialState = {
    isCitiesFetching: false,
    citiesData: null,
    citiesError: false,
    logout: false,
};

export const citiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CITIES_GET_REQUEST:
            return { ...state, isCitiesFetching: true, citiesError: false };
        case actionTypes.CITIES_GET_SUCCESS:
            return {
                ...state,
                isCitiesFetching: false,
                citiesData: action.data,
                citiesError: false,
            };
        case actionTypes.CITIES_GET_FAILURE:
            return {
                ...state,
                isCitiesFetching: false,
                citiesError: true,
            };
        case actionTypes.CITIES_LOGOUT:
            return { ...state, logout: true, citiesData: null };
        case actionTypes.RESET:
            return initialState;
        default:
            return state;
    }
};
