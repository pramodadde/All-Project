import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";



function TeacherR() {
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        username: "",
        password: "",
        repassword: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    function handleClick() {
        if(user.username && user.password && user.repassword) {
            console.log(user);
            if(user.password === user.repassword) {
                axios.post("/teacherregister", {username: user.username, password: user.password})
                .then(res => {
                    if(res.data.message === "Successfully registered") {
                        alert("Successfully registered");
                        navigate("/teacher/home");
                    }
                    else {
                        alert(res.data.message);
                    }
                })
            }
            else {
                alert("Enter correct password");
            }
        }
        else {
            alert("Please enter valid input");
        } 
    }

    return (
        // <div>
        //     <h2>Teacher Register</h2>
        //     <input type="username" name="username" placeholder="username" value={user.username} onChange={handleChange}></input><br />
        //     <input type="password" name="password" placeholder="password" value={user.password} onChange={handleChange}></input><br />
        //     <input type="password" name="repassword" placeholder="Re-enter password" value={user.repassword} onChange={handleChange}></input><br />
        //     <button onClick={handleClick}>Register</button> <button onClick={() => navigate("/teacher-login")}>Login</button>
        // </div>

        <>
            <div className="p-3 mb-2  ">
                <div className="container">

                    <div className="row  py-5 m-2 justify-content-md-center ">
                        <div className="col-sm-5">
                            <div className="row bxshdow rounded-3 p-1">
                                <div className="col-sm-12  d-flex flex-column justify-content-center ">

                                    <div className="justify-content-center align-items-center">
                                        <h2 className="fw-bold py-2 m-2 text-center">Faculty Sign Up</h2>
                                        {/* <form role="form"> */}

                                        <div className="form-group m-3">
                                            <input type="username" name="username" placeholder="username" value={user.username} onChange={handleChange}
                                                className="form-control input-lg" />
                                        </div>


                                        {/* <div className="form-group m-3">
                                            <input type="email" name="email"
                                                className="form-control input-lg" placeholder="email" />
                                        </div> */}

                                        <div className="form-group m-3">
                                            <input type="password" name="password" placeholder="password" value={user.password} onChange={handleChange}
                                                className="form-control input-lg" />
                                        </div>



                                        <div className="form-group m-3">
                                            <input type="password" name="repassword" placeholder="Re-enter password" value={user.repassword} onChange={handleChange}
                                                className="form-control input-lg" />
                                        </div>




                                        <div className="d-flex justify-content-center m-3">
                                            <button onClick={handleClick} className="btn btn-outline-danger rmdbut rounded-2 grnbtn shadow"> SIGN UP </button>
                                        </div>

                                        {/* <div>
                                            <h2>Teacher Register</h2>
                                            <input type="username" name="username" placeholder="username" value={user.username} onChange={handleChange}></input><br />
                                            <input type="password" name="password" placeholder="password" value={user.password} onChange={handleChange}></input><br />
                                            <input type="password" name="repassword" placeholder="Re-enter password" value={user.repassword} onChange={handleChange}></input><br />
                                            <button onClick={handleClick}>Register</button> <button onClick={() => navigate("/teacher-login")}>Login</button>
                                        </div>

                                        <div className="text-center">
                                            <p>Already User ? <a className="blulink" onClick={() => navigate("/teacher-login")} >Sign In</a>  </p>
                                        </div> */}


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

export default TeacherR;


