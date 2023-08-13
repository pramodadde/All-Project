import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Section from './components/section/Section';
import Slogin from './components/slogin/Slogin';
import Sregister from './components/sregister/Sregister';
import Student from './components/student/Student';
import Teacher from './components/teacher/Teacher';
import Tlogin from './components/tlogin/Tlogin';
import Tregister from './components/tregister/Tregister';
import InsertStudent from './components/createStudent/InsertStudent';
import InsertMarks from './components/insertMarks/InsertMarks';
import Unauthorized from './components/Unauthorized/Unauthorized'

import Header from './components/Header/Header';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <Navbar />
      {/* <ToastContainer/> */}
      <Routes>
        <Route path="/section" element={<Section />} />
        <Route path="/student-login" element={<Slogin />} />
        <Route path="/student-register" element={<Sregister />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacher-login" element={<Tlogin />} />
        <Route path="/teacher-register" element={<Tregister />} />
        <Route path="/insert-student" element={<InsertStudent />} />  
        <Route path="/insert-marks" element={<InsertMarks />} />  
        <Route path="/insert-unauthorized-user" element={<Unauthorized />} /> 


        <Route path="/" element={<Home />} />  
      </Routes>
    </Router>
  );
}

export default App;


