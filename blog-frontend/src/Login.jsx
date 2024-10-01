import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styles

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate(); // Use navigate for redirection

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            alert('Login successful');
            navigate('/posts'); // Redirect to the posts page after login
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    const handleSignUp = () => {
        navigate('/register'); // Redirect to the registration page
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    return (
        <div className="login-container">
            <h2 className="login-header">Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="login-input"
                />
                <div className="input-container">
                    <input 
                        placeholder="Enter password" 
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        className="login-input"
                    />
                    <span onClick={togglePasswordVisibility} className="password-toggle">
                        <svg 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                                strokeWidth="2" 
                                strokeLinejoin="round" 
                                strokeLinecap="round"
                            />
                            <path 
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                                strokeWidth="2" 
                                strokeLinejoin="round" 
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </div>

                <button type="submit" className="login-button">Login</button>
            </form>
            <button onClick={handleSignUp} className="signup-button">Sign Up</button> {/* Sign Up Button */}
        </div>
    );
}


export default Login;
