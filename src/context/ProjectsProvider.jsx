import { createContext } from "react";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  return (
    <ProjectsContext.Provider
      value={{
        
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};