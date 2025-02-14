import logo from './logo.svg';
import {Component} from 'react';
import './App.css';

//App component 
class App extends Component{
   constructor(){
    super();
    console.log("Constructor rendering");
    this.state = {
        count : 100
    }
   }
   componentDidMount(){
      console.log("ComponenetDidMount render here ");
   }
   componentDidUpdate(){
    console.log("Component update render");
   }
   componentWillUnmount(){
    console.log("ComponenetWillUnMount");
    
   }
   render(){
    console.log("Render method....");
     return <>
         <button className='btn btn-info' onClick={()=>{this.setState({count : this.state.count+1})}}>Button {this.state.count}</button>
      </>
   }
}

export default App;
