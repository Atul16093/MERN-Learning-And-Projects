import { useRef } from "react";

function AddStudent({student , setDefaultList , addingStudent , branch , male , female , All}){
    const rollRef = useRef(null);
    const nameRef = useRef(null);
    const genderRef = useRef(null);
    const branchRef = useRef(null);
    return <>
     <div className="container m-2 ">
     <div className="row">
                 <div className="col-md-6">
                     <input ref={rollRef} id = "roll" className="form-control" type="text" placeholder="Enter your Roll No" />
                 </div>
                 <div className="col-md-6 ">
                     {/* error !== ""  */}
                     <input ref={nameRef} className="form-control" type="text" placeholder="Enter your Name" />
                 </div>
             </div>
    <div className="row">
                 <div className="col-md-6 mt-2">
                  <select  ref={genderRef}  className="form-control" name="gender" id="">
                     <option value="0">Select Gender</option>
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                  </select>
                 </div>
                 <div className="col-md-6 mt-2">
                   <select   ref={branchRef} className="form-control" name="branch" id="">
                     <option value="0">Select branch</option>
                     {branch.map((branch , index)=>{return <option key={index}>
                         {branch}
                     </option>})}
                   </select>
                 </div>
             </div>
    <div className="row">
                 <div className="col-md-6 mt-3">
                 <button onClick={()=>{ addingStudent(rollRef.current.value , nameRef.current.value , genderRef.current.value , branchRef.current.value)}} className="btn  btn-success">Add</button>
                 </div>
                 <div className="col-md-6 mt-3">
                 <button onClick={()=>{setDefaultList("IT")}} className="btn m-2  btn-outline-success" style={{width : 80}}>IT ({student.filter((filtering)=>{return filtering.branch == "IT"}).length})</button>
                 <button onClick={()=>{setDefaultList("CV")}} className="btn m-2 btn-outline-secondary" style={{width : 80}}>CV ({student.filter((filtering)=>{return filtering.branch == "CV"}).length})</button>
                 <button onClick={()=>{setDefaultList("Mech")}} className="btn m-2 btn-outline-warning" style={{width : 90}}>Mech ({student.filter((filtering)=>{return filtering.branch == "Mech"}).length})</button>
                 <button onClick={()=>{setDefaultList("CS")}} className="btn m-2 btn-outline-primary" style={{width : 80}}>CS ({student.filter((filtering)=>{return filtering.branch == "CS"}).length})</button>
                 <button onClick={()=>{setDefaultList("All")}} className="btn m-2 btn-outline-info" style={{width : 80}}>All ({student.length})</button>
                 </div>
             </div>
             <div className="row m-2">
             <div className="col-md-6">
                 <div>
                     <label >Gender : </label>
                     <input onClick={()=>{male()}} className="m-2" type="radio" id="male" name="gender"  />
                     <label htmlFor="male">Male</label>
                     <input onClick = {()=>{female()}} className="m-2" type="radio" id="female" name="gender" />
                     <label htmlFor="female">Female</label>
                     <input onClick={()=>{All()}} className="m-2" type="radio" id="all" name="gender" />
                     <label htmlFor="all">All</label>

                </div>
             </div>
         </div>
         </div>
    </>
}
export default AddStudent;