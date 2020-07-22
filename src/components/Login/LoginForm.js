import React from 'react';
import logo from '../../assets/icon.ico';
import { authenticationService } from '../../service/AuthenticationService';
//import LoginStatus from './LoginStatus';

class LoginForm extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOnChange(event) {
        //console.log(event.target.name);
        //console.log(event.target.checked);
        const {name, value, type, checked } = event.target;        
        type === "checkbox" ? this.setState({[name]: checked}): this.setState( {[name]: value} );
    }
/*
    checkStatus(response) {        
        if (!response.ok) {
            //false
            if (response.status !== 401 && response.status !== 400) {
                    throw new Error(response.status + " " + response.statusText);  
            }
        }
        return  Promise.resolve(response);
    }

    json(response) {
        return response.json()
    }
*/
    handleSubmit(event) {
        
        event.preventDefault(); //stop refresh
        authenticationService.login(this.state);
        /*
        let url = '/api/login';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }

        fetch(url, requestOptions)
            .then(this.checkStatus)
            .then(this.json)
            .then((data) => {
                if (data.status === 401) {
                    //bad credentials
                    console.error(data);
                    alert("Login " + data.message);
                }
                else if (data.status === 400) {
                    //not sure this required - no validation error from login
                    //need to loop around form errors
                    console.error(data);
                    let validationErrors = "";
        
                    for(let i=0; i < data.errors.length; i++) {
                            validationErrors += " " + data.errors[i]  + ".";
                    }
                    alert("form errors " + validationErrors);    
                }
                else {
                    //need to store the token in local storage/decode jwt payload
                    console.log('Success');
                    console.log(data);
                    //alert("Token received:" + data.token);
                    const payload = jws.decode(data.token);
                    //console.log(payload.sub);
                    console.log(payload);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", payload.sub);
                    localStorage.setItem("iat", payload.iat);
                    localStorage.setItem("exp", payload.exp);
                    localStorage.setItem("isLoggedIn", true);
                    console.log(new Date(payload.iat * 1000));
                    console.log(new Date(payload.exp * 1000));
                    authenticationService.login(payload.sub);
                    //new LoginStatus(true);                  
                }
            })
            .catch((error)=> {
                console.log("Error");
                console.log(error);
                alert("An error has occured. " + error.message);
            });
            */
    }

    render(){
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
                        required
                    />
                    <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
                </form>
                
            </main>
        ); //return
    } //render
}

export default LoginForm;