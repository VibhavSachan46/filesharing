import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.message === 'User registered successfully') {
        // Redirect to login page after successful signup
        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Failed to register user. Please try again.');
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-richblue-400 to-caribbeangreen-200 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-richblue-800">Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-richblack-800">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="block w-full px-4 py-2 mt-2 text-richblack-700 bg-white border border-richblack-300 rounded-md focus:border-caribbeangreen-300 focus:ring-caribbeangreen-300 focus:outline-none focus:ring focus:ring-opacity-40 transition duration-200"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-richblack-800">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="block w-full px-4 py-2 mt-2 text-richblack-700 bg-white border border-richblack-300 rounded-md focus:border-caribbeangreen-300 focus:ring-caribbeangreen-300 focus:outline-none focus:ring focus:ring-opacity-40 transition duration-200"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
              Signup
            </button>
          </div>
          <p className="text-center text-richblack-600">
            Already have an account?{' '}
            <span className="text-caribbeangreen-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
