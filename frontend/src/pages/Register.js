import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'; // Make sure to import your CSS file

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/register', { name, email, mobile, password });
            console.log(res.data);
            if (res.status === 201) {
                alert("Registration successful! Please login to continue.")
                navigate('/login');
            }
        } catch (error) {
            alert("somthin g went wrong Or User Alredy Exist ! Plese LogIn")
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="register-input" 
                    id="register-name"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="register-input" 
                    id="register-email"
                />
                <input 
                    type="text" 
                    placeholder="Mobile" 
                    value={mobile} 
                    onChange={(e) => setMobile(e.target.value)} 
                    required 
                    className="register-input" 
                    id="register-mobile"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="register-input" 
                    id="register-password"
                />
                <button type="submit" className="register-button" id="register-button">Register</button>
                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                    className="fw-bold text-body" onClick={() => navigate('/login')}><u className="fw-bold">Login here</u></a></p>
            </form>
        </div>
    );
};

export default Register;
