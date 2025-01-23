import {Component} from 'react';
import './App.css';
import Header from './components/Header.js'
import data from './data.js'
class App extends Component{
    constructor(){
      super()
      this.state = {
         studentList: data,
         branchList : ['IT' , 'CS' , 'ES' , 'MA']
      }
    }
    addRecord = ()=>{
        let roll = this.roll.value;
        let name = this.name.value;
        let mobile = this.mobile.value;
        let grade = this.grade.value;
        let branch = this.branch.value
        // let address = this.address.value;
        let store = {roll , name , mobile , grade , branch}
        console.log(store);
        
        this.setState({studentList : [...this.state.studentList,store]});
    }
    deleteRecord = (roll)=>{
      let index = this.state.studentList.findIndex((student)=>{return student.roll == roll});
        this.state.studentList.splice(index ,1);
        this.setState({studentList : [...this.state.studentList]});
    }
    render(){
      return <>
        <Header/>
        <div className='container'>
          <div className='my-2 col-md-6'>
            <input ref = {(rollInput)=>{this.roll = rollInput}} id = "roll" type ='text' className='form-control' placeholder='Enter your roll number' />
          </div>
          <div className = 'my-2 col-md-6'>
            <input ref= {(nameInput)=>{this.name = nameInput}} type = 'text' className = 'form-control' placeholder = "Enter student name" />
          </div>
          <div className = 'my-2 col-md-6'>
            <input ref = {(mobileInput)=>{this.mobile = mobileInput}} type = 'text' className = 'form-control' placeholder = "Enter Phone brand " />
          </div>
          <div className = 'my-2 col-md-6'>
            <input ref = {(gradeInput)=>{this.grade = gradeInput}} type = 'text' className = 'form-control' placeholder = "Enter Grade" />
          </div>
          {/* <div className = 'my-2 col-md-6'>
            <input ref = {(address)=>{this.address = address}} type = 'text' className = 'form-control' placeholder = "Enter your Address" />
          </div> */}
          <div className='col-md-6'>
          <select ref={(branchInput)=>{this.branch = branchInput}} className='form-select'>
            <option selected>Select Branch</option>
            {this.state.branchList.map((branch , index)=>{return  <option key ={index}>
              {branch}
            </option>})}
          </select>
          </div>
        </div>
        <div className='col-md-6'>
          <button className='btn btn-success' onClick={this.addRecord}>Add</button>
        </div>

        <table className=' table  border text-center' >
          <thead className='border text-center'>
             <th>Roll No.</th>
             <th>Name</th>
             <th>Mobile</th>
             <th>Grade</th> 
             <th>Branch</th>
             <th>Delete</th>
          </thead>
             <tbody className='border '>
              {this.state.studentList.map((data , index)=>{return <tr className='border' key = {index}>
                <td className='border'>{data.roll}</td>
                <td className='border'>{data.name}</td>
                <td className='border'>{data.mobile}</td>
                <td className='border'>{data.grade}</td>
                <td className='border' >{data.branch}</td>
                <td><button className='btn btn-danger' onClick={()=>this.deleteRecord(data.roll)}>Delete</button></td>
              </tr>})}
             </tbody>
        </table>
      </>
    }
}

export default App;