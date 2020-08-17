import React from 'react';

import {Link} from 'react-router-dom';

function Navigation() {
    //navbar-nav 
    return(
        <div className="row">
            <div className="col">
                <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                    <button
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarSupportedContent" 
                        >
                        <span className="navbar-toggler-icon"></span>&nbsp;Menu
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent"> 
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a  className="nav-link dropdown-toggle"  
                                    id="navbarDropdown" 
                                    role="button" 
                                    data-toggle="dropdown" 
                                    href="()=>{}"    
                                >Add
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to='/addPremise'>
                                        <span className="dropdown-item">
                                            Premise
                                        </span>
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a  className="nav-link dropdown-toggle"  
                                    id="navbarDropdown" 
                                    role="button" 
                                    data-toggle="dropdown"
                                    href="()=>{}" 
                                >View
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to="/viewAllPremises">
                                        <span className="dropdown-item" >
                                            All Premises
                                        </span>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>  
    );
}

// <li className="nav-item"> <a className="nav-link disabled" href="#">Disabled</a></li>
/*
<li className="nav-item active">
                        <a className="nav-link" >Home<span className="sr-only">(current)</span></a>
                    </li>

<div className="dropdown-divider"></div>
                            <a className="dropdown-item" >Something else here</a>
*/
export default Navigation;