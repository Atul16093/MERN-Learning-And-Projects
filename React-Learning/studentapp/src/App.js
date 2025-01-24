import { Component } from "react";
import "./App.css";
import Header from "./components/Header.js";
import data from "./data.js";
class App extends Component {
  constructor() {
    super();
    this.state = {
      studentList: data,
      branchList: ["IT", "CS", "ES", "MA"],
    };
  }
  addRecord = () => {
    let roll = this.roll.value;
    let name = this.name.value;
    let mobile = this.mobile.value;
    let grade = this.grade.value;
    let branch = this.branch.value;
    // let address = this.address.value;
    let store = { roll, name, mobile, grade, branch };
    console.log(store);
    this.setState({ studentList: [...this.state.studentList, store] });
  };
  deleteRecord = (roll) => {
    let index = this.state.studentList.findIndex((student) => {
      return student.roll == roll;
    });
    this.state.studentList.splice(index, 1);
    this.setState({ studentList: [...this.state.studentList] });
  };
//Here we defined the state for filter by event click
  IT = () => {
    let IT = this.state.studentList.filter((student) => {
      return student.branch == "IT";
    });
    this.setState({studentList : IT});
  };
  CS = () =>{
    let cs = this.state.studentList.filter((student)=>{
      return student.branch == "CS";
    })
    this.setState({studentList : cs})
  }
  MCA = () =>{
    let mca = this.state.studentList.filter((student)=>{
      return student.branch == "MCA";
    })
    this.setState({studentList : mca})
  }
  ES = () =>{
    let es = this.state.studentList.filter((student)=>{
      return student.branch == "es";
    })
    this.setState({studentList : es})
  }
  //this function work as a reset 
  total = () =>{
    this.setState({studentList : data});
  }
  render() {
    return (
      <>
        <Header />
        <div className="container">
          <div className="my-2 col-md-6">
            <input
              ref={(rollInput) => {
                this.roll = rollInput;
              }}
              id="roll"
              type="text"
              className="form-control"
              placeholder="Enter your roll number"
            />
          </div>
          <div className="my-2 col-md-6">
            <input
              ref={(nameInput) => {
                this.name = nameInput;
              }}
              type="text"
              className="form-control"
              placeholder="Enter student name"
            />
          </div>
          <div className="my-2 col-md-6">
            <input
              ref={(mobileInput) => {
                this.mobile = mobileInput;
              }}
              type="text"
              className="form-control"
              placeholder="Enter Phone brand "
            />
          </div>
          <div className="my-2 col-md-6">
            <input
              ref={(gradeInput) => {
                this.grade = gradeInput;
              }}
              type="text"
              className="form-control"
              placeholder="Enter Grade"
            />
          </div>
          {/* <div className = 'my-2 col-md-6'>
            <input ref = {(address)=>{this.address = address}} type = 'text' className = 'form-control' placeholder = "Enter your Address" />
          </div> */}
          <div className="col-md-6">
            <select
              ref={(branchInput) => {
                this.branch = branchInput;
              }}
              className="form-select"
            >
              <option selected>Select Branch</option>
              {this.state.branchList.map((branch, index) => {
                return <option key={index}>{branch}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6">
            <button className="btn btn-success" onClick={this.addRecord}>
              Add
            </button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary m-1" onClick={this.IT}>
              {" "}
              IT{" "}
            </button>
            <button className="btn btn-info m-1" onClick={this.CS}>
              {" "}
              CS{" "}
            </button>
            <button className="btn btn-warning m-1" onClick={this.MCA}>
              {" "}
              MCA{" "}
            </button>
            <button className="btn btn-danger m-1" onClick={this.ES}>
              {" "}
              ES{" "}
            </button>
            <button className="btn btn-danger m-1" onClick={this.total}>
              {" "}
              Reset {" "}
            </button>
          </div>

           <div className="col-md-6">
            <button className="btn btn-primary">
              {" "}
              IT(
              {
                this.state.studentList.filter((student) => {
                  return student.branch == "IT";
                }).length
              }
              )
            </button>
            <button className="btn btn-danger">
              {" "}
              CS (
              {this.state.studentList.filter((student) => {
                return student.branch == "CS";
              }).length}
              )
            </button>
            <button className="btn btn-info">
              {" "}
              ES (
              {this.state.studentList.filter((student) => {
                return student.branch == "ES";
              }).length}
              )
            </button>
            <button className="btn btn-warning">
              {" "}
              MCA (
              {this.state.studentList.filter((student) => {
                return student.branch == "MCA";
              }).length}
              )
            </button>
          </div> 
        </div>
        <table className=" table  border text-center">
          <thead className="border text-center">
            <th>Roll No.</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Grade</th>
            <th>Branch</th>
            <th>Delete</th>
          </thead>
          <tbody className="border ">
            {this.state.studentList.map((data, index) => {
              return (
                <tr className="border" key={index}>
                  <td className="border">{data.roll}</td>
                  <td className="border">{data.name}</td>
                  <td className="border">{data.mobile}</td>
                  <td className="border">{data.grade}</td>
                  <td className="border">{data.branch}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteRecord(data.roll)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default App;
