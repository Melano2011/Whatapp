import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import {AuthContext} from "./AuthContext";
import {db} from "./firebase";
import { useContext } from "react";
import { ChatContext } from "./ChatContext";
const Chats = () => {
    const [chats,setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect(()=>{
       const getChats = ()=>{
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data());
          });
          return ()=>{
              unsub();
          }
       }
       currentUser.uid && getChats();
    },[currentUser.uid]);

    const handleSelect = (useInfo)=>{
           dispatch({type:"CHANGEUSER",payload:useInfo});
           const c = document.getElementsByClassName("chat")[0].classList.add("slide");
    }
    return (

        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
                 <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].useInfo)}>
                 <img src={chat[1].useInfo?.photoURL} alt="user" />
                 <div className="userChatInfo">
                     <span className='userName'>{chat[1].useInfo?.displayName}</span>
                     <span className='lastMessage'>{chat[1].lastMessage?.text}</span>
                 </div>
             </div> 
            ))}
        </div>
    );
}
 
export default Chats;