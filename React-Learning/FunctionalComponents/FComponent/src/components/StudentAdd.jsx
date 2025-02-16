import { useRef , useState } from "react";
import Data from "./Data";
function studentAdd(){
    const[student , setStudent] = useState(Data);
    const[defaultList , setDefaultList] = useState("All");
    const[error , setError] = useState();
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
        setStudent([...student , studentinfo]);
    }
    const male = ()=>{
        const male = student.filter((individual)=>{return individual.gender == "Male"});
        console.log(male);
        setStudent(male);
    }
    const female = ()=>{
        const female = student.filter((individual)=>{return individual.gender == "Female"});
        console.log(female);
        setStudent(female)
    }
    const All = ()=>{
        setStudent(Data)
    }
    
    const identify = ()=>{
        let roll = rollRef.current.value;
        const unique = student.findIndex((check)=>{return check.roll == roll});

        if(unique === -1){
            setError("");
        }else{
            let message = "This roll no is already taken"
            setError(message)
        }
        
    }
    return <>

        <div className="container m-2 ">
            <div className="row">
                <div className="col-md-6">
                    <input onKeyUp={identify} ref={rollRef} id = "roll" className="form-control" type="text" placeholder="Enter your Roll No" />
                    <p className="text-danger">{error}</p>
                </div>
                <div className="col-md-6 ">
                    {/* error !== ""  */}
                    <input ref={nameRef} className="form-control" type="text" placeholder="Enter your Name" disabled = {error !== ""}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mt-2">
                 <select  disabled = {error !== ""} ref={genderRef}  className="form-control" name="gender" id="">
                    <option value="0">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                 </select>
                </div>
                <div className="col-md-6 mt-2">
                  <select  disabled = {error !== ""} ref={branchRef} className="form-control" name="branch" id="">
                    <option value="0">Select branch</option>
                    {branch.map((branch , index)=>{return <option key={index}>
                        {branch}
                    </option>})}
                  </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mt-3">
                <button disabled = {error !==""} onClick={()=>{ addingStudent()}} className="btn  btn-success">Add</button>
                </div>
                <div className="col-md-6 mt-3">
                <button onClick={()=>{setDefaultList("IT")}} className="btn m-2  btn-outline-success" style={{width : 80}}>IT ({student.filter((filtering)=>{return filtering.branch == "IT"}).length})</button>
                <button onClick={()=>{setDefaultList("CV")}} className="btn m-2 btn-outline-secondary" style={{width : 80}}>CV ({student.filter((filtering)=>{return filtering.branch == "CV"}).length})</button>
                <button onClick={()=>{setDefaultList("Mech")}} className="btn m-2 btn-outline-warning" style={{width : 90}}>Mech ({student.filter((filtering)=>{return filtering.branch == "Mech"}).length})</button>
                <button onClick={()=>{setDefaultList("CS")}} className="btn m-2 btn-outline-primary" style={{width : 80}}>CS ({student.filter((filtering)=>{return filtering.branch == "CS"}).length})</button>
                <button onClick={()=>{setDefaultList("All")}} className="btn m-2 btn-outline-info" style={{width : 80}}>All ({student.length})</button>
                </div>
            </div>
        </div>
        <div className="row m-2">
            <div className="col-md-6">
                <div>
                    <label >Gender : </label>
                    <input onClick={male} className="m-2" type="radio" id="male" name="gender"  />
                    <label htmlFor="male">Male</label>
                    <input onClick = {female} className="m-2" type="radio" id="female" name="gender" />
                    <label htmlFor="female">Female</label>
                    <input onClick={All} className="m-2" type="radio" id="all" name="gender" />
                    <label htmlFor="all">All</label>

               </div>
            </div>
        </div>
        <table  className="table table-bordered">
                 <thead>
                   <tr>
                    <th>ROll NO</th>
                    <th>Name </th>
                    <th>Gender</th>
                    <th>Branch</th>
                </tr>
            </thead>
            <tbody>
                {student.filter((filtered)=>{ return filtered.branch == defaultList || defaultList == "All"}).map((individual , index)=>{ return <tr key={index}>
                    <td>{individual.roll}</td>
                    <td>{individual.name}</td>
                    <td>{individual.gender}</td>
                    <td>{individual.branch}</td>
                </tr>})}
            </tbody>
        </table>
    </>
}

export default studentAdd;