import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "./firebase";

export const ChatContext = createContext()


export const ChatContextProvider = ({children})=>{

const {currentUser} = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId:"null",
        user:{}
    }
    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGEUSER":
                return{
                    user:action.payload,
                    chatId:currentUser.uid > action.payload.uid? 
                    currentUser.uid + action.payload.uid 
                    : action.payload.uid + currentUser.uid
                }
            case "EXIT":
                return {
                chatId:0
            }
            default :
                return state;  
        }
    }

    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);

    return(
    <ChatContext.Provider value={{data:state,dispatch}}>
        {children}
    </ChatContext.Provider>
    )
};  