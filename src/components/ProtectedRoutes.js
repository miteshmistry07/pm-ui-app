import react from 'react';

function ProtectedRoutes({ component: Component, ...rest }) {
    
    return(
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated === true ? (<Component {...props} />) : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
            }
        />
    );
}

export default ProtectedRoutes asmasd

