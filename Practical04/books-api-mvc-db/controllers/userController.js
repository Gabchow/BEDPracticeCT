const userModel = require("../models/userModel");

// Get all books
async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(books);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving users" });
  }
}

// Get book by ID
async function getUserById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
}

// Create new book
async function createUser(req, res) {
  try {
    const newUser = await userModel.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error creating user" });
  }
}

async function updateUser(req, res){
  try{
    const id = parseInt(req.params.id);
    const updatedUser = await userModel.updateUser(id, req.body);

    if(!updatedUser){
      return res.status(404).json({error: "User not found."});
    }

    res.json(updateUser);
  } catch(error){
    console.error("Controller error:", error)
    res.status(500).json({error: "Error updating user"})

  }
}

async function deleteUser(req, res){
try{
  const id = parseInt(req.params.id);
  const deleted = await userModel.deleteUser(id);

  if(!deleted){
    return res.status(404).json({error: "User not found"});
  }

  res.status(204).send();
}
catch(error){
  console.error("Controller error:", error);
  res.status(500).json({error: "Error deleting user"});

}
}

async function searchUsers(req, res) {
  const searchTerm = req.query.searchTerm; // Extract search term from query params

  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    const users = await User.searchUsers(searchTerm);
    res.json(users);
  } catch (error) {
    console.error("Controller error in searchUsers:", error);
    res.status(500).json({ message: "Error searching users" });
  }
}

async function getUsersWithBooks(req ,res) {
    try{
        const users = await User.getUsersWithBooks();
        res.json(users);
    } catch (error){
        console.error("Controller error in getUserswithBooks: ", error);
        res.status(500).json({message: "Error fetching users with books"});
    }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  getUsersWithBooks,
};