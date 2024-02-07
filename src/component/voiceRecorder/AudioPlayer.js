import PropTypes from "prop-types";

const AudioPlayer = ({ audioBlob }) => {
  return (
    <div>
      {audioBlob && (
        <audio id="audio-element" controls >
          <source src={audioBlob} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

AudioPlayer.propTypes = {
  audioBlob: PropTypes.any,
};

export default AudioPlayer;
