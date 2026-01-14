import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.jsx';
import { apiService } from './services/apiService.js';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Result from './pages/Result.jsx';
import Admin from './pages/Admin.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';

const AppContent = () => {
  const { user, isAuthenticated } = useAuth();
  const [view, setView] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await apiService.getQuestions();
      setQuestions(data || []);
    } catch (error) {
      console.error("Failed to load questions", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    if (!isAuthenticated()) {
      alert("Please login or register first to take the quiz!");
      setView('login');
      return;
    }
    if (questions.length === 0) {
      alert("No questions available to start the quiz.");
      return;
    }
    setView('quiz');
  };

  const finishQuiz = async (correctCount) => {
    const total = questions.length || 1;
    const scoreVal = Math.round((correctCount / total) * 100);
    const record = {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score: scoreVal
    };
    
    setFinalScore(record);
    try {
      await apiService.saveResult(record);
    } catch (error) {
      console.error('Failed to save score:', error);
      alert('Score saved locally but failed to sync with server');
    }
    setView('result');
  };

  const resetQuiz = () => {
    loadQuestions();
    setView('home');
    setFinalScore(null);
  };

  return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header 
          onGoHome={() => setView('home')} 
          onGoAdmin={() => setView('admin')}
          onGoRegister={() => setView('register')}
          onGoLogin={() => setView('login')}
          onGoProfile={() => setView('profile')}
        />
        
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          {loading && view === 'home' ? (
            <div className="flex flex-col items-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
               <p className="text-gray-600 font-medium">Loading Quiz Master...</p>
            </div>
          ) : (
            <div className="w-full max-w-2xl">
              {view === 'home' && (
                <Home 
                  totalQuestions={questions.length} 
                  onStart={startQuiz}
                  onGoRegister={() => setView('register')}
                  onGoLogin={() => setView('login')}
                />
              )}
              
              {view === 'quiz' && questions.length > 0 && (
                <Quiz 
                  questions={questions} 
                  onFinish={finishQuiz} 
                />
              )}
              
              {view === 'result' && finalScore && (
                <Result 
                  record={finalScore} 
                  onRetry={resetQuiz} 
                />
              )}

              {view === 'admin' && (
                <Admin 
                  onBack={() => setView('home')} 
                  onQuestionAdded={loadQuestions}
                />
              )}

              {view === 'register' && (
                <Register 
                  onBack={() => setView('home')}
                  onGoLogin={() => setView('login')}
                />
              )}

              {view === 'login' && (
                <Login 
                  onBack={() => setView('home')}
                  onGoRegister={() => setView('register')}
                />
              )}

              {view === 'profile' && (
                <Profile onBack={() => setView('home')} />
              )}
            </div>
          )}
        </main>

        <footer className="py-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SkillTest. Built for learners.<br />
          Developed by <span className="font-semibold text-indigo-600">Malipeddi Sekhar</span><br />
          Contact: <a href="tel:9110573442" className="text-indigo-500 hover:underline">9110573442</a> | {' '}
          <a href="https://www.linkedin.com/in/malipeddi-sekhar-08650630b/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">LinkedIn</a> | {' '}
          <a href="https://github.com/malipeddisekhar?tab=overview&from=2025-10-01&to=2025-10-11" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">GitHub</a>
        </footer>
      </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
