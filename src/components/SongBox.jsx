import { useState } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";

function SongBox({idx,imgUrl,name,artists,production,duration,language,setSelectSong,songSelectedIdx,setPlayStatus, canPlay, playFirst, setFirstPlay, resume, setResume, decreseParentsWidth}) {
    var [isHovered,setHovered]=useState(false);
    return(
        <div className="songBox" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={()=>{
            
                if (!playFirst) {
                    
                    decreseParentsWidth();
                    console.log(1);
                    
                    setFirstPlay(true);
                }

                if (songSelectedIdx!=(idx-1)) {
                    console.log(2);

                    setSelectSong(idx-1);
                    setPlayStatus(true);
                    setResume(false);
                }
                else if(canPlay && playFirst){ 
                    console.log(3);

                    setPlayStatus(false);
                    setResume(!resume);
                }
                else if(resume==true){
                    console.log(4);
                    
                    setPlayStatus(true);
                    setResume(!resume);
                }

        }} style={((songSelectedIdx==idx-1) && playFirst)?{backgroundColor:"#bcb9c9"}:(!isHovered)?{backgroundColor:"transparent"}:{backgroundColor:"#e9e9e9"}}>
            {playFirst?((!canPlay && songSelectedIdx==idx-1)?<FaCirclePlay />:((songSelectedIdx==idx-1)?<FaCirclePause />:((!isHovered) ?<p>{(idx+"").length<2?"0"+idx:idx}</p>:<FaCirclePlay />))):<p>{(idx+"").length<2?"0"+idx:idx}</p>}   
            <img src={imgUrl} alt="" className="smlSongImg"/>
            <div className="titleSpace">
                <p>{name+" ["+language+']'}</p>
                <p className="opacity">{artists}</p>
            </div>
            <p className="productionSpace">{production}</p>
            <p>{Math.floor(duration/60)+":"+ (((duration%60)+"").length<2?"0"+(duration%60):(duration%60))}</p>
        </div>
    )
}

export default SongBox;