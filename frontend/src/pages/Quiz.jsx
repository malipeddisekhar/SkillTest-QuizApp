import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button.jsx';

const Quiz = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (optionIdx) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentIndex] = optionIdx;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOption) {
        correct++;
      }
    });
    onFinish(correct);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (!currentQuestion) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[500px] border border-slate-100">
      <div className="px-8 py-5 bg-slate-50 border-b flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Question</span>
          <span className="text-2xl font-black text-indigo-600">
            {currentIndex + 1} <span className="text-slate-300 font-normal">/ {questions.length}</span>
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Time Left</span>
          <span className={`text-2xl font-mono font-black ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-100 h-2">
        <div 
          className="bg-indigo-600 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(79,70,229,0.4)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="p-8 sm:p-10 flex-grow">
        <h3 className="text-2xl font-bold text-slate-900 mb-10 leading-snug">
          {currentQuestion.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {[currentQuestion.optionA, currentQuestion.optionB, currentQuestion.optionC, currentQuestion.optionD].map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              className={`
                group flex items-center p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden
                ${selectedAnswers[currentIndex] === idx 
                  ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' 
                  : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50'}
              `}
            >
              <div className={`
                w-10 h-10 flex items-center justify-center rounded-xl mr-5 text-base font-black transition-colors
                ${selectedAnswers[currentIndex] === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}
              `}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className={`text-lg font-semibold ${selectedAnswers[currentIndex] === idx ? 'text-indigo-900' : 'text-slate-700'}`}>
                {opt}
              </span>
              {selectedAnswers[currentIndex] === idx && (
                <div className="absolute right-6 text-indigo-600">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 bg-slate-50 border-t flex justify-between">
        <Button 
          variant="secondary" 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="border-slate-200"
        >
          Previous
        </Button>
        
        {currentIndex === questions.length - 1 ? (
          <Button 
            variant="primary" 
            onClick={handleFinish}
            disabled={selectedAnswers.some(ans => ans === -1)}
            className="px-10"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button 
            variant="primary" 
            onClick={handleNext}
            className="px-10"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
