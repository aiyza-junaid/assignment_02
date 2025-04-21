import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  minWidth: '1000px',
  borderRadius: '10px',
  background: 'linear-gradient(to right, #43cea2, #185a9d)',
};

const formStyle = {
  background: '#fff',
  padding: '3rem',
  borderRadius: '10px',
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1.5rem',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  marginBottom: '1rem',
  borderRadius: '8px',
  border: '1px solid #ddd',
  transition: 'border-color 0.3s ease',
};

const buttonStyle = {
  padding: '0.75rem',
  fontSize: '1.1rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#28a745',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const buttonHoverStyle = {
  backgroundColor: '#218838',
};

const linkStyle = {
    display: 'block',
    marginTop: '1rem',
    color: '#185a9d',
    textDecoration: 'none',
    fontSize: '0.9rem',
  };

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:5001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
          // Server might return { message: 'Invalid credentials' }
          throw new Error(data.message || 'Login failed');
        }

        // On success, store the token and redirect
        localStorage.setItem('token', data.token);
        navigate('/notes');
      } catch (err) {
        alert(err.message);
      }
  };

  return (
    <div style={formContainerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Login</h2>
        <input
          type="email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          onFocus={(e) => e.target.style.borderColor = '#28a745'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <input
          type="password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          onFocus={(e) => e.target.style.borderColor = '#28a745'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <button
          type="submit"
          style={{
            ...buttonStyle,
            backgroundColor: isButtonHovered ? buttonHoverStyle.backgroundColor : buttonStyle.backgroundColor
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Login
        </button>
        <a href="/forgot-password" style={linkStyle}>Forgot Password?</a>
        <a href="/signup" style={linkStyle}>Don't have an account? Sign Up</a>
      </form>
    </div>
  );
}

export default Login;
