import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwt');
    return token ? children : <Navigate to="/convox/login" />;
};

export default ProtectedRoute;