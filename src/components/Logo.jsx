import style from "./emotions.module.css";

function Logo(){
    return(
        <div className={style.logo}>
            <div className={style.image}>
                <img src="/public/fod.jpg" />
            </div>
            <div className={style.name}>NAVARASAM</div>
        </div>
    )
}

export default Logo;