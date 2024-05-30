import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Make sure to import your CSS file

Modal.setAppElement('#root'); // To avoid accessibility issues

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal
    const [forgotEmail, setForgotEmail] = useState(''); // State for email in modal
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            }
        } catch (error) {
            alert("Invalid Email or Password")
            console.error('Login failed', error);
        }
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/forgotpassword', { email: forgotEmail });
            alert('Password reset link sent to your email');
            setModalIsOpen(false);
        } catch (error) {
            console.error('Password reset failed', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="login-input" 
                    id="login-email"
                />
                <div className="password-container">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="login-input" 
                        id="login-password"
                    />
                    <button 
                        type="button" 
                        onClick={() => setModalIsOpen(true)} 
                        className="forgot-password-button fw-bold" 
                        id="forgot-password-button"
                    >
                        Forgot Password?
                    </button>
                </div>
                <button type="submit" className="login-button" id="login-button">Login</button>
                <p>Don't have an account? <a className="fw-bold" href="#!" onClick={() => navigate('/register')}> Register here</a></p>
            </form>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Forgot Password Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Forgot Password</h2>
                <form onSubmit={handleForgotPasswordSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={forgotEmail} 
                        onChange={(e) => setForgotEmail(e.target.value)} 
                        required 
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
};

export default Login;
