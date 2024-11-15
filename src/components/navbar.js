import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-4 sticky-top">
      <a className="navbar-brand mx-3" href="/">
        <img src={logo} alt="Logo" className="d-inline-block align-text-top" /> GLPSS
      </a>
      <div className="collapse navbar-collapse justify-content-end mx-4">
        <ul className="navbar-nav">
          <li className="nav-item mx-2"><Link to="/" className="nav-link"><i className="fas fa-home"></i> Home</Link></li>
          <li className="nav-item mx-2"><Link to="/userlist" className="nav-link"><i className="fas fa-users"></i> User List</Link></li>
          <li className="nav-item mx-2"><Link to="/addstudent" className="nav-link"><i className="fas fa-user-plus"></i> Add New Student</Link></li>
          <li className="nav-item mx-2"><Link to="/reports" className="nav-link"><i className="fas fa-file-alt"></i> Reports</Link></li>
          <li className="nav-item mx-2"><Link to="/login" className="nav-link"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
