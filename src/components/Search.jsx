import style from "./emotions.module.css";

function Search(){
    return(
        <div className={style.searchOuter}>
            <input type="search" className={style.search} placeholder="Search"></input>
            <img src="/public/search.png" className={style.searchImg}></img>
            {/* <div className={style.searchImg}></div> */}
        </div>
    )
}

export default Search;