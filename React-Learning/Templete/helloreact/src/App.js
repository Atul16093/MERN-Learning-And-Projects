import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import Test from "./components/test.js"
import Counter from './components/counter.js';

class App extends Component {
    render(){
      return <>
       <Test/>
       {/* <Counter/> */}
      </>
    }
} 

export default App;
