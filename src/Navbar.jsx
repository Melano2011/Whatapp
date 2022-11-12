import {BiLogOut} from 'react-icons/bi'
import {signOut} from 'firebase/auth'
import {auth} from './firebase'
import { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { ChatContext } from './ChatContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext);
    const navigate = useNavigate();
    const fakeuser = {displayName: 'fake',
     photoURL: 'https://img.freepik.com/premium-vector/stop-fake-icon-vector-forbidden-sign-no-lying-concept-neumorphic-ui-ux-white-user-interface-web-button-neumorphism-vector-illustration_399089-2524.jpg?w=2000',
     uid: 'fake'}
    return ( 
    <div className="navbar">
       <div className="logo">
        <img src={currentUser.photoURL} alt="user"/>
        <span>{currentUser.displayName}</span>
       </div>
       <div className="options">
        <button onClick={()=>{
             dispatch({type:"CHANGEUSER",payload:fakeuser});
            signOut(auth);
            }}><BiLogOut style={{fontSize:"20px"}}/></button>
       </div>
    </div> 
    );
}
 
export default Navbar;