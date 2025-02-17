import style from "./Journel.module.css";
import {useState} from "react";
import { useRef } from "react";

function JournelLogo() {

    const createTextDiv = useRef();

    const [count, setCount] = useState(0);

    function createDiv(){
        setCount(count+1);
        let newDiv = document.createElement("div");
        newDiv.contentEditable=true
        newDiv.textContent=count;
        newDiv.className="textDiv";
        newDiv.style.width = "95%";
        newDiv.style.padding = "2%";
        newDiv.style.fontSize = "1.5em";
        newDiv.style.height = "500px";
        newDiv.style.margin = "auto";
        newDiv.style.marginTop = "2%";
        newDiv.style.backgroundColor = "grey";
        newDiv.style.overflow = "scroll";
        createTextDiv.current.append(newDiv);
    }

    return (
        <>
            <div className={style.journelHeader}>
                <div className={style.logo}>
                    <div className={style.logo1}>
                        <div className={style.image}></div>
                    </div>
                    <div className={style.name}>Journel</div>
                </div>

                <div className={style.options}>
                    <div className={style.create + " " + style.option} onClick={createDiv}>
                        <i className="fa-solid fa-square-plus" style={{ fontSize: "35px", color: "black" }}></i>
                    </div>
                    <div className={style.search + " " + style.option}>
                        <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "27px", color: "black" }}></i>
                    </div>
                    <div className={style.trash + " " + style.option}>
                        <i className="fa-regular fa-trash-can" style={{ fontSize: "27px", color: "black" }}></i>
                    </div>
                    <div className={style.setting + " " + style.option}>
                        <i className="fa-solid fa-gear" style={{ fontSize: "29px", color: "black" }}></i>
                    </div>
                    <div className={style.profile + " " + style.option}>
                        <div className={style.innerProfile}>
                            <i className="fa-solid fa-user" style={{ fontSize: "20px", color: "black" }}></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.journelContainer} ref={createTextDiv}></div>
        </>
    )
}

export default JournelLogo;


















// import style from "./Journel.module.css";
// import JournelOptions from "./JournelOptions";
// import JournelLogo from "./JournelLogo";

// function JournelHeader(){
//     return(
//         <div className={style.journelHeader}>
//             <JournelLogo />
//         </div>
//     )
// }

// export default JournelHeader;