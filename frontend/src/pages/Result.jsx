import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/Button.jsx';
import { apiService } from '../services/apiService.js';

const Result = ({ record, onRetry }) => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    apiService.getLeaderboard().then(setLeaderboard);
  }, []);

  const getRankEmoji = (score) => {
    if (score === 100) return '🏆 Superb!';
    if (score >= 80) return '🔥 Impressive!';
    if (score >= 50) return '👍 Good Effort!';
    return '🌱 Keep Learning!';
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8 sm:p-12">
        <div className="mb-6">
          <div className={`
            inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl mb-4
            ${record.score >= 50 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}
          `}>
            {record.score >= 80 ? '🎉' : record.score >= 50 ? '✨' : '📚'}
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{getRankEmoji(record.score)}</h2>
          <p className="text-gray-500 italic">Excellent performance, {user?.username || 'Guest'}!</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <span className="block text-indigo-600 font-bold text-3xl">{record.correctAnswers}/{record.totalQuestions}</span>
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Score</span>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <span className="block text-gray-700 font-bold text-3xl">{record.score}%</span>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Accuracy</span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 font-semibold text-sm">✓ Score saved to your account!</p>
          <p className="text-blue-600 text-xs">View all your scores in your profile</p>
        </div>

        <Button onClick={onRetry} variant="primary" size="lg" className="w-full">
          Try Again
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 bg-gray-50 border-b flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center">
            <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Leaderboard Top 10
          </h3>
          <span className="text-xs text-gray-400 font-medium">Updated just now</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {leaderboard.length > 0 ? leaderboard.map((item, idx) => (
                <tr key={idx} className={item.username === user?.username && item.score === record.score ? 'bg-indigo-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">#{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {item.username}
                    {item.username === user?.username && <span className="ml-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">You</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-indigo-600">{item.score}%</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-400">No scores yet. Be the first!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;
