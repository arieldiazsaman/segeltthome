import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleLogout = async () => {
            try {
                const username = localStorage.getItem('username');
                const response = await axios.post('http://localhost:5000/logout', {
                    username,
                });
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                navigate('/login');
            } catch (error) {
                console.log('Error: ', JSON.stringify(error));
            }
        }

        handleLogout();
    }, [navigate]);

    return null;
};

export default Logout;
