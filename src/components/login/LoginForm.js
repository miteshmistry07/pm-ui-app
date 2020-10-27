import React from 'react';
import logo from '../../assets/icon.ico';
import { authenticationService } from '../../service/AuthenticationService';
import { Redirect } from 'react-router-dom';


class LoginForm extends React.Component {

    constructor() {
        super();
        this.state = { 
            username: "",
            password: "",
            redirect: null
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.usernameSub = null;
    }

    handleOnChange(event) {
        //console.log(event.target.checked);
        const {name, value, type, checked } = event.target;        
        type === "checkbox" ? this.setState({[name]: checked}): this.setState( {[name]: value} );
    }

    handleSubmit(event) {
        event.preventDefault(); //stop refresh
        //remove redirect - dont need to send this to auth service
        let credentials = { ...this.state};
        delete credentials.redirect;
        //console.log(credentials);
        authenticationService.login(credentials);
        
        this.usernameSub = authenticationService.currentUser.subscribe((data) => {
            if (data) {
                this.setState({redirect:'/'});
            } 
        });       
    }

    componentWillUnmount() {
        if (this.usernameSub) {
            this.usernameSub.unsubscribe();
        }
    }

    render() {
        if (this.state.redirect) {
            return(<Redirect to={this.state.redirect} />)
        }
        return(
            <main>
                <img src={logo} alt="logo" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="username"
                        placeholder="Username" 
                        onChange={this.handleOnChange}
                        required
                        autoFocus
                    />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        name="password"
                        placeholder="Password" 
                        onChange={this.handleOnChange}
                        autoComplete="on"
                        required
                    />
                    <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
                </form>
            </main>
        )//return   
    } //render
}

export default LoginForm;