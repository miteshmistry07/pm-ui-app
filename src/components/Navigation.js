import React from 'react';
import logo from '../icon.ico';

function Navigation() {
    
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <img src={logo} alt="logo"/>
            <a className="navbar-brand" href="#" style={{ marginLeft: '20px'}} >Property Management</a>
            <button 
                className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a  className="nav-link dropdown-toggle"  
                            id="navbarDropdown" 
                            role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >Add
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" >Premise</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a  className="nav-link dropdown-toggle"  
                            id="navbarDropdown" 
                            role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >View
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" >All Premises</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
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