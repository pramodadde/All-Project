import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { MyContext } from '../MyProvider/MyProvider';

function DefaultR(props) {
    const [flags, setFlags] = useContext(MyContext);
    setFlags({
        sidebar: true,
        addStudent: false,
        createSession: false,
        liveSession: false,
        attendance: false,
        logout: false
    });

    const navigate = useNavigate();
    return (
        <div class="text-center p-5">

                <div  >
                    <p className="m-3">Welcome to Formfilling and Result Processing System</p>
                </div>

                <button type="button" class="btn btn-primary m-2" onClick={() => navigate("/teacher-login")} >Teacher login</button>
                <button type="button" class="btn btn-warning text-white m-2" >college login</button>
                <button type="button" class="btn btn-danger  m-2 " onClick={() => navigate("/student-login")}>student login</button>
                

            </div>
    );
}

export default DefaultR;