const bookModel = require("../models/studentModel");

// Get all books
async function getAllStudents(req, res) {
  try {
    const students = await studentModel.getAllStudents();
    res.json(students);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving students" });
  }
}

// Get book by ID
async function getStudentById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const student = await studentModel.getStudentById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving Student" });
  }
}

// Create new book
async function createStudent(req, res) {
  try {
    const newStudent = await studentModel.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error creating student" });
  }
}

async function updateStudent(req, res){
  try{
    const id = parseInt(req.params.id);
    const updatedStudent = await studentModel.updateStudent(id, req.body);

    if(!updatedStudent){
      return res.status(404).json({error: "Student not found."});
    }

    res.json(updateStudent);
  } catch(error){
    console.error("Controller error:", error)
    res.status(500).json({error: "Error updating book"})

  }
}

async function deleteStudent(req, res){
try{
  const id = parseInt(req.params.id);
  const deleted = await studentModel.deleteStudent(id);

  if(!deleted){
    return res.status(404).json({error: "Book not found"});
  }

  res.status(204).send();
}
catch(error){
  console.error("Controller error:", error);
  res.status(500).json({error: "Error deleting book"});

}
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};