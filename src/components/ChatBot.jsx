import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import { FaArrowLeft } from "react-icons/fa6";
import ChatSpace from './ChatSpace';
import ChatFooter from './ChatFooter';
import { useLocation } from 'react-router-dom';
import Header from './Header';


function ChatBot() {
    const location = useLocation();
    const result = location.state;
    const userId = result.idOfUser;
    const data1 = (JSON.stringify(result.emo1));
    const finalEmo = data1.slice(1,data1.length-1);
    const navigate = useNavigate();
    const [messages,setMessage] = useState([]);
    const [currentMessage, setCurrentMessage]=useState(null);
    if ((messages.length%2)!=0) {
      console.log('asked');   
      botChat(messages[messages.length-1]);
    }
    async function botChat(prompt) {
      try {
  
        console.log(prompt);
  
        console.log('waiting for response');
        
        
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            // "HTTP-Referer": "<YOUR_SITE_URL>",
            "X-Title": "UnarvAI", 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "model": "deepseek/deepseek-r1:free",
            "messages": [
              {
                "role": "user",
                "content": prompt
              }
            ]
          })
        });
  
        if(response.ok){
          const responseData = await response.json();
          console.log(responseData);
          
          setMessage([...messages,responseData.choices[0].message.content]);  
          console.log(responseData.choices[0].message.content);
        }
      } catch (error) {
        console.log(error);
        
      }
    }

    useEffect(()=>{
      console.log(finalEmo);
      setMessage(["start a conversation with me, I am "+finalEmo+" today, don't acknowledge me just start"]);  
    },[])
  


return (
    <div className='chatContainer'>

        <div className='fullPageOfChat'>
        <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={"features"} obj={{state: {findEmo: finalEmo, idOfUser: userId}}}/>

            <div className='chatHeader'>
                <FaArrowLeft className='back' onClick={(e) =>navigate("/features",{ state: { findEmo: (finalEmo) , idOfUser: userId} })}/>
                <p>Emotional Partner</p>
            </div>
            <ChatSpace messages={messages}></ChatSpace>
            {/* <h1>{replyCreated}</h1> */}
            <ChatFooter messages={messages} setMessage={setMessage} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} />
        </div>
    </div>
    
  )
}

export default ChatBot;
