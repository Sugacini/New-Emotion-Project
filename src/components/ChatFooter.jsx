import { FaPaperPlane } from "react-icons/fa6";
import { useState, useRef } from "react";
function ChatFooter({messages, setMessage, currentMessage, setCurrentMessage}) {
    const inputBox=useRef();
    return (
        <form action="" className="chatFooter">
            <input className="inputBox" type="text" placeholder="Message" onChange={(e)=>setCurrentMessage(e.target.value)} ref={inputBox}/>
            <button type="submit" className="sendButton" onClick={(e)=>{
                e.preventDefault();
                inputBox.current.value=null;
                setMessage([...messages,currentMessage]);                
                }}>
                    <FaPaperPlane /></button>
        </form>
    )
}

export default ChatFooter;
