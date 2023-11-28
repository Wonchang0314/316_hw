const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const crypto = require('crypto-js');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors()); 


const db = mysql.createConnection({
  host: 'localhost',
  user: 'wonseok',
  password: 'andy0314',
  database: 'coursemantester',
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("andy0314", "utf-8"),
  },
});

db.connect((err) => {
  if(err){
    console.error("Error: ", err);
  }
  else{
    console.log("Connected to the server");
  }
});


app.post('/api/courseman/login', (req, res) => {
  const { studentId, password } = req.body;
  const sql = 'SELECT * FROM students WHERE id = ?';
  db.query(sql, [studentId], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Error fetching student data');
    }
    if (results.length === 0) {
      console.log(`Student with ID ${studentId} not found`);
      return res.status(404).send('Student not found');
    }
    
    const student = results[0]; //ID
    const hashCheck = crypto.SHA256(student.first_name + student.last_name + password).toString(); 
    console.log(`Computed hash: ${hashCheck}`);
    console.log(`Stored hash: ${student.password}`); //Checking Password

    if (hashCheck === student.password) {
      console.log(`Student ${studentId} logged in successfully`);
      res.json({ message: "Login successful", studentId });
    } else {
      console.log(`Invalid password for student ${studentId}`);
      res.status(401).send('Invalid password');
    }
  });
});

app.get('/api/courseman/getCourses', (req, res) => {
  db.query('SELECT * FROM courses', (error, results) => {
    if (error) return res.status(500).send('Error fetching courses');
    res.json(results);
  });
});


app.get('/api/courseman/prereqs', (req, res) => {
  db.query('SELECT * FROM prereqs', (error, results) => {
    if (error) return res.status(500).send('Error fetching prerequisites');
    res.json(results);
  });
});


app.post('/api/courseman/transcript', (req, res) => {
  const { student_id, course_name } = req.body;
  const sql = 'INSERT INTO transcript (student_id, course_name) VALUES (?, ?)';
  db.query(sql, [student_id, course_name], (error, results) => {
    if (error) return res.status(500).send('Error updating transcript');
    res.json({ message: "Transcript updated successfully", data: results });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});