import {ImImage} from 'react-icons/im'
import {createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth,storage,db} from './firebase'
import { useState } from 'react';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
    const [error,setError] = useState(false);
    const [photo,setPhoto] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        setError(false);
        setPhoto(false);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const image = e.target[3].files[0];
        if(e.target[3].files[0]===undefined)
        {
          setPhoto(true);
        }
        else{
        try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, image);
 
        uploadTask.on(
          (error) => {
            setError(true);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateProfile(res.user,{
                displayName,
                photoURL:downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              await setDoc(doc(db,"userChats",res.user.uid),{

              });
              navigate('/'); 
            });
          }
        );
       
        }catch(e){
            setError(true);
        }
      }
    }
    return (  
        <div className="main">
            <div className="formwrapper">
                <h1 className="title">Register</h1>
                <form onSubmit={handleSubmit} >            
                <input type="text" name="user" id="user" placeholder="Display Name" required/>
                <input type="email" name="email" id="email" placeholder="Email" required/>
                <input type="password" name="password" id="password" placeholder="Password" minLength="5" required/>
                <input style={{display:"none"}} type="file" id="file" accept="image/png, image/gif, image/jpeg"/>
                <label htmlFor="file">
                <ImImage style={{fontSize:"30px"}}/><span>Add Photo</span></label>
                <button>Sign up</button>
                {error && <p style={{color:'red'}}>Something went wrong</p>}
                {photo && <p style={{color:'red'}}>Please choose photo</p>}
                </form>
                <p>You do have an account? <Link to="/login" style={{color:"#1fa855"}}>Login</Link></p>
            </div>
        </div>
    );
}
 
export default Register;
