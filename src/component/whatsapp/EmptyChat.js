import { Box, styled, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import emptyChatImage from "../../assets/image/whatsapp_multi_device_support_update_image_1636207150180.webp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Component = styled(Box)`
  background: #f8f9fa;
  padding: 30px 0;
  text-align: center;
  height: 100%;
`;


const Image = styled("img")`
  margin-top: 25px 0 10px 0;
  width: 400,
`;
const Title = styled(Typography)`

  font-family: inherit;
  font-weight: 300;
  color: #41525d;
  margin-top: 25px 0 10px 0;
`;

const SubTitle = styled(Typography)`
  font-size: 14px;
  color: #667781;
  font-weight: 400;
  font-family: inherit;
`;

const StyledDivider = styled(Divider)`
  margin: 40px 0;
  opacity: 0.4;
`;

const EmptyChat = ({ handleBackButtonClick }) => {
  return (
    <Component>
      {" "}
      <div className="flex xl:hidden  mx-8 " onClick={handleBackButtonClick}>
        <ArrowBackIosIcon className="header_icon" />
      </div>
      <div className="lg:px-[200px] px-0 pt-[100px] lg:pt-0">
        <Image src={emptyChatImage} alt="empty" />
        <Title className="sm:!text-[34px] !text-[24px] sm:py-[0px] py-[30px]">WhatsApp Web</Title>{" "}
        <SubTitle className="sm:p-[0px] px-[18px] sm:py-[0px] py-[10px]">
          Now send and receive messages without keeping your phone online.
        </SubTitle>{" "}
        <SubTitle  className="sm:p-[0px] px-[18px] sm:py-[0px] py-[10px]">
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.{" "}
        </SubTitle>
        <StyledDivider />{" "}
      </div>{" "}
    </Component>
  );
};

EmptyChat.propTypes = {
  handleBackButtonClick: PropTypes.any,
};

export default EmptyChat;
