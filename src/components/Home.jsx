import "../Home.css"
import { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { Link , useNavigate} from "react-router-dom";
import Features from "./Features";

function Home(){

    const navigate = useNavigate();

    const[isEmotion, setEmotion] = useState(true);
    const srcVal = useRef();
    const canvasDetect = useRef();
    const detectMessage = useRef();
    let localStream;
    
    async function uploadFiles(){
        try{
    
            await Promise.all(
                [
                    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
                    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
                ]
            )
            console.log("Uploaded");
        }
        catch(err){
            console.log("Error: "+err);
        }
    }

    uploadFiles();

    // async function videoHandler(){
        console.log("Enter");
        const getUserMediaStream = async () => {
            console.log("Enter the async")
            try{
                localStream = await (navigator.mediaDevices.getUserMedia({video: true}));
                if (srcVal.current) {
                    srcVal.current.srcObject = localStream;
                  } 
            } 
            catch (err) {
              console.error("Error accessing webcam:", err);
            }
        }
        getUserMediaStream();

        // return () => {
            if (srcVal.current?.srcObject) {
              const tracks = srcVal.current.srcObject.getTracks();
              tracks.forEach(track => track.stop());
            }
        //   };
    // }

    function detectHandler(){
        let liveVideo = srcVal.current;
        let count = 0;
        let emotion = []
        console.log(srcVal.current.clientHeight);
        // const canvas = faceapi.createCanvasFromMedia(liveVideo);
        // srcVal.current.appendChild(canvas);
        const canvas = canvasDetect.current;
    
        const size = {width: liveVideo.clientWidth, height: liveVideo.clientHeight};
        faceapi.matchDimensions(canvas, size);
    
        var interval=setInterval( async () => {
            const ctx = canvas.getContext('2d');
            const detections = await faceapi
                .detectAllFaces(liveVideo, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();
                if(detections.length != 0){
                    emotion.push(detections);
                    count++;
                    if(count == 5){
                        clearInterval(interval);
                        ctx.clearRect(0,0,canvas.width, canvas.height);
                    }
    
                    if(count < 5){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    console.log(detections);
    
                    const resizedDetections = faceapi.resizeResults(detections, size);
                        console.log(resizedDetections);
                    faceapi.draw.drawDetections(canvas, resizedDetections);
                    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
                    }
                }
        }, 500);
    
        setTimeout(() => {
            if(emotion.length != 0){
                console.log(emotion);
            var final={}
                var allEmotions=['angry','disgusted','fearful','happy','neutral','sad','surprised'];
                var idx=0;
                allEmotions.forEach((emtns)=>{
                    emotion.forEach((eachEmotion)=>{
                        idx++
                        if (idx=1) {
                            final[emtns]=eachEmotion[0].expressions[emtns];
                        }
                        final[emtns]+=eachEmotion[0].expressions[emtns]
        
                    })
                    idx=0;
                })
                console.log(final);
                console.log(emotion);
                let values = Object.values(final);
                var temp = values[0];
                console.log(values);
                for(let i=1; i<values.length; i++){
                    if(temp < values[i]){
                        temp = values[i];
                    }
                }
                let indexVal = values.indexOf(temp);
                setEmotion(false);
                // finalEmotion=allEmotions[indexVal]+" "+temp;
                console.log(allEmotions[indexVal], temp);
            }
            detectMessage.current.textContent = "Detected";
        }, 2000)
        
        setTimeout(() => {
            navigate("/features");
        }, 7000);

    }
    return(
        
        <>
            <div className="detectHeading">CAPTURING EXPRESSION</div>
            <video className="videoDiv" ref={srcVal} autoPlay></video>
            <canvas ref={canvasDetect} className="createCanvas"></canvas>
            {/* <button onClick={videoHandler}>Click here</button> */}
            <button onClick={detectHandler}>Click detected</button>
            <div className="detected" ref={detectMessage}></div>
        </>
    )
    
}
export default Home;







// return(
//     <div className="outerDiv">
//         <div className="emojiDiv">
//             <div>
//                 <img src="/smily1.png" ></img>
//             </div>

//             <div>
//                 <img src="/angry.png" className="angry"></img>
//             </div>

//             <div>
//                 <img src="/sad.png" className="sad"></img>
//             </div>


//             <div>
//                 <img src="/smile.png" className="smile"></img>
//             </div>

//             <div>
//                 <img src="/disgusted.png" className="disgusted"></img>
//             </div>
            
//         </div>
//         <div className="videoDiv">
//             <div className="video">
//                 <div className="video1" onClick={rotateHandler}>
//                     <img src="/all.png" className="allEmoji"></img>
//                 </div>
                
//             </div>
//         </div>
//         <div className="emojiDiv"></div>
//     </div>
// )



// import "../Home.css"
// import { useRef, useState } from "react";

// function Home(){

//     const srcVal = useRef();
    
    
//     async function uploadFiles(){

//     }

//     async function videoHandler(){
//         console.log("Enter");
//         const getUserMediaStream = async () => {
//             console.log("Enter the async")
//             try{
//                 let localStream = await (navigator.mediaDevices.getUserMedia({video: true}));
//                 if (srcVal.current) {
//                     srcVal.current.srcObject = localStream;
//                   } 
//             } 
//             catch (err) {
//               console.error("Error accessing webcam:", err);
//             }
//         }
//         getUserMediaStream();

//         return () => {
//             if (srcVal.current?.srcObject) {
//               const tracks = srcVal.current.srcObject.getTracks();
//               tracks.forEach(track => track.stop());
//             }
//           };
//     }

//     return(
        
//         <>
//             <div className="heading">CAPTURING EXPRESSION</div>
//             <video className="videoDiv" ref={srcVal} autoPlay></video>
//             <button onClick={videoHandler}>Click here</button>
//             <div className="detected"></div>
//         </>
//     )
    
// }
// export default Home;