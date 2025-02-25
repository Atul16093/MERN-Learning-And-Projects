import {Routes , Route} from 'react-router-dom';
import Header from './Header';
import DashBoard from './DashBoard';
import Feature from './Feature';
import { Category } from './category';
import { SignUp } from "./SignUp"

function RouterConfig(){
    const signUpInfo = (email , password)=>{
        console.log(email , password);
        
    }
    return <>
    <Header/>
    <Routes>
        <Route path='/dashboard' element = {<DashBoard/>}/>
        <Route path='/feature' element = {<Feature/>}/>
        <Route path='/sign-up' element = {<SignUp signUpInfo={signUpInfo}/>}/>
        <Route path= '/category' element = {<Category/>}/>
    </Routes>
    </>
}
export default RouterConfig;