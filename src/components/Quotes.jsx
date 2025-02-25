// import "../Home.css";
// import { useState } from "react";
// import { FaQuoteLeft, FaQuoteRight, FaBookOpen } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import Story from "./Story";
// import { useLocation } from "react-router-dom";

// let count = 0;

// function Quotes(){

//     const navigate = useNavigate();
//     const[quotes, setQuotes] = useState("");
//     const[author, setAuthor] = useState("");

//     const location = useLocation();
//     const result = location.state;
//     const data1 = (JSON.stringify(result.findEmo));
//     const finalEmo = data1.slice(1, data1.length - 1);

//     async function nextQuoHandler(){
//         try{
//             let response = await fetch("https://api.paperquotes.com/apiv1/quotes/?tags=happy");
//             if(!response.ok){
//                 throw new Error("error")
//             }
//             let value = response.json();
//             let value1 = await value.then();
//             let finalValue = value1.results;
//             let final = finalValue[Math.floor(Math.random() * (finalValue.length))];
//             setQuotes(final.quote)
//             setAuthor(final.author);
//             console.log(finalValue);
//         }
//         catch(err){
//             console.log(err);
//         }
        
//     }

//     if(count == 0){
//         nextQuoHandler();
//         count++;
//     }

//     return(
//         <div className="quotesDiv">
//             <div className="naviHead" onClick={() => {navigate("/Story"), {state: {findEmo: finalEmo}}}}>
//                 <div className="sto">
//                     <FaBookOpen className="iconSize"></FaBookOpen>
//                 </div>
//             </div>
//             <div className="quotesHeading">QUOTES</div>
//             <div className="quotes">
//                 <div className="quotes1">

//                     <div className="setQuo1">
//                         <FaQuoteLeft className="quoIcon" />
//                     </div>

//                     <p className="setQuo">
//                         {quotes}
//                         <FaQuoteRight  className="quoIcon1"/>
//                     </p>
                        
//                 </div>
//                 {author?<p className="authorOfQuo">-{author}</p>:<p className="authorOfQuo"></p>} 
//             </div>
//             <button className="nextQuoBtn" onClick={nextQuoHandler}>NEXT</button>
//         </div>
//     )
// }

// export default Quotes;


























// try{
//     let response = await fetch("https://api.api-ninjas.com/v1/quotes?X-Api-Key=d9ypSD8HSMRq0ypI8Lvm2A==KwwaQzvqwxKHfqY6");
//     if(!response.ok){
//         throw new Error("error")
//     }
//     response.json().then((res) => {
//         if(res[0].quote.length <= 150){
//             console.log(res[0].quote.length);
//             setQuotes(res[0].quote);
//             setAuthor(res[0].author);
//         }
//         else{
//             nextQuoHandler();
//         }
        
//         console.log(res, res[0].quote, res[0].author);
//     })
// }
// catch(err){
//     console.log(err);
// }












import "../Home.css";
import { useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaBookOpen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";
import Story from "./Story";

let count = 0;

function Quotes(){

    const navigate = useNavigate();
    const[quotes, setQuotes] = useState("");
    const[author, setAuthor] = useState("");

    const location = useLocation();
    const data = location.state;
    console.log(data);
    const data1 = (JSON.stringify(data.emo))
    console.log(data1)
    const finalEmo = data1.slice(1,data1.length-1);
    console.log(finalEmo);

    async function nextQuoHandler(){
        try{
            let response = await fetch("https://api.paperquotes.com/apiv1/quotes/?tags=happy");
            if(!response.ok){
                throw new Error("error")
            }
            let value = response.json();
            let value1 = await value.then();
            let finalValue = value1.results;
            let final = finalValue[Math.floor(Math.random() * (finalValue.length))];
            setQuotes(final.quote)
            setAuthor(final.author);
            console.log(finalValue);
        }
        catch(err){
            console.log(err);
        }
        
    }

    if(count == 0){
        nextQuoHandler();
        count++;
    }

    return(
        <div className="quotesDiv">
            {console.log(finalEmo)}
            <div className="naviHead" >
                <div className="stoBack" onClick={() => {navigate("/features", {state: {findEmo: finalEmo}})}}>
                    <FaLeftLong style={{fontSize: "50px"}}></FaLeftLong>
                </div>
                <div className="sto" onClick={() => {
                localStorage.setItem("emoData", JSON.stringify(finalEmo));
                navigate("/story", {state: {emo: finalEmo}})
            }}>
                    <FaBookOpen className="iconSize"></FaBookOpen>
                </div>
            </div>
            <div className="quotesHeading">QUOTES</div>
            <div className="quotes">
                <div className="quotes1">

                    <div className="setQuo1">
                        <FaQuoteLeft className="quoIcon" />
                    </div>

                    <p className="setQuo">
                        {quotes}
                        <FaQuoteRight  className="quoIcon1"/>
                    </p>
                        
                </div>
                {author?<p className="authorOfQuo">-{author}</p>:<p className="authorOfQuo"></p>} 
            </div>
            <button className="nextQuoBtn" onClick={nextQuoHandler}>NEXT</button>
        </div>
    )
}

export default Quotes;
