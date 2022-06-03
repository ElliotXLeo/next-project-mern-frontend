import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const userAuthenticate = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const method = 'GET';
          const resource = '/users/perfil';
          const options = {
            method,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json;charset=utf-8'
            },
            url: resource
          };
          const { data } = await axiosInstance(options);
          setAuth({
            ...data,
            token
          });
          if (window.location.pathname === '/') {
            console.log('root');
            navigate('/projects');
          }
        } catch (error) {
          setAuth({});
          console.log(error);
        }
      }
      setLoading(false);
    };
    userAuthenticate();
  }, []);

  const logOutAuth = () => {
    setLoading(false);
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        auth,
        setAuth,
        logOutAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}