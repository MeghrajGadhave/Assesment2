import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ForgotPassword.css'; // Make sure to import your CSS file

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/forgotpassword', { email });
            alert('Password reset link sent to your email');
        } catch (error) {
            console.error('Password reset failed', error);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="forgot-password-input" 
                />
                <button type="submit" className="forgot-password-button" >Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
