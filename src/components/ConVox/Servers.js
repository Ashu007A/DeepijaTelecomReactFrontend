import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './Sidebar';
import logo from '../../assets/images/ConVox/logo_convox_dashboard.png';

const Servers = () => {
    const [servers, setServers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [server, setServer] = useState({
        serverId: '',
        serverName: '',
        databaseIp: '',
        databaseWebPort: '',
        voiceIp: '',
        voiceWebPort: '',
        serverDescription: '',
        activeStatus: ''
    });
    const [activeButton, setActiveButton] = useState(null);

    let intervalId;

    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/servers')
            .then(response => response.json())
            .then(data => setServers(data))
            .catch(error => console.error('Error fetching servers:', error));
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

    const resetForm = (keepActiveButton = false) => {
        setServer({
            serverId: '',
            serverName: '',
            databaseIp: '',
            databaseWebPort: '',
            voiceIp: '',
            voiceWebPort: '',
            serverDescription: '',
            activeStatus: ''
        });
        setSearchId('');
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
        if (!keepActiveButton) {
            setActiveButton(null);
        }
    };
    
    const handleAddServer = () => {
        resetForm(true);
        setActiveButton('add');
        setShowAddForm(true);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
    };
    
    const handleUpdateServer = () => {
        resetForm(true);
        setActiveButton('update');
        setShowAddForm(false);
        setShowUpdateForm(true);
        setShowDeleteForm(false);
    };
    
    const handleDeleteServer = () => {
        resetForm(true);
        setActiveButton('delete');
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(true);
    };
    
    const resetFormHandler = () => {
        resetForm(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServer({ ...server, [name]: value });
    };

    const deleteSearchServer = () => {
        var searchValue = searchId.toLowerCase();
        var foundServer = servers.find(server => server.serverId.toLowerCase() === searchValue || server.serverName.toLowerCase() === searchValue);
        if (foundServer) {
            if (window.confirm('Are you sure you want to delete this server with ID/Name: ' + searchValue + '?')) {
                deleteServer(foundServer.id);
            }
        } else {
            alert("Server not found");
        }
    };

    const deleteServer = (id) => {
        fetch(`http://localhost:8080/api/servers/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert('Server deleted successfully');
                    setServers(servers.filter(sr => sr.id !== id));
                } else {
                    alert('Failed to delete server');
                }
            })
            .then(data => {
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while deleting the server');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = showAddForm ? 'http://localhost:8080/api/servers' : `http://localhost:8080/api/servers/${server.id}`;
        const method = showAddForm ? 'POST' : 'PUT';
    
        console.log('Submitting server:', server);
        console.log('URL:', url);
        console.log('Method:', method);
    
        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(server),
        })
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Failed to submit');
                }
                return response.json();
            })
            .then(data => {
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
    };

    const updateForm = (serverData) => {
        console.log('Found server:', serverData);
        setServer(serverData);
        document.getElementById("form-heading").innerText = "Edit Server";
        document.getElementById("submit-button").innerText = "Update Server";
        setShowAddForm(true);
    };
    
    const handleSearch = () => {
        if (isNaN(searchId)) {
            searchServerByName();
        } else {
            fetch(`http://localhost:8080/api/servers/serverId/${searchId}`)
                .then(response => {
                    console.log('Response status:', response.status);
                    if (!response.ok) {
                        throw new Error('Server not found!');
                    }
                    return response.json();
                })
                .then(data => updateForm(data))
                .catch(error => {
                    console.error('Error fetching server:', error);
                    alert('Server not found!!');
                });
        }
    };
    
    const searchServerByName = () => {
        var searchValue = searchId.toLowerCase();
        var foundServer = servers.find(server =>
            server.serverId.toLowerCase() === searchValue || server.serverName.toLowerCase() === searchValue
        );
        if (foundServer) {
            updateForm(foundServer);
        } else {
            alert("Server not found!!!");
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
            <Helmet> <title>Servers - ConVox</title> </Helmet>
            <Sidebar />
            <div className="header flex justify-between items-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-4 col-span-1 col-start-2 row-span-1">
                <img src={logo} alt="Convox Logo Dashboard" className="h-16 w-auto object-contain ml-8" />
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
            <div id="main-content" className="p-10 text-2xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 col-span-1 col-start-2 row-span-1">
                <div className="button-container text-center my-4">
                    <button className={`action-button top ${activeButton === 'add' ? 'active' : ''}`} onClick={handleAddServer}>
                        <i className="fa fa-plus"></i> Add Server  
                    </button>
                    <button className={`action-button top ${activeButton === 'update' ? 'active' : ''}`} onClick={handleUpdateServer}>
                        <i className="fa fa-edit"></i> Update Server  
                    </button>
                    <button className={`action-button top ${activeButton === 'delete' ? 'active' : ''}`} onClick={handleDeleteServer}>
                        <i className="fa fa-trash"></i> Delete Server  
                    </button>
                </div>
                <div id="update-server-search" style={{ display: showUpdateForm ? 'block' : 'none', textAlign: 'center' }}>
                    <h3>Search Server to Update</h3>
                    <input type="text" id="search-server-id" placeholder="Enter Server ID or Name" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <button className="action-button" onClick={handleSearch}>Search</button>
                    <button type="button" className="reset-button1" onClick={resetFormHandler}>Cancel</button>
                </div>
                <div id="delete-server-search" style={{ display: showDeleteForm ? 'block' : 'none', textAlign: 'center' }}>
                    <h3>Search Server to Delete</h3>
                    <input type="text" id="delete-search-server-id" placeholder="Enter Server ID or Name" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <button className="action-button" onClick={deleteSearchServer}>Search</button>
                    <button type="button" className="reset-button1" onClick={resetFormHandler}>Cancel</button>
                </div>
                <div id="server-form-container" style={{ display: showAddForm ? 'block' : 'none', margin: 'auto', width: '60%' }}>
                    <form className="server-form" id="server-form" method="post" onSubmit={handleSubmit}>
                        <h2 id="form-heading" style={{ textAlign: 'center' }}>Server Registration</h2>
                        <div className="form-group">
                            <label htmlFor="server-id">Server ID:</label>
                            <input id="server-id" name="serverId" required type="text" value={server.serverId} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="server-name">Server Name:</label>
                            <input id="server-name" name="serverName" required type="text" value={server.serverName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="database-ip">Database IP:</label>
                            <input id="database-ip" name="databaseIp" required type="text" value={server.databaseIp} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="database-web-port">Database Web Port:</label>
                            <input id="database-web-port" name="databaseWebPort" required type="number" value={server.databaseWebPort} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="voice-ip">Voice IP:</label>
                            <input id="voice-ip" name="voiceIp" required type="text" value={server.voiceIp} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="voice-web-port">Voice Web Port:</label>
                            <input id="voice-web-port" name="voiceWebPort" required type="number" value={server.voiceWebPort} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="server-description">Server Description:</label>
                            <textarea
                                style={{ border: '1px solid #ccc', padding: '8px', borderRadius:'5px', width: '100%' }}
                                id="server-description" name="serverDescription"
                                required value={server.serverDescription}
                                onChange={handleChange}>
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="active-status">Status:</label>
                            <select id="active-status" name="activeStatus" required value={server.activeStatus} onChange={handleChange}>
                                <option disabled value="">Select a status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <button className="submit-button" id="submit-button" type="submit">Submit</button>
                        <button type="button" className="reset-button" onClick={resetFormHandler}>Cancel</button>
                    </form>
                </div>
                <h2 style={{ textAlign: 'center', marginTop: '40px', marginBottom: '10px', fontSize: '35px'}}>Server List</h2>
                <table className="server-table" style={{ textAlign: 'center', margin: 'auto', width: '90%' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#04aa6d', color: '#fff' }}>
                            <th style={{ padding: '10px' }}>Reg. ID</th>
                            <th style={{ padding: '10px' }}>Server ID</th>
                            <th style={{ padding: '10px' }}>Server Name</th>
                            <th style={{ padding: '10px' }}>Database IP</th>
                            <th style={{ padding: '10px' }}>Database Web Port</th>
                            <th style={{ padding: '10px' }}>Voice IP</th>
                            <th style={{ padding: '10px' }}>Voice Web Port</th>
                            <th style={{ padding: '10px' }}>Server Description</th>
                            <th style={{ padding: '10px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servers.map((server, index) => (
                            <tr key={index} style={{
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9',
                                    padding: '10px', cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1e7dd'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#e9e9e9'}
                            >  
                                <td style={{ padding: '10px' }}>{server.id}</td>
                                <td style={{ padding: '10px' }}>{server.serverId}</td>
                                <td style={{ padding: '10px' }}>{server.serverName}</td>
                                <td style={{ padding: '10px' }}>{server.databaseIp}</td>
                                <td style={{ padding: '10px' }}>{server.databaseWebPort}</td>
                                <td style={{ padding: '10px' }}>{server.voiceIp}</td>
                                <td style={{ padding: '10px' }}>{server.voiceWebPort}</td>
                                <td style={{ padding: '10px' }}>{server.serverDescription}</td>
                                <td style={{ padding: '10px' }}>{server.activeStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="footer text-gray-500 text-center py-2 col-span-1 col-start-2 row-span-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                Powered by Deepija Telecom Pvt Ltd &copy; 2024 All Rights Reserved.
            </div>
        </div>
    );
};

export default Servers;