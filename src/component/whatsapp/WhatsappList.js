import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ApiService from "../../API/ApiService";
import { apiList } from "../../API/ApiList";
import { useDispatch, useSelector } from "react-redux";
import {
  SetLoader,
  SingleChat,
  UserChatList,
} from "../../redux/actions/AuthAction";
import { store } from "../../redux/store";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import PropTypes from "prop-types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { URLS } from "../../API/UrlList";

const WhatsappList = ({ socket, showChat,setShowChat }) => {
  const dispatch = useDispatch();

  const [allUser, setAllUser] = useState([]);
  const [search, setSearch] = useState("");
  const [lastMessages, setLastMessages] = useState({});
  const [count, setCount] = useState([]);
  const { loading } = store.getState().LoaderReducer;
  const { userData } = store.getState().AuthReducer;
  const [chatKey, setChatKey] = useState("");



  const singleChatdata = useSelector(
    (state) => state?.ChatUserListReducer?.singleChat
  );

  React.useEffect(() => {
    dispatch(SetLoader(true));
    const getData = setTimeout(async () => {
      await ApiService(`${apiList.GET_ALL_USER}?search=${search}`, "GET")
        .then((response) => {
          dispatch(UserChatList(response.data));
          setAllUser(response.data);
          dispatch(SetLoader(false));
        })
        .catch((error) => {
          dispatch(SetLoader(false));
          console.log(error);
        });
    }, 500);

    return () => clearTimeout(getData);
  }, [search, dispatch]);

  useEffect(() => {
    socket.on("getNotification", (res) => {
      const isChatopen = singleChatdata?._id == res?.sender_id;
  
      if (isChatopen) {
        setCount([{ ...res, isRead: true }]);
      } else {
        setCount(res);
      }
    });

    const myfunction = async () => {
      const chatAllMsg = await ApiService(`${apiList.GET_ALL_MESSAGE}`, "GET");
      chatAllMsg?.forEach((message) => {
        setLastMessages((prevMessages) => ({
          ...prevMessages,
          [message._id]: message.lastMessage,
        }));
      });
    };
    myfunction();
  }, [socket, chatKey, allUser, singleChatdata, count]);

  const handleClick = async (e, item) => {
    dispatch(SingleChat(item));
    setChatKey(item._id);
    if (window.innerWidth < 1200) {
    setShowChat(val => !val)
    }
  };

  const filteredUsers = allUser?.filter((user) => user._id !== userData?._id);
  console.log(85,filteredUsers?.length);
  console.log(86,loading);
  return (
    <div
      className={showChat ? "xl:w-[25%] w-[100%]  border xl:flex md:h-[797px] h-[796px] flex-col" :`xl:w-[25%] w-[100%]  border xl:flex hidden flex-col`}
    >
      {/* Header */}
      <div className=" px-3 bg-grey-lighter sm:flex block flex-row justify-between items-center">
        <div className="flex items-center ">
          <img
            className="mt-2 h-12 w-12  rounded-full"
            src={`${URLS?.IMAGE_URL}/${userData?.profile_image}`}
            alt=""
          />
          <span className="mx-4">{userData?.name}</span>
        </div>
        <div className="flex sm:justify-start justify-end">
          <div>
            <DonutLargeIcon className="list_header_icon" />
          </div>
          <div className="ml-4">
            <ChatIcon className="list_header_icon" />
          </div>
          <div className="ml-4">
            <MoreVertIcon className="list_header_icon" />
          </div>
        </div>
      </div>
      {/* Search */}
      <div className="py-2 px-2 bg-grey-lightest">
        <input
          type="text"
          className="w-full px-2 py-2 text-sm"
          placeholder="Search or start new chat"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Contacts */}
      <div className="bg-grey-lighter flex-1 overflow-auto md:h-[660px] h-[660px] ">
        {!loading && filteredUsers?.length !== 0 ? (
          filteredUsers?.map((item, index) => (
            <div
              key={index}
              onClick={(e) => handleClick(e, item)}
              className="px-3 flex items-center hover:bg-gray-200 bg-grey-lighter cursor-pointer"
            >
              <div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={`${URLS?.IMAGE_URL}/${item?.profile_image}`}
                />
              </div>
              <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                <div className="flex items-bottom justify-between">
                  <p className="text-grey-darkest">{item?.name}</p>
                  <p className="text-xs text-grey-darkest">
                    {new Date(item?.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-grey-dark mt-1 text-sm">
                    {lastMessages[item?._id]?.length > 25
                      ? lastMessages[item?._id]?.slice(0, 25) + "..."
                      : lastMessages[item?._id]}
                  </p>
                  <div className=" bg-[#449388] rounded-full justify-center flex h-[20px] items-center min-w-[17px] max-w-[25px] ">
                    <span className="mx-2   text-[11px]   "> 1</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (search === "" && loading ) || (search !== "" && filteredUsers?.length !== 0) ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="30vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          !loading &&
          filteredUsers?.length === 0 && (
            <p className="flex justify-center mt-5 text-lg"> user not found </p>
          )
        )}
      </div>
    </div>
  );
};

WhatsappList.propTypes = {
  socket: PropTypes.any,
  showChat: PropTypes.any,
  setShowChat: PropTypes.any,
};

export default WhatsappList;
