import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ accessToken: null, refreshToken: null });
    const navigate = useNavigate();

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (storedAccessToken && storedRefreshToken) {
            setAuth({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
            });
        }
    }, []);

    const refreshAccessTokens = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                console.log(refreshToken);
                
                const response = await axios.post("https://auth-backend-138t.onrender.com/api/v1/users/refresh-token", {
                    refreshToken: refreshToken
                });
                const newAccessToken = response.data.data.accessToken; 
                localStorage.setItem('accessToken', newAccessToken); 
    
                setAuth((prevState) => ({
                    ...prevState,
                    accessToken: newAccessToken
                }));
    
                console.log(newAccessToken);
                
            } catch (error) {
                console.error('Failed to refresh tokens:', error.response ? error.response.data : error.message);
                
            }
        } else {
            console.error('No refresh token available');
        }
    };
    

    const getAccessToken = async () => {
        if (!auth.accessToken) {
            return await refreshAccessTokens();
        }
        return auth.accessToken;
    };

    const logout = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token available for logout');
            return;
        }

        axios.post('https://auth-backend-138t.onrender.com/api/v1/users/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setAuth({ accessToken: null, refreshToken: null }); 
            navigate('/login');
        })
        .catch((error) => {
            console.error('Logout failed:', error.response?.data || error.message);
        });
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, refreshAccessTokens, getAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;