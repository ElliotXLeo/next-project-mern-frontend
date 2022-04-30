import { createContext, useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({
    _id: '',
    name: '',
    email: '',
    token: ''
  });

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
        } catch (error) {
          console.log(error);
        }
      }
    };
    userAuthenticate();
  }, [])
  return (
    <AuthContext.Provider
      value={{
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}