import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import useAuth from "../hooks/useAuth";
import serverIo from "socket.io-client";

let socket;

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {

  const navigate = useNavigate();

  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [alertTimeId, setAlertTimeId] = useState(0);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [projectDeleteModal, setProjectDeleteModal] = useState(false);
  const [task, setTask] = useState({});
  const [formModalTask, setFormModalTask] = useState(false);
  const [taskDeleteModal, setTaskDeleteModal] = useState(false);
  const [developer, setDeveloper] = useState({});
  const [developerDeleteModal, setDeveloperDeleteModal] = useState(false);
  const [searcher, setSearcher] = useState(false);

  const showAlert = (alert) => {
    clearTimeout(alertTimeId);
    setAlert(alert);

    setAlertTimeId(setTimeout(() => {
      setAlert({})
    }, 5000));
  };

  const createProject = async (project) => {
    setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
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
        } finally {
          setLoading(false);
        }
      }
    };
    readProjects();
  }, [auth]);

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
    setLoading(true);
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
      } finally {
        setLoading(false);
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
        setProjectDeleteModal(false);
        navigate('/projects');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleProjectDeleteModal = () => {
    setProjectDeleteModal(!projectDeleteModal);
  };

  const submitProjectsForm = async (project) => {
    if (project._id === undefined) {
      await createProject(project);
    } else {
      await updateProject(project);
    }
  };

  const handleFormModalTask = () => {
    setFormModalTask(!formModalTask);
    setTask({});
  };

  useEffect(() => {
    socket = serverIo(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const createTask = async (task) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const method = 'POST';
        const resource = '/tasks';
        const options = {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
          },
          data: task,
          url: resource
        };
        const { data } = await axiosInstance(options);
        showAlert({
          message: 'Tarea creada',
          error: false
        });
        handleFormModalTask();
        socket.emit('createTask', data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateTask = async (task) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const method = 'PUT';
        const resource = `/tasks/${task._id}`;
        const options = {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
          },
          data: task,
          url: resource
        };
        const { data } = await axiosInstance(options);
        showAlert({
          message: 'Tarea actualizada',
          error: false
        });
        handleFormModalTask();
        socket.emit('updateTask', data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateTaskState = async (id) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const method = 'POST';
        const resource = `/tasks/state/${id}`;
        const options = {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
          },
          url: resource
        };
        const { data } = await axiosInstance(options);
        showAlert({
          message: 'Tarea actualizada',
          error: false
        });
        socket.emit('updateTask', data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteTask = async (task) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const method = 'DELETE';
        const resource = `/tasks/${task._id}`;
        const options = {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
          },
          url: resource
        };
        const { data } = await axiosInstance(options);
        showAlert({
          message: data.message,
          error: true
        });
        setTaskDeleteModal(false);
        setTask({});
        socket.emit('deleteTask', task);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSetTask = (task) => {
    setTask(task);
    setFormModalTask(true);
  };

  const submitTasksForm = async (task) => {
    setLoading(true);
    if (task._id === undefined) {
      await createTask(task);
    } else {
      await updateTask(task);
    }
    setLoading(false);
  };

  const handleTaskDeleteModal = (task) => {
    setTask(task);
    setTaskDeleteModal(!taskDeleteModal);
  };

  const submitTasksProject = (data) => {
    if (data.project._id && project.tasks) {
      const updatedProjectTasks = project.tasks.map((element) => {
        return element._id === data._id ? data : element;
      });
      setProject({
        ...project,
        tasks: updatedProjectTasks
      });
    } else if (project.tasks) {
      setProject({
        ...project,
        tasks: [...project.tasks, data]
      });
    }
  };

  const deleteTasksProject = (task) => {
    if (task.project && project.tasks) {
      const updatedProjectTasks = project.tasks.filter((element) => {
        return element._id !== task._id;
      });
      setProject({
        ...project,
        tasks: updatedProjectTasks
      });
    }
  };

  const submitDevelopersForm = async (email) => {
    if (email) {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const method = 'GET';
          const resource = `/projects/developers/${email}`;
          const options = {
            method,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json;charset=utf-8'
            },
            url: resource
          };
          const { data } = await axiosInstance(options);
          setDeveloper(data);
          showAlert({
            message: 'Desarrollador encontrado',
            error: false
          });
        } catch (error) {
          setAlert({
            message: error.response.data.message,
            error: true
          });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const addDeveloper = async (email) => {
    if (email) {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const method = 'POST';
          const resource = `/projects/developers/${project._id}`;
          const options = {
            method,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json;charset=utf-8'
            },
            data: email,
            url: resource
          };
          const { data } = await axiosInstance(options);
          showAlert({
            message: `${data.name} ha sido agregad@`,
            error: false
          });
          setDeveloper({});
        } catch (error) {
          setAlert({
            message: error.response.data.message,
            error: true
          });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const deleteDeveloper = async (developer) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const method = 'DELETE';
        const resource = `/projects/developers/${project._id}`;
        const options = {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
          },
          data: { _id: developer._id },
          url: resource
        };
        const { data } = await axiosInstance(options);
        const updatedProjectDeveloper = project.developers.filter((element) => {
          return element._id !== developer._id;
        });
        setProject({
          ...project,
          developers: updatedProjectDeveloper
        });
        showAlert({
          message: data.message,
          error: true
        });
        setDeveloperDeleteModal(false);
        setDeveloper({});
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeveloperDeleteModal = (developer) => {
    setDeveloper(developer);
    setDeveloperDeleteModal(!developerDeleteModal);
  };

  const handleSearcher = () => {
    setSearcher(!searcher);
  }

  const logOutProjects = () => {
    setLoading(false);
    setAlert({});
    setAlertTimeId(0);
    setProjects([]);
    setProject({});
    setProjectDeleteModal(false);
    setTask({});
    setFormModalTask(false);
    setTaskDeleteModal(false);
    setDeveloper({});
    setDeveloperDeleteModal(false);
    setSearcher(false);
  };

  return (
    <ProjectsContext.Provider
      value={{
        loading,
        alert,
        showAlert,
        projects,
        project,
        submitProjectsForm,
        readProject,
        deleteProject,
        projectDeleteModal,
        handleProjectDeleteModal,
        task,
        formModalTask,
        handleFormModalTask,
        handleSetTask,
        submitTasksForm,
        updateTaskState,
        deleteTask,
        taskDeleteModal,
        handleTaskDeleteModal,
        submitTasksProject,
        deleteTasksProject,
        developer,
        submitDevelopersForm,
        addDeveloper,
        deleteDeveloper,
        developerDeleteModal,
        handleDeveloperDeleteModal,
        searcher,
        handleSearcher,
        logOutProjects
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};