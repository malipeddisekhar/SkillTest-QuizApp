import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  optionA: {
    type: String,
    required: true
  },
  optionB: {
    type: String,
    required: true
  },
  optionC: {
    type: String,
    required: true
  },
  optionD: {
    type: String,
    required: true
  },
  correctOption: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  }
}, {
  timestamps: true
});

export default mongoose.model('Question', QuestionSchema);
