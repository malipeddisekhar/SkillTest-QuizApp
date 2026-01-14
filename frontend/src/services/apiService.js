const BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to create headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// User Authentication API
export const register = async (userData) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }
  
  return await response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  return await response.json();
};

export const getUserProfile = async () => {
  const response = await fetch(`${BASE_URL}/users/profile`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch profile');
  }
  
  return await response.json();
};

export const updateProfile = async (userData) => {
  const response = await fetch(`${BASE_URL}/users/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update profile');
  }
  
  return await response.json();
};

export const deleteProfile = async () => {
  const response = await fetch(`${BASE_URL}/users/profile`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete account');
  }
  
  return await response.json();
};

export const apiService = {
  getQuestions: async () => {
    try {
      const response = await fetch(`${BASE_URL}/questions`);
      if (response.ok) return await response.json();
      throw new Error('Backend not available');
    } catch (e) {
      console.warn('Backend connection failed', e);
      return [];
    }
  },

  saveResult: async (result) => {
    const response = await fetch(`${BASE_URL}/scores`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(result)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save score');
    }
    
    return await response.json();
  },

  getLeaderboard: async () => {
    try {
      const response = await fetch(`${BASE_URL}/scores`);
      if (response.ok) return await response.json();
      throw new Error('Backend not available');
    } catch (e) {
      console.warn('Failed to fetch leaderboard', e);
      return [];
    }
  },

  addQuestion: async (q) => {
    try {
      const response = await fetch(`${BASE_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(q)
      });
      if (!response.ok) throw new Error('Failed to add question');
    } catch (e) {
      console.warn('Failed to add question', e);
      throw e;
    }
  },

  updateQuestion: async (id, q) => {
    try {
      const response = await fetch(`${BASE_URL}/questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(q)
      });
      if (!response.ok) throw new Error('Failed to update question');
    } catch (e) {
      console.warn('Failed to update question', e);
      throw e;
    }
  },

  deleteQuestion: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/questions/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete question');
    } catch (e) {
      console.warn('Failed to delete question', e);
      throw e;
    }
  }
};
