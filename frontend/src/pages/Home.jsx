import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/Button.jsx';

const Home = ({ totalQuestions, onStart, onGoRegister, onGoLogin }) => {
  const { user, isAuthenticated } = useAuth();

  const handleStartQuiz = () => {
    if (!isAuthenticated()) {
      alert('Please login or register first to take the quiz!');
      return;
    }
    onStart();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-slate-100">
      <div className="bg-indigo-600 h-2"></div>
      <div className="p-8 sm:p-12">
        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-50 p-4 rounded-full mb-6 ring-8 ring-indigo-50/50">
            <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            {isAuthenticated() ? `Welcome back, ${user?.username}!` : 'Ready to test your skills?'}
          </h2>
          <p className="text-slate-500 mb-8 max-w-md text-lg">
            Master HTML, CSS, and JavaScript with our curated quiz. There are <span className="font-bold text-indigo-600">{totalQuestions} questions</span> waiting for you.
          </p>

          {isAuthenticated() ? (
            <div className="w-full max-w-sm space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800 font-semibold">✓ You're logged in!</p>
                <p className="text-green-600 text-sm">Your scores will be saved to your account</p>
              </div>
              
              <Button 
                onClick={handleStartQuiz} 
                size="lg" 
                className="w-full h-14 text-lg shadow-indigo-200 shadow-lg"
              >
                Start Quiz
              </Button>
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 font-semibold">⚠️ Authentication Required</p>
                <p className="text-yellow-600 text-sm">Please register or login to take the quiz</p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={onGoRegister} 
                  size="lg" 
                  className="flex-1 h-14 text-lg"
                >
                  Register
                </Button>
                <Button 
                  onClick={onGoLogin} 
                  size="lg" 
                  variant="outline"
                  className="flex-1 h-14 text-lg"
                >
                  Login
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-10 grid grid-cols-3 gap-4 w-full text-xs font-bold uppercase tracking-widest text-slate-400">
             <div className="flex flex-col items-center bg-slate-50 py-3 rounded-lg">
               <span className="text-indigo-600 text-lg font-black">HTML5</span>
               <span>Structure</span>
             </div>
             <div className="flex flex-col items-center bg-slate-50 py-3 rounded-lg">
               <span className="text-indigo-600 text-lg font-black">CSS3</span>
               <span>Styling</span>
             </div>
             <div className="flex flex-col items-center bg-slate-50 py-3 rounded-lg">
               <span className="text-indigo-600 text-lg font-black">JS</span>
               <span>Logic</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
