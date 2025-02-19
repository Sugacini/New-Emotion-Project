import style from "./Features.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState , useRef} from "react";
import { useLocation } from "react-router-dom";
let count = 0;

function Features() {
    const setImg = useRef();
    let setNewImg;

    const[emoImg, setEmoImg] = useState("");
    const location = useLocation();
    const data = location.state;
    const data1 = (JSON.stringify(data.findEmo));
    const finalEmo = data1.slice(1,data1.length-1);
    console.log(JSON.stringify(data.findEmo), finalEmo);

    const navigate = useNavigate();
    let emotionsArr = ["angry", "disguasted", "fear", "happy", "neutral", "sad", "surprised"];
    let emoArray = ["angry1.png", "emoDisguasted.png", "emoFear.png", "emoHappy.png", "emoNuetral.png", "emoSad.png", "emoSurprise.png"];

    if(count == 0){
        for(let i=0; i<emotionsArr.length; i++){
            console.log("Enter for");
            console.log(emotionsArr[i])
            console.log(emotionsArr[i] == data1);
            if(emotionsArr[i] == finalEmo){
                let idxVal = emotionsArr.indexOf(emotionsArr[i]);
                let findEmoVal = emoArray[idxVal];
                console.log("enter if")
                setEmoImg(findEmoVal);
                setImg.current = findEmoVal;
                setNewImg=findEmoVal;
                break;
            }
        }
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
    console.log(setImg.current, emoImg, setNewImg, data1);
    return (
        
        <>
            <div className={style.featureContainer}>

                <div className={style.item}>
                    <i className="fa-solid fa-music" style={{ color: 'white', fontSize: "70px" }}></i>
                </div>

                <div className={style.item} onClick={journelHandler}>
                    <i className="fa-solid fa-book" style={{ color: 'white', fontSize: "70px" }}></i>
                </div>

                <div className={style.item}>
                    <i className="fa-solid fa-person-walking" style={{ color: 'white', fontSize: "70px" }}></i>
                </div>

                <div className={style.item} onClick={quotesHandler}>
                    <p className={style.feature}>Quotes</p>
                </div>

                <div className={style.item1} style={{backgroundImage: `url(${setImg.current})`}}>
                    {/* <img src="/angry1.png" style={{width: "200px", height: "200px"}}></img> */}
                </div>

                <div className={style.item} onClick={storyHandler}>
                    <p className={style.feature}>Story</p>
                </div>

                <div className={style.item}>
                    <i className="fa-solid fa-utensils" style={{ color: 'white', fontSize: "70px" }}></i>
                </div>

                <div className={style.item}>
                    <i className="fa-solid fa-clapperboard" style={{ color: 'white', fontSize: "70px" }}></i>
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