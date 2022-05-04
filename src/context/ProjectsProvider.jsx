import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({})
    }, 5000);
  };

  const createProject = async (project) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const method = 'POST';
        const resource = '/projects';
        const options = {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
          },
          data: project,
          url: resource
        };
        const { data } = await axiosInstance(options);
        console.log(data);
        showAlert({
          message: 'Proyecto creado',
          error: false
        });
        navigate('/projects');
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        alert,
        showAlert,
        createProject
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};