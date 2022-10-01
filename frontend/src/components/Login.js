import React, { Component } from "react" ;
import axios from "axios";

export const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete axios.defaults.headers.common["Authorization"];
}

const handleSubmit = (username, pass) => {
   const loginPayload = {
     username: username,
     password: pass,
   }

   axios.post("http://127.0.0.1:8000/api/auth/jwt/create", loginPayload)
     .then(response => {
       //get token from response
       const token  =  response.data.access;

       document.cookie = "token=" + token; // обновляем только куки с именем 'user'
       setAuthToken(token);
        console.log(token)
       window.location.href = '/'
     })
     .catch(err => console.log(err));
 };

class Login extends Component  {
    constructor (props) {
        super (props);
        this.state = { username : "" , password : "" };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        handleSubmit(this.state.username, this.state.password)
        event.preventDefault();
    }

    render() {
        return (
            <div className="cover-container d-flex w-75 h-100 p-3 mx-auto flex-column bg-white bg-opacity-50">
            <main className="px-3">
                                <h2 className=" text-center mb-5">Log in</h2>

                                <form onSubmit={this.handleSubmit}>

                                    <div className="form-outline mb-4">
                                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} className="form-control form-control-lg"/>
                                        <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                    </div>


                                    <div className="form-outline mb-4">
                                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} className="form-control form-control-lg"/>
                                        <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                    </div>



                                    <div className="d-flex justify-content-center">
                                        <button type="submit"
                                                className="btn-primary btn-block btn-lg gradient-custom-4 border-button ">Log in
                                        </button>
                                    </div>

                                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login"
                                                                                                                className="fw-bold text-body"><u>Login
                                        here</u></a></p>

                                </form>
                        </main>
                    </div>
        )
    }
}
export default Login;

