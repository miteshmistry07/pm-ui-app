import React, { useEffect, useState } from 'react';

import Premise from './Premise';
import * as helper from '../../helper/helper';
import { authenticationService } from '../../service/AuthenticationService';

function ListAllPremises() {

    const [premiseComponents, setPremiseComponent] = useState([]);
    
    useEffect(() => {
        //call API
        let apiPath = "api/premise/list" 
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authenticationService.getToken()
            }
        }
        
        fetch(apiPath, requestOptions)
            .then(helper.utility.checkStatus)
            .then(helper.utility.json)
            .then((data) => {   
                //check json                      
                if (data.status === 401) {
                    console.error(data);
                    alert("Login " + data.message);
                }                 
                else {
                    //console.log('Success');
                    //console.log(data);
                    setPremiseComponent(data);
                }
            })
            .catch((error)=> {
                console.log("Error");
                console.log(error);
                alert("An error has occured. " + error.message);
            });
    }, []); //pass in blank array to stop constant looping

    return(
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">House Number</th>
                    <th scope="col">Address</th>
                    <th scope="col">City/Town</th>
                    <th scope="col">Post Code</th>
                </tr>
            </thead>
            <tbody>
            {/*
                main content
            */}
            {   
                premiseComponents.map((x) => {
                    return <Premise item={x} key={x.premiseId}/>            
                })
                //premiseComponents[0].premiseId
            }
            </tbody>
        </table>
    );
}

export default ListAllPremises;