import React from 'react';

class PremiseForm extends React.Component {

    constructor(){
        super();
        this.state = {
            "premiseNumber": "",
            "address": "",
            "city": "",
            "postCode": ""
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtbSIsImV4cCI6MTU5MjI0MDYzNCwiaWF0IjoxNTkyMjMzNDM0fQ.qCuQ8xFW7opmdHp7-iq033sFo-Ttum_YzJRm4V7d-JhqhOVXSYeXXdEq0mjdIFhGNd2VFmQP3HHIpElsIeuZow'
                },
                body: JSON.stringify(this.state)
            }

            fetch(url, requestOptions)
                .then(this.checkStatus)
                .then(response => response.json())
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
                        console.log('Success');
                        alert("Premise saved " + data.premiseId );
                        console.log(data);
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
                <form  onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="premiseNumber">Premise Number</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="premiseNumber"
                            placeholder="House Number" 
                            onChange={this.handleOnChange}
                            required
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
                        />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </main>
        );
    }
}

export default PremiseForm;