import Sidebar from "../Sidebar/Sidebar";
import WhatsappList from "../../component/whatsapp/WhatsappList";
import WhatsappMessage from "../../component/whatsapp/WhatsappMessage";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { URLS } from "../../API/UrlList";
import { useEffect, useState } from "react";

export const socket = io(URLS.SOCKETURL);

const Whatsapp = () => {
  const [showChat, setShowChat] = useState(true);

  const handleBackButtonClick = () => {

    setShowChat(val => !val);
  
  };
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setShowChat(true);
        setShowChat(val => !val);
      } 
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Sidebar>
      <div className="">
        <div
          className=" sm:h-[103px] h-[130px] mt-[11px] "
          style={{ backgroundColor: "#449388" }}
        />
        <div className=" sm:mt-[-112px] mt-[-139px]" >
          <div className="py-2">
            <div className={`block xl:flex border border-grey rounded shadow-lg ${!showChat ?"h-[800px]":" md:h-[800px]"} `}>
             <WhatsappList socket={socket} showChat={showChat} setShowChat={setShowChat}/>
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
