import React, { useState, useEffect } from 'react';
import { FaKey } from 'react-icons/fa';

const containerStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  width: '450px',
  margin: '2rem auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const inputRowStyle = {
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center',
  marginBottom: '1rem',
};

const inputStyle = {
  flex: 1,
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  transition: 'border-color 0.3s ease',
};


const buttonStyle = {
  padding: '0.6rem 1.2rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#28a745',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const linkStyle = {
  textAlign: 'center',
  fontSize: '1rem',
  color: '#28a745',
  textDecoration: 'none',
};

const headingStyle = {
  textAlign: 'center',
  color: '#28a745',
};

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Extract token from URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('Invalid token.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = await fetch('http://localhost:5001/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (res.ok) {
      alert('Password reset successful!');
    } else {
      setError('Error resetting password');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Reset Your Password</h2>

      <form onSubmit={handleSubmit}>

        <div style={inputRowStyle}>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter new password"
            style={inputStyle}
            required
          />
        </div>

        <div style={inputRowStyle}>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm new password"
            style={inputStyle}
            required
          />
        </div>

        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

        <button type="submit" style={buttonStyle}>
          <FaKey /> Reset Password
        </button>
      </form>

      <a href="/login" style={linkStyle}>Go back to login</a>
    </div>
  );
}

export default ResetPassword;
