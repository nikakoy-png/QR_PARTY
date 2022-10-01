import  React, { Component } from  'react';
import User from "./User";


class Header extends Component {
  render() {
    return (
        <div className="cover-container d-flex w-75 p-3 mx-auto flex-column header">
            <header className="mb-auto">
              <div>
                  <img width="38" className="align-items-center float-md-start " src="https://seeklogo.com/images/Q/qr-code-logo-27ADB92152-seeklogo.com.png" alt="{}"/>
                  <h2 className="float-md-start mb-0 align-middle px-2 ">QR_party</h2>
                      <nav className="nav nav-masthead justify-content-center">
                          <a className="nav-link border-button text" href="/">Home</a>
                          <a className="nav-link border-button" href="/">Features</a>
                          <User/>
                      </nav>
              </div>
            </header>
        </div>
    )
  }
}

export default Header;

