import React from 'react';
import logo from '../assets/icon.ico';
import {Link} from 'react-router-dom';
import LoginStatus from './login/LoginStatus';

function Brand() {

    return(
        <div className="container">
            <div className="row brandRow">
                <div className="brandColumn text-center">
                    <Link to="/">
 	                    <img src={logo} alt="logo" className="brandLogo"/>
                        <p className="h4 font-weight-bold inlineText">Property Management System</p>
                    </Link>
                </div>
                <div className="loginStatusColumn">
                    <LoginStatus/>
                </div>
            </div> 
        </div>
    );
}

export default Brand;