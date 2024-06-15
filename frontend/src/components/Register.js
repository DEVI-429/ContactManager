import React, { useState } from 'react';
import { registerUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
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
          <h2 style={{ textAlign: 'center' }}>Register to CM</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              className={styles.input}
              type="text"
              name="registerName"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="email"
              name="registerEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="password"
              name="registerPassword"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Password must start with a capital letter, be at least 8 characters long, contain at least one special character, and one number."
            />
            {passwordError && <div style={{ color: 'red', marginBottom: '10px',padding:'10px' }}>{passwordError}</div>}
            <button className={styles.submit} type="submit">Register</button>
          </form>
        </div>
        <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '5px' }}>
          Have an account? <button className={styles.button} onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
