import {Route, Routes} from "react-router-dom";
import React, {Component} from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Cookies from "js-cookie";
import CreateRoom from "./CreateRoom";
import MyRoom from "./MyRoom";
import Invite from "./Invite";
import Room from "./Room";
import ViewForControl from "./ViewForControl";


function Logout() {
    Cookies.remove('token');
}

class _Route extends Component {
  render() {
    return (
        <Routes>
            <Route path='/*' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/create_room' element={<CreateRoom/>}/>
            <Route path='/my_room' element={<MyRoom/>}/>
            <Route path='/invite/:link' element={<Invite/>}/>
            <Route path='/room/:id' element={<Room/>}/>
            <Route path='/qr_code/:id_room/:id_user' element={<ViewForControl/>}/>
        </Routes>
    )
  }
}

export default _Route;
