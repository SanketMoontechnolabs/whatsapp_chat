
import Sidebar from "../Sidebar/Sidebar";
import WhatsappList from "../../component/whatsapp/WhatsappList";
import WhatsappMessage from "../../component/whatsapp/WhatsappMessage";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { URLS } from "../../API/UrlList";

export const socket = io(URLS.SOCKETURL);
const Whatsapp = () => {
  
  return (
    <Sidebar>
   
    <div className="">  
      <div
        className=" h-[103px] mt-[11px] "
        style={{ backgroundColor: "#449388" }}
      />
      <div className=" " style={{ marginTop: "-112px" }}>
        <div className="py-2">
          <div className="flex border border-grey rounded shadow-lg h-[800px] ">
            <WhatsappList socket={socket} />
            <WhatsappMessage socket={socket}/>
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


