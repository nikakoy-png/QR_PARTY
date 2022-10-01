import  React, { Component } from  'react';
import Cookies from "js-cookie";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            username: ''
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/auth/users/me/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        username: result.username
                    });
                    if (this.state.username === undefined) {
                        Cookies.remove('token');
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        if (!Cookies.get('token')) {
            return (
                <div className="d-flex mb-2 align-middle px-5">
                    <a className="nav-link" href="/login">Log in</a>
                    <a className="nav-link" href="/register">Sign up</a>
                </div>
            )
        }
        return (
            <div className="border-button btn-group ">
                <button name="dropdown-toggle" type="button" className="btn dropdown-toggle px-5" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                    <h2 className="float-md-start mb-0 align-middle px-5"> {this.state.username} </h2>
                </button>
                <div className="dropdown-menu dropdown-menu-lg-end bg-opacity-50 ">
                    <a className="dropdown-item" href="/my_room">My rooms</a>
                    <a className="dropdown-item" href="/create_room">Create new room</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/logout">Log out</a>
                </div>
            </div>
        )
    }
}

export default User;

