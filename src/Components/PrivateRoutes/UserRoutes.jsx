import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const UserRoutes = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            const userRole = decoded.roles[0];
            setRole(userRole);
        }
    }, []);

    // If the role is still not determined, you might want to show a loading indicator or handle it accordingly
    if (role === null) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {role === 'USER' ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
};

export default UserRoutes;
