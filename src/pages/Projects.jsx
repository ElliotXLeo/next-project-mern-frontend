import Alert from "../components/sections/Alert";
import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects, alert } = useProjects();
  
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-4xl font-black">Projects</h2>
      {
        alert.message && <Alert alert={alert} />
      }
    </section>
  );
}

export default Projects;