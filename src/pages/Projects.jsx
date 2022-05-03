import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects } = useProjects();
  
  return (
    <section>
      <h2 className="text-4xl font-black">Projects</h2>
    </section>
  );
}

export default Projects;