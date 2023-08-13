import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function StudentL() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    function handleClick() {
        axios.post("/studentlogin", { username: user.username, password: user.password, role: "student" })
            .then(res => {
                if (res.data.message === "login Successfull") {
                    alert("login Successfull");
                    navigate("/student/home");
                }
                else {
                    alert(res.send.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        // <div>
        //     <h2>Student Login</h2>
        //     <input type="text" name="username" placeholder="username" value={user.username} onChange={handleChange}></input><br />
        //     <input type="password" name="password" placeholder="password" value={user.password} onChange={handleChange}></input><br />
        //     <button onClick={handleClick}>Login</button>
        // </div>


        <>

            {/* <div>
                <h2>Student Login</h2>
                <input ></input><br />
                <input ></input><br />
                <button onClick={handleClick}>Login</button>
            </div> */}



    

            <div className="p-3 mb-2  ">
                <div className="container">

                    <div className="row  py-5 m-2 justify-content-md-center ">
                        <div className="col-sm-5">
                            <div className="row bxshdow rounded-3 p-1">
                                <div className="col-sm-12  d-flex flex-column justify-content-center ">

                                    <div className="justify-content-center align-items-center">
                                        <h2 className="fw-bold py-2 m-2 text-center">Student Login</h2>
                                        <form role="form">
                                            <div className="form-group m-3">
                                                <label  class="form-label">PRN</label>
                                                <input type="text" name="username" placeholder="username" value={user.username} onChange={handleChange} className="form-control input-lg"  />
                                            </div>

                                            <div className="form-group m-3">
                                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                                <input type="password" name="password" placeholder="password" value={user.password} onChange={handleChange}
                                                    className="form-control input-lg"  />
                                            </div>

                                            <div className="d-flex justify-content-center m-3">
                                                <button onClick={handleClick} type="button" className="btn btn-outline-danger rmdbut rounded-3 grnbtn shadow" > Login </button>
                                            </div>


                                            {/* <div className="text-center">
                                                <p>New User ? <a className="blulink" onClick={() => navigate("/StudentSignup")} >Sign Up</a></p>
                                            </div> */}

                                        </form>
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

export default StudentL;