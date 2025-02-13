import style from "./Features.module.css";

function Features(){
    return(
        <>
            <div className={style.container}>
                <div className={style.item}>
                    <i className="fa-solid fa-music" style={{color:'white', fontSize: "70px"}}></i>
                </div>
                <div className={style.item}>
                    <i className="fa-solid fa-book" style={{color:'white', fontSize: "70px"}}></i>
                </div>
                <div className={style.item}>
                    <i className="fa-solid fa-person-walking" style={{color:'white', fontSize: "70px"}}></i>
                    {/* <img src="/public/story1.jpg" /> */}
                </div>
                <div className={style.item}>
                    <p>Story</p>
                </div>
                <div className={style.item1}></div>
                <div className={style.item}>
                    <p>Quotes</p>
                </div>
                <div className={style.item}>
                    <i className="fa-solid fa-utensils" style={{color:'white', fontSize: "70px"}}></i>
                    {/* <img src="/public/quo.jpg" /> */}
                </div>
                <div className={style.item}>
                    <i className="fa-solid fa-clapperboard" style={{color:'white', fontSize: "70px"}}></i>
                </div>
                <div className={style.item}>
                    <i className="fa-solid fa-gamepad" style={{color:'white', fontSize: "70px"}}></i>
                </div>
            </div>
        </>
    )
}

export default Features;