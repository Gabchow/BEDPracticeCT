const sql = require("mssql");
const dbConfig = require("../dbConfig");

// Get all books
async function getAllStudents() {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query = "SELECT id, name, address FROM Students";
    const result = await connection.request().query(query);
    return result.recordset;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

// Get book by ID
async function getStudentById(id) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query = "SELECT id, name, address FROM Students WHERE id = @id";
    const request = connection.request();
    request.input("id", id);
    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return null; // Book not found
    }

    return result.recordset[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

// Create new book
async function createStudent(studentData) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query =
      "INSERT INTO Students (name, address) VALUES (@name, @address); SELECT SCOPE_IDENTITY() AS id;";
    const request = connection.request();
    request.input("title", studentData.name);
    request.input("author", studentData.address);
    const result = await request.query(query);

    const newStudentId = result.recordset[0].id;
    return await getStudentById(newStudentId);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

// Update book by ID
async function updateStudent(id, studentData) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query = `
      UPDATE Students
      SET name = @name, address = @address
      WHERE id = @id
    `;
    const request = connection.request();
    request.input("id", id);
    request.input("title", studentData.name);
    request.input("author", studentData.address);
    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      return null; // No book found with that ID
    }

    return await getStudentById(id); // Return updated book
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

async function deleteStudent(id){
  let connection;
  try{
    connection = await sql.connect(dbConfig);
    const query = "DELETE FROM Students WHERE id = @id";
    const request = connection.request();
    request.input("id", id);
    const result = await request.query(query);

    return result.rowsAffected[0] > 0;

  } catch(error){
    console.error("Database error:", error);
    throw error;
  }
  finally{
    if(connection){
      try{
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}


module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,   // add this
  deleteStudent,   // add this
};