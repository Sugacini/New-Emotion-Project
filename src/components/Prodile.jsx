import style from "./emotions.module.css";

function Profile(){
    return(
        <div className={style.profileOuter}>
            <div className={style.play}>
                <img src="/public/play.png" className={style.playImg}></img>
            </div>
            <div className={style.profile}>
                <div className={style.innerImg}>
                    <img src="/public/profile.png"></img>
                </div>
            </div>
        </div>
    )
}

export default Profile;