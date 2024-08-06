import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token_filesharing");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className='h-full'>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <Route path='*' element={<Navigate to="/dashboard" />} />
          ) : (
            <Route path='/' element={<LandingPage />} />
          )}
          <Route path='/login' element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
