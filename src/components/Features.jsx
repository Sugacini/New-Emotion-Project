import style from "./Features.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState , useRef} from "react";
import { useLocation } from "react-router-dom";
import ChatBot from "./ChatBot";
import { FaRobot } from "react-icons/fa6";

let count = 0;

function Features() {
    const setImg = useRef();

    const[emoImg, setEmoImg] = useState("");
    const location = useLocation();
    const data = location.state;
    const data1 = (JSON.stringify(data.findEmo));
    const finalEmo = data1.slice(1,data1.length-1);
    const finalEmo1 = finalEmo.toUpperCase();
    console.log(JSON.stringify(data.findEmo), finalEmo);

    const navigate = useNavigate();
    
    if(count == 0){
        setImg.current = finalEmo+".png";
        console.log(setImg.current)
        setEmoImg(finalEmo+".png");
        count++;
    }
    

    function quotesHandler() {
        navigate("/quotes");
    }

    function journelHandler() {
        navigate("/journel");
    }

    function storyHandler() {
        navigate("/story");
    }

    function musicHandler(){
        navigate("/music", {state: {emo:(finalEmo)}});
    }

    function chatBotHandler(){
        navigate("/chatBot",{state: {emo1:(finalEmo)}});
    }

    console.log(setImg.current, emoImg, data1);
    return (
        
        <>
            <div className={style.featureContainer}>

                <div className={`${style.item} ${style.feature1}`} onClick={musicHandler}>
                    <i className="fa-solid fa-music" style={{ color: 'white', fontSize: "70px" }}></i>
                </div>

                <div className={`${style.item} ${style.feature2}`} onClick={journelHandler}>
                    <i className="fa-solid fa-book" style={{ color: 'white', fontSize: "70px" }}></i>
                </div>

                {/* <div className={style.item}>
                    <i className="fa-solid fa-person-walking" style={{ color: 'white', fontSize: "70px" }}></i>
                </div> */}

                <div className={`${style.item} ${style.feature3}`} onClick={quotesHandler}>
                <i className="fa-solid fa-quote-right" style={{ color: 'white', fontSize: "70px" }}></i>
                    {/* <p className={style.feature}>Quotes</p> */}
                </div>

                <div className={`${style.item} ${style.feature4}`} onClick={storyHandler}>
                    <p className={style.feature}>Story</p>
                </div>

                {setImg.current?<div className={style.item1} style={{backgroundImage: `url(fear1.png)`}}>
                </div>:<div className={style.item1} style={{backgroundImage: `url(${setImg.current})`}}> {finalEmo1} </div>}

                {/* {setImg.current?<div className={style.item1} style={{backgroundImage: `url(${setImg.current})`}}>
                </div>:<div className={style.item1} style={{backgroundImage: `url(${setImg.current})`}}> {finalEmo1} </div>} */}
                

                

                <div className={style.item}>
                    <i className="fa-solid fa-utensils" style={{ color: 'white', fontSize: "70px" }}></i>
                </div>

                <div className={style.item} onClick={chatBotHandler}>
                    <FaRobot className="fa-solid fa-clapperboard" style={{ color: 'white', fontSize: "70px" }} />
                </div>

                <div className={style.item}>
                    <i className="fa-solid fa-gamepad" style={{ color: 'white', fontSize: "70px" }}></i>
                </div>

            </div>
            {/* </Router> */}
        </>
    )
}

export default Features;














// import style from "./Features.module.css";

// function Features(){
//     return(
//         <>
//             <div className={style.container}>
//                 <div className={style.item}>
//                     <i className="fa-solid fa-music" style={{color:'white', fontSize: "70px"}}></i>
//                 </div>
//                 <div className={style.item}>
//                     <i className="fa-solid fa-book" style={{color:'white', fontSize: "70px"}}></i>
//                 </div>
//                 <div className={style.item}>
//                     <i className="fa-solid fa-person-walking" style={{color:'white', fontSize: "70px"}}></i>
//                     {/* <img src="/public/story1.jpg" /> */}
//                 </div>
//                 <div className={style.item}>
//                     <p>Story</p>
//                 </div>
//                 <div className={style.item1}></div>
//                 <div className={style.item}>
//                     <p>Quotes</p>
//                 </div>
//                 <div className={style.item}>
//                     <i className="fa-solid fa-utensils" style={{color:'white', fontSize: "70px"}}></i>
//                     {/* <img src="/public/quo.jpg" /> */}
//                 </div>
//                 <div className={style.item}>
//                     <i className="fa-solid fa-clapperboard" style={{color:'white', fontSize: "70px"}}></i>
//                 </div>
//                 <div className={style.item}>
//                     <i className="fa-solid fa-gamepad" style={{color:'white', fontSize: "70px"}}></i>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Features;