import React from "react";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase'
const Login = () => {

    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;
        try{
           await signInWithEmailAndPassword(auth, email, password);
           navigate("/");
           console.log("done");
        }catch(e){
            setError(true);
        }
    }


    return (  
        <div className="main">
            <div className="formwrapper">
            <h1 className="title">Login</h1>
                <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" placeholder="Email"/>
                <input type="password" name="password" id="password" placeholder="Password"/>
                <button>Login</button>
                {error && <p style={{color:'red'}}> email or password are not correct</p>}
                </form>
                <p>You don't have an account? <Link to="/register" style={{color:"#1fa855"}}>Register</Link></p>
            </div>
        </div>
    );
}
 
export default Login;