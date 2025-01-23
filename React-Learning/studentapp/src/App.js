import logo from './logo.svg';
import {Component} from 'react';
import './App.css';
import Header from './components/Header.js'
import data from './data.js'
class App extends Component{
    constructor(){
      super()
      this.state = {
         studentList: data
      }
    }
    render(){
      return <>
        <Header/>
        <table className='border ' >
          <thead className='border'>
             <th>Name</th>
             <th>Mobile</th>
             <th>Grade</th>
             <th>Address</th>
          </thead>
             <tbody className='border'>
              {this.state.studentList.map((data , index)=>{return <tr className='border' key = {index}>
                <td className='border'>{data.name}</td>
                <td className='border'>{data.mobile}</td>
                <td className='border'>{data.grade}</td>
                <td className='border' >{data.address}</td>
              </tr>})}
             </tbody>
        </table>
      </>
    }
}

export default App;
