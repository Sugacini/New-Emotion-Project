import { useEffect, useRef } from "react";

const VideoComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getUserMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    getUserMediaStream();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h2>Local Video Stream</h2>
      <div style={{width: "100%", height: "900px", border:"1px solid", backgroundImage:"url('camera.png')", display:"flex", justifyContent:"center", alignItems:"center", backgroundRepeat: "no-repeat"}}></div>
      <video ref={videoRef} autoPlay playsInline style={{backgroundImage: "/camera.png"}}/>
    </div>
  );
};

export default VideoComponent;