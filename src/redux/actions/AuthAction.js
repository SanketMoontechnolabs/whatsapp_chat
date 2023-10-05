import { ActionTypes } from "../constant/ActionType";

export const AuthAction = (user) => {
    return {
      type: ActionTypes.AUTH,
      payload: user,
    }
  }

  export const SetLoader = (payload) => {
    return {
      type: ActionTypes.SET_LOADER,
      payload,
    }
  }
  export const UserChatList = (payload) => {
    return {
      type: ActionTypes.USERCHAT_LIST,
      payload,
    }
  }
  export const SingleChat = (payload) => {
    return {
      type: ActionTypes.SINGLE_CHAT,
      payload,
    }
  }
  export const Notifications = (payload) => {
    return {
      type: ActionTypes.NOTIFICATIONS,
      payload,
    }
  }
