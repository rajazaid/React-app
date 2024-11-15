import React from 'react';
import '../styles/modalstyle.css'; 

function EditStudentModal({
  isOpen,
  onClose,
  studentName,
  setStudentName,
  studentEmail,
  setStudentEmail,
  handleEditFormSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Edit Student</h2>
        <form onSubmit={handleEditFormSubmit}>
          <div className="form-group">
            <label htmlFor="studentName">Name:</label>
            <input
              id="studentName"
              type="text"
              className="form-control"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentEmail">Email:</label>
            <input
              id="studentEmail"
              type="email"
              className="form-control"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudentModal;
