import React, { useState } from 'react';
import { loginUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({ email, password });
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(e.target.value)) {
      setPasswordError('Password must start with a capital letter, be at least 8 characters long, contain at least one special character, and one number.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.formContainer}>
        <div>
          <h2 style={{ textAlign: 'center' }}>Login to CM</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.input}
              name="loginEmail"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.input}
              name="loginPassword"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Password must start with a capital letter, be at least 8 characters long, contain at least one special character, and one number."
            />
            {passwordError && <div style={{ color: 'red', marginBottom: '10px',padding:'10px' }}>{passwordError}</div>}
            <button className={styles.submit} type="submit">Login</button>
          </form>
        </div>
        <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '5px' }}>
          New to CM? <button className={styles.button} onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
