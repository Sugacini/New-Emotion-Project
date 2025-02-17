import style from "./Features.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Features() {

    const navigate = useNavigate();

    function quotesHandler() {
        navigate("/quotes");
    }

    function journelHandler() {
        navigate("/journel");
    }

    function storyHandler() {
        navigate("/story");
    }

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

                <div className={style.item1}></div>

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