import {AiOutlineSearch} from 'react-icons/ai'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import {IoIosArrowBack} from 'react-icons/io'
import Messages from './Messages';
import Input from './Input';
import { useContext } from "react";
import { ChatContext } from "./ChatContext";
import { useEffect } from 'react';

const Chat = ({first}) => {
  const {data} = useContext(ChatContext);

  function scrollBottom() {
    const chatBox = document.getElementsByClassName("chat")[0];
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  useEffect(()=>{
  scrollBottom();
  },[data]);
  const handleBack = ()=>{
    document.getElementsByClassName("chat")[0].classList.remove("slide");
  };
    return (
    <div className="chat">
      {(data.user?.uid === 'fake' || data.chatId=='null') && <div className='opening'></div>}
      <div className="chatInfo">
       
        <div className="currentChat">
       <IoIosArrowBack  className='show' onClick={handleBack}/>
            <img src={data.user?.photoURL} alt="user" />
            <span>{data.user?.displayName}</span>
        </div>
        <div className="options">
          <AiOutlineSearch style={{fontSize:'24px',cursor: 'pointer'}}/>
          <BiDotsVerticalRounded style={{fontSize:'24px',cursor: 'pointer'}}/>
          </div> 
      </div>
      <Messages />
      <Input />
    </div>
  );
}
 
export default Chat;