import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/ConVox/logo_convox_login.png';

const ConvoxLogin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Login failed');
            })
            .then((data) => {
                localStorage.setItem('jwt', data.jwt); // Store the JWT token
                // alert('Login successful!');
                navigate('/dashboard');
            })
            .catch((error) => {
                setError('Invalid username or password');
            });
    };

    const togglePasswordVisibility = () => {
        const passwordField = document.getElementById('password');
        const passwordIcon = document.getElementById('togglePasswordIcon');
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        passwordIcon.classList.toggle('fa-eye');
        passwordIcon.classList.toggle('fa-eye-slash');
    };

    return (
        <div className="flex flex-col justify-between min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            <Helmet> <title>Login - ConVox</title> </Helmet>
            <div className="flex justify-center items-center flex-grow">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                    <img src={logo} alt="ConVox Logo" className="w-48 h-auto mx-auto mb-4" />
                    <h2 className="text-2xl font-bold my-4">Login</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <label htmlFor="username" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <i className="fas fa-user"></i>
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Your User Name"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full py-2 pl-10 pr-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <i className="fas fa-lock"></i>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full py-2 pl-10 pr-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                id="togglePassword"
                                onClick={togglePasswordVisibility}
                            >
                                <i className="fas fa-eye" id="togglePasswordIcon"></i>
                            </span>
                        </div>
                        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <div className="footer text-center py-4 text-sm text-gray-500">
                Powered by Deepija Telecom Pvt Ltd &copy; 2024 All Rights Reserved.
            </div>
        </div>
    );
};

export default ConvoxLogin;