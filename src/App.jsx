import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Pages/Feed/Feed";



function App() {
 

  return (
    <>
    <Provider store={appStore}>
   <BrowserRouter basename="/">

    <Routes>
      <Route path='/' element={<Home/>}>
      <Route path="/login" element={<Login/>}/>
       <Route path="/feed" element={<Feed/>}/>
      </Route>
      </Routes>
   
  
   </BrowserRouter>
</Provider>
    
    </>
  );
}

export default App;
