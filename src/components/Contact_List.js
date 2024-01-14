import React, { Component } from "react";
import { Contact } from "./Contact";
import { EditContact } from "./EditContact";
import { AddContact } from "./AddContact";
import '../App.css';

// this is the whole contact list

export class Contact_List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            updating: false,
            dataToUpdate: [],
            sameData: [],
            adding: false,
            addContact: {
                name: "",
                phone: "",
                email: "",
            },
            addedContacts: [],
        }
    }

    handleCancel = () => {
        // Reset the updating flag to false
        this.setState({ updating: false });

    }

    // function to delete the contact from the list

    handleDelete = ((id) => {

        const indexToDelete = this.state.data.findIndex((item) => item.id === id);

        if (indexToDelete !== -1) {
            // Use splice to remove the item at the found index
            this.state.data.splice(indexToDelete, 1);

            // Update the state to trigger a re-render
            this.setState({ data: this.state.data });
        }


    })

    // function to handle the action when the update button of any contact is clicked

    handleUpdate = (id) => {
        if (!this.state.adding) {
            this.setState({ updating: true });
            const indexToUpdate = this.state.data.findIndex((item) => item.id === id);
            if (this.state.dataToUpdate.length >= 1) {
                this.state.dataToUpdate.pop();
            }
            if (indexToUpdate !== -1) {
                this.state.dataToUpdate.push(this.state.data[indexToUpdate]);

                this.setState({
                    dataToUpdate: this.state.dataToUpdate,
                });
            }

        }

    }

    // functions to update all the properties of a contact

    handleNameChange = (value) => {
        this.state.dataToUpdate[0].name = value;

    }

    handleEmailChange = (value) => {
        this.state.dataToUpdate[0].email = value;
        // this.setState({ dataToUpdate: this.state.dataToUpdate });
        this.state.addContact.email = value;

    }

    handlePhoneChange = (value) => {
        this.state.dataToUpdate[0].phone = value;
        this.state.addContact.phone = value;

        this.setState({
            dataToUpdate: this.state.dataToUpdate,
            addContact: this.state.addContact
        })
    }

    // function to complete the updation action

    updateComplete = (id) => {
        const indexTochange = this.state.data.findIndex((item) => item.id == id);
        this.state.data[indexTochange] = this.state.dataToUpdate[0];
        this.state.updating = false;
        this.setState({
            data: this.state.data,
            updating: this.state.updating
        })

    }

    // functions to add the new contact values in a object at their respective places

    addName = (value) => {
        this.state.addContact.name = value;
    }

    addPhone = (value) => {
        this.state.addContact.phone = value;
    }

    addEmail = (value) => {
        this.state.addContact.email = value;
    }

    // function to complete the addition of a contact in the list

    handleAdd = () => {
        if (this.state.addContact.name != "") {

            let newContact = {
                name: this.state.addContact.name,
                phone: this.state.addContact.phone,
                email: this.state.addContact.email
            }
            this.state.addedContacts.push(newContact);
            console.log(this.state.addedContacts)

            this.state.data.push(this.state.addedContacts[this.state.addedContacts.length - 1]);
            this.setState({
                data: this.state.data,
                adding: false
            });
        }
    }

    handleBackInAddContact = () => {
        this.setState({
            adding: false
        });
    }

    addToContactbtn = () => {
        if (!this.state.updating) {
            this.setState({ adding: true });
        }
    }

    // fetching of the data from the api is done inside componentdidmount function

    async componentDidMount() {
        let url = "https://jsonplaceholder.typicode.com/users";
        let response = await fetch(url);
        let contacts = await response.json();
        // console.log(contacts);
        let data1 = [];
        contacts.map((contact) => {
            return (data1.push({
                id: contact.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone
            }))
        })

        this.setState({
            data: data1,
            sameData: data1
        })
    }


    render() {

        return (
            <><div className="container  ">
                {
                    this.state.adding ? <AddContact handleAdd={this.handleAdd}
                        handleNameChange={this.addName}
                        handleEmailChange={this.addEmail}
                        handlePhoneChange={this.addPhone}
                        handleBack={this.handleBackInAddContact}
                    /> :
                        <button onClick={this.addToContactbtn} className="addbtn">Add To Contact</button>
                }

                {
                    this.state.updating ?

                        this.state.dataToUpdate.map((contact, i) => {
                            return <EditContact key={i} contactDetails={contact}
                                handleNameChange={this.handleNameChange}
                                handleEmailChange={this.handleEmailChange}
                                handlePhoneChange={this.handlePhoneChange}
                                updateComplete={this.updateComplete}
                                handleCancel={this.handleCancel}
                            />
                        })


                        :
                        <div className="contacts">
                            {
                                this.state.data.map((contactDetail, i) => {
                                    return <div className="each_contact"><Contact key={i} contactDetails={contactDetail}
                                        handleDelete={this.handleDelete}
                                        handleUpdate={this.handleUpdate}
                                    /></div>
                                })}
                        </div>
                }

            </div>
            </>
        );
    }
}