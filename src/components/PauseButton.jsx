import { FaCirclePause } from "react-icons/fa6";

function PauseButton({playFirst, decreseParentsWidth, setFirstPlay, canPlay, setPlayStatus, setResume, resume }) {
    return (
        <FaCirclePause className='pauseNPlayInMain' title='Play all' onClick={()=>{
            console.log('clicked');

            if (!playFirst) {
            decreseParentsWidth();
            setFirstPlay(true);
            }
            if(canPlay && playFirst){ 
                setPlayStatus(false);
                setResume(!resume);
            }
            else if(resume==true){
                setPlayStatus(true);
                setResume(!resume);
            }
        }}/>
    )
}

export default PauseButton;