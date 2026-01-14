import Question from '../models/Question.js';

// GET all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

// GET single question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question', error: error.message });
  }
};

// CREATE new question
export const createQuestion = async (req, res) => {
  try {
    const { question, optionA, optionB, optionC, optionD, correctOption } = req.body;
    
    const newQuestion = new Question({
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption
    });
    
    const savedQuestion = await newQuestion.save();
    res.status(201).json({ message: 'Question created successfully', question: savedQuestion });
  } catch (error) {
    res.status(400).json({ message: 'Error creating question', error: error.message });
  }
};

// UPDATE question by ID
export const updateQuestion = async (req, res) => {
  try {
    const { question, optionA, optionB, optionC, optionD, correctOption } = req.body;
    
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { question, optionA, optionB, optionC, optionD, correctOption },
      { new: true, runValidators: true }
    );
    
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    res.status(400).json({ message: 'Error updating question', error: error.message });
  }
};

// DELETE question by ID
export const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error: error.message });
  }
};
