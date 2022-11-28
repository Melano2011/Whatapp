import {BsSearch} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';
import { collection, query, where,getDoc, setDoc, updateDoc, serverTimestamp,doc,getDocs } from "firebase/firestore";
import {db} from './firebase'
import { async } from '@firebase/util';
import { useContext } from 'react';
import {AuthContext} from './AuthContext'
const Search = () => {
    const [username,setUsername] = useState("");
    const [user,setUser] = useState(null);
    const [error,setError] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const handleSelect = async ()=>{
       
        //exists
        const idMerge = currentUser.uid > user.uid? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try{
        const res = await getDoc(doc(db,"chats",idMerge));
            if(!res.exist){
                //create 
                await setDoc(doc(db,"chats",idMerge),{messages:[]});
                await updateDoc(doc(db,"userChats",currentUser.uid),{
                    [idMerge+".useInfo"]:{
                        uid:user.uid,
                        displayName:user.displayName,
                        photoURL:user.photoURL
                    },
                    [idMerge+".date"]:serverTimestamp()
                });
                await updateDoc(doc(db,"userChats",user.uid),{
                    [idMerge+".useInfo"]:{
                        uid:currentUser.uid,
                        displayName:currentUser.displayName,
                        photoURL:currentUser.photoURL
                    },
                    [idMerge+".date"]:serverTimestamp()
                });
            }
            
        }catch(error){
            console.log(error);
        }
        setUser(null);
        document.getElementById('searchbar').value='';
        document.getElementsByClassName('chats')[0].classList.remove('expand');

    };
    const handleSearch = async ()=>{
        document.getElementsByClassName('chats')[0].classList.remove('expand');
        setUser(null);
        setError(false);
        const q = query(collection(db, "users"),where("displayName","==",username));
        try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
         setUser(doc.data())
         document.getElementsByClassName('chats')[0].classList.add('expand');
            });
        }catch(error){
            setError(true);
        }
    }
    const handleKey = e=>{
        e.preventDefault();
        handleSearch();
    }
    return ( 
        <div className="search">
            <div className="searcharea">
            <form onSubmit={handleKey}>
                <div className="searchcontainer">
                 <BsSearch className='searchicon'/>
                 
                <input type="text" name="search" id="searchbar" placeholder='Search or start new chat' autoComplete="off"
                onChange={(e)=>setUsername(e.target.value)}
                />
               
                <AiOutlineClose style={{fontSize:"20px", color:"gray"}}/>
                </div>
                </form>
            </div>
           
           {user && <div className="found" style={{cursor:'pointer'}} onClick={handleSelect}>
                <img src={user.photoURL} alt="user" />
                <div className="userChatInfo">
                    <span className='userName'>{user.displayName}</span>
                </div>
            </div> }
        </div>
     );
}
 
export default Search;