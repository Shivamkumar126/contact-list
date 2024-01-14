import React, { Component } from "react";
import '../App.css';

// this component defines the structure for every contact in the list

export class Contact extends Component {

    render() {
        const {id , name , email ,  phone} = this.props.contactDetails;


        return (
            <>
                <div className="card" style={{width : "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">{phone}</li>
                    </ul>
                    <div className="card-body">
                       <button className="btn" onClick={()=>{this.props.handleUpdate(id)}}>Update</button>
                       <button className="btn" onClick={()=>{this.props.handleDelete(id)}}>Delete</button>

                    </div>
                </div>
            </>
        );
    }
}