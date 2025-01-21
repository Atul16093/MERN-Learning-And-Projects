import { Component } from "react";

class EvenOdd extends Component{
    constructor(){
        super();
        this.state = {
            counter : 100,
            EvenCounter : 0,
            oddCounter : 1,
        }
    }
    //Event listener
    incrementComponent = ()=>{
        // this.state.counter = this.state.counter+1;
        this.setState({counter : this.state.counter+1})

    }

    render(){
        console.log("Component on increment stage ");
        
        //here we will write jsx
        return <>
        <button onClick={this.incrementComponent}> Counter : {this.state.counter}</button>
        {/* We can also write like this  */}
        <button onClick={()=>{this.setState({EvenCounter : this.state.EvenCounter+2})}}> Even Counter : {this.state.EvenCounter}</button>
        <button onClick={()=>{this.setState({oddCounter : this.state.oddCounter+2})}}> Odd Counter : {this.state.oddCounter}</button>
        </>
    }
}
export default EvenOdd;