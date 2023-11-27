//Wonseok Chang, wonseok.chang@stonybrook.edu
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Instructions from './components/Instructions';
import Login from './components/Login';
import PreviousCourses from './components/PreviousCourses';
import SelectCourses from './components/SelectCourses';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [takenCourses, setTakenCourses] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <Router>
      <AppContent isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} studentId={studentId} setStudentId={setStudentId} takenCourses={takenCourses} setTakenCourses={setTakenCourses} />
      </Router>
    </div>
  );
}

function AppContent({ isMenuOpen, toggleMenu, studentId, setStudentId, takenCourses, setTakenCourses }) {

  return (
    <>
      <p className='title'>CourseMan!</p>
      <header>
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<div></div>} /> 
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/login" element={<Login setStudentId={setStudentId} />} />
          <Route path="/PreviousCourses" element={<PreviousCourses studentId = {studentId} takenCourses = {takenCourses} setTakenCourses = {setTakenCourses} />} />
          <Route path="/SelectCourses" element={<SelectCourses studentId = {studentId} takenCourses = {takenCourses} setTakenCourses = {setTakenCourses} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;