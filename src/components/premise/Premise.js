import React from 'react';

function Premise(props) {

    return(
        <tr cope="row">
            <td>{props.item.premiseId}</td>
            <td>{props.item.premiseNumber}</td>
            <td>{props.item.address}</td>
            <td>{props.item.city}</td>
            <td>{props.item.postCode}</td>
        </tr>
    ); 
}

export default Premise;