import express from 'express';
import { getAllScores, getUserScores, createScore } from '../controllers/scoreController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - view leaderboard
router.get('/', getAllScores);

// Protected routes - require authentication
router.get('/my-scores', protect, getUserScores);
router.post('/', protect, createScore);

export default router;
