import { Component } from "react";
import Data from "./Data.js"
class Display extends Component{
    constructor(){
        super();
        this.state = {
            dataList : Data
        }
    }
    male = ()=>{
        let male = Data.filter((data)=>{return data.gender == 'Male'})
        this.setState({dataList : male});
        console.log("success");
        
    }
    female = ()=>{
        let female = Data.filter((data)=>{return data.gender == "Female"});
        this.setState({dataList : female});
    }
    All = ()=>{
        this.setState({dataList : Data})
    }
    render (){
        return <>
        <div>
            <input onClick={this.male} className="m-4 " name="gender" id="male" type="radio" />
            <label for="male">Male</label>
            <input onClick={this.female} className="m-4 " name="gender" id="female" type="radio" />
            <label for="female">female</label>
            <input onClick={this.All} className="m-4 " name="gender" id="All" type="radio" />
            <label for="All">All</label>
        </div>
        <div className="mt-3">
            <table className="table table-borderd">
                <thead>
                    <tr>
                        <th>Roll No.</th>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.dataList.map((data , index)=>{return <tr key={index}>
                        <td>{data.roll}</td>
                        <td>{data.name}</td>
                        <td>{data.branch}</td>
                        <td>{data.gender}</td>
                    </tr>})}
                </tbody>
            </table>
        </div>
        </>
    }
}
export default Display;