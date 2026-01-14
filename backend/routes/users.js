import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);  // CREATE - Register new user
router.post('/login', loginUser);        // READ - Login user

// Protected routes (require authentication)
router.get('/profile', protect, getUserProfile);      // READ - Get user profile
router.put('/profile', protect, updateUserProfile);   // UPDATE - Update user profile
router.delete('/profile', protect, deleteUser);       // DELETE - Delete user account

// Admin route
router.get('/', protect, getAllUsers);    // READ - Get all users

export default router;
