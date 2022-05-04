import ProjectsProject from "../components/projects/ProjectsProject";
import Alert from "../components/sections/Alert";
import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects, alert } = useProjects();
  
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-4xl font-black">Projects</h2>
      <div className="bg-white shadow rounded-lg p-4">
        {
          projects.length ?
            projects.map((element) => {
              return (
                <ProjectsProject
                  key={element._id}
                  project={element}
                />
              );
            })
            :
            <p className="text-center text-gray-600 uppercase">No hay proyectos</p>
        }
      </div>
      {
        alert.message && <Alert alert={alert} />
      }
    </section>
  );
}

export default Projects;