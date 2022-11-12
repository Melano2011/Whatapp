import './App.css';
import './style.scss';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
function App() {
  const {currentUser} = useContext(AuthContext);
  const ProtectedRouter = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children;
  }
  return ( 
    <div className="App">
    
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/">
         <Route index element={
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
          }/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
