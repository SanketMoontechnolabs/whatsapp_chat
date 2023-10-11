
import { ActionTypes } from "../constant/ActionType";

const initialState = {
  chatUserData: null,
  singleChat:null,
  notification:null,
  showclick: false,
 
};

const ChatUserListReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case ActionTypes.USERCHAT_LIST:
      return {
        ...state,
        chatUserData: payload,
      };
      case  ActionTypes.SINGLE_CHAT:
        return {
          ...state,
          singleChat: payload,
        };
      case  ActionTypes.NOTIFICATIONS:
        return {
          ...state,
          notification: payload,
        };
        case ActionTypes.SET_SHOW_CLICK: 
        return {
          ...state,
          showclick: payload,
        };
    
    default:
      return state;
  }
};

export default ChatUserListReducer;