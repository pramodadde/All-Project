import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function InsertMarks() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        sem: 0,
        subject: "",
        marks: ""
    });

    useEffect(() => {
        async function checkAuthentication() {
            try {
              const res = await axios.post("/checkforauthentication");
              console.log(res.data.message);
              if ((res.data.message !== "authenticated") || (res.data.role === "student")) {
                navigate("/");
              }
            } catch (error) {
              console.log(error);
            }
          }
          checkAuthentication();
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        });
        // console.log(user);
    }

    function handleClick() {
        if(user.username && user.sem && user.subject && user.marks) {
            axios.post("/insert-marks", {username: user.username, sem: user.sem, subject: user.subject, marks: user.marks})
            .then(res => {
                if(res.data.message === "Mark Inserted") {
                    alert("Successfully Inserted");
                }
                else {
                    alert(res.data.message);
                }
            });
        }
        else {
            alert("Please enter valid input");
        } 
    }

    return (<div className="p-3 mb-2  ">
                <div className="container">

                    <div className="row  py-5 m-2 justify-content-md-center ">
                        <div className="col-sm-5">
                            <div className="row bxshdow rounded-3 p-1">
                                <div className="col-sm-12  d-flex flex-column justify-content-center ">

                                    <div className="justify-content-center align-items-center">
                                        <h2 className="fw-bold py-2 m-2 text-center">INsert Mark</h2>
                                        <form role="form">
                                            <div className="form-group m-3">
                                                <label  className="form-label">username</label>
                                                <input type="username" name="username" placeholder="username" value={user.username} onChange={handleChange} className="form-control input-lg"  />
                                            </div>

                                            <div className="form-group m-3">
                                                <label for="exampleInputPassword1" className="form-label">Semister</label>
                                                <input  name="sem" placeholder="semister" value={user.sem} onChange={handleChange}
                                                    className="form-control input-lg"  />
                                            </div>

                                            <div className="form-group m-3">
                                                <label for="exampleInputPassword1" className="form-label">Subject</label>
                                                <input name="subject" placeholder="subject name" value={user.subject} onChange={handleChange}
                                                    className="form-control input-lg"  />
                                            </div>

                                            <div className="form-group m-3">
                                                <label for="exampleInputPassword1" className="form-label">marks</label>
                                                <input name="marks" placeholder="marks" value={user.marks} onChange={handleChange}
                                                    className="form-control input-lg"  />
                                            </div>


                                            <div className="d-flex justify-content-center m-3">
                                                <button onClick={handleClick} type="button" className="btn btn-outline-danger rmdbut rounded-3 grnbtn shadow" > Insert Mark </button>
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


    )
}

export default InsertMarks;