import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export const Header = ({ onGoHome, onGoAdmin, onGoRegister, onGoLogin, onGoProfile }) => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      onGoHome();
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-full mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={onGoHome}>
            <div className="bg-indigo-600 p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Skill<span className="text-indigo-600">Test</span>
            </h1>
          </div>
          
          <nav className="flex items-center gap-3 ml-auto">
            <button 
              onClick={onGoAdmin}
              className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors px-2"
            >
              Admin
            </button>

            {isAuthenticated() ? (
              <>
                <button 
                  onClick={onGoProfile}
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors px-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {user?.username}
                </button>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={onGoLogin}
                  className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors px-2"
                >
                  Login
                </button>
                <button 
                  onClick={onGoRegister}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Register
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
