import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/sections/Loading";
import useProjects from "../hooks/useProjects";

const Project = () => {
  const params = useParams();
  const { id } = params;

  const { loading, project, readProject, deleteProject } = useProjects();
  const { name } = project;

  const handleClick = async () => {
    if (confirm('¿Desea eliminar este proyecto?')) {
      await deleteProject(id);
    }
  }

  useEffect(() => {
    readProject(id);
  }, []);

  return (
    <>
      {
        loading ?
          <Loading />
          :
          <section className="flex flex-col gap-8">
            <header className="flex items-center justify-between">
              <h2 className="text-4xl font-black">{name}</h2>
              <div className="flex items-center gap-4">
                <Link to={`/projects/update/${id}`} className="transition-all hover:sepia">
                  ✏
                </Link>
                <button
                  className="transition-all hover:sepia"
                  onClick={handleClick}
                >
                  🗑
                </button>
              </div>
            </header>
            <div>
              <button
                className="bg-sky-400 rounded-md text-white font-bold p-2 cursor-pointer transition-colors hover:bg-sky-500 w-full"
              >
                ➕ Nueva tarea
              </button>
            </div>
          </section>
      }
    </>
  );
}

export default Project;