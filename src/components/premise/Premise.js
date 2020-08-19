import React from 'react';
import {Link} from 'react-router-dom';

function Premise(props) {

    return(
        <tr cope="row">
            <td><Link to={'/viewPremise/' + props.item.premiseId}>{props.item.premiseId}</Link></td>
            <td>{props.item.premiseNumber}</td>
            <td>{props.item.address}</td>
            <td>{props.item.city}</td>
            <td>{props.item.postCode}</td>
        </tr>
    ); 
}

export default Premise;