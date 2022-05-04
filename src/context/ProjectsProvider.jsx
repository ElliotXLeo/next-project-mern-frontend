import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [alert, setAlert] = useState({});

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({})
    }, 5000);
  };

  const submitProjectsForm = async (project) => {
    if (project._id === undefined) {
      await createProject(project);
    } else {
      console.log('Editar');
      await updateProject(project);
    }
  }

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
  };

  const readProject = async (id) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const method = 'GET';
        const resource = `/projects/${id}`;
        const options = {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
          },
          url: resource
        };
        const { data } = await axiosInstance(options);
        setProject(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateProject = async (project) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const method = 'PUT';
        const resource = `/projects/${project._id}`;
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
        const updatedProjects = projects.map((project) => {
          return project._id === data._id ? data : project;
        });
        setProjects(updatedProjects);
        showAlert({
          message: 'Proyecto actualizado',
          error: false
        });
        navigate('/projects');
      } catch (error) {
        console.log(error);
      }
    }
  };

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
        loading,
        projects,
        project,
        alert,
        showAlert,
        submitProjectsForm,
        createProject,
        readProject
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};