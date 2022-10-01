import  React, { Component } from  'react';
import axios from "axios";
import Cookies from "js-cookie";

const handleSubmit = (name, description) => {
   const data = {
     name: name,
     description: description,
   }

   fetch('http://127.0.0.1:8000/api/room/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            body:  JSON.stringify(data)
        })
     .catch(err => console.log(err));
   window.location.href = '/'
 };

class CreateRoom extends Component {
    constructor (props) {
        super (props);
        this.state = { name : "" , description : ""};
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        handleSubmit(this.state.name, this.state.description)
        event.preventDefault();
    }

  render() {
    return (
        <div className="cover-container d-flex w-75 h-100 p-3 mx-auto flex-column bg-white bg-opacity-50">
            <main className="px-3">
                                <h2 className=" text-center mb-5">Create room</h2>

                                <form onSubmit={this.handleSubmit}>

                                    <div className="form-outline mb-4">
                                        <input name="name" type="text" value={this.state.name} onChange={this.handleChange} className="form-control form-control-lg"/>
                                        <label className="form-label" htmlFor="form3Example1cg">Name of your room</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input name="description" type="text" value={this.state.description} onChange={this.handleChange} className="form-control form-control-lg"/>
                                        <label className="form-label" htmlFor="form3Example3cg">Description</label>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button type="submit"
                                                className="btn-primary btn-block btn-lg gradient-custom-4 border-button ">Create room
                                        </button>
                                    </div>

                                </form>
                        </main>
                    </div>
    )
  }
}

export default CreateRoom;