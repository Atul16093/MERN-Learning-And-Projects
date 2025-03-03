import { Route, Routes } from "react-router-dom";
import LandingPage from "./nonAuthenticatePage/LandingPage.jsx";
import Emo from "./nonAuthenticatePage/Emo.jsx";

let RouterConfig = ()=>{
    return <>
        <Routes>
            <Route path="/" element = {<LandingPage/>}/>
            <Route path = "/Emo" element = {<Emo/>}/>
        </Routes>
    </>
}

export default RouterConfig;