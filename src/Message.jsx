import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./ChatContext";


const Message = ({Message}) => {
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    const date = new Date(Message.date.seconds*1000);
    const datestring = date.getHours() + ":" + (date.getMinutes()<10? ("0"+date.getMinutes()):date.getMinutes());
    const ref = useRef();
    useEffect(()=>{
        ref.current?.scrollIntoView({behavior:"auto"})
    },[Message]);
    return ( 
    <div  ref={ref} className={`message ${Message.senderId===currentUser.uid && "owner"}`}>
        <div className="content">
             <div className="mescon">
           {Message.image && <a target="_blank" href={Message.image}><img src={Message.image} alt="" /></a>}
            <p>{Message.text}</p>
            </div>
          <div className="info">
                <span>{datestring}</span>
            </div>  
        </div>
    </div> 
    );
}
 
export default Message;