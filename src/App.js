import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import AddStudent from './components/AddStudent';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/userlist" element={<UserList />} />
          <Route path="/userdetail" element={<UserDetail />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
