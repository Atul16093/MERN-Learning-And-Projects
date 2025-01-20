import { Component } from "react";

class Test extends Component{
    render(){
        //It's a data binding 
        const name = "ABC";
        const  address = "Goa";
        const dataList = ['bananan ' , ' Mango ' , ' Graphes ' , ' Papaya ' , ' Stroberry '];
        const age = 19;
        return <>
        <body style={{backgroundColor : "black" , color : "#32CD32"}}>
        {/* If we bind any data so we'll write that thing inside the curly bracess */}
        <h1>Hello {name}, How are you ? </h1>
        <h2> Are you from {address} ? </h2>
        {/*Try to displaying the whole array*/}
        <h3> {dataList} </h3>
        {/* We cann't use loop directly here, we'll use the javascript function for desplaying something  */}
        <h4>{dataList.map((Element)=>{return Element})}</h4>
        <h5> {(age > 18) ? (<label style={{color : "#32CD32" , backgroundColor  : "black"}}>You can vote</label>):(<label> You cann't vote </label>)}</h5>
        {/* We cann't write like this in react  */}
        {/* <h1> if(age {">"} 18){<label> you can vote </label>}else{<label>You cann't vote </label>} </h1> */}
        </body>
        </>
    }
}

export default Test;