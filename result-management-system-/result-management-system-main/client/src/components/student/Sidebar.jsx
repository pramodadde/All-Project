import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import wcelogo from '../../images/WCE-Sangli-Logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Sidebar = () => {
    function error() {
        toast.error('Page Note Found', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });
    }
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }} >
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <img className="img-fluid" src={wcelogo} style={{ height: '35px' }} alt="" />
                    <a href="/" className="text-decoration-none mx-1" style={{ color: 'inherit' }}>WCOE </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>

                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem >Dashboard</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/profile" activeClassName="activeClicked">
                            <CDBSidebarMenuItem >Profile </CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink onClick={error} activeClassName="activeClicked">
                            <CDBSidebarMenuItem >Program </CDBSidebarMenuItem>
                        </NavLink>


                        <NavLink onClick={error} activeClassName="activeClicked">
                            <CDBSidebarMenuItem >Exam Forms </CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink onClick={error} activeClassName="activeClicked">
                            <CDBSidebarMenuItem >Grade Cards </CDBSidebarMenuItem>
                        </NavLink>


                        <NavLink exact to="/result" activeClassName="activeClicked">
                            <CDBSidebarMenuItem >Results </CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink onClick={error} activeClassName="activeClicked">
                            <CDBSidebarMenuItem >Enrollment Renewal </CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink onClick={error} activeClassName="activeClicked">
                            <CDBSidebarMenuItem >Student Services </CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink onClick={error} activeClassName="activeClicked">
                            <CDBSidebarMenuItem >Payments </CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink onClick={error} activeClassName="activeClicked">
                            <CDBSidebarMenuItem >Halltickets </CDBSidebarMenuItem>
                        </NavLink>


                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;