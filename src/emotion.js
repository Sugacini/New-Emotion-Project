console.log('running');
let liveVideo = document.getElementById("videoDiv");
// let detect = document.getElementById("detect");
let localStream;

function faceDetected(){
    document.addEventListener("DOMContentLoaded", async() => {
        try{
            await getLocalStream();
    
            await Promise.all(
                [
                    faceapi.nets.tinyFaceDetector.loadFromUri("../public/models"),
                    faceapi.nets.faceLandmark68Net.loadFromUri("../public/models"),
                    faceapi.nets.faceRecognitionNet.loadFromUri("../public/models"),
                    faceapi.nets.faceExpressionNet.loadFromUri("../public/models"),
                    faceapi.nets.ssdMobilenetv1.loadFromUri("../public/models"),
                ]
            )
            console.log("Uploaded");
        }
        catch(err){
            console.log("Error: "+err);
        }
    })
    
    async function getLocalStream(){
        try{
            localStream = await (navigator.mediaDevices.getUserMedia({video: true}));
            liveVideo.srcObject = localStream;
        }
        catch(err){
            console.error(err);
        }
    }
    
    // detect.addEventListener("click", () => {
        let count = 0;
        let emotion = []
        const canvas = faceapi.createCanvasFromMedia(liveVideo);
        document.body.append(canvas);
    
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
                console.log(allEmotions[indexVal], temp);
            }
        }, 2000)
    // })
}

faceDetected();
