import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import * as api from '../services/apiService';

const Profile = ({ onBack }) => {
  const { user, updateUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // If password is being changed, validate it
    if (formData.password) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);
    try {
      const updateData = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone
      };
      
      // Only include password if it's being changed
      if (formData.password) {
        updateData.password = formData.password;
      }

      const updatedUser = await api.updateProfile(updateData);
      updateUser(updatedUser);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setFormData({
        ...formData,
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      await api.deleteProfile();
      logout();
      alert('Account deleted successfully');
      onBack();
    } catch (err) {
      setError(err.message || 'Failed to delete account');
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to view your profile</h2>
          <Button onClick={onBack}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {isEditing ? 'Update Profile' : 'My Profile'}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!isEditing}
                required
                minLength={3}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-green-500 focus:border-transparent' : 'bg-gray-100'
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-green-500 focus:border-transparent' : 'bg-gray-100'
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-green-500 focus:border-transparent' : 'bg-gray-100'
                }`}
              />
            </div>

            {isEditing && (
              <>
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-600 mb-3">Leave password fields empty if you don't want to change it</p>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      minLength={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter new password (optional)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setError('');
                      setSuccess('');
                      setFormData({
                        username: user.username || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        password: '',
                        confirmPassword: ''
                      });
                    }}
                    variant="secondary"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex-1"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    type="button"
                    onClick={onBack}
                    variant="secondary"
                    className="flex-1"
                  >
                    Back
                  </Button>
                </>
              )}
            </div>
          </form>

          {!isEditing && (
            <div className="mt-6 pt-6 border-t">
              <Button
                onClick={() => setIsDeleting(!isDeleting)}
                variant="danger"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? 'Cancel' : 'Delete Account'}
              </Button>
              
              {isDeleting && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-800 font-semibold mb-3">
                    Warning: This will permanently delete your account and all associated data!
                  </p>
                  <Button
                    onClick={handleDelete}
                    disabled={loading}
                    className="w-full bg-red-700 hover:bg-red-800 text-white"
                  >
                    {loading ? 'Deleting...' : 'Confirm Delete Account'}
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Member since: {new Date(user.createdAt || Date.now()).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
