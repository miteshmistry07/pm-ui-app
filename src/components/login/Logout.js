import React from 'react';
import { authenticationService } from '../../service/AuthenticationService';
import { useHistory } from 'react-router-dom';

function Logout() {

    let history = useHistory();

    function logOut() {       
        if (window.confirm("Are you sure you want to logout?")) {
            authenticationService.logout();
            history.push('/login');
        }
    }//logout

    return(
        <button className="dropdown-item" type="button" onClick={logOut}>Logout</button>
    );
}

export default Logout;