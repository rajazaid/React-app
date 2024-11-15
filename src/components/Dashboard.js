
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import Chart from "chart.js/auto";

Chart.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  const [studentData, setStudentData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Students Enrolled',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        borderWidth: 2
      },
    ],
  });

  const [teacherData, setTeacherData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Teachers Hired',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  });

  const [courseData, setCourseData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Courses Offered',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You are not logged in. Please log in to access the data.");
          window.location.href = "login.html";
          return;
        }
  
        // API calls
        const studentResponse = await fetch('https://localhost:7257/api/Student/student/withenrollment', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const teacherResponse = await fetch('https://localhost:7257/api/Teacher', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const courseResponse = await fetch('https://localhost:7257/api/Course', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const enrollmentResponse = await fetch('https://localhost:7257/api/Enrollment', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
          });

    
        const enrollmentsData = await enrollmentResponse.json();
     
  
        const studentsData = await studentResponse.json();
        const teachersData = await teacherResponse.json();
        const coursesData = await courseResponse.json();

        setStudentCount(studentsData.length);
        setCourseCount(coursesData.length);
     
        const teacherIdsWithCourses = new Set(coursesData.map(course => course.teacherId));
        const teachersWithCourses = teachersData.filter(teacher => teacherIdsWithCourses.has(teacher.teacherId));
        setTeacherCount(teachersData.length);

        const courseEnrollments = coursesData.map(course => {

            const totalEnrollments = enrollmentsData.reduce((count, enrollment) => {
              return enrollment.courseId === course.courseId ? count + 1 : count;
            }, 0);
            return {
              title: course.title,
              totalEnrollments: totalEnrollments
            };
          });
          

          const courseLabels = courseEnrollments.map(course => course.title);
const courseCountData = courseEnrollments.map(course => course.totalEnrollments);

        const studentEnrollments = studentsData.map(student => {

            const totalEnrollments = enrollmentsData.reduce((count, enrollment) => {
              return enrollment.studentId === student.studentId ? count + 1 : count;
            }, 0);
            return {
              title: student.name,
              totalEnrollments: totalEnrollments
            };
          });
          
          console.log(studentEnrollments);
          const studentLabels = studentEnrollments.map(course => course.title);
const studentCountData = studentEnrollments.map(course => course.totalEnrollments);

          
          
        
        

  
        setStudentData(prevData => ({
          ...prevData,
          labels: studentLabels,
          datasets: [{
            ...prevData.datasets[0],
            data: studentCountData, 
          }],
        }));
  
        setTeacherData(prevData => ({
          ...prevData,
          labels: teachersWithCourses.map(teacher => teacher.name),
          datasets: [{
            ...prevData.datasets[0],
            data: teachersWithCourses.map(() => 1), 
          }],
        }));
  
        setCourseData(prevData => ({
            ...prevData,
            labels: courseLabels,
            datasets: [{
              ...prevData.datasets[0],
              data: courseCountData,
            }],
        }));
        
  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
   
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to the Dashboard</h1>

      <div className="row mb-4">
        {/* Card for Number of Students */}
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3>Students Enrolled</h3>
              <p className="card-text">{studentCount}</p> {/* Display dynamic data */}
            </div>
          </div>
        </div>

        {/* Card for Number of Teachers */}
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3>Teachers Hired</h3>
              <p className="card-text">{teacherCount}</p> {/* Display dynamic data */}
            </div>
          </div>
        </div>

        {/* Card for Number of Courses */}
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3>Courses Offered</h3>
              <p className="card-text">{courseCount}</p> {/* Display dynamic data */}
            </div>
          </div>
        </div>
      </div>

      {/* Line Chart for Students Enrolled */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="chart-wrapper">
            <h3>Students Enrolled</h3>
            <Line data={studentData} />
          </div>
        </div>

        {/* Line Chart for Teachers Hired */}
        <div className="col-md-6">
          <div className="chart-wrapper">
            <h3>Teachers Hired</h3>
            <Line data={teacherData} />
          </div>
        </div>
      </div>

      <div className="chart-wrapper mb-4">
        <h3>Courses Offered</h3>
        <Line data={courseData} />
      </div>
    </div>
  );
};

export default Dashboard;
