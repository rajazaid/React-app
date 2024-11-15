import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditStudentModal from './EditStudentModal'; 

function UserList() {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://localhost:7257/api/Student', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Failed to fetch students.');
    }
  };

  const viewStudentDetails = (id) => {
    localStorage.setItem('selectedUserId', id);
    window.location.href = '/userDetail';
  };

  const openEditModal = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7257/api/Student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentStudent(response.data);
      setStudentName(response.data.name);
      setStudentEmail(response.data.email);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching student details:', error);
      alert('Failed to fetch student details.');
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedStudent = { ...currentStudent, name: studentName, email: studentEmail };
      await axios.put(`https://localhost:7257/api/Student/${updatedStudent.studentId}`, updatedStudent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Student updated successfully.');
      fetchStudents();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student.');
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`https://localhost:7257/api/Student/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Student deleted successfully.');
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student.');
      }
    }
  };

  return (
    <div className="container mt-5">
      
      <EditStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        studentName={studentName}
        setStudentName={setStudentName}
        studentEmail={studentEmail}
        setStudentEmail={setStudentEmail}
        handleEditFormSubmit={handleEditFormSubmit}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId} onClick={() => viewStudentDetails(student.studentId)}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button
                  className="btn btn-primary btn-md mx-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(student.studentId);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteStudent(student.studentId);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}

export default UserList;
