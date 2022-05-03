import { createContext, useState } from "react";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {

  const [projects, setProjects] = useState([]);

  return (
    <ProjectsContext.Provider
      value={{
        projects
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};