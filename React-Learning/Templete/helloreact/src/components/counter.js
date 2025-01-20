import { Component } from "react";

// How to create state inside the component, state is an built in react object,
class Counter extends Component{
    constructor(){
        super()
        // the name of this state should be state we cann't give anyother name here.
        //When the state get change component re-render automatically.
        this.state = {
            counter : 300,
        }
    }
    //overriding the render method
    render(){
        return <>
            <h1>{this.state.counter}</h1>
        </>
    }
}
export default Counter;