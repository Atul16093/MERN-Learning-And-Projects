import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import Test from "./components/test.js"
import Counter from './components/counter.js';
import EvenOdd from './components/EvenOdd.js';
import Product from './components/Product.js'
class App extends Component {
    render(){
      return <>
       {/* <Test/> */}
       {/* <Counter/> */}
       {/* <EvenOdd/> */}
       <Product/>
      </>
    }
} 

export default App;
