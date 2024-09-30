import React, { useState } from 'react';
import './DoctorLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const URL = process.env.REACT_APP_BACKEND_URL;

const DoctorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);  // State to manage error messages
  const [loadingLogin, setLoadingLogin] = useState(false);  // State to manage loading state
  const [loadingForgot, setLoadingForgot] = useState(false);  // State to manage loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    setError(null);

    try {
      const response = await axios.post(`${URL}/api/auth/doctor-login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        // Logined successfully, navigate to home page
        navigate('/doctor-home');
      } else {
          // Handle error case
          setError(response.data.message || 'Login failed.');
      }
    } catch (err) {
      // Handle different error cases
      if (err.response) {
        setError(err.response.data.message || 'Something went wrong.');
      } else {
        setError('Server is not responding.');
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoadingForgot(true);
    setError(null);

    try {
      const response = await axios.post(`${URL}/api/auth/doctor-forgot`, {
        email: formData.email
      });

      if (!response.data.success) {
        // Handle error case
        setError(response.data.message || 'Reset link sent failed.');
      } else {
        setError(response.data.message || 'Reset link sent Successfully.');
      }
    } catch (err) {
      // Handle different error cases
      if (err.response) {
        setError(err.response.data.message || 'Something went wrong.');
      } else {
        setError('Server is not responding.');
      }
    } finally {
      setLoadingForgot(false);
    }
  };

  return (
    <div className="doctor-login-page">
      <div className="doctor-login-left-container">
        <button className="hm-btn">
          <Link to="/">← Back</Link>
        </button>
        <h2>Welcome Back!!</h2>
      </div>
      <div className="doctor-login-right-container">
        <h2>Doctor Login</h2>
        
        <form onSubmit={handleSubmit} className="doctor-login-form">
          <div className="doctor-form-group">
            <label htmlFor="email">Username:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="doctor-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-btn" disabled={loadingLogin}>
            {loadingLogin ? "Logging in..." : "Login"}
          </button>
          </div>
          <button
            type="button"
            className="forgot-btn"
            disabled={loadingForgot}
            onClick={handleForgot}
          >
            {loadingForgot ? "Sending reset link..." : "Forgot Password?"}
          </button>
          {error && <div className="error-message">{error}</div>}
          <p>
            <Link to="/doctor-register">
              Not registered? Click here to register!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
