import {useEffect, useState} from "react";
import {addDoc,collection,onSnapshot,orderBy,query,serverTimestamp,where} from "firebase/firestore"
import {auth,db} from "../firebase-config";
import "../index.css"
export const Chat = (props) =>{
    const {room} = props;

    const [newMessage,setNewMessage] = useState("")
    const messageRef = collection(db,"messages");
    const [messages , setMessages] = useState([]);

     useEffect(()=>{
        const queryMessages = query(messageRef,where("room","==",room),orderBy("createdAt"));
       const unsubscribe = onSnapshot(queryMessages,(snapshot)=>{
            let messages=[];
                snapshot.forEach((doc)=>{
                    messages.push({ ...doc.data() , id:doc.id });
                });
                setMessages(messages)
        });
        return()=> unsubscribe();
     },[]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(newMessage===""){
            return;
        }
        await addDoc(messageRef,{
            text:newMessage,
            createdAt : serverTimestamp(),
            user : auth.currentUser.displayName,
            room : room,
        });
         setNewMessage("");

    };

        return(
        <>
        <div>welcome to {room}</div>
        <div className="chat-app">
            <div>{messages.map((message) => (
                <div className="message" key={message.id}>
                    <div className="message-user">{message.user}:</div>
                    {message.text}
                 </div>
                 ))}
            </div>
            <form className="new-message-form" onSubmit={handleSubmit}>
            <input className="new-message-input" placeholder="enter your message.." onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}/>
            <button type="submit">Send</button>
            </form>
        </div>
        </>
        );
}