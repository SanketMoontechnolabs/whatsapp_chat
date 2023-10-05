import { ActionTypes } from "../constant/ActionType";

const initialState = {
  loading: false,
};

const LoaderReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case ActionTypes.SET_LOADER:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};

export default LoaderReducer;
