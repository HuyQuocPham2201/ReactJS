import React, { useState, useRef, useEffect } from 'react';
import './LoginPage.css';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

function LoginPage() {
  const userRef = useRef();
  const errRef = useRef(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState (''); 
  const [success, setSuccess] = useState(false); 

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  useEffect(() => {
    userRef.current.foscus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // Reset the form
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 >Login Page</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          ref = {userRef}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          autoComplete= "off"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
