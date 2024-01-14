import React, { Component } from "react";
import '../App.css';

// component to show the box when user want to add a contact

export class AddContact extends Component {

    constructor(){
        super();
        this.textInput = React.createRef();
    }

    render() {
        // const {id , name , email ,  phone} = this.props.contactDetails;


        return (
            <>
            <div className="center_div">
                <div className="card" style={{width : "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title"><input ref={this.textInput} onChange={(e)=>{this.props.handleNameChange(e.target.value)}} placeholder= "Name"/></h5>
                        
                    </div>
                    <ul className="list-group list-group-flush">

                        <li className="list-group-item"><input onChange={(e)=>{this.props.handleEmailChange(e.target.value)}} placeholder= "email"/></li>

                        <li className="list-group-item"><input onChange={(e)=>{this.props.handlePhoneChange(e.target.value)}}  placeholder= "phone"/></li>
                    </ul>
                    <div className="card-body">
                       <button className="btn" onClick={()=>{this.props.handleAdd()}}>Add</button>
                       <button className="btn" onClick={()=>{this.props.handleBack()}}>Back</button>

                    </div>
                </div>
                </div>
            </>
        );
    }
}