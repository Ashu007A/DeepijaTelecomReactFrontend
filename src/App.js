import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ConvoxLogin from './components/ConvoxLogin';
import ProtectedRoute from './components/ConVox/ProtectedRoute';
import Dashboard from './components/ConVox/Dashboard';

import ProcessStatus from './components/ConVox/1_Live_Status/ProcessStatus';
import TrunkStatus from './components/ConVox/1_Live_Status/TrunkStatus';
import QueuesStatus from './components/ConVox/1_Live_Status/QueuesStatus';
import RealTimeDashboard from './components/ConVox/1_Live_Status/RealTimeDashboard';

import ConVoxScreen from './components/ConVox/2_Debug_Tools/ConVoxScreens';
import ConVoxWebPanel from './components/ConVox/2_Debug_Tools/ConVoxWebPanel';
import DatabaseStatus from './components/ConVox/2_Debug_Tools/DatabaseStatus';

import Stations from './components/ConVox/3_System_Config/Stations';
import Servers from './components/ConVox/3_System_Config/Servers';

function App() {
    let inactivityTimeout;

    const resetInactivityTimeout = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(logoutUser, 5 * 60 * 1000); // 5 minutes
    };

    const logoutUser = () => {
        // alert('You have been logged out due to inactivity.');
        localStorage.clear();
        window.location.href = '/convox/login'; // Redirect to login page
    };

    useEffect(() => {
        window.addEventListener('mousemove', resetInactivityTimeout);
        window.addEventListener('keypress', resetInactivityTimeout);

        resetInactivityTimeout(); // Start the inactivity timeout initially

        return () => {
            window.removeEventListener('mousemove', resetInactivityTimeout);
            window.removeEventListener('keypress', resetInactivityTimeout);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ConvoxLogin />} />

                {/* Login */}
                <Route path="/convox/login" element={<ConvoxLogin />} />

                {/* Dashboard */}
                <Route path="/convox/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                {/* Live Status */}
                <Route path="/convox/process-status" element={<ProtectedRoute><ProcessStatus /></ProtectedRoute>} />
                <Route path="/convox/trunk-status" element={<ProtectedRoute><TrunkStatus /></ProtectedRoute>} />
                <Route path="/convox/queues-status" element={<ProtectedRoute><QueuesStatus /></ProtectedRoute>} />
                <Route path="/convox/real-time-dashboard" element={<ProtectedRoute><RealTimeDashboard /></ProtectedRoute>} />

                {/* Debug Tools */}
                <Route path="/convox/screens" element={<ProtectedRoute><ConVoxScreen /></ProtectedRoute>} />
                <Route path="/convox/database-status" element={<ProtectedRoute><DatabaseStatus /></ProtectedRoute>} />
                <Route path="/convox/web-panel" element={<ProtectedRoute><ConVoxWebPanel /></ProtectedRoute>} />

                {/* System Config */}
                <Route path="/convox/servers" element={<ProtectedRoute><Servers /></ProtectedRoute>} />
                <Route path="/convox/stations" element={<ProtectedRoute><Stations /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;