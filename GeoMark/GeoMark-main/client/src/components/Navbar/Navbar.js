import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css'
import { MyContext } from '../MyProvider/MyProvider';
import LiveSessions from '../LiveSessions/LiveSessions';

function Navbar() {
    const [flags, setFlags] = useContext(MyContext);
    const navigate = useNavigate();
    function handleLogout() {
        axios.post("/logout")
        .then((res) => {
            if(res.data.message === "logout successfully") {
                navigate("/");
            }
            else {
                alert(res.data.message);
            }
        })
    }

    return (
        <>
 {flags.sidebar && <div class="sidebar">
  {/* <a class="active" href="#home">Home</a> */}
  {flags.addStudent && <a onClick={() => navigate("/teacher/insert-student")}>Add Student</a>}
  {flags.createSession && <a onClick={() => navigate("/teacher/create-session")}>Create Session</a>}
  {flags.liveSession && <a onClick={() => navigate("/student/live-sessions")}>Live Sessions</a>}
  {flags.attendance && <a onClick={() => navigate("/student/attendance")}>attendance</a>}
  {flags.logout && <a onClick={handleLogout}>Logout</a>}
</div>}


    </>
    );
}

export default Navbar;