import style from "./Journel.module.css";

function JournelLogo(){
    return(
        <>
            <div className={style.logo}>
                <div className={style.logo1}>
                    <div className={style.image}></div>
                </div>
                <div className={style.name}>Journel</div>
            </div>
        </>
    )
}

export default JournelLogo;