import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const navigate = useNavigate();

    function error() {
        toast.error('Page Note Found', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });
    }

    return (
        <>
            <Header />
            <div class="text-center p-5">

                <div  >
                    <p className="m-3">Welcome to Formfilling and Result Processing System</p>
                </div>

                <button type="button" class="btn btn-primary m-2" onClick={() => navigate("/teacher-login")} >Teacher login</button>
                <button type="button" class="btn btn-warning text-white m-2" onClick={error} >college login</button>
                <button type="button" class="btn btn-danger  m-2 " onClick={() => navigate("/student-login")}>student login</button>
                

            </div>

        </>

    );
}

export default Home;