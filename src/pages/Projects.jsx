import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects } = useProjects();
  
  return (
    <h2 className="text-4xl font-black">Projects</h2>
  );
}

export default Projects;