import { useRef , useState } from "react";
import Display from "./Display.jsx";
import Data from "./Data";
function studentAdd(){
    const[student , setStudent] = useState(null);
    const branch = ["IT" , "CV" , "CS" , "Mech"];
    const rollRef = useRef(null);
    const nameRef = useRef(null);
    const genderRef = useRef(null);
    const branchRef = useRef(null);
    const addingStudent = ()=>{
        const roll = rollRef.current.value;
        const name = nameRef.current.value;
        const gender = genderRef.current.value;
        const branch = branchRef.current.value;
        const studentinfo = {roll , name , gender , branch};
        console.log(studentinfo);
        
        setStudent(studentinfo);
    }
    return <>
        <div className="container m-2 ">
            <div className="row">
                <div className="col-md-6">
                    <input ref={rollRef} id = "roll" className="form-control" type="text" placeholder="Enter your Roll No" />
                </div>
                <div className="col-md-6 ">
                    <input ref={nameRef} className="form-control" type="text" placeholder="Enter your Name" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mt-2">
                 <select ref={genderRef}  className="form-control" name="gender" id="">
                    <option value="0">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                 </select>
                </div>
                <div className="col-md-6 mt-2">
                  <select ref={branchRef} className="form-control" name="branch" id="">
                    <option value="0">Select branch</option>
                    {branch.map((branch , index)=>{return <option key={index}>
                        {branch}
                    </option>})}
                  </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mt-3">
                <button onClick={addingStudent} className="btn  btn-success">Add</button>
                </div>
                <div className="col-md-6 mt-3">
                <button onClick=" " className="btn m-2  btn-outline-success" style={{width : 80}}>IT</button>
                <button onClick=" " className="btn m-2 btn-outline-secondary" style={{width : 80}}>CV</button>
                <button onClick=" " className="btn m-2 btn-outline-warning" style={{width : 80}}>Mech</button>
                <button onClick=" " className="btn m-2 btn-outline-primary" style={{width : 80}}>CS</button>
                </div>
            </div>
        </div>
        <Display data = {student}/>
    </>
}

export default studentAdd;