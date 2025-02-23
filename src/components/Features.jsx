import style from "./Features.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ChatBot from "./ChatBot";
import { FaRobot, FaMusic, FaBook, FaQuoteRight, FaUtensils, FaClapperboard, FaGamepad, FaBookOpen, FaFilePen, FaLeftLong} from "react-icons/fa6";

let count = 0;

function Features() {
    const setImg = useRef();

    const [emoImg, setEmoImg] = useState("");
    const location = useLocation();
    const data = location.state;
    const data1 = (JSON.stringify(data.findEmo));
    const finalEmo = data1.slice(1, data1.length - 1);
    const finalEmo1 = finalEmo.toUpperCase();
    console.log(JSON.stringify(data.findEmo), finalEmo);

    const navigate = useNavigate();

    if (count == 0) {
        setImg.current = finalEmo + ".png";
        console.log(setImg.current)
        setEmoImg(finalEmo + ".png");
        count++;
    }


    function quotesHandler() {
        navigate("/quotes", {state: {emo: (finalEmo)}});
    }

    function journelHandler() {
        navigate("/journel");
    }

    // function storyHandler() {
    //     navigate("/story");
    // }

    function musicHandler() {
        navigate("/music", { state: { emo: (finalEmo) } });
    }

    function chatBotHandler() {
        navigate("/chatBot", { state: { emo1: (finalEmo) } });
    }

    console.log(setImg.current, emoImg, data1);
    return (

        <div className={style.featureOuter} >
            <div className={style.featureHead}>
                <div className={style.backIcon} onClick={() => {navigate("/home")}}>
                    <FaLeftLong className={style.leftIcon}></FaLeftLong>
                </div>
                
            </div>
            <div className={style.featureContainer}>

                <div className={`${style.item} ${style.feature1}`} onClick={musicHandler} title="Songs">
                    <FaMusic className={style.icons} />
                </div>

                <div className={`${style.item} ${style.feature2}`} onClick={journelHandler} title="Writing Journel">
                    <FaFilePen className={style.icons} />
                </div>

                <div className={`${style.item} ${style.feature3}`} onClick={quotesHandler} title="Quotes">
                    <FaQuoteRight className={style.icons} />
                </div>

                <div className={`${style.item} ${style.feature4}`} title="Story">
                    <FaBookOpen className={style.icons} />
                </div>

                {/* {setImg.current ? <div className={style.item1} style={{ backgroundImage: `url(fear1.png)` }}>
                </div> : <div className={style.item1} style={{ backgroundImage: `url(${setImg.current})` }}> {finalEmo1} </div>} */}

                {setImg.current?<div className={style.item1} style={{backgroundImage: `url(${setImg.current})`}}>
                </div>:<div className={style.item1} style={{backgroundImage: `url(${setImg.current})`}}> {finalEmo1} </div>}




                <div className={`${style.item} ${style.feature5}`} title="Food">
                    <FaUtensils className={style.icons} />
                </div>

                <div className={`${style.item} ${style.feature6}`} onClick={chatBotHandler} title="Chating">
                    <FaRobot className={style.icons} />
                </div>

                <div className={`${style.item} ${style.feature7}`} title="Games">
                    <FaGamepad className={style.icons} />
                </div>

            </div>
            {/* </Router> */}
        </div>
    )
}

export default Features;























// import style from "./Features.module.css";
// import { BrowserRouter as Router, Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import ChatBot from "./ChatBot";
// import { FaRobot, FaMusic, FaBook, FaQuoteRight, FaUtensils, FaClapperboard, FaGamepad, FaBookOpen, FaFilePen, FaYammer } from "react-icons/fa6";

// let count = 0;

// function Features() {
//     const setImg = useRef();

//     const [emoImg, setEmoImg] = useState("");
//     const location = useLocation();
//     const data = location.state;
//     const data1 = (JSON.stringify(data.findEmo));
//     const finalEmo = data1.slice(1, data1.length - 1);
//     const finalEmo1 = finalEmo.toUpperCase();
//     console.log(JSON.stringify(data.findEmo), finalEmo);

//     const navigate = useNavigate();

//     if (count == 0) {
//         setImg.current = finalEmo + ".png";
//         console.log(setImg.current)
//         setEmoImg(finalEmo + ".png");
//         count++;
//     }


//     function quotesHandler() {
//         navigate("/quotes");
//     }

//     function journelHandler() {
//         navigate("/journel");
//     }

//     // function storyHandler() {
//     //     navigate("/story");
//     // }

//     function musicHandler() {
//         navigate("/music", { state: { emo: (finalEmo) } });
//     }

//     function chatBotHandler() {
//         navigate("/chatBot", { state: { emo1: (finalEmo) } });
//     }

//     console.log(setImg.current, emoImg, data1);
//     return (

//         <div className={style.featureOuter} >
//             <div className={style.featureContainer}>

//                 <div className={`${style.item} ${style.feature1}`} onClick={musicHandler} title="Songs">
//                     <FaMusic className={style.icons} />
//                 </div>

//                 <div className={`${style.item} ${style.feature2}`} onClick={journelHandler} title="Writing Journel">
//                     <FaFilePen className={style.icons} />
//                 </div>

//                 <div className={`${style.item} ${style.feature3}`} onClick={quotesHandler} title="Quotes">
//                     <FaQuoteRight className={style.icons} />
//                 </div>

//                 <div className={`${style.item} ${style.feature4}`} title="Story">
//                     <FaBookOpen className={style.icons} />
//                 </div>

//                 {/* {setImg.current ? <div className={style.item1} style={{ backgroundImage: `url(fear1.png)` }}>
//                 </div> : <div className={style.item1} style={{ backgroundImage: `url(${setImg.current})` }}> {finalEmo1} </div>} */}

//                 {setImg.current?<div className={style.item1} style={{backgroundImage: `url(${setImg.current})`}}>
//                 </div>:<div className={style.item1} style={{backgroundImage: `url(${setImg.current})`}}> {finalEmo1} </div>}




//                 <div className={`${style.item} ${style.feature5}`} title="Food">
//                     <FaUtensils className={style.icons} />
//                 </div>

//                 <div className={`${style.item} ${style.feature6}`} onClick={chatBotHandler} title="Chating">
//                     <FaRobot className={style.icons} />
//                 </div>

//                 <div className={`${style.item} ${style.feature7}`} title="Games">
//                     <FaGamepad className={style.icons} />
//                 </div>

//             </div>
//             {/* </Router> */}
//         </div>
//     )
// }

// export default Features;