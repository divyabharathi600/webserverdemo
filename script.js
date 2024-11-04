// script.js
const students = JSON.parse(localStorage.getItem('students')) || [];

// Search and edit a specific student record
function searchStudent() {
    const searchName = document.getElementById('searchName').value.trim().toLowerCase();
    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Find student by name
    const student = students.find(stu => stu.name.toLowerCase() === searchName);

    if (student) {
        // Display the student details in the form
        document.getElementById('name').value = student.name;
        document.getElementById('age').value = student.age;
        document.getElementById('course').value = student.course;
        document.getElementById('marks1').value = student.marks1;
        document.getElementById('marks2').value = student.marks2;
        document.getElementById('marks3').value = student.marks3;
        
        document.getElementById('editSection').style.display = 'block';
        // Store the index of the student being edited
        document.getElementById('editForm').dataset.studentIndex = students.indexOf(student);
    } else {
        alert('Student not found');
        document.getElementById('editSection').style.display = 'none';
    }
}

function saveEdits() {
    const index = document.getElementById('editForm').dataset.studentIndex;
    const students = JSON.parse(localStorage.getItem('students')) || [];

    if (index !== undefined && students[index]) {
        // Update student data
        students[index].name = document.getElementById('name').value;
        students[index].age = document.getElementById('age').value;
        students[index].course = document.getElementById('course').value;
        students[index].marks1 = document.getElementById('marks1').value;
        students[index].marks2 = document.getElementById('marks2').value;
        students[index].marks3 = document.getElementById('marks3').value;

        // Save the updated students array back to localStorage
        localStorage.setItem('students', JSON.stringify(students));

        alert('Record updated successfully!');
        // Clear the form and hide edit section
        document.getElementById('editForm').reset();
        document.getElementById('editSection').style.display = 'none';
    } else {
        alert('Unable to update the record');
    }
}

// View specific student record
function viewRecord() {
    const viewName = document.getElementById('viewName').value;
    const student = students.find(s => s.name === viewName);

    if (student) {
        const recordDetails = document.getElementById('recordDetails');
        recordDetails.innerHTML = `<p>Name: ${student.name}</p>
                                   <p>Age: ${student.age}</p>
                                   <p>Course: ${student.course}</p>
                                   <p>Mark1: ${student.marks1}</p>
                                   <p>Mark2: ${student.marks2}</p>
                                   <p>Mark3: ${student.marks3}</p>
                                   <p>Total: ${student.total}</p>
                                   <p>Average: ${student.average}</p>`;
        recordDetails.style.display = 'block';
    } else {
        alert('Record not found.');
    }
}
