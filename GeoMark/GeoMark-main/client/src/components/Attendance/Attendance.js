import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function Attendacne(props) {

    const [attendances, setAttendances] = useState([]);
    const [password, setPassword] = useState();
    const [teachers, setTeachers] = useState([]);


    useEffect(() => {
        const getTeachers = async () => {
            try {
                const response = await axios.post("/get-teachers");
                setTeachers(response.data.teachers);
            } catch (error) {
                console.error(error);
            }
        };
        getTeachers();
    });

    function handleClick(teacher) {
        console.log(teacher);
        const getAttendance = async () => {
            try {
                const response = await axios.post("/get-attendance", {teacher: teacher});
                setAttendances(response.data.entries);
            } catch (error) {
                console.error(error);
            }
        };
        getAttendance();
    }

    return (
    <>
        <div className="container" style={{ maxWidth: "55%" }}>
            {/* <input type="password" className="form-control mt-3" placeholder="Enter password" onChange={handleChange} value={password} /> */}
            <hr />
            <h1 className="text-center my-4">Teachers</h1>
            <ul className="list-group">
                {teachers && teachers.map(teacher => (
                    <li key={teacher._id} className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleClick(teacher.teacher)}>
                        {teacher.teacher}
                    </li>
                ))}
            </ul>
        </div>
        <div className="container" style={{ maxWidth: "55%" }}>
            {/* <input type="password" className="form-control mt-3" placeholder="Enter password" onChange={handleChange} value={password} /> */}
            <hr />
            <h1 className="text-center my-4">Attendacne</h1>
            <ul className="list-group">
                {attendances && attendances.map(attendance => (
                    <li key={attendance._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {attendance.date} {attendance.time}
                    </li>
                ))}
            </ul>
        </div>
    </>
    );
}

export default Attendacne;