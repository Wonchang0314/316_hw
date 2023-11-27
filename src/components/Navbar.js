//Wonseok Chang, wonseok.chang@stonybrook.edu
import React,  { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isMenuOpen, toggleMenu }) => {
  const handleLinkClick = () => {
    if (window.innerWidth < 640) {
      toggleMenu(); 
    }
  };

  return (
    <div>
      <nav className={window.innerWidth >= 640 || isMenuOpen ? 'navigation' : 'navigation2'}>
        <ul className="ulNav">
          <Link to="/">
            <li className="listyle">Home</li>
          </Link>
          <Link to="/instructions">
            <li className="listyle">Instructions</li>
          </Link>

          <Link to="/Login">
            <li className="listyle">Login</li>
          </Link>

          <Link to="/PreviousCourses">
            <li className="listyle">Previous Courses</li>
          </Link>
          <Link to="/SelectCourses">
            <li className="listyle">Select Courses</li>
          </Link>
        </ul>
      </nav>
      <div className={isMenuOpen ? 'X' : '☰'} onClick={() => {
        if (window.innerWidth < 640) {
          toggleMenu();
        }
      }}>{isMenuOpen ? 'X' : '☰'}</div>
    </div>
  );
}

export default Navbar;