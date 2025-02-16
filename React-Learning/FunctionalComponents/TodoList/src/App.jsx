import { useState } from "react"
import Header from "./components/Header"
import Task from "./components/task";
import { useRef } from "react";
import task from "./components/task";
let d = new Date()
let date = d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
function App(){
  let [priorities , setPriorities] = useState(["High" , "Medium" , "Low"]);
  let [tasks , setTasks] = useState(Task);
  let [filter , setFilter] = useState(Task);
  let [isDisabled , setDisabled] = useState();
  const taskRef = useRef();
  const priorityRef = useRef();
  const addingTask = ()=>{
    let title = taskRef.current.value;
    let priority = priorityRef.current.value;
    let newTask = {title , priority};
    setTasks([...tasks , newTask]);
    
  }
  //Here we created two same state but it's work different
  const activeTasks = ()=>{
    let active = filter.filter((task)=>{return task.status == "Active"});
    setTasks(active);
   setDisabled("active");
  }
  const deactiveTasks = ()=>{
    let deactive = filter.filter((task)=>{return task.status == "Deactive"});
    setTasks(deactive);
    setDisabled("deactive")
  }

  const changeStatus = ()=>{
      
  }

  const sortByPriority = ()=>{
    let arr = tasks.sort((a,b)=>{
      return a.priority.localeCompare(b.priority)
    })
    console.log(arr);
    setTasks(tasks);
    
  }
  return <>
    <Header/>
     <div className="container">
      <div className="row mt-3">
          <div className="col-md-6">
            <input ref={taskRef} className="form-control" type="text" placeholder="Enter your task"/>
          </div>
          <div className="col-md-6">
            <select ref={priorityRef} className="form-control" name="priority" id="">
              <option value="0">Select Priority</option>
              {priorities.map((priority , index)=>{ return <option key={index}>
              {priority}
              </option>})}              
            </select>
          </div>
      </div>
      <div className="row m-3">
        <button onClick={addingTask} className="btn btn-outline-success" style={{width : 80}}>Add</button>
      </div>
      <div className="row ">
        <div className="col-md-6 m-3">
        <button disabled = {isDisabled == "active"} onClick={activeTasks} className="btn btn-success" style={{width : 100, marginRight : 20}} >Active ({tasks.filter((active)=>{return active.status == "Active"}).length})</button>
        <button disabled = {isDisabled == "deactive"} onClick={deactiveTasks} className="btn btn-danger" style={{width : 120}} >Deactive ({tasks.filter((deactive)=>{return deactive.status == "Deactive"}).length})</button>
        <button onClick={sortByPriority} className="btn btn-outline-info" style={{width : 150, marginLeft : 10}}>Sort By Priority</button>
        </div>
      </div>

      {/* Data section */}
      <div className="m-4">
          <table className="text-center table  table-striped">
              <thead >
                <tr>
                <th>S.no</th>
                <th>Title</th>
                <th>Date</th>
                <th>Prioriy</th>
                <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                  {tasks.map((task , index)=>{ return <tr className= {task.priority == "High" ? "bg-danger" : task.priority =="Low" ? "bg-success" : task.priority == "Medium" ? "bg-warning" : ""} key={index} >
                    <td>{index+1}</td>
                    <td>{task.title}</td>
                    <td>{date}</td>
                    <td>{task.priority}</td>
                    <td><button onClick={changeStatus} className="btn btn-warning" style={{width : 80}}>{task.status }</button></td>
                  </tr>})}
              </tbody>
          </table>
      </div>
     </div>
  </>
}
export default App
