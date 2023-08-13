import React from "react";
import { useNavigate } from "react-router-dom";

function Section() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/student-login")}>Student Section</button>
            <button onClick={() => navigate("/teacher-login")}>Faculty Section</button>
        </div>
    )
}

export default Section;