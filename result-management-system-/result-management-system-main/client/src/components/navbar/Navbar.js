import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Navbar() {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);

    const [once, setOnce] = useState(true);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        axios.post("/checkforauthentication")
        .then(res => {
            // if(res.data.message === "not authenticated") {
            //     navigate("/");
            // }
            // else {
            //     navigate("/insert-student");
            // }
            setUsername(res.data.username);
            if(res.data.message === "authenticated") {
                setFlag(true);
                setRole(res.data.role);
            }

            if(res.data.message !== "authenticated") {
                setFlag(false);
            }
            // if(res.data.message)
            // else {
            //     setFlag(false);
            // }
            
        });
    });

    // once && axios.post("/checkforauthentication")
    // .then(res => {
    //     if(res.data.message === "authenticated") {
    //         setFlag(true);
    //     }
    //     else {
    //         setFlag(false);
    //     }
    //     setOnce(false);
    // });


    return (
        <div>
            <nav className="navbar navbar-expand-lg  bg-light sticky-top shadow " id="mainNav">
                <div className="container px-4 py-1">

                    {/* <div >
                        <a className="m-1" href="/"><img className="img-fluid" src={wcelogo} style={{ height: '70px' }} alt="" /></a>
                    </div> */}

                    <a onClick={() => navigate("/")} className="navbar-brand fw-bold fs-3" style={{ letterSpacing: 2 }} >  Walchand College Of Engineering , Sangli    </a>

                    <button className="navbar-toggler border border-white " type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse fw-semibold" id="navbarResponsive">
                        {flag && <ul className="navbar-nav ms-auto">
                            {(role==="teacher") && <li className="nav-item"><a className="nav-link " onClick={() => {
                                axios.post("/checkforauthentication")
                                .then(res => {
                                    if(res.data.message === "not authenticated") {
                                        navigate("/");
                                    }
                                    else {
                                        navigate("/insert-student");
                                    }
                                });
                            } } >Insert Student</a></li>}
                            {(role==="teacher") && <li className="nav-item"><a className="nav-link " onClick={() => {
                                axios.post("/checkforauthentication")
                                .then(res => {
                                    if(res.data.message === "not authenticated") {
                                        navigate("/");
                                    }
                                    else {
                                        navigate("/insert-marks");
                                    }
                                });
                            }} >Insert Marks</a></li>}
                            {(role==="teacher") && <li className="nav-item"><a className="nav-link " onClick={() => {
                                axios.post("/checkforauthentication")
                                .then(res => {
                                    if(res.data.message === "not authenticated") {
                                        navigate("/");
                                    }
                                    else {
                                        navigate("/insert-unauthorized-user");
                                    }
                                });
                            }} >Insert Unauthorized user</a></li>}
                            <li className="nav-item"><a className="nav-link " onClick={() => {
                                axios.post("/logout")
                                .then(res => {
                                    console.log("hello2")
                                    if(res.data.message === "logout successfull") {
                                        navigate("/");
                                    }
                                    else {
                                        navigate("/");
                                    }
                                })
                                .catch((error) => {
                                    console.log(error); 
                                });
                            }} >Logout</a></li>
                        </ul>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;