import React, { useState } from 'react';


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

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:5001/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Error sending reset link');
        }

        alert('Reset link sent to your email');
      } catch (err) {
        alert(err.message);
      }
  };

  return (
    <div style={formContainerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Forgot Password</h2>
        <input
          type="email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          onFocus={(e) => e.target.style.borderColor = '#ffc107'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <button
          type="submit"
          style={{
            ...buttonStyle,
            backgroundColor: isHovered ? buttonHoverStyle.backgroundColor : buttonStyle.backgroundColor,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
