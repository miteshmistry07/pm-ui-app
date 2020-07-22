import React from 'react';
import {Link} from 'react-router-dom';
import login from '../../assets/login.png';
import {authenticationService } from '../../service/AuthenticationService';

class LoginStatus extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            username: ""
        }
    }

    componentDidMount() {

        authenticationService.currentUser.subscribe((data) => {
            //console.log(this.state);
            if (data) {
                this.setState({
                    username: data,
                    isLoggedIn: true
                });
            }
        });
    } 

    render() {
        
        if (this.state.isLoggedIn === true) {
            return(
                <ul className="navbar-nav" >
                    <li className="nav-item dropdown">
                            <a  className="nav-link dropdown-toggle"  
                                id="navbarDropdown" 
                                role="button" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false"
                            > {this.state.username}
                            </a>
                        <div className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Update Details</a></li>
                            <li><a className="dropdown-item" href="#">Log out</a></li>
                        </div>
                    </li>
                </ul>            
            );
        }
        else {
            return(
                <span className="mr-auto">
                    <img src={login} alt="login" />&nbsp;
                    <Link to='/login' className="badge badge-secondary">Sign in</Link>
                </span>
            );
        }
   } //render 
    //<img src={login} alt="login" />&nbsp;
}

export default LoginStatus;