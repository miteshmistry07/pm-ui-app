//https://www.alibabacloud.com/blog/how-to-implement-authentication-in-reactjs-using-jwt_595820

import { BehaviorSubject } from 'rxjs';
import jws from 'jsonwebtoken'; //decode token
//import config from 'config';
//import { handleResponse } from '@/_helpers';
/*


*/
const currentUserSubject = new BehaviorSubject(localStorage.getItem("currentUser"));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value 
    } //getter
};

function login(state) {

    let url = '/api/login';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(state)
    }

    fetch(url, requestOptions)
            .then(checkStatus)
            .then(json)
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
                    currentUserSubject.next(payload.sub);
                    //console.log(payload.sub);
                    console.log(payload);
                    localStorage.setItem("currentUser", payload.sub); //added for observable
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", payload.sub);
                    localStorage.setItem("iat", payload.iat);
                    localStorage.setItem("exp", payload.exp);
                    localStorage.setItem("isLoggedIn", true);
                    console.log(new Date(payload.iat * 1000));
                    console.log(new Date(payload.exp * 1000));
                    
                    //new LoginStatus(true);                  
                }
            })
            .catch((error)=> {
                console.log("Error");
                console.log(error);
                alert("An error has occured. " + error.message);
            });



    /* 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
    */

   //localStorage.setItem('currentUser', JSON.stringify(user));
   //console.log(user);
   //currentUserSubject.next(user);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function checkStatus(response) {        
    if (!response.ok) {
        //false
        if (response.status !== 401 && response.status !== 400) {
                throw new Error(response.status + " " + response.statusText);  
        }
    }
    return  Promise.resolve(response);
}

function json(response) {
    return response.json()
}