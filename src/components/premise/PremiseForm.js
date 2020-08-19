import React from 'react';
import { authenticationService } from '../../service/AuthenticationService';
import * as helper from '../../helper/helper';

class PremiseForm extends React.Component {

    constructor(){
        super();
        this.state = {
            "premiseId": "",
            "premiseNumber": "",
            "address": "",
            "city": "",
            "postCode": ""
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
        if (this.props.match.params.id) {
            //need to do api call to load existing record

            let apiURL = "/api/premise/";
            let premiseId = this.props.match.params.id;
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authenticationService.getToken()
                }
            }

            fetch(apiURL+premiseId, requestOptions)
                .then(helper.utility.checkStatus)
                .then(helper.utility.json)
                .then((data) => {
                   // console.log(data);
                    
                    //this.setState({premiseNumber: data.premiseNumber}, () => console.log(this.state));
                   /*  
                    for (const [key, value] of Object.entries(data)) {
                       // console.log(`${key}: ${value}`);
                        this.setState({[key]: value});
                    } */
                    console.log(this.state);
                    this.setState(data);
                    console.log(this.state);
                    
                });
        }
       
    }

    handleOnChange(event) {
        //console.log(event.target.name);
        //console.log(event.target.checked);
        const {name, value, type, checked } = event.target;        
        type === "checkbox" ? this.setState({[name]: checked}): this.setState( {[name]: value} );
    }

    validateForm() {
        let isValid = true;
        let fieldNames = Object.keys(this.state);
        //alert(Object.keys(this.state).length);

        for(let i=0; i<fieldNames.length; i++) {
            //alert(this.state[fieldNames[i]]);
            if (this.state[fieldNames[i]] === "") {
                console.log("blank " + fieldNames[i]);
                isValid = false;
                //set error message display
                break;
            }       
        }
       
        return isValid;
    } //validateForm

    handleSubmit(event) {
        //console.log('Value of state is: ' + this.state.premiseNumber);
        event.preventDefault();
        let isValid = true;//this.validateForm();
        
        if (isValid) {
            //do POST to external service
            let url = '/api/premise/add';
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authenticationService.getToken()
                },
                body: JSON.stringify(this.state)
            }

            fetch(url, requestOptions)
                .then(helper.utility.checkStatus)
                .then(helper.utility.json)
                .then((data) => {                         
                    if (data.status === 401) {
                        console.error(data);
                        alert("Login " + data.message);
                    }
                    else if (data.status === 400) {
                        //need to loop around form errors
                        console.error(data);
                        let validationErrors = "";
            
                        for(let i=0; i < data.errors.length; i++) {
                                validationErrors += " " + data.errors[i]  + ".";
                        }
                        alert("form errors " + validationErrors);    
                    }
                    else {
                        //console.log('Success');
                        //console.log(data);
                        alert("Premise saved " + data.premiseId );
                        this.setState({premiseId: data.premiseId});
                        
                    }
                })
                .catch((error)=> {
                    console.log("Error");
                    console.log(error);
                    alert("An error has occured. " + error.message);
                });
        } //if
    }

    render() {
        
        return(
            <main>
                <form onSubmit={this.handleSubmit}>

                    <div className='form-group'>
                        <label htmlFor="premiseId">ID</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="premiseId" 
                            defaultValue = {this.state.premiseId}
                            disabled
                        />
                    </div>
                         
                    <div className="form-group">
                        <label htmlFor="premiseNumber">Premise Number</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="premiseNumber"
                            placeholder="House Number" 
                            onChange={this.handleOnChange}
                            required
                            defaultValue = {this.state.premiseNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea 
                            className="form-control" 
                            name="address" 
                            value={this.state.address} 
                            placeholder="Address" 
                            onChange={this.handleOnChange}                          
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Town/City</label>
                        <input 
                            type="text"
                            className="form-control" 
                            name="city" 
                            placeholder="City" 
                            onChange={this.handleOnChange}
                            defaultValue = {this.state.city} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postCode">Post Code</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="postCode" 
                            placeholder="Post Code" 
                            onChange={this.handleOnChange}
                            required
                            defaultValue = {this.state.postCode} 
                        />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </main>
        );
    }
}

export default PremiseForm;