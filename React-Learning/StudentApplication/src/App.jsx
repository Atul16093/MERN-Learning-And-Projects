import { Component } from "react";
import Header from "./components/Header.jsx";
import Display from "./components/Display.jsx";
import UserInput from "./components/UserInput.jsx";
 class App extends Component{
  render(){
    return <>
      <Header/>
      <UserInput/>
      <Display/>
      
    </>
  }
}
export default App;