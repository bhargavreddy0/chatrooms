import { auth } from './firebase-config';
import { Auth } from './components/Auth';
import {useState,useRef} from "react";
import Cookies from "universal-cookie";
import { Chat } from './components/Chat';
import {signOut} from 'firebase/auth'
import "./index.css";
const cookies = new Cookies();


function App() {
const usersignout = async() =>{
  await signOut(auth);
  cookies.remove("auth-token");
  setIsAuth(false);
  setRoom(null);
}
  const [isAuth, setIsAuth]=useState(cookies.get("auth-token"));
  const [room,setRoom]=useState(null);
  const roomInputref = useRef()

  if(!isAuth){
  return (
    <div className='app'>
      <Auth setIsAuth={setIsAuth}/>

    </div>
  );
}
return <div className='room'>
  { room ? (
  <Chat room={room}/>
    ) : (
    
  <div className='room'> 
      <label className='room-label'>Enter room name:</label><br/>
      <input type="text" ref={roomInputref} className='room-input'/><br/>
      <button onClick={()=>setRoom(roomInputref.current.value)} className='room-btn'>Enter Room</button><br/>
  </div>
    )
}
    <div>
      <button onClick={usersignout}>sign out</button>
    </div>
  </div>;
}

export default App;
