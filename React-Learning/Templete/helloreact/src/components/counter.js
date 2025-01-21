import { Component } from "react";

// How to create state inside the component, state is an built in react object,
class Counter extends Component {
  constructor() {
    super();
    // the name of this state should be state we cann't give anyother name here.
    //When the state get change component re-render automatically.
    this.state = {
      counter: 300,
    };
  }

  //defining function here
  incrementCounter = () => {
    // Be careful don't write alert() directly use window.alert()
    this.setState({ counter: this.state.counter + 1 });
    // this.state.counter = this.state.counter+1;
    // console.log(this.state.counter);
    // window.alert("Called");
  };

  //overriding the render method
  render() {
    console.log("Render called");

    return (
      <>
        <h1>Counter : {this.state.counter}</h1>
        {/*In React, when you assign an event handler to an element, you should provide the function name without parentheses.
             For example, use onClick={this.handleClick} instead of onClick={this.handleClick()}.
             Including parentheses calls the function immediately during rendering, which is not the desired behavior.
              By omitting the parentheses, you ensure that the function is executed only when the user interacts with the element, such as clicking a button.*/}
        <button onClick={this.incrementCounter}> Click here </button>
      </>
    );
  }
}
export default Counter;
// import { Component } from "react";

// class Counter extends Component{
//     constructor(){
//         super();
//         this.state = {
//             counter: 100
//         };
//     }
//     incrementCounter = ()=>{
//       this.setState({counter: this.state.counter+1});
//     }
//     render(){
//         console.log("Render called....");
//         return <>
//           <h1>Counter Component...</h1>
//           <label>Counter : {this.state.counter}</label>
//           <button onClick={this.incrementCounter}>Increment</button>
//         </>
//     }
// }

// export default Counter;
