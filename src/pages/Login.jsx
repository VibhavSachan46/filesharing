import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // console.log('Login successful:', data);
        // Save token to local storage
        localStorage.setItem('token_filesharing', data.token);
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        // console.log('Login failed:', data);
        setError(data.message);
      }
    } catch (error) {
      // console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-richblue-400 to-caribbeangreen-200 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-richblue-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-richblack-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full px-4 py-2 mt-2 text-richblack-700 bg-white border border-richblack-300 rounded-md focus:border-caribbeangreen-300 focus:ring-caribbeangreen-300 focus:outline-none focus:ring focus:ring-opacity-40 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-richblack-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-2 mt-2 text-richblack-700 bg-white border border-richblack-300 rounded-md focus:border-caribbeangreen-300 focus:ring-caribbeangreen-300 focus:outline-none focus:ring focus:ring-opacity-40 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-caribbeangreen-400 rounded-md hover:bg-caribbeangreen-500 focus:outline-none focus:bg-caribbeangreen-500 transition duration-200"
            >
              Login
            </button>
          </div>
          <p className="text-center text-richblack-600">
            Don't have an account?{' '}
            <span className="text-caribbeangreen-600 cursor-pointer hover:underline" onClick={() => navigate('/signup')}>
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
