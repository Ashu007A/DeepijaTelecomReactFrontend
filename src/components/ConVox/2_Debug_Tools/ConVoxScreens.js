// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import Sidebar from '../Sidebar';
// import logo from '../../../assets/images/ConVox/logo_convox_dashboard.png';

// const ConVoxScreen = () => {
//     const [serverIp, setServerIp] = useState('172.16.13.29');
//     const [databaseName, setDatabaseName] = useState('select');
//     const [tableName, setTableName] = useState('');
//     const [response, setResponse] = useState('');
    
//     let intervalId;

//     useEffect(() => {
//         updateTime();
//         const interval = setInterval(updateTime, 1000);
//         return () => clearInterval(interval);
//     }, []);

//     const updateTime = () => {
//         const now = new Date();
//         const formattedTime = now.toLocaleDateString('en-GB', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric'
//         }) + ' ' + now.toLocaleTimeString('en-GB', {
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit'
//         });

//         const serverTimeElement = document.getElementById('server-time-text');
//         if (serverTimeElement) {
//             serverTimeElement.textContent = 'Server time - ' + formattedTime;
//         }
//     };

//     const confirmLogout = (event) => {
//         event.preventDefault();
//         const userConfirmed = window.confirm("Are you sure you want to log out?");
//         if (userConfirmed) {
//             const token = localStorage.getItem('jwt');
//             fetch('http://localhost:8080/api/logout', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Failed to log out');
//                     }
    
//                     // Clear cache and manipulate history
//                     window.localStorage.clear();
//                     window.sessionStorage.clear();
    
//                     // Replace current URL with the login URL
//                     window.location.replace('/convox/login');
                    
//                     // Alternatively use pushState to manipulate history
//                     window.history.pushState(null, null, '/convox/login');
    
//                     // Clear intervals
//                     clearInterval(intervalId);
//                 })
//                 .catch(error => {
//                     console.error('Logout error:', error);
//                     alert('Failed to log out');
//                 });
//         }
//     };

//     return (
//         <div className="grid min-h-screen grid-cols-[auto,1fr] grid-rows-[auto,1fr,auto]">
//             <Helmet>
//                 <title>ConVox Screens - ConVox</title>
//             </Helmet>
//             <Sidebar />
//             <div className="header flex justify-between items-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-4 col-span-1 col-start-2 row-span-1">
//                 <img src={logo} alt="ConVox Logo Dashboard" className="h-16 w-auto object-contain ml-8" />
//                 <div className="server-time flex items-center">
//                     <i className="fa-solid fa-server mr-2"></i>
//                     <i className="fa-regular fa-clock mr-2"></i>
//                     <span id="server-time-text"></span>
//                 </div>
//                 <div className="flex space-x-4">
//                     <a href="/convox/dashboard" className="bg-green-500 hover:bg-green-700 hover:-translate-y-0.5 text-white font-bold py-2 px-4 rounded">Dashboard</a>
//                     <a href="" onClick={confirmLogout} className="bg-red-500 hover:bg-red-700 hover:-translate-y-0.5 text-white font-bold py-2 px-4 rounded">Logout</a>
//                 </div>
//             </div>
//             <div id="main-content" className="p-5 text-2xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 col-span-1 col-start-2 row-span-1">
//                 <h1 className="text-center text-3xl font-bold">ConVox Screens</h1>
//                 {/* Content goes here */}
//             </div>

            

//             <div className="footer text-gray-500 text-center py-2 col-span-1 col-start-2 row-span-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
//                 Powered by Deepija Telecom Pvt Ltd &copy; 2024 All Rights Reserved.
//             </div>
//         </div>
//     );
// };

// export default ConVoxScreen;













import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../Sidebar';
import logo from '../../../assets/images/ConVox/logo_convox_dashboard.png';

const ConVoxScreen = () => {
    const [serverIp, setServerIp] = useState('172.21.22.163');
    const [screens, setScreens] = useState([
        { name: 'convox-listen', id: 1685, inbound: true, manualOutbound: true, predictive: true, preview: true, progressive: true, status: 'Running' },
        { name: 'convox-manager-spon-send', id: 1858, inbound: true, manualOutbound: true, predictive: true, preview: true, progressive: true, status: 'Running' },
        { name: 'convox-spon', id: 1709, inbound: false, manualOutbound: false, predictive: true, preview: false, progressive: false, status: 'Running' },
        { name: 'convox-preview', id: 1633, inbound: false, manualOutbound: false, predictive: false, preview: true, progressive: false, status: 'Running' },
        { name: 'convox-progressive', id: 1742, inbound: false, manualOutbound: false, predictive: false, preview: false, progressive: true, status: 'Running' },
        { name: 'convox-leads-reattempt', id: 1790, inbound: false, manualOutbound: false, predictive: true, preview: false, progressive: false, status: 'Running' },
        { name: 'convox-move-buffer-logs', id: 1833, inbound: true, manualOutbound: true, predictive: true, preview: true, progressive: true, status: 'Running' },
        { name: 'convox-clear-calls', id: 1764, inbound: true, manualOutbound: true, predictive: true, preview: true, progressive: true, status: 'Running' },
        { name: 'convox-reattempt-progressive-leads', id: 1640, inbound: false, manualOutbound: false, predictive: false, preview: false, progressive: true, status: 'Running' },
        { name: 'convox_leads_load_spon', id: 1703, inbound: false, manualOutbound: false, predictive: false, preview: false, progressive: false, status: 'Running' },
        { name: 'convox_dnc_load_spon', id: 1648, inbound: false, manualOutbound: false, predictive: false, preview: false, progressive: false, status: 'Stopped' },
        { name: 'convox_web_leads_load_spon', id: 1722, inbound: false, manualOutbound: false, predictive: false, preview: false, progressive: false, status: 'Running' },
        { name: 'convox_web_dnc_load_spon', id: 1802, inbound: false, manualOutbound: false, predictive: false, preview: false, progressive: false, status: 'Running' },
        { name: 'convox_upload_leads_spon', id: 1843, inbound: false, manualOutbound: false, predictive: false, preview: false, progressive: false, status: 'Running' },
        { name: 'convox_whatsapp_user_apis', id: 1818, inbound: false, manualOutbound: false, predictive: false, preview: false, progressive: false, status: 'Running' },
        { name: 'convox_email_user_apis', id: 1626, inbound: false, manualOutbound: false, predictive: false, preview: false, progressive: false, status: 'Running' },
        { name: 'convox-call-status-spon', id: 1827, inbound: false, manualOutbound: false, predictive: true, preview: true, progressive: false, status: 'Running' }
    ]);

    useEffect(() => {
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
    
                    window.localStorage.clear();
                    window.sessionStorage.clear();
    
                    window.location.replace('/convox/login');
                    
                    window.history.pushState(null, null, '/convox/login');
                })
                .catch(error => {
                    console.error('Logout error:', error);
                    alert('Failed to log out');
                });
        }
    };

    const refreshScreens = () => {
        // Logic to refresh the screens data
        setScreens([ ...screens.map(screen => ({ ...screen, status: Math.random() > 0.5 ? 'Running' : 'Stopped' })) ]);
    };

    return (
        <div className="grid min-h-screen grid-cols-[auto,1fr] grid-rows-[auto,1fr,auto]">
            <Helmet>
                <title>ConVox Screens - ConVox</title>
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
                <h1 className="text-center text-3xl font-bold">ConVox Screens</h1>
                <div className="my-4">
                    <div className="flex justify-between items-center">
                        <p className="font-bold mt-2 ">DB & Voice Server: {serverIp}</p>
                        <button
                            onClick={refreshScreens}
                            className="bg-blue-500 hover:bg-blue-700 hover:-translate-y-0.5 text-white font-bold py-2 px-4 rounded"
                        >
                            Refresh Screens
                        </button>
                    </div>
                    
                </div>
                <div className="overflow-x-auto mt-4">
                    <table style={{ textAlign: 'center', margin: 'auto', width: '99.99%' }}>
                        <thead className="bg-gray-100">
                            <tr style={{ backgroundColor: '#04aa6d', color: '#fff' }}>
                                <th className="py-2 px-4 border-b">Screen</th>
                                <th className="py-2 px-4 border-b">Inbound</th>
                                <th className="py-2 px-4 border-b">Manual Outbound</th>
                                <th className="py-2 px-4 border-b">Predictive</th>
                                <th className="py-2 px-4 border-b">Preview</th>
                                <th className="py-2 px-4 border-b">Progressive</th>
                                <th className="py-2 px-4 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {screens.map((screen, index) => (
                                <tr key={index} style={{
                                        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9',
                                        padding: '10px', cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1e7dd'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#e9e9e9'}
                                >
                                    <td className="py-2 px-4">{screen.name} ({screen.id})</td>
                                    <td className="py-2 px-4">
                                        {screen.inbound ? (
                                            <i className="fas fa-check" title="required" style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className="fas fa-minus" title="not required"></i>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {screen.manualOutbound ? (
                                            <i className="fas fa-check" title="required" style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className="fas fa-minus" title="not required"></i>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {screen.predictive ? (
                                            <i className="fas fa-check" title="required" style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className="fas fa-minus" title="not required"></i>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {screen.preview ? (
                                            <i className="fas fa-check" title="required" style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className="fas fa-minus" title="not required"></i>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {screen.progressive ? (
                                            <i className="fas fa-check" title="required" style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className="fas fa-minus" title="not required"></i>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {screen.status === 'Running' ? (
                                            <>
                                                <i className="fas fa-stop" style={{ verticalAlign: 'middle', color: 'red' }} title="Running"></i>
                                                &nbsp;&nbsp;&nbsp;Running
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-play" style={{ verticalAlign: 'middle', color: 'green' }} title="Stopped"></i>
                                                &nbsp;&nbsp;&nbsp;Stopped
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
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

export default ConVoxScreen;