//Wonseok Chang, wonseok.chang@stonybrook.edu
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css'

function Login({ setStudentId }) {
  const [studentIdInput, setStudentIdInput] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/courseman/login', {
        studentId: studentIdInput,
        password: password
      });

      if (response.data.message === "Login successful") {
        setStudentId(studentIdInput);
        alert("Login successful");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert("Login failed");
    }
  };

  return (
    <div class = "login_container">
        <p className="login-form-title">Login Form</p>
        <div class="form"><input type="text" placeholder="Student ID" value={studentIdInput} onChange={(e) => setStudentIdInput(e.target.value)} /></div>
      <div class="form"><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;