// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import Sidebar from '../Sidebar';
// import logo from '../../../assets/images/ConVox/logo_convox_dashboard.png';

// const ProcessStatus = () => {
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
//                 <title>Process Status - ConVox</title>
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
//             <div id="main-content" className="p-5 text-4xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 col-span-1 col-start-2 row-span-1">
//                 <h1 className="text-center mb-4">Process Status</h1>
//                 {/* Content goes here */}
//             </div>
//             <div className="footer text-gray-500 text-center py-2 col-span-1 col-start-2 row-span-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
//                 Powered by Deepija Telecom Pvt Ltd &copy; 2024 All Rights Reserved.
//             </div>
//         </div>
//     );
// };

// export default ProcessStatus;
















import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../Sidebar';
import logo from '../../../assets/images/ConVox/logo_convox_dashboard.png';

const ProcessStatus = () => {
    const [serverTime, setServerTime] = useState('');
    const [statuses, setStatuses] = useState({
        totalAgents: 0,
        notLogin: 0,
        login: 0,
        idle: 0,
        break: 0,
        firstLogin: 0,
        outbound: 0,
        ringing: 0,
        dialing: 0,
        onCall: 0,
        mute: 0,
        hold: 0,
        conference: 0,
        wrapUp: 0,
        missed: 0,
        callBacks: 0,
        preview: 0
    });

    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        const statusInterval = setInterval(updateStatuses, 5000);
        return () => {
            clearInterval(interval);
            clearInterval(statusInterval);
        };
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

        setServerTime(formattedTime);
    };

    const updateStatuses = () => {
        setStatuses({
            totalAgents: Math.floor(Math.random() * 100),
            notLogin: Math.floor(Math.random() * 20),
            login: Math.floor(Math.random() * 80),
            idle: Math.floor(Math.random() * 30),
            break: Math.floor(Math.random() * 20),
            firstLogin: Math.floor(Math.random() * 20),
            outbound: Math.floor(Math.random() * 20),
            ringing: Math.floor(Math.random() * 20),
            dialing: Math.floor(Math.random() * 20),
            onCall: Math.floor(Math.random() * 40),
            mute: Math.floor(Math.random() * 10),
            hold: Math.floor(Math.random() * 10),
            conference: Math.floor(Math.random() * 10),
            wrapUp: Math.floor(Math.random() * 20),
            missed: Math.floor(Math.random() * 10),
            callBacks: Math.floor(Math.random() * 10),
            preview: Math.floor(Math.random() * 10)
        });
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
                <title>Process Status - ConVox</title>
            </Helmet>
            <Sidebar />
            <div className="header flex justify-between items-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-4 col-span-1 col-start-2 row-span-1">
                <img src={logo} alt="ConVox Logo Dashboard" className="h-16 w-auto object-contain ml-8" />
                <div className="server-time flex items-center">
                    <i className="fa-solid fa-server mr-2"></i>
                    <i className="fa-regular fa-clock mr-2"></i>
                    <span>Server Time - {serverTime}</span>
                </div>
                <div className="flex space-x-4">
                    <a href="/convox/dashboard" className="bg-green-500 hover:bg-green-700 hover:-translate-y-0.5 text-white font-bold py-2 px-4 rounded">Dashboard</a>
                    <a href="" onClick={confirmLogout} className="bg-red-500 hover:bg-red-700 hover:-translate-y-0.5 text-white font-bold py-2 px-4 rounded">Logout</a>
                </div>
            </div>
            <div id="main-content" className="p-5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 col-span-1 col-start-2 row-span-1">
                <div className="mb-4">
                    <h1 className="text-center text-3xl font-bold">Process Status</h1>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 text-center">
                    {/* Division 1 */}
                    <div className="p-4 bg-gradient-to-r from-red-300 to-red-500 text-white rounded shadow-lg">
                        <h2 className="text-lg font-bold">Total Agents</h2>
                        <p className="text-4xl font-bold">{statuses.totalAgents}</p>
                    </div>
                    {/* Division 2 */}
                    <div className="p-4 bg-gradient-to-r from-green-300 to-green-500 text-white rounded shadow-lg">
                        <h2 className="text-lg font-bold">Login Status</h2>
                        <br></br>
                        <div className="icon-circle">
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-semibold">Not-Login</p>
                                <p className="text-4xl font-bold">{statuses.notLogin}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Login</p>
                                <p className="text-4xl font-bold">{statuses.login}</p>
                            </div>
                        </div>
                    </div>
                    {/* Division 3 */}
                    <div className="p-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-white rounded shadow-lg">
                        <h2 className="text-lg font-bold">Idle</h2>
                        <p className="text-4xl font-bold">{statuses.idle}</p>
                        <div className="icon-circle">
                            <i className="fa fa-clock"></i>
                        </div>
                    </div>
                    {/* Division 4 */}
                    <div className="p-4 bg-gradient-to-r from-purple-300 to-purple-500 text-white rounded shadow-lg">
                        <h2 className="text-lg font-bold">Break</h2>
                        <p className="text-4xl font-bold">{statuses.break}</p>
                        <div className="icon-circle">
                            <i className="fa fa-coffee"></i>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">{statuses.firstLogin}</p>
                            <p className="font-semibold">First-Login</p>
                        </div>
                    </div>
                    {/* Division 5 */}
                    <div className="p-4 bg-gradient-to-r from-blue-300 to-blue-500 text-white rounded shadow-lg">
                        <h2 className="text-lg font-bold">Outbound</h2>
                        <p className="text-4xl font-bold">{statuses.outbound}</p>
                        <div className="icon-circle">
                            <i className="fa fa-phone"></i>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-4xl font-bold">{statuses.ringing}</p>
                                <p className="font-semibold">Ringing</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold">{statuses.dialing}</p>
                                <p className="font-semibold">Dialing</p>
                            </div>
                        </div>
                    </div>
                    {/* Division 6 */}
                    <div className="p-4 bg-gradient-to-r from-teal-300 to-teal-500 text-white rounded shadow-lg">
                        <h2 className="text-lg font-bold">On-Call</h2>
                        <p className="text-4xl font-bold">{statuses.onCall}</p>
                        <div className="icon-circle">
                            <i className="fa fa-headset"></i>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-4xl font-bold">{statuses.mute}</p>
                                <p className="font-semibold">Mute</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold">{statuses.hold}</p>
                                <p className="font-semibold">Hold</p>
                            </div>
                        </div>
                    </div>
                    {/* Division 7 */}
                    <div className="p-4 bg-gradient-to-r from-indigo-300 to-indigo-500 text-white rounded shadow-lg">
                        <h2 className="text-lg font-bold">Conference</h2>
                        <p className="text-4xl font-bold">{statuses.conference}</p>
                        <div className="icon-circle">
                            <i className="fa fa-users"></i>
                        </div>
                    </div>
                    {/* Division 8 */}
                    <div className="p-4 bg-gradient-to-r from-pink-300 to-pink-500 text-white rounded shadow-lg">
                        <h2 className="text-lg font-bold">Wrap-up</h2>
                        <p className="text-4xl font-bold">{statuses.wrapUp}</p>
                        <div className="icon-circle">
                            <i className="fa-solid fa-phone-slash"></i>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-4xl font-bold">{statuses.missed}</p>
                                <p className="font-semibold">Missed</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold">{statuses.callBacks}</p>
                                <p className="font-semibold">Call-Backs</p>
                            </div>
                        </div>
                    </div>
                    {/* Division 9 */}
                    <div className="p-4 bg-gradient-to-r from-orange-300 to-orange-500 text-white rounded shadow-lg">
                        <h2 className="text-lg font-bold">Call-Backs</h2>
                        <p className="text-4xl font-bold">{statuses.callBacks}</p>
                        <div className="icon-circle">
                            <i className="fa fa-phone-volume"></i>
                        </div>
                    </div>
                    {/* Division 10 */}
                    <div className="p-4 bg-gradient-to-r from-cyan-300 to-cyan-500 text-white rounded shadow-lg">
                        <h2 className="text-lg font-bold">Preview</h2>
                        <p className="text-4xl font-bold">{statuses.preview}</p>
                        <div className="icon-circle">
                            <i className="fa fa-hand-pointer"></i>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-[3fr,1fr]">
                    <div className="table-responsive">
                        <div className="grid grid-cols-3 gap-2 items-center">
                            <input type="text" placeholder="Process Filter" className="p-2 rounded border" />
                            <input type="text" placeholder="Status Filter" className="p-2 rounded border" />
                            <input type="text" placeholder="Agent Filter" className="p-2 rounded border" />
                        </div>
                        <table className="table table-hover text-center w-full mt-4">
                            <thead>
                                <tr style={{ backgroundColor: '#04aa6d', color: '#fff' }}>
                                    <th style={{ padding: '10px' }}>Action</th>
                                    <th>AgentID</th>
                                    <th>Mode</th>
                                    <th>Status</th>
                                    <th>Duration</th>
                                    <th>Process</th>
                                    <th>Extension</th>
                                    <th>Phone No</th>
                                    <th>Queues</th>
                                    <th>Call IP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="10">No data available in table</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-gradient-to-r from-orange-300 to-orange-500 text-white rounded shadow-lg">
                            <h2 className="text-lg font-bold">Numbers Ringing</h2>
                            <p className="text-4xl font-bold">0</p>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover text-center w-full">
                                    <thead className="bg-orange-200">
                                        <tr>
                                            <th>Phone No</th>
                                            <th>Ip</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="2">NO RECORDS</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-green-300 to-green-500 text-white rounded shadow-lg">
                            <h2 className="text-lg font-bold">Waiting Calls</h2>
                            <p className="text-4xl font-bold">0</p>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover text-center w-full">
                                    <thead className="bg-green-200">
                                        <tr>
                                            <th>Phone</th>
                                            <th>Queues</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="2">NO RECORDS</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button className="bg-orange-500 hover:bg-orange-700 hover:-translate-y-0.5 text-white font-bold py-2 px-4 rounded">
                                Recent Calls
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 hover:-translate-y-0.5 text-white font-bold py-2 px-4 rounded">
                                Clear Buffer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer text-gray-500 text-center py-2 col-span-1 col-start-2 row-span-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                Powered by Deepija Telecom Pvt Ltd &copy; 2024 All Rights Reserved.
            </div>
        </div>
    );
};

export default ProcessStatus;