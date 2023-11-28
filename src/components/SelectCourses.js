//Wonseok Chang, wonseok.chang@stonybrook.edu
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SelectCourses.css';

const SelectCourses = ({ studentId, takenCourses }) => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [coursePrereq, setCoursePrereq] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [showCourses, setShowCourses] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/courseman/getCourses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/api/courseman/prereqs')
      .then(response => setCoursePrereq(response.data))
      .catch(error => console.error('Error fetching prerequisites:', error));
  }, []);

  const handleCourseSelect = (courseId) => {
    setSelectedCourses(prev => {
      return prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId];
    });
  };

  const registerCourses = async () => {
    const eligibleCourses = selectedCourses.filter(courseId =>
      arePrerequisitesMet(courseId)
    );

    try {
      for (let courseId of eligibleCourses) {
        await axios.post('http://localhost:3001/api/courseman/transcript', {
          student_id: studentId,
          course_name: courseId
        });
      }
      alert("Courses registered successfully.");
      console.log(selectedCourses);
    } catch (error) {
      console.error('Error posting courses to transcript:', error);
      alert("Failed to register courses.");
    }
  };

  const arePrerequisitesMet = (courseId) => {
    const course = courses.find(c => c.course_id === courseId);
    const prereqs = coursePrereq.filter(p => p.course_rec_id === course.id);

    return prereqs.every(prereq => takenCourses.includes(prereq.course_prereq_rec_id));
  };

  const filteredCourses = searchTerm
    ? courses.filter(course =>
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `CSE${course.course_id}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : courses;

  return (
    <div className="select_courses_container">
      <div className="search-form">
        <p className="search-form-title">Search Form</p>
      <div class ="form">
        <label className='form_label'>Name :</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        /></div>
        <div class ="form">
          <label className='form_label'>Courses :</label>
        <input
          type="text"
          placeholder="Search for courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        <button onClick={() => setShowCourses(!showCourses)}>
          {showCourses ? "Hide Courses" : "Show Courses"}
        </button>
      </div>

      {showCourses && (
        <div className="courses-list">
          <p>{studentName} here are the courses you may select</p>
          {filteredCourses.map(course => (
            <div key={course.course_id} className="course-entry">
              <input
                type="checkbox"
                name="courses"
                value={course.course_id}
                onChange={() => handleCourseSelect(course.course_id)}
              />
              <label>
                {course.course_id}: {course.course_name} - {course.course_seatsremaining} of {course.course_capacity}
              </label>
            </div>
          ))}
          <button onClick={registerCourses}>Register</button>
        </div>
      )}
    </div>
  );
};

export default SelectCourses;