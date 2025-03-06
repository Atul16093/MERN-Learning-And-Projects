import { Route, Routes } from "react-router-dom";
import LandingPage from "./nonAuthenticatePage/LandingPage.jsx";
import Emo from "./nonAuthenticatePage/Emo.jsx";
import Login from "./nonAuthenticatePage/login.jsx";
import Hero from "./Hero.jsx";

let RouterConfig = ()=>{
    return <>
        <Routes>
            <Route path="/" element = {<LandingPage/>}/>
            <Route path = "/emo" element = {<Emo/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/home"  element = {<Hero/>}/>
        </Routes>
    </>
}

export default RouterConfig;