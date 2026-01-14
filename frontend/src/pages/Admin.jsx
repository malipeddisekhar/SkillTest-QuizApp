import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button.jsx';
import { apiService } from '../services/apiService.js';

const Admin = ({ onBack, onQuestionAdded }) => {
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: 0
  });

  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await apiService.getQuestions();
      setQuestions(data || []);
    } catch (error) {
      console.error('Failed to load questions', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        await apiService.updateQuestion(editingId, formData);
        setMessage('Question updated successfully!');
        setEditingId(null);
      } else {
        await apiService.addQuestion(formData);
        setMessage('Question added successfully!');
      }
      
      setFormData({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctOption: 0
      });
      
      await loadQuestions();
      onQuestionAdded();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save question. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (question) => {
    setFormData({
      question: question.question,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctOption: question.correctOption
    });
    setEditingId(question._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      await apiService.deleteQuestion(id);
      setMessage('Question deleted successfully!');
      await loadQuestions();
      onQuestionAdded();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to delete question. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: 0
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 sm:p-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingId ? 'Update Question' : 'Add New Question'}
          </h2>
          <Button variant="secondary" onClick={onBack}>Back to Quiz</Button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg font-medium flex items-center ${
            message.includes('Failed') || message.includes('deleted') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              {message.includes('Failed') ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              )}
            </svg>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
            <input
              required
              className="w-full px-4 py-3 rounded-lg border-gray-300 border outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
              placeholder="Enter the question here..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Option A</label>
              <input required className="w-full px-4 py-3 rounded-lg border-gray-300 border outline-none focus:ring-2 focus:ring-indigo-500" value={formData.optionA} onChange={(e) => setFormData({...formData, optionA: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Option B</label>
              <input required className="w-full px-4 py-3 rounded-lg border-gray-300 border outline-none focus:ring-2 focus:ring-indigo-500" value={formData.optionB} onChange={(e) => setFormData({...formData, optionB: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Option C</label>
              <input required className="w-full px-4 py-3 rounded-lg border-gray-300 border outline-none focus:ring-2 focus:ring-indigo-500" value={formData.optionC} onChange={(e) => setFormData({...formData, optionC: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Option D</label>
              <input required className="w-full px-4 py-3 rounded-lg border-gray-300 border outline-none focus:ring-2 focus:ring-indigo-500" value={formData.optionD} onChange={(e) => setFormData({...formData, optionD: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correct Option</label>
            <select 
              className="w-full px-4 py-3 rounded-lg border-gray-300 border appearance-none outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.correctOption}
              onChange={(e) => setFormData({...formData, correctOption: parseInt(e.target.value)})}
            >
              <option value={0}>Option A</option>
              <option value={1}>Option B</option>
              <option value={2}>Option C</option>
              <option value={3}>Option D</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : (editingId ? 'Update Question' : 'Add Question')}
            </Button>
            {editingId && (
              <Button type="button" variant="secondary" size="lg" onClick={handleCancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">All Questions ({questions.length})</h3>
        
        {questions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No questions available. Add your first question above!</p>
        ) : (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-800 flex-1">
                    <span className="text-indigo-600 mr-2">Q{index + 1}.</span>
                    {q.question}
                  </h4>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className={`p-2 rounded ${q.correctOption === 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <span className="font-medium">A:</span> {q.optionA}
                  </div>
                  <div className={`p-2 rounded ${q.correctOption === 1 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <span className="font-medium">B:</span> {q.optionB}
                  </div>
                  <div className={`p-2 rounded ${q.correctOption === 2 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <span className="font-medium">C:</span> {q.optionC}
                  </div>
                  <div className={`p-2 rounded ${q.correctOption === 3 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <span className="font-medium">D:</span> {q.optionD}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleEdit(q)}
                    className="flex-1"
                  >
                    <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Update
                  </Button>
                  <Button 
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(q._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
