import Sidebar from "../Sidebar/Sidebar";
import WhatsappList from "../../component/whatsapp/WhatsappList";
import WhatsappMessage from "../../component/whatsapp/WhatsappMessage";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { URLS } from "../../API/UrlList";
import { useEffect, useState } from "react";

export const socket = io(URLS.SOCKETURL);
console.log(10, socket);
const Whatsapp = () => {
  const [showChat, setShowChat] = useState(true);

  const handleBackButtonClick = () => {

    setShowChat(val => !val);
  
  };
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setShowChat(false);
      } else {
        setShowChat(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(17,showChat);
  return (
    <Sidebar>
      <div className="">
        <div
          className=" h-[103px] mt-[11px] "
          style={{ backgroundColor: "#449388" }}
        />
        <div className=" " style={{ marginTop: "-112px" }}>
          <div className="py-2">
            <div className="block xl:flex border border-grey rounded shadow-lg h-[800px] ">
             <WhatsappList socket={socket} showChat={showChat}/>
                <WhatsappMessage socket={socket} handleBackButtonClick={handleBackButtonClick} showChat={showChat}  />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

Whatsapp.propTypes = {
  socket: PropTypes.any,
};

export default Whatsapp;
