import './App.css'
// import Data from './components/Data'
import { useState } from 'react'
import Display from './components/Display.jsx';
import Header from './components/Header.jsx';
import StudentAdd from './components/StudentAdd.jsx';
function App() {
    return <>
      <Header/>
      <StudentAdd/>
     {/* <Display/> */}
    </>
}

export default App
