import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";
import { useState, useEffect } from "react";
import MicOffIcon from "@mui/icons-material/MicOff";

import PropTypes from "prop-types";
// import AudioPlayer from "./AudioPlayer";


const VoiceRecorder = ({audioURL,setAudioURL,setChosenEmoji}) => {

  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
 

  useEffect(() => {
    if (mediaRecorder) {
      let tempChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          tempChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audiodata = new Blob(tempChunks, {
          type: "audio/mpeg",
        });
        const audioUrl = URL.createObjectURL(audiodata);
        setAudioURL(audioUrl);
      };
    }
    setChosenEmoji(audioURL)
  }, [mediaRecorder,setAudioURL,audioURL,setChosenEmoji]);

  const startRecording = async () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setRecording(true);
        setMediaRecorder(mediaRecorder);
      })
      .catch((error) => {
        console.log(45,error);
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  

console.log(68,audioURL);
  return (
    <div>
      {!recording ? (
        <KeyboardVoiceRoundedIcon onClick={startRecording} disabled={recording}>
          Start Recording
        </KeyboardVoiceRoundedIcon>
      ) : (
        <MicOffIcon onClick={stopRecording}>Stop Recording</MicOffIcon>
      )}

      {/* {audioURL && (
      <AudioPlayer audioBlob={audioURL}/>
      )}  */}

      
    </div>
  );
};


VoiceRecorder.propTypes = {
  audioURL: PropTypes.any,
  setAudioURL: PropTypes.any,
  setChosenEmoji: PropTypes.any,
 
};


export default VoiceRecorder;
