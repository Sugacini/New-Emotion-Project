import style from "./emotions.module.css";

function Journel(){
    return(
        <>
            <textarea placeholder="Write your text here....." className={style.journel}></textarea>
            <button className={style.save}>Save</button>
        </>
    )
}

export default Journel;