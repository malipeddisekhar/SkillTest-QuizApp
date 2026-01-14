import Score from '../models/Score.js';

// GET all scores (leaderboard)
export const getAllScores = async (req, res) => {
  try {
    const scores = await Score.find()
      .populate('userId', 'username email')
      .sort({ score: -1, createdAt: -1 })
      .limit(10);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scores', error: error.message });
  }
};

// GET user's scores
export const getUserScores = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user scores', error: error.message });
  }
};

// CREATE new score (protected - requires authentication)
export const createScore = async (req, res) => {
  try {
    const { totalQuestions, correctAnswers, score } = req.body;
    
    const newScore = new Score({
      userId: req.user._id,
      username: req.user.username,
      email: req.user.email,
      totalQuestions,
      correctAnswers,
      score
    });
    
    const savedScore = await newScore.save();
    res.status(201).json({ message: 'Score saved successfully', score: savedScore });
  } catch (error) {
    res.status(400).json({ message: 'Error saving score', error: error.message });
  }
};
