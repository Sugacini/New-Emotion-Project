import style from "./Journel.module.css";
import {useState} from "react";

function JournelOptions(){

    const [dynamic, setDiv] = useState([]);

    function dynamicDiv({id}){
        return (<div className={style.newDiv}></div>)
    }

    function createDiv(){
        // const newComponent = <dynamicDiv key={dynamic.length} id={dynamic.length + 1} />
        // setDiv=([...dynamic, newComponent]);
    }

    return(
        <>
        

        <div className={style.journelContainer}>
            {dynamic} 
        </div>
        </>
    )
}

export default JournelOptions;