import style from "./Journel.module.css";
import JournelOptions from "./JournelOptions";
import JournelLogo from "./JournelLogo";

function JournelHeader(){
    return(
        <div className={style.journelHeader}>
            <JournelLogo />
            <JournelOptions />
        </div>
    )
}

export default JournelHeader;