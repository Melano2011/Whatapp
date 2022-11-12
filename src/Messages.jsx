import Message from "./Message";
import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ChatContext } from "./ChatContext";
import { db } from "./firebase";
const Messages = () => {
  
    const [messages,setMessages] = useState([]);
    const {data} = useContext(ChatContext);

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        }
        )
        return () =>{
            unSub()
        }
    },[data.chatId]);

    return (
        <div className="messages">
            {messages.map(m=>(
                <Message Message={m} key={m.id}/>
            ))}

        </div>
    );
}
 
export default Messages;