import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import AttachmentTwoToneIcon from "@mui/icons-material/AttachmentTwoTone";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { store } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import EmptyChat from "./EmptyChat";
import { v4 as uuidv4 } from "uuid";
import ApiService from "../../API/ApiService";
import { apiList } from "../../API/ApiList";
import Message from "./Message";
import { Notifications } from "../../redux/actions/AuthAction";
import { URLS } from "../../API/UrlList";
import VoiceRecorder from "../voiceRecorder/VoiceRecorder";

function WhatsappMessage({ socket, handleBackButtonClick, showChat }) {
  const [showPicker, setShowPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [file, setFile] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const modalRef = useRef();
  const pickerRef = useRef(null);

  const dispatch = useDispatch();
  const { userData } = store.getState().AuthReducer;

  const singleChatdata = useSelector(
    (state) => state?.ChatUserListReducer?.singleChat
  );

  console.log(41, audioURL);

  const handleFileChange = (e) => {
    const imagefile = e.target.files[0];
    setFile(imagefile);
    setChosenEmoji(e.target.files[0].name);
  };

  useEffect(() => {
    if (singleChatdata) {
      socket.on("connect", () => {
        console.log("Connected to Socket.io server");
      });

    
      socket.emit("add-user", singleChatdata?._id);

      socket.on("msg-recieved", (msg) => {
        console.log("msg-recieved",msg);
        setArrivalMessage({
          fromSelf: false,
          message: msg.message === "" ? msg.fileData : msg.message,
          type: msg.type,
        });
        dispatch(Notifications(msg));
      });
    
    }
    return () => {
      socket.off("connect ");
    };
  }, [singleChatdata, socket, dispatch]);

  const fileType = chosenEmoji?.name?.endsWith(".pdf") ? "pdf" : "image";
  console.log(600, fileType);


  const sendMessage = async () => {
    if (chosenEmoji || file) {
      var newMessage = {};
      let bodyformData;
      let socketfileData;

      if (file) {
        const reader = new FileReader();

        let formData = new FormData();

        reader.onload = async (event) => {
          const fileData = {
            buffer: event.target.result,
            fileName: file.name,
            filePath: "/public/image",
          };
          formData.append("image", file);
          formData.append("to", singleChatdata?._id);
          formData.append("from", JSON.stringify(userData));
          formData.append("message", "");
          formData.append("type", "image");

          bodyformData = formData;

          socketfileData = {
            image: fileData,
            to: singleChatdata?._id,
            from: userData,
            message: "",
            type: "image",
          };

          socket.emit("sendMessage", socketfileData);
          await ApiService(apiList.SEND_MESSAGE, "POST", bodyformData, true);
        };

        reader.readAsArrayBuffer(file);
        setChosenEmoji("");
        setFile("");
      } else {

      console.log("119","sanket patel");
        newMessage = {
          to: singleChatdata?._id,
          from: userData,
          message: chosenEmoji || file.name,
          time: new Date().toUTCString(),
          isRead: false,
          type: audioURL? "voice": "text",
        };

        await setChosenEmoji("");       
        socket.emit("sendMessage", newMessage);
        await ApiService(apiList.SEND_MESSAGE, "POST", newMessage);
      
      }

      const msgs = [...messages];
      msgs.push({
        fromSelf: true,
        message: chosenEmoji || file.name,
        type: file ? "images" : audioURL ? "voice": "text",
      });
      setMessages(msgs);
    }
  };


  useEffect(() => {
   
    const fetchData = async () => {
      if (singleChatdata) {
        const values = {
          from: userData._id,
          to: singleChatdata._id,
        };
        const apiRes = await ApiService(
          apiList.SINGLE_CHAT_MESSAGE,
          "POST",
          values
        );

        setMessages(apiRes);
      }
    };
    fetchData();
  }, [singleChatdata, userData,audioURL]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    function handler(event) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        modalRef.current &&
        !modalRef.current?.contains(event.target)
      ) {
        setShowPicker(false);
      }
    }
 
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [])
    
  return (
    <div
      className={
        !showChat
          ? "xl:w-[75%] w-[100%] border h-[100%] flex flex-col"
          : "hidden"
      }
      id="modal"
    >
      {singleChatdata === null ? (
        <EmptyChat handleBackButtonClick={handleBackButtonClick} />
      ) : (
        <>
          {/* Header */}
          <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
            <div className="flex items-center">
              <div
                className="flex xl:hidden  sm:mx-2 "
                onClick={handleBackButtonClick}
              >
                <ArrowBackIosIcon className="header_icon" />
              </div>
              <div>
                <img
                  className="w-10 h-10 rounded-full"
                  src={`${URLS?.IMAGE_URL}/${singleChatdata?.profile_image}`}
                />
              </div>
              <div className="ml-4">
                <p className="text-grey-darkest">{singleChatdata?.name}</p>
                <p className="text-grey-darker text-xs mt-1">
                  Tape here for Contact Info
                </p>
              </div>
            </div>
            <div className="sm:flex block">
              <div>
                <SearchIcon className="header_icon" />
              </div>

              <div className="sm:ml-6">
                <MoreVertSharpIcon className="header_icon" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ backgroundColor: "#DAD3CC" }}
          >
            <div className="py-2 px-3">
              <div className="flex justify-center mb-2">
                <div
                  className="rounded py-2 px-4"
                  style={{ backgroundColor: "#DDECF2" }}
                >
                  <p className="text-sm uppercase">February 20, 2018</p>
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <div
                  className="rounded py-2 px-4"
                  style={{ backgroundColor: "#FCF4CB" }}
                >
                  <p className="text-xs">
                    Messages to this chat and calls are now secured with
                    end-to-end encryption. Tap for more info.
                  </p>
                </div>
              </div>

              <div className="chat-messages">
                {messages?.map((message) => {
                  return (
                    <Message
                      key={uuidv4()}
                      message={message}
                      userData={userData}
                      singleChatdata={singleChatdata}
                      chosenEmoji={chosenEmoji}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {showPicker && (
            <div className="absolute sm:mt-[270px] mt-[364px]" ref={pickerRef}>
              <Picker
                pickerStyle={{ width: "100%" }}
                onEmojiClick={(emojiObject) =>
                  setChosenEmoji((prevMsg) => prevMsg + emojiObject.emoji)
                }
              />
            </div>
          )}

          {/* Input */}
          <div
            className="bg-grey-lighter px-4 py-4 flex items-center"
            ref={modalRef}
          >
            <div onClick={() => setShowPicker((val) => !val)}>
              <SentimentSatisfiedAltRoundedIcon className="header_icon" />
            </div>
            <div className="flex w-full mx-4 items-center  input-area">
              <input
                className="w-full border rounded px-2 py-2"
                type="text"
                value={chosenEmoji}
                placeholder="Say Something..."
                onChange={(e) => setChosenEmoji(e.target.value)}
              />
              <span className="mx-[-38px]" onClick={sendMessage}>
                {" "}
                <SendIcon />
              </span>
            </div>
            <div className="mr-4">
              <input
                type="file"
                onChange={(e) => handleFileChange(e)}
                id="contained-button-file"
                style={{ display: "none" }}
              />
              <label htmlFor="contained-button-file">
                <AttachmentTwoToneIcon className="header_icon" />
              </label>
            </div>
            <div>
              <VoiceRecorder setAudioURL={setAudioURL} audioURL={audioURL} setChosenEmoji={setChosenEmoji} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

WhatsappMessage.propTypes = {
  socket: PropTypes.any,
  handleBackButtonClick: PropTypes.any,
  showChat: PropTypes.any,
};

export default WhatsappMessage;
