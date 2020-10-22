
import { BehaviorSubject } from 'rxjs'; //behavoiur sub rather than obserable as use intital value
import jws from 'jsonwebtoken'; //decode token
import * as helper from '../helper/helper';

/*
    useful resources:
    https://www.alibabacloud.com/blog/how-to-implement-authentication-in-reactjs-using-jwt_595820
    https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage#:~:text=sessionStorage%20is%20similar%20to%20localStorage,over%20page%20reloads%20and%20restores.

    currentUserSubject observable = for username so login status can update accordingly when user is logged in

    amended to use sessionStorage rather than localStorage as the latter doesnt expire..see MDN tech note.
    
    **** TO DO ***
        * do something without timeout for token??? client side and server side? better error message?

        * maybe redirect logout to Home page after clearing sessions?


    use these links to protect routes:    
    https://medium.com/@leonardobrunolima/react-tips-how-to-protect-routes-for-unauthorized-access-with-react-router-v4-73c0d451e0a2

    https://medium.com/javascript-in-plain-english/how-to-set-up-protected-routes-in-your-react-application-a3254deda380
*/
const currentUserSubject = new BehaviorSubject(sessionStorage.getItem("username"));

export const authenticationService = {
    //object
    login,
    logout,
    getToken,
    currentUser: currentUserSubject.asObservable(), 
    get currentUserValue() {
        //getter
        return currentUserSubject.value 
    }
};

function login(state) {
    //state from login page which contains username and password
    let apiPath = '/api/login';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(state) //add username and password to http request
    }
    //use fetch api to do rest api call
    fetch(apiPath, requestOptions)
        .then(helper.utility.checkStatus)
        .then(helper.utility.json)
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
                
                processToken(data);               
            }
        })
        .catch((error)=> {
            console.log("Error");
            console.log(error);
            alert("An error has occured. " + error.message);
        });
} //end function login

function processToken(response) {

    const payload = jws.decode(response.token); //decode the token
    currentUserSubject.next(payload.sub); //set the username so can be displayed in nav
    console.log(payload);

    const userSessionItems = {
        "token" : response.token,
        "username" : payload.sub,
        "iat" : payload.iat,
        "exp" : payload.exp,
        "isLoggedIn" : true
    }

    //put in loop and set
    for (const property in userSessionItems) {
        console.log(`${property}: ${userSessionItems[property]}`);
        sessionStorage.setItem(`${property}`, `${userSessionItems[property]}`);
    }
    /* 
    console.log(new Date(payload.iat * 1000));
    console.log(new Date(payload.exp * 1000));
     */
}

function getToken() {
    //use for API calls to access the users token to send in request 
    return sessionStorage.getItem('token');
}

function logout() {
    //clear session storage for user to logout
    sessionStorage.clear();
    currentUserSubject.next(null);
}



