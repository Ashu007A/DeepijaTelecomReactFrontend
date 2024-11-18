import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/ConVox/logo_convox_dashboard.png';

const Stations = () => {
    const [stations, setStations] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [station, setStation] = useState({ stationId: '', stationName: '', activeStatus: '' });

    const navigate = useNavigate();
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

    const toggleSidebar = () => {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.classList.toggle("collapsed");
            document.getElementById("main-content").classList.toggle("expanded");
        }
    };

    const toggleSection = (e) => {
        const section = e.currentTarget.nextSibling;
        const toggleIcon = e.currentTarget.querySelector('.toggle-icon');
        const allSections = document.querySelectorAll('.menu-links');
        const allIcons = document.querySelectorAll('.menu-section .toggle-icon');

        // Hide all sections and reset all icons
        allSections.forEach(sec => {
            if (sec !== section) {
                sec.style.display = "none";
            }
        });

        allIcons.forEach(icon => {
            if (icon !== toggleIcon) {
                icon.classList.remove('fa-caret-down');
                icon.classList.add('fa-caret-right');
            }
        });

        if (section.style.display === "block") {
            section.style.display = "none";
            toggleIcon.classList.remove('fa-caret-down');
            toggleIcon.classList.add('fa-caret-right');
        } else {
            section.style.display = "block";
            toggleIcon.classList.remove('fa-caret-right');
            toggleIcon.classList.add('fa-caret-down');
        }
    };

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
            fetch('http://localhost:8080/api/logout')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to log out');
                    }
                    clearInterval(intervalId);
                    navigate('/convox/login');
                })
                .catch(error => {
                    console.error('Logout error:', error);
                    alert('Failed to log out');
                });
        }
    };

    const handleAddStation = () => {
        resetForm();
        setShowAddForm(true);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
    };

    const handleUpdateStation = () => {
        setShowAddForm(false);
        setShowUpdateForm(true);
        setShowDeleteForm(false);
    };

    const handleDeleteStation = () => {
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStation({ ...station, [name]: value });
    };

    const resetForm = () => {
        setStation({ stationId: '', stationName: '', activeStatus: '' });
        setSearchId('');
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
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
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while deleting the station');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/stations', {
            method: showAddForm ? 'POST' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(station),
        })
            .then(response => response.json())
            .then(data => {
                if (showAddForm) {
                    setStations([...stations, data]);
                } else {
                    setStations(stations.map(st => st.id === data.id ? data : st));
                }
                resetForm();
            })
            .catch(error => console.error('Error:', error));
    };

    const handleSearch = () => {
        searchStation();
        fetch(`http://localhost:8080/api/stations/stationId/${searchId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Station not found');
                }
                return response.json();
            })
            .then(data => setStation(data))
            .catch(error => {
                console.error('Error fetching station:', error);
                alert('Station not found');
            });
    };
    
    const searchStation = () => {
        var searchValue = searchId.toLowerCase();
        var foundStation = stations.find(station =>
            station.stationId.toLowerCase() === searchValue || station.stationName.toLowerCase() === searchValue
        );
        if (foundStation) {
            setStation(foundStation);
            document.getElementById("form-heading").innerText = "Edit Station";
            document.getElementById("submit-button").innerText = "Update Station";
            setShowAddForm(true);
        } else {
            alert("Station not found");
        }
    };    

    const handleDelete = () => {
        fetch(`http://localhost:8080/api/stations/${searchId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setStations(stations.filter(st => st.id !== parseInt(searchId)));
                resetForm();
            })
            .catch(error => console.error('Error deleting station:', error));
    };

    return (
        <div className="grid min-h-screen grid-cols-[auto,1fr] grid-rows-[auto,1fr,auto]">
            <Helmet> <title>Dashboard - ConVox</title> </Helmet>
            <div id="sidebar" className="sidebar bg-cyan-200 py-7 px-2 h-full overflow-y-auto transition-all duration-300 col-span-1 row-span-3">
                <a href="#" className="toggle-btn text-grey-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={toggleSidebar}>
                    <i className="fas fa-bars"></i>
                </a>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-chart-line font-icon pr-2"></i>
                        <span> Live Status</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=Process Status" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-cogs pr-2"></i>
                            <span>Process Status</span>
                        </a>
                        <a href="?user_sel_menu=Trunk Status" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-network-wired pr-2"></i>
                            <span>Trunk Status</span>
                        </a>
                        <a href="?user_sel_menu=Queues Status" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-stream pr-2"></i>
                            <span>Queues Status</span>
                        </a>
                        <a href="RealTimeDashBoard/" target="_blank" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-chart-line pr-2"></i>
                            <span>Dash Board</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-tools font-icon pr-2"></i>
                        <span>Debug Tools</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=ConVox Web Panel" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-tools pr-2"></i>
                            <span>ConVox Web Panel</span>
                        </a>
                        <a href="?user_sel_menu=Database Status" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-database pr-2"></i>
                            <span>Database Status</span>
                        </a>
                        <a href="?user_sel_menu=ConVox Screens" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-tv pr-2"></i>
                            <span>ConVox Screens</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-cogs font-icon pr-2"></i>
                        <span>System Config</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="/convox/servers" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-server pr-2"></i>
                            <span>Servers</span>
                        </a>
                        <a href="/convox/web-servers" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-globe pr-2"></i>
                            <span>Web Servers</span>
                        </a>
                        <a href="/convox/stations" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-network-wired pr-2"></i>
                            <span>Stations</span>
                        </a>
                        <a href="/convox/internal-stations" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-sitemap pr-2"></i>
                            <span>Internal Stations</span>
                        </a>
                        <a href="/convox/lock-out-release" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-unlock-alt pr-2"></i>
                            <span>Lock Out Release</span>
                        </a>
                        <a href="/convox/lockout-settings" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-cog pr-2"></i>
                            <span>Lockout Settings</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-route font-icon pr-2"></i>
                        <span>Call Routing</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=Inbound Routes" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-sign-in-alt pr-2"></i>
                            <span>Inbound Routes</span>
                        </a>
                        <a href="?user_sel_menu=Outbound Trunks" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-sign-out-alt pr-2"></i>
                            <span>Outbound Trunks</span>
                        </a>
                        <a href="?user_sel_menu=Outbound Routes" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-route pr-2"></i>
                            <span>Outbound Routes</span>
                        </a>
                        <a href="?user_sel_menu=Callforward Routes" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-forward pr-2"></i>
                            <span>Callforward Routes</span>
                        </a>
                        <a href="?user_sel_menu=Hot Transfer Routes" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-random pr-2"></i>
                            <span>Hot Transfer Routes</span>
                        </a>
                        <a href="?user_sel_menu=Service Providers" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-concierge-bell pr-2"></i>
                            <span>Service Providers</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-stream font-icon pr-2"></i>
                        <span>ACD and Queue</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=Users" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-users pr-2"></i>
                            <span>Users</span>
                        </a>
                        <a href="?user_sel_menu=Process" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-tasks pr-2"></i>
                            <span>Process</span>
                        </a>
                        <a href="?user_sel_menu=Queues" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-stream pr-2"></i>
                            <span>Queues</span>
                        </a>
                        <a href="?user_sel_menu=Breaks" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-coffee pr-2"></i>
                            <span>Breaks</span>
                        </a>
                        <a href="?user_sel_menu=Dispositions" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-clipboard-list pr-2"></i>
                            <span>Dispositions</span>
                        </a>
                        <a href="?user_sel_menu=Sub Disposition" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-clipboard-check pr-2"></i>
                            <span>Sub Disposition</span>
                        </a>
                        <a href="?user_sel_menu=Sub-Sub Disposition" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-clipboard pr-2"></i>
                            <span>Sub-Sub Disposition</span>
                        </a>
                        <a href="?user_sel_menu=Lead Re-Attempts" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-redo-alt pr-2"></i>
                            <span>Lead Re-Attempts</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-address-book font-icon pr-2"></i>
                        <span>CRM</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=CRM" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-address-book pr-2"></i>
                            <span>CRM</span>
                        </a>
                        <a href="?user_sel_menu=Lists" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-list pr-2"></i>
                            <span>Lists</span>
                        </a>
                        <a href="?user_sel_menu=Callback Assignments" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-phone-alt pr-2"></i>
                            <span>Callback Assignments</span>
                        </a>
                        <a href="?user_sel_menu=Scripts" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-file-alt pr-2"></i>
                            <span>Scripts</span>
                        </a>
                        <a href="?user_sel_menu=Block Caller" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-ban pr-2"></i>
                            <span>Block Caller</span>
                        </a>
                        <a href="?user_sel_menu=Custom Missed Settings" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-cogs pr-2"></i>
                            <span>Custom Missed Settings</span>
                        </a>
                        <a href="?user_sel_menu=Auto Email Settings" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-envelope pr-2"></i>
                            <span>Auto Email Settings</span>
                        </a>
                        <a href="?user_sel_menu=IvrCallback Lead Settings" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-headset pr-2"></i>
                            <span>IvrCallback Lead Settings</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-voicemail font-icon pr-2"></i>
                        <span>IVR</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=Audio Files" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-music pr-2"></i>
                            <span>Audio Files</span>
                        </a>
                        <a href="?user_sel_menu=Recording Studio" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-microphone pr-2"></i>
                            <span>Recording Studio</span>
                        </a>
                        <a href="?user_sel_menu=IVRS" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-voicemail pr-2"></i>
                            <span>IVRS</span>
                        </a>
                        <a href="?user_sel_menu=Customer Feedback" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-comments pr-2"></i>
                            <span>Customer Feedback</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-comments font-icon pr-2"></i>
                        <span>WhatsApp</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="https://h248.deepijatel.in/ConVoxCMC/Internal/login_sso?agent_id=admin&password=admin" target="_blank" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-comments pr-2"></i>
                            <span>WhatsApp Admin</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-star font-icon pr-2"></i>
                        <span>Quality Module</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=QualityModule" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-star pr-2"></i>
                            <span>Quality Module</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-user-check font-icon pr-2"></i>
                        <span>Agent Analysis</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=Agent Login Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-sign-in-alt pr-2"></i>
                            <span>Agent Login Report</span>
                        </a>
                        <a href="?user_sel_menu=Agent Performance Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-chart-line pr-2"></i>
                            <span>Agent Performance Report</span>
                        </a>
                        <a href="?user_sel_menu=Agent Disposition Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-user-tag pr-2"></i>
                            <span>Agent Disposition Report</span>
                        </a>
                        <a href="?user_sel_menu=Queue Performance Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-tasks pr-2"></i>
                            <span>Queue Performance Report</span>
                        </a>
                        <a href="?user_sel_menu=Leads Summary Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-list-ul pr-2"></i>
                            <span>Leads Summary Report</span>
                        </a>
                        <a href="?user_sel_menu=Agent Lockout Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-lock pr-2"></i>
                            <span>Agent Lockout Report</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-chart-pie font-icon pr-2"></i>
                        <span>Process Analysis</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=Process Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-chart-pie pr-2"></i>
                            <span>Process Report</span>
                        </a>
                        <a href="?user_sel_menu=Predictive Outbound Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-chart-bar pr-2"></i>
                            <span>Predictive Outbound Report</span>
                        </a>
                        <a href="?user_sel_menu=Preview Outbound Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-chart-area pr-2"></i>
                            <span>Preview Outbound Report</span>
                        </a>
                        <a href="?user_sel_menu=Progressive Outbound Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-chart-line pr-2"></i>
                            <span>Progressive Outbound Report</span>
                        </a>
                        <a href="?user_sel_menu=Call Recording Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-microphone-alt pr-2"></i>
                            <span>Call Recording Report</span>
                        </a>
                        <a href="?user_sel_menu=DNC Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-ban pr-2"></i>
                            <span>DNC Report</span>
                        </a>
                        <a href="?user_sel_menu=CDR Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-file-alt pr-2"></i>
                            <span>CDR Report</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-phone font-icon pr-2"></i>
                        <span>Call Traffic Analysis</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=Call Hits" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-phone pr-2"></i>
                            <span>Call Hits</span>
                        </a>
                        <a href="?user_sel_menu=FollowUp Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-file-alt pr-2"></i>
                            <span>FollowUp Report</span>
                        </a>
                    </div>
                </div>
                <div className="menu-section">
                    <h3 className="flex items-center cursor-pointer" onClick={toggleSection}>
                        <i className="fas fa-users font-icon pr-2"></i>
                        <span>Conference Analysis</span>
                        <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                    </h3>
                    <div className="menu-links hidden">
                        <a href="?user_sel_menu=Conference Report" className="block px-4 py-2 text-base hover:bg-gray-700 hover:text-white">
                            <i className="fas fa-users pr-2"></i>
                            <span>Conference Report</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="header flex justify-between items-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-4 col-span-1 col-start-2 row-span-1">
                <img src={logo} alt="Convox Logo Dashboard" className="h-16 w-auto object-contain ml-8" />
                <div className="server-time flex items-center">
                    <i className="fa-solid fa-server mr-2"></i>
                    <i className="fa-regular fa-clock mr-2"></i>
                    <span id="server-time-text"></span>
                </div>
                <div className="flex space-x-4">
                    <a href="/dashboard" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Dashboard</a>
                    <a href="" onClick={confirmLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</a>
                </div>
            </div>
            <div id="main-content" className="p-10 text-2xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 col-span-1 col-start-2 row-span-1">
                <div className="button-container text-center my-4">
                    <button className="action-button top" onClick={handleAddStation}>
                        <i className="fa fa-plus"></i> Add Station  
                    </button>
                    <button className="action-button top" onClick={handleUpdateStation}>
                        <i className="fa fa-edit"></i> Update Station  
                    </button>
                    <button className="action-button top" onClick={handleDeleteStation}>
                        <i className="fa fa-trash"></i> Delete Station  
                    </button>
                </div>
                <div id="update-station-search" style={{ display: showUpdateForm ? 'block' : 'none', textAlign: 'center' }}>
                    <h3>Search Station to Update</h3>
                    <input type="text" id="search-station-id" placeholder="Enter Station ID or Name" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <button className="action-button" onClick={handleSearch}>Search</button>
                    <button type="button" className="reset-button1" onClick={resetForm}>Cancel</button>
                </div>
                <div id="delete-station-search" style={{ display: showDeleteForm ? 'block' : 'none', textAlign: 'center' }}>
                    <h3>Search Station to Delete</h3>
                    <input type="text" id="delete-search-station-id" placeholder="Enter Station ID or Name" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <button className="action-button" onClick={deleteSearchStation}>Search</button>
                    <button type="button" className="reset-button1" onClick={resetForm}>Cancel</button>
                </div>
                <div id="station-form-container" style={{ display: showAddForm ? 'block' : 'none', margin: 'auto', width: '80%' }}>
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
                        <button type="button" className="reset-button" onClick={resetForm}>Cancel</button>
                    </form>
                </div>
                <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Station List</h2>
                <table className="station-table" style={{ textAlign: 'center', margin: 'auto', width: '90%' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#0171ba', color: '#fff' }}>
                            <th style={{ padding: '10px' }}>Reg. ID</th>
                            <th style={{ padding: '10px' }}>Station ID</th>
                            <th style={{ padding: '10px' }}>Station Name</th>
                            <th style={{ padding: '10px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations.map((station, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9' }}>
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