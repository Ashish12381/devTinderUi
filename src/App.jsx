import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Pages/Feed/Feed";
import Profile from "./components/Pages/Profile/Profile";
import MyConnections from "./components/Pages/MyConnections/MyConnections";
import ConnectionRequest from "./components/Pages/ConnectionRequest/ConnectionRequest";



function App() {
 

  return (
    <>
    <Provider store={appStore}>
   <BrowserRouter basename="/">

    <Routes>
      <Route path='/' element={<Home/>}>
      <Route path="/login" element={<Login/>}/>
       <Route path="/feed" element={<Feed/>}/>
        <Route path="/profile" element={<Profile/>}/>
         <Route path="/myConnections" element={<MyConnections/>}/>
         <Route path="/connectionRequests" element={<ConnectionRequest/>}/>

      </Route>
      </Routes>
   
  
   </BrowserRouter>
</Provider>
    
    </>
  );
}

export default App;
