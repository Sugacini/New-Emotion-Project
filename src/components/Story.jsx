// import "../Home.css";
// import { useState } from "react";
// import { FaQuoteRight, FaLeftLong } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// let count = 0;

// function Story() {
//     const [story, setStory] = useState("");
//     const [title, setTitle] = useState("");
//     const [sAuthor, setAuthor] = useState("");
//     const [sMoral, setMoral] = useState("");

//     const navigate = useNavigate();

//     const location = useLocation();
//     const result = location.state;
//     const data1 = (JSON.stringify(result.emo1));
//     const finalEmo = data1.slice(1, data1.length - 1);

//     async function getStory() {
//         console.log("Enter");
//         let response = await fetch("https://shortstories-api.onrender.com/");
//         let res = response.json();
//         let res2 = await res.then();
//         setTitle(res2.title)
//         setStory(res2.story);
//         setAuthor(res2.author);
//         setMoral(res2.moral);
//     }

//     console.log(count);
//     if (count == 0) {
//         console.log('printed');
//         getStory();
//         count++;
//     }

//     console.log(count);

//     return (
//         <div className="storyOuter">
//             <div className="stoHead">
//                 <div className="stoBack" onClick={() => { navigate("/features"), {state:{findEmo: finalEmo} }}}>
//                     <FaLeftLong style={{ fontSize: "50px" }}></FaLeftLong>
//                 </div>
//                 <div className="sto" onClick={() => { navigate("/quotes"), {state:{findEmo: finalEmo} } }}>
//                     <FaQuoteRight className="iconSize"></FaQuoteRight>
//                 </div>
//             </div>
//             <div className="storyHeader">Story </div>
//             <div className="story">
//                 <div className="sHead">
//                     <p className="storyHead">{title}</p>
//                     <p className="author">-{sAuthor}</p>

//                 </div>

//                 <p className="storyDiv">{story}</p>
//             </div>

//             <div className="moral">Moral: {sMoral}</div>
//             <button className="nextStory" onClick={getStory}>Next Story</button>
//         </div>
//     )
// }

// export default Story;











// async function story(){
//     console.log("Enter");
//     let response = await fetch("https://shortstories-api.onrender.com/");
//     let res = response.json();
//     let res2 = await res.then();
//     console.log(res);
//     console.log(res2.story);
// }

















import "../Home.css";
import { useState } from "react";
import { FaQuoteRight, FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

let count = 0;

function Story(){
    const [story, setStory] = useState("");
    const [title, setTitle] = useState("");
    const [sAuthor, setAuthor] = useState("");
    const [sMoral, setMoral] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const storedData = JSON.parse(localStorage.getItem("emoData"));
    console.log(storedData);
    const data = location.state || { emo: storedData };
    // const data = location.state;
    // const data1 = JSON.stringify(data);
    console.log(data);

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
        console.log('printed');
        getStory();
        count++;
    }
    
    console.log(count);

    return(
        <div className="storyOuter">
            <div className="stoHead">
                <div className="stoBack" onClick={() => {navigate("/features", {state: {findEmo: storedData}})}}>
                    <FaLeftLong style={{fontSize: "50px"}}></FaLeftLong>
                </div>
                <div className="sto" onClick={() => {navigate("/quotes")}}>
                    <FaQuoteRight className="iconSize"></FaQuoteRight>
                </div>
            </div>
            <div className="storyHeader">Story </div>
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