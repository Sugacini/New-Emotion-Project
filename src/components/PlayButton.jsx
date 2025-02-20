import { FaCirclePlay } from "react-icons/fa6";

function PlayButton({playFirst, decreseParentsWidth, setFirstPlay, canPlay, setPlayStatus, setResume, resume }) {
    return (
        <FaCirclePlay className='pauseNPlayInMain' title='Play all' onClick={()=>{
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

export default PlayButton;