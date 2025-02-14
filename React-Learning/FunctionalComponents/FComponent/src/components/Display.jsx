import Data from "./Data.js"
import { useState} from 'react'
const Display = ({st})=>{
    let [student , setStudent] = useState(Data);
    return <>
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
                {student.map((individual , index)=>{ return <tr key={index}>
                    <td>{individual.roll}</td>
                    <td>{individual.name}</td>
                    <td>{individual.gender}</td>
                    <td>{individual.branch}</td>
                </tr>})}
            </tbody>
        </table>
    </>
}
export default Display;