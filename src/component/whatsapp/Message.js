import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import ImageViewer from "../imgViewer/ImageViewer";
import { useState } from "react";
import { URLS } from "../../API/UrlList";

const Message = ({ message, userData, singleChatdata }) => {
  const scrollRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [currImg, setCurrImg] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  const isImage = message.type === "image " || "images";

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const urlSegment =
    message.fromSelf && message.type === "images"
      ? message?.message
      : message?.message?.fileName;

  useEffect(() => {
    const imageUrl = `http://localhost:5000/public/image/${urlSegment}`;

    setImageUrls([imageUrl]);
  }, [urlSegment]);

  return (
    <div
      ref={scrollRef}
      className={`message 
                    ${message.fromSelf ? "sended" : "recieved"}`}
    >
      <div className="max-w-[30%]">
        <div className="rounded py-2 px-3 content ">
          <p className="text-sm">
            {message.fromSelf ? userData?.name : singleChatdata?.name}
          </p>
          {!isImage || message.type === "text" ? (
            <p className="break-all  mt-1">{message?.message}</p>
          ) : (
            <>
              <img
                className="h-[250px] w-[176px]  cursor-pointer"
                src={`${URLS?.BASE_URL}/public/image/${urlSegment}`}
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
};

export default Message;
