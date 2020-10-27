import React from 'react';
import { authenticationService } from '../service/AuthenticationService';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoutes({component:Component, ...rest }) {
    
    return(
       <Route
            {...rest}
            render = {
                props => {
                    if (authenticationService.isAuthenticated()) {
                        return <Component {...props} />;
                    }
                    else {
                        return <Redirect to={{ pathname: '/login' }} />
                    }
                }
            }
        /> //route
   );
}

export default ProtectedRoutes;

//https://medium.com/javascript-in-plain-english/how-to-set-up-protected-routes-in-your-react-application-a3254deda380
//https://www.sitepoint.com/react-router-complete-guide/
//https://www.youtube.com/watch?v=Y0-qdp-XBJg



