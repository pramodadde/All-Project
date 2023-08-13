import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Teacher() {
    // const navigate = useNavigate();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("/checkforauthentication")
        .then(res => {
            console.log(res.data.message);
            if((res.data.message !== "authenticated") || (res.data.role === "student")) {
                navigate("/");
            }
        });
    });

    return (
        <>
            <div className="p-3 mb-2  ">
                <div className="container">

                    <div className="row  py-5 m-2 justify-content-md-center ">
                        <div className="col-sm-5">
                            <div className="row bxshdow rounded-3 p-1">
                                <div className="col-sm-12  d-flex flex-column justify-content-center ">

                                    <div className="justify-content-center align-items-center">
                                        <h2 className="fw-bold py-2 m-2 text-center">Teaccher Dashboard</h2>

                                        <div>
                                            <div class="text-center p-5">

                                                <div  >
                                                    <p className="m-3">Welcome to Faculty DashBoard</p>
                                                </div>

                                                <button type="button" class="btn btn-primary m-2" onClick={() => navigate("/insert-student")} >Insert Student</button>
                                                <button type="button" class="btn btn-warning text-white m-2" onClick={() => navigate("/insert-marks")} >Insert Mark</button>
                                                {/* <button type="button" class="btn btn-danger  m-2 " onClick={() => navigate("/insert-mark")}>student login</button> */}


                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Teacher;