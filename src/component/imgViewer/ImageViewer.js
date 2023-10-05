import ImgsViewer from "react-images-viewer";
import PropTypes from "prop-types";
const ImageViewer = ({ currImg, isOpen, setCurrImg, setIsOpen ,imageUrls}) => {

    console.log("imageUrls",imageUrls);
  return (
    <div className="">
      <ImgsViewer
        imgs={imageUrls.map((src) => ({ src }))}
        currImg={currImg}
        showThumbnails={true}
        isOpen={isOpen}
        onClickPrev={() => setCurrImg( currImg - 1)}
        onClickNext={() => setCurrImg( currImg + 1)}
        onClickThumbnail={(index) => setCurrImg(index)}
        onClose={() => setIsOpen(false)}
        backdropCloseable={true}
      />
    </div>
  );
};

ImageViewer.propTypes = {
  currImg: PropTypes.any,
  isOpen: PropTypes.any,
  setCurrImg: PropTypes.any,
  setIsOpen: PropTypes.any,
  imageUrls: PropTypes.any,
};

export default ImageViewer;
