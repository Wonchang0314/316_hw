//Wonseok Chang, wonseok.chang@stonybrook.edu
import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instruction-container">
      <p>First, proceed to 'Login' page and enter your 9 digit student id. Click the 'Login' button to verify your password and save your student id for the session.</p>
      <p>Next, proceed to 'Enter Previous Courses'. Click on each course you have completed with a C or better grade. Click Set Previous Courses.</p>
      <p>Return to the home page and click 'Select Courses'. Enter your name and any search term to restrict course selections with the provided string in the course name. This can be left blank to see all CSE courses</p>
      <p>Click the checkbox by each course for which you would like ot register. Click the Register button to register. If you are missing prerequisites, you must go back and select a different set of courses. In this case, click 'ok' on the alert box and try again.</p>
      <p>On success, an alert box will indiciate the courses for which you have registered</p>
    </div>
  );
}

export default Instructions;