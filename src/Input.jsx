import {BsEmojiSmile,BsFillMicFill} from 'react-icons/bs'
import {AiOutlineSend,AiOutlineClose} from 'react-icons/ai'
import {GrAttachment} from 'react-icons/gr'
import { useState } from 'react';
import Picker from 'emoji-picker-react'
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ChatContext } from './ChatContext';
import { async } from '@firebase/util';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from './firebase';
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect } from 'react';
const Input = () => {
    const [text,setText] = useState("");
    const [image,setImage] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    const [error,setError] = useState(false);
    const [showEmoji,setShowEmoji] = useState(false);
    const [imageSend,setImageSend] = useState(false);
    const [showMic,setShowMic] = useState(true);
    const [send,setSend] = useState(false);
    useEffect(()=>{
        setText("");
        setImage(null);
        setShowEmoji(false);
        setImageSend(false);
        setShowMic(true);
        setSend(false);
        const chatcontainer = document.getElementsByClassName("messages")[0];
        chatcontainer.classList.remove("hide");
        const inputcontainer= document.getElementsByClassName("rest")[0];
        inputcontainer.classList.remove("hide");
       

    },[data])
    const handleEmojiPicker= ()=>{
        setShowEmoji(!showEmoji);
    };
    const handleEmoji = (emoji) => {   
        setText(text + emoji.emoji);
    };

    const handleSend = async (e)=>{
        e.preventDefault();
        const curtext = text;
        if(text!=""||image!=null){
        setText("");
        setImageSend(false);
        setShowMic(true);
        setSend(false);
        const chatcontainer = document.getElementsByClassName("messages")[0];
        chatcontainer.classList.remove("hide");
        const inputcontainer= document.getElementsByClassName("rest")[0];
        inputcontainer.classList.remove("hide");
        setShowEmoji(false);

        try{
        if(image){
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, image);
            
            uploadTask.on(
                (error) => {
                  console.log(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                          messages: arrayUnion({
                            id: uuid(),
                            text:curtext,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            image: downloadURL,
                          }),
                        });
                      });
                }
              );
        }else{
            await updateDoc(doc(db,"chats",data.chatId),{
                messages: arrayUnion({
                    id: uuid(),
                    text:curtext,
                    senderId:currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }
        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId + ".lastMessage"]:{
                text:curtext
            },
            [data.chatId+".date"]: serverTimestamp()
        });
        await updateDoc(doc(db,"userChats",data.user.uid),{
            [data.chatId + ".lastMessage"]:{
                text:curtext
            },
            [data.chatId+".date"]: serverTimestamp()
        });
    }catch (e){
        console.log(e);
        }
        
        
        setImage(null);
}
    }
    const handleImage = (e)=>{
        setImage(e.target.files[0])
        const chatcontainer = document.getElementsByClassName("messages")[0];
        chatcontainer.classList.add("hide");
        const inputcontainer= document.getElementsByClassName("rest")[0];
        inputcontainer.classList.add("hide");
        setImageSend(true);
        setShowMic(false);
        setSend(true);
        setShowEmoji(false);
        
    }
    
    const handleTextChange = (e)=>{
        setText(e.target.value)
        if(e.target.value===""){
        setShowMic(true);
        setSend(false);
        }
        else {
            setShowMic(false);
            setSend(true);
        }
    }
    const handleClose = ()=>{
    setText("");
    setImage(null);
    setImageSend(false);
    setShowMic(true);
    setSend(false);
    const chatcontainer = document.getElementsByClassName("messages")[0];
        chatcontainer.classList.remove("hide");
        const inputcontainer= document.getElementsByClassName("rest")[0];
        inputcontainer.classList.remove("hide");
    }
    return ( 
        <div className="input">
            {imageSend && <div className="imagesend">
                <div className="exit">
                    <AiOutlineClose style={{fontSize:"24px", color:"gray", cursor:"pointer"}} onClick={handleClose}/>
                </div>
                <div className="imgcontainer">
                <img src={URL.createObjectURL(image)} alt="" />
                </div>
                <div className="inputs">
                <form onSubmit={handleSend}>
                    <div className="textarea">   
                        <input type="text" placeholder=' Type a message' id="chat-text" autoComplete="off" onChange={e=>handleTextChange(e)} value={text}/>
                    </div>
                        <button >< AiOutlineSend style={{fontSize:'24px', color:'#1fa855'}} /></button>
                    </form>
                </div>
                </div>}
            {showEmoji &&<div className="emo">
                <Picker onEmojiClick={handleEmoji} emojiStyle="native" />
            </div>}
            <div className="rest">
                <div className="adds">
                <BsEmojiSmile style={{fontSize:'24px',cursor:'pointer'}} onClick={handleEmojiPicker}/>
                <input type="file" id="file" style={{display:'none'}} onChange={e=>handleImage(e)} accept="image/png, image/gif, image/jpeg"/>
                <label htmlFor="file">
                <GrAttachment style={{fontSize:'24px',cursor:'pointer'}}/>
                </label>
                </div>
                <div className="inputs">
                <form onSubmit={handleSend}>
                    <div className="textarea">
                        <input type="text" placeholder=' Type a message' id="chat-text" autoComplete="off" onChange={e=>handleTextChange(e)} value={text}/>
                    </div>
                    <button>
                    {showMic && < BsFillMicFill style={{fontSize:'24px', color:'gray'}}/>}
                    {send && < AiOutlineSend style={{fontSize:'24px', color:'#1fa855'}} />}
                    </button>
                </form>          
                </div>
            </div>
            
        </div>
     );
}
 
export default Input;