import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConvoxLogin from './components/ConvoxLogin';
import Dashboard from './components/ConVox/Dashboard';
import Stations from './components/ConVox/Stations';
import ProtectedRoute from './components/ConVox/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/convox/login" element={<ConvoxLogin />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/convox/stations" element={<ProtectedRoute><Stations /></ProtectedRoute>} />
                <Route path="/" element={<ConvoxLogin />} />
            </Routes>
        </Router>
    );
}

export default App;