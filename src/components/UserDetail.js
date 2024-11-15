import React, { useEffect, useState } from 'react';
import '../styles/UserDetail.css';

const UserDetail = () => {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem("selectedUserId");

    useEffect(() => {
        if (userId) {
            fetch(`https://localhost:7257/api/Student/${userId}`)
                .then(response => response.json())
                .then(data => setUser(data))
                .catch(error => console.error("Error fetching user details:", error));
        } else {
            console.error("No user ID found.");
        }
    }, [userId]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <div className="main-body">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">{user.jobTitle || 'Full Stack Developer'}</p>
                                        <p className="text-muted font-size-sm">{user.location || 'Islamabad'}</p>
                                        <button className="btn btn-primary">Follow</button>
                                        <button className="btn btn-outline-primary">Message</button>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Website</h6>
                                        <span className="text-secondary">{user.website || 'https://example.com'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <text>{user.name}</text>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <text>{user.email}</text>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <text>{user.phone || '03488888888'}</text>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Mobile</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <text>{user.mobile || '051121212'}</text>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <text>{user.address || 'G9-4 Islamabad'}</text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
