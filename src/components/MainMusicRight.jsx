import { FaCirclePause, FaCirclePlay, FaBackwardStep, FaForwardStep} from "react-icons/fa6";

function MainMusicRight({canPlay, setPlayStatus, resume, setResume, songObjArr, totalSongsNum, songSelectedIdx, setSelectSong}) {
    return(
        
        <div className="rightOfMusic">
            <div className="songImgAndControls">
                <div className="songImg" style={{background: `linear-gradient(rgba(255, 255, 255, 0) 60%,black 100%), url(${songObjArr[songSelectedIdx].image[2].url})`, backgroundSize:"cover"}}></div>
                <div className="songControlls">
                    <FaBackwardStep className="songControlButtons" onClick={()=>setSelectSong((songSelectedIdx!=0)?songSelectedIdx-1:totalSongsNum-1)}/>
                    <div className="playNPause songControlButtons" onClick={()=>{
                        if(canPlay){ 
                            setPlayStatus(false);
                            setResume(!resume);
                        }
                        else if(resume==true){
                            setPlayStatus(true);
                            setResume(!resume);
                        }
                    }}>
                        {resume?<FaCirclePlay />:<FaCirclePause />}
                    </div>
                    <FaForwardStep className="songControlButtons" onClick={()=>setSelectSong((songSelectedIdx!=(totalSongsNum-1))?songSelectedIdx+1:0)}/>
                </div>
            </div>
            <h4>{songObjArr[songSelectedIdx].name}</h4>
            <div className="artistsBox">
                <h4>Credits</h4>
                {songObjArr[songSelectedIdx].artists.all.map((artist)=>{
                    return <div className="artistsNames">
                        <p>{artist.name}</p>
                        <p className="role">{artist.role}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default MainMusicRight;