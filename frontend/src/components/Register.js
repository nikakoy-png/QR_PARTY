import  React, { Component } from  'react';
import axios from "axios";

export const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete axios.defaults.headers.common["Authorization"];
}

const handleSubmit = (username, pass1, pass2, email) => {
   const loginPayload = {
     username: username,
     password1: pass1,
     password2: pass2,
     email: email
   }

   axios.post("http://127.0.0.1:8000/api/register/", loginPayload)
     .then(response => {
         console.log(response)
       window.location.href = '/'
     })
     .catch(err => console.log(err));
 };

class Register extends Component {
    constructor (props) {
        super (props);
        this.state = { username : "" , password1 : "", password2 : "", email : "" };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        handleSubmit(this.state.username, this.state.password1, this.state.password2, this.state.email)
        event.preventDefault();
    }

  render() {
    return (
        <div className="cover-container d-flex w-75 h-100 p-3 mx-auto flex-column bg-white bg-opacity-50">
            <main className="px-3">
                                <h2 className=" text-center mb-5">Create an account</h2>

                                <form onSubmit={this.handleSubmit}>

                                    <div className="form-outline mb-4">
                                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} className="form-control form-control-lg"/>
                                        <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange} className="form-control form-control-lg"/>
                                        <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input name="password1" type="password" value={this.state.password1} onChange={this.handleChange} className="form-control form-control-lg"/>
                                        <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input name="password2" type="password" className="form-control form-control-lg" value={this.state.password2} onChange={this.handleChange}/>
                                        <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                    </div>

                                    {/*<div className="form-check d-flex justify-content-center mb-5">*/}
                                    {/*    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg"/>*/}
                                    {/*    <label className="form-check-label" htmlFor="form2Example3g">*/}
                                    {/*        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>*/}
                                    {/*    </label>*/}
                                    {/*</div>*/}

                                    <div className="d-flex justify-content-center">
                                        <button type="submit"
                                                className="btn-primary btn-block btn-lg gradient-custom-4 border-button ">Register
                                        </button>
                                    </div>

                                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                                                                                                                className="fw-bold text-body"><u>Login
                                        here</u></a></p>

                                </form>
                        </main>
                    </div>
    )
  }
}

export default Register;