import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ResetPassword.css'; // Make sure to import your CSS file

const ResetPassword = () => {
    const { resetToken } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await axios.post(`http://localhost:5000/api/users/resetpassword/${resetToken}`, { password });
            alert('Password reset successful');
            navigate('/login');
        } catch (error) {
            console.error('Password reset failed', error);
        }
    };

    return (
        <div className="reset-password-container" id="reset-password-container">
            <h2 className="reset-password-title" id="reset-password-title">Reset Password</h2>
            <form onSubmit={handleSubmit} className="reset-password-form" id="reset-password-form">
                <input 
                    type="password" 
                    placeholder="New Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="reset-password-input" 
                    id="new-password"
                />
                <input 
                    type="password" 
                    placeholder="Confirm New Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    className="reset-password-input" 
                    id="confirm-password"
                />
                <button 
                    type="submit" 
                    className="reset-password-button" 
                    id="reset-password-button"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
