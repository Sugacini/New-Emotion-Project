import "../Home.css";
import { useState } from "react";

let count = 0;

function Quotes(){

    const[quotes, setQuotes] = useState("");
    const[author, setAuthor] = useState("");

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
            <div className="quotesHeading">QUOTES</div>
            <div className="quotes">
                <div className="quotes1">

                    <div className="setQuo1">
                        <i className="fa-solid fa-quote-left" style={{fontSize: "60px", paddingRight: "15px"}}></i>
                    </div>

                    <p className="setQuo">
                        {quotes}
                        <i className="fa-solid fa-quote-right"  style={{fontSize: "60px", paddingLeft: "15px", margin: "3% 0 0 3%", position: "absolute"}}></i>
                    </p>
                        
                </div>
                <p className="authorOfQuo">-{author}</p>
            </div>
            <button className="nextQuoBtn" onClick={nextQuoHandler}>NEXT</button>
        </div>
    )
}

export default Quotes;





















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