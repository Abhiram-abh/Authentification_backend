import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './global.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className={`auth-container ${showLogin ? 'show-login' : 'show-register'}`}>
      <div className="form-container">
        <div className="slider-panel">
          <h2>{showLogin ? 'New here?' : 'Already registered?'}</h2>
          <p>{showLogin ? 'Sign up to get started' : 'Sign in to continue'}</p>
          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'Register' : 'Login'}
          </button>
        </div>
        <div className="form-box">
          {showLogin ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default App;
