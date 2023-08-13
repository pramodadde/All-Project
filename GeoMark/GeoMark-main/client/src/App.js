
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import DefaultR from './components/DefaultR/DefaultR';
import TeacherL from './components/TeacherL/TeacherL';
import TeacherHome from './components/TeacherHome/TeacherHome';
import TeacherR from './components/TeacherR/TeacherR';
import InsertStudent from './components/InsertStudent/InsertStudent';
import CreateSession from './components/CreateSession/CreateSession';
import StudentL from './components/StudentL/StudentL';
import StudentHome from './components/StudentHome/StudentHome';
import Attendance from './components/Attendance/Attendance';
import LiveSessions from './components/LiveSessions/LiveSessions';



function App() {
  return (
    <Router>
      <Navbar />
      {/* <ToastContainer/> */}
      <Routes>
        {/* <Route path="/student-login" element={<Slogin />} />
        <Route path="/student-register" element={<Sregister />} /> */}
        {/* <Route path="/student" element={<Student />} /> */}
        <Route path="/teacher/home" element={<TeacherHome />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/teacher-login" element={<TeacherL />} />
        <Route path="/teacher-register" element={<TeacherR />} />
        <Route path="/student-login" element={<StudentL />} />
        <Route path="/teacher/insert-student" element={<InsertStudent />} />
        <Route path="/teacher/create-session" element={<CreateSession />} />
        <Route path="/student/live-sessions" element={<LiveSessions />} />
        <Route path="/student/attendance" element={<Attendance />} />
        {/* <Route path="/insert-student" element={<InsertStudent />} />  
        <Route path="/insert-marks" element={<InsertMarks />} />   */}
        <Route path="/" element={<DefaultR />} />  
      </Routes>
    </Router>
  );
}

export default App;