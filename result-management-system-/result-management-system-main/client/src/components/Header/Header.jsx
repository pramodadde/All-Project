import React from "react";
import { useNavigate } from "react-router-dom";
import wcelogo from '../../images/WCE-Sangli-Logo.png'

const Header = () => {
    const navigate = useNavigate();

    return (
        <div>

            {/* <nav className="navbar navbar-expand-lg  bg-light sticky-top shadow " id="mainNav">
                <div className="container px-4 py-1">
                    <div className=" mx-auto">
                        <ul className="navbar-nav mx-auto">
                            <li><a className="m-1" onClick={() => navigate("/")}><img className="img-fluid" src={wcelogo} style={{ height: '70px' }} alt="" /></a></li>
                            <li className="m-3" ><a className="my-2 fs-3" onClick={() => navigate("/")}  > <h4 className="" >Walchand college of Engineering </h4></a></li>
                        
                        </ul>

                    </div>

                </div>
            </nav> */}
        </div>
    );
}

export default Header;