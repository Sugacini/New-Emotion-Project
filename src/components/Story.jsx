import "../Home.css";
import { useState } from "react";

let count = 0;

function Story(){

    const [story, setStory] = useState("");
    const [title, setTitle] = useState("");
    const [sAuthor, setAuthor] = useState("");
    const [sMoral, setMoral] = useState("");

    async function getStory(){
        console.log("Enter");
        let response = await fetch("https://shortstories-api.onrender.com/");
        let res = response.json();
        let res2 = await res.then();
        setTitle(res2.title)
        setStory(res2.story);
        setAuthor(res2.author);
        setMoral(res2.moral);
    }

    console.log(count);
    if(count == 0){
        getStory();
        count++;
    }
    
    console.log(count);

    return(
        <div className="storyOuter">
            <div className="storyHeader">STORY</div>
            <div className="story">
                <div className="sHead">
                    <p className="storyHead">{title}</p>
                    <p className="author">-{sAuthor}</p>

                    </div>
                    
                    <p className="storyDiv">{story}</p>
                </div>
            
            <div className="moral">Moral: {sMoral}</div>
            <button className="nextStory" onClick={getStory}>Next Story</button>
        </div>
    )
}

export default Story;



// async function story(){
//     console.log("Enter");
//     let response = await fetch("https://shortstories-api.onrender.com/");
//     let res = response.json();
//     let res2 = await res.then();
//     console.log(res);
//     console.log(res2.story);
// }