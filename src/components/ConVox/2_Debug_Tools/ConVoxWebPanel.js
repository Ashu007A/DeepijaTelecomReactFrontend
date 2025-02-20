// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import Sidebar from '../Sidebar';
// import logo from '../../../assets/images/ConVox/logo_convox_dashboard.png';

// const ConVoxWebPanel = () => {
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
//                 <title>ConVox Web Panel - ConVox</title>
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
//                 <h1 className="text-center text-3xl font-bold">ConVox Web Panel</h1>
//                 {/* Content goes here */}
//             </div>
//             <div className="footer text-gray-500 text-center py-2 col-span-1 col-start-2 row-span-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
//                 Powered by Deepija Telecom Pvt Ltd &copy; 2024 All Rights Reserved.
//             </div>
//         </div>
//     );
// };

// export default ConVoxWebPanel;
















// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import Sidebar from '../Sidebar';
// import logo from '../../../assets/images/ConVox/logo_convox_dashboard.png';

// const ConVoxWebPanel = () => {
//     const [serverIp, setServerIp] = useState('172.16.13.29');
//     const [serverStatus, setServerStatus] = useState({
//         asterisk: 'Loading...',
//         nginx: 'Loading...',
//         mysql: 'Loading...'
//     });
//     const [cpuValues, setCpuValues] = useState(Array(40).fill(0));
//     const [loadValues, setLoadValues] = useState(Array(40).fill(0));
//     const [ramValues, setRamValues] = useState(Array(10).fill(0));
//     const [swapValues, setSwapValues] = useState(Array(10).fill(0));
//     const [channelValues, setChannelValues] = useState(Array(10).fill(0));
//     const [callValues, setCallValues] = useState(Array(10).fill(0));
//     const [networkStatus, setNetworkStatus] = useState([
//         { iface: 'eth0', rxOk: 1000, rxErr: 0, txOk: 1200, txErr: 1, collisions: 0, rxDrp: 2, txDrp: 0 },
//         { iface: 'wlan0', rxOk: 2000, rxErr: 0, txOk: 2200, txErr: 0, collisions: 0, rxDrp: 1, txDrp: 1 }
//     ]);
    
//     let intervalId;

//     useEffect(() => {
//         updateTime();
//         const interval = setInterval(updateTime, 1000);
//         startMonitoring();
//         return () => {
//             clearInterval(interval);
//             clearTimeout(intervalId);
//         };
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

//     const startMonitoring = () => {
//         intervalId = setTimeout(() => {
//             fetchServerStatus();
//             updateMonitoringData();
//             startMonitoring();
//         }, 2000);
//     };

//     const fetchServerStatus = () => {
//         // Simulate fetching server status
//         setServerStatus({
//             asterisk: Math.random() > 0.5 ? 'Running' : 'Not Running',
//             nginx: Math.random() > 0.5 ? 'Running' : 'Not Running',
//             mysql: Math.random() > 0.5 ? 'Running' : 'Not Running'
//         });
//     };

//     const updateMonitoringData = () => {
//         const newCpuValue = Math.random() * 100;
//         const newLoadValue = Math.random() * 100;
//         const newRamValue = Math.random() * 100;
//         const newSwapValue = Math.random() * 100;
//         const newChannelValue = Math.random() * 100;
//         const newCallValue = Math.random() * 100;

//         setCpuValues(prev => [...prev.slice(1), newCpuValue]);
//         setLoadValues(prev => [...prev.slice(1), newLoadValue]);
//         setRamValues(prev => [...prev.slice(1), newRamValue]);
//         setSwapValues(prev => [...prev.slice(1), newSwapValue]);
//         setChannelValues(prev => [...prev.slice(1), newChannelValue]);
//         setCallValues(prev => [...prev.slice(1), newCallValue]);
//     };

//     return (
//         <div className="grid min-h-screen grid-cols-[auto,1fr] grid-rows-[auto,1fr,auto]">
//             <Helmet>
//                 <title>ConVox Web Panel - ConVox</title>
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
//                 <h1 className="text-center text-3xl font-bold">ConVox Web Panel</h1>
//                 <div className="my-4">
//                     <div className="flex justify-between items-center">
//                         <h2 className="text-2xl font-bold text-left">Server Status</h2>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                         <div className={`p-4 rounded shadow-lg text-white ${serverStatus.asterisk === 'Running' ? 'bg-green-500' : 'bg-red-500'}`}>
//                             <h3 className="text-lg font-bold">Asterisk</h3>
//                             <p>{serverStatus.asterisk}</p>
//                         </div>
//                         <div className={`p-4 rounded shadow-lg text-white ${serverStatus.nginx === 'Running' ? 'bg-green-500' : 'bg-red-500'}`}>
//                             <h3 className="text-lg font-bold">Nginx</h3>
//                             <p>{serverStatus.nginx}</p>
//                         </div>
//                         <div className={`p-4 rounded shadow-lg text-white ${serverStatus.mysql === 'Running' ? 'bg-green-500' : 'bg-red-500'}`}>
//                             <h3 className="text-lg font-bold">Mysql</h3>
//                             <p>{serverStatus.mysql}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="my-4">
//                     <div className="flex justify-between items-center">
//                         <h2 className="text-2xl font-bold text-left">Monitoring Data</h2>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
//                         <div className="p-4 bg-white rounded shadow-lg">
//                             <h3 className="text-lg font-bold mb-2">CPU Utilization</h3>
//                             <div id="cpu" className="dynamicsparkline">Loading...</div>
//                         </div>
//                         <div className="p-4 bg-white rounded shadow-lg">
//                             <h3 className="text-lg font-bold mb-2">Load Average</h3>
//                             <div id="load" className="dynamicsparkline">Loading...</div>
//                         </div>
//                         <div className="p-4 bg-white rounded shadow-lg">
//                             <h3 className="text-lg font-bold mb-2">Memory Utilization</h3>
//                             <div id="ram" className="dynamicsparkline">Loading...</div>
//                         </div>
//                         <div className="p-4 bg-white rounded shadow-lg">
//                             <h3 className="text-lg font-bold mb-2">Swap Utilization</h3>
//                             <div id="swap" className="dynamicsparkline">Loading...</div>
//                         </div>
//                         <div className="p-4 bg-white rounded shadow-lg">
//                             <h3 className="text-lg font-bold mb-2">Channel Utilization</h3>
//                             <div id="channel" className="dynamicsparkline">Loading...</div>
//                         </div>
//                         <div className="p-4 bg-white rounded shadow-lg">
//                             <h3 className="text-lg font-bold mb-2">Call Utilization</h3>
//                             <div id="call" className="dynamicsparkline">Loading...</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="my-4">
//                     <div className="flex justify-between items-center">
//                         <h2 className="text-2xl font-bold text-left">Disk Utilization</h2>
//                     </div>
//                     <div className="p-4 bg-white rounded shadow-lg">
//                         <div id="disk" className="dynamicsparkline">Loading...</div>
//                     </div>
//                 </div>
//                 <div className="my-4">
//                     <div className="flex justify-between items-center">
//                         <h2 className="text-2xl font-bold text-left">Network Status</h2>
//                     </div>
//                     <div className="p-4 bg-white rounded shadow-lg">
//                         <table className="min-w-full text-center bg-white border border-gray-200">
//                             <thead>
//                                 <tr style={{ backgroundColor: '#04aa6d', color: '#fff' }}>
//                                     <th className="py-2 px-4 border-b">Iface</th>
//                                     <th className="py-2 px-4 border-b">RX-OK</th>
//                                     <th className="py-2 px-4 border-b">RX-ERR</th>
//                                     <th className="py-2 px-4 border-b">TX-OK</th>
//                                     <th className="py-2 px-4 border-b">TX-ERR</th>
//                                     <th className="py-2 px-4 border-b">Collisions</th>
//                                     <th className="py-2 px-4 border-b">RX-DRP</th>
//                                     <th className="py-2 px-4 border-b">TX-DRP</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {networkStatus.map((status, index) => (
//                                     <tr key={index} style={{
//                                             backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9',
//                                             padding: '10px', cursor: 'pointer'
//                                         }}
//                                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1e7dd'}
//                                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#e9e9e9'}
//                                     >
//                                         <td className="py-2 px-4">{status.iface}</td>
//                                         <td className="py-2 px-4">{status.rxOk}</td>
//                                         <td className="py-2 px-4">{status.rxErr}</td>
//                                         <td className="py-2 px-4">{status.txOk}</td>
//                                         <td className="py-2 px-4">{status.txErr}</td>
//                                         <td className="py-2 px-4">{status.collisions}</td>
//                                         <td className="py-2 px-4">{status.rxDrp}</td>
//                                         <td className="py-2 px-4">{status.txDrp}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             <div className="footer text-gray-500 text-center py-2 col-span-1 col-start-2 row-span-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
//                 Powered by Deepija Telecom Pvt Ltd &copy; 2024 All Rights Reserved.
//             </div>
//         </div>
//     );
// };

// export default ConVoxWebPanel;









import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../Sidebar';
import logo from '../../../assets/images/ConVox/logo_convox_dashboard.png';
import Chart from 'chart.js/auto';

const ConVoxWebPanel = () => {
    const [serverIp, setServerIp] = useState('172.16.13.29');
    const [serverStatus, setServerStatus] = useState({
        asterisk: 'Loading...',
        nginx: 'Loading...',
        mysql: 'Loading...'
    });
    const [cpuValues, setCpuValues] = useState(Array(40).fill(0));
    const [loadValues, setLoadValues] = useState(Array(40).fill(0));
    const [ramValues, setRamValues] = useState(Array(10).fill(0));
    const [swapValues, setSwapValues] = useState(Array(10).fill(0));
    const [channelValues, setChannelValues] = useState(Array(10).fill(0));
    const [callValues, setCallValues] = useState(Array(10).fill(0));
    const [diskData, setDiskData] = useState([
        { mount: '/run', totalSpace: '295M', used: '1.1M', free: '294M', usedPercent: '1%' },
        { mount: '/', totalSpace: '73G', used: '25G', free: '45G', usedPercent: '36%' },
        { mount: '/dev/shm', totalSpace: '1.5G', used: '216K', free: '1.5G', usedPercent: '1%' },
        { mount: '/run/lock', totalSpace: '5.0M', used: '0', free: '5.0M', usedPercent: '0%' },
        { mount: '/boot', totalSpace: '2.0G', used: '242M', free: '1.6G', usedPercent: '14%' },
        { mount: '/run/user/1000', totalSpace: '295M', used: '4.0K', free: '295M', usedPercent: '1%' },
        { mount: '/run/user/1001', totalSpace: '295M', used: '4.0K', free: '295M', usedPercent: '1%' },
        { mount: '/dev', totalSpace: '1.4G', used: '0', free: '1.4G', usedPercent: '0%' },
        { mount: '/sys/fs/cgroup', totalSpace: '1.5G', used: '0', free: '1.5G', usedPercent: '0%' }
    ]);
    const [networkStatus, setNetworkStatus] = useState([
        { iface: 'eth0', rxOk: 1000, rxErr: 0, txOk: 1200, txErr: 1, collisions: 0, rxDrp: 2, txDrp: 0 },
        { iface: 'wlan0', rxOk: 2000, rxErr: 0, txOk: 2200, txErr: 0, collisions: 0, rxDrp: 1, txDrp: 1 }
    ]);

    let intervalId;

    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        startMonitoring();
        setupCharts();
        return () => {
            clearInterval(interval);
            clearTimeout(intervalId);
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

    const startMonitoring = () => {
        intervalId = setTimeout(() => {
            fetchServerStatus();
            updateMonitoringData();
            startMonitoring();
        }, 2000);
    };

    const fetchServerStatus = () => {
        // Simulate fetching server status
        setServerStatus({
            asterisk: Math.random() > 0.5 ? 'Running' : 'Not Running',
            nginx: Math.random() > 0.5 ? 'Running' : 'Not Running',
            mysql: Math.random() > 0.5 ? 'Running' : 'Not Running'
        });
    };

    const updateMonitoringData = () => {
        const newCpuValue = Math.random() * 100;
        const newLoadValue = Math.random() * 100;
        const newRamValue = Math.random() * 100;
        const newSwapValue = Math.random() * 100;
        const newChannelValue = Math.random() * 100;
        const newCallValue = Math.random() * 100;
        const newDiskValue = Math.random() * 100;

        setCpuValues(prev => [...prev.slice(1), newCpuValue]);
        setLoadValues(prev => [...prev.slice(1), newLoadValue]);
        setRamValues(prev => [...prev.slice(1), newRamValue]);
        setSwapValues(prev => [...prev.slice(1), newSwapValue]);
        setChannelValues(prev => [...prev.slice(1), newChannelValue]);
        setCallValues(prev => [...prev.slice(1), newCallValue]);

        updateChart(cpuChart, newCpuValue);
        updateChart(loadChart, newLoadValue);
        updateChart(ramChart, newRamValue);
        updateChart(swapChart, newSwapValue);
        updateChart(channelChart, newChannelValue);
        updateChart(callChart, newCallValue);
        updateChart(diskChart, newDiskValue, true);
    };

    let cpuChart, loadChart, ramChart, swapChart, channelChart, callChart, diskChart;

    const setupCharts = () => {
        if (cpuChart) cpuChart.destroy();
        if (loadChart) loadChart.destroy();
        if (ramChart) ramChart.destroy();
        if (swapChart) swapChart.destroy();
        if (channelChart) channelChart.destroy();
        if (callChart) callChart.destroy();
        if (diskChart) diskChart.destroy();

        cpuChart = createChart('cpu', 'CPU Utilization');
        loadChart = createChart('load', 'Load Average');
        ramChart = createChart('ram', 'Memory Utilization');
        swapChart = createChart('swap', 'Swap Utilization');
        channelChart = createChart('channel', 'Channel Utilization');
        callChart = createChart('call', 'Call Utilization');
        diskChart = createChart('disk', 'Disk Utilization', 'bar');
    };

    const createChart = (id, label, type = 'line') => {
        const ctx = document.getElementById(id).getContext('2d');
        return new Chart(ctx, {
            type: type,
            data: {
                labels: type === 'bar' ? diskData.map(d => d.mount) : [],
                datasets: [{
                    label: label,
                    data: type === 'bar' ? diskData.map(d => parseInt(d.used.replace(/[^0-9]/g, ''), 10)) : [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                    backgroundColor: type === 'bar' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 1)'
                }]
            },
            options: {
                scales: {
                    x: {
                        type: type === 'bar' ? 'category' : 'linear',
                        position: 'bottom'
                    }
                }
            }
        });
    };    

    const updateChart = (chart, data, isBarChart = false) => {
        const now = Date.now();
        if (isBarChart) {
            const labels = diskData.map(d => d.mount);
            const dataset = diskData.map(d => parseInt(d.used.replace(/[^0-9]/g, ''), 10)); // Convert to integer
            chart.data.labels = labels;
            chart.data.datasets[0].data = dataset;
        } else {
            chart.data.labels.push(now);
            chart.data.datasets[0].data.push(data);
            if (chart.data.labels.length > 50) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }
        }
        chart.update();
    };    

    return (
        <div className="grid min-h-screen grid-cols-[auto,1fr] grid-rows-[auto,1fr,auto]">
            <Helmet>
                <title>ConVox Web Panel - ConVox</title>
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
                <h1 className="text-center text-3xl font-bold">ConVox Web Panel</h1>
                <div className="my-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-left">Server Status</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className={`p-4 rounded shadow-lg text-white ${serverStatus.asterisk === 'Running' ? 'bg-green-500' : 'bg-red-500'}`}>
                            <h3 className="text-lg font-bold">Asterisk</h3>
                            <p>{serverStatus.asterisk}</p>
                        </div>
                        <div className={`p-4 rounded shadow-lg text-white ${serverStatus.nginx === 'Running' ? 'bg-green-500' : 'bg-red-500'}`}>
                            <h3 className="text-lg font-bold">Nginx</h3>
                            <p>{serverStatus.nginx}</p>
                        </div>
                        <div className={`p-4 rounded shadow-lg text-white ${serverStatus.mysql === 'Running' ? 'bg-green-500' : 'bg-red-500'}`}>
                            <h3 className="text-lg font-bold">Mysql</h3>
                            <p>{serverStatus.mysql}</p>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-left">Monitoring Data</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
                        <div className="p-4 bg-white rounded shadow-lg">
                            <h3 className="text-lg font-bold mb-2">CPU Utilization</h3>
                            <canvas id="cpu"></canvas>
                        </div>
                        <div className="p-4 bg-white rounded shadow-lg">
                            <h3 className="text-lg font-bold mb-2">Load Average</h3>
                            <canvas id="load"></canvas>
                        </div>
                        <div className="p-4 bg-white rounded shadow-lg">
                            <h3 className="text-lg font-bold mb-2">Memory Utilization</h3>
                            <canvas id="ram"></canvas>
                        </div>
                        <div className="p-4 bg-white rounded shadow-lg">
                            <h3 className="text-lg font-bold mb-2">Swap Utilization</h3>
                            <canvas id="swap"></canvas>
                        </div>
                        <div className="p-4 bg-white rounded shadow-lg">
                            <h3 className="text-lg font-bold mb-2">Channel Utilization</h3>
                            <canvas id="channel"></canvas>
                        </div>
                        <div className="p-4 bg-white rounded shadow-lg">
                            <h3 className="text-lg font-bold mb-2">Call Utilization</h3>
                            <canvas id="call"></canvas>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-left">Disk Utilization</h2>
                    </div>
                    <div className="p-4 bg-white rounded shadow-lg">
                        <canvas id="disk"></canvas>
                    </div>
                </div>
                <div className="my-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-left">Network Status</h2>
                    </div>
                    <div className="p-4 bg-white rounded shadow-lg">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border-b">Iface</th>
                                    <th className="py-2 px-4 border-b">RX-OK</th>
                                    <th className="py-2 px-4 border-b">RX-ERR</th>
                                    <th className="py-2 px-4 border-b">TX-OK</th>
                                    <th className="py-2 px-4 border-b">TX-ERR</th>
                                    <th className="py-2 px-4 border-b">Collisions</th>
                                    <th className="py-2 px-4 border-b">RX-DRP</th>
                                    <th className="py-2 px-4 border-b">TX-DRP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {networkStatus.map((status, index) => (
                                    <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="py-2 px-4">{status.iface}</td>
                                        <td className="py-2 px-4">{status.rxOk}</td>
                                        <td className="py-2 px-4">{status.rxErr}</td>
                                        <td className="py-2 px-4">{status.txOk}</td>
                                        <td className="py-2 px-4">{status.txErr}</td>
                                        <td className="py-2 px-4">{status.collisions}</td>
                                        <td className="py-2 px-4">{status.rxDrp}</td>
                                        <td className="py-2 px-4">{status.txDrp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="footer text-gray-500 text-center py-2 col-span-1 col-start-2 row-span-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                Powered by Deepija Telecom Pvt Ltd &copy; 2024 All Rights Reserved.
            </div>
        </div>
    );
};

export default ConVoxWebPanel;