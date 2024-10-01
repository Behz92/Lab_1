import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css'; // Import the CSS file for styles

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/registration', {
                name,
                email,
                password
            });
            alert('Registration successful');
            console.log('Response:', response); // Log success response
            navigate('/'); // Navigate to the login page after successful registration
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message); // Log the exact error
            alert('Registration failed');
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-header">Register</h2>
            <form onSubmit={handleRegister} className="register-form">
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    className="register-input"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="register-input"
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="register-input"
                />
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
}

export default Register;
