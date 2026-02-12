const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const User = require('./models/user');
const { getAll } = require('./controller/studentController');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
    res.send("Welcome to the Student Management API");
});

app.use("/api/students", studentRoutes);





app.use((req, res)=> {
    res.status(404).json({ message: "API not working" });
});
module.exports = app;
