import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Unauthorized() {
    const navigate = useNavigate();
    const [deviceId, setDeviceId] = useState("");

    function handleChange(event) {
        const {name, value} = event.target;
        setDeviceId(value);
        console.log(deviceId);
    }

    function handleClick() {
        axios.post("/insert-unauthorized-user", {deviceId: deviceId})
        .then(res => {
            if(res.data.message === "success") {
                alert("Successfully Inserted")
            }
            else {
                alert(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>

            <div className="p-3 mb-2  ">
                <div className="container">

                    <div className="row  py-5 m-2 justify-content-md-center ">
                        <div className="col-sm-5">
                            <div className="row bxshdow rounded-3 p-1">
                                <div className="col-sm-12  d-flex flex-column justify-content-center ">

                                    <div className="justify-content-center align-items-center">
                                        <h2 className="fw-bold py-2 m-2 text-center">Insert Unauthorized User</h2>
                                        <form role="form">

                                            <div className="form-group m-3">
                                                <label for="exampleInputEmail1" class="form-label">Device Id</label>
                                                <input type="text" name="deviceId" placeholder="device Id" value={deviceId} onChange={handleChange} className="form-control input-lg" />
                                            </div>




                                            <div className="d-flex justify-content-center m-3">
                                                <button onClick={handleClick} type="button" className="btn btn-outline-danger rmdbut rounded-3 grnbtn shadow" > Insert </button>
                                            </div>


                                            <div className="text-center">
                                                <p>New User ? <a className="blulink" onClick={() => navigate("/teacher-register")} >Sign Up</a></p>
                                            </div>

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

export default Unauthorized;