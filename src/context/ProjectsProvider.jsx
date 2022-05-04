import { createContext, useState } from "react";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {

  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({})
    }, 5000);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        alert,
        showAlert
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};