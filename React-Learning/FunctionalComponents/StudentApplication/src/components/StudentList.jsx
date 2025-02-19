function StudentList({student , defaultList }){
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
export default StudentList;