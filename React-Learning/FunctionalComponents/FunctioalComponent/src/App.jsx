//It's a hook
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(10)
  const [evenCount , setEven] = useState(0)
  const[oddCount , setOdd] = useState(1);
  const increment = ()=>{
    setCount(count +1);
  }
  return (
    <>
     <button className='btn btn-danger' onClick={increment}>count : {count}</button>
     <button className='btn btn-info' onClick={()=>{setEven(evenCount+2)}}>EvenCount : {evenCount}</button>
     <button className='btn btn-warning' onClick={()=>{setOdd(oddCount+1)}}>oddCount : {oddCount}</button>
    </>
  )
}

export default App
