import "./App.css";
// import Data from './components/Data'
import { useState } from "react";
import Header from "./components/Header.jsx";
import Data from "./components/Data";
import StudentList from "./components/studentList.jsx";
import AddStudent from "./components/AddStudent.jsx";
function App() {
  const [student, setStudent] = useState(Data);
  const [defaultList, setDefaultList] = useState("All");
  const branch = ["IT", "CV", "CS", "Mech"];

  const addingStudent = (roll , name,  gender , branch) => {
    setStudent([...student, { roll, name, gender, branch }]);
  };

  const identify = () => {
    let roll = rollRef.current.value;
    const unique = student.findIndex((check) => {
      return check.roll == roll;
    });

    if (unique === -1) {
      setError("");
    } else {
      let message = "This roll no is already taken";
      setError(message);
    }
  };

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
  return (
    <>
      <Header />
      <AddStudent student={student} setDefaultList={setDefaultList} addingStudent={addingStudent} branch={branch} male={male} female={female} All={All}/>
      <StudentList student={student} defaultList={defaultList} />
    </>
  );
}

export default App;
