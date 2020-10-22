import React from 'react';
import {Link} from 'react-router-dom';
import login from '../../assets/login.png';
import {authenticationService } from '../../service/AuthenticationService';
import Logout from './Logout';

class LoginStatus extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            username: ""
        }
        this.usernameSub = null;
    }

    componentDidMount() {

        this.usernameSub = authenticationService.currentUser.subscribe((data) => {
            //console.log(this.state);
            //if we have username then update state if not clear state which will trigger re-render
            if (data) {
                this.setState({
                    username: data,
                    isLoggedIn: true
                });
            }
            else{
                //clear state
                this.setState({
                    username: "",
                    isLoggedIn: false
                });
            }
        });
    } 

    componentWillUnmount() {
        this.usernameSub.unsubscribe();
    }

    render() {
        
        if (this.state.isLoggedIn === true) {
            return(
                <div className="dropdown"> 
                    <button 
                        className="btn btn-link dropdown-toggle" 
                        type="button" 
                        
                        data-toggle="dropdown" 
                        >
                        {this.state.username}
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Logout/>
                    </div>
                </div>
            );
        }
        else {
            return(
                <span>
                    <img src={login} alt="login" />            
                    <Link to='/login'><p className="font-weight-bold inlineText">Sign in</p></Link>
                </span>
            );
        }
   } //render 
    //<img src={login} alt="login" />&nbsp;
}

export default LoginStatus;