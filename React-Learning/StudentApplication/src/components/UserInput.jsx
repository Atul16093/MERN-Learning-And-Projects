import { Component } from "react";
import Data from "./Data";
class UserInput extends Component {
    constructor(){
        super();
        this.state = {
            Data : Data,
            branchList  : ["IT" , "CS" , "Mech" ,"CV"]
        }
    }
    addRecord = ()=>{
      let roll = this.roll.value;
      let name = this.name.value;
      let gender = this.gender.value;
      let branch = this.branch.value;
      let newArray = {roll , name , branch , gender };
      console.log(newArray);
      // this.setState({Data : [...this.state.Data , newArray]});
      this.state.Data.push({...newArray});
      this.setState({Data : [...this.state.Data , newArray]})
      

    }
  render() {
    return (
      <>
        <div className="container m-3">
          <div className="row m-3">
            <div className="col-md-6">
              <input ref={(obj)=>{this.roll = obj}}
                className="form-control"
                type="text"
                placeholder="Enter your Roll No"
              />
            </div>
            <div  className="col-md-6 ">
              <input ref={(obj)=>{this.name = obj}}
                className="form-control"
                type="text"
                placeholder="Enter your Name"
              />
            </div>
          </div>
            <div className="row m-3">
                <div className="col-md-6">
                    <select ref={(obj)=>{this.gender = obj}} className="form-control" name="Gender" id="">
                        <option value="0">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <select ref={(obj)=>{this.branch = obj}} className="form-control" name="branch" id="">
                        <option value="0">Select branch</option>
                        {this.state.branchList.map((branch , index)=>{ return <option key={index}>
                            {branch}
                        </option>})}
                    </select>
                </div>
            </div>
            </div>
            <div className="mt-3">
              <button onClick={this.addRecord} className="btn btn-success">ADD</button>
            </div>

      </>
    );
  }
}
export default UserInput;
