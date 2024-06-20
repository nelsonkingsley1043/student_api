const express = require('express');
const Joi = require('joi');
const app = express();



const students = [
    { id: 1, studentName: 'Owen', studentDepartment: 'Computer Science', studentCourse: 'Mathematics'},
    { id: 2, studentName: 'Micheal', studentDepartment: 'Biochemistry', studentCourse: 'Biology'},
    { id: 3, studentName: 'Roseline', studentDepartment: 'Zoology', studentCourse: 'Geography'},
    { id: 4, studentName: 'Badatunde', studentDepartment: 'Mass Comm', studentCourse: 'Further Math'},
    { id: 5, studentName: 'McCarthy', studentDepartment: 'Linguistic', studentCourse: 'English'}
    ]

app.use(express.json());

app.get('/api/v1/students', (req, res) => {
    res.send(students);
});


app.post('/api/v1/students', (req, res) => {
    const studentportal = {
        id: students.length + 1, 
        studentName: req.body.studentName,
        studentDepartment: req.body.studentDepartment,
        studentCourse: req.body.studentCourse
    };
    students.push(studentportal);
    res.send(studentportal);
});

app.get('/api/v1/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('The Students With The Given ID Was Not Found');
    res.send(student);
});

app.put('/api/v1/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('The Students With The Given ID Was Not Found');

    const {error} = validateStudent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    student.studentName = req.body.studentName;
    student.studentDepartment = req.body.studentDepartment;
    student.studentCourse = req.body.studentCourse;
    res.send(student);
});

app.delete('/api/v1/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('The Students With The Given ID Was Not Found');

    const index = students.indexOf(student);
    students.splice(index, 1);
    return res.send(student);
});

function validateStudent(student){
    const schema = {
        studentName:Joi.string().min(3).required(),
        studentDepartment:Joi.string().min(3).required(),
        studentCourse:Joi.string().min(3).required()
    };
    return Joi.validate(student, schema);
}


const port = process.env.PORT || 1990;
app.listen(port, () => console.log(`listening on port ${port}`));
