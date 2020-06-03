import React from 'react';

class PremiseForm extends React.Component {

    constructor(){
        super();
        this.state = {
            premiseId: "",
            premiseNumber: "",
            address: "",
            city: "",
            postCode: ""
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

    handleSubmit(event) {
        //console.log('Value of state is: ' + this.state.premiseNumber);
        event.preventDefault();
        //do POST to external service
        let url = '/api/premise/add';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaXQiLCJleHAiOjE1OTExODE4MzgsImlhdCI6MTU5MTE3NDYzOH0.7lcBNSADt17ewxPP93kGp7OR9iUiRHIg4jh0riEb6BlWzZy1u1Rmyd6aDwH86TtfnWbWN8Egz5j0_OKJ195YNg',
            },
            body: JSON.stringify(this.state)
        }

        fetch(url,requestOptions)
        .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
        .catch((error) => {
            console.error('Error:', error);
        });
        //alert(JSON.stringify(requestOptions.body));
    }

    render() {
        
        return(
            <main>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="premiseNumber">Premise Number</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="premiseNumber"
                            placeholder="House Number" 
                            onChange={this.handleOnChange}
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
                        />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </main>
        );
    }
}

export default PremiseForm;