//Wonseok Chang, wonseok.chang@stonybrook.edu
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './PreviousCourses.css';

const PreviousCourses = ({ studentId, takenCourses, setTakenCourses }) => {
  const [courses, setCourses] = useState([]);
  const showAlertRef = useRef(true);
  

  useEffect(() => {
    if (studentId === "" && showAlertRef.current) {
      alert("Please login before proceeding!");
      showAlertRef.current = false;
    
    } else {
      showAlertRef.current = true;
      axios.get('http://localhost:3001/api/courseman/getCourses')
        .then(response => {
          const mappedCourses = response.data.map(course => ({
            id: course.id,
            courseNumber: course.course_id,
            courseName: course.course_name
          }));
          setCourses(mappedCourses);
        })
        .catch(error => console.error('Error fetching courses:', error));
    }
  }, [studentId]);

  const handleCourseSelect = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      setTakenCourses(prevCourses => [...prevCourses, value]);
    } else {
      setTakenCourses(prevCourses => prevCourses.filter(course => course !== value));
    }
  };

  const handleUpdate = () => {
    alert("The course you selected stored as a taken course")
    console.log("Taken Courses:", takenCourses);
  };

  return (
    <div className="previous-courses-container">
      <p>Student ID: {studentId || "-1"}</p>
      <p>Check off the courses you have completed with a C or better.</p>
      <div className="courses-list" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
        {courses.map(course => (
          <label key={course.id} className='course'>
          <input 
            type="checkbox" 
            value={course.id} 
            onChange={handleCourseSelect}
            checked={takenCourses.includes(course.id)}
          />
          {`${course.courseNumber} - ${course.courseName}`}
        </label>
        ))}
      </div>
      <button onClick={handleUpdate}>Set Previous Courses</button>
    </div>
  );
}

export default PreviousCourses;
