import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../Sidebar';
import logo from '../../../assets/images/ConVox/logo_convox_dashboard.png';

const DatabaseStatus = () => {
    const [serverIp, setServerIp] = useState('172.21.22.195:8080');
    const [databaseName, setDatabaseName] = useState('select');
    const [tableName, setTableName] = useState('');
    const [databases, setDatabases] = useState([]);
    const [tables, setTables] = useState([]);
    const [response, setResponse] = useState('');
    const [mysqlErrorLog, setMysqlErrorLog] = useState([]);
    const [applicationErrorLog, setApplicationErrorLog] = useState([]);

    useEffect(() => {
        fetchMysqlErrorLog();
        fetchApplicationErrorLog();
    }, []);

    let intervalId;

    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/databases/getAll')
            .then(response => response.json())
            .then(data => setDatabases(data))
            .catch(error => console.error('Error fetching databases:', error));
    }, []);

    useEffect(() => {
        if (databaseName !== 'select') {
            fetch(`http://localhost:8080/api/databases/getTables?databaseName=${databaseName}`)
                .then(response => response.json())
                .then(data => setTables(data))
                .catch(error => console.error('Error fetching tables:', error));
        }
    }, [databaseName]);

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

    const handleFormSubmit = (action) => {
        if (!databaseName || !tableName) {
            alert("Please select a database and table.");
            return;
        }
    
        const payload = {
            action,
            serverIp,
            dbName: databaseName,
            tableName
        };
    
        const token = localStorage.getItem('jwt');
        // console.log("JWT Token:", token);
    
        if (!token) {
            alert("No authentication token found. Please log in.");
            return;
        }
    
        fetch(`http://localhost:8080/api/databases/database_status/${action.toLowerCase()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to perform action');
                }
                return response.json(); // Expecting a JSON response
            })
            .then(data => {
                if (data.length > 0) {
                    const result = data[0];
                    setResponse({
                        database: result.Table.split('.')[0],
                        table: result.Table.split('.')[1],
                        status: result.Msg_text
                    });
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const fetchMysqlErrorLog = () => {
        fetch('http://localhost:8080/api/databases/database_status/mysqlErrorLog')
            .then(response => response.json())
            .then(data => setMysqlErrorLog(data))
            .catch(error => console.error('Error fetching MySQL error log:', error));
    };

    const fetchApplicationErrorLog = () => {
        fetch('http://localhost:8080/api/databases/database_status/applicationErrorLog')
            .then(response => response.json())
            .then(data => setApplicationErrorLog(data))
            .catch(error => console.error('Error fetching application error log:', error));
    };    

    return (
        <div className="grid min-h-screen grid-cols-[auto,1fr] grid-rows-[auto,1fr,auto]">
            <Helmet>
                <title>Database Status - ConVox</title>
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
                <form className="server-form" id="server-form" style={{ margin: 'auto', width: '50%' }}>
                    <h2 id="form-heading" style={{ textAlign: 'center' }}>Database Status</h2>
                    <div className="mb-4">
                        <label htmlFor="server_ip">Database IP:</label>
                        <input type="text" id="server_ip" value={serverIp} onChange={(e)=> setServerIp(e.target.value)} className="TEXTBOX" style={{ border: '1px solid #ccc', padding: '8px', borderRadius:'5px', width: '100%' }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="database_name">Database Name:</label>
                        <select id="database_name" value={databaseName} onChange={(e)=> setDatabaseName(e.target.value)} className="SELECTBOX" style={{ border: '1px solid #ccc', padding: '8px', borderRadius:'5px', width: '100%' }}> <option value='select'>Select</option> {databases.map(db => ( <option key={db} value={db}>{db}</option> ))} </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="table_name">Table Name:</label>
                        <select id="table_name" value={tableName} onChange={(e)=> setTableName(e.target.value)} className="SELECTBOX" style={{ border: '1px solid #ccc', padding: '8px', borderRadius:'5px', width: '100%' }}> <option value='select'>Select</option> {tables.map(table => ( <option key={table} value={table}>{table}</option> ))} </select>
                    </div>
                    <button type="button" onClick={()=> handleFormSubmit('CHECK')} className="submit-button">Check</button>
                    <button type="button" onClick={()=> handleFormSubmit('REPAIR')} className="submit-button" style={{ marginLeft: '20px' }}>Repair</button>
                    <button type="button" onClick={()=> window.location.reload()} className="reset-button">Refresh Screen</button>
                </form> {response && ( <div className="mt-4 bg-gray-100 p-4 rounded" style={{ width: '30%', marginLeft: '35%' }}>
                    <p>Database: {response.database}</p>
                    <p>Table: {response.table}</p>
                    <p style={{ color: response.status === 'OK' ? 'green' : 'red' }}> Status: {response.status} </p>
                </div> )} <div className="my-8">
                    <table className="station-table bg-white" style={{ margin: 'auto', width: '90%' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#04aa6d', color: '#fff' }}>
                                <th className="py-2 px-4 border" style={{ width: '50%', padding: '10px' }}>MySQL Error Log</th>
                                <th className="py-2 px-4 border" style={{ width: '50%', padding: '10px' }}>Application Error Log</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border">
                                    <div className="overflow-auto" style={{ height: '240px', width: '100%' }}>
                                        <p className="text-sm">tail: cannot open '/var/log/mysql/error.log' for reading: Permission denied</p>
                                        {mysqlErrorLog.map((line, index) => (
                                            <p key={index} className="text-sm">{line}</p>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-2 px-4 border">
                                    <div className="overflow-auto" style={{ height: '240px', width: '100%' }}>
                                        <table className="w-full">
                                            <thead className="bg-gray-200">
                                                <tr>
                                                    <th className="py-1 px-2 border">Message</th>
                                                    <th className="py-1 px-2 border">Subject</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {applicationErrorLog.map((log, index) => (
                                                    <tr key={index} style={{
                                                        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9',
                                                        padding: '10px', cursor: 'pointer'
                                                    }}>
                                                        <td className="py-1 px-2 border">{log.message}</td>
                                                        <td className="py-1 px-2 border">{log.subject}</td>
                                                    </tr> ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="footer text-gray-500 text-center py-2 col-span-1 col-start-2 row-span-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                Powered by Deepija Telecom Pvt Ltd &copy; 2024 All Rights Reserved.
            </div>
        </div>
    );
};

export default DatabaseStatus;