import { ActionTypes } from "../constant/ActionType";

const initialState = {
  token: "",
  userData: null,
};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.AUTH:

      return (state = {
        ...state,
        token: payload.token,
        userData: payload.userData,
      });
    default:
      return state;
  }
};

export default AuthReducer;
