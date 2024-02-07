
// import VoiceRecorder from '../../component/voiceRecorder/VoiceRecorder'
import Sidebar from '../Sidebar/Sidebar'

const Email = () => {

  return (
     <Sidebar>
   
   <div className='w-[50%] h-[250px] mt-[150px]'>
        <div>
          <audio controls>
            <source src="ce004870-e9ec-41a7-a3bf-8af35a9b1d41.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </Sidebar>
  )
}

export default Email
