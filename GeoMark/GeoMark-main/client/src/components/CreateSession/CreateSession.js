import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import './CreateSession.css';

function CreateSession(props) {

    const [sessions, setSessions] = useState([]);
    const [password, setPassword] = useState();
    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        const getSessions = async () => {
            try {
                const response = await axios.post("/get-sessions");
                setSessions(response.data.sessions);
            } catch (error) {
                console.error(error);
            }
        };
        getSessions();

    });


    function handleClick() {
        const currentDate = new Date().toISOString().substr(0, 10);
        console.log(currentDate); // outputs "2023-04-12"
        const now = new Date();
        const currentTime = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
        console.log(currentTime);

        function getLocation() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("loacation not found");
            }

            function showPosition(position) {
                axios.post("/create-session", { currentDate: currentDate, currentTime: currentTime, password: password, latitude: position.coords.latitude, longitude: position.coords.longitude })
                    .then(res => {
                        if (res.data.message === "Successfully Created") {
                            alert("Successfully Created");
                        }
                        else {
                            alert(res.data.message);
                        }
                    });
                setPassword("");
            }
        }

        getLocation();

    }

    function handleChange(e) {
        setPassword(e.target.value);
    }

    function handleSession(session) {
        const stopSession = async () => {
            try {
                const response = await axios.post("/stop-session", { date: session.currentDate, time: session.currentTime })
                if (response.data.message === "success") {
                    alert("Success")
                }
            } catch (error) {
                console.error(error);
            }
        };
        stopSession();
    }

    function handleAttendance(session) {
        // console.log(session);
        const getAttendance = async () => {
            try {
                const response = await axios.post("/attendances", { date: session.currentDate, time: session.currentTime })
                if (response.data.message === "success") {
                    setAttendances(response.data.entries);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getAttendance();
    }

    function handleUpdate(attendance) {
        console.log("1");
        const updateAttendance = async () => {
            try {
                const response = await axios.post("/update-attendances", { username: attendance.username, date: attendance.date, time: attendance.time })
            } catch (error) {
                console.error(error);
            }
        };
        updateAttendance();
    }

    return (
        <>
            <div className="container" style={{ maxWidth: "55%" }}>
                <button type="button" className="btn btn-dark mt-3" onClick={handleClick}>Create Session</button>
                {/* <input type="password" className="form-control mt-3" placeholder="Enter password" onChange={handleChange} value={password} /> */}
                <hr />
                <h1 className="text-center my-4">Sessions</h1>
                <ul className="list-group">
                    {sessions && sessions.map(session => (
                        <li key={session._id} className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleAttendance(session)}>
                            {session.currentDate} {session.currentTime}
                            {(session.isOn) && <button type="button" className="btn btn-danger" onClick={() => handleSession(session)}>Stop</button>}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container" style={{ maxWidth: "55%" }}>
                <hr />
                <h1 className="text-center my-4">Student Attended</h1>
                <ul className="list-group">
                    {attendances &&
                        attendances.map((attendance) =>
                            attendance.isPresent && (
                                <li
                                    key={attendance._id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    {attendance.username}
                                    <div>
                                        <button
                                            className="delete-btn mx-2"
                                            onClick={() => handleUpdate(attendance)}
                                        >
                                            Mark as Absent
                                        </button>
                                    </div>
                                </li>
                            )
                        )}
                </ul>

            </div>

        </>


    );
}

export default CreateSession;