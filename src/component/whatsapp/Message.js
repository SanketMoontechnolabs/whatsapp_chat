import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import ImageViewer from "../imgViewer/ImageViewer";
import { useState } from "react";
import { URLS } from "../../API/UrlList";
import AudioPlayer from "../voiceRecorder/Audioplayer";

const Message = ({ message, userData, singleChatdata, chosenEmoji }) => {
  const scrollRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [currImg, setCurrImg] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  // const isImage = message.type === "image " || "images";

  const urlSegment =
    message.fromSelf && message.type === "images"
      ? message?.message
      : message?.message?.fileName;

  useEffect(() => {
    if (!chosenEmoji) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chosenEmoji]);
  useEffect(() => {
    const imageUrl = `${URLS?.IMAGE_URL}/image/${urlSegment}`;

    setImageUrls([imageUrl]);
  }, [urlSegment]);

  useEffect(() => {
    if (
      typeof message?.message === "string" &&
      message?.message.includes("blob")
    ) {
      const audioElement = document.getElementById("audio-element");
      if (audioElement) {
        audioElement.src = message?.message;
      }

      return () => {
        URL.revokeObjectURL(message?.message);
      };
    }
  }, [message?.message]);

  return (
    <div
      className={`message 
                    ${message.fromSelf ? "sended" : "recieved"}`}
    >
      <div className="sm:max-w-[30%] " ref={scrollRef}>
        <div className="rounded py-2 px-3 content ">
          <p className="text-sm">
            {message.fromSelf ? userData?.name : singleChatdata?.name}
          </p>
          {message.type === "text" ? (
            <p className="break-all sm:text-[1.1rem] text-sm  mt-1">
              {message?.message}
            </p>
          ) : message?.type === "voice" ? (
            <div>
              <AudioPlayer audioBlob={message?.message} />
            </div>
          ) : (
            <>
              <img
                className="sm:h-[250px] sm:w-[176px] h-[100px] w-[100px] cursor-pointer"
                src={`${URLS?.IMAGE_URL}/image/${urlSegment}`}
                onClick={() => {
                  setIsOpen(true);
                  setCurrImg(0);
                }}
              />

              {isOpen && (
                <ImageViewer
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  currImg={currImg}
                  setCurrImg={setCurrImg}
                  imageUrls={imageUrls}
                />
              )}
            </>
          )}
          <p className="text-right text-xs text-grey-dark mt-1">
            {moment(message?.timestamp).format("h:mm a")}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.any,
  userData: PropTypes.any,
  singleChatdata: PropTypes.any,
  chosenEmoji: PropTypes.any,
};

export default Message;
