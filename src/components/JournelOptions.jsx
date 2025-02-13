import style from "./Journel.module.css";
import {useState} from "react";

function JournelOptions(){

    const [dynamic, setDiv] = useState([]);

    function dynamicDiv({id}){
        return (<div className={style.newDiv}></div>)
    }

    function createDiv(){
        const newComponent = <dynamicDiv key={dynamic.length} id={dynamic.length + 1} />
        setDiv=([...dynamic, newComponent]);
    }

    return(
        <>
        <div className={style.options}>
            <div className={style.create+" "+ style.option} onClick={createDiv}>
                <i className="fa-solid fa-square-plus" style={{fontSize: "35px", color: "black"}}></i>
            </div>
            <div className={style.search+" "+ style.option}>
                <i className="fa-solid fa-magnifying-glass" style={{fontSize: "27px", color: "black"}}></i>
            </div>
            <div className={style.trash+" "+ style.option}>
                <i className="fa-regular fa-trash-can" style={{fontSize: "27px", color: "black"}}></i>
            </div>
            <div className={style.setting+" "+ style.option}>
                <i className="fa-solid fa-gear" style={{fontSize: "29px", color: "black"}}></i>
            </div>
            <div className={style.profile+" "+ style.option}>
                <div className={style.innerProfile}>
                    <i className="fa-solid fa-user" style={{fontSize: "20px", color: "black"}}></i>
                </div>
            </div>
        </div>

        <div className={style.container}>
            {dynamic}
        </div>
        </>
    )
}

export default JournelOptions;