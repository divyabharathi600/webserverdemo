// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Calculate total, average, and grade
function calculateDetails(marks1, marks2, marks3) {
  const total = marks1 + marks2 + marks3;
  const average = total / 3;
  const grade = average >= 90 ? 'A' : average >= 75 ? 'B' : 'C';
  return { total, average, grade };
}

// Home page route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// About page route
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

// Contact page route
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

// View all students' records
app.get('/view-students', (req, res) => {
  fs.readFile('students.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    const students = JSON.parse(data || '[]');
    let htmlContent = '<h2>Student Records</h2><ul>';
    students.forEach((student, index) => {
      htmlContent += `<li>${index + 1}. ${student.name}, Age: ${student.age}, Course: ${student.course}, Marks: [${student.marks1}, ${student.marks2}, ${student.marks3}], Total: ${student.total}, Average: ${student.average}, Grade: ${student.grade}</li>`;
    });
    htmlContent += '</ul><a href="/">Back to Home</a>';
    res.send(htmlContent);
  });
});

// Save or edit a student record
app.post('/save-record', (req, res) => {
  const { name, age, course, marks1, marks2, marks3 } = req.body;
  const marks = [parseInt(marks1), parseInt(marks2), parseInt(marks3)];
  const { total, average, grade } = calculateDetails(...marks);

  const newStudent = {
    name,
    age,
    course,
    marks1: marks[0],
    marks2: marks[1],
    marks3: marks[2],
    total,
    average,
    grade,
  };

  fs.readFile('students.json', 'utf-8', (err, data) => {
    const records = JSON.parse(data || '[]');
    const existingIndex = records.findIndex(record => record.name === name);
    
    if (existingIndex > -1) {
      records[existingIndex] = newStudent; // Edit existing record
    } else {
      records.push(newStudent); // Add new record
    }

    fs.writeFile('students.json', JSON.stringify(records), (err) => {
      if (err) {
        return res.status(500).send("Error saving record");
      }
      res.redirect('/view-students');
    });
  });
});

// 404 route handler
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
