import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../Sidebar';
import logo from '../../../assets/images/ConVox/logo_convox_dashboard.png';

const RealTimeDashboard = () => {
    const [serverIp, setServerIp] = useState('172.16.13.29');
    const [databaseName, setDatabaseName] = useState('select');
    const [tableName, setTableName] = useState('');
    const [response, setResponse] = useState('');
    
    let intervalId;

    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const updateTime = () => {
        const now = new Date();
        const formattedTime = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) + ' ' + now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const serverTimeElement = document.getElementById('server-time-text');
        if (serverTimeElement) {
            serverTimeElement.textContent = 'Server time - ' + formattedTime;
        }
    };

    const confirmLogout = (event) => {
        event.preventDefault();
        const userConfirmed = window.confirm("Are you sure you want to log out?");
        if (userConfirmed) {
            const token = localStorage.getItem('jwt');
            fetch('http://localhost:8080/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to log out');
                    }
    
                    // Clear cache and manipulate history
                    window.localStorage.clear();
                    window.sessionStorage.clear();
    
                    // Replace current URL with the login URL
                    window.location.replace('/convox/login');
                    
                    // Alternatively use pushState to manipulate history
                    window.history.pushState(null, null, '/convox/login');
    
                    // Clear intervals
                    clearInterval(intervalId);
                })
                .catch(error => {
                    console.error('Logout error:', error);
                    alert('Failed to log out');
                });
        }
    };

    return (
        <div className="grid min-h-screen grid-cols-[auto,1fr] grid-rows-[auto,1fr,auto]">
            <Helmet>
                <title>Real-time Dashboard - ConVox</title>
            </Helmet>
            <Sidebar />
            <div className="header flex justify-between items-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-4 col-span-1 col-start-2 row-span-1">
                <img src={logo} alt="ConVox Logo Dashboard" className="h-16 w-auto object-contain ml-8" />
                <div className="server-time flex items-center">
                    <i className="fa-solid fa-server mr-2"></i>
                    <i className="fa-regular fa-clock mr-2"></i>
                    <span id="server-time-text"></span>
                </div>
                <div className="flex space-x-4">
                    <a href="/convox/dashboard" className="bg-green-500 hover:bg-green-700 hover:-translate-y-0.5 text-white font-bold py-2 px-4 rounded">Dashboard</a>
                    <a href="" onClick={confirmLogout} className="bg-red-500 hover:bg-red-700 hover:-translate-y-0.5 text-white font-bold py-2 px-4 rounded">Logout</a>
                </div>
            </div>
            <div id="main-content" className="p-5 text-2xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 col-span-1 col-start-2 row-span-1">
                <h1 className="text-center mb-4">Real-time Dashboard</h1>
                {/* Content goes here */}
            </div>
            <div className="footer text-gray-500 text-center py-2 col-span-1 col-start-2 row-span-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                Powered by Deepija Telecom Pvt Ltd &copy; 2024 All Rights Reserved.
            </div>
        </div>
    );
};

export default RealTimeDashboard;