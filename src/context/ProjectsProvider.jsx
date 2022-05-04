import { createContext, useEffect, useState } from "react";
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
        setProjects([
          ...projects,
          data
        ]);
        navigate('/projects');
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const readProjects = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const method = 'GET';
          const resource = '/projects';
          const options = {
            method,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json;charset=utf-8'
            },
            url: resource
          };
          const { data } = await axiosInstance(options);
          setProjects(data);
          showAlert({
            message: 'Proyectos listados',
            error: false
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    readProjects();
  }, []);

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