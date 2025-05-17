const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  getUserById,
  getUserByEmail,
  deleteUserById,
  updateUserById,
  updateUserImage,
  addTutor,
  addAdmin,
  updateUserCity,
  updateUserPhoneNumber,
  updateUserAge,
  updateUserPassword,
  updateUserUsername,
} = require("../controllers/userController");

// Get all users
router.get("/", getUsers);

// Add a new user
router.post("/", addUser);

// Add admin or tutor
router.post("/admin", addAdmin);
router.post("/tutor", addTutor);

// Get user by ID
router.get("/:id", getUserById);

// Get user by email
router.get("/email/:email", getUserByEmail);

// Update user image
router.put("/image/:id", updateUserImage);

// Update user city (this should be before the generic update route)
router.put("/city/:id", updateUserCity);

// Update user phone number
router.put("/phone/:id", updateUserPhoneNumber);

// Update user age
router.put("/age/:id", updateUserAge);

// Update user password
router.put("/password/:id", updateUserPassword);

// Update user username
router.put("/username/:id", updateUserUsername);

// Delete user by ID
router.delete("/:id", deleteUserById);

// Generic user update route (for fields like username, password, etc.)
router.put("/update/:id", updateUserById); // Renamed to /update/:id to avoid conflicts with specific routes

module.exports = router;
