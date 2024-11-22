import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from '../Sidebar';
import logo from '../../../assets/images/ConVox/logo_convox_dashboard.png';

const Stations = () => {
    const [stations, setStations] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [station, setStation] = useState({ stationId: '', stationName: '', activeStatus: '' });
    const [activeButton, setActiveButton] = useState(null);

    let intervalId;

    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/stations')
            .then(response => response.json())
            .then(data => setStations(data))
            .catch(error => console.error('Error fetching stations:', error));
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
        setStation({ stationId: '', stationName: '', activeStatus: '' });
        setSearchId('');
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
        if (!keepActiveButton) {
            setActiveButton(null);
        }
    };

    useEffect(() => {
        const updateTransition = (id, show) => {
            const element = document.getElementById(id);
            if (element) {
                if (show) {
                    element.style.maxHeight = element.scrollHeight + 'px';
                    element.classList.add('show');
                } else {
                    element.style.maxHeight = '0';
                    element.classList.remove('show');
                }
            }
        };
        updateTransition('station-form-container', showAddForm);
        updateTransition('update-station-search', showUpdateForm);
        updateTransition('delete-station-search', showDeleteForm);
    }, [showAddForm, showUpdateForm, showDeleteForm]);

    const handleAddStation = () => {
        resetForm(true);
        setActiveButton('add');
        setShowAddForm(true);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
    };

    const handleUpdateStation = () => {
        resetForm(true);
        setActiveButton('update');
        setShowAddForm(false);
        setShowUpdateForm(true);
        setShowDeleteForm(false);
    };

    const handleDeleteStation = () => {
        resetForm(true);
        setActiveButton('delete');
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(true);
    };
    
    const resetFormHandler = () => {
        resetForm(false);
        setTimeout(() => {
            setShowAddForm(false);
            setShowUpdateForm(false);
            setShowDeleteForm(false);
            console.log('Logging!');
        }, 1000); // Allow transition to complete
    };  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStation({ ...station, [name]: value });
    };

    const deleteSearchStation = () => {
        var searchValue = searchId.toLowerCase();
        var foundStation = stations.find(station => station.stationId.toLowerCase() === searchValue || station.stationName.toLowerCase() === searchValue);
        if (foundStation) {
            if (window.confirm('Are you sure you want to delete this station with ID/Name: ' + searchValue + '?')) {
                deleteStation(foundStation.id);
            }
        } else {
            alert("Station not found");
        }
    };

    const deleteStation = (id) => {
        fetch(`http://localhost:8080/api/stations/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert('Station deleted successfully');
                    setStations(stations.filter(st => st.id !== id));
                } else {
                    alert('Failed to delete station');
                }
            })
            .then(data => {
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while deleting the station');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = showAddForm ? 'http://localhost:8080/api/stations' : `http://localhost:8080/api/stations/${station.id}`;
        const method = showAddForm ? 'POST' : 'PUT';
    
        console.log('Submitting station:', station);
        console.log('URL:', url);
        console.log('Method:', method);
    
        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(station),
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
                // console.log('Received data:', data);
                // if (showAddForm) {
                //     setStations([...stations, data]);
                // } else {
                //     // Properly update the station in the list
                //     const updatedStations = stations.map(st =>
                //         st.id === data.id ? data : st
                //     );
                //     setStations(updatedStations);
                // }
                // resetForm();
            })
            .catch(error => console.error('Error:', error));
    };

    const updateForm = (stationData) => {
        console.log('Found station:', stationData);
        setStation(stationData);
        document.getElementById("form-heading").innerText = "Edit Station";
        document.getElementById("submit-button").innerText = "Update Station";
        setShowAddForm(true);
    };
    
    const handleSearch = () => {
        if (isNaN(searchId)) {
            searchStationByName();
        } else {
            fetch(`http://localhost:8080/api/stations/stationId/${searchId}`)
                .then(response => {
                    console.log('Response status:', response.status);
                    if (!response.ok) {
                        throw new Error('Station not found!');
                    }
                    return response.json();
                })
                .then(data => updateForm(data))
                .catch(error => {
                    console.error('Error fetching station:', error);
                    alert('Station not found!!');
                });
        }
    };
    
    const searchStationByName = () => {
        var searchValue = searchId.toLowerCase();
        var foundStation = stations.find(station =>
            station.stationId.toLowerCase() === searchValue || station.stationName.toLowerCase() === searchValue
        );
        if (foundStation) {
            updateForm(foundStation);
        } else {
            alert("Station not found!!!");
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
            <Helmet> <title>Stations - ConVox</title> </Helmet>
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
            <div id="main-content" className="p-5 text-2xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 col-span-1 col-start-2 row-span-1">
            <div className="button-container text-center my-4">
                <button className={`action-button top ${activeButton === 'add' ? 'active' : ''}`} onClick={handleAddStation}>
                    <i className="fa fa-plus"></i> Add Station  
                </button>
                <button className={`action-button top ${activeButton === 'update' ? 'active' : ''}`} onClick={handleUpdateStation}>
                    <i className="fa fa-edit"></i> Update Station  
                </button>
                <button className={`action-button top ${activeButton === 'delete' ? 'active' : ''}`} onClick={handleDeleteStation}>
                    <i className="fa fa-trash"></i> Delete Station  
                </button>
            </div>
                <div id="update-station-search" className={`transition-element ${showUpdateForm ? 'show' : ''}`} style={{ display: showUpdateForm ? 'block' : 'none', textAlign: 'center' }}>
                    <h3>Search Station to Update</h3>
                    <input type="text" id="search-station-id" placeholder="Enter Station ID or Name" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <button className="action-button" onClick={handleSearch}>Search</button>
                    <button type="button" className="reset-button1" onClick={resetFormHandler}>Cancel</button>
                </div>
                <div id="delete-station-search" className={`transition-element ${showDeleteForm ? 'show' : ''}`} style={{ display: showDeleteForm ? 'block' : 'none', textAlign: 'center' }}>
                    <h3>Search Station to Delete</h3>
                    <input type="text" id="delete-search-station-id" placeholder="Enter Station ID or Name" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <button className="action-button" onClick={deleteSearchStation}>Search</button>
                    <button type="button" className="reset-button1" onClick={resetFormHandler}>Cancel</button>
                </div>
                <div id="station-form-container" className={`transition-element ${showAddForm ? 'show' : ''}`} style={{ display: showAddForm ? 'block' : 'none', margin: 'auto', width: '60%' }}>
                    <form className="station-form" id="station-form" method="post" onSubmit={handleSubmit}>
                        <h2 id="form-heading" style={{ textAlign: 'center' }}>Station Registration</h2>
                        <div className="form-group">
                            <label htmlFor="station-id">Station ID:</label>
                            <input id="station-id" name="stationId" required type="text" value={station.stationId} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="station-name">Station Name:</label>
                            <input id="station-name" name="stationName" required type="text" value={station.stationName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="active-status">Status:</label>
                            <select id="active-status" name="activeStatus" required value={station.activeStatus} onChange={handleChange}>
                                <option disabled value="">Select a status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <button className="submit-button" id="submit-button" type="submit">Submit</button>
                        <button type="button" className="reset-button" onClick={resetFormHandler}>Cancel</button>
                    </form>
                </div>
                <h1 style={{ textAlign: 'center', marginTop: '40px', marginBottom: '10px', fontSize: '35px'}}>Station List</h1>
                <table className="station-table" style={{ textAlign: 'center', margin: 'auto', width: '90%' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#04aa6d', color: '#fff' }}>
                            <th style={{ padding: '10px' }}>Reg. ID</th>
                            <th style={{ padding: '10px' }}>Station ID</th>
                            <th style={{ padding: '10px' }}>Station Name</th>
                            <th style={{ padding: '10px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations.map((station, index) => (
                            <tr key={index} style={{
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9',
                                    padding: '10px', cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1e7dd'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#e9e9e9'}
                            >  
                                <td style={{ padding: '10px' }}>{station.id}</td>
                                <td style={{ padding: '10px' }}>{station.stationId}</td>
                                <td style={{ padding: '10px' }}>{station.stationName}</td>
                                <td style={{ padding: '10px' }}>{station.activeStatus}</td>
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

export default Stations;