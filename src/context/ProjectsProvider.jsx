import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import useAuth from "../hooks/useAuth";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {

  const navigate = useNavigate();

  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [alert, setAlert] = useState({});
  const [FormModalTask, setFormModalTask] = useState(false);

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

  const deleteProject = async (id) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const method = 'DELETE';
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
        const updatedProjects = projects.filter((project) => {
          return project._id !== id;
        });
        setProjects(updatedProjects);
        showAlert({
          message: data.message,
          error: true
        });
        setLoading(false);
        navigate('/projects');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const submitProjectsForm = async (project) => {
    if (project._id === undefined) {
      await createProject(project);
    } else {
      await updateProject(project);
    }
  }

  const submitTasksForm = async (task) => {
    console.log(task);
  }

  const handleFormModalTask = () => {
    setFormModalTask(!FormModalTask);
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
  }, [auth]);

  return (
    <ProjectsContext.Provider
      value={{
        loading,
        projects,
        project,
        alert,
        showAlert,
        submitProjectsForm,
        readProject,
        deleteProject,
        FormModalTask,
        submitTasksForm,
        handleFormModalTask
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};