import { useEffect } from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const Home = () => {

    
    return ( 
        <div className="home">
            <div className="container">
                <Sidebar/>
                <Chat first={"first"}/>
            </div>
        </div>
     );
}
 
export default Home;