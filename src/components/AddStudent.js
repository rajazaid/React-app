import React, { useState } from 'react';
import '../styles/AddStudent.css';

const AddStudent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const newStudent = {
            Name: name,
            Email: email,
            Password: password,
            PhoneNumber: phone,
            Enrollments: [],
            Payments: []
        };
    
        try {
            const response = await fetch('https://localhost:7257/api/Student', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStudent)
            });
            console.log(response);
    
            if (response.ok) {
                alert('Student added successfully!');
                setName('');
                setEmail('');
                setPassword('');
                setPhone('');
            } else if (response.status === 400) {
                const errorData = await response.json();
                console.error('Bad Request Error:', errorData);
                alert(`Error adding student: ${errorData.message || 'Check input data format'}`);
            } else {
                alert('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        }
    };
    
    
    return (
        <div>

            <div className="container mt-5">
                <h2>Add a New Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Student Name:</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Student Email:</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone No:</label>
                        <input type="tel" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-secondary btn-block">Add Student</button>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;
