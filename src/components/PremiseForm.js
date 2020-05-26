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
        console.log('Value of state is: ' + this.state.premiseNumber);
        event.preventDefault();
    }

    render() {
        
        return(
            <main>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="premiseNumber">Premise Number</label>
                        <input type="text" className="form-control" name="premiseNumber" placeholder="House Number" onChange={this.handleOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea className="form-control" value={this.state.address} placeholder="Address" onChange={this.handleOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Town/City</label>
                        <input type="text" className="form-control" name="city" placeholder="City" onChange={this.handleOnChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="postCode">Post Code</label>
                        <input type="text" className="form-control" name="postCode" placeholder="Post Code" onChange={this.handleOnChange}/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </main>
        
        );
    }
}

export default PremiseForm;